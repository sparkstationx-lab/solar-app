import React, { useState } from 'react';
import { SolarProduct, Quotation, QuotationItem } from '../../types';
import { formatINR } from '../../utils/formatter';
import { generateQuotationPDF } from '../../utils/pdfGenerator';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Save,
  Check,
  Tag,
  ShieldCheck,
  CalendarCheck2,
  Share2,
  ChevronRight,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface QuotationBuilderScreenProps {
  selectedProducts: SolarProduct[];
  onRemoveProduct: (productId: string) => void;
  onClearSelectedProducts: () => void;
  onSaveQuotation: (quotation: Quotation) => void;
  savedQuotations: Quotation[];
  onOpenSurveyModalWithQuote?: (quotation: Quotation) => void;
  userProfileName?: string;
  userProfilePhone?: string;
  userProfileEmail?: string;
  userProfileAddress?: string;
}

export const QuotationBuilderScreen: React.FC<QuotationBuilderScreenProps> = ({
  selectedProducts,
  onRemoveProduct,
  onClearSelectedProducts,
  onSaveQuotation,
  savedQuotations,
  onOpenSurveyModalWithQuote,
  userProfileName = 'Rahul Verma',
  userProfilePhone = '+91 98765 43210',
  userProfileEmail = 'rahul.verma@example.com',
  userProfileAddress = 'Flat 402, Green Palms, Andheri West, Mumbai'
}) => {
  const [items, setItems] = useState<QuotationItem[]>(() =>
    selectedProducts.map(product => ({
      product,
      quantity: 1,
      unitPriceINR: product.priceINR
    }))
  );

  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountINR: number } | null>({
    code: 'WELCOME2026',
    discountINR: 5000
  });

  const [customerName, setCustomerName] = useState(userProfileName);
  const [customerPhone, setCustomerPhone] = useState(userProfilePhone);
  const [customerEmail, setCustomerEmail] = useState(userProfileEmail);
  const [customerAddress, setCustomerAddress] = useState(userProfileAddress);

  const [activeTab, setActiveTab] = useState<'builder' | 'saved'>('builder');

  // Sync selected products prop if items changed
  React.useEffect(() => {
    setItems(prevItems => {
      const existingProductIds = prevItems.map(i => i.product.id);
      const newProducts = selectedProducts.filter(p => !existingProductIds.includes(p.id));
      const updatedExisting = prevItems.filter(i => selectedProducts.some(p => p.id === i.product.id));

      return [
        ...updatedExisting,
        ...newProducts.map(product => ({ product, quantity: 1, unitPriceINR: product.priceINR }))
      ];
    });
  }, [selectedProducts]);

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuotationItem[]
    );
  };

  // Financial calculations
  const itemsSubtotalINR = items.reduce((sum, item) => sum + item.quantity * item.unitPriceINR, 0);

  // Estimate total system capacity size for installation and subsidy estimation
  const totalCapacityKw = items.reduce((sum, item) => {
    if (item.product.capacityUnit === 'kW') return sum + item.product.capacityValue * item.quantity;
    if (item.product.capacityUnit === 'W') return sum + (item.product.capacityValue / 1000) * item.quantity;
    return sum;
  }, 0);

  const installationCostINR = includeInstallation ? (totalCapacityKw > 0 ? Math.round(totalCapacityKw * 5000) + 10000 : 15000) : 0;
  const netMeteringFeeINR = includeInstallation ? 5000 : 0;

  const grossSubtotalINR = itemsSubtotalINR + installationCostINR + netMeteringFeeINR;

  // PM Surya Ghar subsidy estimate if capacity exists
  let subsidyDiscountINR = 0;
  if (totalCapacityKw > 0) {
    if (totalCapacityKw <= 1) subsidyDiscountINR = 30000;
    else if (totalCapacityKw <= 2) subsidyDiscountINR = 60000;
    else subsidyDiscountINR = 78000;
  }

  const promoDiscountINR = appliedPromo ? appliedPromo.discountINR : 0;
  const taxableAmountINR = Math.max(0, grossSubtotalINR - subsidyDiscountINR - promoDiscountINR);

  const gstRatePct = 12; // 12% GST on solar products & EPC
  const gstAmountINR = Math.round(taxableAmountINR * (gstRatePct / 100));
  const finalTotalINR = taxableAmountINR + gstAmountINR;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'SOLAR2026' || code === 'WELCOME2026') {
      setAppliedPromo({ code, discountINR: 5000 });
      setPromoCodeInput('');
    } else {
      alert('Invalid coupon code. Try WELCOME2026 or SOLAR2026.');
    }
  };

  const buildQuotationObject = (): Quotation => {
    const quoteNum = `SOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: `quote-${Date.now()}`,
      quotationNumber: quoteNum,
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || '+91 98765 43210',
      customerEmail: customerEmail || 'customer@example.com',
      customerAddress: customerAddress || 'Customer Site Location',
      items,
      includeInstallation,
      installationCostINR,
      netMeteringFeeINR,
      subtotalINR: grossSubtotalINR,
      subsidyDiscountINR,
      promoDiscountINR,
      promoCodeApplied: appliedPromo?.code,
      gstRatePct,
      gstAmountINR,
      finalTotalINR,
      status: 'Saved',
      notes: 'Generated via Vizon Solar Mobile Application.'
    };
  };

  const handleDownloadPDF = () => {
    if (items.length === 0) {
      alert('Please add at least one solar product to generate a quotation PDF.');
      return;
    }
    const quoteObj = buildQuotationObject();
    generateQuotationPDF(quoteObj);
  };

  const handleSaveQuote = () => {
    if (items.length === 0) {
      alert('Please add at least one product before saving.');
      return;
    }
    const quoteObj = buildQuotationObject();
    onSaveQuotation(quoteObj);
    alert(`Quotation ${quoteObj.quotationNumber} saved to your profile!`);
    setActiveTab('saved');
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Top Segmented Tab Picker (Builder vs Saved) */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'builder'
              ? 'bg-slate-900 text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Quotation Builder ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'saved'
              ? 'bg-slate-900 text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Saved Quotes ({savedQuotations.length})
        </button>
      </div>

      {activeTab === 'builder' ? (
        <div className="space-y-4">
          {/* Customer Details Form Collapsible */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-500" /> Customer Information
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-900"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Installation Address"
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-900"
            />
          </div>

          {/* Itemized Product List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-extrabold text-slate-900">Selected Products ({items.length})</h4>
              {items.length > 0 && (
                <button
                  onClick={onClearSelectedProducts}
                  className="text-[10px] font-bold text-rose-600 hover:text-rose-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center space-y-2 border border-slate-200">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Your quotation list is empty</p>
                <p className="text-[11px] text-slate-400">
                  Browse the product catalog or use the ROI Calculator to add panels and inverters.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                    />

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <span className="text-[9px] font-bold text-amber-600 uppercase block">
                        {item.product.brand}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 truncate">{item.product.name}</h5>
                      <span className="text-xs font-black text-slate-900 block">
                        {formatINR(item.unitPriceINR * item.quantity)}
                      </span>
                    </div>

                    {/* Quantity Selector Controls */}
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-800 font-bold flex items-center justify-center shadow-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-extrabold text-slate-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-800 font-bold flex items-center justify-center shadow-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveProduct(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Service Add-ons & Coupon Code */}
          {items.length > 0 && (
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Include Rooftop Installation & Commissioning</span>
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={e => setIncludeInstallation(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* Promo Coupon Bar */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 block">Promo / Coupon Code</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. WELCOME2026)"
                    value={promoCodeInput}
                    onChange={e => setPromoCodeInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs uppercase font-bold text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Code {appliedPromo.code} Applied
                    </span>
                    <span>- {formatINR(appliedPromo.discountINR)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Itemized Cost Summary Box */}
          {items.length > 0 && (
            <div className="bg-slate-900 text-white rounded-3xl p-4 space-y-2.5 shadow-lg border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Financial Cost Breakdown
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Product Subtotal</span>
                  <span className="font-bold">{formatINR(itemsSubtotalINR)}</span>
                </div>

                {includeInstallation && (
                  <>
                    <div className="flex justify-between text-slate-300">
                      <span>Rooftop Structure & EPC Charges</span>
                      <span className="font-bold">{formatINR(installationCostINR)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>DISCOM Net-Metering Approval Fee</span>
                      <span className="font-bold">{formatINR(netMeteringFeeINR)}</span>
                    </div>
                  </>
                )}

                {subsidyDiscountINR > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Govt. Subsidy (PM Surya Ghar)</span>
                    <span>- {formatINR(subsidyDiscountINR)}</span>
                  </div>
                )}

                {promoDiscountINR > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promo Coupon Discount</span>
                    <span>- {formatINR(promoDiscountINR)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                  <span>GST ({gstRatePct}%)</span>
                  <span>{formatINR(gstAmountINR)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-slate-700">
                  <span>Final Net Amount Payable</span>
                  <span>{formatINR(finalTotalINR)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleDownloadPDF}
                  className="py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={handleSaveQuote}
                  className="py-3 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <Save className="w-4 h-4 text-emerald-400" />
                  <span>Save Quotation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Saved Quotations List Tab */
        <div className="space-y-3">
          {savedQuotations.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center space-y-2 border border-slate-200">
              <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">No saved quotations yet</p>
              <p className="text-xs text-slate-400">Build a quotation and save it to review anytime.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedQuotations.map(quote => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{quote.quotationNumber}</span>
                      <span className="text-[10px] text-slate-400">Created on {new Date(quote.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      {quote.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Count:</span>
                      <span className="font-bold text-slate-900">{quote.items.length} items</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Total Net Payable:</span>
                      <span className="font-black text-slate-900">{formatINR(quote.finalTotalINR)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => generateQuotationPDF(quote)}
                      className="py-2 bg-slate-900 text-amber-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF Copy
                    </button>

                    {onOpenSurveyModalWithQuote && (
                      <button
                        onClick={() => onOpenSurveyModalWithQuote(quote)}
                        className="py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                      >
                        <CalendarCheck2 className="w-3.5 h-3.5" /> Book Survey
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
