import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, fontSizes, spacing } from '../../constants/theme';
import { TERMS_OF_SERVICE } from '../../legal';

export default function Terms() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.content}>{TERMS_OF_SERVICE}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: { color: colors.text2, fontSize: fontSizes.md },
  title: {
    fontFamily: typography.serif,
    fontSize: fontSizes.lg,
    color: colors.text,
  },
  scroll: { padding: spacing.lg, paddingBottom: 60 },
  content: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    lineHeight: 22,
  },
});
