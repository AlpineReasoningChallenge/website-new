# Site plan

The plan for the new archallenge.org, agreed with the owner in November 2026. It covers what pages the site needs, how the domain moves off the old Wix setup, and what still has to be confirmed.

## What the site is for

ARC is a nonprofit run by junior high and high school students in Calgary. It runs free STEM contests (the Rocky Mountain Junior Science Contest and the Summit STEM Triathlon) and free classes, and is adding general STEM events and more kinds of competitions this school year. The site has to make the next event, and how to take part, obvious within seconds, especially for parents arriving on a phone from WeChat or a teacher's email. More detail is in [PRODUCT.md](../PRODUCT.md).

## Decisions so far

| Decision | Source |
| --- | --- |
| Build from scratch; no resemblance to the old Wix site required. | Owner |
| Take light inspiration from student nonprofits such as Math Attack (math-attack-nu.vercel.app); avoid an over-the-top "tech startup" feel. | Owner |
| Do not frame ARC only around contests, only grades 7 to 10, or only the University of Calgary. | Owner |
| The old "Question of the Day" app is not carried over. | Owner |
| ARCane (the 2025 puzzle hunt) is not shown on the site. | Owner |
| Keep the richer home page layout and motion, in a white-and-teal palette. No dark or saturated colour bands. | Owner |
| Astro 7 static site, plain CSS, hosted on Cloudflare in the existing account. | Recommended, accepted |
| Registration stays on Google Forms; the newsletter stays on Substack. | Recommended |

## Pages

| Old page (Wix) | New page | Status |
| --- | --- | --- |
| Home | `/` | Built |
| Competitions | `/contests/`: both contests, with what is coming | To build |
| RMJ Science Contest | `/rmjsc/` (same address): this year's facts, format, FAQ, past winners, past papers | To build |
| Summit STEM Triathlon | `/sst/` (same address), same structure | To build |
| Classes, Past Classes | `/classes/`: upcoming classes, the 2023 series and its materials | To build |
| Our Team | `/about/`: mission, history, current team, past teams, how to join (`#join`) | To build |
| Sponsors | `/sponsors/`: supporters, what sponsorship pays for, how to sponsor or donate | To build |
| Donate | Part of `/sponsors/`; `/donate/` should redirect there | To build |
| Contact | `/contact/`: one email address, Discord, Instagram | To build |
| (none) | `/archive/`: past papers and solutions by contest and year | To build |
| Newsletter | Substack sign-up links; `/newsletter` keeps redirecting to Substack | To set up |

Old addresses to keep working or redirect when the domain switches: `/rmjsc`, `/sst`, `/sponsors`, `/newsletter`, `/qotd` (to `/archive/`), `/mobile` and `/mobile.html` (to `/`), and the Wix page names `/competitions`, `/classes`, `/past-classes`, `/our-team`, `/contact`, `/donate`. Redirects go in `public/_redirects`.

## Hosting and switching the domain

archallenge.org is registered on Cloudflare, and its DNS and email forwarding (info@ and sponsor@) are there too. Today a Cloudflare Worker named `website` serves a page that frames the Wix site. Someone with admin access to that Cloudflare account has to do these steps.

1. In Cloudflare, create a Worker connected to this repository (Workers Builds). Build command `npm run build`; `wrangler.jsonc` points it at `dist/`. Turn on preview builds for branches.
2. Check the site on its `*.workers.dev` address.
3. Move the domain: remove `archallenge.org` from the old `website` Worker's custom domains and add it to the new one. To roll back, attach it to the old Worker again.
4. Fix `www.archallenge.org`, which currently returns an error: add it as a second custom domain, or add a redirect rule from `www` to the bare domain.
5. Do not touch the MX records, the SPF and `google-site-verification` TXT records, or the `arcane` record. Email forwarding and the ARCane app depend on them.
6. Submit `https://archallenge.org/sitemap-index.xml` in Google Search Console (already verified for the domain).
7. Unpublish the Wix site, or stop it being indexed, so search engines stop treating it as the real site.
8. Archive the old `website` repository after about a month.

Turn on Cloudflare Web Analytics for the domain if visitor counts are wanted. It uses no cookies, so no cookie banner is needed.

## Still to confirm

- RMJSC 2027: venue, start and end times, grade range (the home page says "Grades 7 to 9"), registration form link and opening date.
- The next Summit STEM Triathlon date and grade range.
- The 2026-27 team: names, roles, schools and photos for `/about/`.
- Which supporters to list, and logo files for anyone who gave $250 or more.
- One contact email (three are in use) and one Discord invite (several are in circulation).
- Participant numbers per event, if any numbers are to be shown.
- Who receives donations, and how. ARC is incorporated but not a registered charity, so no tax receipts.
- Whether "Proposed by Danny Wang" stays on the sample problem.
- Whether winners' names may be published on results pages.

## Checks before each release

- The home page on a 390px-wide phone shows the next event's date, place, cost and button without scrolling.
- No sideways scrolling from 320px to 1920px wide.
- Everything is visible with JavaScript off and with reduced motion on.
- Link previews: `public/og-default.jpg` (1200 by 630) is the shared image; pages can pass their own.
