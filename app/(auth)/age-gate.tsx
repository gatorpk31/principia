import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { useAgeGate } from '../../hooks/useAgeGate';

const CURRENT_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - 5 - i);

export default function AgeGate() {
  const router = useRouter();
  const { verifyAge } = useAgeGate();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const computedAge = selectedYear ? CURRENT_YEAR - selectedYear : null;

  const handleContinue = async () => {
    if (!computedAge) return;
    setLoading(true);
    await verifyAge(computedAge);
    setLoading(false);

    if (computedAge < 13) {
      router.replace('/(auth)/parental-consent');
    } else {
      router.replace('/(tabs)/explore');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How old are you?</Text>
        <Text style={styles.subtitle}>
          We use your age to apply the right privacy protections.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pickerContainer}>
          {BIRTH_YEARS.map((year) => (
            <TouchableOpacity
              key={year}
              onPress={() => setSelectedYear(year)}
              style={[
                styles.yearRow,
                selectedYear === year && styles.yearRowSelected,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.yearText,
                  selectedYear === year && styles.yearTextSelected,
                ]}
              >
                {year}
              </Text>
              {selectedYear === year && computedAge !== null && (
                <Text style={styles.ageText}>Age {computedAge}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!selectedYear}
          loading={loading}
          fullWidth
          minHeight={56}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  subtitle: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    lineHeight: 22,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  pickerContainer: {
    gap: 4,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  yearRowSelected: {
    backgroundColor: colors.goldDim,
    borderColor: colors.gold + '55',
  },
  yearText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.md,
    color: colors.text2,
  },
  yearTextSelected: {
    color: colors.gold,
    fontFamily: typography.monoBold,
  },
  ageText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.sm,
    color: colors.gold,
  },
  footer: {
    padding: spacing.lg,
  },
});
