// app.config.js takes precedence over app.json — app.json is kept only for
// legacy tooling compatibility. All authoritative config lives here.

module.exports = {
  name: "Principia",
  slug: "principia",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "principia",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0e0d0c",
  },
  ios: {
    bundleIdentifier: "com.axiom38.principia",
    buildNumber: "1",
    supportsTablet: true,
    usesAppleSignIn: false,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: "com.axiom38.principia",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0e0d0c",
    },
  },
  extra: {
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    revenueCatAppleKey: process.env.REVENUECAT_APPLE_KEY || "",
    revenueCatGoogleKey: process.env.REVENUECAT_GOOGLE_KEY || "",
    eas: {
      projectId: "f832be61-552c-4fdd-ac8f-2cfde2e8b8f2",
    },
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
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
