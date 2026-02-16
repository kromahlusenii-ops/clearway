# Clearway — Product Specification

> **Document type**: AI-ready product spec for implementation by Claude Code or equivalent AI coding agent
> **Reads after**: `vision.md` (brand context, universe lore, design system, goals/constraints)
> **Produces**: A single `App.jsx` file — a complete, scrollable React landing page

---

## 1. APPLICATION ARCHITECTURE

### File Structure
```
clearway/
├── vision.md
├── product-spec.md
└── src/
    └── App.jsx
```

### State Management
```js
const [faq, setFaq] = useState(null);           // Active FAQ index
const [scrolled, setScrolled] = useState(false); // Nav scroll state
```

---

## 2. DATA MODELS

### Funding Constants
```js
const GOAL = 4200000;
const RAISED = 3156000;
const BACKERS = 8412;
const DAYS = 11;
```

### Color Tokens
```js
const c = {
  forest: "#1a3c34", sage: "#6b8f71", cream: "#faf8f2",
  gold: "#c9a84c", char: "#2b2b2b", sand: "#f4f1ea",
  bdr: "#e8e5dd", dark: "#141414", deepdark: "#0a0a0a",
};
```

### Ticker Items
```js
const TICKER_ITEMS = [
  "Not backed by Pierpoint", "Not backed by Al-Mi\u2019raj",
  "No CoCo bonds", "No round-tripping", "No kompromat",
  "No crypto component", "No gym bags on eBay", "Actually regulated",
  "Open-source risk models", "Community governed",
  "Glass Ledger auditable", "THE NUMBERS ARE REAL", "Backed by Stern",
];
```

### Principles
```js
const PRINCIPLES = [
  { icon: "\u25ce", title: "Glass Ledger", desc: "Every fee, every investment, every decision \u2014 auditable by you in real time. No air-gapped computers needed to find out where your money went." },
  { icon: "\u25c7", title: "Open-Source Risk", desc: "Our risk models live on GitHub. Peer-reviewed by the community, not buried in third-party processor acquisitions across West Africa." },
  { icon: "\u25b3", title: "Community Governed", desc: "Stakeholder backers vote on product roadmap. Your money, your voice. No billionaire\u2019s godfather pulling the strings from a Mayfair office." },
  { icon: "\u25a1", title: "Actually Regulated", desc: "FCA Enhanced Transparency certification. Not \u201cpursuing\u201d it. Not \u201cin conversation\u201d about it. Actually doing it. From day one." },
];
```

### Investment Tiers
```js
const TIERS = [
  {
    name: "Seedling", amount: "\u00a350",
    desc: "Early access + community badge. No CoCo bonds. No contingencies. Just you and us.",
    perks: ["Beta access before public launch", "Clearway Community badge", "Quarterly transparency report", "A banking app that actually works on launch day"],
    backers: 4218, color: "#6b8f71", pop: false,
  },
  {
    name: "Stakeholder", amount: "\u00a3500",
    desc: "Advisory board voting rights. Unlike Tender, we actually let the community steer.",
    perks: ["Everything in Seedling", "Vote on product roadmap quarterly", "Name on the Glass Ledger founders wall", "Priority support from real humans, not Hayley from HR"],
    backers: 3106, color: "#c9a84c", pop: true,
  },
  {
    name: "Architect", amount: "\u00a35,000",
    desc: "Founder access + equity consideration. SEIS eligible. No round-tripping required.",
    perks: ["Everything in Stakeholder", "Monthly call with Lou and the founding team", "Early equity consideration (SEIS eligible)", "Co-design a feature with our team", "Due diligence you can actually verify"],
    backers: 1088, color: "#1a3c34", pop: false,
  },
];
```

