import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS
   ═══════════════════════════════════════════════════════ */
const c = {
  forest: "#1a3c34",
  sage: "#6b8f71",
  cream: "#faf8f2",
  gold: "#c9a84c",
  char: "#2b2b2b",
  sand: "#f4f1ea",
  bdr: "#e8e5dd",
  dark: "#141414",
  deepdark: "#0a0a0a",
};

/* ═══════════════════════════════════════════════════════
   FUNDING CONSTANTS
   ═══════════════════════════════════════════════════════ */
const GOAL = 4200000;
const RAISED = 3156000;
const BACKERS = 8412;
const DAYS = 11;
const PCT = Math.round((RAISED / GOAL) * 100);

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "Not backed by Pierpoint",
  "Not backed by Al-Mi\u2019raj",
  "No CoCo bonds",
  "No round-tripping",
  "No kompromat",
  "No crypto component",
  "No gym bags on eBay",
  "Actually regulated",
  "Open-source risk models",
  "Community governed",
  "Glass Ledger auditable",
  "THE NUMBERS ARE REAL",
  "Backed by Stern",
];

const PRINCIPLES = [
  {
    icon: "\u25ce",
    title: "Glass Ledger",
    desc: "Every fee, every investment, every decision \u2014 auditable by you in real time. No air-gapped computers needed to find out where your money went.",
  },
  {
    icon: "\u25c7",
    title: "Open-Source Risk",
    desc: "Our risk models live on GitHub. Peer-reviewed by the community, not buried in third-party processor acquisitions across West Africa.",
  },
  {
    icon: "\u25b3",
    title: "Community Governed",
    desc: "Stakeholder backers vote on product roadmap. Your money, your voice. No billionaire\u2019s godfather pulling the strings from a Mayfair office.",
  },
  {
    icon: "\u25a1",
    title: "Actually Regulated",
    desc: "FCA Enhanced Transparency certification. Not \u201cpursuing\u201d it. Not \u201cin conversation\u201d about it. Actually doing it. From day one.",
  },
];

const TIERS = [
  {
    name: "Seedling",
    amount: "\u00a350",
    desc: "Early access + community badge. No CoCo bonds. No contingencies. Just you and us.",
    perks: [
      "Beta access before public launch",
      "Clearway Community badge",
      "Quarterly transparency report",
      "A banking app that actually works on launch day",
    ],
    backers: 4218,
    color: "#6b8f71",
    pop: false,
  },
  {
    name: "Stakeholder",
    amount: "\u00a3500",
    desc: "Advisory board voting rights. Unlike Tender, we actually let the community steer.",
    perks: [
      "Everything in Seedling",
      "Vote on product roadmap quarterly",
      "Name on the Glass Ledger founders wall",
      "Priority support from real humans, not Hayley from HR",
    ],
    backers: 3106,
    color: "#c9a84c",
    pop: true,
  },
  {
    name: "Architect",
    amount: "\u00a35,000",
    desc: "Founder access + equity consideration. SEIS eligible. No round-tripping required.",
    perks: [
      "Everything in Stakeholder",
      "Monthly call with Lou and the founding team",
      "Early equity consideration (SEIS eligible)",
      "Co-design a feature with our team",
      "Due diligence you can actually verify",
    ],
    backers: 1088,
    color: "#1a3c34",
    pop: false,
  },
];

