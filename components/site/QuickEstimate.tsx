"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Odometer } from "@/components/anim/Odometer";
import { AREA_MAX, AREA_MIN, estimate, formatUsd, type Insulation } from "@/lib/calculator";

const insulationOptions: { value: Insulation; label: string }[] = [
  { value: "poor", label: "Draughty" },
  { value: "average", label: "Average" },
  { value: "good", label: "Well insulated" },
];

export function QuickEstimate() {
  const [area, setArea] = useState(120);
  const [insulation, setInsulation] = useState<Insulation>("average");
  const areaId = useId();
  const result = estimate({ area, building: "house", insulation, system: "heat-pump" });

  return (
    <div className="border border-fg bg-surface">
      <div className="flex items-baseline justify-between border-b border-fg bg-fg px-4 py-2 text-bg">
        <p className="font-display text-lg">Quick sizing</p>
        <p className="text-xs text-bg/70">Heat pump, family house</p>
      </div>
      <div className="grid gap-5 p-4">
        <div className="grid gap-2">
          <div className="flex items-baseline justify-between">
            <label htmlFor={areaId} className="text-sm font-semibold">
              Heated floor area
            </label>
            <output htmlFor={areaId} className="font-display text-xl tabular-nums">
              {area} m²
            </output>
          </div>
          <input
            id={areaId}
            type="range"
            min={AREA_MIN}
            max={AREA_MAX}
            step={5}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
        </div>
        <fieldset className="grid gap-2">
          <legend className="mb-2 text-sm font-semibold">Insulation</legend>
          <div className="grid grid-cols-3 border border-border">
            {insulationOptions.map((option) => (
              <label
                key={option.value}
                className="cursor-pointer border-r border-border px-2 py-2 text-center text-sm last:border-r-0 has-[:checked]:bg-accent has-[:checked]:font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
              >
                <input
                  type="radio"
                  name="quick-insulation"
                  value={option.value}
                  checked={insulation === option.value}
                  onChange={() => setInsulation(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <dl className="grid grid-cols-2 gap-px bg-border" aria-live="polite">
          <div className="bg-surface p-3">
            <dt className="text-xs text-muted">Recommended size</dt>
            <dd className="font-display text-3xl tabular-nums">
              <Odometer value={`${result.size} ${result.unit}`} />
            </dd>
            <div aria-hidden="true" className="mt-2 h-1.5 bg-border">
              <div className="load-bar h-full bg-accent" style={{ width: `${Math.min(100, (result.size / 30) * 100)}%` }} />
            </div>
          </div>
          <div className="bg-surface p-3">
            <dt className="text-xs text-muted">Installed price</dt>
            <dd className="font-display text-xl tabular-nums leading-tight">
              <Odometer value={formatUsd(result.costLow)} /> to <Odometer value={formatUsd(result.costHigh)} />
            </dd>
          </div>
        </dl>
        <Link href={`/calculator?area=${area}&insulation=${insulation}`} className="text-sm font-semibold">
          Open the full calculator
        </Link>
      </div>
    </div>
  );
}
