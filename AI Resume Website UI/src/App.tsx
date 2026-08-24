
import { useState, useEffect } from "react";
import {
  HomeIcon, DocumentIcon, SearchIcon, BriefcaseIcon,
  ChartBarIcon, ShieldCheckIcon, SparklesIcon, BellIcon, UserIcon,
} from "./components/Icons";
import GetStarted from "./pages/GetStarted";
import MyResume from "./pages/MyResume";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobMatch from "./pages/JobMatch";
import SkillsAnalysis from "./pages/SkillsAnalysis";
import TruthVerify from "./pages/TruthVerify";
import Impact from "./pages/Impact";

type Page = "get-started" | "my-resume" | "resume-analyzer" | "job-match" | "skills-analysis" | "truth-verify" | "impact";

const NAV_ITEMS: { id: Page; label: string; icon: React.FC<{ size?: number; color?: string }>; badge?: string }[] = [
  { id: "get-started", label: "Get Started", icon: HomeIcon },
  { id: "my-resume", label: "My Resume", icon: DocumentIcon },
  { id: "resume-analyzer", label: "Resume Analyzer", icon: SearchIcon },
  { id: "job-match", label: "Job Match", icon: BriefcaseIcon },
  { id: "skills-analysis", label: "Skills Analysis", icon: ChartBarIcon },
  { id: "truth-verify", label: "Truth & Code Verify", icon: ShieldCheckIcon, badge: "AI" },
  { id: "impact", label: "Impact", icon: SparklesIcon },
];

export default function App() {
  const [page, setPage] = useState<Page>("get-started");
  const [notifOpen, setNotifOpen] = useState(false);

  // Tab Title Fix
  useEffect(() => {
    document.title = "ResumeXD - AI Resume Builder";
  }, []);

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden" style={{ fontFamily: "'Inter',sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside className="flex flex-col w-64 shrink-0" style={{ borderRight: "1px solid #e2e8f0", background: "#ffffff" }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5" style={{ borderBottom: "1px solid #e2e8f0" }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "#2563eb" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="1" width="10" height="13" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="4" y="4" width="6" height="1" rx="0.5" fill="#2563eb" />
              <rect x="4" y="6.5" width="6" height="1" rx="0.5" fill="#2563eb" />
              <rect x="4" y="9" width="4" height="1" rx="0.5" fill="#2563eb" />
              <circle cx="12.5" cy="12.5" r="3" fill="#2563eb" />
              <path d="M11.5 12.5h2M12.5 11.5v2" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>
            ResumeXD
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => {
            const active = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  background: active ? "#eff6ff" : "transparent",
                  color: active ? "#2563eb" : "#475569",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <Icon size={16} color={active ? "#2563eb" : "#94a3b8"} />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "#dbeafe", color: "#2563eb", letterSpacing: "0.04em" }}>
                    {badge}
                  </span>
                )}
                {active && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#2563eb" }} />}
              </button>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold shrink-0"
              style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}
            >
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>Arav Kumar</p>
              <p className="text-xs truncate" style={{ color: "#94a3b8" }}>arav@resumexd.io</p>
            </div>
            <button className="w-6 h-6 flex items-center justify-center rounded" style={{ color: "#94a3b8" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="3" r="1" fill="currentColor" />
                <circle cx="7" cy="7" r="1" fill="currentColor" />
                <circle cx="7" cy="11" r="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-3.5 shrink-0" style={{ borderBottom: "1px solid #e2e8f0", background: "#ffffff" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase" style={{ color: "#94a3b8" }}>
            <span style={{ color: "#0f172a" }}>ResumeXD</span>
            <span>›</span>
            <span>{NAV_ITEMS.find((n) => n.id === page)?.label ?? "—"}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ border: "1px solid #e2e8f0" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#f8fafc")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              <BellIcon size={15} color="#475569" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#2563eb" }} />
            </button>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ border: "1px solid #e2e8f0" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#f8fafc")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              <UserIcon size={15} color="#475569" />
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div
                className="absolute top-12 right-0 w-72 rounded-2xl z-50 py-1"
                style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 12px 32px rgba(15,23,42,0.12)" }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Notifications</p>
                </div>
                {[
                  { text: "Stripe viewed your resume", time: "2h ago", dot: "#2563eb" },
                  { text: "AI analysis complete for Job Match", time: "5h ago", dot: "#22c55e" },
                  { text: "New match: Linear — 91% fit", time: "Yesterday", dot: "#f59e0b" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.dot }} />
                    <div>
                      <p className="text-sm" style={{ color: "#0f172a" }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto px-8 py-8"
          style={{ background: "#f8fafc" }}
          onClick={() => notifOpen && setNotifOpen(false)}
        >
          {page === "get-started" && <GetStarted onNavigate={navigate} />}
          {page === "my-resume" && <MyResume />}
          {page === "resume-analyzer" && <ResumeAnalyzer />}
          {page === "job-match" && <JobMatch />}
          {page === "skills-analysis" && <SkillsAnalysis />}
          {page === "truth-verify" && <TruthVerify />}
          {page === "impact" && <Impact />}
        </main>
      </div>
    </div>
  );
}

```

GitHub par save hote hi Vercel builds activate kar dega aur tab ka name change ho jayega!
