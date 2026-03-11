import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../../constants/theme';
import { ProgressDots } from '../ui/ProgressDots';
import { Tag } from '../ui/Tag';
import type { Concept, ConceptProgress } from '../../types';

interface ConceptCardProps {
  concept: Concept;
  progress: ConceptProgress;
  onPress: () => void;
  locked?: boolean;
}

export function ConceptCard({ concept, progress, onPress, locked = false }: ConceptCardProps) {
  const accent = tierColor(concept.tierId);
  const isFullyComplete =
    progress.concept && progress.guided && progress.practice && progress.connections;

  const handlePress = async () => {
    await Haptics.selectionAsync();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.container,
        isFullyComplete && { borderColor: accent + '77' },
        locked && styles.locked,
      ]}
    >
      {/* Glyph */}
      <View style={[styles.glyphContainer, { backgroundColor: accent + '1a' }]}>
        <Text style={styles.glyph}>{concept.glyph}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{concept.title}</Text>
          {locked && <Text style={styles.lockIcon}>🔒</Text>}
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>{concept.subtitle}</Text>

        <View style={styles.footer}>
          <View style={styles.tags}>
            {concept.tags.slice(0, 2).map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </View>
          <ProgressDots
            concept={progress.concept}
            guided={progress.guided}
            practice={progress.practice}
            connections={progress.connections}
            accentColor={accent}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  locked: {
    opacity: 0.6,
  },
  glyphContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    flex: 1,
  },
  lockIcon: {
    fontSize: 12,
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
  },
});
