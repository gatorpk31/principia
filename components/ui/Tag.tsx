import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import type { ConceptTag } from '../../types';

const TAG_COLORS: Record<ConceptTag, string> = {
  arithmetic: colors.green,
  algebra: colors.blue,
  geometry: colors.gold,
  trig: colors.gold,
  precalc: colors.gold,
  calculus: colors.rose,
  proof: colors.rose,
};

interface TagProps {
  tag: ConceptTag;
}

export function Tag({ tag }: TagProps) {
  const color = TAG_COLORS[tag];
  return (
    <View style={[styles.container, { backgroundColor: color + '1a', borderColor: color + '44' }]}>
      <Text style={[styles.label, { color }]}>{tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.full,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  label: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
  },
});
