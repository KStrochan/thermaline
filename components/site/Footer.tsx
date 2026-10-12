import Link from "next/link";
import { PhotoCredits } from "@/components/PhotoCredits";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-fg text-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="font-display text-2xl">{site.name}</p>
          <p className="max-w-sm text-sm text-bg/75">{site.description}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Visit or call</p>
          <p className="text-bg/75">{site.contact.address}</p>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="text-bg">
            {site.contact.phone}
          </a>
          <p className="text-bg/75">{site.contact.hours}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Pages</p>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-bg">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-bg/15">
        <div className="footer-meta mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 py-5 text-sm text-bg/70 sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. A demo project by{" "}
            <a href="https://github.com/KStrochan" className="text-bg">
              Konstantyn Strochan
            </a>
            ; the company is fictional.
          </p>
          <PhotoCredits credits={site.photoCredits} />
        </div>
      </div>
    </footer>
  );
}
