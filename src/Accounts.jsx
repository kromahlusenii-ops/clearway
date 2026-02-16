import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   COLOR TOKENS (extended from landing page)
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
  positive: "#28c940",
  negative: "#c94c4c",
  pending: "#c9a84c",
};

const t = {
  cardGradient:
    "linear-gradient(135deg, #1a3c34 0%, #234a3f 50%, #1a3c34 100%)",
  cardGlass: "rgba(255,255,255,0.1)",
  surfaceSubtle: "#f0ede6",
  surfaceTransparency:
    "linear-gradient(135deg, rgba(26,60,52,0.04) 0%, rgba(107,143,113,0.08) 100%)",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  shadowEl: "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)",
  shadowNav: "0 -1px 8px rgba(0,0,0,0.04)",
  radius: 16,
};

const ff =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/* ═══════════════════════════════════════════════════════
   DATA MODELS
   ═══════════════════════════════════════════════════════ */
const user = {
  id: "usr_001",
  name: "Lou Kromah",
  initials: "LK",
  email: "lou@clearway.co",
  card: { last4: "4821", expiry: "03/28", type: "debit", frozen: false },
  backerTier: "architect",
  memberSince: "2025-03-15",
};

const account = {
  balance: 12450.0,
  currency: "GBP",
  changeThisMonth: 245.3,
  changeDirection: "up",
  transparencyScore: 98,
  lastUpdated: new Date().toISOString(),
};

const allocations = [
  {
    id: "alloc_bonds",
    name: "UK Gov Bonds",
    amount: 7719,
    pct: 62,
    yield: 4.2,
    risk: "Low",
    color: c.forest,
  },
  {
    id: "alloc_green",
    name: "Green Infrastructure",
    amount: 3112,
    pct: 25,
    yield: 5.8,
    risk: "Medium",
    color: c.sage,
  },
  {
    id: "alloc_cash",
    name: "Cash Reserve",
    amount: 1619,
    pct: 13,
    yield: 0.5,
    risk: "None",
    color: c.gold,
  },
];

const earnings = {
  userEarnings: 3.12,
  clearwayFee: 2.4,
  feeBreakdown: { accountMaintenance: 1.5, fxFees: 0.9 },
  netToUser: 0.72,
  period: "February 2025",
};

const NOW = new Date();
const ago = (hours) =>
  new Date(NOW.getTime() - hours * 3600000).toISOString();

const transactions = [
  {
    id: "txn_001",
    merchant: "Tesco Express",
    amount: -23.5,
    date: ago(2),
    category: "groceries",
    status: "completed",
    card: "4821",
    clearwayFee: 0.0,
    processingCost: 0.003,
    networkFee: 0.02,
    ref: "TXN-2025-0215-001",
  },
  {
    id: "txn_002",
    merchant: "TfL Oyster",
    amount: -6.8,
    date: ago(8),
    category: "transport",
    status: "completed",
    card: "4821",
    clearwayFee: 0.0,
    processingCost: 0.002,
    networkFee: 0.01,
    ref: "TXN-2025-0215-002",
  },
  {
    id: "txn_003",
    merchant: "Salary Deposit",
    amount: 3200.0,
    date: ago(26),
    category: "income",
    status: "completed",
    card: null,
    clearwayFee: 0.0,
    processingCost: 0.0,
    networkFee: 0.0,
    ref: "TXN-2025-0214-001",
  },
  {
    id: "txn_004",
    merchant: "Pret A Manger",
    amount: -4.95,
    date: ago(30),
    category: "dining",
    status: "completed",
    card: "4821",
    clearwayFee: 0.0,
    processingCost: 0.003,
    networkFee: 0.02,
    ref: "TXN-2025-0214-002",
  },
  {
    id: "txn_005",
    merchant: "Spotify",
    amount: -10.99,
    date: ago(50),
    category: "subscription",
    status: "completed",
    card: "4821",
    clearwayFee: 0.0,
    processingCost: 0.001,
    networkFee: 0.01,
    ref: "TXN-2025-0213-001",
  },
];

