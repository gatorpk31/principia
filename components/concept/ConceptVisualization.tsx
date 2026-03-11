import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
// import Svg, {
//   Circle,
//   Line,
//   Rect,
//   Text as SvgText,
//   Path,
//   G,
//   Defs,
//   LinearGradient,
//   Stop,
// } from 'react-native-svg';
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withRepeat,
//   withTiming,
//   Easing,
// } from 'react-native-reanimated';
import { colors } from '../../constants/theme';
import type { VisualizationType } from '../../types';

const W = Dimensions.get('window').width - 40;
const H = 220;

interface ConceptVisualizationProps {
  type: VisualizationType;
  accentColor: string;
  label: string;
  tierId: number;
}

// ── Main component ────────────────────────────────────────────────────────────
export function ConceptVisualization({
  type,
  accentColor,
  label,
}: ConceptVisualizationProps) {
  // Placeholder for native SVG visualizations (disabled for Expo Go testing)
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: accentColor, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        {label || type}
      </Text>
      <Text style={{ color: colors.text3, fontSize: 12 }}>
        Visualization (SVG disabled for Expo Go)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    height: H,
  },
});
