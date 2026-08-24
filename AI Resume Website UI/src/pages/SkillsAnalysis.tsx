import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const RADAR_DATA = [
  { subject: "React/TS", you: 92, industry: 78 },
  { subject: "Backend", you: 70, industry: 82 },
  { subject: "DevOps", you: 58, industry: 70 },
  { subject: "System Design", you: 74, industry: 80 },
  { subject: "Testing", you: 82, industry: 68 },
  { subject: "UI/UX", you: 88, industry: 62 },
];

const BAR_DATA = [
  { skill: "React", you: 92, demand: 95 },
  { skill: "TypeScript", you: 88, demand: 90 },
  { skill: "Node.js", you: 72, demand: 85 },
  { skill: "GraphQL", you: 78, demand: 72 },
  { skill: "Docker", you: 60, demand: 80 },
  { skill: "AWS", you: 54, demand: 88 },
  { skill: "Testing", you: 82, demand: 75 },
  { skill: "Next.js", you: 86, demand: 82 },
];

const PROFICIENCY = [
  { skill: "React 18 & Hooks", level: 95, category: "Frontend", trend: "+8% demand" },
  { skill: "TypeScript", level: 90, category: "Frontend", trend: "+12% demand" },
  { skill: "Next.js", level: 86, category: "Frontend", trend: "+18% demand" },
  { skill: "GraphQL", level: 78, category: "API", trend: "+5% demand" },
  { skill: "Node.js / Express", level: 72, category: "Backend", trend: "+10% demand" },
  { skill: "PostgreSQL", level: 70, category: "Database", trend: "+7% demand" },
  { skill: "Docker", level: 60, category: "DevOps", trend: "+22% demand" },
  { skill: "AWS (EC2, S3, Lambda)", level: 54, category: "DevOps", trend: "+30% demand" },
  { skill: "Kubernetes", level: 32, category: "DevOps", trend: "+35% demand" },
  { skill: "Terraform", level: 24, category: "DevOps", trend: "+28% demand" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "API", "Database", "DevOps"];

function levelColor(l: number) {
  if (l >= 80) return "#22c55e";
  if (l >= 60) return "#2563eb";
  if (l >= 40) return "#f59e0b";
  return "#ef4444";
}
function levelLabel(l: number) {
  if (l >= 80) return "Expert";
  if (l >= 60) return "Proficient";
  if (l >= 40) return "Intermediate";
  return "Beginner";
}

export default function SkillsAnalysis() {
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"bars" | "radar" | "chart">("bars");

  const filtered = category === "All" ? PROFICIENCY : PROFICIENCY.filter((s) => s.category === category);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; SKILLS ANALYSIS
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
          Skills Analysis
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Your skill levels vs. industry demand for Senior Frontend Engineer roles</p>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        {[
          { label: "Top Skill", value: "React 18", sub: "95th percentile", color: "#22c55e", bg: "#f0fdf4" },
          { label: "Skills Tracked", value: "10", sub: "across 5 categories", color: "#2563eb", bg: "#eff6ff" },
          { label: "Market Gap", value: "DevOps", sub: "highest demand deficit", color: "#f59e0b", bg: "#fef3c7" },
          { label: "Avg Proficiency", value: "65%", sub: "vs 78% industry avg", color: "#0f172a", bg: "#f8fafc" },
        ].map((t) => (
          <div key={t.label} className="p-4 rounded-xl" style={{ background: t.bg, border: "1px solid #e2e8f0" }}>
            <p className="text-xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: t.color }}>{t.value}</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "#0f172a" }}>{t.label}</p>
            <p className="text-xs" style={{ color: "#94a3b8" }}>{t.sub}</p>
          </div>
        ))}
      </div>

      {/* View toggle + category filter */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: category === c ? "#2563eb" : "#f1f5f9",
                color: category === c ? "white" : "#475569",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#f1f5f9" }}>
          {(["bars", "radar", "chart"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize"
              style={{ background: view === v ? "#fff" : "transparent", color: view === v ? "#0f172a" : "#64748b", boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
            >
              {v === "bars" ? "Progress" : v === "radar" ? "Radar" : "Bar Chart"}
            </button>
          ))}
        </div>
      </div>

      {view === "bars" && (
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          {filtered.map((s) => (
            <div key={s.skill}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>{s.skill}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#64748b" }}>{s.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>{s.trend}</span>
                  <span className="text-xs font-bold w-16 text-right" style={{ color: levelColor(s.level) }}>
                    {levelLabel(s.level)}
                  </span>
                  <span className="text-sm font-bold w-8 text-right" style={{ color: "#0f172a" }}>{s.level}%</span>
                </div>
              </div>
              <div className="h-2.5 rounded-full" style={{ background: "#f1f5f9" }}>
                <div
                  className="h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${s.level}%`, background: levelColor(s.level) }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "radar" && (
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-5 mb-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#2563eb" }} /><span style={{ color: "#475569" }}>Your Skills</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#f59e0b" }} /><span style={{ color: "#475569" }}>Industry Average</span></div>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={RADAR_DATA} outerRadius="75%">
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748b" }} />
              <Radar name="You" dataKey="you" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Industry" dataKey="industry" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.08} strokeWidth={2} strokeDasharray="4 2" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === "chart" && (
        <div className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-5 mb-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#2563eb" }} /><span style={{ color: "#475569" }}>Your Level</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#f59e0b" }} /><span style={{ color: "#475569" }}>Market Demand</span></div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={BAR_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 10, boxShadow: "0 4px 16px rgba(15,23,42,0.1)", fontSize: 12 }}
                cursor={{ fill: "#f8fafc" }}
              />
              <Bar dataKey="you" name="Your Level" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="demand" name="Market Demand" fill="#fbbf24" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-5 rounded-2xl p-5" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "#1d4ed8" }}>📈 Growth Recommendations</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { skill: "Kubernetes", action: "Complete CKA certification", urgency: "High priority" },
            { skill: "AWS", action: "Build a serverless project with Lambda + S3", urgency: "High priority" },
            { skill: "Terraform", action: "Add IaC setup to one of your GitHub repos", urgency: "Medium" },
          ].map((r) => (
            <div key={r.skill} className="flex flex-col gap-1 p-3 rounded-xl" style={{ background: "#fff" }}>
              <span className="text-xs font-bold" style={{ color: "#0f172a" }}>{r.skill}</span>
              <span className="text-xs" style={{ color: "#475569" }}>{r.action}</span>
              <span className="text-[10px] font-semibold mt-1" style={{ color: "#2563eb" }}>{r.urgency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
