# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro 7 (static output), plain CSS with design tokens, content in typed data files. Hosted on Cloudflare Workers static assets in the account that already serves archallenge.org. The owner asked for a good stack to be chosen and reviewed this choice in the plan.

## Users

- Calgary youth who might take part: mostly junior high and early high school today, widening to youth in general.
- Parents, many arriving on a phone from a WeChat post or a teacher's email, who want the date, place, cost, age range, who runs it and how to register.
- Teachers who want something short to forward to students.
- Sponsors and grant funders checking that ARC is real and how to support it.
- High school students who might join the organizing team.

## Product Purpose

The public website for Alpine Reasoning Challenge (ARC), replacing a Wix site shown through an iframe. It must make ARC's programs findable by search, give every program a shareable page, show the next event with a way to register, and hold everything the old site had (home, competitions, classes, team, sponsors, donate, contact, newsletter). Success: a first-time visitor knows what ARC is, what is coming next and how to take part within seconds, and the site is easy for each year's student team to keep current.

## Positioning

ARC is a youth-led nonprofit in Calgary: high school students write the problems, run the events and teach the classes, and everything is free to take part in. It is not only a contest organizer. The owner's direction (2026-11-11): do not frame ARC only around STEM contests; this year it is expanding to general STEM, classes and more types of competitions, for youth in general (not only grades 7 to 10), across Calgary (not only the University of Calgary).

## Operating Context

- Events so far have been in-person Sundays at the University of Calgary, plus one online puzzle hunt and one online class series.
- Registration is by Google Form; announcements go out by Substack newsletter, Instagram, Discord and WeChat.
- The largest discovery channels in 2026 registration data were teachers/tutors and WeChat.
- ARCane, the 2025 puzzle hunt, is not shown on the site (owner's decision, 2026-11-11).

## Capabilities and Constraints

- Static pages only; no accounts or server features on the main site.
- Old URLs that must keep working: `/rmjsc`, `/sst`, `/sponsors`, `/newsletter`.
- The old Question of the Day app is dropped by the owner's decision.
- Programs that have run: Rocky Mountain Junior Science Contest (RMJSC, annual since 2020, run by ARC since 2024; next edition Sunday, January 24, 2027), Summit STEM Triathlon (January 2025 and 2026), ARCane puzzle hunt (November 2025), Junior Olympiad Math classes (summer 2023).
- Undecided or unconfirmed: RMJSC 2027 venue, grade range and registration link; the next triathlon date; whether ARCane returns; the 2026-27 team roster; which sponsors may be shown; participant numbers; which new programs launch this year.
- ARC is an incorporated Alberta nonprofit, not a registered charity: no tax-receipt language.

## Brand Commitments

- Name: Alpine Reasoning Challenge, short form ARC.
- Logo: the existing hand-drawn mark (shooting-star arc over "ARC" and three peaks), redrawn faithfully as a vector with on-light and on-dark versions. Brand teal #52D5BF on dark; a darker teal for text on light.
- Owner's taste, in their words: "shouldn't be insanely fancy but look aesthetically pleasing, should be easy to navigate and find information". Three versions were rejected on 2026-11-11: a themed "trail guide" concept ("super gimmicky"); a plain white-and-teal page with no motion ("5.5/10 ... a bit bland", with a request to "add some effects or transitions sort of like how math attack has"); and a dark teal and amber rebuild with card grids, badges and stat tiles ("looks like ai slop"; "the new green design is worse" than "the original more white one").
- 2026-11-12, after the white layout was called "fine": "ours looks visibly vibecoded ... don't make it this toyish site. choose good colour palette one that fit's arcs logo designs", with Math Attack's smooth scrolling and 3D side animation as the reference ("dont clutter animations/apply to everything").
- So: one frost-white ground, ink from the logo's night sky, the logo's teal as the only accent, Mona Sans, ruled rows instead of cards, few badges, and one signature motion: ARC's logo built in 3D (faceted peaks, star, arc) that flies down a side lane and becomes the sample problem's rhythm. Smooth wheel scrolling. No dark or saturated colour bands, no themed concepts, no animation on every section.

## Evidence on Hand

- Event photos (owner states consent exists for all events): `src/assets/photos/`; more in the organization's Google Drive.
- Released contest papers, including the sample problem on the home page ("Cabinet", Summit STEM Triathlon 2026).
- Brand illustration of a night sky, star arc and teal peaks (ARC_card.png in Drive).
- No testimonials, press quotes, verified statistics or sponsor logo files are on hand: do not fabricate any.

## Product Principles

1. The next event and how to take part are never more than a glance away.
2. Say plainly what is true today; describe plans as plans.
3. Free and student-run are the two facts every page should make obvious.
4. Liveliness comes from real photos, colour, type and motion, never from a concept that needs explaining.
5. Next year's students must be able to update it without help.

## Accessibility & Inclusion

Phone-first, works inside in-app browsers (WeChat), readable without JavaScript, WCAG AA contrast, respects reduced-motion settings. Many parents read Chinese; keep sentences short and plain so they translate well.
