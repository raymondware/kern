// AUDIT FIXTURE fx-12 — combined violations (high-density fixture)
// Seeded violations:
//   - visual: gradient-slop (purple-to-pink gradient)
//   - visual: centered-glowing-hero (centered + radial glow)
//   - visual: gradient-text
//   - visual: inter-default
//   - copy: marketing-verbs ("supercharge", "revolutionize")
//   - copy: hedging-language ("We believe")
//   - copy: vague-headlines ("Seamless Collaboration")
//   - copy: generic-cta ("Get Started")
//   - interaction: motivational-empty-state
// Expected: kern audit should flag ALL or MOST of these (≥6 of 9)

// Inter with no rationale
import "@/styles/globals.css"; // assumes: font-family: 'Inter', sans-serif

export default function AIDefaultPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* HERO — centered glowing hero with gradient slop */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(139,92,246,0.5) 0%, transparent 60%)",
          }}
        />

        {/* Gradient text headline */}
        <h1
          className="relative z-10 text-7xl font-extrabold"
          style={{
            background: "linear-gradient(to right, #fff, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Supercharge Your Workflow
        </h1>

        {/* marketing-verbs + hedging */}
        <p className="relative z-10 mt-6 max-w-lg text-xl text-white/80">
          We believe this is the tool that will revolutionize how modern
          teams build and ship software.
        </p>

        {/* generic CTA */}
        <div className="relative z-10 mt-10 flex gap-4">
          <button className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl text-lg shadow-xl">
            Get Started
          </button>
          <button className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl text-lg backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES — vague headlines + identical 3-card grid */}
      <section className="py-24 px-8 bg-white">
        <h2 className="text-4xl font-bold text-center text-zinc-900 mb-4">
          Seamless Collaboration
        </h2>
        <p className="text-center text-zinc-500 mb-16">
          Powerful Integrations for Smart Automation.
        </p>

        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: "⚡", title: "Lightning Fast", body: "Ship in seconds." },
            { icon: "🔒", title: "Secure by Default", body: "Enterprise-grade." },
            { icon: "📊", title: "Smart Analytics", body: "Real-time insights." },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-zinc-100 shadow-lg"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h3>
              <p className="text-sm text-zinc-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EMPTY STATE — motivational */}
      <section className="py-24 px-8 bg-zinc-50 flex flex-col items-center text-center">
        <span className="text-6xl mb-6">🌟</span>
        <h3 className="text-2xl font-semibold text-zinc-900 mb-3">
          Your workspace awaits!
        </h3>
        <p className="text-zinc-500 max-w-xs mb-8">
          Great things start with a single step. Build something amazing today.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium">
          Get Started
        </button>
      </section>
    </div>
  );
}
