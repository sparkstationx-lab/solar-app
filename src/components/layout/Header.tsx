import React from 'react';
import { Sun, MapPin, Sparkles, FileText } from 'lucide-react';
import { CITIES_LIST } from '../../data/mockData';

interface HeaderProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  quotationItemsCount: number;
  onOpenQuotationBuilder: () => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onSelectCity,
  quotationItemsCount,
  onOpenQuotationBuilder,
  onOpenAIAssistant
}) => {
  return (
    <header className="bg-slate-900 text-white px-4 py-3 shrink-0 shadow-md z-30 sticky top-0 border-b border-slate-800">
      <div className="flex items-center justify-between">
        {/* Brand & City Picker */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Sun className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight leading-none text-white flex items-center gap-1">
              VIZON<span className="text-amber-400">SOLAR</span>
            </h1>
            
            {/* City Selector */}
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-400 hover:text-amber-300 transition cursor-pointer">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={e => onSelectCity(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-slate-300 cursor-pointer focus:outline-none pr-1"
              >
                {CITIES_LIST.map(city => (
                  <option key={city} value={city} className="bg-slate-900 text-slate-200">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* AI Solar Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300 hover:bg-slate-750 transition text-xs font-bold active:scale-95 shadow-sm"
            title="Solar AI Advisory Bot"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden xs:inline">Solar AI</span>
          </button>

          {/* Quotation Item Counter */}
          <button
            onClick={onOpenQuotationBuilder}
            className="relative p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition font-bold active:scale-95 shadow-md shadow-amber-500/20"
            title="View Quotation Builder"
          >
            <FileText className="w-4 h-4" />
            {quotationItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                {quotationItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
