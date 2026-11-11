# archallenge.org

The website for Alpine Reasoning Challenge (ARC), a student-run nonprofit in Calgary that runs free STEM contests and classes. It replaces the old Wix site, which archallenge.org currently shows inside an iframe.

**Status:** the home page is built. Every other link (Contests, Classes, Past papers, About, Sponsor us, Contact, `/rmjsc/`, `/sst/`) shows a "this page isn't here yet" page until those pages are made. The domain has not been switched over yet; see [docs/site-plan.md](docs/site-plan.md).

## Run it

You need Node 22.23.4 or newer (see `.nvmrc`).

```sh
npm install
npm run dev       # live-reloading preview at http://localhost:4321
npm run build     # writes the finished site to dist/
npm run preview   # serves dist/ exactly as it will be deployed
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/site.ts` | **Most edits happen here.** The next event, contest and class blurbs, supporters, FAQ, nav links, email and social links. |
| `src/pages/index.astro` | The home page: its sections, its sample problem and its layout styles. |
| `src/pages/404.astro` | The "page not found" page (and the placeholder for unbuilt pages). |
| `src/layouts/Base.astro` | The page shell: `<head>`, link-preview tags, header, footer, scripts. |
| `src/components/` | Header, Footer and the small icon set. |
| `src/styles/tokens.css` | Every colour, font size, space, radius, shadow and easing. Change values here, not in pages. |
| `src/styles/global.css` | Base styles, buttons, arrow links and pills. |
| `src/styles/motion.css` | All animation, in one place. |
| `src/scripts/motion.js` | Scroll reveals, the header shadow, the "days to go" count, the answer checker and the rhythm animation. |
| `src/assets/photos/` | Event photos. Astro resizes and compresses them at build time. |
| `public/` | Files served as-is: logos, favicons, the link-preview image, `robots.txt`. |
| `DESIGN.md` | The design system: colours, type, components, motion and the rules for new pages. Read it before building a page. |
| `PRODUCT.md` | Who the site is for, what ARC is, and the owner's decisions about the look. |
| `docs/site-plan.md` | The full page plan, the domain switch-over steps and the open questions. |
| `.impeccable/` | Design notes used by the Impeccable design tool (the home page's direction brief and the design-system data). |

## Common edits

**Change the next event.** Edit `nextEvent` in `src/data/site.ts`: the name, `isoDate`, `month`, `day`, `weekdayYear`, `fullDate` and the `facts` rows.

**Open registration.** In `nextEvent`, change

```ts
registration: { status: 'soon' } as Registration,
```

to

```ts
registration: { status: 'open', url: 'https://forms.gle/...' } as Registration,
```

The card's button and the header button both switch to "Register for RMJSC". Use `{ status: 'closed' }` after the form closes.

**Add a supporter.** Add the name to `supporters` in `src/data/site.ts`. (Sponsors who give $250 or more were promised a logo on the site; a logo wall is still to be built.)

**Swap a photo.** Put a JPEG of at least 1600px wide in `src/assets/photos/`, import it at the top of the page, and give the `<Image>` a real `alt` description of what is in the photo.

After any change, run `npm run build` and check the home page on a phone width: the date, place, cost and sign-up button should be visible without scrolling.

## Rules for this site

- Only state what is true today. No made-up numbers, quotes or sponsor logos; write "to be announced" when something is not decided.
- White pages, near-black text, teal as the only accent. No dark or brightly coloured bands. See `DESIGN.md`.
- Everything must still show with JavaScript turned off and with "reduce motion" turned on. Motion only adds a starting state; it never hides content by default.
- Keep `/rmjsc/` and `/sst/` working: they are printed on past posters and linked from other sites.

## Deploying

The site is plain static files, hosted on Cloudflare (the same account that already holds the archallenge.org domain and its email forwarding). `wrangler.jsonc` tells Cloudflare to serve `dist/` and to use `404.html` for unknown paths. The one-time set-up and the domain switch are written out step by step in [docs/site-plan.md](docs/site-plan.md#hosting-and-switching-the-domain).