const FAQS = [
  {
    q: "Is this equity crowdfunding?",
    a: "The Seedling and Stakeholder tiers are reward-based (perks, not equity). The Architect tier includes early equity consideration under the UK\u2019s SEIS scheme with tax relief. Full terms provided before commitment. We don\u2019t need a billion-dollar CoCo bond from a bank we\u2019re secretly trying to acquire.",
  },
  {
    q: "How is Clearway different from Tender?",
    a: "Where do we start? Tender calls itself a \u201cbank killer\u201d backed by institutional money from Al-Mi\u2019raj Pierpoint and run by a CEO who needed three notes to remove a crypto component from his own app. Clearway is community-funded, community-governed, and community-auditable. We publish our numbers because they\u2019re real.",
  },
  {
    q: "Why is Stern backing you?",
    a: "Stern exposed Tender\u2019s round-tripping fraud in Ghana, crashed their stock, and proved the \u201cbank killer\u201d was built on fabricated numbers. Harper Stern doesn\u2019t just short fraud \u2014 she backs the alternative. We\u2019re it.",
  },
  {
    q: "When does the app launch?",
    a: "Beta for backers begins Q3 2025. Public launch targeted Q1 2026, pending FCA approval. We won\u2019t be hiring a baronet\u2019s son to give a nervous speech at a launch party and calling it a go-to-market strategy.",
  },
  {
    q: "What if you don\u2019t hit the goal?",
    a: "All-or-nothing. If we don\u2019t reach \u00a34.2M, every backer gets a full refund. No creative accounting. No overstating acquisition costs. Just your money back.",
  },
  {
    q: "Should I be worried about being shorted?",
    a: "We welcome scrutiny. Unlike some companies, we don\u2019t need to worry about hedge funds uncovering round-tripping schemes or staged press in our books. Our ledger is literally open. Short us if you want \u2014 you\u2019ll get bored.",
  },
];

const QUOTES = [
  {
    quote:
      "Tender said they were building a \u2018democratic financial institution.\u2019 Then they took a billion from Pierpoint and let Whitney run the comms. Clearway is what democratic actually looks like.",
    name: "James R.",
    role: "Early backer \u00b7 Stakeholder tier",
  },
  {
    quote:
      "I\u2019ve never seen a fintech publish their risk models. Tender\u2019s idea of transparency was neon lettering that said \u2018THE STARS ARE REAL.\u2019 Clearway shows you where the money is.",
    name: "Dr. Amara K.",
    role: "Fintech researcher, UCL",
  },
  {
    quote:
      "My parents asked me what a \u2018private banker in your pocket\u2019 actually means. I couldn\u2019t explain it. With Clearway, I can show them exactly what their deposits are doing. That\u2019s the difference.",
    name: "Priya S.",
    role: "Software engineer \u00b7 Architect tier",
  },
];

const TENDER_ROWS = [
  {
    tender_label: "\u201cBank killer\u201d",
    tender_copy:
      "Backed by a \u00a31B CoCo bond from Al-Mi\u2019raj Pierpoint. A dinosaur funding a disruption. Make it make sense.",
    clearway_label: "Community-funded + Stern-backed",
    clearway_copy:
      "Crowdfunded \u00a34.2M from 8,412 individuals. Institutional backing from Stern \u2014 the fund that exposed Tender\u2019s fraud in the first place.",
  },
  {
    tender_label: "\u201cPrivate banker in your pocket\u201d",
    tender_copy:
      "Three rounds of notes to remove the crypto component. Launch party headlined by the CEO\u2019s nervous breakdown.",
    clearway_label: "Glass Ledger dashboard",
    clearway_copy:
      "Real-time deposit tracking. Fee breakdowns. Investment allocation. Exportable audit logs. Ships on time.",
  },
  {
    tender_label: "\u201cDemocratic financial institution\u201d",
    tender_copy:
      "Run by a CFO who hired staff from escort agencies, staged press in Accra, and planted operatives to blackmail his own partners.",
    clearway_label: "Open governance, open books",
    clearway_copy:
      "Customer-elected advisory board. Risk models on GitHub. Quarterly transparency reports to every backer.",
  },
  {
    tender_label: "\u201cTHE STARS ARE REAL\u201d",
    tender_copy:
      "Neon sign. Canary Wharf HQ. Zero published financials. Stars might be real. Numbers weren\u2019t.",
    clearway_label: "THE NUMBERS ARE REAL",
    clearway_copy:
      "Published financials. FCA Enhanced Transparency certification. Audited by humans, not neon.",
  },
  {
    tender_label: "Powered by Pierpoint",
    tender_copy:
      "Or is it Pierpoint powered by Tender? Even they couldn\u2019t agree which way the logo faced.",
    clearway_label: "Powered by the community",
    clearway_copy:
      "No branding arguments. No logo disputes. You funded it, you govern it, your name is on the wall.",
  },
];

const LEDGER_ALLOCATIONS = [
  { name: "UK Gov Bonds", pct: 62, amount: "\u00a37,719", color: "#1a3c34" },
  {
    name: "Green Infrastructure",
    pct: 25,
    amount: "\u00a33,112",
    color: "#6b8f71",
  },
  { name: "Cash Reserve", pct: 13, amount: "\u00a31,619", color: "#c9a84c" },
];

