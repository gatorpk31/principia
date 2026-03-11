import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  loadProgress,
  saveProgress,
  makeDefaultProgress,
  computeOverallPercent,
  computeTierPercent,
} from '../services/progress';
import { upsertProgress } from '../services/supabase';
import { SECURE_STORE_KEYS } from '../constants/config';
import type { ConceptProgress, ProgressMap } from '../types';
import { ALL_CONCEPTS } from '../data';

export interface ProgressHook {
  progress: ProgressMap;
  isLoading: boolean;
  markExplored: (
    conceptId: string,
    tierId: number,
    field: keyof Pick<ConceptProgress, 'concept' | 'guided' | 'practice' | 'connections'>,
    practiceScore?: number,
  ) => Promise<void>;
  getConceptProgress: (conceptId: string, tierId: number) => ConceptProgress;
  overallPercent: number;
  tierPercent: (tierId: number) => number;
}

const TOTAL_CONCEPTS = ALL_CONCEPTS.length;

export function useProgress(): ProgressHook {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress().then((map) => {
      setProgress(map);
      setIsLoading(false);
    });
  }, []);

  const markExplored = useCallback(
    async (
      conceptId: string,
      tierId: number,
      field: keyof Pick<ConceptProgress, 'concept' | 'guided' | 'practice' | 'connections'>,
      practiceScore?: number,
    ): Promise<void> => {
      setProgress((prev) => {
        const existing = prev[conceptId] ?? makeDefaultProgress(conceptId, tierId);
        const updated: ConceptProgress = {
          ...existing,
          [field]: true,
          ...(practiceScore !== undefined ? { practiceScore } : {}),
        };

        // Set completedAt when all four tabs are done
        if (
          updated.concept &&
          updated.guided &&
          updated.practice &&
          updated.connections &&
          !updated.completedAt
        ) {
          updated.completedAt = new Date().toISOString();
        }

        const next = { ...prev, [conceptId]: updated };
        saveProgress(next);
        return next;
      });

      // Cloud sync for paid users (non-under-13)
      const under13 = await SecureStore.getItemAsync(SECURE_STORE_KEYS.isUnder13);
      if (under13 !== 'true') {
        // User ID from RevenueCat would go here — using device stub for now
        try {
          await upsertProgress('local_user', conceptId, tierId, field);
        } catch {
          // Non-fatal — local progress is always the source of truth
        }
      }
    },
    [],
  );

  const getConceptProgress = useCallback(
    (conceptId: string, tierId: number): ConceptProgress => {
      return progress[conceptId] ?? makeDefaultProgress(conceptId, tierId);
    },
    [progress],
  );

  const overallPercent = computeOverallPercent(progress, TOTAL_CONCEPTS);

  const tierPercent = useCallback(
    (tierId: number): number => {
      const ids = ALL_CONCEPTS
        .filter((c) => c.tierId === tierId)
        .map((c) => c.id);
      return computeTierPercent(progress, tierId, ids);
    },
    [progress],
  );

  return {
    progress,
    isLoading,
    markExplored,
    getConceptProgress,
    overallPercent,
    tierPercent,
  };
}
