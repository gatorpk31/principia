import React, { useState, useMemo } from 'react';
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

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CURRENT_YEAR = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - 5 - i);

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

function computeAge(year: number, month: number, day: number): number {
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() + 1 - month;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }
  return age;
}

type Step = 'year' | 'month' | 'day';

export default function AgeGate() {
  const router = useRouter();
  const { verifyAge } = useAgeGate();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [step, setStep] = useState<Step>('year');
  const [loading, setLoading] = useState(false);

  const availableDays = useMemo(() => {
    if (!selectedYear || !selectedMonth) return [];
    const count = daysInMonth(selectedMonth, selectedYear);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [selectedYear, selectedMonth]);

  const isComplete = selectedYear !== null && selectedMonth !== null && selectedDay !== null;

  const computedAge = isComplete
    ? computeAge(selectedYear!, selectedMonth!, selectedDay!)
    : null;

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedDay(null);
    setStep('month');
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setSelectedDay(null);
    setStep('day');
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleBack = () => {
    if (step === 'day') {
      setSelectedDay(null);
      setStep('month');
    } else if (step === 'month') {
      setSelectedMonth(null);
      setStep('year');
    }
  };

  const handleContinue = async () => {
    if (computedAge === null) return;
    setLoading(true);
    await verifyAge(computedAge);
    setLoading(false);

    if (computedAge < 13) {
      router.replace('/(auth)/parental-consent');
    } else {
      router.replace('/(tabs)/explore');
    }
  };

  const stepTitle = step === 'year'
    ? 'What year were you born?'
    : step === 'month'
      ? 'What month?'
      : 'What day?';

  const selectedSummary = [
    selectedMonth !== null && MONTHS[selectedMonth - 1],
    selectedDay !== null && `${selectedDay},`,
    selectedYear !== null && `${selectedYear}`,
  ].filter(Boolean).join(' ');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{stepTitle}</Text>
        <Text style={styles.subtitle}>
          We use your date of birth to apply the right privacy protections.
        </Text>
        {selectedSummary.length > 0 && (
          <Text style={styles.selectedSummary}>{selectedSummary}</Text>
        )}
      </View>

      {step !== 'year' && (
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pickerContainer}>
          {step === 'year' && BIRTH_YEARS.map((year) => (
            <TouchableOpacity
              key={year}
              onPress={() => handleYearSelect(year)}
              style={[
                styles.row,
                selectedYear === year && styles.rowSelected,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.rowText,
                  selectedYear === year && styles.rowTextSelected,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          ))}

          {step === 'month' && MONTHS.map((month, i) => (
            <TouchableOpacity
              key={month}
              onPress={() => handleMonthSelect(i + 1)}
              style={[
                styles.row,
                selectedMonth === i + 1 && styles.rowSelected,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.rowText,
                  selectedMonth === i + 1 && styles.rowTextSelected,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}

          {step === 'day' && availableDays.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => handleDaySelect(day)}
              style={[
                styles.row,
                selectedDay === day && styles.rowSelected,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.rowText,
                  selectedDay === day && styles.rowTextSelected,
                ]}
              >
                {day}
              </Text>
              {selectedDay === day && computedAge !== null && (
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
          disabled={!isComplete}
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
  selectedSummary: {
    fontFamily: typography.mono,
    fontSize: fontSizes.sm,
    color: colors.gold,
    marginTop: 2,
  },
  backBtn: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rowSelected: {
    backgroundColor: colors.goldDim,
    borderColor: colors.gold + '55',
  },
  rowText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.md,
    color: colors.text2,
  },
  rowTextSelected: {
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
