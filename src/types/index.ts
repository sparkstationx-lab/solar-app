/**
 * Types for Vizon Solar Mobile Application
 */

export type ProductCategory = 'panels' | 'inverters' | 'batteries' | 'systems' | 'accessories';

export interface SolarProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: ProductCategory;
  priceINR: number;
  originalPriceINR?: number;
  capacityValue: number; // e.g., 550 (Watts), 5 (kW), 10 (kWh)
  capacityUnit: 'W' | 'kW' | 'kWh' | 'Ah' | 'V';
  efficiencyPct?: number; // e.g. 21.5%
  warrantyYears: number; // e.g. 25
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  dimensions?: string;
  weightKg?: number;
  popular?: boolean;
}

export interface CalculatorInputs {
  monthlyBillINR: number;
  tariffPerUnitINR: number; // e.g. 8.0
  rooftopAreaSqFt: number; // e.g. 500
  city: string;
  propertyType: 'Residential' | 'Commercial' | 'Industrial';
  // Advanced assumptions
  panelWattage: number; // e.g. 550
  sunHoursPerDay: number; // e.g. 5.0
  subsidyEligible: boolean; // PM Surya Ghar Muft Bijli Yojana
  degradationRatePct: number; // e.g. 0.5%
}

export interface CalculationResults {
  recommendedCapacityKw: number; // e.g. 3.3 kW
  panelsCount: number; // e.g. 6 panels
  areaRequiredSqFt: number; // e.g. 330 sq ft
  estimatedMonthlyGenKwh: number; // e.g. 396 kWh
  estimatedGrossCostINR: number;
  applicableSubsidyINR: number;
  estimatedNetCostINR: number;
  monthlySavingsINR: number;
  annualSavingsINR: number;
  paybackPeriodYears: number; // e.g. 3.2
  savings25YearsINR: number;
  co2OffsetTonsPerYear: number;
  treesPlantedEquivalent: number;
}

export interface QuotationItem {
  product: SolarProduct;
  quantity: number;
  unitPriceINR: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g. "SOL-2026-9481"
  createdAt: string; // ISO String
  validUntil: string; // ISO String
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: QuotationItem[];
  includeInstallation: boolean;
  installationCostINR: number;
  netMeteringFeeINR: number;
  subtotalINR: number;
  subsidyDiscountINR: number;
  promoDiscountINR: number;
  promoCodeApplied?: string;
  gstRatePct: number; // e.g. 12%
  gstAmountINR: number;
  finalTotalINR: number;
  status: 'Draft' | 'Saved' | 'Accepted' | 'Survey Pending' | 'Converted to Order';
  notes?: string;
}

export interface SurveyBooking {
  id: string;
  referenceNumber: string; // e.g. "SURVEY-2026-8812"
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  propertyType: string;
  address: string;
  city: string;
  pinCode: string;
  roofAreaSqFt: number;
  monthlyBillINR: number;
  preferredDate: string;
  timeSlot: string; // e.g. "10:00 AM - 01:00 PM"
  additionalNotes?: string;
  rooftopPhotoUrl?: string;
  electricityBillUrl?: string;
  status: 'Requested' | 'Engineer Assigned' | 'Site Visit Scheduled' | 'Feasibility Complete' | 'Completed';
  assignedEngineer?: {
    name: string;
    phone: string;
    rating: number;
  };
}

export interface InstallationProgress {
  bookingId: string;
  currentStep: number; // 1 to 5
  steps: {
    title: string;
    description: string;
    completed: boolean;
    current?: boolean;
    date?: string;
  }[];
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  isLoggedIn: boolean;
  savedProductIds: string[];
}
