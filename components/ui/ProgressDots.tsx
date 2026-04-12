import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

interface ProgressDotsProps {
  concept: boolean;
  guided: boolean;
  practice: boolean;
  connections: boolean;
  accentColor?: string;
  size?: number;
}

// Each stage gets a distinct shape so users can tell them apart at a glance.
// Filled = done, outlined = not done.
export const STAGE_SYMBOLS: { key: string; done: string; pending: string; label: string }[] = [
  { key: 'concept', done: '■', pending: '□', label: 'Concept' },
  { key: 'guided', done: '▲', pending: '△', label: 'Guided' },
  { key: 'practice', done: '●', pending: '○', label: 'Practice' },
  { key: 'connections', done: '◆', pending: '◇', label: 'Connections' },
];

export function ProgressDots({
  concept,
  guided,
  practice,
  connections,
  accentColor = colors.gold,
  size = 9,
}: ProgressDotsProps) {
  const tabs = [concept, guided, practice, connections];

  return (
    <View style={styles.row}>
      {tabs.map((done, i) => (
        <Text
          key={i}
          style={{
            fontSize: size,
            color: done ? accentColor : accentColor + '44',
            lineHeight: size + 2,
          }}
        >
          {done ? STAGE_SYMBOLS[i].done : STAGE_SYMBOLS[i].pending}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
});
