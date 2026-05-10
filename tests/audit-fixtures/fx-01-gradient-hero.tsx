// AUDIT FIXTURE fx-01
// Seeded violations:
//   - visual: gradient-slop (linear-gradient purple-to-pink)
//   - visual: centered-glowing-hero (flex items-center text-center + radial glow)
//   - visual: gradient-text (bg-gradient-to-r bg-clip-text text-transparent)
//   - copy: get-started-cta ("Get Started" label)
// Expected: kern audit should flag at least 3 of these 4 violations

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
    >
      {/* Radial glow behind headline — centered glowing hero pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating badge — AI-default tell */}
      <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-green-400" />
        Now in beta
      </div>

      <h1
        className="relative z-10 text-6xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent leading-tight"
      >
        Supercharge your workflow
        <br />
        with AI-powered automation
      </h1>

      <p className="relative z-10 mt-6 max-w-xl text-lg text-white/80">
        We believe this is the fastest way to ship features without the
        overhead of traditional systems.
      </p>

      <div className="relative z-10 mt-10 flex gap-4">
        {/* Dishonest CTA — "Get Started" requires credit card */}
        <button className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-purple-700 shadow-lg hover:shadow-xl">
          Get Started
        </button>
        <button className="rounded-lg border border-white/30 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm">
          Learn more
        </button>
      </div>
    </section>
  );
}
