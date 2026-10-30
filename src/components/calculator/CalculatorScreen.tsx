import React, { useState, useMemo } from 'react';
import { CalculatorInputs } from '../../types';
import { DEFAULT_CALCULATOR_INPUTS, CITIES_LIST } from '../../data/mockData';
import { calculateSolarROI } from '../../utils/calculator';
import { formatINR, formatKWh } from '../../utils/formatter';
import {
  Sun,
  IndianRupee,
  Home,
  Sliders,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Calendar,
  Zap,
  Leaf,
  TreePine,
  Sparkles
} from 'lucide-react';

interface CalculatorScreenProps {
  selectedCity: string;
  onGenerateQuotationFromCalc: (capacityKw: number, monthlyBill: number) => void;
  onOpenSurveyModal: () => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  selectedCity,
  onGenerateQuotationFromCalc,
  onOpenSurveyModal
}) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_CALCULATOR_INPUTS,
    city: selectedCity || 'Mumbai'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const results = useMemo(() => {
    return calculateSolarROI(inputs);
  }, [inputs]);

  const handleChange = (key: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5 pb-16">
      {/* Header Info */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl space-y-1 shadow-md border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
          <Sun className="w-4 h-4 animate-spin-slow" />
          <span>Solar ROI & Financial Calculator</span>
        </div>
        <h2 className="text-lg font-black">Estimate Your Rooftop Solar Savings</h2>
        <p className="text-xs text-slate-300">
          Tailored calculations based on Indian DISCOM tariffs and PM Surya Ghar subsidy policies.
        </p>
      </div>

      {/* Main Form Inputs Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-4">
        {/* Input 1: Monthly Electricity Bill */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-800 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-amber-500" /> Monthly Electricity Bill
            </label>
            <span className="font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs">
              {formatINR(inputs.monthlyBillINR)}
            </span>
          </div>

          <input
            type="range"
            min={1000}
            max={30000}
            step={500}
            value={inputs.monthlyBillINR}
            onChange={e => handleChange('monthlyBillINR', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>₹ 1,000/mo</span>
            <span>₹ 15,000/mo</span>
            <span>₹ 30,000/mo</span>
          </div>
        </div>

        {/* Input 2: Rooftop Area Available */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-800 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-amber-500" /> Available Rooftop Area
            </label>
            <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full text-xs">
              {inputs.rooftopAreaSqFt} Sq. Ft.
            </span>
          </div>

          <input
            type="range"
            min={150}
            max={3000}
            step={50}
            value={inputs.rooftopAreaSqFt}
            onChange={e => handleChange('rooftopAreaSqFt', Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>150 sq.ft (1.5 kW)</span>
            <span>1,000 sq.ft</span>
            <span>3,000 sq.ft</span>
          </div>
        </div>

        {/* Tariff & City Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">DISCOM Tariff (₹/unit)</label>
            <input
              type="number"
              step="0.5"
              min="3"
              max="15"
              value={inputs.tariffPerUnitINR}
              onChange={e => handleChange('tariffPerUnitINR', Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">City Location</label>
            <select
              value={inputs.city}
              onChange={e => handleChange('city', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900"
            >
              {CITIES_LIST.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Assumptions Accordion Toggle */}
        <div className="border-t border-slate-100 pt-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-xs font-bold text-slate-600 py-1"
          >
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-amber-500" /> Advanced Assumptions & Subsidy
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAdvanced && (
            <div className="mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">PM Surya Ghar Subsidy</span>
                <input
                  type="checkbox"
                  checked={inputs.subsidyEligible}
                  onChange={e => handleChange('subsidyEligible', e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Panel Wattage</span>
                  <select
                    value={inputs.panelWattage}
                    onChange={e => handleChange('panelWattage', Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold"
                  >
                    <option value={550}>550W Mono PERC</option>
                    <option value={540}>540W Bifacial</option>
                    <option value={400}>400W Mono</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-500 block">Peak Sun Hours/Day</span>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.sunHoursPerDay}
                    onChange={e => handleChange('sunHoursPerDay', Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Calculated System Size Banner */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 p-4 rounded-3xl shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-90">
          <span>Recommended System Size</span>
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded-full text-[10px]">
            Optimal Fit
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black">{results.recommendedCapacityKw} kW</span>
          <span className="text-xs font-bold">({results.panelsCount} Solar Panels)</span>
        </div>

        <p className="text-xs font-semibold leading-tight opacity-95">
          Requires ~{results.areaRequiredSqFt} sq. ft. of clear rooftop space. Generates about{' '}
          <strong>{formatKWh(results.estimatedMonthlyGenKwh)}</strong> clean solar power every month.
        </p>
      </div>

      {/* Financial Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gross System Cost</span>
          <span className="text-sm font-black text-slate-900 block">{formatINR(results.estimatedGrossCostINR)}</span>
          <span className="text-[10px] text-slate-500">Turn-key installation</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-emerald-200 bg-emerald-50/50 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
            <Award className="w-3 h-3 text-emerald-600" /> Govt. Subsidy
          </span>
          <span className="text-sm font-black text-emerald-700 block">- {formatINR(results.applicableSubsidyINR)}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Direct Bank Credit</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Net Out-Of-Pocket</span>
          <span className="text-sm font-black text-slate-900 block">{formatINR(results.estimatedNetCostINR)}</span>
          <span className="text-[10px] text-slate-500">Post-subsidy cost</span>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-amber-200 bg-amber-50/50 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">Payback Horizon</span>
          <span className="text-sm font-black text-amber-700 block">{results.paybackPeriodYears} Years</span>
          <span className="text-[10px] text-amber-800 font-medium">Breakeven timeline</span>
        </div>
      </div>

      {/* 25-Year Cumulative Savings Highlight */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 space-y-3 shadow-lg border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-xs font-bold text-slate-300">25-Year Cumulative Net Profit</h4>
              <span className="text-xl font-black text-emerald-400">{formatINR(results.savings25YearsINR, true)}</span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        {/* Environmental Impact Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl">
            <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">{results.co2OffsetTonsPerYear} Tons/yr</span>
              <span className="text-[9px] text-slate-400">CO2 Emissions Prevented</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl">
            <TreePine className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">{results.treesPlantedEquivalent} Trees</span>
              <span className="text-[9px] text-slate-400">Planted Equivalent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => onGenerateQuotationFromCalc(results.recommendedCapacityKw, inputs.monthlyBillINR)}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Generate Instant PDF Quotation ({results.recommendedCapacityKw} kW)</span>
        </button>

        <button
          onClick={onOpenSurveyModal}
          className="w-full py-3 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition"
        >
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>Book Free Rooftop Site Survey</span>
        </button>
      </div>
    </div>
  );
};
