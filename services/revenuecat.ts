// import Purchases, {
//   LOG_LEVEL,
//   PurchasesOffering,
//   CustomerInfo,
// } from 'react-native-purchases';
// Stub types for testing without native modules
type PurchasesOffering = any;
type CustomerInfo = any;
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { REVENUECAT } from '../constants/config';

let initialized = false;

export function initRevenueCat(): void {
  if (initialized) return;

  const appleKey: string =
    Constants.expoConfig?.extra?.revenueCatAppleKey ?? '';
  const googleKey: string =
    Constants.expoConfig?.extra?.revenueCatGoogleKey ?? '';

  const apiKey = Platform.OS === 'ios' ? appleKey : googleKey;
  if (!apiKey) {
    console.warn('[RevenueCat] No API key configured — using stub mode.');
    initialized = true;
    return;
  }

  // Purchases.setLogLevel(LOG_LEVEL.WARN);
  // Purchases.configure({ apiKey });
  console.log('[RevenueCat] Stub mode (native modules disabled for testing)');
  initialized = true;
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  // Stub implementation (native module disabled)
  return null;
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  // Stub implementation (native module disabled)
  return null;
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
): Promise<boolean> {
  // Stub implementation (native module disabled)
  return false;
}

export async function restorePurchases(): Promise<boolean> {
  // Stub implementation (native module disabled)
  return false;
}
