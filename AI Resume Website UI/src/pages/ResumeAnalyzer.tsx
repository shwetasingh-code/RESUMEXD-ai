import { useState } from "react";
import { UploadIcon, CheckIcon } from "../components/Icons";

const KEYWORDS_FOUND = ["React", "TypeScript", "Node.js", "GraphQL", "REST API", "CI/CD", "Jest", "Agile", "Git", "PostgreSQL"];
const KEYWORDS_MISSING = ["Kubernetes", "Terraform", "AWS Lambda", "Redis", "Playwright"];

const SECTIONS = [
  { label: "ATS Compatibility", score: 91, max: 100, color: "#22c55e", detail: "Your resume passes all ATS parsing checks." },
  { label: "Formatting & Structure", score: 87, max: 100, color: "#22c55e", detail: "Clean single-column layout with proper heading hierarchy." },
  { label: "Keyword Density", score: 78, max: 100, color: "#f59e0b", detail: "5 high-priority keywords are missing from the target JD." },
  { label: "Action Verbs", score: 94, max: 100, color: "#22c55e", detail: "Strong use of quantified action verbs throughout." },
  { label: "Readability", score: 89, max: 100, color: "#22c55e", detail: "Sentence length and vocabulary score well." },
  { label: "Length & Density", score: 82, max: 100, color: "#22c55e", detail: "1-page format appropriate for your experience level." },
];

export default function ResumeAnalyzer() {
  const [uploaded, setUploaded] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "suggestions">("overview");

  const overall = Math.round(SECTIONS.reduce((s, x) => s + x.score, 0) / SECTIONS.length);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; RESUME ANALYZER
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
          Resume Analyzer
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>AI-powered ATS analysis and optimization recommendations</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Upload zone */}
        <div className="col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
            <p className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>Upload Resume</p>
            {!uploaded ? (
              <div
                onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => setUploaded(true)}
                className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all"
                style={{ borderColor: dragOver ? "#2563eb" : "#cbd5e1", background: dragOver ? "#eff6ff" : "#f8fafc" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#dbeafe" }}>
                  <UploadIcon size={20} color="#2563eb" />
                </div>
                <p className="text-xs text-center" style={{ color: "#64748b" }}>Drop PDF/DOCX here or click to browse</p>
                <span className="text-xs" style={{ color: "#94a3b8" }}>Max 10 MB</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#dcfce7" }}>
                    <CheckIcon size={14} color="#16a34a" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#15803d" }}>Arav_Kumar_Resume.pdf</p>
                    <p className="text-[10px]" style={{ color: "#4ade80" }}>248 KB · Parsed successfully</p>
                  </div>
                </div>
                <button onClick={() => setUploaded(false)} className="w-full py-2 rounded-lg text-xs font-medium" style={{ background: "#f1f5f9", color: "#475569" }}>
                  Replace File
                </button>
              </div>
            )}

            {/* Overall score */}
            <div className="mt-5 pt-5 border-t" style={{ borderColor: "#f1f5f9" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#64748b" }}>Overall ATS Score</p>
              <div className="flex items-center justify-center">
                <div className="relative w-28 h-28">
                  <svg width="112" height="112" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="46" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle
                      cx="56" cy="56" r="46" fill="none"
                      stroke={overall >= 85 ? "#22c55e" : "#f59e0b"}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(overall / 100) * 289} 289`}
                      strokeDashoffset="72.25"
                      transform="rotate(-90 56 56)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{overall}</span>
                    <span className="text-xs" style={{ color: "#94a3b8" }}>/ 100</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#dcfce7", color: "#15803d" }}>
                  Strong Resume
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis panel */}
        <div className="col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#f1f5f9" }}>
            {(["overview", "keywords", "suggestions"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                style={{
                  background: activeTab === t ? "#fff" : "transparent",
                  color: activeTab === t ? "#0f172a" : "#64748b",
                  boxShadow: activeTab === t ? "0 1px 4px rgba(15,23,42,0.08)" : "none",
                }}
              >
                {t === "overview" ? "Overview" : t === "keywords" ? "Keywords" : "Suggestions"}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="rounded-2xl p-6 space-y-4" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              {SECTIONS.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>{s.label}</span>
                      <span className="text-xs ml-2" style={{ color: "#94a3b8" }}>{s.detail}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: s.color }}>{s.score}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#f1f5f9" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${s.score}%`, background: s.color, transition: "width 0.6s ease" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "keywords" && (
            <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Found ({KEYWORDS_FOUND.length})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {KEYWORDS_FOUND.map((k) => (
                    <span key={k} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #86efac" }}>
                      ✓ {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-5 border-t" style={{ borderColor: "#f1f5f9" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
                  <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Missing ({KEYWORDS_MISSING.length})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {KEYWORDS_MISSING.map((k) => (
                    <span key={k} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}>
                      ✕ {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="rounded-2xl p-6 space-y-3" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
              {[
                { priority: "High", title: "Add missing cloud keywords", desc: "Include 'Kubernetes' and 'AWS Lambda' in your skills or project descriptions to boost keyword coverage.", color: "#ef4444", bg: "#fef2f2" },
                { priority: "Medium", title: "Quantify impact in role #2", desc: "Add specific metrics to your Groww experience — e.g., revenue impact or user growth numbers.", color: "#f59e0b", bg: "#fef3c7" },
                { priority: "Medium", title: "Add a summary section", desc: "A 2-3 line professional summary at the top improves ATS parsing and recruiter readability.", color: "#f59e0b", bg: "#fef3c7" },
                { priority: "Low", title: "Standardize date format", desc: "Use 'Jan 2023 – Present' consistently. Avoid mixing 'January 2023' and '01/2023'.", color: "#2563eb", bg: "#eff6ff" },
              ].map((s) => (
                <div key={s.title} className="flex gap-4 p-4 rounded-xl" style={{ background: s.bg }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded self-start mt-0.5 shrink-0" style={{ background: s.color, color: "white" }}>
                    {s.priority}
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#0f172a" }}>{s.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
