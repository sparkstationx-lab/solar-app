import React, { useState, useMemo } from 'react';
import { SolarProduct, ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { BottomSheet } from '../common/BottomSheet';
import { formatINR } from '../../utils/formatter';
import {
  Search,
  SlidersHorizontal,
  Scale,
  Plus,
  Check,
  ShieldCheck,
  Star,
  Layers,
  X
} from 'lucide-react';

interface ProductCatalogScreenProps {
  products: SolarProduct[];
  onAddToQuotation: (product: SolarProduct) => void;
  quotationProductIds: string[];
  onNavigateToQuotation: () => void;
}

export const ProductCatalogScreen: React.FC<ProductCatalogScreenProps> = ({
  products,
  onAddToQuotation,
  quotationProductIds,
  onNavigateToQuotation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'capacity'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<SolarProduct | null>(null);
  const [comparedProducts, setComparedProducts] = useState<SolarProduct[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'panels', label: 'Panels' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'systems', label: 'Systems' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.model.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceINR - b.priceINR;
        if (sortBy === 'price-high') return b.priceINR - a.priceINR;
        if (sortBy === 'capacity') return b.capacityValue - a.capacityValue;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const toggleCompare = (product: SolarProduct) => {
    const exists = comparedProducts.some(p => p.id === product.id);
    if (exists) {
      setComparedProducts(comparedProducts.filter(p => p.id !== product.id));
    } else {
      if (comparedProducts.length >= 3) {
        alert('You can compare a maximum of 3 solar products at a time.');
        return;
      }
      setComparedProducts([...comparedProducts, product]);
    }
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Search & Sort Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search panels, inverters, brands..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Selector Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
          <span>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
          </span>

          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Capacity Size</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center space-y-2 border border-slate-200">
          <p className="text-sm font-bold text-slate-700">No matching solar products found</p>
          <p className="text-xs text-slate-400">Try clearing your search query or switching categories.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
              onAddToQuotation={onAddToQuotation}
              isAddedToQuotation={quotationProductIds.includes(product.id)}
              onToggleCompare={toggleCompare}
              isCompared={comparedProducts.some(p => p.id === product.id)}
            />
          ))}
        </div>
      )}

      {/* Comparison Floating Sticky Bar */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-30 px-4 flex justify-center pointer-events-none">
          <div className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-3 shadow-2xl border border-slate-700 flex items-center justify-between max-w-sm w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block leading-tight">
                  Comparing {comparedProducts.length} Solar Products
                </span>
                <span className="text-[10px] text-slate-400">Max 3 products allowed</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparedProducts([])}
                className="text-[10px] font-bold text-slate-400 hover:text-white px-1"
              >
                Clear
              </button>
              <button
                onClick={() => setShowComparisonModal(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition"
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Product Details Bottom Sheet Modal */}
      <BottomSheet
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
        subtitle={`${selectedProduct?.brand} • ${selectedProduct?.model}`}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
                {selectedProduct.capacityValue} {selectedProduct.capacityUnit} Capacity
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Retail Price</span>
                <span className="text-lg font-black text-slate-900">{formatINR(selectedProduct.priceINR)}</span>
                {selectedProduct.originalPriceINR && (
                  <span className="text-xs text-slate-400 line-through ml-2">
                    {formatINR(selectedProduct.originalPriceINR)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{selectedProduct.warrantyYears} Years Warranty</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>

            {/* Key Features List */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-slate-900">Key Advantages</h5>
              <div className="grid grid-cols-1 gap-1">
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Spec Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-500" /> Technical Specifications
              </h5>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 divide-y divide-slate-200 text-xs">
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="py-1.5 flex justify-between gap-2">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-900 font-bold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Quotation Sticky Bottom Button */}
            <button
              onClick={() => {
                onAddToQuotation(selectedProduct);
                setSelectedProduct(null);
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Quotation Builder</span>
            </button>
          </div>
        )}
      </BottomSheet>

      {/* Comparison Modal */}
      <BottomSheet
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        title="Solar Product Specification Comparison"
        subtitle="Side-by-side technical evaluation"
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-2 font-bold text-slate-400 min-w-[100px]">Spec</th>
                  {comparedProducts.map(p => (
                    <th key={p.id} className="p-2 font-bold text-slate-900 min-w-[130px]">
                      <div className="space-y-1">
                        <span className="text-[10px] text-amber-600 block">{p.brand}</span>
                        <span className="text-xs block line-clamp-1">{p.name}</span>
                        <span className="text-xs font-black text-slate-900">{formatINR(p.priceINR)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2 text-slate-500 font-semibold">Capacity</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-2 font-bold text-slate-800">
                      {p.capacityValue} {p.capacityUnit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 text-slate-500 font-semibold">Warranty</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-2 font-bold text-emerald-700">
                      {p.warrantyYears} Years
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 text-slate-500 font-semibold">Efficiency</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-2 font-bold text-slate-800">
                      {p.efficiencyPct ? `${p.efficiencyPct}%` : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 text-slate-500 font-semibold">Rating</td>
                  {comparedProducts.map(p => (
                    <td key={p.id} className="p-2 font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {p.rating}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                comparedProducts.forEach(p => onAddToQuotation(p));
                setShowComparisonModal(false);
                setComparedProducts([]);
              }}
              className="flex-1 py-3 bg-amber-500 text-slate-950 font-black rounded-2xl text-xs"
            >
              Add All to Quotation
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};
