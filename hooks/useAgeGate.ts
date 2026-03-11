import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SECURE_STORE_KEYS } from '../constants/config';

export interface AgeGateState {
  isLoading: boolean;
  ageVerified: boolean;
  isUnder13: boolean;
  parentalConsentGranted: boolean;
  verifyAge: (age: number) => Promise<void>;
  grantParentalConsent: (email: string) => Promise<void>;
  denyParentalConsent: () => Promise<void>;
  reset: () => Promise<void>;
}

export function useAgeGate(): AgeGateState {
  const [isLoading, setIsLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [isUnder13, setIsUnder13] = useState(false);
  const [parentalConsentGranted, setParentalConsentGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const verified = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ageVerified);
      const under13 = await SecureStore.getItemAsync(SECURE_STORE_KEYS.isUnder13);
      const consent = await SecureStore.getItemAsync(
        SECURE_STORE_KEYS.parentalConsentGranted,
      );

      setAgeVerified(verified === 'true');
      setIsUnder13(under13 === 'true');
      setParentalConsentGranted(consent === 'true');
      setIsLoading(false);
    })();
  }, []);

  const verifyAge = useCallback(async (age: number): Promise<void> => {
    const under13 = age < 13;
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.userAge, String(age));
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.isUnder13,
      String(under13),
    );
    if (!under13) {
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.ageVerified, 'true');
      setAgeVerified(true);
    }
    setIsUnder13(under13);
  }, []);

  const grantParentalConsent = useCallback(
    async (email: string): Promise<void> => {
      const now = new Date().toISOString();
      // Parental email stored locally only — never transmitted
      await SecureStore.setItemAsync(
        SECURE_STORE_KEYS.parentalConsentEmail,
        email,
      );
      await SecureStore.setItemAsync(
        SECURE_STORE_KEYS.parentalConsentTimestamp,
        now,
      );
      await SecureStore.setItemAsync(
        SECURE_STORE_KEYS.parentalConsentGranted,
        'true',
      );
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.ageVerified, 'true');
      setParentalConsentGranted(true);
      setAgeVerified(true);
    },
    [],
  );

  const denyParentalConsent = useCallback(async (): Promise<void> => {
    // App cannot be used without parental consent for under-13 users
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.parentalConsentGranted,
      'false',
    );
    setParentalConsentGranted(false);
  }, []);

  const reset = useCallback(async (): Promise<void> => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ageVerified);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.userAge);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.isUnder13);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.parentalConsentGranted);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.parentalConsentEmail);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.parentalConsentTimestamp);
    setAgeVerified(false);
    setIsUnder13(false);
    setParentalConsentGranted(false);
  }, []);

  return {
    isLoading,
    ageVerified,
    isUnder13,
    parentalConsentGranted,
    verifyAge,
    grantParentalConsent,
    denyParentalConsent,
    reset,
  };
}
