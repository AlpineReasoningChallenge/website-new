---
name: Alpine Reasoning Challenge
description: White pages, near-black ink and one teal; the liveliness comes from real photos, large type, overlapping cards and motion.
colors:
  white: "#ffffff"
  ink: "#0e1f1d"
  ink-soft: "#465753"
  line: "#d9e3e1"
  mist: "#f3f7f6"
  tint: "#e9f6f2"
  wash: "#d8f0e9"
  teal: "#0b7566"
  teal-strong: "#095b50"
  teal-bright: "#52d5bf"
  deep: "#0b2622"
  on-deep: "#e6f2ef"
  on-deep-soft: "#bfd9d3"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(clamp(2.375rem, 1.2rem + 4.6vw, 4.25rem), 13vw)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.6vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  figure:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 2rem + 3vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  lede:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Figtree Variable, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.3
rounded:
  radius-sm: "10px"
  radius: "16px"
  radius-lg: "24px"
  pill: "999px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "3rem"
  space-8: "4rem"
  section: "clamp(4rem, 2.5rem + 6vw, 8rem)"
  gutter: "clamp(1rem, 4vw, 2rem)"
  wrap: "74rem"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.4rem"
    height: "3rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.teal-strong}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.4rem"
    height: "3rem"
  button-ghost-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.teal-strong}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0.45rem 1.1rem"
    height: "2.75rem"
    typography: "{typography.small}"
  pill:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.teal-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.75rem"
    height: "1.75rem"
  pill-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  pill-teal:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.radius-lg}"
    padding: "clamp(1.25rem, 2.5vw, 2rem)"
  card-tint:
    backgroundColor: "{colors.tint}"
    rounded: "{rounded.radius-lg}"
  card-quiet:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.radius-lg}"
  date-tile:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    padding: "1.5rem"
    width: "10rem"
  faq-item:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.radius}"
    padding: "0.75rem 1.5rem"
    height: "3.75rem"
  input-answer:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.radius-sm}"
    padding: "0 0.75rem"
    height: "2.75rem"
    width: "8.5rem"
  arrow-link:
    textColor: "{colors.teal}"
    height: "2.75rem"
  rhythm-beat:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.teal-strong}"
    height: "3rem"
  rhythm-beat-long:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    height: "3rem"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    height: "2.75rem"
  nav-link-active:
    textColor: "{colors.teal-strong}"
  footer:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.on-deep}"
    typography: "{typography.small}"
---

# Design System: Alpine Reasoning Challenge

## Overview

**Creative North Star: "White Page, One Teal"**

A lively youth-nonprofit site whose energy comes from layout, real event photos, large type and motion, never from colour. Every page sits on white with near-black ink, and a single teal does all the work of buttons, links, dates and emphasis. Pale teal and pale grey-teal bands separate sections; the only dark surface on the site is the footer. Nothing is themed: there is no storytelling concept to explain, only plain sections that say what ARC runs and how to take part.

The page feels generous and friendly rather than corporate. Headlines are big, heavy and tightly set in Bricolage Grotesque; body copy is relaxed Figtree at a slightly large 17px. White cards with 24px corners, a hairline edge and a soft shadow carry content, and they often overlap the band above them (the next-event card hangs over the bottom of the opening band; the day strip rides up over the full-width photo). Photos are allowed a little play: the opening stack is rotated a few degrees, the organizer photo leans by 1.5 degrees, and captions sit on dark translucent pills.

Motion is part of the world, but it only ever adds a starting state. The resting state of every element is its normal, fully visible style, so a page with no JavaScript, with reduced motion turned on, or printed, is complete and static. Entrances rise and settle with no bounce; hover lifts cards and buttons slightly; the sample problem's rhythm row fills beat by beat. These constraints come from the owner and are binding: the richer layout and motion stay, the palette stays white and teal, and dark or saturated colour bands, amber, and themed concepts were each tried and rejected.

