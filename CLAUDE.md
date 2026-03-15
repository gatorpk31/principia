# Principia - Development Context

Quick reference guide for development on the Principia mathematics education platform.

## ⚡ Quick Facts

| Property | Value |
|----------|-------|
| **Product** | Principia - Mathematics Education Platform |
| **Repository** | https://github.com/gatorpk31/principia |
| **Type** | React Native mobile app (iOS/Android) + Web |
| **Tech Stack** | React Native 0.83, Expo 55, TypeScript 5.9, Supabase, RevenueCat |
| **Target** | Students ages 6+ |
| **Status** | Production |
| **Production URL** | https://getprincipia.com |
| **Business Hub** | [axiom38/README.md](../axiom38/README.md) |

## 🚀 Local Development Setup

### Prerequisites

```bash
# Check versions
node --version          # Should be 18+
npm --version           # Should be 9+

# Install Expo CLI (optional, but recommended)
npm install -g expo-cli
```

### 1. Clone Repository

```bash
git clone https://github.com/gatorpk31/principia
cd principia
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

```bash
# Copy example to local (gitignored)
cp .env.example .env.local

# Fill in with real values:
# - SUPABASE_URL: Your Supabase project URL
# - SUPABASE_ANON_KEY: Your Supabase anonymous key
# - REVENUECAT_APPLE_KEY: RevenueCat Apple API key
# - REVENUECAT_GOOGLE_KEY: RevenueCat Google API key
# - EAS_PROJECT_ID: Your EAS project ID
```

### 4. Verify Setup

```bash
npm run typecheck    # Verify TypeScript types
npm start            # Start development server
```

## 📁 Project Structure

```
principia/
├── CLAUDE.md                    # This file
├── app/                         # Expo Router screens
│   ├── (auth)/                 # Auth stack
│   │   ├── login.tsx           # Login screen
│   │   ├── signup.tsx          # Sign up screen
│   │   └── ...
│   ├── (app)/                  # Main app stack
│   │   ├── home.tsx            # Home/dashboard
│   │   ├── concepts/           # Concept screens
│   │   ├── progress/           # Progress tracking
│   │   ├── settings/           # User settings
│   │   └── ...
│   └── index.tsx               # Root layout
│
├── components/                  # Reusable UI components
│   ├── ConceptCard.tsx          # Concept display card
│   ├── ProgressBar.tsx          # Progress visualization
│   ├── TierCard.tsx             # Tier display
│   └── ...
│
├── services/                    # API & business logic
│   ├── supabase.ts             # Supabase client setup
│   ├── auth.ts                 # Authentication logic
│   ├── progress.ts             # Progress tracking
│   ├── purchases.ts            # RevenueCat integration
│   └── ...
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication hook
│   ├── useProgress.ts          # Progress tracking hook
│   ├── usePurchases.ts         # Purchases/subscriptions
│   └── ...
│
├── types/                       # TypeScript type definitions
│   ├── user.ts                 # User types
│   ├── progress.ts             # Progress types
│   ├── concept.ts              # Concept types
│   └── ...
│
├── utils/                       # Utilities & helpers
│   ├── constants.ts            # App constants
│   ├── formatting.ts           # String formatting
│   ├── validators.ts           # Input validation
│   └── ...
│
├── styles/                      # Global styles & theme
│   ├── colors.ts               # Color palette
│   ├── theme.ts                # Theme system
│   ├── spacing.ts              # Spacing scale
│   └── ...
│
├── data/                        # Static curriculum data
│   ├── concepts.json           # Concept definitions
│   ├── tiers.json              # Tier definitions
│   └── ...
│
├── assets/                      # Images, icons, fonts
│   ├── icon.png                # App icon
│   ├── splash-icon.png         # Splash screen
│   └── ...
│
├── app.json                    # Expo configuration
├── app.config.js               # Expo app configuration (dynamic)
├── eas.json                    # EAS build configuration
├── tsconfig.json               # TypeScript configuration
├── metro.config.js             # Metro bundler config
├── package.json                # Dependencies & scripts
├── .env.example                # Environment variables template
└── README.md                   # Project README
```

## 🎯 Key Technologies

### React Native & Expo

- **React Native 0.83.2** - Cross-platform mobile framework
- **Expo 55.0.5** - Managed React Native platform
- **Expo Router 3.5.0** - File-based routing (like Next.js)
- **TypeScript 5.9.2** - Type-safe JavaScript

### UI & Animation

- **React Native Reanimated 3.19** - Smooth, performant animations
- **Expo Linear Gradient** - Gradient backgrounds
- **React Native SVG** - Vector graphics
- **Expo Haptics** - Vibration feedback

### Backend & Data

- **Supabase** - PostgreSQL database + Auth
- **Supabase JS SDK 2.99** - Database client

### Authentication & Storage

- **Expo Secure Store** - Secure token storage
- **Expo Local Authentication** - Biometric auth (fingerprint, face)
- **AsyncStorage** - Local app data

### Monetization

- **React Native Purchases 8.12** - RevenueCat SDK for in-app purchases

### Fonts

- PlayfairDisplay - Headers
- Lora - Body text
- JetBrainsMono - Code/monospace

## 🏃 Running the App

### Start Development Server

```bash
npm start
```

Press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser
- `q` to quit

### iOS Development

```bash
# Run on iOS simulator
npm run ios

