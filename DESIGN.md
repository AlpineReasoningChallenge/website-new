---
name: Alpine Reasoning Challenge
description: One frost-white page, ink from the logo's night sky, the logo's teal as the only accent, and ARC's logo built in 3D as the single moving idea.
colors:
  ground: "#eef3f3"
  surface: "#ffffff"
  surface-soft: "#f6f9f9"
  line: "#d3dedf"
  line-soft: "#e2e9ea"
  ink: "#0c1a1f"
  ink-2: "#42535a"
  ink-3: "#5b6b71"
  teal: "#0b7566"
  teal-deep: "#085a4f"
  teal-logo: "#52d5bf"
  teal-wash: "#d9f1eb"
  night: "#0b1a1f"
  on-night: "#e4efee"
  on-night-2: "#a9bfbd"
typography:
  display:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "min(clamp(2.5rem, 1.4rem + 3.9vw, 4.375rem), 12vw)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.125rem)"
    fontWeight: 620
    lineHeight: 1.05
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 106"
  title:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.45vw, 1.45rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 104"
  lede:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.125rem, 1.06rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Mona Sans Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  sm: "10px"
  md: "14px"
  lg: "22px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.5rem"
  space-6: "2rem"
  space-7: "3rem"
  space-8: "4.5rem"
  section: "clamp(5rem, 3rem + 7vw, 9.5rem)"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  wrap: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.7rem 1.25rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.surface}"
  button-quiet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.7rem 1.25rem"
    height: "3rem"
  button-quiet-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.teal-deep}"
  button-small:
    typography: "{typography.small}"
    padding: "0.45rem 0.95rem"
    height: "2.5rem"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.small}"
    rounded: "{rounded.sm}"
    padding: "0 0.8rem"
    height: "2.5rem"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.25rem, 3.5vw, 2.75rem)"
  input-answer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
    height: "2.5rem"
  input-answer-right:
    backgroundColor: "{colors.teal-wash}"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    typography: "{typography.small}"
---

# Design System: Alpine Reasoning Challenge

## Overview

**Creative North Star: "One Frost Page, One Moving Logo"**

The whole site is one cool frost-white page with near-black ink and a single teal. Sections don't get their own colours. They are separated by space and hairline rules, not by bands. Content that is a single thing (the next event, a sample problem, the closing sign-up) sits on a white panel with a hairline inset and a soft ink-tinted haze. Lists are ruled rows. Type is Mona Sans throughout: headings set slightly wide and tightly tracked, body text plain and readable at 17px.

All the liveliness lives in one place: ARC's logo built in three.js. It has faceted snow peaks with teal left faces, a four-point star with a soft halo, a tapered arc that draws itself, and a few sparkles. It sits on a fixed canvas behind the page, rests in the right-hand lane beside the headline, and flies down that lane when a later section asks for it (on the home page it becomes the sample problem's rhythm). Everything else stays quiet. Only the headline blurs in word by word, and only one section heading rises in. Smooth wheel scrolling makes the page glide.

The owner has rejected four looks: a themed "trail guide" concept ("super gimmicky"), a plain white page with no motion ("a bit bland"), a dark teal and amber rebuild with card grids, badges and stat tiles ("looks like ai slop"), and a cluttered build that felt "toyish" and "vibecoded". This system is the answer to all four: calm, professional, plainly ARC's colours, with one piece of motion worth looking at.

