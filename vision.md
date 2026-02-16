Clearway — Product Vision
Overview
Clearway is a crowdfunding landing page for a fictional ethical banking startup in the universe of HBO's Industry (Season 4, post-Episode 6). It is a direct competitor and moral foil to Tender, the corrupt payment-processing startup at the center of Season 4.
The landing page crowdsources a £4.2M community seed round, positioning Clearway as the transparent alternative to Tender's fraud-riddled "bank killer." Founded by Lou Kromah and backed by Stern (Harper Stern's fund, formerly SternTao before Eric Tao's exit).
Tagline: "Your money. No mysteries."
Counter-tagline: "THE NUMBERS ARE REAL" (response to Tender's neon "THE STARS ARE REAL")
Target audience: Industry fans, fintech-design enthusiasts, and creative portfolio viewers who appreciate detailed fictional worldbuilding with sharp satirical copy.
What this actually is: A single-page React artifact / deployable landing page demonstrating brand design, satirical copywriting, and frontend craft — built as a creative exercise rooted in the Industry universe.

Goals

Build a production-quality crowdfunding landing page as a single React component (.jsx)
Satirize Tender and Season 4's plot points through sharp, deadpan copy referencing specific show details
Demonstrate a complete brand system: color palette, typography, component design, tone of voice
Create something that feels like it could actually exist in the Industry universe — never break the fourth wall except in the footer disclaimer
Showcase the Clearway "Glass Ledger" product concept through a mock app UI
Include all crowdfunding mechanics: funding progress, investment tiers, backer counts, FAQ

Non-Goals (Out of Scope)

NOT a functional banking app — no backend, no payment processing, no auth
No actual crowdfunding integration (Stripe, etc.) — buttons are decorative
No multi-page routing — single scrollable landing page
No server-side rendering or SSR
No mobile-first responsive overhaul — desktop-first with reasonable flex/grid breakpoints
Do NOT build Tender's app or any other character's product — Clearway only

Key Constraints
Technical

Single .jsx file — React component with inline styles, default export
No external CSS — all styles inline via JavaScript objects
No Tailwind — inline styles only
No Google Fonts — system font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
React hooks only — useState, useEffect, useRef
No external dependencies beyond React
No localStorage or sessionStorage — all state in React hooks
Animations via CSS transitions and requestAnimationFrame — no animation libraries

Design

Follow color palette, typography, and component patterns in the Design System section
Reference Dribbble shots: Paywave Mobile Apps (clean funding metrics), Zentra AI Finance (minimalist fintech), Finpay SaaS Landing Page (responsive tier cards)

Tone

Two registers: (1) Clearway's calm, grounded, jargon-free founder voice, (2) sharp anti-Tender satire with deadpan delivery
No corporate jargon, no em dashes in marketing copy, no "disruption" language
Never break the fourth wall — everything reads as real. Only the footer says "fictional"
Humor from specificity (three rounds of notes on the crypto component, the logo direction argument, hiring from escort agencies) not from being mean


Architectural Decisions
Single-File React Component
Decision: Everything in one .jsx file.
Rationale: Creative artifact / portfolio piece, not a production app. Single-file keeps it portable — drop into v0, Bolt, Claude artifacts, or any React sandbox and it renders immediately.
Inline Styles Over CSS
Decision: All styles as JavaScript objects or inline style props.
Rationale: Maximizes portability. No CSS modules, no Tailwind config, no build step. Self-contained.
Data as Top-Level Constants
Decision: All copy, funding data, tier info, FAQs, testimonials in constants at top of file.
Rationale: Easy to edit without hunting through JSX. An AIDD agent can update copy by modifying constants.
IntersectionObserver for Animations
Decision: Use IntersectionObserver to trigger count-up animations and progress bar fills.
Rationale: Lightweight native API. No animation library dependency.
No Router / Single Page
Decision: One scrollable page with anchor links.
Rationale: Crowdfunding pages are single-page by convention.

Design System
Color Palette
TokenHexUsageforest#1a3c34Primary brand, headings, CTAs, navsage#6b8f71Secondary, accents, progress bar endcream#faf8f2Page background, text on dark surfacesgold#c9a84cSection labels, featured badges, tickercharcoal#2b2b2bBody textsand#f4f1eaAlternating section backgroundsborder#e8e5ddCard borders, dividersdark#141414Dark interstitial sections, Tender comparisondeepdark#0a0a0aFooter background
Typography Scale
ElementSizeWeightTrackingColorHero headlineclamp(36px, 5.5vw, 64px)700-1.5pxforestHero subtitleclamp(24px, 3.5vw, 42px)500-0.5px#888Section titleclamp(28px, 4vw, 40px)700-0.8pxforestSection label10-11px7002.5px uppercasegoldBody14-15px400normal#444-#666Small / disclaimer12-13px400normal#888-#999
Component Patterns

Cards: white bg, 1px solid #e8e5dd, border-radius 14-16px, padding 24-28px
Elevated cards: box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)
Primary buttons: forest bg, cream text, border-radius 10px, padding 12-14px 28px, weight 600
Outlined buttons: white bg, forest border 1.5px, forest text
Pill badges: inline-flex, border-radius 20px, padding 6px 16px, small uppercase
Progress bar: 10px height, #f0ede6 track, gradient forest-to-sage fill, border-radius 5px
FAQ items: border-bottom dividers, gold "+" that rotates 45deg to "x"

