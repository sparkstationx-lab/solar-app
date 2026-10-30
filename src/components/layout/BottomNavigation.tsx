import React from 'react';
import { Home, Grid, Calculator, FileText, User } from 'lucide-react';

export type NavTab = 'home' | 'products' | 'calculator' | 'quotations' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  quotationsCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  quotationsCount = 0
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'products' as NavTab, label: 'Products', icon: Grid },
    { id: 'calculator' as NavTab, label: 'Calculator', icon: Calculator },
    { id: 'quotations' as NavTab, label: 'Quotes', icon: FileText, badge: quotationsCount },
    { id: 'profile' as NavTab, label: 'Profile', icon: User }
  ];

  return (
    <nav className="bg-slate-900 border-t border-slate-800 text-slate-400 px-2 py-1.5 shrink-0 z-40 sticky bottom-0">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 min-w-[56px] rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'hover:text-slate-200 font-medium text-slate-400'
              }`}
            >
              {/* Active Glow Pill Indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-amber-400/10 rounded-xl border border-amber-400/20" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] rounded-full px-1 py-0.2 min-w-[14px] text-center shadow">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight leading-none ${isActive ? 'text-amber-400' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
