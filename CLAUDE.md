# Principia — Project Context for Claude

## What This App Is
Principia is a mathematics education iOS app built with React Native / Expo Router. It teaches math from first principles — fractions through calculus and proof-based math — across 8 tiers of content.

## Owner
- Company: Axiom 38 LLC (disabled veteran-owned, Michigan)
- Developer: Peter Kalogiros (gatorpk@me.com)
- Support: support@getprincipia.com
- Website: https://getprincipia.com

## Platform Scope
- **iOS only.** Android is not a target (decision: Oct 2026). `app.config.js` pins
  `platforms: ["ios"]`, and all Android config, the Google RevenueCat key, the
  `android` npm script, the adaptive-icon asset, and every Google Play reference in
  the Terms and Privacy Policy have been removed. Do not reintroduce Android config
  or Google Play language without an explicit decision to ship on Android.

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

## Current Status (as of October 20, 2026)
- **v1.0.4 (build 5) approved by App Review** and ready for release. Contains: Tier 3
  problem pack (+42 questions), Mixed Review (spaced repetition), iOS-only cleanup of
  the Terms and Privacy Policy, and the Xcode version/signing sync plugin.
- Releases now run through `npm run release` (see "Releasing" below).
- Next content drop: Tier 4 problem pack (see "Content Cadence").

### Earlier (as of August 15, 2026)
- Build 4 (v1.0.3) successfully archived from Xcode CLI and uploaded to App Store Connect / TestFlight
- TestFlight testing completed successfully
- Build submitted to App Review on August 15, 2026
- Previous rejection (Build #9, Guideline 2.1b) was resolved via dashboard-only fixes (RevenueCat API key, ASC product metadata)

## Releasing (one command)
```bash
npm run release
```
`scripts/release.sh` does the whole release: checks `.env.local` has the
RevenueCat key, generates `ios/`, runs pod install, confirms the version and
signing settings actually landed in the Xcode project, builds the archive,
verifies the built binary's own Info.plist reports the expected version, then
exports and uploads to App Store Connect. It stops with a plain-language
explanation at the first problem and keeps logs in `/tmp/principia-release-logs/`.

To ship a new version: change `version` and `ios.buildNumber` in
`app.config.js`, then run it.

Release notes live in `RELEASE_NOTES.md`, one section per version (What's New,
What to Test, Review notes). The script prints the section for the version it
uploaded, so Peter can paste it into App Store Connect. **Write the section
whenever you bump the version** — if it is missing, the script says so. Peter is not a coder — prefer fixing or extending
this script over handing him a sequence of manual commands.

The manual steps below are what the script automates, kept for reference and
for debugging when the script itself fails.

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

> **Resolved (Oct 2026):** the manual `project.pbxproj` edits above are no longer
> needed. `plugins/withXcodeProjectSync.js` now writes `MARKETING_VERSION`,
> `CURRENT_PROJECT_VERSION`, `DEVELOPMENT_TEAM`, and the target `DevelopmentTeam` /
> `ProvisioningStyle` attributes on every prebuild, so `expo prebuild --clean` no
> longer destroys the signing setup or leaves Xcode's General tab showing 1.0 / 1.
> Verified: a clean prebuild yields 1.0.3 / 4 in the build settings, the signing
> attributes, and Info.plist.
>
> ⚠️ Still true: `ios/` is gitignored and regenerated, so the **RevenueCat key must
> be present in `.env.local`** before any prebuild or the paywall ships dead.

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

## Content Cadence
The subscription promises "All future content included," so content must ship on
a visible rhythm or that claim stops being true. Practice questions are the
renewable resource: concepts are learned once, but problems feed Mixed Review
(`services/review.ts`) indefinitely, and every new question deepens the review
pool automatically with no code change.

Current state: **361 questions across 93 concepts** in 8 tiers.

| Tier | Concepts | Questions |
|------|----------|-----------|
| 1 | 13 | 39 |
| 2 | 12 | 36 |
| 3 | 12 | 78 |
| 4 | 11 | **73** |
| 5 | 11 | 33 |
| 6 | 11 | 33 |
| 7 | 12 | 36 |
| 8 | 11 | 33 |

Shipped:
- **Oct 2026 (v1.0.4)** — Tier 3 pack: +42 questions (36 to 78, now 6-7 per
  concept). Also fixed an `answerIndex` skew that let students guess "B or C",
  and rewrote four explanations that showed arithmetic without reasoning.
- **Oct 2026 (v1.0.5)** — Tier 4 pack: +40 geometry questions (33 to 73). Also
  rewrote four arithmetic-only explanations, and aligned the `answer` field with
  the selected choice in 8 questions across Tiers 1, 2, 4, and 7. Grading uses
  `answerIndex`, so no student was mis-scored; the `answer` field is not read by
  the UI, but the data now satisfies `choices[answerIndex] === answer` everywhere.

Next up, in priority order: **Tier 1-2** (free tier, where new
users form their first impression), then Tiers 5-8. Target 6-7 questions per
concept throughout.

When authoring a pack, verify before committing: evaluate the tier file as real
objects (strip the TS header and `require` it) rather than pattern-matching the
source, confirm every `answerIndex` points at its stated `answer`, re-derive
numeric answers independently from the arithmetic, and spread `answerIndex`
across all four positions. A wrong `answerIndex` actively teaches wrong math.

## Known Trade-offs
- Visualizations were converted from gesture-driven to auto-cycling presets this release to eliminate a gesture-related crash surface, with an error boundary added around them for stability. Restoring interactivity is planned future work, to be re-introduced behind the error boundary once the underlying crash cause is fixed.
