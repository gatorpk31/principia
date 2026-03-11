import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

interface ProgressDotsProps {
  concept: boolean;
  guided: boolean;
  practice: boolean;
  connections: boolean;
  accentColor?: string;
  size?: number;
}

export function ProgressDots({
  concept,
  guided,
  practice,
  connections,
  accentColor = colors.gold,
  size = 7,
}: ProgressDotsProps) {
  const tabs = [concept, guided, practice, connections];

  return (
    <View style={styles.row}>
      {tabs.map((done, i) => (
        <View
          key={i}
          style={[
            { width: size, height: size, borderRadius: size / 2 },
            done
              ? { backgroundColor: accentColor }
              : { backgroundColor: 'transparent', borderWidth: 1, borderColor: accentColor + '55' },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
