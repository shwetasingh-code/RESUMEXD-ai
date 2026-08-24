import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const VIEWS_DATA = [
  { week: "Jul 1", views: 12, applications: 3 },
  { week: "Jul 8", views: 18, applications: 5 },
  { week: "Jul 15", views: 24, applications: 6 },
  { week: "Jul 22", views: 31, applications: 8 },
  { week: "Jul 29", views: 28, applications: 7 },
  { week: "Aug 5", views: 42, applications: 11 },
  { week: "Aug 12", views: 56, applications: 14 },
  { week: "Aug 19", views: 63, applications: 16 },
];

const FUNNEL_DATA = [
  { stage: "Applied", count: 70, color: "#2563eb" },
  { stage: "Viewed", count: 52, color: "#3b82f6" },
  { stage: "Screened", count: 28, color: "#60a5fa" },
  { stage: "Interviews", count: 14, color: "#93c5fd" },
  { stage: "Offers", count: 3, color: "#22c55e" },
];

const PLATFORM_DATA = [
  { name: "LinkedIn", value: 38, color: "#0077b5" },
  { name: "Naukri", value: 21, color: "#f59e0b" },
  { name: "AngelList", value: 14, color: "#ef4444" },
  { name: "Direct", value: 27, color: "#8b5cf6" },
];

const RECENT_ACTIVITY = [
  { company: "Stripe", role: "Senior Frontend Engineer", date: "Aug 22, 2026", status: "Interview Scheduled", statusColor: "#22c55e", statusBg: "#dcfce7" },
  { company: "Notion", role: "Product Engineer", date: "Aug 20, 2026", status: "Application Viewed", statusColor: "#2563eb", statusBg: "#dbeafe" },
  { company: "Linear", role: "Frontend Engineer", date: "Aug 18, 2026", status: "Offer Received", statusColor: "#16a34a", statusBg: "#bbf7d0" },
  { company: "Figma", role: "Software Engineer", date: "Aug 15, 2026", status: "Phone Screen", statusColor: "#7c3aed", statusBg: "#ede9fe" },
  { company: "Vercel", role: "DX Engineer", date: "Aug 12, 2026", status: "Rejected", statusColor: "#ef4444", statusBg: "#fef2f2" },
  { company: "Supabase", role: "Full Stack Engineer", date: "Aug 8, 2026", status: "No Response", statusColor: "#94a3b8", statusBg: "#f1f5f9" },
];

export default function Impact() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#94a3b8" }}>
          RESUMEXD &nbsp;›&nbsp; IMPACT
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a", letterSpacing: "-0.02em" }}>
          Impact Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Track your application performance, interview conversion, and response rates</p>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-5 gap-4 mb-7">
        {[
          { label: "Resume Views", value: "274", delta: "+18% this week", up: true },
          { label: "Applications Sent", value: "70", delta: "+5 this week", up: true },
          { label: "Response Rate", value: "24%", delta: "+3pts vs last month", up: true },
          { label: "Interviews", value: "14", delta: "4 upcoming", up: true },
          { label: "Offers", value: "3", delta: "2 pending decision", up: true },
        ].map((k) => (
          <div key={k.label} className="p-4 rounded-xl" style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(15,23,42,0.04)" }}>
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'DM Sans',sans-serif", color: "#0f172a" }}>{k.value}</p>
            <p className="text-xs font-semibold" style={{ color: "#64748b" }}>{k.label}</p>
            <p className="text-[10px] mt-1 font-medium" style={{ color: "#22c55e" }}>↑ {k.delta}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Views area chart */}
        <div className="col-span-2 rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Views & Applications</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>Last 8 weeks</p>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: "#2563eb" }} />Views</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: "#22c55e" }} />Applied</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={VIEWS_DATA}>
              <defs>
                <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="views" name="Views" stroke="#2563eb" strokeWidth={2} fill="url(#gViews)" />
              <Area type="monotone" dataKey="applications" name="Applications" stroke="#22c55e" strokeWidth={2} fill="url(#gApps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — platform */}
        <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0f172a" }}>By Platform</p>
          <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>Application source breakdown</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={PLATFORM_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" paddingAngle={3}>
                {PLATFORM_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {PLATFORM_DATA.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5 text-xs" style={{ color: "#475569" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                {p.name} · {p.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel + Activity */}
      <div className="grid grid-cols-3 gap-5">
        {/* Funnel */}
        <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>Application Funnel</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={FUNNEL_DATA} layout="vertical" barSize={18}>
              <XAxis type="number" hide />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {FUNNEL_DATA.map((entry) => (
                  <Cell key={entry.stage} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="pt-3 mt-2 border-t" style={{ borderColor: "#f1f5f9" }}>
            <div className="flex justify-between text-xs">
              <span style={{ color: "#64748b" }}>Offer rate</span>
              <span className="font-bold" style={{ color: "#22c55e" }}>4.3%</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span style={{ color: "#64748b" }}>Interview rate</span>
              <span className="font-bold" style={{ color: "#2563eb" }}>20%</span>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="col-span-2 rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "#0f172a" }}>Recent Activity</p>
          <div className="space-y-2.5">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.company} className="flex items-center gap-4 py-2.5 border-b" style={{ borderColor: "#f8fafc" }}>
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold shrink-0"
                  style={{ background: "#f1f5f9", color: "#0f172a" }}
                >
                  {a.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>{a.company}</p>
                  <p className="text-xs truncate" style={{ color: "#94a3b8" }}>{a.role}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "#94a3b8" }}>{a.date}</span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: a.statusBg, color: a.statusColor }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
