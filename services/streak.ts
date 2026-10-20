// Daily practice streak and goal.
//
// Every practice answer (in a concept or in Mixed Review) passes through
// recordAnswer in services/review.ts, which calls recordActivity here. A day
// counts toward the streak once at least one question is answered.
//
// Design choices, deliberately:
// - On-device only (AsyncStorage). No account, no server, nothing transmitted —
//   consistent with the app's privacy and COPPA posture.
// - Days are LOCAL calendar days. Using UTC dates would break a streak for a
//   student in the US practising in the evening, whose "today" has already
//   rolled over in UTC.
// - Not punitive. A streak stays alive through the end of today even if the
//   student has not practised yet, and a broken streak is simply restarted —
//   no lost-progress messaging, which suits an app with young users.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';

/** Questions to answer in a day to meet the daily goal. */
export const DAILY_GOAL = 10;

/** Days of history kept on device; enough for any streak we display. */
const HISTORY_DAYS = 400;

/** Answers per local calendar day, keyed 'YYYY-MM-DD'. */
export type ActivityLog = Record<string, number>;

export interface ActivitySummary {
  todayCount: number;
  goal: number;
  goalMet: boolean;
  streak: number;
  practicedToday: boolean;
}

/** 'YYYY-MM-DD' for the device's local calendar day. */
export function localDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function previousDay(date: Date): Date {
  // Step by calendar day, not by 24h, so daylight-saving shifts cannot skip
  // or repeat a day.
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
}

/**
 * Consecutive days with practice, counting back from today. If today has no
 * practice yet, the streak still counts from yesterday — it only breaks once a
 * whole day passes without practice.
 */
export function computeStreak(log: ActivityLog, now: Date): number {
  let day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!(log[localDayKey(day)] > 0)) day = previousDay(day);
  let streak = 0;
  while (log[localDayKey(day)] > 0) {
    streak += 1;
    day = previousDay(day);
  }
  return streak;
}

export function summarize(log: ActivityLog, now: Date): ActivitySummary {
  const todayCount = log[localDayKey(now)] ?? 0;
  return {
    todayCount,
    goal: DAILY_GOAL,
    goalMet: todayCount >= DAILY_GOAL,
    streak: computeStreak(log, now),
    practicedToday: todayCount > 0,
  };
}

/** Drop days older than the history window so storage stays small. */
export function prune(log: ActivityLog, now: Date): ActivityLog {
  const cutoff = localDayKey(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - HISTORY_DAYS),
  );
  const out: ActivityLog = {};
  for (const [k, v] of Object.entries(log)) if (k >= cutoff) out[k] = v;
  return out;
}

export async function loadActivity(): Promise<ActivityLog> {
  try {
    const raw = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.activityLog);
    return raw ? (JSON.parse(raw) as ActivityLog) : {};
  } catch {
    return {};
  }
}

// Serialise writes: answers are recorded fire-and-forget, so two could
// otherwise read the same count and one increment would be lost.
let writeChain: Promise<void> = Promise.resolve();

/** Count one answered question toward today. Never throws. */
export function recordActivity(now: Date = new Date()): Promise<void> {
  writeChain = writeChain
    .then(async () => {
      const log = await loadActivity();
      const key = localDayKey(now);
      log[key] = (log[key] ?? 0) + 1;
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.activityLog,
        JSON.stringify(prune(log, now)),
      );
    })
    .catch(() => {
      // Streaks are encouragement, not data the student depends on —
      // a storage failure must never interrupt practice.
    });
  return writeChain;
}

export async function getActivitySummary(now: Date = new Date()): Promise<ActivitySummary> {
  return summarize(await loadActivity(), now);
}
