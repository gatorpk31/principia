// Product analytics backed by the existing Supabase project — no new
// vendors, no SDKs. Events go to the analytics_events table (see
// supabase/analytics_events.sql). Fire-and-forget: failures never surface
// to the user, and if Supabase is not configured this is a no-op.
//
// COPPA: no events are recorded for under-13 users, and the only
// identifier is a random per-install UUID (no name, email, or device ID).

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { supabase } from './supabase';
import { ASYNC_STORAGE_KEYS, SECURE_STORE_KEYS } from '../constants/config';

type EventProperties = Record<string, string | number | boolean | null>;

let installIdPromise: Promise<string | null> | null = null;

function randomId(): string {
  // RFC4122-ish v4 without pulling in a uuid dependency
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Random per-install id — null for under-13 users (no tracking at all). */
async function getInstallId(): Promise<string | null> {
  if (!installIdPromise) {
    installIdPromise = (async () => {
      try {
        const under13 = await SecureStore.getItemAsync(SECURE_STORE_KEYS.isUnder13);
        if (under13 === 'true') return null;
        let id = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.analyticsInstallId);
        if (!id) {
          id = randomId();
          await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.analyticsInstallId, id);
        }
        return id;
      } catch {
        return null;
      }
    })();
  }
  return installIdPromise;
}

export function logEvent(eventName: string, properties?: EventProperties): void {
  if (__DEV__) {
    console.log(`[Analytics] ${eventName}`, properties ?? {});
  }
  if (!supabase) return;

  // Fire-and-forget — never block the UI or surface failures
  void (async () => {
    try {
      const installId = await getInstallId();
      if (!installId) return; // under-13 or storage unavailable: no tracking
      await supabase!.from('analytics_events').insert({
        install_id: installId,
        event_name: eventName,
        properties: properties ?? {},
      });
    } catch {
      // Analytics must never break the app
    }
  })();
}

export function logScreen(screenName: string): void {
  logEvent('screen_view', { screen_name: screenName });
}

export function logPurchaseAttempt(productId: string): void {
  logEvent('purchase_attempt', { product_id: productId });
}

export function logPurchaseSuccess(productId: string): void {
  logEvent('purchase_success', { product_id: productId });
}

export function logConceptVisit(conceptId: string, tierId: number): void {
  logEvent('concept_visit', { concept_id: conceptId, tier_id: tierId });
}

export function logTabComplete(
  conceptId: string,
  tab: 'concept' | 'guided' | 'practice' | 'connections',
): void {
  logEvent('tab_complete', { concept_id: conceptId, tab });
}

export function logPaywallView(source: string): void {
  logEvent('paywall_view', { source });
}
