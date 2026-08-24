import { useState } from "react";

const DEMO_JD = `We're looking for a Senior Frontend Engineer to join our platform team.

Requirements:
• 4+ years of experience with React and TypeScript
• Strong understanding of web performance optimization
• Experience with REST APIs and GraphQL
• Familiarity with CI/CD pipelines and testing (Jest, Playwright)
• Experience with Tailwind CSS or similar utility-first frameworks

Nice to have:
• Contributions to open-source projects
• Experience with Next.js or Remix
• Knowledge of accessibility standards (WCAG 2.1)`;

const DEMO_RESUME = `Arav Kumar — Senior Frontend Engineer
arav@resumexd.io · github.com/aravkumar

EXPERIENCE
Frontend Engineer · Razorpay (Jan 2023 – Present)
• Led migration of checkout UI to React 18, improving LCP by 40%
• Built real-time dashboard with TypeScript and GraphQL
• Integrated CI/CD pipeline, reducing deploy time by 60%

Software Engineer · Groww (Jul 2021 – Dec 2022)
• Built investment flows with 99.9% uptime SLA
• Reduced bundle size 35% using code splitting
• Wrote Jest tests raising coverage from 20% to 78%

SKILLS
React · TypeScript · Next.js · Node.js · GraphQL · REST API · Tailwind CSS · Jest · Git · PostgreSQL`;

interface MatchResult {
  overall: number;
  breakdown: { label: string; score: number; color: string }[];
  matched: string[];
  missing: string[];
  suggestions: string[];
}

export default function JobMatch() {
  const [jd, setJd] = useState(DEMO_JD);
  const [resume, setResume] = useState(DEMO_RESUME);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runMatch = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        overall: 84,
        breakdown: [
          { label: "Technical Skills", score: 90, color: "#22c55e" },
          { label: "Experience Level", score: 85, color: "#22c55e" },
          { label: "Keyword Coverage", score: 78, color: "#f59e0b" },
          { label: "Role Alignment", score: 88, color: "#22c55e" },
          { label: "Nice-to-Haves", score: 67, color: "#f59e0b" },
        ],
        matched: ["React", "TypeScript", "GraphQL", "REST API", "Jest", "CI/CD", "Tailwind CSS", "Next.js"],
        missing: ["Playwright", "Accessibility (WCAG 2.1)", "Open-source contributions"],
        suggestions: [
          "Mention Playwright in your testing stack — it's listed as a requirement.",
          "Add a line about WCAG 2.1 compliance work if applicable.",
          "Link your GitHub to demonstrate open-source contributions.",
          "Highlight Next.js experience more prominently in your summary.",
        ],
      });
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; JOB MATCH
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
          Job Match
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Paste a job description and your resume to calculate your fit score</p>
      </div>

      {!result ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#2563eb" }} />
                <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Job Description</p>
              </div>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={14}
                className="w-full text-sm leading-relaxed outline-none resize-none"
                style={{ color: "#475569", background: "transparent" }}
                placeholder="Paste the job description here…"
              />
            </div>
            <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Your Resume</p>
              </div>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                rows={14}
                className="w-full text-sm leading-relaxed outline-none resize-none"
                style={{ color: "#475569", background: "transparent" }}
                placeholder="Paste your resume text here…"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={runMatch}
              disabled={loading || !jd.trim() || !resume.trim()}
              className="flex items-center gap-2.5 px-10 py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calculating Match…
                </>
              ) : (
                "Calculate Match Score →"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Score hero */}
          <div className="rounded-2xl p-7 flex items-center gap-8" style={{ background: "linear-gradient(135deg,#eff6ff,#f0f9ff)", border: "1.5px solid #bfdbfe" }}>
            <div className="relative w-28 h-28 shrink-0">
              <svg width="112" height="112" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="46" fill="none" stroke="#dbeafe" strokeWidth="8" />
                <circle
                  cx="56" cy="56" r="46" fill="none" stroke="#2563eb"
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(result.overall / 100) * 289} 289`}
                  strokeDashoffset="72.25"
                  transform="rotate(-90 56 56)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#1d4ed8" }}>{result.overall}%</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>Strong Match</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#2563eb", color: "white" }}>84%</span>
              </div>
              <p className="text-sm mb-4" style={{ color: "#475569" }}>Your profile is a strong fit for this role. A few targeted improvements could push you to 92%+.</p>
              <div className="flex gap-3">
                <button onClick={() => setResult(null)} className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: "#fff", border: "1px solid #bfdbfe", color: "#2563eb" }}>
                  Try Another Role
                </button>
                <button className="px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "#2563eb" }}>
                  Optimize Resume →
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Breakdown */}
            <div className="col-span-1 rounded-2xl p-5 space-y-3" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>Score Breakdown</p>
              {result.breakdown.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "#475569" }}>{b.label}</span>
                    <span className="text-xs font-bold" style={{ color: b.color }}>{b.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${b.score}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Matched & Missing */}
            <div className="col-span-1 rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>Skills Matched</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {result.matched.map((k) => (
                  <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #86efac" }}>
                    ✓ {k}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>Gaps</p>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((k) => (
                  <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}>
                    ✕ {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="col-span-1 rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#0f172a" }}>AI Suggestions</p>
              <div className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-2.5 text-xs leading-relaxed" style={{ color: "#475569" }}>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5" style={{ background: "#eff6ff", color: "#2563eb" }}>
                      {i + 1}
                    </span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
