import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isFrameEnabled, setIsFrameEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 font-sans flex flex-col items-center justify-start p-0 sm:p-4 select-none">
      {/* Top Floating Control Bar for Frame Mode Toggle */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-2xl text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">SolarShowroom Mobile App</span>
        </div>
        <button
          onClick={() => setIsFrameEnabled(!isFrameEnabled)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-[11px] font-bold transition border border-amber-500/30"
          title="Toggle Mobile Smartphone Frame"
        >
          {isFrameEnabled ? (
            <>
              <Monitor className="w-3.5 h-3.5" /> Full Width
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" /> Phone Frame
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isFrameEnabled
            ? 'max-w-[430px] h-[100vh] sm:h-[880px] bg-white sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-0 sm:border-[10px] border-slate-900 relative overflow-hidden'
            : 'max-w-md min-h-screen bg-white relative shadow-2xl'
        }`}
      >
        {/* Simulated Phone Top Notch & Status Bar (in Frame mode) */}
        {isFrameEnabled && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 text-slate-800 text-[11px] font-semibold bg-white border-b border-slate-100 z-30 shrink-0">
            <span>9:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full" />
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="text-[10px]">5G</span>
              <div className="w-5 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
                <div className="h-full w-3.5 bg-slate-800 rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
          {children}
        </div>

        {/* Simulated Home Indicator Bar at Bottom */}
        {isFrameEnabled && (
          <div className="hidden sm:flex justify-center pb-1 pt-0.5 bg-slate-900 shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
