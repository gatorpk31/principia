// Spaced-review engine — the supplement mechanic. School introduces a
// topic; Principia's job is to make it stick. Every practice answer
// (in-concept or in a mixed session) feeds a per-question Leitner record,
// and Mixed Review serves what is due: missed questions first, then
// aging correct ones, then unseen questions from visited concepts.
//
// All state lives on-device in AsyncStorage. Nothing is transmitted.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';
import { ALL_CONCEPTS, isConceptLocked } from '../data';
import type { Concept, PracticeQuestion, ProgressMap } from '../types';

export interface QuestionRecord {
  conceptId: string;
  questionIndex: number;
  /** Leitner box 0-4. Wrong answers drop to 0; correct answers move up. */
  box: number;
  timesCorrect: number;
  timesWrong: number;
  lastSeenAt: string; // ISO
  dueAt: string; // ISO
}

export type ReviewMap = Record<string, QuestionRecord>;

export interface ReviewItem {
  concept: Concept;
  question: PracticeQuestion;
  questionIndex: number;
}

/** Hours until a record in each box comes due again. */
const BOX_INTERVAL_HOURS = [4, 24, 72, 168, 336]; // 4h, 1d, 3d, 7d, 14d

export const REVIEW_SESSION_SIZE = 10;

function recordKey(conceptId: string, questionIndex: number): string {
  return `${conceptId}:${questionIndex}`;
}

export async function loadReviewMap(): Promise<ReviewMap> {
  try {
    const raw = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.reviewHistory);
    if (!raw) return {};
    return JSON.parse(raw) as ReviewMap;
  } catch {
    return {};
  }
}

async function saveReviewMap(map: ReviewMap): Promise<void> {
  try {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.reviewHistory,
      JSON.stringify(map),
    );
  } catch {
    // Review history is a nice-to-have — never let storage failures surface
  }
}

/**
 * Record one answered question and persist. Returns the updated map.
 * Correct: move up a box (max 4). Wrong: back to box 0, due soon.
 */
export async function recordAnswer(
  map: ReviewMap,
  conceptId: string,
  questionIndex: number,
  correct: boolean,
): Promise<ReviewMap> {
  const key = recordKey(conceptId, questionIndex);
  const prev = map[key];
  const box = correct ? Math.min((prev?.box ?? 0) + 1, 4) : 0;
  const now = new Date();
  const due = new Date(now.getTime() + BOX_INTERVAL_HOURS[box] * 3600 * 1000);

  const next: ReviewMap = {
    ...map,
    [key]: {
      conceptId,
      questionIndex,
      box,
      timesCorrect: (prev?.timesCorrect ?? 0) + (correct ? 1 : 0),
      timesWrong: (prev?.timesWrong ?? 0) + (correct ? 0 : 1),
      lastSeenAt: now.toISOString(),
      dueAt: due.toISOString(),
    },
  };
  await saveReviewMap(next);
  return next;
}

/**
 * Record an answer without holding a map — used by in-concept practice so
 * every question answered anywhere feeds the review queue.
 */
export async function recordAnswerStandalone(
  conceptId: string,
  questionIndex: number,
  correct: boolean,
): Promise<void> {
  const map = await loadReviewMap();
  await recordAnswer(map, conceptId, questionIndex, correct);
}

/** Concepts the user can review: visited at least once and not paywalled. */
function reviewableConcepts(
  progress: ProgressMap,
  isPremium: boolean,
): Concept[] {
  return ALL_CONCEPTS.filter(
    (c) => progress[c.id]?.concept && !isConceptLocked(c.id, isPremium),
  );
}

function itemFor(concept: Concept, questionIndex: number): ReviewItem | null {
  const question = concept.practice[questionIndex];
  if (!question) return null; // question removed in a content update
  return { concept, question, questionIndex };
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** How many recorded questions are due right now (for the Progress card). */
export function countDue(
  map: ReviewMap,
  progress: ProgressMap,
  isPremium: boolean,
): number {
  const now = Date.now();
  const allowed = new Set(
    reviewableConcepts(progress, isPremium).map((c) => c.id),
  );
  return Object.values(map).filter(
    (r) => allowed.has(r.conceptId) && Date.parse(r.dueAt) <= now,
  ).length;
}

/**
 * Build a mixed session:
 *   1. due questions the user has struggled with (low box first),
 *   2. other due questions (aging correct answers),
 *   3. unseen questions from visited concepts.
 */
export function buildSession(
  map: ReviewMap,
  progress: ProgressMap,
  isPremium: boolean,
  size: number = REVIEW_SESSION_SIZE,
): ReviewItem[] {
  const now = Date.now();
  const concepts = reviewableConcepts(progress, isPremium);
  const byId = new Map(concepts.map((c) => [c.id, c]));

  const due = Object.values(map)
    .filter((r) => byId.has(r.conceptId) && Date.parse(r.dueAt) <= now)
    .sort((a, b) => a.box - b.box || Date.parse(a.dueAt) - Date.parse(b.dueAt));

  const items: ReviewItem[] = [];
  const used = new Set<string>();

  for (const r of due) {
    if (items.length >= size) break;
    const item = itemFor(byId.get(r.conceptId)!, r.questionIndex);
    if (item) {
      items.push(item);
      used.add(recordKey(r.conceptId, r.questionIndex));
    }
  }

  if (items.length < size) {
    const unseen: ReviewItem[] = [];
    for (const c of concepts) {
      c.practice.forEach((_, qi) => {
        const key = recordKey(c.id, qi);
        if (!map[key] && !used.has(key)) {
          const item = itemFor(c, qi);
          if (item) unseen.push(item);
        }
      });
    }
    items.push(...shuffle(unseen).slice(0, size - items.length));
  }

  return items;
}
