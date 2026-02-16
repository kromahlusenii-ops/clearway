# Clearway — OpenMemory Guide

## Overview
Clearway is a crowdfunding landing page for a fictional ethical banking startup from HBO's Industry (Season 4). It's a single-page React artifact built as a creative/portfolio exercise.

**Tagline:** "Your money. No mysteries."
**Counter-tagline:** "THE NUMBERS ARE REAL"

## Architecture
- **Single file**: `src/App.jsx` — complete React component with inline styles, default export
- **No dependencies**: React hooks only (useState, useEffect, useRef)
- **No CSS files**: All styles inline via JavaScript objects
- **No router**: Single scrollable page with anchor links
- **Font stack**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Animations**: CSS keyframes (ticker), IntersectionObserver (AnimNum), CSS transitions (FAQ, nav, progress bar)

## Design System
- **Color tokens**: forest (#1a3c34), sage (#6b8f71), cream (#faf8f2), gold (#c9a84c), char (#2b2b2b), sand (#f4f1ea)
- **Typography**: clamp() for responsive sizing, weight 700 for headings, 400-500 for body
- **Cards**: white bg, 1px border #e8e5dd, border-radius 14-16px
- **Buttons**: forest bg + cream text (primary), white bg + forest border (outlined)

## Components
- **AnimNum**: Animated number counter using IntersectionObserver + requestAnimationFrame with cubic-out easing
- **13 Page Sections**: Ticker → Nav → Hero → Founder Quote → Comparison → How It Works → Glass Ledger → Stern Banner → Tiers → Testimonials → FAQ → Final CTA → Footer

## Key Files
| File | Purpose |
|------|---------|
| `vision.md` | Brand context, universe lore, design system, goals/constraints |
| `product-spec.md` | AI-ready implementation spec with all data models and section specs |
| `src/App.jsx` | Complete single-file React landing page (1688 lines) |

## Infrastructure
- **Git**: GitHub at `kromahlusenii-ops/clearway` on `main` branch
- **Hosting**: Vercel at `clearway-tau.vercel.app`, auto-deploys from `main`

## User Defined Namespaces
- [Leave blank - user populates]
