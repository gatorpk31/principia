import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  CustomerInfo,
} from 'react-native-purchases';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { REVENUECAT } from '../constants/config';

let initialized = false;
let configured = false;

export function initRevenueCat(): void {
  if (initialized) return;

  const appleKey: string =
    Constants.expoConfig?.extra?.revenueCatAppleKey ?? '';
  const googleKey: string =
    Constants.expoConfig?.extra?.revenueCatGoogleKey ?? '';

  const apiKey = Platform.OS === 'ios' ? appleKey : googleKey;
  if (!apiKey) {
    console.warn('[RevenueCat] No API key configured — purchases will not work.');
    initialized = true;
    return;
  }

  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN);
  Purchases.configure({ apiKey });
  console.log('[RevenueCat] Configured successfully.');
  initialized = true;
  configured = true;
}

export function isRevenueCatConfigured(): boolean {
  return configured;
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!configured) return null;
  try {
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  if (!configured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current ?? null;
  } catch {
    return null;
  }
}

export async function isPremiumActive(): Promise<boolean> {
  const info = await getCustomerInfo();
  if (!info) return false;
  return (
    info.entitlements.active[REVENUECAT.entitlementId] !== undefined
  );
}

export async function purchasePackageById(
  packageId: string,
): Promise<{ success: boolean; error?: string }> {
  if (!configured) {
    console.error('[RevenueCat] SDK not configured — cannot purchase. Check that the API key is set.');
    return { success: false, error: 'Subscriptions are not available right now. Please restart the app and try again.' };
  }

  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current) {
      console.warn('[RevenueCat] No current offering found. Configure a Default offering in the RevenueCat dashboard.');
      return { success: false, error: 'No subscription plans are available right now. Please try again later.' };
    }

    const pkg = current.availablePackages.find(
      (p) => p.product.identifier === packageId,
    );
    if (!pkg) {
      console.warn(`[RevenueCat] Package "${packageId}" not found. Available: ${current.availablePackages.map((p) => p.product.identifier).join(', ')}`);
      return { success: false, error: 'This subscription plan is not available. Please try again later.' };
    }

    await Purchases.purchasePackage(pkg);
    return { success: true };
  } catch (e: any) {
    // User cancelled is not an error
    if (e?.userCancelled) {
      return { success: false };
    }
    console.error('[RevenueCat] Purchase failed:', e);
    return { success: false, error: 'Purchase could not be completed. Please try again.' };
  }
}

export async function restorePurchases(): Promise<boolean> {
  if (!configured) return false;
  try {
    const info = await Purchases.restorePurchases();
    return info.entitlements.active[REVENUECAT.entitlementId] !== undefined;
  } catch {
    return false;
  }
}
