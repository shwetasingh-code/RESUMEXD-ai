import { useState } from "react";
import { EditIcon, EyeIcon, DownloadIcon, TrashIcon } from "../components/Icons";

const INITIAL_RESUMES = [
  {
    id: 1,
    name: "Senior Frontend Engineer — Stripe",
    updated: "Aug 18, 2026",
    score: 91,
    status: "Optimized",
    statusColor: "#22c55e",
    statusBg: "#dcfce7",
    pages: 1,
    tags: ["React", "TypeScript", "GraphQL"],
  },
  {
    id: 2,
    name: "Full Stack Developer — Vercel",
    updated: "Aug 14, 2026",
    score: 84,
    status: "Good",
    statusColor: "#2563eb",
    statusBg: "#dbeafe",
    pages: 2,
    tags: ["Next.js", "Node.js", "Postgres"],
  },
  {
    id: 3,
    name: "Software Engineer — Google",
    updated: "Aug 10, 2026",
    score: 76,
    status: "Needs Work",
    statusColor: "#f59e0b",
    statusBg: "#fef3c7",
    pages: 1,
    tags: ["Python", "Go", "Kubernetes"],
  },
  {
    id: 4,
    name: "Product Engineer — Linear",
    updated: "Aug 5, 2026",
    score: 88,
    status: "Good",
    statusColor: "#2563eb",
    statusBg: "#dbeafe",
    pages: 1,
    tags: ["React", "Rust", "Design Systems"],
  },
];

type Resume = typeof INITIAL_RESUMES[0];

