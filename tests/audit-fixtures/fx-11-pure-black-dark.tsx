// AUDIT FIXTURE fx-11
// Seeded violations:
//   - visual: pure-black-dark-mode (background: #000000 in dark mode; text: #ffffff; no nuance)
//   - visual: inverted-light-as-dark (same saturation accent colors, not adjusted for dark mode)
// Expected: kern audit should flag the pure black dark mode violation

export default function DarkModeDashboard() {
  return (
    // pure-black dark mode background — should be zinc-950 or similar
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="font-bold text-white">AppName</span>
        {/* inverted-light-as-dark: same blue-500 from light mode, violently vibrating on pure black */}
        <button className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium">
          Upgrade
        </button>
      </nav>

      <main className="px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
          {["Total Revenue", "Active Users", "Conversions"].map((label) => (
            <div
              key={label}
              // pure white text on pure black — halation risk
              className="rounded-xl bg-zinc-900 border border-white/5 p-6"
            >
              <p className="text-white text-xs mb-1">{label}</p>
              <p className="text-2xl font-bold text-white">—</p>
            </div>
          ))}
        </div>

        {/* inverted-light-as-dark: blue-500 still the same saturation, text bright white on pure black */}
        <div className="mt-8 rounded-xl bg-zinc-900 border border-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent activity</h2>
            {/* same blue-500 as light mode — inverted without adjustment */}
            <span className="text-xs font-medium text-blue-500">View all</span>
          </div>

          <div className="space-y-3">
            {["Deploy started", "Build passed", "PR merged"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm"
              >
                {/* pure white on pure black — halation */}
                <span className="text-white">{item}</span>
                {/* blue-500 accent not adjusted for dark mode */}
                <span className="ml-auto text-xs text-blue-500">
                  2 min ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
