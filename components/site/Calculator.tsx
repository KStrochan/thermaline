"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Odometer } from "@/components/anim/Odometer";
import {
  AREA_MAX,
  AREA_MIN,
  estimate,
  formatUsd,
  type Building,
  type EstimateInput,
  type Insulation,
  type System,
} from "@/lib/calculator";

type Option<T> = { value: T; label: string; hint: string };

const systemOptions: Option<System>[] = [
  { value: "heat-pump", label: "Heat pump", hint: "Replaces gas or oil heating" },
  { value: "boiler", label: "Condensing boiler", hint: "Like-for-like gas upgrade" },
  { value: "solar", label: "Rooftop solar", hint: "Cuts the electricity bill" },
];

const buildingOptions: Option<Building>[] = [
  { value: "apartment", label: "Apartment", hint: "Shared walls lose less heat" },
  { value: "house", label: "House", hint: "Detached or terraced" },
  { value: "commercial", label: "Commercial", hint: "Shop, office or workshop" },
];

const insulationOptions: Option<Insulation>[] = [
  { value: "poor", label: "Draughty", hint: "Single glazing, little loft insulation" },
  { value: "average", label: "Average", hint: "Double glazing, some insulation" },
  { value: "good", label: "Well insulated", hint: "Built or renovated after 2010" },
];

function Choice<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-display text-xl">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="grid cursor-pointer gap-1 border border-border bg-surface p-3 has-[:checked]:border-fg has-[:checked]:shadow-[inset_0_-4px_0_var(--accent)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="font-semibold">{option.label}</span>
            <span className="text-sm text-muted">{option.hint}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Calculator({ initial }: { initial: EstimateInput }) {
  const [input, setInput] = useState<EstimateInput>(initial);
  const areaId = useId();
  const result = estimate(input);
  const systemLabel = systemOptions.find((o) => o.value === input.system)?.label ?? "";
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const summary = `Estimate from the website: ${systemLabel}, ${result.size} ${result.unit}, ${input.area} m² ${input.building}, ${input.insulation} insulation. Price range ${formatUsd(result.costLow)} to ${formatUsd(result.costHigh)}.`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <form className="grid gap-10" onSubmit={(e) => e.preventDefault()}>
        <Choice legend="What do you want to install?" name="system" options={systemOptions} value={input.system} onChange={(v) => set("system", v)} />
        <Choice legend="Type of building" name="building" options={buildingOptions} value={input.building} onChange={(v) => set("building", v)} />
        <div className="grid gap-3">
          <div className="flex items-baseline justify-between">
            <label htmlFor={areaId} className="font-display text-xl">
              Heated floor area
            </label>
            <output htmlFor={areaId} className="font-display text-2xl tabular-nums">
              {input.area} m²
            </output>
          </div>
          <input
            id={areaId}
            type="range"
            min={AREA_MIN}
            max={AREA_MAX}
            step={5}
            value={input.area}
            onChange={(e) => set("area", Number(e.target.value))}
          />
          <div className="flex justify-between text-xs text-muted">
            <span>{AREA_MIN} m²</span>
            <span>{AREA_MAX} m²</span>
          </div>
        </div>
        {input.system !== "solar" ? (
          <Choice legend="How well is it insulated?" name="insulation" options={insulationOptions} value={input.insulation} onChange={(v) => set("insulation", v)} />
        ) : null}
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="border border-fg bg-surface">
          <div className="border-b border-fg bg-fg px-5 py-3 text-bg">
            <p className="font-display text-xl">Your estimate</p>
          </div>
          <dl className="px-5 pb-5">
            <div className="spec-row">
              <dt className="text-sm text-muted">System</dt>
              <dd className="font-semibold">{systemLabel}</dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Recommended size</dt>
              <dd className="font-display text-3xl tabular-nums">
                <Odometer value={`${result.size} ${result.unit}`} />
              </dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Installed price</dt>
              <dd className="font-semibold tabular-nums">
                <Odometer value={formatUsd(result.costLow)} /> to <Odometer value={formatUsd(result.costHigh)} />
              </dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Yearly saving</dt>
              <dd className="font-semibold tabular-nums">
                about <Odometer value={formatUsd(result.annualSaving)} />
              </dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Pays for itself in</dt>
              <dd className="font-semibold tabular-nums">about {result.paybackYears} years</dd>
            </div>
          </dl>
          <div className="grid gap-3 border-t border-border p-5">
            <Link href={`/contact?estimate=${encodeURIComponent(summary)}`} className="btn-accent text-center">
              Send this estimate to an engineer
            </Link>
            <p className="text-xs text-muted">
              A demo estimate based on typical heat loss and installation prices. The survey gives you a fixed quote.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