### FAQs
```js
const FAQS = [
  { q: "Is this equity crowdfunding?", a: "The Seedling and Stakeholder tiers are reward-based (perks, not equity). The Architect tier includes early equity consideration under the UK\u2019s SEIS scheme with tax relief. Full terms provided before commitment. We don\u2019t need a billion-dollar CoCo bond from a bank we\u2019re secretly trying to acquire." },
  { q: "How is Clearway different from Tender?", a: "Where do we start? Tender calls itself a \u201cbank killer\u201d backed by institutional money from Al-Mi\u2019raj Pierpoint and run by a CEO who needed three notes to remove a crypto component from his own app. Clearway is community-funded, community-governed, and community-auditable. We publish our numbers because they\u2019re real." },
  { q: "Why is Stern backing you?", a: "Stern exposed Tender\u2019s round-tripping fraud in Ghana, crashed their stock, and proved the \u201cbank killer\u201d was built on fabricated numbers. Harper Stern doesn\u2019t just short fraud \u2014 she backs the alternative. We\u2019re it." },
  { q: "When does the app launch?", a: "Beta for backers begins Q3 2025. Public launch targeted Q1 2026, pending FCA approval. We won\u2019t be hiring a baronet\u2019s son to give a nervous speech at a launch party and calling it a go-to-market strategy." },
  { q: "What if you don\u2019t hit the goal?", a: "All-or-nothing. If we don\u2019t reach \u00a34.2M, every backer gets a full refund. No creative accounting. No overstating acquisition costs. Just your money back." },
  { q: "Should I be worried about being shorted?", a: "We welcome scrutiny. Unlike some companies, we don\u2019t need to worry about hedge funds uncovering round-tripping schemes or staged press in our books. Our ledger is literally open. Short us if you want \u2014 you\u2019ll get bored." },
];
```

### Testimonials
```js
const QUOTES = [
  { quote: "Tender said they were building a \u2018democratic financial institution.\u2019 Then they took a billion from Pierpoint and let Whitney run the comms. Clearway is what democratic actually looks like.", name: "James R.", role: "Early backer \u00b7 Stakeholder tier" },
  { quote: "I\u2019ve never seen a fintech publish their risk models. Tender\u2019s idea of transparency was neon lettering that said \u2018THE STARS ARE REAL.\u2019 Clearway shows you where the money is.", name: "Dr. Amara K.", role: "Fintech researcher, UCL" },
  { quote: "My parents asked me what a \u2018private banker in your pocket\u2019 actually means. I couldn\u2019t explain it. With Clearway, I can show them exactly what their deposits are doing. That\u2019s the difference.", name: "Priya S.", role: "Software engineer \u00b7 Architect tier" },
];
```

### Tender Comparison Data
```js
const TENDER_ROWS = [
  { tender_label: "\u201cBank killer\u201d", tender_copy: "Backed by a \u00a31B CoCo bond from Al-Mi\u2019raj Pierpoint. A dinosaur funding a disruption. Make it make sense.", clearway_label: "Community-funded + Stern-backed", clearway_copy: "Crowdfunded \u00a34.2M from 8,412 individuals. Institutional backing from Stern \u2014 the fund that exposed Tender\u2019s fraud in the first place." },
  { tender_label: "\u201cPrivate banker in your pocket\u201d", tender_copy: "Three rounds of notes to remove the crypto component. Launch party headlined by the CEO\u2019s nervous breakdown.", clearway_label: "Glass Ledger dashboard", clearway_copy: "Real-time deposit tracking. Fee breakdowns. Investment allocation. Exportable audit logs. Ships on time." },
  { tender_label: "\u201cDemocratic financial institution\u201d", tender_copy: "Run by a CFO who hired staff from escort agencies, staged press in Accra, and planted operatives to blackmail his own partners.", clearway_label: "Open governance, open books", clearway_copy: "Customer-elected advisory board. Risk models on GitHub. Quarterly transparency reports to every backer." },
  { tender_label: "\u201cTHE STARS ARE REAL\u201d", tender_copy: "Neon sign. Canary Wharf HQ. Zero published financials. Stars might be real. Numbers weren\u2019t.", clearway_label: "THE NUMBERS ARE REAL", clearway_copy: "Published financials. FCA Enhanced Transparency certification. Audited by humans, not neon." },
  { tender_label: "Powered by Pierpoint", tender_copy: "Or is it Pierpoint powered by Tender? Even they couldn\u2019t agree which way the logo faced.", clearway_label: "Powered by the community", clearway_copy: "No branding arguments. No logo disputes. You funded it, you govern it, your name is on the wall." },
];
```

