import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  CustomerInfo,
} from 'react-native-purchases';
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

  Purchases.setLogLevel(LOG_LEVEL.WARN);
  Purchases.configure({ apiKey });
  initialized = true;
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  try {
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
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
): Promise<boolean> {
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current) return false;

    const pkg = current.availablePackages.find(
      (p) => p.product.identifier === packageId,
    );
    if (!pkg) return false;

    await Purchases.purchasePackage(pkg);
    return true;
  } catch {
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  try {
    const info = await Purchases.restorePurchases();
    return info.entitlements.active[REVENUECAT.entitlementId] !== undefined;
  } catch {
    return false;
  }
}
