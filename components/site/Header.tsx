import Link from "next/link";
import { site } from "@/content/site";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline" aria-label={`${site.name} home`}>
      <span aria-hidden="true" className="grid h-7 w-7 place-items-center bg-accent">
        <span className="h-3 w-3 border-2 border-fg" />
      </span>
      <span className="font-display text-xl font-semibold tracking-wide text-fg">{site.name}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-fg no-underline hover:underline">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-accent">
            Book a survey
          </Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none border border-fg px-3 py-1.5 text-sm font-medium">Menu</summary>
          <nav aria-label="Mobile" className="absolute right-0 mt-2 grid w-56 gap-1 border border-border bg-surface p-2 shadow-lg">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 text-fg no-underline hover:bg-bg">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-accent mt-1 text-center">
              Book a survey
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
