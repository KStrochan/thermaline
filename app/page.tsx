import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { QuickEstimate } from "@/components/site/QuickEstimate";
import { faqs, photos, projects, steps, systems } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, { path: "/" });

const heroFacts: [string, string][] = [
  ["Systems installed since 2011", "1,400+"],
  ["Average heating bill after a heat pump", "−52%"],
  ["Survey to switch-on", "3 weeks"],
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="blueprint border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div className="grid content-start gap-8">
            <h1 className="font-display text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Heating sized to your house, not to a brochure.
            </h1>
            <p className="max-w-xl text-lg text-muted">
              We measure every room, design the system around the numbers and install it with one crew. Heat pumps,
              condensing boilers and rooftop solar for homes and small businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-accent">
                Book a home survey
              </Link>
              <Link href="/calculator" className="btn-ghost">
                Estimate my system
              </Link>
            </div>
            <dl className="grid max-w-xl">
              {heroFacts.map(([label, value]) => (
                <div key={label} className="spec-row">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="font-display text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid content-start gap-6">
            <div className="relative">
              <Image
                src={unsplash(photos.heatPumpHouse, 1400)}
                alt="White heat pump unit mounted beside a modern house"
                width={1400}
                height={934}
                sizes="(min-width: 1024px) 480px, 100vw"
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full border border-fg bg-border object-cover"
              />
              <span className="dimension -bottom-6 left-0 right-0 justify-center">
                <span className="bg-bg px-2">1,100 mm outdoor unit</span>
              </span>
            </div>
            <div className="pt-4">
              <QuickEstimate />
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:items-end">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">Three systems, one crew</h2>
          <p className="max-w-2xl text-muted">
            Every quote starts with a heat loss calculation, so the system is neither too small for January nor so
            big that it cycles on and off all autumn.
          </p>
        </div>
        <div className="mt-12 grid gap-16">
          {systems.map((system, index) => (
            <article
              key={system.id}
              id={system.id}
              className={`grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center ${index % 2 === 1 ? "md:[&>figure]:order-2" : ""}`}
            >
              <figure className="relative">
                <Image
                  src={unsplash(system.photo, 1200)}
                  alt={system.photoAlt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="aspect-[3/2] h-auto w-full bg-border object-cover"
                />
              </figure>
              <div className="grid gap-5">
                <h3 className="font-display text-3xl font-semibold">{system.name}</h3>
                <p className="text-muted">{system.summary}</p>
                <dl>
                  {system.specs.map(([label, value]) => (
                    <div key={label} className="spec-row">
                      <dt className="text-sm text-muted">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-fg text-bg">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">From survey to switch-on</h2>
          <ol className="mt-12 grid gap-px bg-bg/20 md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="grid content-start gap-3 bg-fg p-6 md:pr-8">
                <span className="font-display text-5xl text-accent" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="text-sm text-bg/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid content-start gap-5">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Recent installs</h2>
            <p className="text-muted">
              Figures come from the first full year of meter readings after installation, compared with the year
              before.
            </p>
            <Image
              src={unsplash(photos.installer, 1000)}
              alt="Installer in a high-visibility shirt working on electrical equipment"
              width={1000}
              height={667}
              sizes="(min-width: 1024px) 420px, 100vw"
              className="aspect-[4/3] h-auto w-full bg-border object-cover"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Recent installations and their results</caption>
              <thead>
                <tr className="border-b-2 border-fg text-sm">
                  <th scope="col" className="py-3 pr-4 font-semibold">Property</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">System</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Area</th>
                  <th scope="col" className="py-3 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.place} className="border-b border-border align-top">
                    <th scope="row" className="py-4 pr-4 font-medium">{project.place}</th>
                    <td className="py-4 pr-4 text-muted">{project.system}</td>
                    <td className="whitespace-nowrap py-4 pr-4 tabular-nums text-muted">{project.size}</td>
                    <td className="py-4">
                      <span className="whitespace-nowrap bg-accent px-1.5 py-0.5 font-semibold">{project.result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold">Questions we get on every survey</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                  {faq.q}
                  <span aria-hidden="true" className="font-display text-2xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div className="grid content-start gap-5">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">Book a home survey</h2>
          <p className="text-muted">
            Tell us a little about the property. An engineer calls back within one working day to arrange a visit.
            The survey is free and there is no obligation to go ahead.
          </p>
          <p>
            Or call{" "}
            <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="font-semibold">
              {site.contact.phone}
            </a>
          </p>
        </div>
        <div className="border border-fg bg-surface p-6">
          <LeadForm action={submitLead} submitLabel="Request a survey" />
        </div>
      </section>
    </main>
  );
}
