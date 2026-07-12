# GoatScale — "Obsidian Signal" Design System (July 2026 rebuild)

Full visual rebuild replacing the Ivory & Onyx light theme. Content architecture
(routes, services data, FAQ, forms/APIs) is retained; every visual surface is new.

## Direction

Premium, immersive, Apple-calibre restraint — but unmistakably a technology company.
Dark, deep, focused. Real product screenshots are the heroes; the chrome around them
stays quiet and lets the work glow.

## Color psychology

| Token | Value | Why |
|---|---|---|
| Obsidian base | `#060709` | Depth, authority, focus. Dark = immersive; makes product shots luminous. |
| Signal blue | `#5E7CFF` | Blue is the most-trusted hue in B2B tech — competence, intelligence, calm. Electrified toward periwinkle so it reads *innovative*, not corporate. |
| Violet edge | `#8B5CF6` (gradient partner) | Premium, creative intelligence — used only in gradients/glows, never flat. |
| White CTAs | `#F2F5FB` on dark | Highest possible contrast = highest conversion. Apple's own dark-page pattern. |
| Ink text scale | white @ 100/68/50% | Strict 3-step hierarchy; no decorative greys. |

Accent is *earned*: labels, metrics, glows, and key words only. Everything else is
monochrome — that restraint is what reads as premium.

## Type

- **Geist** (next/font) — the SF-Pro-adjacent neutral grotesk; tight tracking at display sizes.
- **Geist Mono** — eyebrows, metrics, stack tags: the technical voice.
- Display scale up to `clamp(48px→132px)`, line-height ~0.96, tracking −0.035em.

## Motion

Lenis smooth scroll + GSAP (GSAP-owns-visibility pattern) + Framer for transforms.
Entrances: masked line reveals, soft rise+fade. Scroll: parallax product shots,
pinned case-study stack, count-up metrics. Full `prefers-reduced-motion` support.

## Conversion spine

1. Hero: one-sentence value prop → dual CTA (white primary) → live metrics strip.
2. Real-client marquee immediately under hero (borrowed credibility).
3. Three pillars (Launch / Operate / Transform) with outcome language.
4. **Case studies = the proof engine**: 8 real projects, real screenshots, factual
   scope metrics (no invented percentages).
5. Manifesto + process (objection: "will they disappear after launch?").
6. Testimonials, FAQ (objection handling), fixed-price + code-ownership trust badges.
7. Every page ends in a CTA band; navbar carries a persistent "Start a project".

## Case studies (real projects)

goat-erp · alpio · akshara · evherfit · imobiles · soule-healers · goat-assets · 6f
Plus an "In the lab" strip: Oryn, Creovate, Aviate, Passly, ServerWhiz, Cashlio.
Screenshots live in `public/images/work/` (captured from live deployments and
project UI-audit archives).
