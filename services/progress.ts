import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';
import type { ConceptProgress, ProgressMap } from '../types';

export async function loadProgress(): Promise<ProgressMap> {
  try {
    const raw = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.progress);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export async function saveProgress(map: ProgressMap): Promise<void> {
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.progress, JSON.stringify(map));
}

export function makeDefaultProgress(
  conceptId: string,
  tierId: number,
): ConceptProgress {
  return {
    conceptId,
    tierId,
    concept: false,
    guided: false,
    practice: false,
    connections: false,
  };
}

export function computeOverallPercent(
  map: ProgressMap,
  totalConcepts: number,
): number {
  if (totalConcepts === 0) return 0;
  const complete = Object.values(map).filter(
    (p) => p.concept && p.guided && p.practice && p.connections,
  ).length;
  return Math.round((complete / totalConcepts) * 100);
}

export function computeTierPercent(
  map: ProgressMap,
  tierId: number,
  tierConceptIds: string[],
): number {
  if (tierConceptIds.length === 0) return 0;
  const complete = tierConceptIds.filter((id) => {
    const p = map[id];
    return p && p.concept && p.guided && p.practice && p.connections;
  }).length;
  return Math.round((complete / tierConceptIds.length) * 100);
}
