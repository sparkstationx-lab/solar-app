import React from 'react';
import { motion } from 'motion/react';
import { SolarProduct } from '../../types';
import { formatINR } from '../../utils/formatter';
import {
  Sun,
  Calculator,
  Grid,
  CalendarCheck2,
  FileCheck2,
  ShieldCheck,
  Zap,
  TrendingDown,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';

interface HomeScreenProps {
  products: SolarProduct[];
  onNavigateToTab: (tab: 'products' | 'calculator' | 'quotations' | 'profile') => void;
  onSelectProduct: (product: SolarProduct) => void;
  onOpenSurveyModal: () => void;
  onOpenAIAssistant: () => void;
  selectedCity: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onNavigateToTab,
  onSelectProduct,
  onOpenSurveyModal,
  onOpenAIAssistant,
  selectedCity
}) => {
  const featuredKits = products.filter(p => p.category === 'systems' || p.popular).slice(0, 4);

  return (
    <div className="space-y-5 pb-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-5 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>PM Surya Ghar Approved Solar Partner</span>
          </div>

          <h2 className="text-xl font-black tracking-tight leading-snug">
            Power Your Home with <span className="text-amber-400">Zero Electricity Bills</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            Get up to <span className="text-amber-300 font-extrabold">₹ 78,000 Government Subsidy</span> on rooftop solar installations in {selectedCity}.
          </p>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => onNavigateToTab('calculator')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-amber-500/25 transition active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Savings</span>
            </button>

            <button
              onClick={onOpenSurveyModal}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-2xl text-xs border border-slate-700 transition active:scale-95"
            >
              <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Book Site Survey</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix (4 Icons) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Quick Services
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onNavigateToTab('calculator')}
            className="flex flex-col items-center p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 transition active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">ROI Calc</span>
          </button>

          <button
            onClick={() => onNavigateToTab('products')}
            className="flex flex-col items-center p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 transition active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-1.5 group-hover:bg-sky-500 group-hover:text-white transition">
              <Grid className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">Catalog</span>
          </button>

          <button
            onClick={() => onNavigateToTab('quotations')}
            className="flex flex-col items-center p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 transition active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:bg-emerald-500 group-hover:text-white transition">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">PDF Quote</span>
          </button>

          <button
            onClick={onOpenSurveyModal}
            className="flex flex-col items-center p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 transition active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:bg-purple-500 group-hover:text-white transition">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">Survey</span>
          </button>
        </div>
      </div>

      {/* Govt Subsidy Highlights Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-4 border border-emerald-700/40 shadow-md flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Award className="w-4 h-4" />
            <span>PM Surya Ghar Yojana</span>
          </div>
          <p className="text-xs text-slate-200">
            Direct subsidy credited to bank account: <span className="font-extrabold text-amber-300">₹78,000</span> for 3kW+.
          </p>
        </div>
        <button
          onClick={onOpenAIAssistant}
          className="shrink-0 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow transition"
        >
          Check Eligibility
        </button>
      </div>

      {/* Featured Complete Solar Systems */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Featured Rooftop Kits</h3>
            <p className="text-[11px] text-slate-500">Certified turn-key home packages</p>
          </div>
          <button
            onClick={() => onNavigateToTab('products')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {featuredKits.map(product => (
            <motion.div
              key={product.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer flex gap-3.5 items-center"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 bg-slate-900/80 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {product.capacityValue}{product.capacityUnit}
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {product.brand}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Subsidy Approved
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">{product.name}</h4>

                <p className="text-[11px] text-slate-500 line-clamp-1">{product.description}</p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs font-black text-slate-900">{formatINR(product.priceINR)}</span>
                    {product.originalPriceINR && (
                      <span className="text-[10px] text-slate-400 line-through ml-1.5">
                        {formatINR(product.originalPriceINR)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">
                    {product.warrantyYears} Yrs Warranty
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust & Performance Metrics */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider text-center">
          SolarShowroom Assurance
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-800">
          <div className="space-y-0.5">
            <div className="flex justify-center text-amber-400 mb-1">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-sm font-black">2,450+</div>
            <div className="text-[10px] text-slate-400">Rooftops Energized</div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-center text-emerald-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-sm font-black">25 Years</div>
            <div className="text-[10px] text-slate-400">Power Guarantee</div>
          </div>

          <div className="space-y-0.5">
            <div className="flex justify-center text-sky-400 mb-1">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-sm font-black">2.4 Yrs</div>
            <div className="text-[10px] text-slate-400">Avg Payback</div>
          </div>
        </div>
      </div>

      {/* Floating Solar AI Assistant Banner */}
      <div
        onClick={onOpenAIAssistant}
        className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl p-3.5 text-slate-950 flex items-center justify-between cursor-pointer shadow-lg active:scale-98 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold">Ask SolarBot AI</h5>
            <p className="text-[11px] text-slate-800 font-medium">Get instant rooftop advice & subsidy answers</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-950 shrink-0" />
      </div>
    </div>
  );
};
