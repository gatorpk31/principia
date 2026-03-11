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
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Study Aid</Text>
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

            return (
              <View key={tier.id} style={styles.tierSection}>
                <Text style={[styles.tierTitle, { color: tier.accentColor }]}>
                  Tier {tier.id} — {tier.title}
                </Text>
                {concepts.map((concept) => {
                  const p = progress[concept.id];
                  return (
                    <View key={concept.id} style={styles.conceptRow}>
                      <Text style={styles.conceptGlyph}>{concept.glyph}</Text>
                      <View style={styles.conceptInfo}>
                        <Text style={styles.conceptTitle}>{concept.title}</Text>
                        <Text style={styles.conceptSummary}>
                          {concept.conceptTab.summary}
                        </Text>
                        {concept.conceptTab.formula && p?.guided && (
                          <Text style={styles.formula}>
                            {concept.conceptTab.formula}
                          </Text>
                        )}
                        {p?.connections && concept.connections.length > 0 && (
                          <Text style={styles.connections}>
                            Connects to:{' '}
                            {concept.connections.map((c) => c.title).join(', ')}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}

          {Object.keys(progress).filter((id) => progress[id].concept).length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Start exploring concepts to build your personalized study aid.
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
  },
  tierSection: {
    gap: spacing.sm,
  },
  tierTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.md,
    marginBottom: spacing.xs,
  },
  conceptRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.border2,
    paddingVertical: spacing.xs,
  },
  conceptGlyph: {
    fontSize: 20,
    width: 28,
  },
  conceptInfo: {
    flex: 1,
    gap: 2,
  },
  conceptTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  conceptSummary: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
  },
  formula: {
    fontFamily: typography.mono,
    fontSize: fontSizes.sm,
    color: colors.gold,
    marginTop: 2,
  },
  connections: {
    fontFamily: typography.body,
    fontSize: fontSizes.xs,
    color: colors.text3,
    fontStyle: 'italic',
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});
