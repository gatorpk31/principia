import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import {
  APP_NAME,
  COMPANY_NAME,
  SUPPORT_EMAIL,
  WEBSITE_URL,
} from '../../constants/config';
import { useSubscription } from '../../hooks/useSubscription';
import { restorePurchases } from '../../services/revenuecat';

export default function About() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const [restoring, setRestoring] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const restored = await restorePurchases();
      if (restored) {
        Alert.alert('Restored', 'Your premium access has been restored.');
      } else {
        Alert.alert('No Purchases', 'No previous purchases were found for this account.');
      }
    } catch {
      Alert.alert('Error', 'Could not restore purchases. Please try again later.');
    } finally {
      setRestoring(false);
    }
  };

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
        <Text style={styles.pageTitle}>Settings</Text>

        {/* Subscription section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.subscriptionCard}>
            <Text style={styles.subscriptionStatus}>
              {isPremium ? '✓ Premium Active' : 'Free Plan'}
            </Text>
            <Text style={styles.subscriptionDesc}>
              {isPremium
                ? 'You have access to all tiers and concepts.'
                : 'Upgrade to unlock all 8 tiers of math content.'}
            </Text>
          </View>
          {!isPremium && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => router.push('/paywall')}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeBtnText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleRestore}
            style={styles.linkRow}
            activeOpacity={0.7}
            disabled={restoring}
          >
            <Text style={styles.linkLabel}>
              {restoring ? 'Restoring…' : 'Restore Purchases'}
            </Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {APP_NAME}</Text>
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

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {APP_NAME} is a product of {COMPANY_NAME}, a disabled veteran-owned business registered in the state of Michigan.
          </Text>
          <Text style={styles.footerText}>Version {version}</Text>
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
  pageTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
    color: colors.text,
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
  subscriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.base,
    gap: spacing.xs,
  },
  subscriptionStatus: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.md,
    color: colors.gold,
  },
  subscriptionDesc: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    lineHeight: 20,
  },
  upgradeBtn: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  upgradeBtnText: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.bg,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  footerText: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 20,
    textAlign: 'center',
  },
});
