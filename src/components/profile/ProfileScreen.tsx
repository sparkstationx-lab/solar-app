import React, { useState } from 'react';
import { UserProfile, Quotation, SurveyBooking, SolarProduct } from '../../types';
import { formatINR } from '../../utils/formatter';
import { generateQuotationPDF } from '../../utils/pdfGenerator';
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  CalendarCheck2,
  Heart,
  Smartphone,
  Sparkles,
  HelpCircle,
  Download,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  savedQuotations: Quotation[];
  surveyBookings: SurveyBooking[];
  favoriteProducts: SolarProduct[];
  onOpenAIAssistant: () => void;
  onOpenExpoExportModal: () => void;
  onOpenSurveyModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  savedQuotations,
  surveyBookings,
  favoriteProducts,
  onOpenAIAssistant,
  onOpenExpoExportModal,
  onOpenSurveyModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'installations' | 'favorites'>('overview');

  // Installation Tracker Steps
  const installationSteps = [
    { label: 'Site Survey', desc: 'Engineer site & shade audit', done: true },
    { label: 'Feasibility Report', desc: 'DISCOM capacity check', done: true },
    { label: 'Equipment Delivery', desc: 'Panels & inverter dispatched', done: true },
    { label: 'Rooftop Mounting', desc: 'Structure & wiring install', current: true },
    { label: 'Net Metering', desc: 'Bi-directional meter sync', done: false },
    { label: 'System Online', desc: 'Zero bill generation starts!', done: false }
  ];

  return (
    <div className="space-y-4 pb-16">
      {/* Profile Card Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-lg border border-slate-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
            {userProfile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold truncate">{userProfile.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" /> {userProfile.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" /> {userProfile.city}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
          <div className="bg-slate-800/80 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-semibold">Saved Quotes</span>
            <span className="font-black text-amber-400 text-sm">{savedQuotations.length} Active</span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block font-semibold">Surveys Booked</span>
            <span className="font-black text-emerald-400 text-sm">{surveyBookings.length} Scheduled</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeTab === 'overview' ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('installations')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeTab === 'installations' ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600'
          }`}
        >
          Installation Progress
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeTab === 'favorites' ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600'
          }`}
        >
          Saved ({favoriteProducts.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Recent Survey Booking Status Banner */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <CalendarCheck2 className="w-4 h-4 text-emerald-600" /> Active Site Survey Request
              </h4>
              <button
                onClick={onOpenSurveyModal}
                className="text-[10px] font-bold text-amber-600 hover:underline"
              >
                + Book New
              </button>
            </div>

            {surveyBookings.length > 0 ? (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Reference:</span>
                  <span className="font-extrabold text-slate-900">{surveyBookings[0].referenceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    {surveyBookings[0].status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Assigned Engineer:</span>
                  <span className="font-bold text-slate-800">
                    {surveyBookings[0].assignedEngineer?.name || 'Engineer Pending'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No upcoming site survey scheduled.</p>
            )}
          </div>

          {/* Saved Quotations Quick List */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-amber-500" /> Saved Solar Quotations
            </h4>

            {savedQuotations.length === 0 ? (
              <p className="text-xs text-slate-400">No saved quotations available.</p>
            ) : (
              <div className="space-y-2">
                {savedQuotations.map(quote => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{quote.quotationNumber}</span>
                      <span className="text-[10px] text-slate-500">{quote.items.length} items • {formatINR(quote.finalTotalINR)}</span>
                    </div>

                    <button
                      onClick={() => generateQuotationPDF(quote)}
                      className="px-2.5 py-1 bg-slate-900 text-amber-400 font-bold text-[10px] rounded-lg flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Android & iOS Expo React Native Build Export CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-3.5 border border-slate-700 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-extrabold">Build Android & iOS Mobile App</h5>
                <p className="text-[10px] text-slate-300">Run via Expo Go or generate installable APK / IPA</p>
              </div>
            </div>

            <button
              onClick={onOpenExpoExportModal}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition"
            >
              Expo Build Guide
            </button>
          </div>
        </div>
      )}

      {activeTab === 'installations' && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Active Rooftop Installation Tracker
            </h4>
            <p className="text-[11px] text-slate-500">Project Code: #SOL-MUM-8821 (5 kW System)</p>
          </div>

          {/* Stepper Vertical Progress */}
          <div className="space-y-3 relative pl-3 border-l-2 border-slate-200">
            {installationSteps.map((step, idx) => (
              <div key={idx} className="relative pl-5 space-y-0.5">
                {/* Circle Icon */}
                <span
                  className={`absolute -left-[17px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step.done
                      ? 'bg-emerald-500 text-white'
                      : step.current
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100 animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </span>

                <h5
                  className={`text-xs font-extrabold ${
                    step.done || step.current ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </h5>
                <p className="text-[10px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-2">
          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center space-y-2 border border-slate-200">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">No favorite products saved</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {favoriteProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center gap-3"
                >
                  <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-amber-600 block uppercase">{p.brand}</span>
                    <h5 className="text-xs font-bold text-slate-900 truncate">{p.name}</h5>
                    <span className="text-xs font-black text-slate-900">{formatINR(p.priceINR)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solar AI Quick Query Footer Button */}
      <div
        onClick={onOpenAIAssistant}
        className="bg-slate-900 text-white rounded-2xl p-3 flex items-center justify-between cursor-pointer border border-slate-800"
      >
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-bold text-amber-300">Need help choosing panels or subsidies?</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
};
