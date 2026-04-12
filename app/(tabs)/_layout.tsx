import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors, typography, fontSizes } from '../../constants/theme';

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
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.text3,
        tabBarLabelStyle: {
          fontFamily: typography.mono,
          fontSize: fontSizes.xs,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>⊞</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>◎</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>⚙</Text>
          ),
        }}
      />
    </Tabs>
  );
}