### Glass Ledger Mock Data
```js
const LEDGER_ALLOCATIONS = [
  { name: "UK Gov Bonds", pct: 62, amount: "\u00a37,719", color: "#1a3c34" },
  { name: "Green Infrastructure", pct: 25, amount: "\u00a33,112", color: "#6b8f71" },
  { name: "Cash Reserve", pct: 13, amount: "\u00a31,619", color: "#c9a84c" },
];
```

---

## 3. SECTION SPECIFICATIONS

### 3.1 — Anti-Tender Scrolling Ticker
- Full-width, forest bg, 8px vertical padding
- Render TICKER_ITEMS 3x concatenated in flex row
- Each: 11px, weight 600, uppercase, tracking 2px, gold, separated by sage ◎ at 0.4 opacity
- CSS keyframe: `translateX(0)` to `translateX(-33.33%)`, 30s, linear, infinite
- `overflow: hidden`, `white-space: nowrap`

### 3.2 — Sticky Navigation
- Fixed, z-index 100, height 64px
- Left: ◎ + "Clearway" (forest)
- Right: 4 links + "Invest Now" CTA (forest bg, cream text)
- Scroll behavior at 40px: transparent → `rgba(250,248,242,0.95)` + `backdrop-filter: blur(12px)`
- `transition: all 0.3s`

### 3.3 — Hero Section
- Centered, max-width 800px, padding-top 140px
- **Badge**: green dot + "Community Seed Round — 11 days left" (pill)
- **Headline**: "They called it a / 'bank killer.' / We're building a bank you can actually trust."
  - Line 2: gradient text sage→gold
  - Line 3: smaller, gray, weight 500
- **Subhead**: Full paragraph about Tender vs Clearway positioning
- **Funding Card**: white, max-width 680px, shadow
  - Stats: £3,156,000 (AnimNum) | 8,412 (AnimNum) | 11 days
  - Progress bar: 75%, gradient forest→sage, cubic-bezier transition
  - "Back This Project →" button

### 3.4 — Founder Quote
- Forest green bg, max-width 700px centered
- Decorative gold " in Georgia serif
- Quote about THE STARS ARE REAL vs GitHub
- "If you can't explain where the money goes, you shouldn't be holding it."
- Attribution: gold "LK" avatar + "Lou Kromah, Founder & CEO, Clearway"

### 3.5 — Tender vs Clearway Comparison
- Sand bg, id="vs"
- "Know The Difference" / "One sells a vision. The other shows receipts."
- Two-column grid, no gap, border-radius 16px
- Left: #1e1e1e bg, Tender with strikethrough name, 5 rows from TENDER_ROWS
- Right: white bg, Clearway with ◎ logo, 5 rows from TENDER_ROWS
- Footer: "Endorsed by exactly zero baronets, ironic fincore enthusiasts, or CFOs with SVR connections."

### 3.6 — How It Works
- id="how", cream bg
- "Transparency isn't a feature. It's the entire product."
- 4-card grid from PRINCIPLES, max-width 1000px

### 3.7 — Glass Ledger Preview
- Sand bg, split 1fr 1fr, gap 60px
- Left: copy about deposit transparency + 5-item checklist
- Right: mock app window
  - Forest title bar with traffic lights + "Glass Ledger" + "Live" badge
  - Balance: £12,450.00
  - 3 allocation bars from LEDGER_ALLOCATIONS
  - Fees: £2.40 breakdown
  - Transparency note: "Clearway earned £3.12 from your deposits this month"

