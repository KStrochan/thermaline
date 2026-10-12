export type Building = "apartment" | "house" | "commercial";
export type Insulation = "poor" | "average" | "good";
export type System = "heat-pump" | "boiler" | "solar";

export type EstimateInput = {
  area: number;
  building: Building;
  insulation: Insulation;
  system: System;
};

export type Estimate = {
  size: number;
  unit: "kW" | "kWp";
  costLow: number;
  costHigh: number;
  annualSaving: number;
  paybackYears: number;
};

export const AREA_MIN = 30;
export const AREA_MAX = 400;

/** Peak heat loss per square metre, in watts. */
const HEAT_LOSS: Record<Insulation, number> = { poor: 100, average: 70, good: 45 };
const BUILDING_FACTOR: Record<Building, number> = { apartment: 0.85, house: 1, commercial: 1.15 };

/** Demo pricing: a fixed part (survey, labour, controls) plus a part per unit of capacity. */
const PRICING: Record<System, { base: number; perUnit: number; savingPerUnit: number; minSize: number }> = {
  "heat-pump": { base: 1700, perUnit: 950, savingPerUnit: 95, minSize: 3 },
  boiler: { base: 2200, perUnit: 260, savingPerUnit: 35, minSize: 3 },
  solar: { base: 1500, perUnit: 1200, savingPerUnit: 165, minSize: 2 },
};

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

export function estimate(input: EstimateInput): Estimate {
  const area = Math.min(Math.max(input.area, AREA_MIN), AREA_MAX);
  const factor = BUILDING_FACTOR[input.building];
  const pricing = PRICING[input.system];

  const rawSize =
    input.system === "solar"
      ? (area * 35 * factor) / 1100 // yearly use in kWh, about 1100 kWh per kWp
      : (area * HEAT_LOSS[input.insulation] * factor) / 1000;
  const size = Math.max(roundTo(rawSize, 0.5), pricing.minSize);

  const mid = pricing.base + pricing.perUnit * size;
  const saving = pricing.savingPerUnit * size;

  return {
    size,
    unit: input.system === "solar" ? "kWp" : "kW",
    costLow: roundTo(mid * 0.88, 100),
    costHigh: roundTo(mid * 1.12, 100),
    annualSaving: roundTo(saving, 10),
    paybackYears: Math.round(mid / saving),
  };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
