import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import type { Concept } from '../../types';

interface ConnectionsTabProps {
  concept: Concept;
  accentColor: string;
  onViewed: () => void;
}

export function ConnectionsTab({ concept, accentColor, onViewed }: ConnectionsTabProps) {
  const router = useRouter();

  useEffect(() => {
    onViewed();
  }, []);

  const handleNavigate = async (conceptId: string) => {
    await Haptics.selectionAsync();
    router.push(`/concept/${conceptId}`);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.intro}>
        Mathematics is one connected whole. Every idea leads somewhere.
      </Text>

      {concept.connections.map((conn, i) => {
        const connAccent = tierColor(conn.tierId);
        return (
          <TouchableOpacity
            key={i}
            style={[styles.connectionCard, { borderColor: connAccent + '33' }]}
            onPress={() => handleNavigate(conn.conceptId)}
            activeOpacity={0.8}
          >
            <View style={styles.connectionHeader}>
              <View style={[styles.tierBadge, { backgroundColor: connAccent + '22' }]}>
                <Text style={[styles.tierBadgeText, { color: connAccent }]}>
                  Tier {conn.tierId}
                </Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </View>

            <Text style={styles.connectionTitle}>{conn.title}</Text>

            <View style={[styles.formulaBox, { borderColor: connAccent + '33', backgroundColor: connAccent + '0a' }]}>
              <Text style={[styles.bridgeFormula, { color: connAccent }]}>
                {conn.bridgeFormula}
              </Text>
            </View>

            <Text style={styles.connectionExplanation}>{conn.explanation}</Text>

            <Text style={[styles.tapHint, { color: connAccent }]}>
              Tap to explore →
            </Text>
          </TouchableOpacity>
        );
      })}

      {concept.connections.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Connections coming soon.</Text>
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
  intro: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  connectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.base,
    gap: spacing.sm,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tierBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  tierBadgeText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
  },
  arrowIcon: {
    color: colors.text3,
    fontSize: fontSizes.md,
  },
  connectionTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  formulaBox: {
    borderRadius: radius.sm,
    borderWidth: 1,
    padding: spacing.sm,
    alignItems: 'center',
  },
  bridgeFormula: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.base,
    textAlign: 'center',
  },
  connectionExplanation: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    lineHeight: 22,
  },
  tapHint: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    alignSelf: 'flex-end',
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text3,
  },
});