**Key Characteristics:**
- White ground, near-black ink, one teal; pale tints for bands, never dark or saturated ones.
- Bricolage Grotesque headings over Figtree text; big, heavy, tightly tracked headlines.
- White cards with 24px corners, a 1px inset hairline and a soft layered shadow, often overlapping the band above.
- Pill-shaped teal buttons with a darker lower edge that lift on hover and press on click.
- Real event photos, full-bleed or slightly rotated.
- Motion that only adds a starting state; everything is visible without it.

## Colors

A cool white-and-teal palette: three near-white surfaces, two inks, one working teal with a darker partner, and a dark footer that is the only place the bright logo teal appears.

### Primary
- **Working Teal** (`teal`): the single accent. Primary button fill, link colour, the date tile, the first word of the home headline ("Free"), the `$0` figures, the arrow icons inside card titles, the day-strip bars, the 3px focus outline and the 2px outline of ghost buttons. White text on it passes AA (5.6:1).
- **Deep Teal** (`teal-strong`): link and nav hover colour, the lower edge of primary buttons, ghost button text, pill text, and any teal text that sits on a tint or wash (7.2:1 on tint, 6.7:1 on wash).

### Secondary
- **Logo Teal** (`teal-bright`): the hand-drawn logo's teal. Used where the background is dark (footer column headings, footer link hover, the focus outline inside `.on-dark`) and, as the one exception, as the text-selection highlight behind ink text. Never as text, a fill or a button on a light surface.

### Neutral
- **White** (`white`): the page ground, every card, and text on teal.
- **Ink** (`ink`): all headings and body text (17:1 on white). Also the dark fill of the problem's point chips.
- **Soft Ink** (`ink-soft`): ledes, card descriptions, captions, labels such as "Where / Who / Cost", and other secondary text (7.6:1 on white, 7.1:1 on mist).
- **Hairline** (`line`): 1px card edges (drawn as an inset shadow), dividers between list rows, day-strip cells and the supporters row.
- **Mist** (`mist`): the alternating pale grey-teal band (sample problem, "Sponsors keep it free", FAQ) and the quiet "New this school year" card.
- **Tint** (`tint`): the pale teal of the opening band and the closing sign-up band. The header shares it, the tinted program card uses it, and it forms the 6px ring around each opening photo. It is also the browser `theme-color`.
- **Wash** (`wash`): small teal fills: pills, the countdown chip, short rhythm beats, ghost-button hover, the correct-answer input.
- **Footer Deep** (`deep`), **On Deep** (`on-deep`), **On Deep Soft** (`on-deep-soft`): the footer's ground, link text and secondary text. These three exist only for the footer.

