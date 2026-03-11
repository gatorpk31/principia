import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import { FormulaBox } from '../ui/FormulaBox';
import type { Concept } from '../../types';

interface ConceptTabProps {
  concept: Concept;
  accentColor: string;
  onViewed: () => void;
}

export function ConceptTab({ concept, accentColor, onViewed }: ConceptTabProps) {
  const { conceptTab, accessibilityLevel } = concept;
  const isElementary = accessibilityLevel === 'elementary' || accessibilityLevel === 'middle';
  const bodySize = isElementary ? fontSizes.md : fontSizes.base;

  useEffect(() => {
    // Mark concept tab as viewed on mount
    onViewed();
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* One-sentence summary */}
      <View style={[styles.summaryCard, { borderColor: accentColor + '33', backgroundColor: accentColor + '0d' }]}>
        <Text style={[styles.summary, { color: accentColor, fontSize: bodySize }]}>
          {conceptTab.summary}
        </Text>
      </View>

      {/* Why it matters */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Why this matters</Text>
        <Text style={[styles.bodyText, { fontSize: bodySize }]}>
          {conceptTab.whyItMatters}
        </Text>
      </View>

      {/* Core idea */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>The core idea</Text>
        <Text style={[styles.bodyText, { fontSize: bodySize }]}>
          {conceptTab.coreIdea}
        </Text>
      </View>

      {/* Formula — only after core idea */}
      {conceptTab.formula && (
        <FormulaBox
          formula={conceptTab.formula}
          label={conceptTab.formulaLabel}
          accentColor={accentColor}
        />
      )}

      {/* 3 Key insights */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>3 key insights</Text>
        {conceptTab.insights.map((insight, i) => (
          <View key={i} style={styles.insightRow}>
            <View style={[styles.insightNumber, { backgroundColor: accentColor + '22' }]}>
              <Text style={[styles.insightNum, { color: accentColor }]}>{i + 1}</Text>
            </View>
            <Text style={[styles.bodyText, { flex: 1, fontSize: bodySize }]}>
              {insight}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  summaryCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.base,
  },
  summary: {
    fontFamily: 'Lora-Medium',
    lineHeight: 28,
    textAlign: 'center',
  },
  section: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: fontSizes.xs,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontFamily: 'Lora-Regular',
    color: colors.text,
    lineHeight: 26,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  insightNumber: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  insightNum: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: fontSizes.sm,
  },
});