const LEDGER_CHECKLIST = [
  "Real-time deposit tracking",
  "Fee breakdown to the penny",
  "Investment allocation view",
  "Exportable audit logs",
  "Monthly earnings transparency",
];

/* ═══════════════════════════════════════════════════════
   AnimNum — Animated number counter
   ═══════════════════════════════════════════════════════ */
function AnimNum({ target, prefix = "", dur = 2000 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, dur]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [faq, setFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(PCT), 200);
    return () => clearTimeout(t);
  }, []);

  const ff =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const label = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: c.gold,
    marginBottom: 12,
  };

  const heading = {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    letterSpacing: "-0.8px",
    color: c.forest,
    margin: 0,
  };

  return (
    <div
      style={{
        fontFamily: ff,
        color: c.char,
        background: c.cream,
        margin: 0,
        padding: 0,
      }}
    >
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 64px;
        }
        body { margin: 0; padding: 0; }
        *, *::before, *::after { box-sizing: border-box; }
        @media (max-width: 768px) {
          [data-r="split"] { grid-template-columns: 1fr !important; }
          [data-r="nav"]   { display: none !important; }
        }
      `}</style>

      {/* ──────────────────────────────────────────────
          3.1  ANTI-TENDER SCROLLING TICKER
          ────────────────────────────────────────────── */}
      <div
        style={{
          background: c.forest,
          padding: "8px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "ticker 30s linear infinite",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: c.gold,
                    flexShrink: 0,
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    color: c.sage,
                    opacity: 0.4,
                    margin: "0 16px",
                    flexShrink: 0,
                  }}
                >
                  {"\u25ce"}
                </span>
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          3.2  STICKY NAVIGATION
          ────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          background: scrolled ? "rgba(250,248,242,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s",
          borderBottom: scrolled
            ? `1px solid ${c.bdr}`
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: 18,
            color: c.forest,
          }}
        >
          <span style={{ fontSize: 20 }}>{"\u25ce"}</span> Clearway
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            data-r="nav"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {[
              ["#vs", "Compare"],
              ["#how", "How It Works"],
              ["#tiers", "Invest"],
              ["#faq", "FAQ"],
              ["#accounts", "Preview App"],
            ].map(([href, txt]) => (
              <a
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  color: c.char,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {txt}
              </a>
            ))}
          </div>
          <a
            href="#tiers"
            style={{
              background: c.forest,
              color: c.cream,
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Invest Now
          </a>
        </div>
      </nav>

      {/* ──────────────────────────────────────────────
          3.3  HERO SECTION
          ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "140px 24px 80px",
          textAlign: "center",
          background: c.cream,
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: c.char,
              border: `1px solid ${c.bdr}`,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: c.sage,
                display: "inline-block",
              }}
            />
            Community Seed Round {"\u2014"} {DAYS} days left
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: c.forest,
              margin: "24px 0 0",
            }}
          >
            They called it a
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${c.sage}, ${c.gold})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {"\u2018"}bank killer.{"\u2019"}
            </span>
            <br />
            <span
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                fontWeight: 500,
                color: "#888",
                WebkitTextFillColor: "#888",
              }}
            >
              We{"\u2019"}re building a bank you can actually trust.
            </span>
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#666",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "24px auto 0",
            }}
          >
            No institutional puppeteers. No billion-dollar CoCo bonds. Backed by
            Stern and 8,412 people who think banking should be boring,
            transparent, and honest.
          </p>

          {/* Funding Card */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              maxWidth: 680,
              margin: "40px auto 0",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 48,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    color: c.forest,
                  }}
                >
                  <AnimNum target={RAISED} prefix={"\u00a3"} />
                </div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                  raised of {"\u00a3"}
                  {GOAL.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    color: c.forest,
                  }}
                >
                  <AnimNum target={BACKERS} />
                </div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                  backers
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    color: c.forest,
                  }}
                >
                  {DAYS}
                </div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
                  days left
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                height: 10,
                borderRadius: 5,
                background: "#f0ede6",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 5,
                  background: `linear-gradient(90deg, ${c.forest}, ${c.sage})`,
                  width: `${barWidth}%`,
                  transition:
                    "width 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <a
                href="#tiers"
                style={{
                  display: "inline-block",
                  background: c.forest,
                  color: c.cream,
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Back This Project {"\u2192"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.4  FOUNDER QUOTE
          ────────────────────────────────────────────── */}
      <section style={{ background: c.forest, padding: "80px 24px" }}>
        <div
          style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              color: c.gold,
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            {"\u201c"}
          </div>
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 22px)",
              color: c.cream,
              lineHeight: 1.6,
              fontWeight: 400,
              margin: "0 0 24px",
            }}
          >
            They put {"\u2018"}THE STARS ARE REAL{"\u2019"} in neon on the wall
            and called it a vision. We put our risk models on GitHub and called
            it accountability.
          </p>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: c.cream,
              lineHeight: 1.6,
              fontWeight: 400,
              opacity: 0.85,
              margin: "0 0 32px",
            }}
          >
            If you can{"\u2019"}t explain where the money goes, you shouldn
            {"\u2019"}t be holding it.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: c.gold,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: c.forest,
              }}
            >
              LK
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{ color: c.cream, fontWeight: 600, fontSize: 14 }}
              >
                Lou Kromah
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
              >
                Founder & CEO, Clearway
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.5  TENDER vs CLEARWAY COMPARISON
          ────────────────────────────────────────────── */}
      <section id="vs" style={{ background: c.sand, padding: "80px 24px" }}>
        <div
          style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
        >
          <div style={label}>KNOW THE DIFFERENCE</div>
          <h2 style={{ ...heading, margin: "0 0 48px" }}>
            One sells a vision. The other shows receipts.
          </h2>

          <div
            data-r="split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {/* Tender Column */}
            <div style={{ background: "#1e1e1e", padding: "32px 28px" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#666",
                  marginBottom: 24,
                  textDecoration: "line-through",
                }}
              >
                Tender
              </div>
              {TENDER_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom:
                      i < TENDER_ROWS.length - 1 ? 24 : 0,
                    paddingBottom:
                      i < TENDER_ROWS.length - 1 ? 24 : 0,
                    borderBottom:
                      i < TENDER_ROWS.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#999",
                      marginBottom: 6,
                    }}
                  >
                    {row.tender_label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#666",
                      lineHeight: 1.5,
                    }}
                  >
                    {row.tender_copy}
                  </div>
                </div>
              ))}
            </div>

            {/* Clearway Column */}
            <div style={{ background: "white", padding: "32px 28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 18,
                  fontWeight: 700,
                  color: c.forest,
                  marginBottom: 24,
                }}
              >
                <span>{"\u25ce"}</span> Clearway
              </div>
              {TENDER_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom:
                      i < TENDER_ROWS.length - 1 ? 24 : 0,
                    paddingBottom:
                      i < TENDER_ROWS.length - 1 ? 24 : 0,
                    borderBottom:
                      i < TENDER_ROWS.length - 1
                        ? `1px solid ${c.bdr}`
                        : "none",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: c.forest,
                      marginBottom: 6,
                    }}
                  >
                    {row.clearway_label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#555",
                      lineHeight: 1.5,
                    }}
                  >
                    {row.clearway_copy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            style={{
              fontSize: 13,
              color: "#888",
              marginTop: 24,
              fontStyle: "italic",
            }}
          >
            Endorsed by exactly zero baronets, ironic fincore enthusiasts, or
            CFOs with SVR connections.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.6  HOW IT WORKS
          ────────────────────────────────────────────── */}
      <section
        id="how"
        style={{ background: c.cream, padding: "80px 24px" }}
      >
        <div
          style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
        >
          <div style={label}>HOW IT WORKS</div>
          <h2 style={{ ...heading, margin: "0 0 48px" }}>
            Transparency isn{"\u2019"}t a feature. It{"\u2019"}s the entire
            product.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 28,
                  border: `1px solid ${c.bdr}`,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: c.sand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: c.forest,
                    marginBottom: 16,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: c.forest,
                    margin: "0 0 8px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.7  GLASS LEDGER PREVIEW
          ────────────────────────────────────────────── */}
      <section style={{ background: c.sand, padding: "80px 24px" }}>
        <div
          data-r="split"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left — Copy */}
          <div>
            <div style={label}>GLASS LEDGER</div>
            <h2
              style={{
                ...heading,
                margin: "0 0 16px",
                fontSize: "clamp(28px, 4vw, 36px)",
              }}
            >
              Your deposits. Your dashboard. No mysteries.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#555",
                lineHeight: 1.6,
                margin: "0 0 24px",
              }}
            >
              Every pound you deposit is tracked, allocated, and visible. Not in
              a quarterly PDF buried in your inbox. In real time, on your
              dashboard, whenever you want.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {LEDGER_CHECKLIST.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: c.char,
                  }}
                >
                  <span style={{ color: c.sage, fontWeight: 700 }}>
                    {"\u2713"}
                  </span>{" "}
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mock App */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${c.bdr}`,
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
            }}
          >
            {/* Title Bar */}
            <div
              style={{
                background: c.forest,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#ff5f57",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#febc2e",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#28c840",
                    display: "inline-block",
                  }}
                />
              </div>
              <span
                style={{ color: c.cream, fontSize: 13, fontWeight: 600 }}
              >
                Glass Ledger
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: c.forest,
                  background: "#28c840",
                  borderRadius: 10,
                  padding: "2px 8px",
                }}
              >
                Live
              </span>
            </div>

            {/* App Content */}
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
                Total Balance
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: c.forest,
                  marginBottom: 24,
                }}
              >
                {"\u00a3"}12,450.00
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 12,
                }}
              >
                Allocation
              </div>
              {LEDGER_ALLOCATIONS.map((a, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: c.char }}>{a.name}</span>
                    <span style={{ color: "#888" }}>
                      {a.amount} ({a.pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 3,
                      background: "#f0ede6",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 3,
                        background: a.color,
                        width: `${a.pct}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <div
                style={{
                  borderTop: `1px solid ${c.bdr}`,
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ color: "#888" }}>Monthly fees</span>
                  <span style={{ fontWeight: 600, color: c.char }}>
                    {"\u00a3"}2.40
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: c.sage,
                    background: `${c.sage}11`,
                    borderRadius: 8,
                    padding: "8px 12px",
                  }}
                >
                  Clearway earned {"\u00a3"}3.12 from your deposits this month.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.8  STERN BANNER
          ────────────────────────────────────────────── */}
      <section
        style={{
          background: c.dark,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "#888",
              margin: "0 0 16px",
            }}
          >
            Not backed by Pierpoint. Not backed by Al-Mi{"\u2019"}raj. Not
            backed by anyone{"\u2019"}s godfather.
          </p>
          <p
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 700,
              color: c.gold,
              margin: "0 0 24px",
              letterSpacing: "-0.5px",
            }}
          >
            Backed by Stern and 8,412 people who read the prospectus.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              fontStyle: "italic",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            SternTao exposed Tender{"\u2019"}s fraud. Eric walked so Harper
            could run. Now Stern backs what Tender should have been. That
            {"\u2019"}s us.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.9  INVESTMENT TIERS
          ────────────────────────────────────────────── */}
      <section
        id="tiers"
        style={{ background: c.cream, padding: "80px 24px" }}
      >
        <div
          style={{ maxWidth: 1060, margin: "0 auto", textAlign: "center" }}
        >
          <div style={label}>INVEST</div>
          <h2 style={{ ...heading, margin: "0 0 48px" }}>
            Choose how you want to build with us.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              alignItems: "start",
            }}
          >
            {TIERS.map((tier, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  border: tier.pop
                    ? `2px solid ${c.forest}`
                    : `1px solid ${c.bdr}`,
                  transform: tier.pop ? "scale(1.02)" : "none",
                  boxShadow: tier.pop
                    ? "0 4px 6px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1)"
                    : "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent bar */}
                <div style={{ height: 4, background: tier.color }} />

                {tier.pop && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: c.forest,
                      background: `${c.gold}22`,
                      border: `1px solid ${c.gold}`,
                      borderRadius: 20,
                      padding: "4px 12px",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div style={{ padding: "28px 28px 28px" }}>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: c.forest,
                      margin: "0 0 4px",
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: tier.color,
                      margin: "0 0 12px",
                    }}
                  >
                    {tier.amount}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#666",
                      lineHeight: 1.5,
                      margin: "0 0 20px",
                    }}
                  >
                    {tier.desc}
                  </p>

                  <div style={{ textAlign: "left" }}>
                    {tier.perks.map((perk, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: 13,
                          color: "#555",
                          marginBottom: 10,
                        }}
                      >
                        <span
                          style={{
                            color: c.sage,
                            fontWeight: 700,
                            marginTop: 1,
                          }}
                        >
                          {"\u2713"}
                        </span>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <a
                      href="#"
                      style={{
                        display: "block",
                        textAlign: "center",
                        borderRadius: 10,
                        padding: "12px 28px",
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: "none",
                        cursor: "pointer",
                        ...(tier.pop
                          ? {
                              background: c.forest,
                              color: c.cream,
                              border: `2px solid ${c.forest}`,
                            }
                          : {
                              background: "white",
                              color: c.forest,
                              border: `1.5px solid ${c.forest}`,
                            }),
                      }}
                    >
                      Back This Tier
                    </a>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#999",
                      textAlign: "center",
                      marginTop: 12,
                    }}
                  >
                    {tier.backers.toLocaleString()} backers
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.10  TESTIMONIALS
          ────────────────────────────────────────────── */}
      <section style={{ background: c.sand, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {QUOTES.map((q, i) => {
              const parts = q.name.split(" ");
              const initials =
                parts[0][0] + parts[parts.length - 1][0];
              return (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: 28,
                    border: `1px solid ${c.bdr}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "#555",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      margin: "0 0 20px",
                    }}
                  >
                    {"\u201c"}
                    {q.quote}
                    {"\u201d"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: c.sand,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        color: c.forest,
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: c.char,
                        }}
                      >
                        {q.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#888" }}>
                        {q.role}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.11  FAQ ACCORDION
          ────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{ background: c.cream, padding: "80px 24px" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={label}>FAQ</div>
            <h2 style={{ ...heading, margin: "0 0 12px" }}>
              Questions? Good.
            </h2>
            <p style={{ fontSize: 15, color: "#888", margin: 0 }}>
              Transparency starts here. Not behind an air-gapped computer.
            </p>
          </div>

          {FAQS.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: `1px solid ${c.bdr}` }}
            >
              <button
                onClick={() => setFaq(faq === i ? null : i)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  color: c.char,
                  textAlign: "left",
                  fontFamily: ff,
                }}
              >
                {item.q}
                <span
                  style={{
                    color: c.gold,
                    fontSize: 22,
                    fontWeight: 300,
                    transform:
                      faq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 300ms ease",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: faq === i ? 300 : 0,
                  opacity: faq === i ? 1 : 0,
                  padding: faq === i ? "0 0 20px" : "0 0 0",
                  overflow: "hidden",
                  transition:
                    "max-height 300ms ease, opacity 300ms ease, padding 300ms ease",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.12  FINAL CTA
          ────────────────────────────────────────────── */}
      <section
        style={{
          background: c.forest,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              fontSize: "clamp(11px, 1.5vw, 13px)",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: c.gold,
              marginBottom: 24,
            }}
          >
            THE NUMBERS ARE REAL
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: c.cream,
              letterSpacing: "-0.8px",
              margin: "0 0 16px",
            }}
          >
            This isn{"\u2019"}t just an investment.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            It{"\u2019"}s a vote against sun-bleached font on signage and gym
            bags on eBay.
          </p>
          <a
            href="#tiers"
            style={{
              display: "inline-block",
              background: c.gold,
              color: c.forest,
              borderRadius: 10,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Back Clearway Now
          </a>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              marginTop: 24,
              lineHeight: 1.5,
            }}
          >
            Capital at risk. Crowdfunding is not a guaranteed investment. Unlike
            some companies, we will not bribe officials to stage press about
            this disclaimer.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          3.13  FOOTER
          ────────────────────────────────────────────── */}
      <footer style={{ background: c.deepdark, padding: "40px 24px" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 16,
                fontWeight: 700,
                color: c.cream,
                marginBottom: 6,
              }}
            >
              <span>{"\u25ce"}</span> Clearway
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              Your money. No mysteries. No kompromat.
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
              Fictional brand {"\u2014"} HBO Industry universe
            </div>
            <div style={{ fontSize: 12, color: "#444" }}>
              {"\u00a9"} 2025 Clearway (fictional)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
