import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import type { Concept } from '../../types';

interface GuidedTabProps {
  concept: Concept;
  accentColor: string;
  isRevisit: boolean;
  onComplete: () => void;
}

export function GuidedTab({ concept, accentColor, isRevisit, onComplete }: GuidedTabProps) {
  const { guided, accessibilityLevel } = concept;
  const isElementary = accessibilityLevel === 'elementary' || accessibilityLevel === 'middle';
  const bodySize = isElementary ? fontSizes.md : fontSizes.base;
  const nextStepLabel = isElementary ? "Got it! What's next?" : 'I understand — show next step';

  const [revealedCount, setRevealedCount] = useState(isRevisit ? guided.steps.length : 0);
  const [completed, setCompleted] = useState(isRevisit);

  const handleReveal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const next = revealedCount + 1;
    setRevealedCount(next);
    if (next >= guided.steps.length) {
      setCompleted(true);
      onComplete();
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Problem statement */}
      <View style={[styles.problemCard, { borderColor: accentColor + '44' }]}>
        <Text style={styles.problemLabel}>Worked Problem</Text>
        <Text style={[styles.problemText, { fontSize: bodySize }]}>
          {guided.problemStatement}
        </Text>
      </View>

      {/* Steps */}
      {guided.steps.slice(0, revealedCount).map((step, i) => (
        <View key={i} style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={[styles.stepBadge, { backgroundColor: accentColor + '22' }]}>
              <Text style={[styles.stepNumber, { color: accentColor }]}>Step {i + 1}</Text>
            </View>
            <Text style={styles.stepLabel}>{step.label}</Text>
          </View>

          {step.math && (
            <View style={[styles.mathBox, { borderColor: accentColor + '33', backgroundColor: accentColor + '0a' }]}>
              <Text style={[styles.mathText, { color: accentColor }]}>{step.math}</Text>
            </View>
          )}

          <Text style={[styles.stepExplanation, { fontSize: bodySize }]}>
            {step.explanation}
          </Text>

          {step.connectionNote && (
            <View style={styles.connectionNote}>
              <Text style={styles.connectionNoteText}>💡 {step.connectionNote}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Reveal next step button */}
      {revealedCount < guided.steps.length && (
        <TouchableOpacity
          style={[styles.revealButton, { borderColor: accentColor }]}
          onPress={handleReveal}
          activeOpacity={0.8}
        >
          <Text style={[styles.revealText, { color: accentColor }]}>
            {revealedCount === 0 ? 'Show first step' : nextStepLabel}
          </Text>
        </TouchableOpacity>
      )}

      {/* Reflection prompt — shown after all steps */}
      {completed && (
        <View style={[styles.reflectionCard, { borderColor: accentColor + '55', backgroundColor: accentColor + '0d' }]}>
          <Text style={styles.reflectionLabel}>Reflect</Text>
          <Text style={[styles.reflectionText, { fontSize: bodySize }]}>
            {guided.reflectionPrompt}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    padding: spacing.lg,
    gap: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  problemCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.base,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  problemLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  problemText: {
    fontFamily: typography.bodyMedium,
    color: colors.text,
    lineHeight: 26,
  },
  stepCard: {
    backgroundColor: colors.surface2,
    borderRadius: radius.lg,
    padding: spacing.base,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  stepNumber: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
  },
  stepLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    flex: 1,
  },
  mathBox: {
    borderRadius: radius.sm,
    borderWidth: 1,
    padding: spacing.sm,
    alignItems: 'center',
  },
  mathText: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.md,
    letterSpacing: 0.5,
  },
  stepExplanation: {
    fontFamily: typography.body,
    color: colors.text2,
    lineHeight: 24,
  },
  connectionNote: {
    backgroundColor: colors.surface3,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  connectionNoteText: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    lineHeight: 20,
  },
  revealButton: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    padding: spacing.base,
    alignItems: 'center',
  },
  revealText: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
  },
  reflectionCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.base,
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  reflectionLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  reflectionText: {
    fontFamily: typography.bodyMedium,
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
  },
});
