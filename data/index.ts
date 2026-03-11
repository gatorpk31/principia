import { TIER1_CONCEPTS } from './tier1';
import { TIER2_CONCEPTS } from './tier2';
import { TIER3_CONCEPTS } from './tier3';
import { TIER4_CONCEPTS } from './tier4';
import { TIER5_CONCEPTS } from './tier5';
import { TIER6_CONCEPTS } from './tier6';
import { TIER7_CONCEPTS } from './tier7';
import { TIER8_CONCEPTS } from './tier8';
import type { Concept } from '../types';

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
