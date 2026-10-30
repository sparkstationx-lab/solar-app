import React, { useState } from 'react';
import { BottomSheet } from '../common/BottomSheet';
import { Smartphone, Copy, Check, Download, Code, Layers } from 'lucide-react';

interface ExpoExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpoExportModal: React.FC<ExpoExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const appJsonCode = `{
  "expo": {
    "name": "SolarShowroom",
    "slug": "solar-showroom-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0f172a"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.solarshowroom.mobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0f172a"
      },
      "package": "com.solarshowroom.mobile"
    },
    "plugins": ["expo-router"]
  }
}`;

  const copyAppJson = () => {
    navigator.clipboard.writeText(appJsonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Expo React Native Mobile Build Guide"
      subtitle="Android APK & iOS Application Setup"
      maxHeight="max-h-[85vh]"
    >
      <div className="space-y-4 text-xs">
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-amber-900 space-y-1">
          <h4 className="font-bold flex items-center gap-1">
            <Smartphone className="w-4 h-4 text-amber-600" /> Real Phone Execution & Standalone App
          </h4>
          <p className="text-[11px] leading-relaxed">
            This app is built using React & Tailwind with an Expo React Native architecture. You can run it live on your iPhone or Android device via Expo Go or build standalone binaries (.apk / .aab / .ipa).
          </p>
        </div>

        {/* Step 1: Run with Expo Go */}
        <div className="space-y-1.5">
          <h5 className="font-extrabold text-slate-900 flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Run directly on your phone using Expo Go</span>
          </h5>
          <div className="bg-slate-900 text-slate-200 p-3 rounded-2xl font-mono text-[11px] space-y-1">
            <div className="text-amber-400"># Install Expo CLI & Start Development Server</div>
            <div>npx create-expo-app --template</div>
            <div>npx expo start</div>
          </div>
          <p className="text-[11px] text-slate-500">
            Scan the printed QR code with your iPhone Camera or Android Expo Go App to launch!
          </p>
        </div>

        {/* Step 2: Build APK / iOS Package */}
        <div className="space-y-1.5">
          <h5 className="font-extrabold text-slate-900 flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Generate Installable Android APK / iOS Build</span>
          </h5>
          <div className="bg-slate-900 text-slate-200 p-3 rounded-2xl font-mono text-[11px] space-y-1">
            <div className="text-amber-400"># Build Standalone Android APK</div>
            <div>eas build -p android --profile preview</div>
            <div className="text-amber-400 pt-1"># Build iOS Binary for App Store / TestFlight</div>
            <div>eas build -p ios</div>
          </div>
        </div>

        {/* app.json Config Block */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-900 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-amber-500" /> Expo Config (app.json)
            </h5>
            <button
              onClick={copyAppJson}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] rounded-lg flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 text-amber-300 p-3 rounded-2xl font-mono text-[10px] overflow-x-auto max-h-36">
            {appJsonCode}
          </pre>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 text-amber-400 font-bold rounded-2xl text-xs"
        >
          Close Guide
        </button>
      </div>
    </BottomSheet>
  );
};
