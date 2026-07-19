// AUDIT FIXTURE fx-04
// Seeded violations:
//   - visual: ai-palette (6-color palette from a generator, one over-saturated accent used everywhere)
//   - visual: neon-without-context (electric blue accent on a SaaS dashboard, not gaming/entertainment)
// Expected: kern audit should flag both violations

// Palette "generated" by an AI tool — 6 colors that harmonize in a grid but fight in UI
const PALETTE = {
  primary: "#0ea5e9",    // sky-500 — saturated, used as accent everywhere
  secondary: "#8b5cf6",  // violet-500
  accent: "#f59e0b",     // amber-500
  success: "#10b981",    // emerald-500
  danger: "#ef4444",     // red-500
  neutral: "#64748b",    // slate-500
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      {/* Neon accent used on nav, primary CTA, badge, and status — no gaming context */}
      <nav className="flex items-center justify-between mb-8">
        <span
          className="text-xl font-bold"
          style={{ color: PALETTE.primary }}
        >
          DataFlow
        </span>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: PALETTE.primary }}
        >
          Upgrade
        </button>
      </nav>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {["Revenue", "Users", "Conversions", "Churn"].map((metric, i) => (
          <div key={metric} className="rounded-xl bg-slate-800 p-4">
            <p className="text-slate-400 text-xs mb-1">{metric}</p>
            <p
              className="text-2xl font-bold"
              style={{ color: i === 0 ? PALETTE.primary : "white" }}
            >
              {i === 0 ? "$24,891" : i === 1 ? "1,204" : i === 2 ? "3.4%" : "1.2%"}
            </p>
            {/* Primary color (neon blue) used as universal highlight */}
            <div
              className="mt-2 h-1 rounded-full"
              style={{ backgroundColor: PALETTE.primary, width: "60%" }}
            />
          </div>
        ))}
      </div>

      {/* Status badges all using the over-saturated primary */}
      <div className="flex gap-2">
        {["Active", "Processing", "Synced"].map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded text-xs font-medium text-white"
            style={{ backgroundColor: PALETTE.primary }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