const CATEGORIES = {
  groceries: { label: "Groceries", color: "#6b8f71", icon: "\ud83d\uded2" },
  transport: { label: "Transport", color: "#c9a84c", icon: "\ud83d\ude87" },
  income: { label: "Income", color: "#1a3c34", icon: "\ud83d\udcb0" },
  dining: { label: "Dining", color: "#e07c4c", icon: "\ud83c\udf7d" },
  subscription: {
    label: "Subscription",
    color: "#c94c4c",
    icon: "\ud83d\udd04",
  },
  shopping: { label: "Shopping", color: "#7c6bc9", icon: "\ud83d\udecd" },
  transfer: { label: "Transfer", color: "#4c8fc9", icon: "\u2197" },
  other: { label: "Other", color: "#999999", icon: "\u2022" },
};

const transparencyChecklist = [
  { id: "deposit_tracking", label: "Deposit tracking", complete: true },
  {
    id: "investment_visible",
    label: "Investment allocation visible",
    complete: true,
  },
  { id: "fee_breakdown", label: "Fee breakdown available", complete: true },
  { id: "earnings_disclosed", label: "Earnings disclosed", complete: true },
  { id: "risk_model_public", label: "Risk model published", complete: true },
  {
    id: "fx_route_audit",
    label: "FX route audit",
    complete: false,
    note: "Processing \u2014 available Feb 18",
  },
];

