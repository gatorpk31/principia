import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import { ALL_CONCEPTS } from '../../data';
import { TIERS } from '../../constants/tiers';
import { ConceptTab } from '../../components/concept/ConceptTab';
import { GuidedTab } from '../../components/concept/GuidedTab';
import { PracticeTab } from '../../components/concept/PracticeTab';
import { ConnectionsTab } from '../../components/concept/ConnectionsTab';
import { ConceptVisualization } from '../../components/concept/ConceptVisualization';
import { useProgress } from '../../hooks/useProgress';
import { useSubscription } from '../../hooks/useSubscription';
import { logConceptVisit, logTabComplete } from '../../services/analytics';

export { ErrorBoundary } from 'expo-router';

type TabName = 'concept' | 'guided' | 'practice' | 'connections';

const TAB_LABELS: { key: TabName; label: string }[] = [
  { key: 'concept', label: 'Concept' },
  { key: 'guided', label: 'Guided' },
  { key: 'practice', label: 'Practice' },
  { key: 'connections', label: 'Connections' },
];

export default function ConceptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getConceptProgress, markExplored } = useProgress();
  const { isPremium } = useSubscription();
  const [activeTab, setActiveTab] = useState<TabName>('concept');

  const concept = ALL_CONCEPTS.find((c) => c.id === id);

  if (!concept) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>Concept not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: colors.gold }}>← Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Enforce paywall: if this concept belongs to a paid tier and user is not premium,
  // redirect to paywall instead of showing the content.
  const tier = TIERS.find((t) => t.id === concept.tierId);
  if (tier?.isPaid && !isPremium) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>This content requires a subscription.</Text>
        <TouchableOpacity onPress={() => router.push('/paywall')}>
          <Text style={{ color: colors.gold }}>Unlock Premium →</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: spacing.sm }}>
          <Text style={{ color: colors.text2 }}>← Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const accent = tierColor(concept.tierId);
  const progress = getConceptProgress(concept.id, concept.tierId);

  const handleTabChange = async (tab: TabName) => {
    await Haptics.selectionAsync();
    setActiveTab(tab);
    logConceptVisit(concept.id, concept.tierId);
  };

  const handleConceptViewed = useCallback(() => {
    if (!progress.concept) {
      markExplored(concept.id, concept.tierId, 'concept');
      logTabComplete(concept.id, 'concept');
    }
  }, [progress.concept, concept.id, concept.tierId]);

  const handleGuidedComplete = useCallback(() => {
    if (!progress.guided) {
      markExplored(concept.id, concept.tierId, 'guided');
      logTabComplete(concept.id, 'guided');
    }
  }, [progress.guided, concept.id, concept.tierId]);

  const handlePracticeComplete = useCallback((score: number) => {
    if (!progress.practice) {
      markExplored(concept.id, concept.tierId, 'practice', score);
      logTabComplete(concept.id, 'practice');
    }
  }, [progress.practice, concept.id, concept.tierId]);

  const handleConnectionsViewed = useCallback(() => {
    if (!progress.connections) {
      markExplored(concept.id, concept.tierId, 'connections');
      logTabComplete(concept.id, 'connections');
    }
  }, [progress.connections, concept.id, concept.tierId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={[styles.tierBadge, { backgroundColor: accent + '22' }]}>
          <Text style={[styles.tierBadgeText, { color: accent }]}>Tier {concept.tierId}</Text>
        </View>
      </View>

      {/* Title area */}
      <View style={styles.titleArea}>
        <Text style={styles.glyph}>{concept.glyph}</Text>
        <View style={styles.titleText}>
          <Text style={styles.title}>{concept.title}</Text>
          <Text style={styles.subtitle}>{concept.subtitle}</Text>
        </View>
      </View>

      {/* Visualization */}
      <ConceptVisualization
        type={concept.visualizationType}
        accentColor={accent}
        label={concept.canvasLabel}
        tierId={concept.tierId}
      />

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TAB_LABELS.map(({ key, label }) => {
          const isDone = progress[key];
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handleTabChange(key)}
              style={[
                styles.tab,
                activeTab === key && [styles.tabActive, { borderBottomColor: accent }],
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === key ? { color: accent } : { color: colors.text3 },
                ]}
              >
                {label}
              </Text>
              {isDone && (
                <View style={[styles.tabDot, { backgroundColor: accent }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab content */}
      <View style={styles.tabContent}>
        {activeTab === 'concept' && (
          <ConceptTab
            concept={concept}
            accentColor={accent}
            onViewed={handleConceptViewed}
          />
        )}
        {activeTab === 'guided' && (
          <GuidedTab
            concept={concept}
            accentColor={accent}
            isRevisit={progress.guided}
            onComplete={handleGuidedComplete}
          />
        )}
        {activeTab === 'practice' && (
          <PracticeTab
            concept={concept}
            accentColor={accent}
            onComplete={handlePracticeComplete}
            onSeeConnections={() => handleTabChange('connections')}
          />
        )}
        {activeTab === 'connections' && (
          <ConnectionsTab
            concept={concept}
            accentColor={accent}
            onViewed={handleConnectionsViewed}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  notFound: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundText: {
    fontFamily: typography.body,
    fontSize: fontSizes.md,
    color: colors.text2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    padding: spacing.xs,
  },
  backText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
  },
  tierBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  tierBadgeText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  glyph: {
    fontSize: 36,
  },
  titleText: {
    flex: 1,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    position: 'relative',
  },
  tabActive: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.3,
  },
  tabDot: {
    position: 'absolute',
    top: 4,
    right: '50%',
    marginRight: -18,
    width: 5,
    height: 5,
    borderRadius: radius.full,
  },
  tabContent: {
    flex: 1,
  },
});
