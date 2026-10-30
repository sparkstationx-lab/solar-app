import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'navy' | 'green' | 'blue' | 'gray' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-amber-100 text-amber-900 border-amber-300',
    navy: 'bg-slate-900 text-amber-400 border-slate-700',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    blue: 'bg-sky-100 text-sky-800 border-sky-300',
    gray: 'bg-slate-100 text-slate-700 border-slate-300',
    red: 'bg-rose-100 text-rose-800 border-rose-300'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 font-medium rounded',
    md: 'text-xs px-2.5 py-1 font-semibold rounded-full'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
