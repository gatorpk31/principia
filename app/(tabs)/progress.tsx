import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import { TIERS } from '../../constants/tiers';
import { ALL_CONCEPTS } from '../../data';
import { useProgress } from '../../hooks/useProgress';
import { STAGE_SYMBOLS } from '../../components/ui/ProgressDots';

export default function Progress() {
  const router = useRouter();
  const { progress, overallPercent, tierPercent } = useProgress();

  const exploredCount = Object.values(progress).filter((p) => p.concept).length;
  const fullyDoneCount = Object.values(progress).filter(
    (p) => p.concept && p.guided && p.practice && p.connections,
  ).length;

  // Spaced repetition: concepts the user has started but not fully completed
  const reviewSuggestions = useMemo(() => {
    return ALL_CONCEPTS
      .filter((c) => {
        const p = progress[c.id];
        if (!p?.concept) return false; // never explored
        if (p.concept && p.guided && p.practice && p.connections) return false; // fully done
        return true;
      })
      .sort((a, b) => {
        // Prioritize: concepts missing more tabs, and from lower tiers first
        const pa = progress[a.id];
        const pb = progress[b.id];
        const doneA = [pa?.concept, pa?.guided, pa?.practice, pa?.connections].filter(Boolean).length;
        const doneB = [pb?.concept, pb?.guided, pb?.practice, pb?.connections].filter(Boolean).length;
        if (doneA !== doneB) return doneA - doneB; // fewer done tabs = higher priority
        return a.tierId - b.tierId; // lower tier first
      })
      .slice(0, 5);
  }, [progress]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Progress</Text>

        {/* Overview card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewStat}>
            <Text style={[styles.statValue, { color: colors.gold }]}>{overallPercent}%</Text>
            <Text style={styles.statLabel}>Overall</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewStat}>
            <Text style={[styles.statValue, { color: colors.blue }]}>{exploredCount}</Text>
            <Text style={styles.statLabel}>Explored</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewStat}>
            <Text style={[styles.statValue, { color: colors.green }]}>{fullyDoneCount}</Text>
            <Text style={styles.statLabel}>Mastered</Text>
          </View>
        </View>

        {/* Per-tier breakdown */}
        <Text style={styles.sectionTitle}>By Tier</Text>
        {TIERS.map((tier) => {
          const pct = tierPercent(tier.id);
          const accent = tierColor(tier.id);
          const tierConcepts = ALL_CONCEPTS.filter((c) => c.tierId === tier.id);
          const done = tierConcepts.filter((c) => {
            const p = progress[c.id];
            return p?.concept && p?.guided && p?.practice && p?.connections;
          }).length;

          return (
            <View key={tier.id} style={styles.tierRow}>
              <View style={styles.tierInfo}>
                <View style={[styles.tierDot, { backgroundColor: accent }]} />
                <View style={styles.tierText}>
                  <Text style={styles.tierTitle}>Tier {tier.id} — {tier.title}</Text>
                  <Text style={styles.tierSub}>{done}/{tierConcepts.length} mastered</Text>
                </View>
              </View>
              <View style={styles.tierBarTrack}>
                <View
                  style={[
                    styles.tierBarFill,
                    { width: `${pct}%` as `${number}%`, backgroundColor: accent },
                  ]}
                />
              </View>
              <Text style={[styles.tierPct, { color: accent }]}>{pct}%</Text>
            </View>
          );
        })}

        {/* Review suggestions — spaced repetition nudge */}
        {reviewSuggestions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Review Suggested</Text>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewSubtext}>
                These concepts are started but not yet mastered. Revisiting them strengthens retention.
              </Text>
              {reviewSuggestions.map((concept) => {
                const p = progress[concept.id];
                const accent = tierColor(concept.tierId);
                const remaining = [
                  !p?.guided && 'Guided',
                  !p?.practice && 'Practice',
                  !p?.connections && 'Connections',
                ].filter(Boolean);
                return (
                  <TouchableOpacity
                    key={concept.id}
                    style={[styles.reviewCard, { borderColor: accent + '33' }]}
                    onPress={() => router.push(`/concept/${concept.id}`)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.reviewGlyph}>{concept.glyph}</Text>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewTitle} numberOfLines={1}>{concept.title}</Text>
                      <Text style={[styles.reviewRemaining, { color: accent }]}>
                        {remaining.join(' · ')}
                      </Text>
                    </View>
                    <Text style={[styles.reviewArrow, { color: accent }]}>→</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* 4-tab legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Progress shapes explained</Text>
          {[
            { desc: 'Read the explanation' },
            { desc: 'Completed the worked example' },
            { desc: 'Answered the practice questions' },
            { desc: 'Explored the connections' },
          ].map((item, i) => (
            <View key={i} style={styles.legendRow}>
              <Text style={[styles.legendDot, { color: colors.gold }]}>{STAGE_SYMBOLS[i].done}</Text>
              <Text style={styles.legendLabel}>{STAGE_SYMBOLS[i].label}</Text>
              <Text style={styles.legendDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: 100,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  overviewCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    padding: spacing.base,
  },
  overviewStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  overviewDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  statValue: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
  },
  statLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text2,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text2,
    letterSpacing: 0.3,
  },
  tierRow: {
    gap: spacing.sm,
  },
  tierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    flexShrink: 0,
  },
  tierText: {
    flex: 1,
  },
  tierTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  tierSub: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
  },
  tierBarTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  tierBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  tierPct: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    alignSelf: 'flex-end',
  },
  legend: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    gap: spacing.sm,
  },
  legendTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text2,
    marginBottom: spacing.xs,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendDot: {
    width: 16,
    fontSize: 10,
    textAlign: 'center',
  },
  legendLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
    width: 80,
  },
  legendDesc: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    flex: 1,
  },
  reviewSection: {
    gap: spacing.sm,
  },
  reviewSubtext: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  reviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  reviewGlyph: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  reviewInfo: {
    flex: 1,
    gap: 2,
  },
  reviewTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  reviewRemaining: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
  },
  reviewArrow: {
    fontSize: fontSizes.md,
  },
});
