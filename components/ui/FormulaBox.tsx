import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';

interface FormulaBoxProps {
  formula: string;
  label?: string;
  accentColor?: string;
}

export function FormulaBox({ formula, label, accentColor = colors.gold }: FormulaBoxProps) {
  return (
    <View style={[styles.container, { borderColor: accentColor + '44', backgroundColor: accentColor + '0d' }]}>
      {label ? (
        <Text style={[styles.label, { color: accentColor }]}>{label}</Text>
      ) : null}
      <Text style={[styles.formula, { color: accentColor }]}>{formula}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.base,
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  label: {
    fontFamily: typography.body,
    fontSize: fontSizes.xs,
    marginBottom: 4,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  formula: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.lg,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
