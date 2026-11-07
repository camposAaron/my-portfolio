# Interface design system: Aaron Campos portfolio

Decisions already made for this site. Read before changing UI, and hold to these values.
Tokens live in `assets/css/tokens.css`; component styles in `assets/css/main.css`.

## Direction and feel

- **Carbon + coral, calm and precise.** A dark engineering console, not a neon "dev" theme.
  Carbon ground `#101416`, ivory ink `#F2EDE6`, one accent: coral `#FF7865`.
- **Who reads it:** recruiters and engineers scanning for a few minutes. They want to know
  what was built, see it running, and move on to the next thing without getting lost.
- **Coral is scarce.** It marks the name, primary actions, the current item (recording,
  project, nav link) and small details (kickers, list ticks, arrows). Never decoration.
- **No reading-progress bar in the header.** It was removed because it pulled attention
  from the content; the current section is shown by the nav underline only.
- **Mono as the signature voice.** Atkinson Hyperlegible Mono (`.mono`, `--font-outlier`)
  for numbers, counters, durations, kickers and stack tags, with tabular numerals.
  Display: Space Grotesk 600, tracking `-0.025em`. Body: Host Grotesk.

## Depth and spacing

- **Depth: borders + translucent surfaces.** 1px rules (`--color-rule`, `--color-rule-2`),
  panels on `--color-surface` / `--color-surface-hi`. Shadow only on the video player well
  (`0 40px 80px -48px rgb(0 0 0 / .9)`). Don't add other drop shadows.
- **Spacing scale (px):** 2 · 4 · 8 · 12 · 16 · 24 · 40 · 64 · 96 · 144 (`--space-3xs` … `--space-4xl`).
- **Radius:** cards `14px` (`--radius-card`), recording tiles `12px`, buttons/inputs `10px`,
  tags `6px`, thumbnails `6px`.
- **Layout:** 12-column grid, `--container: 1360px`, `--gutter` 64 → 24 (≤60rem) → 16 (≤40rem).
- **Sticky chrome:** site bar `--bar-h: 68px`; project index `--worknav-h: 56px` under it.
  Anything scrolled to inside Selected work uses
  `scroll-margin-top: calc(var(--bar-h) + var(--worknav-h) + var(--space-lg))`.

## Hierarchy

- **One focal element per block.** In a project: the project name (`--text-section`, h3)
  leads; the tagline (`--text-xl`, 500) supports; the summary (`--text-lg`, ink-2) explains.
- **Section headings inside Selected work are smaller than project names**
  (`clamp(1.75rem, 1.6vw + 1rem, 2.5rem)`), so the projects, not the section, lead.
- **Text levels:** ink (primary) · ink-2 (supporting) · muted (metadata) · accent (kicker / current).
- **Kicker pattern:** mono, `--text-sm`, coral, e.g. `Project 01 / 02` with the total in muted.

## Motion

- Ease-out `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`; durations `--dur-micro` 120ms,
  `--dur-short` 200ms; sliding indicators 300ms.
- Scroll reveal: `v-reveal`, 12px rise + fade, 70ms stagger.
- Press feedback: `translateY(1px)` on `:active`.
- Every transition and transform is switched off under `prefers-reduced-motion`
  (list new classes in the reduced-motion block at the end of `main.css`).

## Component patterns

- **Button** `.btn`: 48px min-height · 0 24px · radius 10 · 16px/500 · surface fill, rule-2
  border, coral line on hover. `.btn--primary` coral fill with carbon text. `.btn--quiet`
  40px · 0 12px · 14px · transparent.
- **Sliding coral indicator** (used twice, keep it consistent): an absolutely positioned
  coral bar that moves to the current item with `transform` over 300ms.
  - Recordings list (`.player__indicator`): 3px wide, vertical, left edge of the tile.
  - Project index (`.work-nav__indicator`): 2px tall, under the link, inside the `<ol>`
    as an `aria-hidden` `<li>` so it scrolls with the links.
- **Project index** `ProjectNav.vue` / `.work-nav`: an index row at rest (1px rules top
  and bottom). Once it sticks under the bar, `.is-stuck` gives it the bar's background
  `rgb(16 20 22 / .82)` + 12px blur, so it reads as the bar's second row. Each link:
  mono number (muted → coral when current) · name in Space Grotesk 600 16px · mono
  meta "N recordings" (hidden ≤40rem). Gap 40px (24px ≤40rem). `aria-current` on the
  current link. Scroll-spy band `rootMargin: -30% 0px -60% 0px`.
- **Next / previous project** `.case-step`: 1fr / 2fr grid under each project, 64px above.
  Next is the big one: surface fill, coral mono label "Next project · 02", name at
  `--text-2xl`, tagline in ink-2, coral arrow that nudges 4px on hover. Previous is quiet:
  no fill, name at `--text-lg`. On narrow screens a single column, Next first.
- **Navigating to a section or project:** `scrollIntoView` (smooth unless reduced motion),
  then `tabindex="-1"` + `focus({ preventScroll: true })` on the target. Same in
  `Header.vue` and `Projects.vue`.
- **Recordings** (`ProjectShowcase.vue`): videos 1280×630 VP9 `.webm` with a poster,
  autoplay muted only while in view, pause/expand controls in the bar under the video.
  Produce them with the recorder in `recorder/` (see its README).
- **Tags** `.tags li`: mono 14px, 4px 12px padding, radius 6, rule-2 border.

## Content

- **Positioning: a services offer, not a job search.** The hero status reads "Taking on new
  projects", the primary action is "Start a project" (to contact), and copy speaks to a
  client ("what I can build for you"), never to a recruiter ("looking for a role").
  The résumé download stays, as a secondary action in the hero and the contact section.
- **Section order:** hero → services → work → about → skills → contact (offer, proof, who).
- Copy lives in `i18n/locales/en.json` and `es.json`; change both. Projects are presented
  as finished, shipped products.
- Project data lives in `data/projects.ts`; only `public: true` entries render, and the
  index, numbering and next/previous links are derived from that list.
