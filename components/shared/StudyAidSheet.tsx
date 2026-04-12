import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import { Button } from '../ui/Button';
import { TIERS } from '../../constants/tiers';
import { ALL_CONCEPTS } from '../../data';
import type { ProgressMap } from '../../types';

interface StudyAidSheetProps {
  visible: boolean;
  onClose: () => void;
  progress: ProgressMap;
  onGeneratePDF: () => Promise<void>;
}

export function StudyAidSheet({
  visible,
  onClose,
  progress,
  onGeneratePDF,
}: StudyAidSheetProps) {
  const [loading, setLoading] = useState(false);

  const handlePDF = async () => {
    setLoading(true);
    try {
      await onGeneratePDF();
    } finally {
      setLoading(false);
    }
  };

  const exploredCount = Object.values(progress).filter((p) => p.concept).length;
  const formulaCount = ALL_CONCEPTS.filter(
    (c) => progress[c.id]?.guided && c.conceptTab.formula,
  ).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Reference Sheet</Text>
            <Text style={styles.headerSub}>
              {exploredCount} concepts · {formulaCount} formulas unlocked
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {TIERS.map((tier) => {
            const concepts = ALL_CONCEPTS.filter(
              (c) => c.tierId === tier.id && progress[c.id]?.concept,
            );
            if (concepts.length === 0) return null;
            const accent = tierColor(tier.id);

            return (
              <View key={tier.id} style={styles.tierSection}>
                <View style={[styles.tierHeader, { borderLeftColor: accent }]}>
                  <Text style={[styles.tierTitle, { color: accent }]}>
                    Tier {tier.id}
                  </Text>
                  <Text style={styles.tierName}>{tier.title}</Text>
                </View>

                {concepts.map((concept) => {
                  const p = progress[concept.id];
                  const hasFormula = !!concept.conceptTab.formula && p?.guided;
                  const hasInsight = p?.concept;

                  return (
                    <View key={concept.id} style={styles.conceptCard}>
                      <View style={styles.conceptHeader}>
                        <Text style={styles.conceptGlyph}>{concept.glyph}</Text>
                        <Text style={styles.conceptTitle}>{concept.title}</Text>
                      </View>

                      {/* Core summary — always shown */}
                      <Text style={styles.conceptSummary}>
                        {concept.conceptTab.summary}
                      </Text>

                      {/* Formula — shown after completing guided */}
                      {hasFormula && (
                        <View style={[styles.formulaBox, { borderColor: accent + '33', backgroundColor: accent + '0a' }]}>
                          {concept.conceptTab.formulaLabel && (
                            <Text style={styles.formulaLabel}>
                              {concept.conceptTab.formulaLabel}
                            </Text>
                          )}
                          <Text style={[styles.formula, { color: accent }]}>
                            {concept.conceptTab.formula}
                          </Text>
                        </View>
                      )}

                      {/* Key insight — first insight from the concept */}
                      {hasInsight && concept.conceptTab.insights[0] && (
                        <Text style={styles.insight}>
                          {concept.conceptTab.insights[0]}
                        </Text>
                      )}

                      {/* Connections */}
                      {p?.connections && concept.connections.length > 0 && (
                        <Text style={styles.connections}>
                          Links to: {concept.connections.map((c) => c.title).join(' · ')}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}

          {exploredCount === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Your Reference Sheet</Text>
              <Text style={styles.emptyText}>
                As you explore concepts, formulas and key ideas will appear here — building your personalized math reference.
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label="Save as PDF"
            onPress={handlePDF}
            loading={loading}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  headerSub: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    marginTop: 2,
  },
  closeBtn: {
    padding: spacing.sm,
  },
  closeText: {
    color: colors.text2,
    fontSize: fontSizes.md,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  tierSection: {
    gap: spacing.sm,
  },
  tierHeader: {
    borderLeftWidth: 3,
    paddingLeft: spacing.sm,
    marginBottom: spacing.xs,
  },
  tierTitle: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
  },
  tierName: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text2,
  },
  conceptCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  conceptGlyph: {
    fontSize: 16,
  },
  conceptTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    flex: 1,
  },
  conceptSummary: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    lineHeight: 20,
  },
  formulaBox: {
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    gap: 2,
  },
  formulaLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
  },
  formula: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.base,
    textAlign: 'center',
  },
  insight: {
    fontFamily: typography.body,
    fontSize: fontSizes.xs,
    color: colors.text3,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  connections: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.lg,
    color: colors.text2,
  },
  emptyText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});
