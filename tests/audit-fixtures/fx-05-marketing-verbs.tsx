// AUDIT FIXTURE fx-05
// Seeded violations:
//   - copy: marketing-verbs ("supercharge", "revolutionize", "unleash", "transform", "amplify")
//   - copy: self-descriptors ("all-in-one solution", "powerful platform", "next-generation")
// Expected: kern audit should flag both violation types, calling out specific words

export default function LandingHero() {
  return (
    <section className="py-20 px-8 max-w-3xl mx-auto">
      {/* marketing-verbs: supercharge, revolutionize, unleash, transform, amplify */}
      <h1 className="text-5xl font-bold text-zinc-900 leading-tight mb-6">
        Supercharge your team. Revolutionize how you deploy.
      </h1>

      {/* self-descriptors: all-in-one, powerful platform, next-generation */}
      <p className="text-xl text-zinc-600 mb-4">
        The all-in-one solution for modern engineering teams. A powerful
        platform that transforms how you ship software.
      </p>

      <p className="text-lg text-zinc-600 mb-8">
        Unleash the full potential of your pipeline and amplify your team's
        output with our next-generation approach to CI/CD.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium">
          Start your journey
        </button>
        <button className="px-6 py-3 border border-zinc-300 rounded-lg font-medium text-zinc-700">
          See it in action
        </button>
      </div>

      {/* More marketing verbs in feature list */}
      <ul className="mt-12 space-y-3">
        {[
          "Elevate your team's collaboration to the next level",
          "10x your deployment speed with smart automation",
          "Level up your release process overnight",
          "Skyrocket your team's productivity in days",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 text-zinc-600">
            <span className="text-indigo-500 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
