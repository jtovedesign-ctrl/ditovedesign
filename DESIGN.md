---
version: alpha
name: ditove-design-system
description: DITOVE DESIGN presents itself as a confident, editorial design partner — anchored by a near-black canvas ({colors.primary-dark}), a single vivid mint accent ({colors.primary-accent}) reserved for CTAs and highlights, and generous whitespace that lets portfolio photography carry the page. The wordmark ("ditove") uses a geometric sans with a distinctive circular counter in the "o", signaling precision and craft. The system favors dark-first hero/nav surfaces with lighter content sections for long-form reading (reviews, process), avoiding any AI-default purple/blue gradient language.
---

## 1. Visual Theme & Atmosphere

DITOVE is a solo design-partner brand for online sellers — not a generic "cheap designer," but a strategist who understands what makes a product page sell. The visual language should read as **premium, editorial, and quietly confident**, closer to a design studio portfolio than a marketplace listing.

- Mood: sleek, minimal, high-contrast, unhurried
- Density: airy — let portfolio images breathe (VISUAL_DENSITY: 3/10)
- Motion: restrained — subtle fades/reveals on scroll, no bouncy or cinematic effects (MOTION_INTENSITY: 3/10)
- Layout variance: mostly grid-disciplined with one confident asymmetric moment per page (DESIGN_VARIANCE: 6/10)
- The mint accent (`{colors.primary-accent}`) is a **signal color** — used sparingly (CTA buttons, active states, one accent line/shape) so it stays high-impact. Never used as a background wash or gradient.
- Explicitly avoid: AI-purple/blue gradients, glassmorphism, centered-hero-over-mesh-background, generic three-equal-card sections with no hierarchy.

## 2. Color Palette & Roles

```yaml
colors:
  primary-dark: "#0D0D0D"      # near-black — nav, footer, hero background, primary buttons on light surfaces
  primary-accent: "#00D4AA"    # mint teal — CTA, links, active states, section accent, highlighted text
  primary-accent-pressed: "#00B491"
  on-dark: "#FFFFFF"           # text/icons on primary-dark
  on-accent: "#0D0D0D"         # text on mint accent surfaces (dark text reads better on mint than white)
  canvas: "#FFFFFF"            # default page background for content sections (portfolio, reviews, service)
  surface: "#F7F7F6"           # soft off-white for cards, alternating sections
  hairline: "#E7E6E4"          # dividers, card borders
  ink: "#0D0D0D"               # primary body text on light surfaces
  ink-muted: "#6B6B68"         # secondary text, captions
  ink-faint: "#A6A5A2"         # placeholder / disabled text
  success: "#00D4AA"           # reuse accent for positive states (no separate green needed)
  error: "#E03131"
```

Usage rule: **one page = one dominant surface.** Hero and nav default to `primary-dark`; body/content sections default to `canvas` or `surface`. Do not mix dark and light unpredictably within the same scroll section — alternate in full-width bands.

## 3. Typography Rules

The wordmark is a geometric sans (distinctive circular "o"). Pair it with a clean geometric/humanist sans for UI — do not introduce a second display face.

```yaml
typography:
  font-primary: "Pretendard"   # Korean-first geometric sans, closest open substitute to the logo's geometry; falls back to system-ui
  font-fallback: "Inter"

  hero-display:
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h1:
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.3
  h3:
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.02em"
    textTransform: uppercase   # for eyebrow labels like "PORTFOLIO", "SERVICE"
```

Do not use serif anywhere — the brand identity is entirely sans-based. Do not use Inter as the primary display face (it's the default LLM pick); prefer Pretendard for Korean copy, with Inter only as a silent fallback for Latin characters/numerals.

## 4. Component Stylings

**Buttons**
- Primary (on light bg): `primary-dark` background, white text, 8px radius, no gradient, no shadow at rest
- Primary (on dark bg): `primary-accent` background, `on-accent` (#0D0D0D) text
- Hover: darken background 8%, no scale/bounce
- Secondary/outline: 1px `hairline` border, `ink` text, fills `surface` on hover

**Cards** (portfolio items, package tiers, review cards)
- `surface` background, 12px radius, 1px `hairline` border, no drop shadow by default
- On hover (portfolio cards only): subtle lift — 2–4px translateY + soft shadow, 150ms ease
- Package tier cards: the recommended tier (DELUXE) gets a `primary-accent` 2px top border or corner tag — never a filled accent background (keeps mint high-impact)

**Navigation**
- Sticky, `primary-dark` background, white text, mint underline on active/hover link
- Mobile: full-height dark overlay menu, no hamburger animation flourish

**Inputs (Contact form)**
- 1px `hairline` border, 8px radius, focus state = 2px `primary-accent` outline (never a glow/shadow)

## 5. Layout Principles

- Max content width: 1200px, generous side padding (min 24px mobile, 80px+ desktop)
- Spacing scale: 8 / 16 / 24 / 40 / 64 / 96px — sections separated by 96px+ on desktop
- Grid: 12-column for content sections; portfolio grid uses 2–3 columns desktop, 1 column mobile
- Whitespace is a feature, not empty space — resist the urge to fill every section with content

## 6. Depth & Elevation

- Flat by default. Elevation only appears on hover/interaction (portfolio card lift, button hover).
- No glassmorphism, no blurred background panels, no neumorphism.
- Shadows (when used) are soft and low-opacity: `0 4px 16px rgba(13,13,13,0.08)` — never a colored/mint-tinted shadow.

## 7. Do's and Don'ts

**Do**
- Let photography (portfolio work) be the largest visual element on any page
- Use the mint accent as a "you are here" signal — active nav, CTA, one highlighted stat
- Keep copy left-aligned and scannable; avoid centered walls of text

**Don't**
- Don't gradient the mint accent into anything (no mint-to-black gradients)
- Don't use the mint as a full-section background — it will fight with portfolio image colors
- Don't default to a centered hero over a dark mesh/gradient — use the dark hero as a flat, confident band instead
- Don't invent pricing, process steps, or guarantees not defined in CLAUDE.md — this file governs *look*, not *content*

## 8. Responsive Behavior

- Breakpoints: 480px (mobile) / 768px (tablet) / 1024px (desktop) / 1440px (wide)
- Touch targets: minimum 44px height on mobile nav/buttons
- Portfolio grid collapses 3→2→1 columns; package comparison table collapses to stacked cards below 768px
- Sticky nav shrinks in height (72px → 56px) on scroll, no color change

## 9. Agent Prompt Guide

Quick reference:
- Background: `#0D0D0D` (dark sections) / `#FFFFFF` or `#F7F7F6` (light sections)
- Accent: `#00D4AA` — CTAs, active states, highlights only
- Font: Pretendard (Korean), fallback Inter
- Radius: 8px buttons/inputs, 12px cards
- No gradients, no glassmorphism, no purple/blue AI-default palette

Example prompts to reuse:
- *"Build the homepage hero. Dark background (#0D0D0D), white headline, one mint (#00D4AA) CTA button. No gradient, no mesh background."*
- *"Build the Service page package comparison. Three cards on `surface` background, DELUXE card gets a mint top border to mark it as recommended — not a filled mint background."*
- *"Build the portfolio grid. White canvas, 2–3 column grid, cards lift slightly on hover, no borders around the images themselves."*
