import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { initRevenueCat } from '../services/revenuecat';
import { colors } from '../constants/theme';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'PlayfairDisplay-Bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
    'Lora-Medium': require('../assets/fonts/Lora-Medium.ttf'),
    'JetBrainsMono-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Bold': require('../assets/fonts/JetBrainsMono-Bold.ttf'),
  });

  useEffect(() => {
    // initRevenueCat();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={colors.bg} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="concept/[id]" options={{ presentation: 'card', animation: 'slide_from_right' }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="legal/terms" options={{ presentation: 'modal' }} />
          <Stack.Screen name="legal/privacy" options={{ presentation: 'modal' }} />
          <Stack.Screen name="legal/coppa" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
}
