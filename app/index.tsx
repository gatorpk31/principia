import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SECURE_STORE_KEYS } from '../constants/config';
import { colors } from '../constants/theme';

export default function Root() {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(SECURE_STORE_KEYS.ageVerified).then((val) => {
      setIsVerified(val === 'true');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  return <Redirect href={isVerified ? '/(tabs)/explore' : '/(auth)/welcome'} />;
}
