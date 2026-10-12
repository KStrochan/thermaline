import type { Metadata } from "next";
import Image from "next/image";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { photos } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, {
  title: "Book a survey",
  description: "Book a free home survey or ask a question about heat pumps, boilers and solar.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ estimate?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { estimate } = await searchParams;
  const tel = site.contact.phone.replace(/[^+\d]/g, "");

  return (
    <main id="main" className="blueprint">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-6">
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">Book a survey</h1>
          <p className="text-lg text-muted">
            An engineer calls back within one working day. The visit takes about two hours and you get a written heat
            loss report whether or not you go ahead.
          </p>
          <dl className="bg-surface px-5 pb-2">
            <div className="spec-row">
              <dt className="text-sm text-muted">Phone</dt>
              <dd>
                <a href={`tel:${tel}`} className="font-semibold">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Office</dt>
              <dd>{site.contact.address}</dd>
            </div>
            <div className="spec-row">
              <dt className="text-sm text-muted">Hours</dt>
              <dd>{site.contact.hours}</dd>
            </div>
          </dl>
          <Image
            src={unsplash(photos.heatPump, 1000)}
            alt="Outdoor heat pump unit next to a brick wall"
            width={1000}
            height={667}
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[3/2] h-auto w-full border border-fg bg-border object-cover"
          />
        </div>
        <div className="border border-fg bg-surface p-6 sm:p-8">
          <h2 className="mb-6 font-display text-3xl font-semibold">Tell us about the property</h2>
          <LeadForm action={submitLead} defaultMessage={estimate} submitLabel="Request a survey" />
        </div>
      </div>
    </main>
  );
}
