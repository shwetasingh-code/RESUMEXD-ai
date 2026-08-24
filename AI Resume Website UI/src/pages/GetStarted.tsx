import { useState } from "react";
import { ArrowRightIcon, CheckIcon, UploadIcon } from "../components/Icons";

interface Props {
  onNavigate: (page: string) => void;
}

const steps = [
  { id: 1, key: "add-resume", label: "Add Resume", page: "resume-analyzer" },
  { id: 2, key: "job-desc", label: "Job Description", page: "job-match" },
  { id: 3, key: "ai-analysis", label: "AI Analysis", page: "resume-analyzer" },
];

export default function GetStarted({ onNavigate }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setUploadedFile("Arav_Kumar_Resume_2024.pdf");
  };

  const runAnalysis = () => {
    setAnalysisRunning(true);
    setTimeout(() => {
      setAnalysisRunning(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; ONBOARDING
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
          Welcome, Arav! 👋
        </h1>
        <p className="text-base" style={{ color: "#475569" }}>
          Three quick steps to unlock your AI-powered resume intelligence.{" "}
          <span style={{ color: "#94a3b8" }}>Let's get you match-ready.</span>
        </p>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-0 mb-10">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(i)}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all"
                style={
                  i < currentStep
                    ? { background: "#22c55e", color: "white" }
                    : i === currentStep
                    ? { background: "#2563eb", color: "white" }
                    : { background: "#e2e8f0", color: "#94a3b8" }
                }
              >
                {i < currentStep ? <CheckIcon size={12} color="white" /> : `0${step.id}`}
              </div>
              <span className="text-sm font-semibold" style={{ color: i === currentStep ? "#0f172a" : "#94a3b8" }}>
                {step.label}
              </span>
            </button>
            {i < 2 && <div className="w-12 h-px mx-4" style={{ background: "#e2e8f0" }} />}
          </div>
        ))}
      </div>

      {/* Step panels */}
      {currentStep === 0 && (
        <StepCard title="Add Your Resume" step="01">
          {!uploadedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer"
              style={{ borderColor: dragOver ? "#2563eb" : "#cbd5e1", background: dragOver ? "#eff6ff" : "#f8fafc" }}
              onClick={() => setUploadedFile("Arav_Kumar_Resume_2024.pdf")}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl" style={{ background: "#dbeafe" }}>
                <UploadIcon size={28} color="#2563eb" />
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1" style={{ color: "#0f172a" }}>Drop your resume here</p>
                <p className="text-sm" style={{ color: "#94a3b8" }}>PDF or DOCX · Max 10MB</p>
              </div>
              <button className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "#2563eb" }}>
                Browse Files
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #86efac" }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ background: "#dcfce7" }}>
                <CheckIcon size={18} color="#16a34a" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: "#15803d" }}>{uploadedFile}</p>
                <p className="text-xs" style={{ color: "#4ade80" }}>Uploaded successfully · 248 KB</p>
              </div>
              <button onClick={() => setUploadedFile(null)} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#dcfce7", color: "#15803d" }}>
                Replace
              </button>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => uploadedFile && setCurrentStep(1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity"
              style={{ background: uploadedFile ? "#2563eb" : "#cbd5e1", cursor: uploadedFile ? "pointer" : "not-allowed" }}
            >
              Next Step <ArrowRightIcon size={15} color="white" />
            </button>
          </div>
        </StepCard>
      )}

      {currentStep === 1 && (
        <StepCard title="Add Job Description" step="02">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: "#64748b" }}>Job Title</label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{ border: "1.5px solid #e2e8f0", background: "#fff", color: "#0f172a" }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: "#64748b" }}>Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, Stripe, Vercel"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{ border: "1.5px solid #e2e8f0", background: "#fff", color: "#0f172a" }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{ color: "#64748b" }}>Job Description</label>
              <textarea
                rows={8}
                placeholder="Paste the full job description here..."
                defaultValue={JOB_DESC_PLACEHOLDER}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none leading-relaxed transition-all"
                style={{ border: "1.5px solid #e2e8f0", background: "#fff", color: "#0f172a" }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setCurrentStep(0)} className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f1f5f9", color: "#475569" }}>
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "#2563eb" }}
            >
              Run AI Analysis <ArrowRightIcon size={15} color="white" />
            </button>
          </div>
        </StepCard>
      )}

      {currentStep === 2 && (
        <StepCard title="AI Analysis" step="03">
          {!analysisComplete ? (
            <div className="flex flex-col items-center gap-6 py-10">
              {analysisRunning ? (
                <>
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-bold text-sm">AI</div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold mb-1" style={{ color: "#0f172a" }}>Analyzing your resume…</p>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>Checking ATS compatibility, keywords, and job fit</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl" style={{ background: "#eff6ff" }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M10 16l4 4 8-8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold mb-1" style={{ color: "#0f172a" }}>Ready to analyze</p>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>Resume and job description are loaded. Click below to run the full AI analysis.</p>
                  </div>
                  <button
                    onClick={runAnalysis}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)" }}
                  >
                    Run AI Analysis
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 rounded-xl" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
                <div>
                  <p className="text-3xl font-bold" style={{ color: "#2563eb", fontFamily: "'DM Sans',sans-serif" }}>84<span className="text-lg">%</span></p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "#1d4ed8" }}>Overall Match Score</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#dbeafe", color: "#1d4ed8" }}>Strong Match</span>
                  <p className="text-xs mt-1" style={{ color: "#64748b" }}>vs. Senior Frontend Engineer @ Stripe</p>
                </div>
              </div>
              {[
                { label: "ATS Compatibility", score: 91, color: "#22c55e" },
                { label: "Keyword Coverage", score: 78, color: "#f59e0b" },
                { label: "Experience Relevance", score: 88, color: "#22c55e" },
                { label: "Skills Alignment", score: 82, color: "#22c55e" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <span className="w-44 text-sm font-medium shrink-0" style={{ color: "#475569" }}>{m.label}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "#e2e8f0" }}>
                    <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${m.score}%`, background: m.color }} />
                  </div>
                  <span className="w-10 text-right text-sm font-bold" style={{ color: "#0f172a" }}>{m.score}%</span>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => onNavigate("resume-analyzer")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#2563eb" }}>
                  View Full Analysis →
                </button>
                <button onClick={() => onNavigate("job-match")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f1f5f9", color: "#475569" }}>
                  Job Match Details →
                </button>
              </div>
            </div>
          )}
          {!analysisComplete && (
            <div className="flex justify-start mt-6">
              <button onClick={() => setCurrentStep(1)} className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#f1f5f9", color: "#475569" }}>
                ← Back
              </button>
            </div>
          )}
        </StepCard>
      )}

      {/* Quick action cards */}
      {currentStep === 0 && (
        <div className="grid grid-cols-3 gap-5 mt-8">
          {[
            { step: "STEP 01", title: "Add Resume", desc: "Upload your resume to get started.", color: "#2563eb", bg: "#eff6ff", active: true, to: 0 },
            { step: "STEP 02", title: "Job Description", desc: "Add the job you're targeting.", color: "#94a3b8", bg: "#f8fafc", active: false, to: 1 },
            { step: "STEP 03", title: "AI Analysis", desc: "Get AI insights and match score.", color: "#94a3b8", bg: "#f8fafc", active: false, to: 2 },
          ].map((c) => (
            <QuickCard key={c.step} {...c} onClick={() => setCurrentStep(c.to)} />
          ))}
        </div>
      )}

      {/* Tip */}
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm mt-8" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <span className="text-base">💡</span>
        <span style={{ color: "#1e40af" }}>
          <strong>Tip:</strong> Complete all steps to get the most accurate AI insights.
        </span>
      </div>
    </div>
  );
}

function StepCard({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-7" style={{ background: "#fff", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 12px rgba(15,23,42,0.06)" }}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-md" style={{ background: "#eff6ff", color: "#2563eb" }}>
          STEP {step}
        </span>
        <h2 className="text-lg font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function QuickCard({ step, title, desc, color, bg, active, onClick }: {
  step: string; title: string; desc: string; color: string; bg: string; active: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left flex flex-col p-5 rounded-2xl transition-all duration-200"
      style={{
        background: "#fff",
        border: `1.5px solid ${active ? "#2563eb" : hovered ? "#bfdbfe" : "#e2e8f0"}`,
        boxShadow: hovered ? "0 6px 20px rgba(37,99,235,0.08)" : "0 1px 4px rgba(15,23,42,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <span className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color }}>
        {step}
      </span>
      <div className="flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ background: bg }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="11" height="15" rx="1.5" stroke={color} strokeWidth="1.3" />
          <path d="M6 6h6M6 9h6M6 12h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-bold mb-1" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{title}</p>
      <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{desc}</p>
    </button>
  );
}

const JOB_DESC_PLACEHOLDER = `We're looking for a Senior Frontend Engineer to join our platform team.

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
