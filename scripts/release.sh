#!/bin/bash
#
# Principia release script — builds and uploads a TestFlight build.
#
#   Run it with:   ./scripts/release.sh
#
# It does everything: generates the iOS project, checks that the version and
# signing settings landed, builds the archive, and uploads to App Store Connect.
# If anything goes wrong it stops and explains what happened in plain language.
#
# Nothing here needs to be edited between releases. To ship a new version, change
# "version" and "ios.buildNumber" in app.config.js, then run this.

set -uo pipefail

TEAM_ID="45B5NQR2B7"
ARCHIVE="/tmp/Principia.xcarchive"
EXPORT_DIR="/tmp/PrincipiaExport"
EXPORT_PLIST="/tmp/ExportOptions.plist"
LOG_DIR="/tmp/principia-release-logs"

# Homebrew node/npx, per the project's setup
export PATH="/opt/homebrew/bin:$PATH"

mkdir -p "$LOG_DIR"
cd "$(dirname "$0")/.." || exit 1

step() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }
ok()   { printf '    \033[32mOK\033[0m  %s\n' "${1:-}"; }
fail() {
  printf '\n\033[31m================ STOPPED ================\033[0m\n'
  printf '%s\n' "$1"
  if [ -n "${2:-}" ] && [ -f "$2" ]; then
    printf '\nLast 30 lines of the log (%s):\n\n' "$2"
    tail -30 "$2"
  fi
  printf '\n\033[31m=========================================\033[0m\n'
  exit 1
}

# ───────────────────────────────────────────────────────── 1. RevenueCat key
step "1/7  Checking your RevenueCat key"
[ -f .env.local ] || fail "There is no .env.local file in this folder.
The app needs it or the paywall will ship broken (nobody could subscribe).
Fix: copy .env.example to .env.local, then paste your RevenueCat key into it."
grep -q '^REVENUECAT_APPLE_KEY=appl_' .env.local || fail "Your .env.local does not have a valid REVENUECAT_APPLE_KEY.
It should be a line starting with: REVENUECAT_APPLE_KEY=appl_
Without it the app uploads with a dead paywall, so this script stops here."
ok ".env.local has an Apple RevenueCat key"

# ───────────────────────────────────────────────────── 2. Version being shipped
step "2/7  Reading the version you are about to release"
VERSION=$(node -e "console.log(require('./app.config.js').version)" 2>/dev/null)
BUILD=$(node -e "console.log(require('./app.config.js').ios.buildNumber)" 2>/dev/null)
[ -n "$VERSION" ] && [ -n "$BUILD" ] || fail "Could not read the version from app.config.js."
ok "Version $VERSION, build $BUILD"
printf '\n    Note: App Store Connect rejects a build number it has seen before.\n'
printf '    If this upload is refused as a duplicate, raise ios.buildNumber in\n'
printf '    app.config.js and run this script again.\n'

# ──────────────────────────────────────────────────── 3. Generate iOS project
step "3/7  Generating the iOS project (takes a minute)"
npx expo prebuild --platform ios --clean > "$LOG_DIR/prebuild.log" 2>&1 \
  || fail "Could not generate the iOS project." "$LOG_DIR/prebuild.log"
ok "iOS project created"
( cd ios && pod install ) > "$LOG_DIR/pods.log" 2>&1 \
  || fail "CocoaPods failed while installing native dependencies." "$LOG_DIR/pods.log"
ok "Native dependencies installed"

# ──────────────────────────────────────── 4. Confirm the config plugin worked
step "4/7  Confirming the version and signing settings landed"
PBX="ios/Principia.xcodeproj/project.pbxproj"
grep -q "MARKETING_VERSION = $VERSION" "$PBX" \
  || fail "The version $VERSION did not reach the Xcode project.
plugins/withXcodeProjectSync.js is supposed to put it there. Do not upload
this build — the version would be wrong. Send this message to Claude."
grep -q "CURRENT_PROJECT_VERSION = $BUILD" "$PBX" \
  || fail "Build number $BUILD did not reach the Xcode project. Send this to Claude."
grep -q "DevelopmentTeam = $TEAM_ID" "$PBX" \
  || fail "The signing team did not reach the Xcode project, so the upload would
fail to sign. Send this message to Claude."
ok "$VERSION ($BUILD), team $TEAM_ID"

# ──────────────────────────────────────────────────────── 5. Build the archive
step "5/7  Building the app (several minutes — this is the slow part)"
rm -rf "$ARCHIVE" "$EXPORT_DIR"
xcodebuild archive \
  -workspace ios/Principia.xcworkspace \
  -scheme Principia \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "$ARCHIVE" \
  CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO \
  > "$LOG_DIR/archive.log" 2>&1
if [ $? -ne 0 ] || [ ! -d "$ARCHIVE" ]; then
  printf '\nThe real errors from the build:\n\n'
  grep -E "error:" "$LOG_DIR/archive.log" | head -20
  fail "The build failed. Real errors are listed above; full log at $LOG_DIR/archive.log" ""
fi
ok "Archive built"

# ─────────────────────────────────────── 6. Verify what is actually in the app
step "6/7  Checking the built app really carries $VERSION ($BUILD)"
APP_PLIST="$ARCHIVE/Products/Applications/Principia.app/Info.plist"
[ -f "$APP_PLIST" ] || fail "Could not find the built app inside the archive."
BUILT_VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" "$APP_PLIST" 2>/dev/null)
BUILT_BUILD=$(/usr/libexec/PlistBuddy -c "Print :CFBundleVersion" "$APP_PLIST" 2>/dev/null)
[ "$BUILT_VERSION" = "$VERSION" ] && [ "$BUILT_BUILD" = "$BUILD" ] \
  || fail "The built app says $BUILT_VERSION ($BUILT_BUILD) but should say $VERSION ($BUILD).
Do not upload this. Send this message to Claude."
ok "The app itself reports $BUILT_VERSION ($BUILT_BUILD)"

# ────────────────────────────────────────────────────── 7. Export and upload
step "7/7  Uploading to App Store Connect"
cat > "$EXPORT_PLIST" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>method</key><string>app-store-connect</string>
  <key>teamID</key><string>45B5NQR2B7</string>
  <key>signingStyle</key><string>automatic</string>
  <key>destination</key><string>upload</string>
</dict>
</plist>
PLIST
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE" \
  -exportOptionsPlist "$EXPORT_PLIST" \
  -exportPath "$EXPORT_DIR" \
  -allowProvisioningUpdates \
  > "$LOG_DIR/export.log" 2>&1
if [ $? -ne 0 ]; then
  printf '\nThe real errors from the upload:\n\n'
  grep -iE "error|failed|duplicate|already" "$LOG_DIR/export.log" | head -20
  fail "The upload failed. Real errors above; full log at $LOG_DIR/export.log

If it mentions a duplicate or already-used build number, raise
ios.buildNumber in app.config.js and run this script again." ""
fi

printf '\n\033[32m================ DONE ================\033[0m\n'
printf 'Uploaded Principia %s (build %s) to App Store Connect.\n\n' "$VERSION" "$BUILD"
printf 'Next, in App Store Connect:\n'
printf '  1. Wait ~10-15 minutes for the build to finish processing.\n'
printf '  2. Open TestFlight and add your "What to Test" notes.\n'
printf '  3. When you are ready, submit it for review.\n\n'
printf 'The dSYM warnings for React and hermes frameworks are normal and do\n'
printf 'not block submission.\n'
printf '\033[32m======================================\033[0m\n'
