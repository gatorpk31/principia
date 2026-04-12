import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import { TIERS } from '../../constants/tiers';
import { ALL_CONCEPTS, isConceptLocked } from '../../data';
import { ConceptCard } from '../../components/shared/ConceptCard';
import { TierCard } from '../../components/shared/TierCard';
import { StudyAidSheet } from '../../components/shared/StudyAidSheet';
import { useProgress } from '../../hooks/useProgress';
import { useSubscription } from '../../hooks/useSubscription';
import { useStudyAid } from '../../hooks/useStudyAid';
import { useBookmarks } from '../../hooks/useBookmarks';
import { APP_NAME } from '../../constants/config';

type FilterKey = 'all' | 'free' | 'saved' | `tier${number}`;

export default function Explore() {
  const router = useRouter();
  const { progress, getConceptProgress, tierPercent } = useProgress();
  const { isPremium } = useSubscription();
  const { generatePDF } = useStudyAid(progress);
  const { bookmarks, isBookmarked } = useBookmarks();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studyAidVisible, setStudyAidVisible] = useState(false);

  const filterPills: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'free', label: 'Free' },
    ...(bookmarks.length > 0 ? [{ key: 'saved' as FilterKey, label: `Saved (${bookmarks.length})` }] : []),
    ...TIERS.map((t) => ({ key: `tier${t.id}` as FilterKey, label: `Tier ${t.id}` })),
  ];

  const filteredTiers = useMemo(() => {
    if (filter === 'free') return TIERS.filter((t) => !t.isPaid);
    if (filter === 'all') return TIERS;
    const tierNum = parseInt(filter.replace('tier', ''), 10);
    return TIERS.filter((t) => t.id === tierNum);
  }, [filter]);

  const searchLower = searchQuery.toLowerCase().trim();
  const searchActive = searchLower.length > 0;

  const searchResults = useMemo(() => {
    if (!searchActive) return [];
    return ALL_CONCEPTS.filter(
      (c) =>
        c.title.toLowerCase().includes(searchLower) ||
        c.subtitle.toLowerCase().includes(searchLower) ||
        c.tags.some((t) => t.toLowerCase().includes(searchLower)),
    );
  }, [searchLower, searchActive]);

  const handleConceptPress = (conceptId: string) => {
    if (isConceptLocked(conceptId, isPremium)) {
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
          <Text style={styles.studyAidText}>Reference</Text>
        </TouchableOpacity>

        <Text style={styles.appTitle}>{APP_NAME}</Text>

        {/* Progress orb */}
        <View style={styles.progressOrb}>
          <Text style={styles.orbText}>
            {Object.values(progress).filter((p) => p.concept).length}
          </Text>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search concepts…"
          placeholderTextColor={colors.text3}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
      </View>

      {/* Filter pills — hidden when searching */}
      {!searchActive && (
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
      )}

      {/* Concept browser */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {searchActive ? (
          <>
            <Text style={styles.searchResultsLabel}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </Text>
            {searchResults.map((concept) => {
              const tier = TIERS.find((t) => t.id === concept.tierId);
              return (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  progress={getConceptProgress(concept.id, concept.tierId)}
                  locked={isConceptLocked(concept.id, isPremium)}
                  onPress={() => handleConceptPress(concept.id)}
                />
              );
            })}
          </>
        ) : filter === 'saved' ? (
          <>
            <Text style={styles.searchResultsLabel}>
              {bookmarks.length} saved concept{bookmarks.length !== 1 ? 's' : ''}
            </Text>
            {ALL_CONCEPTS.filter((c) => isBookmarked(c.id)).map((concept) => {
              const tier = TIERS.find((t) => t.id === concept.tierId);
              return (
                <ConceptCard
                  key={concept.id}
                  concept={concept}
                  progress={getConceptProgress(concept.id, concept.tierId)}
                  locked={isConceptLocked(concept.id, isPremium)}
                  onPress={() => handleConceptPress(concept.id)}
                />
              );
            })}
          </>
        ) : (
          filteredTiers.map((tier) => {
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
                    locked={isConceptLocked(concept.id, isPremium)}
                    onPress={() => handleConceptPress(concept.id)}
                  />
                ))}
              </View>
            );
          })
        )}
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.base,
    paddingVertical: 10,
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  searchResultsLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
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
