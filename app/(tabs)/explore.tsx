import React, { useState, useMemo } from 'react';
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
import { ConceptCard } from '../../components/shared/ConceptCard';
import { TierCard } from '../../components/shared/TierCard';
import { StudyAidSheet } from '../../components/shared/StudyAidSheet';
import { useProgress } from '../../hooks/useProgress';
import { useSubscription } from '../../hooks/useSubscription';
import { useStudyAid } from '../../hooks/useStudyAid';
import { APP_NAME } from '../../constants/config';

type FilterKey = 'all' | 'free' | `tier${number}`;

export default function Explore() {
  const router = useRouter();
  const { progress, getConceptProgress, tierPercent } = useProgress();
  const { isPremium } = useSubscription();
  const { generatePDF } = useStudyAid(progress);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [studyAidVisible, setStudyAidVisible] = useState(false);

  const filterPills: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'free', label: 'Free' },
    ...TIERS.map((t) => ({ key: `tier${t.id}` as FilterKey, label: `Tier ${t.id}` })),
  ];

  const filteredTiers = useMemo(() => {
    if (filter === 'free') return TIERS.filter((t) => !t.isPaid);
    if (filter === 'all') return TIERS;
    const tierNum = parseInt(filter.replace('tier', ''), 10);
    return TIERS.filter((t) => t.id === tierNum);
  }, [filter]);

  const handleConceptPress = (conceptId: string, tierId: number, isPaid: boolean) => {
    if (isPaid && !isPremium) {
      router.push('/paywall');
      return;
    }
    router.push(`/concept/${conceptId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.studyAidBtn}
          onPress={() => setStudyAidVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.studyAidText}>Study Aid</Text>
        </TouchableOpacity>

        <Text style={styles.appTitle}>{APP_NAME}</Text>

        {/* Progress orb */}
        <View style={styles.progressOrb}>
          <Text style={styles.orbText}>
            {Object.values(progress).filter((p) => p.concept).length}
          </Text>
        </View>
      </View>

      {/* Filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
        style={styles.pillsScroll}
      >
        {filterPills.map((pill) => (
          <TouchableOpacity
            key={pill.key}
            onPress={() => setFilter(pill.key)}
            style={[styles.pill, filter === pill.key && styles.pillActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, filter === pill.key && styles.pillTextActive]}>
              {pill.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Concept browser */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTiers.map((tier) => {
          const concepts = ALL_CONCEPTS.filter((c) => c.tierId === tier.id);
          if (concepts.length === 0) return null;

          return (
            <View key={tier.id} style={styles.tierSection}>
              <TierCard tier={tier} percentComplete={tierPercent(tier.id)} />
              {concepts.map((concept) => (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  progress={getConceptProgress(concept.id, concept.tierId)}
                  locked={tier.isPaid && !isPremium}
                  onPress={() =>
                    handleConceptPress(concept.id, concept.tierId, tier.isPaid)
                  }
                />
              ))}
            </View>
          );
        })}
      </ScrollView>

      <StudyAidSheet
        visible={studyAidVisible}
        onClose={() => setStudyAidVisible(false)}
        progress={progress}
        onGeneratePDF={generatePDF}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  studyAidBtn: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  studyAidText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text2,
  },
  appTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.gold,
  },
  progressOrb: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.goldDim,
    borderWidth: 1,
    borderColor: colors.gold + '44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbText: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.sm,
    color: colors.gold,
  },
  pillsScroll: {
    maxHeight: 44,
    flexGrow: 0,
  },
  pillsRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
    alignItems: 'center',
  },
  pill: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border2,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  pillActive: {
    backgroundColor: colors.goldDim,
    borderColor: colors.gold,
  },
  pillText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text2,
  },
  pillTextActive: {
    color: colors.gold,
  },
  scroll: {
    flex: 1,
    marginTop: spacing.sm,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: 100,
  },
  tierSection: {
    gap: spacing.xs,
  },
});