# Build for local simulator
npm run build:ios:local
```

### Android Development

```bash
# Run on Android emulator
npm run android
```

### Web Development

```bash
# Run web version
npm run web
```

## 🧪 Type Checking

Always verify TypeScript before committing:

```bash
npm run typecheck
```

Fix any errors before pushing. No `any` types without explicit justification.

## 🔑 Key Concepts

### Authentication Flow

1. User opens app
2. Check if session exists in Secure Store
3. If not, show login screen
4. User signs in via Supabase
5. Session token stored in Secure Store
6. User can access app

### Data Structure

**Users** (in Supabase):
- `id` (UUID) - User identifier
- `email` - Email address
- `full_name` - Display name
- `avatar_url` - Profile picture

**User Progress** (in Supabase):
- `user_id` - References user
- `tier_id` - Current tier (1-8)
- `concept_id` - Specific concept
- `progress` - Percentage complete

**Subscriptions** (via RevenueCat):
- `entitlements.active.premium` - Has premium access
- Can access Tiers 3-8

### Theme System

```typescript
// Access current theme
import { useColorScheme } from 'react-native'
const colorScheme = useColorScheme()  // 'light' | 'dark'

// Get themed color
import colors from '@/styles/colors'
const backgroundColor = colors[colorScheme].background
```

## 📦 Build & Deploy

### Local Build (for testing)

```bash
npm run build:ios:local
```

### Preview Build (internal testing)

```bash
npm run build:ios:preview
```

Share link via EAS dashboard for TestFlight testing.

### Production Build & Submit

```bash
# Bump version in app.json first

npm run build:ios
npm run submit:ios
```

EAS handles App Store submission automatically.

See [axiom38/DEPLOYMENT.md](../axiom38/DEPLOYMENT.md) for detailed deployment guide.

## 🐛 Debugging

### View Console Logs

Development logs appear in terminal where you ran `npm start`.

### Debug Network Requests

```typescript
// In services/supabase.ts, add logging
const supabase = createClient(url, key, {
  global: {
    fetch: (...args) => {
      console.log('API Call:', args[0], args[1])
      return fetch(...args)
    }
  }
})
```

### Debug with React DevTools

```bash
# Install DevTools
npm install -g react-devtools

# Run DevTools
react-devtools

