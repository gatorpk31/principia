import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, fontSizes } from '../../constants/theme';

interface TabIconProps {
  focused: boolean;
  emoji: string;
  label: string;
  accentColor?: string;
}

function TabIcon({ focused, emoji, label, accentColor = colors.gold }: TabIconProps) {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.emoji, focused && { opacity: 1 }]}>{emoji}</Text>
      <Text
        numberOfLines={1}
        style={[styles.label, { color: focused ? accentColor : colors.text3 }]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} emoji="⊞" label="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} emoji="◎" label="Progress" />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon focused={focused} emoji="◉" label="About" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 8,
  },
  emoji: {
    fontSize: 18,
    opacity: 0.5,
  },
  label: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
  },
});
