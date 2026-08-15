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
Local Xcode CLI is the path actually used for releases — see "Archive & Signing (local Xcode/CLI)" below.
The EAS cloud commands remain available but are not the current release path:
```bash
# Production build (cloud)
eas build --platform ios --profile production

# Submit to TestFlight / App Store Connect
eas submit --platform ios --profile production --latest
```
Note: `eas.json` sets `cli.appVersionSource: "remote"`, so EAS builds ignore the local
`ios.buildNumber` in app.config.js and assign build numbers from EAS servers. This does
not affect local Xcode CLI archives, which use app.config.js values.

## Current Status (as of August 15, 2026)
- Build 4 (v1.0.3) successfully archived from Xcode CLI and uploaded to App Store Connect / TestFlight
- TestFlight testing completed successfully
- Build submitted to App Review on August 15, 2026
- Previous rejection (Build #9, Guideline 2.1b) was resolved via dashboard-only fixes (RevenueCat API key, ASC product metadata)

## Archive & Signing (local Xcode/CLI)
- The `ios/` folder was generated via `npx expo prebuild` — do not regenerate without re-injecting the RevenueCat key from `.env.local`
- Xcode automatic signing does not work for this team (no registered devices), so archives must be built from CLI using this two-step process:
  1. Archive without signing:
     ```bash
     xcodebuild archive -workspace ios/Principia.xcworkspace -scheme Principia \
       -configuration Release -destination "generic/platform=iOS" \
       -archivePath /tmp/Principia.xcarchive \
       CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO
     ```
  2. Export and upload with automatic distribution signing:
     ```bash
     xcodebuild -exportArchive -archivePath /tmp/Principia.xcarchive \
       -exportOptionsPlist /tmp/ExportOptions.plist \
       -exportPath /tmp/PrincipiaExport -allowProvisioningUpdates
     ```
  - `ExportOptions.plist` must contain: `method=app-store-connect`, `teamID=45B5NQR2B7`, `signingStyle=automatic`, `destination=upload`
- The `project.pbxproj` TargetAttributes were updated to include `DevelopmentTeam = 45B5NQR2B7` and `ProvisioningStyle = Automatic`
- The dSYM warnings for React.framework, ReactNativeDependencies.framework, and hermesvm.framework during export are cosmetic and do not block submission
- App Store screenshots must use legacy resolutions (1284×2778 or 1242×2688) — iPhone 17-series simulators produce non-accepted dimensions; resize with `sips` or install an older simulator runtime

> ⚠️ `ios/` is gitignored and fully regenerated by `expo prebuild --clean`. That wipes BOTH the RevenueCat key injection AND the manual `project.pbxproj` TargetAttributes (DevelopmentTeam / ProvisioningStyle) above. After any prebuild, re-apply the signing attributes before archiving, or move them into an Expo config plugin so they survive automatically.

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

## Known Trade-offs
- Visualizations were converted from gesture-driven to auto-cycling presets this release to eliminate a gesture-related crash surface, with an error boundary added around them for stability. Restoring interactivity is planned future work, to be re-introduced behind the error boundary once the underlying crash cause is fixed.
