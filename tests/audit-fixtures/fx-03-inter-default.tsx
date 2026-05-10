// AUDIT FIXTURE fx-03
// Seeded violations:
//   - visual: inter-default (font set to Inter with no rationale, loaded from Google Fonts as default)
//   - visual: identical-three-card-feature-grid (3 icon + heading + description cards, identical structure)
// Expected: kern audit should flag both violations

// Inter imported as the default — no design decision behind it
import "@/styles/inter-font.css"; // assumes: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')

const FEATURES = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Our platform processes requests in milliseconds so your team never waits.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    description:
      "Enterprise-grade security built in from day one. Your data stays yours.",
  },
  {
    icon: "📊",
    title: "Powerful Analytics",
    description:
      "Real-time insights that help you make better decisions every day.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      className="py-24 px-6"
      style={{ fontFamily: "Inter, sans-serif" }} // Inter with no explicit design decision
    >
      <h2 className="text-4xl font-bold text-center text-zinc-900 mb-4">
        Powerful Integrations
      </h2>
      <p className="text-center text-zinc-500 mb-16">
        Everything you need in one place.
      </p>

      {/* Identical 3-card grid — all same structure */}
      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center text-center p-6 rounded-xl border border-zinc-100 bg-white"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-zinc-500">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
