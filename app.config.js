// Single source of truth for app config (there is no app.json).
// iOS-only product — no Android config by design (see CLAUDE.md).
// version and ios.buildNumber propagate to Info.plist (via Expo) AND to the
// Xcode build settings + signing attributes (via plugins/withXcodeProjectSync),
// so the Xcode UI, the shipped binary, and signing always match this file.

module.exports = {
  name: "Principia",
  slug: "principia",
  version: "1.0.5",
  platforms: ["ios"],
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "principia",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0e0d0c",
  },
  newArchEnabled: false,
  ios: {
    bundleIdentifier: "com.axiom38.principia",
    buildNumber: "6",
    supportsTablet: true,
    usesAppleSignIn: false,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  extra: {
    revenueCatAppleKey: process.env.REVENUECAT_APPLE_KEY || "",
    eas: {
      projectId: "f832be61-552c-4fdd-ac8f-2cfde2e8b8f2",
    },
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-splash-screen",
    "./plugins/withXcodeProjectSync",
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/PlayfairDisplay-Bold.ttf",
          "./assets/fonts/PlayfairDisplay-Italic.ttf",
          "./assets/fonts/Lora-Regular.ttf",
          "./assets/fonts/Lora-Medium.ttf",
          "./assets/fonts/JetBrainsMono-Regular.ttf",
          "./assets/fonts/JetBrainsMono-Bold.ttf",
        ],
      },
    ],
  ],
};
