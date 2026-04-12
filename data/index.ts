import { TIER1_CONCEPTS } from './tier1';
import { TIER2_CONCEPTS } from './tier2';
import { TIER3_CONCEPTS } from './tier3';
import { TIER4_CONCEPTS } from './tier4';
import { TIER5_CONCEPTS } from './tier5';
import { TIER6_CONCEPTS } from './tier6';
import { TIER7_CONCEPTS } from './tier7';
import { TIER8_CONCEPTS } from './tier8';
import type { Concept } from '../types';
import { TIERS } from '../constants/tiers';

export {
  TIER1_CONCEPTS,
  TIER2_CONCEPTS,
  TIER3_CONCEPTS,
  TIER4_CONCEPTS,
  TIER5_CONCEPTS,
  TIER6_CONCEPTS,
  TIER7_CONCEPTS,
  TIER8_CONCEPTS,
};

export const ALL_CONCEPTS: Concept[] = [
  ...TIER1_CONCEPTS,
  ...TIER2_CONCEPTS,
  ...TIER3_CONCEPTS,
  ...TIER4_CONCEPTS,
  ...TIER5_CONCEPTS,
  ...TIER6_CONCEPTS,
  ...TIER7_CONCEPTS,
  ...TIER8_CONCEPTS,
];

export function getConceptById(id: string): Concept | undefined {
  return ALL_CONCEPTS.find((c) => c.id === id);
}

export function getConceptsByTier(tierId: number): Concept[] {
  return ALL_CONCEPTS.filter((c) => c.tierId === tierId);
}

/**
 * Returns concepts that list the given conceptId in their connections.
 * These are the "prerequisites" — earlier ideas that lead into this one.
 */
export function getPrerequisites(conceptId: string): Concept[] {
  return ALL_CONCEPTS.filter((c) =>
    c.connections.some((conn) => conn.conceptId === conceptId),
  );
}

/**
 * Determines if a concept is locked (requires premium).
 * Respects freePreviewCount: first N concepts in a paid tier are free.
 */
export function isConceptLocked(conceptId: string, isPremium: boolean): boolean {
  if (isPremium) return false;
  const concept = ALL_CONCEPTS.find((c) => c.id === conceptId);
  if (!concept) return false;
  const tier = TIERS.find((t) => t.id === concept.tierId);
  if (!tier || !tier.isPaid) return false;
  if (tier.freePreviewCount) {
    const tierConcepts = ALL_CONCEPTS.filter((c) => c.tierId === tier.id);
    const index = tierConcepts.findIndex((c) => c.id === conceptId);
    if (index < tier.freePreviewCount) return false;
  }
  return true;
}