Layout

Max-widths: 1120px (full), 1000px (content), 680px (funding card), 640px (FAQ), 700px (quote)
Section padding: 80px vertical, 24px horizontal
Grid: repeat(auto-fit, minmax(240-280px, 1fr))
Two-column splits: 1fr 1fr with 60px gap


Universe Context (for AI agents)
Agents working on this project must understand the fictional universe to maintain consistency.
Tender (the antagonist)

Fintech "bank killer" — payment processor trying to become a bank
Co-founded by Whitney Halberstram (CFO, the real power) and Jay Jonah Atterbury (CEO, immature figurehead)
Henry Muck (Kit Harington) installed as CEO — baronet's son, depressed, needed three rounds of notes to remove crypto from the app
Backed by £1 billion CoCo bond from Al-Mi'raj Pierpoint (merged investment bank, CEO Wilhelmina Fassbinder)
Running a round-tripping scheme — falsifying profits through fake acquisitions in Ghana, bribing officials to stage press
Whitney hired assistants from escort agencies to create kompromat — including planting underage girl (Dolly) to entrap Eric Tao
Ties to Russian intelligence (SVR/Cozy Bear) through IBN Bauer bank
HQ neon sign: "THE STARS ARE REAL"
Whitney on Pierpoint: "sun-bleached font on signage. Gym bags on eBay. Ironic fincore. Tombstones for a once great thing now dead."
App branding argument: "Pierpoint, powered by Tender" vs reverse — couldn't agree
Go-to-market: launch party with nervous CEO speech
Marketed as "a private banker in your pocket" and "a democratic financial institution"
Yasmin Kara-Hanani (Marisa Abela) — Henry's wife, promoted to head of comms, fired comms guy Robin
Hayley Clay (Kiernan Shipka) — Whitney's planted operative from escort agency

SternTao to Stern (the backer)

