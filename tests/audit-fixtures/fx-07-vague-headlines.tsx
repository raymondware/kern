// AUDIT FIXTURE fx-07
// Seeded violations:
//   - copy: vague-headlines ("Seamless Collaboration", "Powerful Integrations", "Smart Automation", "Better Workflows")
//   - copy: self-descriptors ("A comprehensive suite", "best-in-class", "next-generation")
//   - copy: filler-opener ("In today's fast-paced development environment")
// Expected: kern audit should flag all three violation types

export default function FeatureHighlights() {
  return (
    <div className="py-16 px-8 max-w-4xl mx-auto">
      {/* filler-opener */}
      <p className="text-sm text-zinc-400 mb-2 uppercase tracking-wide">
        Why teams choose us
      </p>
      <h2 className="text-4xl font-bold text-zinc-900 mb-4">
        In today's fast-paced development environment, teams need tools that
        keep up.
      </h2>

      {/* self-descriptor */}
      <p className="text-lg text-zinc-500 mb-16">
        A comprehensive suite of best-in-class tools for the next-generation
        engineering team.
      </p>

      <div className="grid grid-cols-2 gap-12">
        {/* vague-headlines — all interchangeable across products */}
        {[
          {
            title: "Seamless Collaboration",
            body: "Work together effortlessly across your entire organization.",
          },
          {
            title: "Powerful Integrations",
            body: "Connect all your existing tools and workflows in minutes.",
          },
          {
            title: "Smart Automation",
            body: "Eliminate repetitive tasks with intelligent automation.",
          },
          {
            title: "Better Workflows",
            body: "Streamline your processes and improve team efficiency.",
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">
              {title}
            </h3>
            <p className="text-zinc-500">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
