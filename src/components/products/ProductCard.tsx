import React from 'react';
import { SolarProduct } from '../../types';
import { formatINR } from '../../utils/formatter';
import { ShieldCheck, Plus, Check, Scale, Star } from 'lucide-react';

interface ProductCardProps {
  product: SolarProduct;
  onSelect: (product: SolarProduct) => void;
  onAddToQuotation: (product: SolarProduct) => void;
  isAddedToQuotation: boolean;
  onToggleCompare: (product: SolarProduct) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToQuotation,
  isAddedToQuotation,
  onToggleCompare,
  isCompared
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
      {/* Top Banner Image */}
      <div className="relative h-36 bg-slate-100 cursor-pointer overflow-hidden" onClick={() => onSelect(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Capacity Tag */}
        <span className="absolute top-2 left-2 bg-slate-900/90 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-xs">
          {product.capacityValue} {product.capacityUnit}
        </span>

        {/* Warranty Badge */}
        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> {product.warrantyYears}y Warranty
        </span>

        {/* Compare Checkbox Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute bottom-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
            isCompared
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'bg-slate-900/70 text-slate-200 backdrop-blur-xs hover:bg-slate-900'
          }`}
        >
          <Scale className="w-3 h-3" />
          {isCompared ? 'Comparing' : 'Compare'}
        </button>
      </div>

      {/* Body Details */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-amber-600 uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-1 text-slate-600 font-bold">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[9px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h4
            onClick={() => onSelect(product)}
            className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-tight cursor-pointer hover:text-amber-600 transition"
          >
            {product.name}
          </h4>

          {product.efficiencyPct && (
            <p className="text-[10px] text-slate-500 mt-1">
              Efficiency: <span className="font-bold text-slate-700">{product.efficiencyPct}%</span>
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
          <div>
            <div className="text-xs font-black text-slate-900">{formatINR(product.priceINR)}</div>
            {product.originalPriceINR && (
              <div className="text-[10px] text-slate-400 line-through">
                {formatINR(product.originalPriceINR)}
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToQuotation(product)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition active:scale-95 ${
              isAddedToQuotation
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
            }`}
          >
            {isAddedToQuotation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Quote
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
