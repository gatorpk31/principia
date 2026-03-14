import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  getCustomerInfo,
  purchasePackageById,
  restorePurchases,
} from '../services/revenuecat';
import { REVENUECAT, SECURE_STORE_KEYS } from '../constants/config';

export interface SubscriptionState {
  isPremium: boolean;
  isLoading: boolean;
  purchase: (productId: string) => Promise<boolean>;
  restore: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

// TODO: Remove this flag before release — bypasses paywall for development review
const DEV_BYPASS_PAYWALL = true;

export function useSubscription(): SubscriptionState {
  const [isPremium, setIsPremium] = useState(DEV_BYPASS_PAYWALL);
  const [isLoading, setIsLoading] = useState(!DEV_BYPASS_PAYWALL);

  const checkEntitlement = useCallback(async (): Promise<void> => {
    if (DEV_BYPASS_PAYWALL) {
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

  const purchase = useCallback(
    async (productId: string): Promise<boolean> => {
      const success = await purchasePackageById(productId);
      if (success) {
        setIsPremium(true);
      }
      return success;
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
