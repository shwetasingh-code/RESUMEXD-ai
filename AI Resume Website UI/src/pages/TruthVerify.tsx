import { useState } from "react";
import { GithubIcon, LinkIcon, CheckIcon, XIcon } from "../components/Icons";

type Status = "verified" | "warning" | "failed" | "pending";

interface Claim {
  id: number;
  type: "github" | "link" | "text";
  claim: string;
  url?: string;
  status: Status;
  detail: string;
  badge?: string;
}

const INITIAL_CLAIMS: Claim[] = [
  {
    id: 1, type: "github", claim: "Led React 18 migration at Razorpay",
    url: "https://github.com/razorpay/checkout-ui",
    status: "verified",
    detail: "12 merged PRs referencing 'React 18 migration' found. LCP improvement metrics visible in PR descriptions.",
    badge: "12 PRs Found",
  },
  {
    id: 2, type: "github", claim: "Increased test coverage from 20% to 78%",
    url: "https://github.com/aravkumar/groww-frontend",
    status: "verified",
    detail: "Coverage reports in CI logs confirm 20% → 78% increase over 6-month period.",
    badge: "Coverage Logs Match",
  },
  {
    id: 3, type: "link", claim: "Open-source contributor to Next.js",
    url: "https://github.com/vercel/next.js",
    status: "warning",
    detail: "1 merged PR found (documentation fix). Impact may be overstated — consider rewording to 'contributed documentation improvements'.",
    badge: "1 PR (Minor)",
  },
  {
    id: 4, type: "github", claim: "Reduced bundle size by 35%",
    url: "https://github.com/aravkumar/portfolio",
    status: "failed",
    detail: "No public repository or PR found matching this claim. Consider linking to a specific commit or adding a measurable reference.",
    badge: "No Evidence Found",
  },
  {
    id: 5, type: "text", claim: "IIT Delhi B.Tech CGPA 8.7/10",
    status: "pending",
    detail: "Manual verification required — upload your transcript or degree certificate to validate.",
    badge: "Awaiting Document",
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "verified") return <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#dcfce7" }}><CheckIcon size={12} color="#16a34a" /></div>;
  if (status === "warning") return <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#fef3c7" }}><span style={{ color: "#d97706", fontSize: 12, fontWeight: 700 }}>!</span></div>;
  if (status === "failed") return <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#fef2f2" }}><XIcon size={12} color="#ef4444" /></div>;
  return <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#f1f5f9" }}><span style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700 }}>?</span></div>;
}

const STATUS_STYLE: Record<Status, { bg: string; border: string; text: string; badge: string; badgeBg: string }> = {
  verified: { bg: "#f0fdf4", border: "#86efac", text: "#15803d", badge: "Verified", badgeBg: "#dcfce7" },
  warning: { bg: "#fffbeb", border: "#fde68a", text: "#92400e", badge: "Review", badgeBg: "#fef3c7" },
  failed: { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b", badge: "Failed", badgeBg: "#fee2e2" },
  pending: { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", badge: "Pending", badgeBg: "#f1f5f9" },
};

export default function TruthVerify() {
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [newClaim, setNewClaim] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [verifying, setVerifying] = useState<number | null>(null);

  const counts = {
    verified: claims.filter((c) => c.status === "verified").length,
    warning: claims.filter((c) => c.status === "warning").length,
    failed: claims.filter((c) => c.status === "failed").length,
    pending: claims.filter((c) => c.status === "pending").length,
  };

  const addClaim = () => {
    if (!newClaim.trim()) return;
    const id = Date.now();
    setClaims((prev) => [
      ...prev,
      { id, type: "text", claim: newClaim, url: newUrl || undefined, status: "pending", detail: "Queued for AI verification…", badge: "Queued" },
    ]);
    setNewClaim("");
    setNewUrl("");
    setTimeout(() => {
      setVerifying(id);
      setTimeout(() => {
        setVerifying(null);
        setClaims((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status: "warning", detail: "Partial evidence found. Recommend adding supporting links or documents.", badge: "Review Needed" } : c
          )
        );
      }, 2000);
    }, 500);
  };

  const removeClaim = (id: number) => setClaims((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; TRUTH & CODE VERIFY
        </div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
            Truth & Code Verify
          </h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "#dbeafe", color: "#1d4ed8" }}>AI</span>
        </div>
        <p className="text-sm" style={{ color: "#64748b" }}>Verify resume claims against GitHub repositories, live links, and public profiles</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        {[
          { label: "Verified", count: counts.verified, color: "#22c55e", bg: "#f0fdf4" },
          { label: "Review Needed", count: counts.warning, color: "#f59e0b", bg: "#fef3c7" },
          { label: "Failed", count: counts.failed, color: "#ef4444", bg: "#fef2f2" },
          { label: "Pending", count: counts.pending, color: "#94a3b8", bg: "#f8fafc" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl text-center" style={{ background: s.bg, border: "1px solid #e2e8f0" }}>
            <p className="text-2xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: s.color }}>{s.count}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "#0f172a" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Claims */}
      <div className="space-y-3 mb-7">
        {claims.map((c) => {
          const st = STATUS_STYLE[c.status];
          const isVerifying = verifying === c.id;
          return (
            <div
              key={c.id}
              className="p-5 rounded-2xl transition-all"
              style={{ background: st.bg, border: `1.5px solid ${st.border}` }}
            >
              <div className="flex items-start gap-4">
                <StatusIcon status={c.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>{c.claim}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: st.badgeBg, color: st.text }}>
                      {isVerifying ? "Verifying…" : st.badge}
                    </span>
                    {c.badge && !isVerifying && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#fff", color: "#475569", border: "1px solid #e2e8f0" }}>
                        {c.badge}
                      </span>
                    )}
                  </div>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs mb-2 hover:underline"
                      style={{ color: "#2563eb" }}
                    >
                      {c.type === "github" ? <GithubIcon size={12} color="#2563eb" /> : <LinkIcon size={12} color="#2563eb" />}
                      {c.url}
                    </a>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
                    {isVerifying ? "Running AI verification against public repositories and links…" : c.detail}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {c.status === "pending" && !isVerifying && (
                    <button
                      onClick={() => {
                        setVerifying(c.id);
                        setTimeout(() => {
                          setVerifying(null);
                          setClaims((prev) => prev.map((x) => x.id === c.id ? { ...x, status: "warning", detail: "Partial evidence found. Consider linking to a GitHub commit or project.", badge: "Review Needed" } : x));
                        }, 2000);
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                      style={{ background: "#2563eb" }}
                    >
                      Verify
                    </button>
                  )}
                  {isVerifying && (
                    <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  )}
                  <button onClick={() => removeClaim(c.id)} className="w-7 h-7 flex items-center justify-center rounded-lg" style={{ background: "#fff" }}>
                    <XIcon size={12} color="#94a3b8" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add claim form */}
      <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
        <p className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>Add a New Claim to Verify</p>
        <div className="space-y-3">
          <input
            value={newClaim}
            onChange={(e) => setNewClaim(e.target.value)}
            placeholder="e.g. Reduced API latency by 60% using Redis caching"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="GitHub repo or project URL (optional)"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <button
            onClick={addClaim}
            disabled={!newClaim.trim()}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#2563eb", opacity: newClaim.trim() ? 1 : 0.5 }}
          >
            Add & Verify →
          </button>
        </div>
      </div>
    </div>
  );
}
