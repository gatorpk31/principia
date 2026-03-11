import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import type { TierMeta } from '../../constants/tiers';

interface TierCardProps {
  tier: TierMeta;
  percentComplete: number;
}

export function TierCard({ tier, percentComplete }: TierCardProps) {
  const accent = tier.accentColor;

  return (
    <View style={[styles.container, { borderColor: accent + '33' }]}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: accent + '22' }]}>
          <Text style={[styles.badgeText, { color: accent }]}>Tier {tier.id}</Text>
        </View>
        <View style={[styles.payBadge, tier.isPaid ? styles.paid : styles.free]}>
          <Text style={[styles.payText, tier.isPaid ? { color: colors.gold } : { color: colors.green }]}>
            {tier.isPaid ? 'Premium' : 'Free'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{tier.title}</Text>
      <Text style={styles.grade}>{tier.gradeLevel}</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentComplete}%` as `${number}%`, backgroundColor: accent },
          ]}
        />
      </View>
      {percentComplete > 0 && (
        <Text style={[styles.progressLabel, { color: accent }]}>{percentComplete}% complete</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.base,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
  },
  payBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
  },
  paid: {
    borderColor: colors.gold + '44',
    backgroundColor: colors.goldDim,
  },
  free: {
    borderColor: colors.green + '44',
    backgroundColor: colors.greenDim,
  },
  payText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: 2,
  },
  grade: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    marginBottom: spacing.md,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  progressLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    marginTop: 4,
  },
});