### 3.8 — Stern Banner
- #141414 bg, centered text
- "Not backed by Pierpoint..." line (#888)
- "Backed by Stern and 8,412 people who read the prospectus." (gold)
- "SternTao exposed Tender's fraud. Eric walked so Harper could run..." (italic, #444)

### 3.9 — Investment Tiers
- id="tiers", cream bg
- "Choose how you want to build with us."
- 3-card grid from TIERS
- Featured tier (pop=true): 2px forest border, scale(1.02), stronger shadow, "Most Popular" badge, filled button
- Non-featured: 1px border, outlined button
- Each: accent bar top, tier name, amount, desc, perks with ✓, button, backer count

### 3.10 — Testimonials
- Sand bg, 3-card grid from QUOTES, no header
- Each: white card, italic quote in smart quotes, initials avatar, name + role

### 3.11 — FAQ Accordion
- id="faq", cream bg, max-width 640px
- "Questions? Good." / "Transparency starts here. Not behind an air-gapped computer."
- 6 items from FAQS
- Toggle: gold "+", rotates 45° when active
- Answer: max-height/opacity/padding transition, 300ms

### 3.12 — Final CTA
- Forest bg, centered
- "THE NUMBERS ARE REAL" (gold, uppercase)
- "This isn't just an investment. It's a vote against sun-bleached font on signage and gym bags on eBay."
- "Back Clearway Now" (gold bg, forest text)
- Faint disclaimer about capital risk + bribery joke

### 3.13 — Footer
- #0a0a0a bg
- Left: ◎ Clearway + "Your money. No mysteries. No kompromat."
- Right: "Fictional brand — HBO Industry universe" + © 2025

---

## 4. SHARED COMPONENTS

### AnimNum
- Props: `target` (number), `prefix` (string, default ""), `dur` (number, default 2000)
- IntersectionObserver at threshold 0.3, one-shot trigger
- requestAnimationFrame loop with cubic-out easing: `Math.floor(target * (1 - Math.pow(1 - progress, 3)))`
- Renders: `<span ref={ref}>{prefix}{val.toLocaleString()}</span>`

---

## 5. ANIMATION SPECIFICATIONS

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Number count-up | IntersectionObserver | 2200ms | cubic-out |
| Progress bar | Mount | 1800ms | cubic-bezier(0.22,1,0.36,1) |
| Ticker | Immediate | 30s | linear infinite |
| FAQ toggle | Click | 300ms | ease |
| Nav state | Scroll 40px | 300ms | ease |

---

## 6. RESPONSIVE BEHAVIOR

- Desktop-first with `clamp()` headlines and `auto-fit` grids
- Comparison + Glass Ledger: stack to single column below ~768px
- Stats row + footer: flex-wrap handles narrow viewports
- Nav: optionally hide text links on mobile, keep logo + CTA

---

## 7. EDGE CASES

1. Unicode escapes for special characters (£, —, ', ", ·, →, ✓)
2. Percentage: derive from constants, don't hardcode 75%
3. Ticker: 3x items, translateX(-33.33%) for seamless loop
4. Nav z-index 100 minimum
5. Scroll anchors: account for 64px fixed nav
6. No `<form>` tags — buttons are decorative
7. Zero images — everything typographic or CSS-drawn
8. Fourth wall only broken in footer

---

## 8. EXECUTION CHECKLIST

- [ ] All 13 sections in correct order
- [ ] All copy verbatim from spec
- [ ] Color tokens consistent throughout
- [ ] AnimNum triggers and counts smoothly
- [ ] Progress bar animates
- [ ] Ticker loops seamlessly
- [ ] FAQ accordion opens/closes smoothly
- [ ] Nav transitions on scroll
- [ ] Featured tier has visual prominence
- [ ] Glass Ledger mock has all data
- [ ] Comparison has dark/light contrast
- [ ] Footer has fictional disclaimer
- [ ] Single `.jsx`, default export, no external deps
- [ ] No console errors
