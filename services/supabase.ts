import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl: string = Constants.expoConfig?.extra?.supabaseUrl ?? '';
const supabaseAnonKey: string = Constants.expoConfig?.extra?.supabaseAnonKey ?? '';

// Client is only meaningful when env vars are set (paid users, cloud sync)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface SupabaseProgressRow {
  user_id: string;
  concept_id: string;
  tier: number;
  field: 'concept' | 'guided' | 'practice' | 'connections';
  completed_at: string;
}

/**
 * Upsert a single progress field for a user.
 * Additive only — never deletes cloud progress.
 */
export async function upsertProgress(
  userId: string,
  conceptId: string,
  tierId: number,
  field: SupabaseProgressRow['field'],
): Promise<void> {
  if (!supabase) return;

  await supabase.from('progress').upsert(
    {
      user_id: userId,
      concept_id: conceptId,
      tier: tierId,
      field,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,concept_id,field' },
  );
}

/**
 * Fetch all progress rows for a user from Supabase.
 */
export async function fetchCloudProgress(
  userId: string,
): Promise<SupabaseProgressRow[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId);

  if (error) return [];
  return (data as SupabaseProgressRow[]) ?? [];
}