Single-use literals that are not tokens yet (all in the home page's scoped styles): the answer input's border (`#7d918c`) and placeholder (`#5d6f6a`), and the wrong-answer message (`#8a2a12`, a dark rust used only for that error state). Translucent ink (`rgb(14 31 29 / 0.78)`) is the photo-caption pill.

### Named Rules
**The One Teal Rule.** Teal is the only accent. There is no second brand colour, no amber, no gradient between hues. The single non-teal colour on the site is the wrong-answer message, and it exists only as an error state.

**The Pale Bands Rule.** Content bands between the header and the footer are white, mist or tint, and nothing else. The home page alternates them: tint, white, mist, white, mist, white, mist, tint. The header is tint on every page, so the first band under it is tint, and later bands alternate from there. Dark or saturated bands were tried and rejected by the owner.

**The Footer-Only Dark Rule.** `deep` is the footer's colour and the footer's alone. Dark appears in page content only at small scale: ink point chips and translucent-ink caption pills laid over photos.

## Typography

**Display Font:** Bricolage Grotesque Variable (falls back to Figtree, then system sans)
**Body Font:** Figtree Variable (with ui-sans-serif, system-ui, Segoe UI)

**Character:** A chunky, slightly quirky grotesque for headings and big numbers over a round, friendly, very readable sans for everything else. Both are self-hosted variable fonts (preloaded in the layout), so in-between weights like 550, 650 and 750 are real.

### Hierarchy
- **Display** (750, `min(clamp(2.375rem … 4.25rem), 13vw)`, line-height 0.98, -0.035em): the one `h1` per page. The 13vw cap keeps long words inside a phone when text is enlarged. Balanced wrapping. On the home page the first word is coloured teal.
- **Headline** (700, 2rem to 3.25rem, line-height 1.04, -0.03em): every section `h2`.
- **Title** (650, 1.25rem to 1.5rem, line-height 1.15, -0.015em): card titles and other `h3`s. Day-strip titles and FAQ questions drop to the lede size (1.125rem to 1.25rem) at the same family and weight.
- **Figure** (800, 2.75rem to 4rem, line-height 1, -0.03em, teal): large numbers such as the `$0` tiles. The date tile's day number is the same treatment, a little larger (3.25rem to 4.5rem, -0.04em, tabular figures).
- **Lede** (Figtree 400, 1.125rem to 1.25rem, line-height 1.5, soft ink, max 36em): the sentence or two under every section heading.
- **Body** (Figtree 400, 1.0625rem, line-height 1.6): paragraphs. Card text caps at 38em, long-form text at 36em, FAQ answers at 44em.
- **Small** (Figtree, 0.9375rem): nav links (weight 550), small buttons, captions, notes, the footer.
- **Label** (Figtree 650, 0.8125rem, line-height 1.3): pills. Photo captions use the same size at 600. Sentence case, no tracking.

Interface emphasis inside body text is Figtree at 600 to 700 (buttons and arrow links 650, fact values 600). Numbers that change or line up use `font-variant-numeric: tabular-nums`.

### Named Rules
**The Two Families Rule.** Bricolage Grotesque is for `h1`–`h3`, the brand name, FAQ questions and big figures. Everything else, including small headings such as list labels, is Figtree.

**The Heading-Then-Lede Rule.** A section opens with its `h2` and then a lede, inside a block capped at 46rem. Nothing sits above the heading: no small label, tag or category line.

## Layout

- **Container:** content sits in a centred wrap of 74rem plus a gutter of 1rem to 2rem each side. Only full-bleed photos and band backgrounds break out of it.
- **Section rhythm:** each band has vertical padding of `section` (4rem on phones to 8rem on wide screens). The section heading block keeps 2rem to 3.5rem below it. The closing sign-up band is tighter (3rem to 5.5rem).
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64px (`space-1` to `space-8`). Card padding is fluid, 1.25rem to 2rem. Gaps between cards are 1.5rem.
- **Grids:** a 12-column bento for cards (7 + 5 spans, alternating); 5fr / 7fr splits for text beside an interactive or list column (sample problem, FAQ); 1fr / 1fr for photo beside copy (about); four equal cells for the day strip and the figure tiles.
- **The hang-over:** a white card may cross the edge of the band above it by pulling up with a negative margin (the next-event card hangs 5rem below the opening band, and the next section adds 5rem to its top padding to make room; the day strip rides 5rem, or 3rem on phones, up over the full-width photo). Content of the overlapped band is never covered.
- **Breakpoints** (written as literal `rem` values; media queries cannot read tokens): 72rem (four-up rows go two-up), 64rem (header switches to the Menu button; above it the header is sticky when the window is at least 34rem tall), 62rem (wide rows drop a column; bento goes 6 + 6), 52rem (two-column layouts stack; the opening band reorders to headline, next-event card, photos, and hides the opening buttons), 36rem (phone-only: single-column strips, full-width buttons in action rows).
- **Phones first:** every row wraps; long words wrap anywhere (`overflow-wrap: break-word`); tap targets are at least 44px (2.75rem).

## Elevation & Depth

A light, layered system. Surfaces are white on a white or pale band, and depth comes from three things together: a 1px inset hairline on every card, a soft two-part shadow tinted with ink, and physical overlap of cards across band edges. Only the tinted card is flat and borderless, relying on its fill; the quiet mist card keeps its hairline but drops the shadow.

### Shadow Vocabulary
- **Resting** (`--shadow-1`: `0 1px 2px rgb(14 31 29 / 0.06), 0 2px 8px rgb(14 31 29 / 0.06)`): program cards at rest, FAQ items, figure tiles, the open mobile menu. Always paired with `inset 0 0 0 1px var(--line)`.
- **Raised** (`--shadow-2`: `0 2px 6px rgb(14 31 29 / 0.07), 0 24px 48px -14px rgb(14 31 29 / 0.22)`): featured surfaces: the next-event card and day strip (which overlap a band), the sample problem panel, the about photo, and program cards on hover.
- **Photo stack** (`0 0 0 6px var(--tint), 0 22px 40px -20px rgb(14 31 29 / 0.45)`): the opening photos; the tint ring makes them read as prints on the band.
- **Scrolled header** (`0 1px 0 var(--line), 0 12px 28px -20px rgb(14 31 29 / 0.35)` over 94% white with a 10px backdrop blur): applied once the page has moved.
- **Key edge** (`0 3px 0` in `teal-strong`; `5px` on hover, `1px` on press): primary buttons only. See Components.

### Named Rules
**The Hairline-Plus-Shadow Rule.** A white card always has both its 1px inset hairline and a shadow: Resting by default, Raised for a page's featured panel (one that overlaps a band or holds the main interaction) or on hover. In forced-colours mode the hairline becomes a real 1px border.

**The Key Edge Rule.** The solid `teal-strong` lower edge belongs to the primary button and nothing else. Cards, tiles and images never get a solid offset shadow; the scrolled header's 1px hairline is a divider, not a key edge.

## Shapes

Soft, rounded and consistent. Three radii plus the pill: 24px (`radius-lg`) for cards, the sample problem, the day strip, the next-event card and the about photo; 16px (`radius`) for smaller containers (figure tiles, FAQ items, the opening photos, the mobile menu); 10px (`radius-sm`) for inputs and the skip link; full pill (999px) for every button, pill, chip, photo caption and the Menu toggle. Rhythm beats use 8px. Overflow is clipped to the radius so photos fill cards edge to edge with no inner padding.

Small geometric accents are drawn in CSS, never with glyphs: a 36 × 5px teal pill bar above each day-strip title, and a two-stroke chevron on `<summary>` that flips when opened. Icons come from `Icon.astro`: four line icons (arrow, external, menu, close) on a 20px grid at stroke 1.9 with round caps, sized 1.05em and coloured by `currentColor`.

## Components

Site-wide components live in `src/styles/global.css` and work on any page: wrap, section, section head, lede, buttons, arrow link, pills, icons, focus ring. Everything else below (cards, bento, next-event card, date tile, problem, input, day strip, figure tiles, FAQ items, sign-up band) is currently written in the home page's scoped `<style>` in `src/pages/index.astro` and does not exist on other pages yet. To reuse one, move its rules into `global.css` (or a component) with the same values rather than restyling it.

### Buttons
Friendly, tactile keys.
- **Shape:** full pill (999px), minimum height 3rem, padding 0.65rem 1.4rem, Figtree 650, 8px gap before a trailing icon.
- **Primary:** teal fill, white text, a darker `teal-strong` lower edge (`0 3px 0`).
- **Hover / Active:** hover lifts 2px and the edge grows to 5px, and a trailing arrow slides 4px right; press drops 2px with a 1px edge in 70ms. Transitions are `dur-fast` (150ms) on `ease-out`. Focus is the global 3px teal outline at 3px offset.
- **Ghost:** transparent with a 2px inset teal outline and `teal-strong` text; hover fills with wash and darkens the outline. No lower edge. Used beside a primary button for the second choice.
- **Small:** 2.75rem tall, padding 0.45rem 1.1rem, small text. Used in the header and in compact controls.
- In a row, one primary leads and ghosts follow. On phones (under 36rem) buttons in action rows go full width.

### Arrow Link
- A teal text link at 650 with a trailing arrow icon and a 44px target. The underline is transparent at rest and fades in on hover while the arrow slides 5px right. Use for "More about…", "Meet the team".
- Plain body links are teal with a 1.5px underline offset 0.18em; hover darkens to `teal-strong`.

### Pills
- **Style:** pill shape, 1.75rem tall, label type (13px, 650). Default is wash with `teal-strong` text for short facts ("In person", "Teams of 3", topics, supporter names). White pill on tinted surfaces; teal pill with white text for a date laid on a photo (pinned 1rem from the card's top-left with a small shadow, `0 2px 8px rgb(14 31 29 / 0.22)`).
- Pills are facts, not buttons: they are never links and never get hover states.

### Cards / Containers
- **Corner Style:** 24px.
- **Background:** white (default), tint (an emphasised card with no shadow), or mist (a quiet card with only its hairline).
- **Shadow Strategy:** hairline plus Resting; Raised on hover (see Elevation & Depth).
- **Internal Padding:** 1.25rem to 2rem; body is a column with 12px gaps; pills or the action push to the bottom.
- **Media:** an optional photo at the top, 13rem to 21rem tall, cropped to cover and flush with the card's edges.
- **Behaviour:** when a card has a title link, the whole card is the link (the link's `::after` covers the card); a teal arrow follows the title. On pointer devices hover lifts the card 5px, scales its photo to 1.05 over 900ms and nudges the arrow 5px. Keyboard focus outlines the whole card.

### Inputs / Fields
- **Style:** white field, 2.75rem tall, 1.5px border in `#7d918c`, 10px radius, inherited font with tabular figures; placeholder `#5d6f6a`. Paired with a small primary button.
- **Focus:** border turns teal and the global teal outline sits 1px out.
- **Right / Wrong:** right fills the field with wash, turns the border teal and shows "Correct." in `teal-strong`; wrong shakes the field 4px for 280ms and shows the message in `#8a2a12`. The result line is a `role="status"` region.
- Only one field style exists today (the answer check). The contact page should reuse it.

### Navigation
- **Header:** pale tint band shared with the opening section, at least 4.5rem tall; the logo (6.5rem wide, tilts -3° on hover) beside the name in Bricolage 650. Above 64rem it is sticky and turns 94% white with a hairline and soft shadow once the page scrolls.
- **Links:** ink, small text at 550, 44px targets. A 2px teal underline draws in from the left on hover over 240ms and stays on the current page (`aria-current="page"`), with the text in `teal-strong`. A small primary button ("Get updates", or "Register for…" when a form is open) ends the row.
- **Mobile (64rem and below):** a white pill Menu toggle with a 1.5px hairline. The menu opens as a white 16px-radius panel with a hairline and Resting shadow; links become full-width 3rem rows divided by hairlines and drop in with a 30ms stagger. Escape closes it. Without JavaScript the links show as a wrapping row instead.
- **Footer:** the one dark surface. `deep` ground, small type, logo (on-dark version) with a short description, three link columns headed in `teal-bright` 650, links in `on-deep` that turn `teal-bright` and underline on hover, and a copyright line above a faint divider.

### Next-Event Card (signature)
A white 24px card with hairline and Raised shadow, in three columns: a teal date tile (month in uppercase at 750 with 0.1em tracking, the day as a big Bricolage 800 number, then weekday and year), a body with a teal "Next event" line and a countdown chip, the event name in Bricolage 700 and a Where/Who/Cost list, then the actions (primary button, arrow link, a short note). At 62rem the actions move under the body; at 52rem it stacks and the date tile becomes a short horizontal bar across the top. On the home page it hangs over the bottom of the opening band.

### Photo Treatments
- **Opening stack:** three event photos in a 10 : 8.4 frame: the lead photo top-right at 74% width, a second rotated -4° bottom-left, a third rotated 3° bottom-right. Each has the 6px tint ring and photo shadow; on pointer hover a photo straightens and scales to 1.04.
- **Full-bleed photo:** spans the viewport, 18rem to 36rem tall (4 : 3 on phones), with a caption pill (translucent ink, white 13px 600 text) pinned top-left at the gutter. A white strip of content may ride up over its bottom edge.
- **Leaning photo:** 24px corners, Raised shadow, rotated -1.5°, caption pill bottom-left.
- Captions name the event and year. Every photo is real and from an ARC event.

### Sample Problem and Rhythm (signature)
A white 24px panel (hairline plus Raised) on a mist band, split 5fr / 7fr. The left column holds the statement, fact pills and the rhythm row: seven equal beat cells with 5px gaps, 3rem tall, 8px radius, Bricolage 700 numbers. Short beats are wash with a 1.5px teal inset outline; long beats span two cells in solid teal with white numbers. The row fills left to right one beat at a time (190ms per beat) when it scrolls into view, and "Try another rhythm" (a small ghost button) fades it out and deals a new one. The right column lists the parts, each with an ink point chip (pill, white 650 text, tabular figures) and an answer check, divided by hairlines; a ghost-styled `<summary>` reveals the answers.

### Day Strip and Figure Tiles
- **Day strip:** a white 24px band of four cells divided by hairlines, each with a 36 × 5px teal bar, a title and soft-ink text. Two-up at 72rem, one column at 36rem.
- **Figure tiles:** white 16px tiles with hairline plus Resting, a big teal figure over a soft-ink label. Two-up at 72rem; at 36rem each becomes a single row with the figure beside the label.

### FAQ Items
White 16px `<details>` with hairline plus Resting, stacked with 12px gaps. The question is Bricolage 650 at lede size in a row at least 3.75rem tall, with the chevron on the right; hover turns it `teal-strong`. The answer opens with a short rise and sits in soft ink, max 44em.

### Motion Grammar
Motion lives in `src/styles/motion.css` and `src/scripts/motion.js`; values are in the sidecar. To use it on a new page:
- Below the fold, put `data-reveal` on a heading, lede, card or row to have it rise 20px (12px on phones) and fade in as it scrolls into view, staggered 70ms (50ms on phones). Use `data-reveal="photo"` on a figure to fade it while the photo inside settles from 1.06 scale.
- In the first viewport, add `.intro` with an inline `--d` delay (240ms to 480ms) for the opening sequence; split the `h1` into `.word` spans with `--i` for the word-by-word rise. That word rise carries the site's only content blur (8px).
- Never set an element's resting style to hidden. If the script fails, or reduced motion is on, or the page is printed, everything shows.

## Do's and Don'ts

### Do:
- **Do** take every colour, size, space, radius, shadow and easing from `src/styles/tokens.css`; if a new value is truly needed, add it there with a comment first.
- **Do** keep content bands white, mist or tint, and alternate them so neighbouring sections differ.
- **Do** open each section with an `h2` and a lede, and give each page exactly one `h1`.
- **Do** give every white card its 1px inset hairline and a shadow: Resting at rest, Raised for the page's featured panel or on hover.
- **Do** use one primary teal button per action row, with ghost buttons for the alternatives.
- **Do** use real ARC event photos with true captions; rotate photos only a few degrees (1.5° to 4°), as in the opening stack and the about photo.
- **Do** use `data-reveal` and `.intro` for motion, and check the page with JavaScript off and with reduced motion on.
- **Do** keep tap targets at least 2.75rem (44px) and check new text colours reach WCAG AA on their actual surface.
- **Do** use `Icon.astro` for icons and add new ones on the same 20px grid at stroke 1.9.

### Don't:
- **Don't** add dark or saturated colour bands to page content; the footer is the only dark surface.
- **Don't** introduce amber or any second accent colour, and don't use teal-bright for text, fills or buttons on light surfaces.
- **Don't** frame a page around a themed concept or storytelling metaphor (the rejected trail-guide version is the example); say plainly what the page is.
- **Don't** put a small label, tag or category line above a section heading.
- **Don't** give anything other than a primary button a solid `teal-strong` lower edge or a hard offset shadow.
- **Don't** make a figure tile, pill or badge out of a number that is not true and current.
- **Don't** hide content until a script reveals it, or set any element's resting state to invisible.
- **Don't** use emoji or text glyphs as icons.
- **Don't** hard-code new hex values in a page's styles; add them to `tokens.css`.
