export const APP_NAME = 'Principia';
export const APP_TAGLINE = 'Mathematics from the ground up.';
export const COMPANY_NAME = 'Axiom 38 LLC';
export const SUPPORT_EMAIL = 'support@getprincipia.com';
export const WEBSITE_URL = 'https://getprincipia.com';

export const PRICING = {
  monthly: '$6.99',
  annual: '$49.99',
  annualMonthly: '$4.17',
} as const;

export const REVENUECAT = {
  monthlyProductId: 'principia_monthly',
  annualProductId: 'principia_annual',
  entitlementId: 'premium',
} as const;

export const SECURE_STORE_KEYS = {
  ageVerified: 'principia_age_verified',
  userAge: 'principia_user_age',
  parentalConsentGranted: 'principia_parental_consent_granted',
  parentalConsentEmail: 'principia_parental_consent_email',
  parentalConsentTimestamp: 'principia_parental_consent_timestamp',
  isUnder13: 'principia_is_under_13',
} as const;

export const ASYNC_STORAGE_KEYS = {
  progress: 'principia_progress',
  bookmarks: 'principia_bookmarks',
} as const;
