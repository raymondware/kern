// AUDIT FIXTURE fx-08
// Seeded violations:
//   - interaction: motivational-empty-state ("Your canvas awaits", "Great things start with", "Build something amazing")
//   - copy: marketing-verbs in empty state ("Create your masterpiece", "amazing")
// Expected: kern audit should flag the motivational empty state pattern

export default function EmptyProjectsState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-8 text-center">
      {/* Motivational illustration — person looking at horizon */}
      <div className="w-32 h-32 mb-6 rounded-full bg-indigo-50 flex items-center justify-center">
        <span className="text-5xl">🌟</span>
      </div>

      {/* motivational-empty-state: "awaits", "masterpiece", "amazing" */}
      <h3 className="text-2xl font-semibold text-zinc-900 mb-3">
        Your canvas awaits!
      </h3>

      {/* More motivational copy */}
      <p className="text-zinc-500 max-w-sm mb-2">
        Great things start with a single step. Create your first project
        today and build something amazing.
      </p>

      {/* Even more motivational copy */}
      <p className="text-sm text-zinc-400 mb-8">
        It's quiet here... for now. Your next masterpiece is just a click
        away.
      </p>

      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium">
        Start creating
      </button>

      {/* Encouragement footer */}
      <p className="mt-4 text-xs text-zinc-400">
        Join 10,000+ creators who are already building amazing things.
      </p>
    </div>
  );
}