**Key Characteristics:**
- One frost ground (#eef3f3) behind every section. The only dark band is the night footer.
- Ink and accents come from the logo: night-spruce ink, a text-safe teal for actions, the logo's bright teal only on night and in the 3D scene.
- Mona Sans only. Its width axis widens as headings grow (104% to 110%).
- Hairline-ruled rows for lists, white panels for single objects, no card grids.
- One signature motion (the 3D logo scene), one headline blur-in, one heading reveal.
- The page is complete without JavaScript, without WebGL and with reduced motion on.

## Colors

A cool, almost monochrome palette taken from ARC's logo: frost and white for paper, the night sky for ink, and one teal in two strengths.

### Primary
- **ARC Teal** (teal): the one accent on light surfaces. Filled buttons, links, the next event's day number, the upcoming program's date, problem point values, the focus ring and the caret. Safe for text on frost and white.
- **Deep Teal** (teal-deep): hover and pressed state for teal buttons and links, and the "Correct." result text.
- **Logo Teal** (teal-logo): the logo's own bright teal. Used on the night footer (column labels, link hover, focus ring) and inside the 3D scene. On light surfaces it appears only where no text sits on it: the text-selection highlight and the ring around the beat that is playing.
- **Teal Wash** (teal-wash): the fill of an answer box that was checked as correct. Nowhere else.

### Neutral
- **Cool Frost** (ground): the one page colour, on `html` and `body`, and the browser theme colour. Every section shows it.
- **Panel White** (surface): white panels (next event, problem, closing sign-up), quiet buttons, the header bar (at 94% to 97% opacity under a blur) and the hover fill of a program row.
- **Faint Frost** (surface-soft): inset fills such as short beats and the answer field.
- **Hairline** (line): rules between rows, section dividers, quiet-button and program-arrow outlines.
- **Soft Hairline** (line-soft): rules and insets inside white panels.
- **Night Spruce** (ink): headings, names, values and problem text. Taken from the night sky behind the logo.
- **Slate Ink** (ink-2): body text and ledes.
- **Mist Ink** (ink-3): captions, meta lines, labels, dates of past events.
- **Night Sky** (night): the footer, and only the footer.
- **Moonlit Frost** (on-night) and **Dim Frost** (on-night-2): primary and secondary text on the footer.

### Named Rules
**The One Frost Ground Rule.** Every page uses `--ground` as its only page colour, and sections never set a background of their own. The fixed 3D canvas sits behind `main`, so a section background would hide the scene and break the one-page feel. Separate sections with `--section` spacing or a `--line` hairline instead.

**The Two Teals Rule.** Text and actions on light surfaces use `--teal`. The bright `--teal-logo` never carries text on frost or white. It belongs on the night footer, inside the 3D scene, and in the two text-free highlights it already marks.

**The Night Footer Only Rule.** `--night` is the footer's colour. No other band, section or hero is dark or saturated.

## Typography

**Display Font:** Mona Sans Variable (falls back to ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Mona Sans Variable (same stack)

**Character:** A single grotesque used two ways. Headings are wide (font-stretch 104% to 110%) and tightly tracked so they read as confident and engineered. Body text stays at normal width and weight 400 so it is easy to read and to machine-translate.

### Hierarchy
- **Display** (h1): the page headline, one per page. On the home page it is capped further at 7.6vh above 52rem so the next-event panel stays in view on short laptops, and at 10.8vw below 36rem. Max width about 15ch, balanced wrapping.
- **Headline** (h2): section headings, balanced wrapping. Put one in each section head, with an optional lede under it.
- **Title** (h3): card-less item titles such as program names and the problem title. In the contest-day list it drops to the lede size.
- **Lede**: the paragraph under a section heading, max 34em.
- **Body**: running text at line height 1.6, colour Slate Ink, pretty wrapping. About-page style copy is capped at 36em.
- **Small**: captions, meta lines, footer text, nav links (weight 520), small buttons.
- **Label**: field labels in the next-event panel (weight 500, Mist Ink) and the countdown.
- **Date figure** (next event day only): clamp(3.25rem, 2.6rem + 2.4vw, 4.5rem), weight 640, width 110%, letter spacing -0.05em, tabular numbers, ARC Teal.

### Named Rules
**The One Family Rule.** Mona Sans is the only typeface. Hierarchy comes from size, weight (400 to 640) and the width axis, never from a second family.

**The Wider-As-Larger Rule.** The width axis grows with size: 100% for body, 104% for titles and list names, 106% for section headings and the brand name, 108% for the headline, 110% for the date figure. Tracking tightens the same way, from -0.015em down to -0.05em.

**The Tabular Figures Rule.** Dates, counts, points and beats use `font-variant-numeric: tabular-nums`.

## Layout

Content sits in a centred wrap that is 76rem wide plus a fluid gutter (clamp(1rem, 4vw, 2.5rem)) on each side. Sections are separated by `--section` padding (clamp(5rem, 3rem + 7vw, 9.5rem)). Two neighbouring sections can share a hairline rule across the top of the second section's grid instead of a background change (the supporters and questions sections do this). A section head is capped at 40rem, with a lede under the heading.

Column grids use `minmax(0, …fr)` columns with clamp gaps (clamp(2rem, 6vw, 6rem) is the common one). Breakpoints are written as literal media queries because CSS cannot read custom properties there:
- **64rem**: the header turns into a menu button, the header stops being sticky, and the 3D scene stops running (the canvas is `display: none` at this width and below).
- **52rem**: two-column layouts stack.
- **36rem**: phone-only adjustments.

The header is a floating bar that sticks to the top above 64rem. Its height is 4.25rem, and anchors scroll to `--header-h` + 2rem below it.

### The 3D lane
The fixed canvas covers the whole viewport at z-index 0 with `pointer-events: none`. `main` and the footer sit above it at z-index 1. Above 64rem the right-hand column of any section that holds a stage is the scene's lane.

**The Clear Lane Rule.** 3D objects never cross text. A stage goes in the right-hand column. Every section between two stages keeps its text in the left column (the programs list is capped at 46rem inside the 76rem wrap for this reason), so the flight path down the right side stays empty. Don't put text, photos or panels in the lane between two stages.

**The Rows-Not-Cards Rule.** Collections (programs, contest-day points, supporters, questions, problem parts) are hairline-ruled rows or columns of text, each with a `--line` rule above or below. White panels are kept for single objects. Never lay out a grid of cards.

## Elevation & Depth

The page is flat paper. Depth comes from three things: the white panels' hairline inset plus a soft, ink-tinted haze; the header's frosted blur; and real lighting in the 3D scene. Shadows are always tinted toward the ink (rgb 12 26 31) or, on teal buttons, toward deep teal. They are never neutral grey. Outlines are drawn as `inset 0 0 0 1px` box shadows rather than borders, so they don't change layout.

### Shadow Vocabulary
- **Panel haze** (`inset 0 0 0 1px var(--line-soft), 0 1px 2px rgb(12 26 31 / 0.05), 0 4px 16px -6px rgb(12 26 31 / 0.1)`): white panels at rest. The outer part is `--shadow-1`, which is also the hover lift of a program row.
- **Teal button** (`inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(8 90 79 / 0.3), 0 8px 20px -10px rgb(8 90 79 / 0.7)`): the filled button's slight bevel and teal glow.
- **Quiet button** (`inset 0 0 0 1px var(--line), 0 1px 2px rgb(12 26 31 / 0.05)`): white button outline. On hover it becomes a darker hairline with a small lift (`0 6px 16px -10px rgb(12 26 31 / 0.25)`).
- **Header bar** (`inset 0 0 0 1px rgb(211 222 223 / 0.9), 0 1px 2px rgb(12 26 31 / 0.04)` plus `backdrop-filter: blur(18px) saturate(160%)`): once the page has scrolled it gains `0 14px 34px -18px rgb(12 26 31 / 0.3)`.

### Named Rules
**The Hairline-and-Haze Rule.** A raised surface is white, outlined by a 1px inset hairline and lifted by a soft ink-tinted haze. Never use a hard offset shadow, a grey shadow or a thick border.

## Shapes

Corners are gently rounded on a three-step scale: 10px (`--radius-sm`) for buttons, inputs, nav links and the skip link; 14px (`--radius`) for the header bar and program-row hover fills; 22px (`--radius-lg`) for white panels and photos. Round shapes appear only as the program row's 2.5rem circular arrow. Disclosure chevrons are drawn with CSS borders, rotated 45° and flipped when open. Icons are a single 20×20 stroke set (arrow, external, menu, close) at stroke width 1.9 with round caps, sized 1.05em.

The 3D scene has its own geometry: low-poly faceted peaks with flat shading, a softly bevelled four-point star, and a tube for the arc that is thick in the middle and fine at both ends.

## Components

### Buttons
Solid, quiet and tactile.
- **Shape:** gently rounded (10px), minimum height 3rem (2.5rem for small).
- **Primary:** ARC Teal fill, white text weight 600, padding 0.7rem 1.25rem, teal-tinted glow. Hover turns it Deep Teal and nudges a trailing arrow icon 3px right. Pressing it scales it to 0.98.
- **Quiet:** white fill with a hairline outline and ink text. Hover darkens the outline, adds a small lift and turns the text Deep Teal. Use it for second actions and social links.
- **Small:** 2.5rem tall, small text. Used in the header and for in-problem actions such as "Check" and "Try another rhythm".
- **Focus:** a 2px ARC Teal outline offset 3px (Logo Teal on the night footer).

### Arrow links
A text link in ARC Teal, weight 600, with a trailing arrow icon and a 2.75rem tap height. The underline fades in on hover and the arrow slides 4px. Use them for "more" links under sections.

### Navigation
A frosted white bar that floats 0.75rem below the top of the window. On the left, the on-light logo (4.75rem) with the full name in ink, weight 620. On the right, nav links in small text (Slate Ink, weight 520, 10px radius) followed by a small primary button: "Register" when registration is open, "Get updates" otherwise. Hover gives links a 5% ink fill. The current page gets an 8% teal fill. At 64rem and below, a "Menu" button opens a stacked list of links ruled by soft hairlines, with the current page in teal. Without JavaScript the links wrap in a row instead.

### White panels
The next-event panel, the sample problem and the closing sign-up. 22px corners, white, padded with clamp(1.25rem, 3.5vw, 2.75rem) or more, using the panel haze. The next-event panel shows the date figure in a column ruled off by a soft hairline, the event name as an ink link whose underline turns teal on hover, label/value facts, and one action. Keep the number of panels on a page small. They mark the single things a visitor came for.

### Ruled rows
A top hairline, then one row per item with a bottom hairline. Program rows are a three-column grid (11rem date, text, a circular arrow). On hover with a fine pointer the row becomes a white rounded fill with `--shadow-1`, the arrow fills teal and moves 4px. Question rows are `<details>` with an ink summary (lede size, weight 560) and a chevron, and the summary turns teal on hover.

### Inputs / Fields
- **Style:** Faint Frost fill, 10px corners, 2.5rem tall, ink text with tabular numbers, an inset outline.
- **Focus:** the outline becomes a 2px ARC Teal inset.
- **Correct:** Teal Wash fill, 2px teal inset, "Correct." in Deep Teal.
- **Wrong:** a 280ms shake and a short red message.

### Footer
The night band. On-dark logo (9.5rem) and a one-sentence description in Dim Frost. Three link columns, each headed by a small label in Logo Teal. Links are Moonlit Frost, turn Logo Teal on hover, and have 0.625rem vertical padding for tap size. A bottom line with the copyright sits above a faint hairline.

### The 3D Scene (signature)
One scene for the whole site, in `src/scene/arc-scene.js`, drawn on one fixed `.scene-canvas` from the base layout. It uses an orthographic camera and a transparent background so the frost ground shows through. Objects: seven faceted peaks (five form the range in the hero; all seven can become rhythm notes), the star with its radial halo, the arc, five sparkles and a thin teal baseline. Materials: snow #f7fbfb with shade #e4eeee, left-facing faces teal #33a994 (deepest #268a79), so that lit they read as the logo's #52d5bf. The star and arc are #45c6af with a slight Logo Teal glow, the sparkles #7fe3d1. The light comes from the upper left, with a cool rim light behind on the right. Soft real shadows and a faint shade pool sit under the range.

The hero opening runs over about 3 seconds: peaks rise one at a time from the middle, then the star appears, then the arc draws itself outward from the star, then the sparkles. At rest the star bobs gently, the sparkles twinkle, and the whole rig sways slightly and tilts toward the pointer.

**Adding a stage to a page.**
1. Mark the section that holds the stage with `data-stage-section`. Its box decides when the scene arrives and leaves.
2. Inside it, put an `aria-hidden="true"` element with `data-stage="<id>"` and an explicit height. The scene centres on that element and scales the arrangement to fit its box.
3. `<id>` must match a layout function in the `layouts` map of `arc-scene.js`. Today only `hero` and `rhythm` exist, and unknown ids are silently ignored. A new arrangement needs a new layout function that places the same objects (peaks, star, arc, sparkles, baseline), so moving between stages stays a rearrangement of one logo.
4. Choose the kind. The default (`flow`) holds the arrangement until the page has scrolled 5% of a viewport past the section's top, then flies to the next stage. `data-stage-kind="pinned"` holds it while the section scrolls by (section height minus one viewport). A pinned stage element must be `position: sticky` in a side column (the rhythm stage uses `top: 18vh; height: 52vh`).
5. Stages are visited in document order. Between two stages the objects fly in a straight line from one stage's centre to the next, leaving a beat apart like a flock and lifting gently mid-flight. The flight is kept below the header and above 72% of the viewport height. Follow the Clear Lane Rule so that line never crosses text.
6. Gate the layout. The head script adds `.scene-capable` to `<html>` only when the screen is wider than 64rem (min-width 64.0625rem), WebGL2 is available and Save-Data is off. Style `html:not(.scene-capable)` so a stage column collapses and the text takes the full width (as the problem section does). Below 64rem the canvas is hidden anyway.
7. Give a hero stage a still. The hero stage holds `<img class="stage-still" src="/scene-hero.png" width="1200" height="900" alt="">` with `object-fit: contain`. It shows on phones, without WebGL and while the scene loads. When the first frame is drawn, `html` gets `.scene-on`, the canvas fades in over 600ms and the still fades out. Re-render `public/scene-hero.png` from the scene whenever the scene's look changes. Pinned side stages need no still because their column collapses.

The scene loads after the page's `load` event, so it never delays content. With reduced motion on, it shows the arrangements still, with no opening, bobbing or pointer tilt, and flights snap at the halfway point.

### Motion
Motion only adds a starting state, so every element's resting style is fully visible. A page with no JavaScript, an old browser or reduced motion is complete and still.
- **Signature:** the 3D scene, as above.
- **Headline blur-in:** each word of the h1 rises 0.32em out of an 8px blur over 900ms on the no-bounce settle curve `cubic-bezier(0.3, 0.55, 0.05, 1)`, with words 42ms apart. The rest of the first screen (lede, actions, next-event panel) then rises 18px (10px below 52rem) with set delays (300ms to 520ms).
- **One heading reveal:** a single `data-reveal` heading per page rises in once as it reaches the screen. On the home page it is "Try a real contest problem", the heading next to the scene's second stage.
- **Feedback:** small responses to what the visitor does are allowed. Button press and arrow nudge, the program row lift, the header shadow after scrolling, details opening (480ms rise), the mobile menu dropping in, the wrong-answer shake, the rhythm beats swapping and lighting as the 3D notes play, and a 150/220ms crossfade between pages using view transitions.
- **Smooth scrolling:** Lenis on the mouse wheel (lerp 0.13), with in-page links gliding over 1.1s. Touch scrolling stays native, the skip link is left alone, and Lenis is off with reduced motion.
- **Timing:** state changes use `--dur-fast` (160ms) or `--dur` (300ms) on `cubic-bezier(0.25, 1, 0.5, 1)`. Entrances use 900ms on the settle curve.

**The One Signature Rule.** A page gets one signature motion (the 3D scene), the headline blur-in and at most one heading reveal. Paragraphs, photos, rows, panels and section after section never fade or rise in on scroll.

## Do's and Don'ts

### Do:
- **Do** let `--ground` (#eef3f3) show behind every section. Separate sections with `--section` spacing or a `--line` hairline.
- **Do** use `--teal` (#0b7566) for every action and link on light surfaces, with `--teal-deep` (#085a4f) on hover.
- **Do** set every heading in Mona Sans, wider and tighter as it grows: 640/108% for h1, 620/106% for h2, 600/104% for h3.
- **Do** present collections as hairline-ruled rows, and save white 22px panels with the panel haze for single objects such as the next event.
- **Do** put any 3D stage in the right-hand lane, keep text out of that lane between stages, and collapse the stage column under `html:not(.scene-capable)`.
- **Do** check every page with JavaScript off, with reduced motion on, and below 64rem, where it must be complete without the scene.
- **Do** re-render `public/scene-hero.png` whenever the scene's look changes.
- **Do** keep tap targets at least 2.5rem (buttons 3rem, arrow links 2.75rem).

### Don't:
- **Don't** give a section its own background colour, gradient or full-bleed band. The only dark band is the night footer.
- **Don't** add a second accent colour (no amber, no saturated colour), and don't put text on `--teal-logo` (#52d5bf) on a light surface.
- **Don't** build themed concepts (trail guides, maps, mascots) or decoration that needs explaining.
- **Don't** use card grids, badge rows or stat tiles.
- **Don't** add per-section scroll reveals or animate every section. One signature, one headline blur-in, one heading reveal.
- **Don't** let a 3D object cross text, and don't start a second canvas or a second 3D scene. Add a stage to the one scene instead.
- **Don't** use grey or hard offset shadows. Shadows are soft and tinted toward the ink.
- **Don't** add a second typeface.
