import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  getCustomerInfo,
  purchasePackageById,
  restorePurchases,
} from '../services/revenuecat';
import { REVENUECAT, SECURE_STORE_KEYS } from '../constants/config';

export interface PurchaseResult {
  success: boolean;
  error?: string;
}

export interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  purchase: (productId: string) => Promise<PurchaseResult>;
  restore: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useSubscription(): SubscriptionState {
  const [isPremium, setIsPremium] = useState(__DEV__);
  const [isLoading, setIsLoading] = useState(!__DEV__);

  const checkEntitlement = useCallback(async (): Promise<void> => {
    if (__DEV__) {
      setIsPremium(true);
      setIsLoading(false);
      return;
    }

    // Under-13 users without parental consent cannot be premium (no purchases)
    const under13 = await SecureStore.getItemAsync(SECURE_STORE_KEYS.isUnder13);
    const consent = await SecureStore.getItemAsync(
      SECURE_STORE_KEYS.parentalConsentGranted,
    );

    if (under13 === 'true' && consent !== 'true') {
      setIsPremium(false);
      setIsLoading(false);
      return;
    }

    try {
      const info = await getCustomerInfo();
      if (info) {
        setIsPremium(
          info.entitlements.active[REVENUECAT.entitlementId] !== undefined,
        );
      } else {
        setIsPremium(false);
      }
    } catch {
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkEntitlement();
  }, [checkEntitlement]);

  // Re-check entitlement when app returns to foreground (e.g. after promo code redemption)
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        checkEntitlement();
      }
      appState.current = nextState;
    });
    return () => sub.remove();
  }, [checkEntitlement]);

  const purchase = useCallback(
    async (productId: string): Promise<PurchaseResult> => {
      const result = await purchasePackageById(productId);
      if (result.success) {
        setIsPremium(true);
      }
      return result;
    },
    [],
  );

  const restore = useCallback(async (): Promise<boolean> => {
    const success = await restorePurchases();
    if (success) {
      setIsPremium(true);
    }
    return success;
  }, []);

  return {
    isPremium,
    isLoading,
    purchase,
    restore,
    refresh: checkEntitlement,
  };
}