SternTao was the hedge fund by Harper Stern (Myha'la) and Eric Tao (Ken Leung) to short corrupt companies
Investigated and shorted Tender after journalist Jim Dycker (Charlie Heaton) tipped Harper off
Sweetpea and Kwabena uncovered Tender's round-tripping fraud in Ghana
Harper delivered a devastating conference presentation exposing Tender, crashing the stock
Eric went on CNN quoting The Art of War to dismantle Whitney's defenses
Whitney retaliated with kompromat — Eric discovered Dolly was 14, planted by Whitney
Eric transferred full ownership to Harper, placed $10M in trust for daughters, walked away permanently (final shot: walking to Joni Mitchell's "Both Sides Now")
SternTao is now just "Stern" — Harper's fund, solo
The name works because Harper gets top billing. Eric said it himself: "It's not called TaoStern."

Clearway (our company)

Founded by Lou Kromah — former compliance-adjacent technologist
Backed by Stern — Harper's fund doesn't just short fraud, she backs the alternative
Community-crowdfunded £4.2M from 8,412 individual backers
Glass Ledger — signature feature: real-time dashboard showing deposits, fees, earnings
Open-source risk models on GitHub
Customer-elected advisory board
FCA Enhanced Transparency certification from day one
Core argument: "If you can't explain where the money goes, you shouldn't be holding it."

Other entities referenced

Otto Mostyn — Henry's godfather, powerful asset manager, Harper's former boss ("Not backed by anyone's godfather")
Pierpoint & Co. — once-prestigious investment bank, now merged with Al-Mi'raj Holdings
Jim Dycker — journalist investigating Tender on an air-gapped computer


Page Sections (Build Order)

Anti-Tender Scrolling Ticker — horizontal marquee, forest bg, gold text, infinite CSS loop
Sticky Navigation — transparent to frosted glass on scroll, logo + links + CTA
Hero — badge, three-line headline, subhead, funding card with animated stats + progress bar
Founder Quote — dark forest section, Lou Kromah quote: THE STARS ARE REAL vs GitHub
Tender vs Clearway Comparison — two-column (dark Tender left, white Clearway right), 5 rows each
How It Works — 4-card grid: Glass Ledger, Open-Source Risk, Community Governed, Actually Regulated
Glass Ledger Preview — split layout: copy left, mock app UI right
Stern Banner — dark interstitial about Stern backing and SternTao-to-Stern narrative
Investment Tiers — 3-card grid: Seedling £50, Stakeholder £500 (featured), Architect £5,000
Testimonials — 3 fictional backer quotes referencing Tender scandal
FAQ Accordion — 6 questions including "Why is Stern backing you?"
Final CTA — forest green, "THE NUMBERS ARE REAL", Whitney's Pierpoint quote flipped
Footer — dark, logo + "No kompromat" + fictional disclaimer


Funding Data (Constants)
jsconst GOAL = 4200000;
const RAISED = 3156000;
const BACKERS = 8412;
const DAYS = 11;

Key Copy Lines (Preserve Exactly)

Hero: "They called it a 'bank killer.' We're building a bank you can actually trust."
Subhead: "No institutional puppeteers. No billion-dollar CoCo bonds. Backed by Stern and 8,412 people who think banking should be boring, transparent, and honest."
Founder quote: "They put 'THE STARS ARE REAL' in neon on the wall and called it a vision. We put our risk models on GitHub and called it accountability."
Comparison footer: "Endorsed by exactly zero baronets, ironic fincore enthusiasts, or CFOs with SVR connections."
Stern banner: "SternTao exposed Tender's fraud. Eric walked so Harper could run. Now Stern backs what Tender should have been. That's us."
Tier 2 perk: "Priority support from real humans, not Hayley from HR"
Tier 3 desc: "Founder access + equity consideration. SEIS eligible. No round-tripping required."
FAQ (Stern): "Harper Stern doesn't just short fraud — she backs the alternative. We're it."
FAQ (shorting): "Short us if you want — you'll get bored."
Final CTA: "A vote against sun-bleached font on signage and gym bags on eBay."
Disclaimer: "Unlike some companies, we will not bribe officials to stage press about this disclaimer."
Footer: "Your money. No mysteries. No kompromat."


User Experience Principles

Show, don't pitch. The Glass Ledger mock is the centerpiece. Should feel real and interactive, not a static screenshot.
Contrast is the argument. Tender vs Clearway section does heavy lifting. Dark vs light. Chaos vs order. The design is the argument.
Satire through specificity. "Three rounds of notes to remove the crypto component" is funny because it's specific. Every Tender jab references a real plot point.
Funding progress creates urgency. Animated count-up, progress bar, "11 days left" — standard crowdfunding conversion patterns.
Trust through typography. Calm, restrained design is itself a trust signal. Clean type, clear data, honest copy.


Success Criteria

Renders as single .jsx in Claude artifacts, v0, Bolt, or any React sandbox without errors
All 13 sections present in correct order with copy verbatim
Animations work: count-up numbers, progress bar, FAQ accordion, nav scroll, ticker
Design system consistent: colors, typography, spacing, card patterns
Anti-Tender copy references specific show plot points, not generic fintech criticism
Never breaks fourth wall except footer disclaimer
Glass Ledger mock feels like a real app UI
Responsive enough: doesn't break on tablet/mobile


Founder Bio
Lou Kromah — Founder & CEO, Clearway. Former compliance-adjacent technologist who watched fintech after fintech promise transparency and deliver opacity. After the Tender scandal — the round-tripping in Ghana, the staged press, the kompromat, the billion-dollar CoCo bond that funded a company built on fabricated numbers — Lou stopped waiting for someone else to build the honest version. Backed by Stern and 8,412 community investors, Clearway is the banking app that shows you everything because it has nothing to hide.