# In terminal with npm start, press `d` to open debugger
```

## 📚 Important Files for Development

| File | Purpose |
|------|---------|
| `app/(auth)/login.tsx` | Login screen - Start here for auth |
| `app/(app)/home.tsx` | Main home screen - App entry point |
| `services/auth.ts` | Authentication functions |
| `services/supabase.ts` | Supabase client setup |
| `styles/colors.ts` | Color definitions |
| `types/user.ts` | User TypeScript types |

## 🚨 Common Issues & Solutions

### Issue: "SUPABASE_URL is undefined"
**Solution**: Check .env.local exists and has SUPABASE_URL set

### Issue: "Cannot find module '@/components'"
**Solution**: Verify tsconfig.json has path aliases configured

### Issue: "Metro bundler error"
**Solution**: Clear cache and restart
```bash
npm start -- --reset-cache
```

### Issue: "iOS build fails - pod dependency"
**Solution**: Clear iOS build and reinstall pods
```bash
cd ios
rm -rf Pods
pod install
cd ..
npm start
```

### Issue: "RevenueCat showing test products"
**Solution**: Verify correct API key in .env.local (production vs sandbox)

## 🔒 Security Checklist

- ✅ Never commit .env.local
- ✅ Never hardcode API keys
- ✅ Verify token is stored in Secure Store (not localStorage)
- ✅ Use Row-Level Security (RLS) on all Supabase tables
- ✅ Validate user input before database operations
- ✅ Don't expose sensitive data in error messages

## 🔄 Git Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b claude/[feature]-[session-id]
   ```

2. **Make commits**:
   ```bash
   git commit -m "feat: Brief description"
   ```

3. **Push to remote**:
   ```bash
   git push -u origin claude/[feature]-[session-id]
   ```

4. **Create pull request** on GitHub

5. **Get review** and address feedback

6. **Merge** when approved and CI passes

See [axiom38/BRANCH-CONVENTIONS.md](../axiom38/BRANCH-CONVENTIONS.md) for detailed git guidelines.

## 📖 Documentation

- **[axiom38/README.md](../axiom38/README.md)** - Business hub overview
- **[axiom38/ARCHITECTURE.md](../axiom38/ARCHITECTURE.md)** - System architecture
- **[axiom38/DEPLOYMENT.md](../axiom38/DEPLOYMENT.md)** - Build & deploy guide
- **[axiom38/BRANCH-CONVENTIONS.md](../axiom38/BRANCH-CONVENTIONS.md)** - Git workflow
- **[axiom38/SHARED-RESOURCES.md](../axiom38/SHARED-RESOURCES.md)** - Services (Supabase, RevenueCat, EAS)
- **[axiom38/PRODUCTS/principia/README.md](../axiom38/PRODUCTS/principia/README.md)** - Product details

## 💬 Quick Help

**Q: How do I check if user is logged in?**
```typescript
const { data: { session } } = await supabase.auth.getSession()
```

**Q: How do I fetch user data?**
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .single()
```

**Q: How do I check subscription status?**
```typescript
import Purchases from 'react-native-purchases'
const { entitlements } = await Purchases.getCustomerInfo()
const isPremium = entitlements.active.premium !== undefined
```

**Q: How do I handle errors?**
```typescript
const { data, error } = await supabase.from('table').select('*')
if (error) console.error('Error:', error.message)
```

## ✅ Before You Push

Checklist before pushing to remote:

- [ ] TypeScript type-checks (`npm run typecheck`)
- [ ] No console.log statements left in code
- [ ] No errors in development server
- [ ] Tested on iOS simulator/device
- [ ] Tested on Android (if applicable)
- [ ] Tested web version (if applicable)
- [ ] .env.local is NOT in git
- [ ] Commit messages are clear and descriptive
- [ ] Branch name follows convention: `claude/[feature]-[sessionid]`

---

*Last updated: March 15, 2026*

For questions or issues, see [axiom38/ARCHITECTURE.md](../axiom38/ARCHITECTURE.md) or file an issue on GitHub.
