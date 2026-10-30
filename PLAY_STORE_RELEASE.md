# Google Play Store Release & Submission Guide

This document provides a step-by-step checklist and configuration instructions for publishing **SolarShowroom** on the **Google Play Store**.

---

## 📱 Application Identity & Package Information

- **App Name**: SolarShowroom - Rooftop Solar & ROI Calculator
- **Android Package ID**: `com.sparkstation.solarshowroom`
- **Default Version**: `1.0.0`
- **Default Version Code**: `1`
- **Target OS**: Android 8.0 (API 26) up to Android 15+ (API 35+)

---

## 🚀 Step 1: Local Setup & Dependencies Check

Before building, verify that all dependencies and toolchains are compatible:

```bash
# 1. Install project dependencies
npm install

# 2. Run Expo doctor to check project health
npx expo-doctor

# 3. Configure Expo Application Services (EAS) CLI
npm install -g eas-cli
eas login
```

---

## 🛠️ Step 2: Building Android APK & Android App Bundle (AAB)

### 1. Build Testing APK (Preview Profile)
Use this build to install directly on physical Android phones or test devices for QA:

```bash
npm run build:apk
# Or directly:
npx eas build --platform android --profile preview
```

### 2. Build Play Store Release Bundle (Production Profile)
Use this build to generate the `.aab` (Android App Bundle) required by Google Play Console:

```bash
npm run build:aab
# Or directly:
npx eas build --platform android --profile production
```

EAS will automatically manage keystores and release signing credentials in the cloud.

---

## 📋 Step 3: Google Play Console Setup Checklist

### 1. Account & App Creation
1. Log in to [Google Play Console](https://play.google.com/console).
2. Click **Create app**.
3. Set **App name**: `SolarShowroom - Rooftop Solar & ROI Calculator`
4. Select **Default language**: English (US) / English (India)
5. Select **App or game**: App
6. Select **Free or paid**: Free

---

### 2. Store Listing Copy Assets

#### **Short Description** (Max 80 characters):
> Estimate rooftop solar ROI, calculate savings, book site survey & get instant PDF quotes.

#### **Full Description** (Max 4000 characters):
> Power your home with zero electricity bills! SolarShowroom is the ultimate mobile application for exploring rooftop solar power systems, estimating financial returns, and booking certified engineering site surveys.
>
> ☀️ **Key Features**:
> • **Solar ROI & Savings Calculator**: Input your monthly electricity bill to calculate recommended kW system size, panel count, annual savings, payback period, and 25-year cumulative return.
> • **PM Surya Ghar Subsidy Integration**: Accurately accounts for Indian government rooftop solar subsidies up to ₹78,000.
> • **Solar Product Catalog**: Explore Mono PERC panels, bifacial modules, string inverters, hybrid batteries, and turn-key home packages.
> • **Side-by-Side Product Comparison**: Compare specs, warranties, and efficiencies of up to 3 products at a time.
> • **Instant PDF Quotations**: Itemized cost breakdown including equipment, installation, DISCOM approval fees, and GST taxes. Download official printable PDF quotations in one tap.
> • **Site Survey & Inspection Booking**: Schedule free rooftop structural and shade audits with certified engineers.
> • **SolarBot AI Consultant**: Instant answers to solar panel choices, net-metering DISCOM procedures, and subsidy eligibility.

---

### 3. Graphic Assets Required

- **App Icon**: 512 x 512 px (32-bit PNG, max 1024KB) -> Located at `./assets/icon.png`
- **Feature Graphic**: 1024 x 500 px (PNG or JPG, max 15MB)
- **Phone Screenshots**: Minimum 2 screenshots (16:9 or 9:16 aspect ratio, min 1080px height)
- **Tablet Screenshots**: 7-inch and 10-inch tablet screenshots (optional but recommended for broader reach)

---

## 🛡️ Step 4: Google Play Data Safety Declaration

When filling out the **Data Safety** questionnaire in Google Play Console:

1. **Does your app collect or share user data?**: Yes (User optional profile name, phone, address for survey booking).
2. **Is data encrypted in transit?**: Yes (HTTPS / SSL).
3. **Can users request data deletion?**: Yes.
4. **Data Types Collected**:
   - **Personal Info**: Name, Email, Phone Number (Optional - for site survey booking & quote savings).
   - **Location**: City / Region (For DISCOM tariff estimation).
   - **Photos and Videos**: Rooftop Photos (Optional - user uploaded for structural inspection).
5. **Data Usage**: App functionality, customer service support, and site inspection scheduling.

---

## 🔒 Step 5: Privacy Policy Requirements

Google Play Store requires a hosted Privacy Policy URL.
Example URL structure: `https://your-domain.com/privacy-policy`

Key privacy provisions included in SolarShowroom:
- Customer contact details are used solely for generating solar quotations and booking site surveys.
- Camera and photo permissions are requested runtime only when uploading rooftop photos.
- No sensitive financial credentials or payment card details are stored locally or transmitted.

---

## 🧪 Step 6: Internal & Production Release Tracks

1. Go to **Testing > Internal testing** in Play Console.
2. Upload the `.aab` file output from `npx eas build --platform android --profile production`.
3. Add internal tester email addresses to test install via Play Store link.
4. Once verified, promote the release to **Production** track!

---

## 💡 Summary of Deliverables

- `app.json`: Configured with Android package `com.sparkstation.solarshowroom`.
- `eas.json`: Configured with `preview` (APK) and `production` (AAB) profiles.
- `firestore.rules`: Configured with role-isolated security.
- `SolarShowroom_Android_Project.zip`: Complete downloadable source code archive.
