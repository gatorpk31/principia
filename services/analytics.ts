// Analytics stub — log only. Replace with real analytics provider in a future version.

type EventProperties = Record<string, string | number | boolean | null>;

export function logEvent(eventName: string, properties?: EventProperties): void {
  if (__DEV__) {
    console.log(`[Analytics] ${eventName}`, properties ?? {});
  }
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
