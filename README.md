# Vizon Solar - Premium Rooftop Solar Mobile App

A complete, production-ready mobile application built for **Android and iOS** using **React Native with Expo**, **TypeScript**, and **Tailwind CSS**.

Vizon Solar allows homeowners and commercial properties to calculate rooftop solar ROI, explore solar products (panels, inverters, batteries, kits), request site survey inspections, and generate instant official PDF quotations.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Web Preview (Browser)
```bash
npm run dev
# Starts Vite dev server at http://localhost:3000
```

### 3. Run Mobile App with Expo CLI
```bash
# Start Expo development server
npm run start

# Run on Android Emulator or connected USB device
npm run android

# Run on iOS Simulator (macOS required)
npm run ios
```

---

## 📦 Building Android APK & Play Store Bundle (EAS Build)

Ensure you have `eas-cli` installed and logged in:
```bash
npm install -g eas-cli
eas login
```

### 1. Build Installable Android APK (Testing)
Generates a standalone `.apk` file you can download and install directly on any Android phone:
```bash
npm run build:apk
# Or: npx eas build --platform android --profile preview
```

### 2. Build Android App Bundle (.aab) for Google Play Store
Generates the production `.aab` file required for Google Play Console submission:
```bash
npm run build:aab
# Or: npx eas build --platform android --profile production
```

### 3. Check Expo Project Compatibility
```bash
npm run doctor
# Runs npx expo-doctor to verify dependency versions
```

---

## 💾 Exporting Complete Project Source Code

You can package the entire source code into a downloadable `.zip` file:
```bash
npm run export:zip
```
This generates `VizonSolar_Android_Project.zip` in the root directory.

---

## 📁 Key File Structure

```
├── app.json                  # Expo app configuration (Package: com.sparkstation.vizonsolar)
├── eas.json                  # EAS build profiles (Development, Preview APK, Production AAB)
├── firebase-blueprint.json   # Intermediate database schema representation
├── firestore.rules           # Security rules for Firestore collections
├── package.json              # Project dependencies & build scripts
├── assets/                   # App icon, adaptive icon, splash screen, favicon
├── scripts/                  # Build & asset export utility scripts
├── src/
│   ├── App.tsx               # Main mobile application state & screen router
│   ├── components/           # Mobile screens, tabs, bottom sheets, modals
│   │   ├── calculator/       # Solar ROI & PM Surya Ghar subsidy calculator
│   │   ├── home/             # Hero banner, quick services, featured packages
│   │   ├── products/         # Catalog grid, specs filters, comparison modal
│   │   ├── quotations/       # Itemized quote builder & PDF generator
│   │   ├── survey/           # Multi-step site survey booking flow
│   │   ├── profile/          # Customer dashboard & installation tracker
│   │   ├── ai/               # Gemini SolarBot AI advisor modal
│   │   └── expo/             # Expo build guide modal
│   ├── services/             # Storage persistence & Gemini AI API integrations
│   ├── utils/                # PDF generator, currency formatters, ROI algorithm
│   └── types/                # TypeScript interface definitions
├── PLAY_STORE_RELEASE.md     # Step-by-step Google Play Console submission guide
└── README.md                 # Developer setup guide
```

---

## 🛡️ Environment Variables (`.env.example`)

Copy `.env.example` to `.env` to configure API keys:

```env
# GEMINI_API_KEY: Optional key for Gemini AI SolarBot advisor
VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# APP_URL: Host URL for preview environment
APP_URL="http://localhost:3000"
```

---

## 📄 Play Store Submission Checklist

Refer to `PLAY_STORE_RELEASE.md` for complete instructions on:
1. Setting up Google Play Console account ($25 fee).
2. Filling out the Data Safety Questionnaire.
3. Uploading feature graphics and app screenshots.
4. Setting up Privacy Policy URLs and Content Rating.
5. Publishing to Internal Testing and Production tracks.
