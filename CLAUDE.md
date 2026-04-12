# Principia — Project Context for Claude

## What This App Is
Principia is a mathematics education iOS app built with React Native / Expo Router. It teaches math from first principles — fractions through calculus and proof-based math — across 8 tiers of content.

## Owner
- Company: Axiom 38 LLC (disabled veteran-owned, Michigan)
- Developer: Peter Kalogiros (gatorpk@me.com)
- Support: support@getprincipia.com
- Website: https://getprincipia.com

## Tech Stack
- **Framework:** React Native 0.83 + Expo SDK 55 + Expo Router
- **Language:** TypeScript
- **State:** React hooks + AsyncStorage (local progress) + SecureStore (age/consent)
- **Subscriptions:** RevenueCat (`react-native-purchases`)
- **Cloud sync:** Supabase (optional, for premium users)
- **Build/Deploy:** EAS Build + EAS Submit

## Key Identifiers
- Bundle ID: `com.axiom38.principia`
- ASC App ID: `6761139348`
- Apple Team ID: `45B5NQR2B7`
- EAS Project ID: `f832be61-552c-4fdd-ac8f-2cfde2e8b8f2`
- Expo account: `gatorpk`

## Architecture
- `app/` — Expo Router file-based routing (auth flow, tabs, concept screens, legal pages, paywall)
- `components/` — UI components (concept tabs, paywall modal, shared cards, ui primitives)
- `hooks/` — useAgeGate, useProgress, useSubscription, useStudyAid
- `services/` — revenuecat.ts, analytics.ts, progress.ts, supabase.ts
- `data/` — tier1.ts through tier8.ts (all concept content), index.ts aggregates
- `constants/` — config.ts (app config, RevenueCat IDs, pricing), theme.ts, tiers.ts
- `types/` — TypeScript interfaces for Concept, ConceptProgress, ProgressMap
- `legal/` — Terms of Service, Privacy Policy, COPPA Notice (full legal text)

## Monetization
- Tiers 1-2: Free
- Tiers 3-8: Paid (requires "premium" entitlement via RevenueCat)
- Plans: $6.99/month or $49.99/year (7-day free trial on annual)
- RevenueCat product IDs: `principia_monthly`, `principia_annual`
- Entitlement ID: `premium`

## COPPA Compliance
- Age gate collects full date of birth (year/month/day) to compute exact age
- Users under 13 require verifiable parental consent before using the app
- Parental email stored locally only (SecureStore), never transmitted
- Under-13 users without consent cannot make purchases

## Paywall Enforcement
- Explore tab checks `isPremium` before navigating to paid-tier concepts
- Concept screen (`app/concept/[id].tsx`) also checks subscription status directly — this prevents bypass via Connections tab deep links
- In `__DEV__` mode, all content is unlocked for testing

## Build & Submit Commands
```bash
# Production build (cloud)
eas build --platform ios --profile production

# Submit to TestFlight / App Store Connect
eas submit --platform ios --profile production --latest
```

## Current Status (as of April 11, 2026)
- Build #9 rejected (April 7) for Guideline 2.1(b) — IAP not working in sandbox + missing free trial
- Root cause: ASC subscription products had "Developer Action Needed" (incomplete metadata), and RevenueCat had no valid App Store Connect API connection
- Fixes applied (all dashboard, no code changes needed):
  1. Generated App Store Connect API Team Key (Admin role) and connected to RevenueCat
  2. Completed subscription product metadata in ASC — both products now "Waiting for Review"
  3. Confirmed introductory offer (7-day free trial) on `principia_annual`
  4. Confirmed RevenueCat offering "default" is set as Current with `$rc_monthly` and `$rc_annual` packages
- RevenueCat ASC Issuer ID: `2f455788-fd9f-40ce-93b7-af99af0351aa`
- No code changes required for this rejection — app code was correct
- Next step: resubmit the existing build (no new build needed)

### Previous (Build #8 → #9)
- Build #8 rejected, all 3 issues resolved, Build #9 submitted
- Code fixes: paywall legal links, RevenueCat configured guard, new math-themed icons
- Config fixes: website /terms + /privacy routing, RevenueCat entitlement mismatch (was "GetPrincipia Pro", now "premium"), Paid Apps Agreement activated
- ASC metadata updated: EULA, Privacy Policy URL, description links
- RevenueCat secret key: `sk_BZzyTfKikVovUSIeRuzSGjosIykWR`
- Node path on this machine: /opt/homebrew/bin/node

## Important Notes
- The user (Peter) is not a coder — explain things in plain language
- Always use `export PATH="/opt/homebrew/bin:$PATH"` before running node/npx/eas commands
- The `__DEV__` flag in useSubscription.ts auto-unlocks premium in dev builds — this is intentional for testing, not a bug
