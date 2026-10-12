import { describe, expect, test } from "vitest";
import { estimate, formatUsd } from "@/lib/calculator";

describe("estimate", () => {
  test("sizes a heat pump from floor area, insulation and building type", () => {
    const result = estimate({ area: 120, building: "house", insulation: "average", system: "heat-pump" });
    expect(result.size).toBe(8.5);
    expect(result.unit).toBe("kW");
  });

  test("poor insulation needs a bigger system than good insulation", () => {
    const poor = estimate({ area: 150, building: "house", insulation: "poor", system: "heat-pump" });
    const good = estimate({ area: 150, building: "house", insulation: "good", system: "heat-pump" });
    expect(poor.size).toBeGreaterThan(good.size);
  });

  test("sizes solar in kWp from expected consumption", () => {
    const result = estimate({ area: 120, building: "house", insulation: "average", system: "solar" });
    expect(result.unit).toBe("kWp");
    expect(result.size).toBe(4);
  });

  test("returns a price range around the midpoint and a payback period", () => {
    const result = estimate({ area: 120, building: "house", insulation: "average", system: "heat-pump" });
    expect(result.costLow).toBeLessThan(result.costHigh);
    expect(result.costLow).toBe(8600);
    expect(result.costHigh).toBe(10900);
    expect(result.annualSaving).toBe(810);
    expect(result.paybackYears).toBe(12);
  });

  test("never sizes below the smallest unit we install", () => {
    const result = estimate({ area: 20, building: "apartment", insulation: "good", system: "heat-pump" });
    expect(result.size).toBe(3);
  });

  test("clamps area to the supported range", () => {
    const huge = estimate({ area: 5000, building: "house", insulation: "average", system: "boiler" });
    const max = estimate({ area: 400, building: "house", insulation: "average", system: "boiler" });
    expect(huge).toEqual(max);
  });
});

describe("formatUsd", () => {
  test("formats whole dollars with separators", () => {
    expect(formatUsd(10900)).toBe("$10,900");
  });
});
