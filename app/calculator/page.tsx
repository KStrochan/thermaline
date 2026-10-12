import type { Metadata } from "next";
import { Calculator } from "@/components/site/Calculator";
import { site } from "@/content/site";
import type { EstimateInput, Insulation } from "@/lib/calculator";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "System calculator",
  description: "Estimate the size, price and yearly saving of a heat pump, boiler or solar system for your building.",
  path: "/calculator",
});

const insulations: Insulation[] = ["poor", "average", "good"];

type Props = { searchParams: Promise<{ area?: string; insulation?: string }> };

export default async function CalculatorPage({ searchParams }: Props) {
  const params = await searchParams;
  const area = Number(params.area);
  const initial: EstimateInput = {
    system: "heat-pump",
    building: "house",
    area: Number.isFinite(area) && area > 0 ? area : 120,
    insulation: insulations.includes(params.insulation as Insulation) ? (params.insulation as Insulation) : "average",
  };

  return (
    <main id="main">
      <section className="blueprint border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">System calculator</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Four questions, and you get the size, a price range and the yearly saving. Send the result to us and the
            survey starts from your numbers.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Calculator initial={initial} />
      </section>
    </main>
  );
}
