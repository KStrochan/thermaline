import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Thermaline",
  description:
    "Heat pumps, boilers and solar power for homes and small businesses. We size the system, install it and keep it running.",
  url: "https://thermaline.vercel.app",
  locale: "en",
  routes: ["/", "/calculator", "/contact"],
  nav: [
    { href: "/#systems", label: "Systems" },
    { href: "/#projects", label: "Projects" },
    { href: "/calculator", label: "Calculator" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    phone: "+1 (555) 014-2200",
    address: "48 Foundry Road, Millbrook",
    hours: "Mon to Fri 8:00 to 18:00, Sat 9:00 to 14:00",
  },
  photoCredits: [
    { author: "alpha innotec", url: "https://unsplash.com/@alpha_innotec" },
    { author: "Bill Mead", url: "https://unsplash.com/@wmmead" },
    { author: "Peter Herrmann", url: "https://unsplash.com/@tama66" },
    { author: "Raze Solar", url: "https://unsplash.com/@razesolar" },
  ],
};