const recentContacts = [
  { name: "Sarah M.", initials: "SM" },
  { name: "James R.", initials: "JR" },
  { name: "Priya S.", initials: "PS" },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function fmt(n) {
  return (
    "\u00a3" +
    Math.abs(n).toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function fmtSigned(n) {
  const prefix = n > 0 ? "+" : n < 0 ? "-" : "";
  return prefix + fmt(n);
}

function fmtDate(dateStr) {
  const d = new Date(dateStr);
  const diffH = Math.round((NOW - d) / 3600000);
  const time = d.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (diffH < 24) return "Today, " + time;
  if (diffH < 48) return "Yesterday, " + time;
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

function fmtDateLong(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/* ═══════════════════════════════════════════════════════
   SVG ICONS (feather-style, zero dependencies)
   ═══════════════════════════════════════════════════════ */
const I = {
  home: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  chart: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l6.36 3.64" />
    </svg>
  ),
  card: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  person: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    </svg>
  ),
  bell: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  back: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl || c.char}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  arrowUpRight: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  ),
  arrowDownLeft: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 7L7 17" />
      <path d="M17 17H7V7" />
    </svg>
  ),
  plus: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  ),
  download: (cl) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl || c.forest}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  contactless: (cl) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl || c.cream}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 18c-3.3-3.3-3.3-8.7 0-12" />
      <path d="M10 15.5c-1.9-1.9-1.9-5.1 0-7" />
      <path d="M14 13a1.5 1.5 0 0 0 0-2" />
    </svg>
  ),
  search: (cl) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={cl || "#999"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════
   DONUT CHART (SVG, animated)
   ═══════════════════════════════════════════════════════ */
function DonutChart({ data, size = 180 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const r = 65;
  const circ = 2 * Math.PI * r;
  let cumDeg = 0;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        style={{ overflow: "visible" }}
      >
        {data.map((item, i) => {
          const dashLen = (item.pct / 100) * circ;
          const rotation = cumDeg;
          cumDeg += (item.pct / 100) * 360;
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={item.color}
              strokeWidth="28"
              strokeLinecap="butt"
              strokeDasharray={`${dashLen} ${circ - dashLen}`}
              transform={`rotate(${rotation - 90} 100 100)`}
              style={{
                strokeDashoffset: show ? 0 : dashLen,
                transition: `stroke-dashoffset 800ms ease-out ${i * 150}ms`,
              }}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>
          Total
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.forest }}>
          {fmt(account.balance)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Accounts() {
  const [screen, setScreen] = useState("dashboard");
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendRef, setSendRef] = useState("");
  const [topUpAmount, setTopUpAmount] = useState("");

  const go = (s, txn) => {
    setScreen(s);
    if (txn) setSelectedTxn(txn);
    if (s === "send") {
      setSendTo("");
      setSendAmount("");
      setSendRef("");
    }
    if (s === "topup") setTopUpAmount("");
    const tabMap = {
      dashboard: "home",
      ledger: "ledger",
      cards: "cards",
      profile: "profile",
    };
    if (tabMap[s]) setActiveTab(tabMap[s]);
  };

  /* ── Shared styles ── */
  const cardStyle = {
    background: "white",
    borderRadius: t.radius,
    boxShadow: t.shadow,
    overflow: "hidden",
  };

  const btnPrimary = {
    display: "block",
    width: "100%",
    padding: "16px",
    background: c.forest,
    color: c.cream,
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: ff,
    textAlign: "center",
    textDecoration: "none",
  };

  const btnOutline = {
    ...btnPrimary,
    background: "white",
    color: c.forest,
    border: `1.5px solid ${c.forest}`,
  };

  const screenHeader = (title, onBack, rightEl) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: "white",
        borderBottom: `1px solid ${c.bdr}`,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          display: "flex",
        }}
      >
        {I.back()}
      </button>
      <span style={{ fontSize: 16, fontWeight: 600, color: c.char }}>
        {title}
      </span>
      <div style={{ width: 30, display: "flex", justifyContent: "flex-end" }}>
        {rightEl || null}
      </div>
    </div>
  );

  const transparencyRow = (label, value, bold) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        marginBottom: 8,
      }}
    >
      <span style={{ color: "#888" }}>{label}</span>
      <span
        style={{
          color: bold ? c.forest : c.char,
          fontWeight: bold ? 700 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );

  /* ══════════════════════════════════════════════
     SCREEN: DASHBOARD
     ══════════════════════════════════════════════ */
  const renderDashboard = () => (
    <>
      {/* Top Bar */}
      <div
        data-r="mobile-topbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: c.forest,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: c.cream,
            }}
          >
            {user.initials}
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: c.char }}>
            {getGreeting()}, {user.name.split(" ")[0]}
          </span>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            position: "relative",
            display: "flex",
          }}
        >
          {I.bell(c.char)}
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: c.negative,
            }}
          />
        </button>
      </div>

      {/* Balance Card */}
      <div
        style={{
          background: t.cardGradient,
          borderRadius: 20,
          padding: 24,
          margin: "0 20px",
          color: c.cream,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            opacity: 0.7,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 4,
          }}
        >
          Total Balance
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-1px",
            fontVariantNumeric: "tabular-nums",
            marginBottom: 4,
          }}
        >
          {fmt(account.balance)}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: c.positive,
            marginBottom: 20,
          }}
        >
          {"\u2191"} +{fmt(account.changeThisMonth)} this month
        </div>

        {/* Virtual Card */}
        <div
          style={{
            background: t.cardGlass,
            borderRadius: 14,
            padding: 16,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>
              {"\u25ce"} Clearway
            </span>
            {I.contactless()}
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: "2px",
              opacity: 0.9,
              marginBottom: 12,
            }}
          >
            {"\u2022\u2022\u2022\u2022"} {"\u2022\u2022\u2022\u2022"}{" "}
            {"\u2022\u2022\u2022\u2022"} {user.card.last4}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "1.5px",
                opacity: 0.8,
                textTransform: "uppercase",
              }}
            >
              {user.name}
            </span>
            <span style={{ fontSize: 11, opacity: 0.8 }}>
              {user.card.expiry}
            </span>
          </div>
        </div>

        {/* Glass Ledger CTA */}
        <button
          onClick={() => go("ledger")}
          style={{
            background: "none",
            border: "none",
            color: c.cream,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            padding: "16px 0 0",
            fontFamily: ff,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          See Glass Ledger {"\u2192"}
        </button>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "24px 20px",
        }}
      >
        {[
          { icon: I.arrowUpRight, label: "Send", action: () => go("send") },
          {
            icon: I.arrowDownLeft,
            label: "Request",
            action: () => {},
          },
          { icon: I.plus, label: "Top Up", action: () => go("topup") },
          {
            icon: () => (
              <span style={{ fontSize: 20, color: c.forest }}>
                {"\u25ce"}
              </span>
            ),
            label: "Ledger",
            action: () => go("ledger"),
          },
        ].map((qa, i) => (
          <button
            key={i}
            onClick={qa.action}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `${c.forest}14`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {qa.icon(c.forest)}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: c.char,
                fontFamily: ff,
              }}
            >
              {qa.label}
            </span>
          </button>
        ))}
      </div>

      {/* Transparency Score Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px 20px",
          margin: "0 20px",
          background: t.surfaceSubtle,
          borderRadius: 12,
          cursor: "pointer",
        }}
        onClick={() => go("ledger")}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: "#666" }}>
          Transparency Score:
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: c.forest }}>
          {account.transparencyScore}/100
        </span>
        <span style={{ fontSize: 14, color: c.forest }}>{"\u25ce"}</span>
      </div>

      {/* Transaction Feed */}
      <div style={{ padding: "24px 20px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: c.char }}>
            Recent Transactions
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: c.forest,
              cursor: "pointer",
            }}
          >
            See All {"\u2192"}
          </span>
        </div>
        <div style={cardStyle}>
          {transactions.map((txn, i) => {
            const cat = CATEGORIES[txn.category] || CATEGORIES.other;
            return (
              <div
                key={txn.id}
                onClick={() => go("detail", txn)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 16,
                  borderBottom:
                    i < transactions.length - 1
                      ? `1px solid ${t.surfaceSubtle}`
                      : "none",
                  cursor: "pointer",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `${cat.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: c.char,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {txn.merchant}
                  </div>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {fmtDate(txn.date)}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: txn.amount > 0 ? c.forest : c.char,
                    }}
                  >
                    {fmtSigned(txn.amount)}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color:
                        txn.status === "pending" ? c.pending : "#999",
                    }}
                  >
                    {txn.status === "pending" ? "Pending" : "Completed"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparency Card */}
      <div
        style={{
          margin: "16px 20px 24px",
          padding: 16,
          borderRadius: 14,
          background: t.surfaceTransparency,
          border: "1px solid rgba(26,60,52,0.1)",
          cursor: "pointer",
        }}
        onClick={() => go("ledger")}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 16, color: c.forest }}>{"\u25ce"}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: c.forest }}>
            Glass Ledger Update
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Your deposits earned {fmt(earnings.userEarnings)} this month.
          Clearway earned {fmt(earnings.clearwayFee)}. Full breakdown{" "}
          {"\u2192"}
        </p>
      </div>
    </>
  );

  /* ══════════════════════════════════════════════
     SCREEN: GLASS LEDGER
     ══════════════════════════════════════════════ */
  const renderLedger = () => (
    <>
      {screenHeader("Glass Ledger", () => go("dashboard"), (
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          {I.download()}
        </button>
      ))}
      <div style={{ padding: 20 }}>
        {/* Balance Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#888",
              marginBottom: 4,
            }}
          >
            Your Money Right Now
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: c.forest,
              marginBottom: 4,
            }}
          >
            {fmt(account.balance)}
          </div>
          <div style={{ fontSize: 12, color: "#999" }}>
            Last updated: 2 minutes ago
          </div>
        </div>

        {/* Donut Chart */}
        <div
          style={{
            ...cardStyle,
            padding: 24,
            marginBottom: 16,
          }}
        >
          <DonutChart data={allocations} />
        </div>

        {/* Allocation Breakdown */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          {allocations.map((a, i) => (
            <div
              key={a.id}
              style={{
                padding: 16,
                borderBottom:
                  i < allocations.length - 1
                    ? `1px solid ${t.surfaceSubtle}`
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: a.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: c.char,
                    flex: 1,
                  }}
                >
                  {a.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "#888",
                  marginLeft: 22,
                }}
              >
                <span>
                  {fmt(a.amount)} {"\u00b7"} {a.pct}%
                </span>
                <span>
                  Yield: {a.yield}% {"\u00b7"} Risk: {a.risk}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings Card */}
        <div style={{ ...cardStyle, padding: 20, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.forest,
              marginBottom: 16,
            }}
          >
            Your Earnings
          </div>
          {transparencyRow(
            "Your deposits earned",
            fmt(earnings.userEarnings),
            false
          )}
          <div
            style={{
              height: 1,
              background: t.surfaceSubtle,
              margin: "12px 0",
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 12,
            }}
          >
            Clearway{"\u2019"}s Fee
          </div>
          {transparencyRow("Account maintenance", fmt(1.5), false)}
          {transparencyRow("FX fees", fmt(0.9), false)}
          {transparencyRow("Total", fmt(earnings.clearwayFee), false)}
          <div
            style={{
              height: 1,
              background: t.surfaceSubtle,
              margin: "12px 0",
            }}
          />
          {transparencyRow(
            "Net to you",
            "+" + fmt(earnings.netToUser),
            true
          )}
        </div>

        {/* Transparency Score */}
        <div style={{ ...cardStyle, padding: 20, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{ fontSize: 14, fontWeight: 600, color: c.char }}
            >
              Transparency Score
            </span>
            <span
              style={{ fontSize: 20, fontWeight: 700, color: c.forest }}
            >
              {account.transparencyScore} / 100
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: t.surfaceSubtle,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 4,
                background: `linear-gradient(90deg, ${c.forest}, ${c.sage})`,
                width: `${account.transparencyScore}%`,
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {transparencyChecklist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: item.complete ? c.sage : "#ccc",
                    marginTop: 1,
                  }}
                >
                  {item.complete ? "\u2713" : "\u25cb"}
                </span>
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      color: item.complete ? c.char : "#999",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.note && (
                    <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>
                      {item.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Model */}
        <div style={{ ...cardStyle, padding: 20, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            Risk Model
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#888",
              margin: "0 0 4px",
              lineHeight: 1.5,
            }}
          >
            Open source on GitHub
          </p>
          <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 12px" }}>
            Last audit: Feb 12, 2025
          </p>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontSize: 13,
              fontWeight: 600,
              color: c.forest,
              cursor: "pointer",
              fontFamily: ff,
            }}
          >
            View on GitHub {"\u2192"}
          </button>
        </div>

        {/* Export CTA */}
        <button style={btnOutline}>Export Audit Log</button>
      </div>
    </>
  );

  /* ══════════════════════════════════════════════
     SCREEN: TRANSACTION DETAIL
     ══════════════════════════════════════════════ */
  const renderDetail = () => {
    const txn = selectedTxn;
    if (!txn) return null;
    const cat = CATEGORIES[txn.category] || CATEGORIES.other;
    const absorbed = (txn.processingCost + txn.networkFee).toFixed(3);

    return (
      <>
        {screenHeader("Transaction Detail", () => go("dashboard"))}
        <div style={{ padding: 20 }}>
          {/* Amount Hero */}
          <div
            style={{
              ...cardStyle,
              padding: 24,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `${cat.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                margin: "0 auto 12px",
              }}
            >
              {cat.icon}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: txn.amount > 0 ? c.forest : c.char,
                marginBottom: 4,
              }}
            >
              {fmtSigned(txn.amount)}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: c.char,
                marginBottom: 4,
              }}
            >
              {txn.merchant}
            </div>
            <div
              style={{
                fontSize: 13,
                color:
                  txn.status === "completed" ? c.sage : c.pending,
                fontWeight: 500,
              }}
            >
              {txn.status === "completed" ? "Completed" : "Pending"}
            </div>
          </div>

          {/* Details */}
          <div
            style={{ fontSize: 14, fontWeight: 600, color: c.char, marginBottom: 12 }}
          >
            Details
          </div>
          <div style={{ ...cardStyle, padding: 16, marginBottom: 16 }}>
            {[
              ["Date", fmtDateLong(txn.date)],
              ["Time", fmtTime(txn.date)],
              ["Category", cat.label],
              ["Card", txn.card ? "\u2022\u2022\u2022\u2022 " + txn.card : "\u2014"],
              ["Ref", txn.ref],
            ].map(([label, val], i, arr) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom:
                    i < arr.length - 1
                      ? `1px solid ${t.surfaceSubtle}`
                      : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 13, color: c.char, fontWeight: 500 }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Transparency */}
          <div
            style={{ fontSize: 14, fontWeight: 600, color: c.char, marginBottom: 12 }}
          >
            Transparency
          </div>
          <div style={{ ...cardStyle, padding: 16, marginBottom: 16 }}>
            {transparencyRow(
              "Clearway charged",
              fmt(txn.clearwayFee)
            )}
            {transparencyRow(
              "Processing cost",
              "\u00a3" + txn.processingCost.toFixed(3)
            )}
            {transparencyRow(
              "Network fee",
              "\u00a3" + txn.networkFee.toFixed(2)
            )}
            <div
              style={{
                height: 1,
                background: t.surfaceSubtle,
                margin: "8px 0 12px",
              }}
            />
            <p
              style={{
                fontSize: 13,
                color: c.sage,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              We absorbed {"\u00a3"}
              {absorbed} on this transaction.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...btnOutline, flex: 1 }}>
              Flag Transaction
            </button>
            <button style={{ ...btnOutline, flex: 1 }}>
              Recategorize
            </button>
          </div>
        </div>
      </>
    );
  };

  /* ══════════════════════════════════════════════
     SCREEN: SEND MONEY
     ══════════════════════════════════════════════ */
  const renderSend = () => {
    const isValid = sendTo.trim() && sendAmount && parseFloat(sendAmount) > 0;
    return (
      <>
        {screenHeader("Send Money", () => go("dashboard"))}
        <div style={{ padding: 20 }}>
          {/* Recipient */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            To
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              borderRadius: 12,
              padding: "12px 16px",
              border: `1px solid ${c.bdr}`,
              marginBottom: 16,
            }}
          >
            {I.search()}
            <input
              type="text"
              placeholder="Search or enter name"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                fontFamily: ff,
                color: c.char,
                background: "transparent",
              }}
            />
          </div>

          {/* Recent Contacts */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#888",
              marginBottom: 8,
            }}
          >
            Recent
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {recentContacts.map((ct) => (
              <button
                key={ct.initials}
                onClick={() => setSendTo(ct.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: sendTo === ct.name ? `${c.forest}12` : "white",
                  border: `1px solid ${
                    sendTo === ct.name ? c.forest : c.bdr
                  }`,
                  borderRadius: 20,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontFamily: ff,
                  fontSize: 13,
                  fontWeight: 500,
                  color: c.char,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: c.sand,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.forest,
                  }}
                >
                  {ct.initials}
                </div>
                {ct.name}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            Amount
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "white",
              borderRadius: 12,
              padding: "12px 16px",
              border: `1px solid ${c.bdr}`,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600, color: c.char }}>
              {"\u00a3"}
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 20,
                fontWeight: 600,
                fontFamily: ff,
                color: c.char,
                background: "transparent",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#999",
              marginBottom: 20,
            }}
          >
            Available: {fmt(account.balance)}
          </div>

          {/* Reference */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            Reference (optional)
          </div>
          <input
            type="text"
            placeholder="Add a note"
            value={sendRef}
            onChange={(e) => setSendRef(e.target.value)}
            style={{
              width: "100%",
              background: "white",
              borderRadius: 12,
              padding: "12px 16px",
              border: `1px solid ${c.bdr}`,
              fontSize: 15,
              fontFamily: ff,
              color: c.char,
              outline: "none",
              marginBottom: 20,
              boxSizing: "border-box",
            }}
          />

          {/* Transparency note */}
          <div
            style={{
              ...cardStyle,
              padding: 16,
              marginBottom: 24,
            }}
          >
            {transparencyRow("Transfer fee", "\u00a30.00")}
            {transparencyRow("Clearway earns", "\u00a30.00")}
            {transparencyRow("Arrives", "Instant")}
          </div>

          {/* CTA */}
          <button
            style={{
              ...btnPrimary,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "default",
            }}
            disabled={!isValid}
          >
            Send{" "}
            {sendAmount
              ? "\u00a3" +
                parseFloat(sendAmount).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </button>
        </div>
      </>
    );
  };

  /* ══════════════════════════════════════════════
     SCREEN: TOP UP
     ══════════════════════════════════════════════ */
  const renderTopUp = () => {
    const isValid = topUpAmount && parseFloat(topUpAmount) > 0;
    return (
      <>
        {screenHeader("Top Up", () => go("dashboard"))}
        <div style={{ padding: 20 }}>
          {/* Amount */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            Amount
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "white",
              borderRadius: 12,
              padding: "12px 16px",
              border: `1px solid ${c.bdr}`,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600, color: c.char }}>
              {"\u00a3"}
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 20,
                fontWeight: 600,
                fontFamily: ff,
                color: c.char,
                background: "transparent",
              }}
            />
          </div>

          {/* Quick Amounts */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {[50, 100, 250, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setTopUpAmount(String(amt))}
                style={{
                  flex: 1,
                  minWidth: 70,
                  padding: "10px 0",
                  borderRadius: 10,
                  border: `1px solid ${
                    topUpAmount === String(amt) ? c.forest : c.bdr
                  }`,
                  background:
                    topUpAmount === String(amt) ? `${c.forest}10` : "white",
                  fontSize: 14,
                  fontWeight: 600,
                  color: c.char,
                  cursor: "pointer",
                  fontFamily: ff,
                }}
              >
                {"\u00a3"}
                {amt}
              </button>
            ))}
          </div>

          {/* Source */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: c.char,
              marginBottom: 8,
            }}
          >
            From
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
              borderRadius: 12,
              padding: "14px 16px",
              border: `1px solid ${c.bdr}`,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#0e3f8c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                B
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: c.char }}>
                Barclays {"\u2022\u2022\u2022\u2022"}7392
              </span>
            </div>
            <span style={{ fontSize: 14, color: "#999" }}>{"\u25bc"}</span>
          </div>

          {/* Transparency */}
          <div
            style={{
              ...cardStyle,
              padding: 16,
              marginBottom: 24,
            }}
          >
            {transparencyRow("Transfer fee", "\u00a30.00")}
            {transparencyRow("Arrives", "Instant")}
            {transparencyRow("Allocated in", "<24 hrs")}
            <div
              style={{
                height: 1,
                background: t.surfaceSubtle,
                margin: "8px 0 12px",
              }}
            />
            <p
              style={{
                fontSize: 12,
                color: c.sage,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Your deposit will appear in Glass Ledger within 24 hours of
              arrival.
            </p>
          </div>

          {/* CTA */}
          <button
            style={{
              ...btnPrimary,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "default",
            }}
            disabled={!isValid}
          >
            Top Up{" "}
            {topUpAmount
              ? "\u00a3" +
                parseFloat(topUpAmount).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </button>
        </div>
      </>
    );
  };

  /* ══════════════════════════════════════════════
     SCREEN: CARDS (placeholder)
     ══════════════════════════════════════════════ */
  const renderCards = () => (
    <>
      {screenHeader("Cards", () => go("dashboard"))}
      <div style={{ padding: 20, textAlign: "center" }}>
        <div
          style={{
            background: t.cardGradient,
            borderRadius: 16,
            padding: 24,
            color: c.cream,
            maxWidth: 340,
            margin: "24px auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {"\u25ce"} Clearway
            </span>
            {I.contactless()}
          </div>
          <div style={{ fontSize: 18, letterSpacing: "3px", marginBottom: 20 }}>
            {"\u2022\u2022\u2022\u2022"} {"\u2022\u2022\u2022\u2022"}{" "}
            {"\u2022\u2022\u2022\u2022"} {user.card.last4}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            <span style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}>
              {user.name}
            </span>
            <span>{user.card.expiry}</span>
          </div>
        </div>
        <div
          style={{ display: "flex", gap: 12, justifyContent: "center" }}
        >
          <button style={{ ...btnOutline, flex: "0 1 160px" }}>
            Freeze Card
          </button>
          <button style={{ ...btnOutline, flex: "0 1 160px" }}>
            Card PIN
          </button>
        </div>
      </div>
    </>
  );

  /* ══════════════════════════════════════════════
     SCREEN: PROFILE (placeholder)
     ══════════════════════════════════════════════ */
  const renderProfile = () => {
    const items = [
      "Personal Details",
      "Linked Accounts",
      "Security",
      "Notifications",
      "Transparency Preferences",
      "Community & Governance",
      "Support",
    ];
    return (
      <>
        {screenHeader("Profile", () => go("dashboard"))}
        <div style={{ padding: 20 }}>
          {/* Profile Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: c.forest,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: c.cream,
              }}
            >
              {user.initials}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.char }}>
                {user.name}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                Architect tier {"\u00b7"} Member since Mar 2025
              </div>
            </div>
          </div>
          <div style={cardStyle}>
            {items.map((item, i) => (
              <div
                key={item}
                style={{
                  padding: "16px",
                  borderBottom:
                    i < items.length - 1
                      ? `1px solid ${t.surfaceSubtle}`
                      : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 15, color: c.char }}>{item}</span>
                <span style={{ fontSize: 14, color: "#ccc" }}>
                  {"\u203a"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  /* ══════════════════════════════════════════════
     BOTTOM NAV
     ══════════════════════════════════════════════ */
  const renderBottomNav = () => {
    const tabs = [
      { id: "home", icon: I.home, label: "Home", screen: "dashboard" },
      { id: "ledger", icon: I.chart, label: "Ledger", screen: "ledger" },
      { id: "cards", icon: I.card, label: "Cards", screen: "cards" },
      { id: "profile", icon: I.person, label: "Profile", screen: "profile" },
    ];
    return (
      <div
        data-r="mobile-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "white",
          boxShadow: t.shadowNav,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => go(tab.screen)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 0",
                position: "relative",
              }}
            >
              {active && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: c.forest,
                  }}
                />
              )}
              {tab.icon(active ? c.forest : "#999")}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: active ? c.forest : "#999",
                  fontFamily: ff,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  /* ══════════════════════════════════════════════
     DESKTOP TOP NAV
     ══════════════════════════════════════════════ */
  const renderDesktopNav = () => (
    <div
      data-r="desktop-nav"
      style={{
        display: "none",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 64,
        background: "white",
        borderBottom: `1px solid ${c.bdr}`,
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
        <span>{"\u25ce"}</span> Clearway
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {[
          { label: "Home", screen: "dashboard", id: "home" },
          { label: "Ledger", screen: "ledger", id: "ledger" },
          { label: "Cards", screen: "cards", id: "cards" },
          { label: "Profile", screen: "profile", id: "profile" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => go(item.screen)}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: activeTab === item.id ? 600 : 400,
              color: activeTab === item.id ? c.forest : "#888",
              cursor: "pointer",
              fontFamily: ff,
              borderBottom:
                activeTab === item.id
                  ? `2px solid ${c.forest}`
                  : "2px solid transparent",
              padding: "20px 0",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            position: "relative",
            display: "flex",
          }}
        >
          {I.bell(c.char)}
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: c.negative,
            }}
          />
        </button>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: c.forest,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: c.cream,
          }}
        >
          {user.initials}
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════
     SCREEN ROUTER
     ══════════════════════════════════════════════ */
  const renderScreen = () => {
    switch (screen) {
      case "ledger":
        return renderLedger();
      case "detail":
        return renderDetail();
      case "send":
        return renderSend();
      case "topup":
        return renderTopUp();
      case "cards":
        return renderCards();
      case "profile":
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <div
      style={{
        fontFamily: ff,
        color: c.char,
        background: c.cream,
        minHeight: "100vh",
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] { -moz-appearance: textfield; }
        @media (min-width: 768px) {
          [data-r="desktop-nav"]  { display: flex !important; }
          [data-r="mobile-nav"]   { display: none !important; }
          [data-r="mobile-topbar"]{ display: none !important; }
        }
        @media (max-width: 767px) {
          [data-r="desktop-nav"]  { display: none !important; }
        }
      `}</style>

      {renderDesktopNav()}

      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          paddingBottom: 80,
        }}
      >
        {renderScreen()}
      </div>

      {renderBottomNav()}
    </div>
  );
}
