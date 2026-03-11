import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import {
  APP_NAME,
  APP_TAGLINE,
  COMPANY_NAME,
  SUPPORT_EMAIL,
  WEBSITE_URL,
} from '../../constants/config';

export default function About() {
  const router = useRouter();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const links = [
    { label: 'Terms of Service', onPress: () => router.push('/legal/terms') },
    { label: 'Privacy Policy', onPress: () => router.push('/legal/privacy') },
    { label: 'COPPA Notice', onPress: () => router.push('/legal/coppa') },
    {
      label: 'Contact Support',
      onPress: () => Linking.openURL(`mailto:${SUPPORT_EMAIL}`),
    },
    {
      label: 'Website',
      onPress: () => Linking.openURL(WEBSITE_URL),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <Text style={styles.tagline}>{APP_TAGLINE}</Text>
          <Text style={styles.version}>Version {version}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.body}>
            Principia is a mathematics education app designed to teach mathematics from first principles — starting with fractions and number sense, and building all the way to university-level calculus and mathematical proof.
          </Text>
          <Text style={styles.body}>
            Every concept is explained in plain English before any notation appears. Every formula is derived, not just stated. Every idea connects to the ones before and after it.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          {links.map((link, i) => (
            <TouchableOpacity
              key={i}
              onPress={link.onPress}
              style={styles.linkRow}
              activeOpacity={0.7}
            >
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Text style={styles.linkArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Veteran attribution — subtle, footer placement */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {APP_NAME} is a product of {COMPANY_NAME}, a disabled veteran-owned business registered in the state of Michigan.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: 100,
  },
  hero: {
    gap: spacing.xs,
  },
  appName: {
    fontFamily: typography.serif,
    fontSize: 40,
    color: colors.gold,
  },
  tagline: {
    fontFamily: typography.serifItalic,
    fontSize: fontSizes.md,
    color: colors.text2,
  },
  version: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    marginTop: spacing.xs,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text2,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  body: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
    lineHeight: 26,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkLabel: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  linkArrow: {
    color: colors.text3,
    fontSize: fontSizes.md,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xl,
  },
  footerText: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 20,
    textAlign: 'center',
  },
});
