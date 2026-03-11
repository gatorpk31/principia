import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  BackHandler,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { useAgeGate } from '../../hooks/useAgeGate';
import { SUPPORT_EMAIL, WEBSITE_URL } from '../../constants/config';

export default function ParentalConsent() {
  const router = useRouter();
  const { grantParentalConsent, denyParentalConsent } = useAgeGate();
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = email.includes('@') && email.includes('.') && checked;

  const handleConsent = async () => {
    setLoading(true);
    await grantParentalConsent(email.trim());
    setLoading(false);
    router.replace('/(tabs)/explore');
  };

  const handleDeny = async () => {
    Alert.alert(
      'Are you sure?',
      'Without parental consent, the app cannot be used by children under 13.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit App',
          style: 'destructive',
          onPress: async () => {
            await denyParentalConsent();
            BackHandler.exitApp();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.badge}>Parental Consent Required</Text>
          <Text style={styles.title}>A parent or guardian must consent</Text>
          <Text style={styles.body}>
            Principia collects learning progress data to track which concepts your child has studied. A parent or guardian must consent to this data collection for users under 13, as required by the Children's Online Privacy Protection Act (COPPA).
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>What data is collected</Text>
          {[
            'Which math concepts have been studied',
            'Practice scores (correct/incorrect)',
            'Which tabs have been completed',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>What is NOT collected from your child</Text>
          {[
            'Name, address, or contact information',
            'Location data',
            'Photos, camera, or microphone',
            'Behavioral data for advertising',
          ].map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.green }]}>✓</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Parent or guardian email address</Text>
          <Text style={styles.inputNote}>
            Stored locally on this device only. Never transmitted or shared.
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="parent@example.com"
            placeholderTextColor={colors.text3}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          onPress={() => setChecked(!checked)}
          style={styles.checkboxRow}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Text style={styles.checkboxMark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>
            I am the parent or guardian of this child and I consent to the collection of their learning progress data as described in the{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(`${WEBSITE_URL}/privacy`)}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>

        <Text style={styles.rights}>
          You may request to review or delete your child's data at any time by contacting us at {SUPPORT_EMAIL}.
        </Text>

        <View style={styles.actions}>
          <Button
            label="I Consent"
            onPress={handleConsent}
            disabled={!isValid}
            loading={loading}
            fullWidth
            minHeight={56}
          />
          <Button
            label="I Do Not Consent"
            onPress={handleDeny}
            variant="ghost"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.md,
  },
  badge: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  body: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    lineHeight: 24,
  },
  section: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  bullet: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text3,
    width: 16,
  },
  bulletText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    flex: 1,
    lineHeight: 22,
  },
  inputSection: {
    gap: spacing.xs,
  },
  inputNote: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
  },
  input: {
    backgroundColor: colors.surface2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
    marginTop: spacing.xs,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  checkboxMark: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.sm,
    color: colors.bg,
  },
  checkboxLabel: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    flex: 1,
    lineHeight: 24,
  },
  link: {
    color: colors.gold,
    textDecorationLine: 'underline',
  },
  rights: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text3,
    lineHeight: 20,
  },
  actions: {
    gap: spacing.sm,
  },
});
