import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { PaywallModal } from '../components/paywall/PaywallModal';
import { useSubscription } from '../hooks/useSubscription';
import { colors } from '../constants/theme';

export { ErrorBoundary } from 'expo-router';

export default function Paywall() {
  const router = useRouter();
  const { purchase, restore } = useSubscription();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <PaywallModal
        onClose={() => router.back()}
        onPurchase={purchase}
        onRestore={restore}
      />
    </View>
  );
}