export default function MyResume() {
  const [resumes, setResumes] = useState(INITIAL_RESUMES);
  const [preview, setPreview] = useState<Resume | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const deleteResume = (id: number) => {
    setResumes((r) => r.filter((x) => x.id !== id));
    showToast("Resume deleted.");
  };

  const download = (name: string) => showToast(`Downloading "${name}.pdf"…`);
  const edit = (name: string) => showToast(`Opening editor for "${name}"…`);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
            RESUMEXD &nbsp;›&nbsp; MY RESUME
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
            My Resumes
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} — all tailored with AI
          </p>
        </div>
        <button
          onClick={() => showToast("Opening resume builder…")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: "#2563eb" }}
        >
          + New Resume
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Resumes", value: resumes.length, sub: "across all targets" },
          { label: "Avg ATS Score", value: `${Math.round(resumes.reduce((s, r) => s + r.score, 0) / resumes.length)}%`, sub: "above 80% threshold" },
          { label: "Optimized", value: resumes.filter((r) => r.status === "Optimized").length, sub: "ready to apply" },
          { label: "Last Updated", value: "Aug 18", sub: "most recent edit" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl" style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{s.value}</p>
            <p className="text-xs font-semibold" style={{ color: "#64748b" }}>{s.label}</p>
            <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Resume list */}
      <div className="space-y-3">
        {resumes.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-5 p-5 rounded-2xl transition-all group"
            style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,23,42,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,23,42,0.04)")}
          >
            {/* Doc icon */}
            <div className="flex items-center justify-center w-12 h-14 rounded-lg shrink-0" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <rect x="1" y="1" width="14" height="20" rx="2" fill="white" stroke="#2563eb" strokeWidth="1.3" />
                <path d="M4 7h8M4 10h8M4 13h5" stroke="#93c5fd" strokeWidth="1.1" strokeLinecap="round" />
                <rect x="10" y="16" width="9" height="7" rx="1.5" fill="#2563eb" />
                <path d="M13 19l1.5 1.5L17 18" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm truncate" style={{ color: "#0f172a" }}>{r.name}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: r.statusBg, color: r.statusColor }}>
                  {r.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: "#94a3b8" }}>
                <span>Updated {r.updated}</span>
                <span>·</span>
                <span>{r.pages} page{r.pages > 1 ? "s" : ""}</span>
                <span>·</span>
                <div className="flex gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#475569" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-12 h-12">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="19" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="19" fill="none"
                    stroke={r.score >= 85 ? "#22c55e" : r.score >= 75 ? "#2563eb" : "#f59e0b"}
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(r.score / 100) * 119.4} 119.4`}
                    strokeDashoffset="29.85"
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: "#0f172a" }}>
                  {r.score}
                </span>
              </div>
              <span className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>ATS</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {[
                { icon: <EyeIcon size={14} color="#475569" />, label: "Preview", action: () => setPreview(r) },
                { icon: <EditIcon size={14} color="#475569" />, label: "Edit", action: () => edit(r.name) },
                { icon: <DownloadIcon size={14} color="#475569" />, label: "Download", action: () => download(r.name) },
                { icon: <TrashIcon size={14} color="#ef4444" />, label: "Delete", action: () => deleteResume(r.id), danger: true },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  title={btn.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                  style={{ background: "#f8fafc" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = btn.danger ? "#fef2f2" : "#eff6ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#f8fafc")}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(15,23,42,0.4)" }}>
          <div className="w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl" style={{ background: "#fff", boxShadow: "0 24px 64px rgba(15,23,42,0.18)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#e2e8f0" }}>
              <div>
                <p className="font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{preview.name}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>Preview · PDF</p>
              </div>
              <button onClick={() => setPreview(null)} className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: "#f1f5f9" }}>
                ✕
              </button>
            </div>
            <div className="p-8 space-y-6">
              <ResumePreviewContent name={preview.name} />
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-lg" style={{ background: "#0f172a" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

function ResumePreviewContent({ name }: { name: string }) {
  return (
    <div className="space-y-5 text-sm" style={{ color: "#0f172a", fontFamily: "'Inter',sans-serif" }}>
      <div className="text-center pb-4 border-b" style={{ borderColor: "#e2e8f0" }}>
        <h2 className="text-xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif" }}>Arav Kumar</h2>
        <p style={{ color: "#64748b" }}>arav@resumexd.io · +91 98765 43210 · linkedin.com/in/aravkumar · github.com/aravkumar</p>
        <p className="mt-1 font-medium" style={{ color: "#2563eb" }}>{name.split("—")[0].trim()}</p>
      </div>
      <Section title="EXPERIENCE">
        <Job title="Frontend Engineer" company="Razorpay · Bangalore" dates="Jan 2023 – Present" bullets={["Led migration of checkout UI to React 18, improving LCP by 40%", "Built real-time transaction dashboard serving 2M+ daily active users", "Mentored 3 junior engineers and conducted 50+ technical interviews"]} />
        <Job title="Software Engineer" company="Groww · Remote" dates="Jul 2021 – Dec 2022" bullets={["Developed mutual fund investment flows with 99.9% uptime SLA", "Reduced bundle size by 35% using code splitting and lazy loading", "Integrated Playwright for E2E test coverage from 20% to 78%"]} />
      </Section>
      <Section title="SKILLS">
        <p style={{ color: "#475569" }}>React · TypeScript · Next.js · Node.js · GraphQL · PostgreSQL · Docker · AWS · Tailwind CSS · Jest · Playwright</p>
      </Section>
      <Section title="EDUCATION">
        <p className="font-semibold">B.Tech Computer Science — IIT Delhi <span className="font-normal" style={{ color: "#64748b" }}>· 2017 – 2021 · CGPA 8.7/10</span></p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-widest uppercase mb-2 pb-1 border-b" style={{ color: "#2563eb", borderColor: "#dbeafe" }}>{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Job({ title, company, dates, bullets }: { title: string; company: string; dates: string; bullets: string[] }) {
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold">{title}</p>
        <p className="text-xs" style={{ color: "#94a3b8" }}>{dates}</p>
      </div>
      <p className="text-xs mb-1.5" style={{ color: "#64748b" }}>{company}</p>
      <ul className="space-y-0.5">
        {bullets.map((b, i) => <li key={i} className="text-xs" style={{ color: "#475569" }}>• {b}</li>)}
      </ul>
    </div>
  );
}
