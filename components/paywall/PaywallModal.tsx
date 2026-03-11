import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import { Button } from '../ui/Button';
import { PRICING, REVENUECAT, WEBSITE_URL } from '../../constants/config';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onPurchase: (productId: string) => Promise<boolean>;
  onRestore: () => Promise<boolean>;
}

const FEATURES = [
  'Algebra through Calculus II',
  'Guided step-by-step walkthroughs for every concept',
  'Progress sync across all your devices',
  'Printable study aids generated from your progress',
  'All future content included',
];

export function PaywallModal({
  visible,
  onClose,
  onPurchase,
  onRestore,
}: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    const productId =
      selectedPlan === 'annual'
        ? REVENUECAT.annualProductId
        : REVENUECAT.monthlyProductId;
    const success = await onPurchase(productId);
    setLoading(false);
    if (success) onClose();
  };

  const handleRestore = async () => {
    setRestoring(true);
    await onRestore();
    setRestoring(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header gradient */}
          <LinearGradient
            colors={[colors.goldDim, 'transparent']}
            style={styles.headerGradient}
          >
            <Text style={styles.headline}>
              Unlock the full Principia curriculum
            </Text>
            <Text style={styles.subheadline}>
              8 tiers. 60+ concepts. From fractions to Spivak.
            </Text>
          </LinearGradient>

          {/* Feature list */}
          <View style={styles.features}>
            {FEATURES.map((feat, i) => (
              <View key={i} style={styles.featureRow}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>

          {/* Pricing options */}
          <View style={styles.plans}>
            {/* Annual — highlighted */}
            <TouchableOpacity
              style={[styles.planCard, selectedPlan === 'annual' && styles.planSelected]}
              onPress={() => setSelectedPlan('annual')}
              activeOpacity={0.8}
            >
              <View style={styles.planHeader}>
                <View style={styles.bestValueBadge}>
                  <Text style={styles.bestValueText}>Best Value</Text>
                </View>
              </View>
              <Text style={styles.planName}>Annual</Text>
              <Text style={styles.planPrice}>{PRICING.annual}/year</Text>
              <Text style={styles.planSubprice}>{PRICING.annualMonthly}/month — saves ~40%</Text>
            </TouchableOpacity>

            {/* Monthly */}
            <TouchableOpacity
              style={[styles.planCard, selectedPlan === 'monthly' && styles.planSelected]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <Text style={styles.planName}>Monthly</Text>
              <Text style={styles.planPrice}>{PRICING.monthly}/month</Text>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <View style={styles.cta}>
            <Button
              label={
                selectedPlan === 'annual'
                  ? 'Start 7-Day Free Trial'
                  : 'Subscribe Monthly'
              }
              onPress={handlePurchase}
              loading={loading}
              fullWidth
              minHeight={56}
            />

            {selectedPlan === 'annual' && (
              <TouchableOpacity
                onPress={() => setSelectedPlan('monthly')}
                style={styles.secondaryLink}
              >
                <Text style={styles.secondaryLinkText}>Try Monthly Instead</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {/* Footer links */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.footerLink}>
              {restoring ? 'Restoring…' : 'Restore Purchases'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`${WEBSITE_URL}/terms`)}
          >
            <Text style={styles.footerLink}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`${WEBSITE_URL}/privacy`)}
          >
            <Text style={styles.footerLink}>Privacy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: spacing.lg,
    zIndex: 10,
    padding: spacing.sm,
  },
  closeText: {
    color: colors.text2,
    fontSize: fontSizes.md,
  },
  scroll: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  headerGradient: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },
  headline: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subheadline: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    textAlign: 'center',
  },
  features: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkmark: {
    color: colors.gold,
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    width: 20,
  },
  featureText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  plans: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  planCard: {
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border2,
    padding: spacing.base,
    backgroundColor: colors.surface,
  },
  planSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.goldDim,
  },
  planHeader: {
    marginBottom: 4,
  },
  bestValueBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  bestValueText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.bg,
  },
  planName: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: 2,
  },
  planPrice: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  planSubprice: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    marginTop: 2,
  },
  cta: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  secondaryLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  secondaryLinkText: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  footerLink: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
    textDecorationLine: 'underline',
  },
  footerDot: {
    color: colors.text3,
    fontSize: fontSizes.sm,
  },
});
