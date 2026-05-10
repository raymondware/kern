// AUDIT FIXTURE fx-06
// Seeded violations:
//   - copy: hedging-language ("We believe", "We think you'll", "We hope", "You may want to")
//   - copy: passive-voice in action contexts ("Errors will be highlighted", "Your file will be processed")
// Expected: kern audit should flag both violation types

export default function OnboardingChecklist() {
  return (
    <div className="max-w-lg mx-auto py-12 px-6">
      <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
        Getting started
      </h2>

      {/* hedging-language: "We believe", "We think you'll" */}
      <p className="text-zinc-500 mb-8">
        We believe this is the fastest way to get up and running. We think
        you'll love what we've built, and we hope it helps you ship faster.
      </p>

      <div className="space-y-4">
        {/* hedging: "You may want to consider" */}
        <div className="rounded-lg border border-zinc-200 p-4">
          <h3 className="font-medium text-zinc-900">Connect your repo</h3>
          <p className="text-sm text-zinc-500 mt-1">
            You may want to consider connecting your GitHub repository to
            enable automatic deployments.
          </p>
        </div>

        {/* passive-voice in action context: "Errors will be highlighted" */}
        <div className="rounded-lg border border-zinc-200 p-4">
          <h3 className="font-medium text-zinc-900">Review your config</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Errors will be highlighted in red. Your configuration will be
            validated automatically. Any issues will be displayed below.
          </p>
        </div>

        {/* passive-voice: "Your file will be processed" */}
        <div className="rounded-lg border border-zinc-200 p-4">
          <h3 className="font-medium text-zinc-900">Upload your schema</h3>
          <p className="text-sm text-zinc-500 mt-1">
            Your file will be processed once uploaded. Results will be
            emailed to you shortly.
          </p>
        </div>
      </div>

      {/* More hedging */}
      <p className="mt-6 text-sm text-zinc-400">
        This might be useful for teams that are just getting started. We
        think most users complete this in under 5 minutes.
      </p>
    </div>
  );
}
