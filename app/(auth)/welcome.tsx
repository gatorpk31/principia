import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, fontSizes, spacing } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { APP_NAME, APP_TAGLINE } from '../../constants/config';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.goldDim, 'transparent']}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.tagline}>{APP_TAGLINE}</Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.descText}>
            From counting and fractions all the way to calculus and mathematical proof — one step at a time, in plain English.
          </Text>
          <Text style={styles.descText}>
            Built for curious minds of all ages. No jargon. No shortcuts. Just real mathematics, explained from the ground up.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Get started"
          onPress={() => router.push('/(auth)/age-gate')}
          fullWidth
          minHeight={56}
        />
        <Text style={styles.legalNote}>
          By continuing you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  hero: {
    gap: spacing.sm,
  },
  appName: {
    fontFamily: typography.serif,
    fontSize: 52,
    color: colors.gold,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: typography.serifItalic,
    fontSize: fontSizes.xl,
    color: colors.text2,
  },
  description: {
    gap: spacing.base,
  },
  descText: {
    fontFamily: typography.body,
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 28,
  },
  footer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  legalNote: {
    fontFamily: typography.body,
    fontSize: fontSizes.xs,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: 18,
  },
});
