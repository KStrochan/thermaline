# Thermaline

Demo website for Thermaline, a heating and solar installer I made up for my portfolio. The business, people and prices are fictional; the code is real.

Heat pumps, boilers and solar power for homes and small businesses. We size the system, install it and keep it running.

## Status

In progress. The groundwork is done: brand colors and fonts, the contact form with Telegram delivery, metadata, tests and a Lighthouse check. The pages below are next.

Pages:

- [ ] Home
- [ ] Services (heat pumps, boilers, solar)
- [ ] Calculator
- [ ] Projects (4 case studies)
- [ ] Contact

Features:

- [ ] Power and cost estimate calculator (floor area, building type, system type) that attaches its result to the enquiry

## Design

Technical and engineered: graphite with a signal-yellow accent, thin drafting lines and a blueprint grid.

| Token | Value |
| --- | --- |
| bg | `#F4F4F1` |
| surface | `#FFFFFF` |
| fg | `#1F2326` |
| muted | `#4E555B` |
| border | `#C8CBCC` |
| accent | `#F2B705` |
| on accent | `#1F2326` |
| link | `#1F2326` |
| error | `#B42318` |
| radius | `2px` |

Headings use Oswald, body text uses IBM Plex Sans. Both are self-hosted from `app/fonts` through `next/font/local`.

## Stack

- Next.js 16 (App Router), React 19
- TypeScript in strict mode
- Tailwind CSS 4
- zod for form validation
- Vitest and Testing Library
- Lighthouse CI

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run check` | Type check, lint and tests |
| `npm run lighthouse` | Builds the site, runs Lighthouse five times on mobile and fails if the median score in any category drops below 95 or the median LCP goes above 2.5 s |

## Contact form

Enquiries go to a Telegram chat. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Without them the form runs in demo mode and tells the visitor that nothing was sent.

## Deploying

Import the repository in Vercel and add the two Telegram variables if the form should deliver leads. Update `url` in `content/site.ts` once the site has its final domain.

## Credits

Fonts are licensed under the SIL Open Font License; the license texts are in `app/fonts`. Photos will come from Unsplash and are credited in the site footer.

## License

Code: MIT
