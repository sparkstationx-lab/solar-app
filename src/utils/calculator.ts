import { CalculatorInputs, CalculationResults } from '../types';

export function calculateSolarROI(inputs: CalculatorInputs): CalculationResults {
  const {
    monthlyBillINR,
    tariffPerUnitINR,
    rooftopAreaSqFt,
    panelWattage,
    sunHoursPerDay,
    subsidyEligible,
    degradationRatePct
  } = inputs;

  const validBill = Math.max(500, monthlyBillINR || 4500);
  const validTariff = Math.max(3.5, tariffPerUnitINR || 8.0);
  const validArea = Math.max(100, rooftopAreaSqFt || 500);

  // Monthly electricity consumption in kWh
  const monthlyUnitsKwh = validBill / validTariff;
  const dailyUnitsKwh = monthlyUnitsKwh / 30;

  // Recommended kW size
  // System performance ratio ~80%
  const systemPerformanceRatio = 0.80;
  let recommendedCapacityKw = dailyUnitsKwh / (sunHoursPerDay * systemPerformanceRatio);

  // Cap capacity by rooftop area available (1 kW requires roughly 90-100 sq ft)
  const maxPossibleKwByArea = validArea / 90;
  if (recommendedCapacityKw > maxPossibleKwByArea) {
    recommendedCapacityKw = maxPossibleKwByArea;
  }

  // Round capacity to 1 decimal place (e.g., 3.3 kW)
  recommendedCapacityKw = Math.max(1.0, Math.round(recommendedCapacityKw * 10) / 10);

  // Number of panels needed
  const totalWattsNeeded = recommendedCapacityKw * 1000;
  const panelsCount = Math.ceil(totalWattsNeeded / (panelWattage || 550));

  // Area required in Sq Ft
  const areaRequiredSqFt = Math.round(panelsCount * 50);

  // Monthly solar generation in kWh
  const estimatedMonthlyGenKwh = Math.round(recommendedCapacityKw * sunHoursPerDay * 30 * systemPerformanceRatio);

  // Monthly savings in INR
  const usableGeneratedKwh = Math.min(monthlyUnitsKwh, estimatedMonthlyGenKwh);
  const monthlySavingsINR = Math.round(usableGeneratedKwh * validTariff);
  const annualSavingsINR = monthlySavingsINR * 12;

  // Cost estimates (approx ₹ 52,000 per kW turn-key cost)
  const costPerKwINR = recommendedCapacityKw <= 3 ? 55000 : 50000;
  const estimatedGrossCostINR = Math.round(recommendedCapacityKw * costPerKwINR);

  // PM Surya Ghar Scheme Subsidy Calculation
  let applicableSubsidyINR = 0;
  if (subsidyEligible) {
    if (recommendedCapacityKw <= 1) {
      applicableSubsidyINR = 30000;
    } else if (recommendedCapacityKw <= 2) {
      applicableSubsidyINR = 60000;
    } else {
      applicableSubsidyINR = 78000; // Capped at ₹78,000 for 3kW and above
    }
  }

  const estimatedNetCostINR = Math.max(10000, estimatedGrossCostINR - applicableSubsidyINR);

  // Payback period
  const paybackPeriodYears = Math.max(1.5, Math.round((estimatedNetCostINR / annualSavingsINR) * 10) / 10);

  // 25-Year Long Term Savings Calculation
  // Assuming 3% annual electricity tariff increase and 0.5% panel degradation
  let total25YearSavingsINR = 0;
  let currentAnnualSavings = annualSavingsINR;
  const tariffEscalation = 0.03; // 3% per year
  const degradation = (degradationRatePct || 0.5) / 100;

  for (let year = 1; year <= 25; year++) {
    total25YearSavingsINR += currentAnnualSavings;
    currentAnnualSavings = currentAnnualSavings * (1 - degradation) * (1 + tariffEscalation);
  }

  const savings25YearsINR = Math.round(total25YearSavingsINR - estimatedNetCostINR);

  // Environmental impact
  // 1 kWh solar prevents ~0.82 kg of CO2 emissions
  const co2OffsetTonsPerYear = Math.round(((estimatedMonthlyGenKwh * 12 * 0.82) / 1000) * 10) / 10;
  const treesPlantedEquivalent = Math.round(co2OffsetTonsPerYear * 45);

  return {
    recommendedCapacityKw,
    panelsCount,
    areaRequiredSqFt,
    estimatedMonthlyGenKwh,
    estimatedGrossCostINR,
    applicableSubsidyINR,
    estimatedNetCostINR,
    monthlySavingsINR,
    annualSavingsINR,
    paybackPeriodYears,
    savings25YearsINR,
    co2OffsetTonsPerYear,
    treesPlantedEquivalent
  };
}
