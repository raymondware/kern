// AUDIT FIXTURE fx-10
// Seeded violations:
//   - interaction: toast-spam (toasting every user action, including non-notable ones)
//   - interaction: loading-as-marketing ("Did you know?" during load)
// Expected: kern audit should flag both violations

import { useState } from "react";

function useToast() {
  // stub for fixture
  return { toast: (_: { title: string }) => {} };
}

export default function SettingsForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // toast-spam: toasting trivial non-notable actions
  const handleToggle = (feature: string) => {
    toast({ title: `${feature} updated!` });
  };

  const handleNameChange = () => {
    toast({ title: "Profile updated!" });
  };

  const handleFavorite = (item: string) => {
    toast({ title: `${item} favorited!` });
  };

  const handleCheckbox = (label: string) => {
    toast({ title: `${label} preference saved!` });
  };

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-6 space-y-6">
      {/* loading-as-marketing: showing product copy while user waits */}
      {loading && (
        <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-600 text-sm font-medium">Loading...</p>
          {/* Loading as marketing */}
          <p className="text-zinc-400 text-xs max-w-xs text-center">
            Did you know? Our AI processes deployments 10x faster than
            competitors. Check out our new Analytics feature while you wait.
          </p>
        </div>
      )}

      <h2 className="text-xl font-semibold text-zinc-900">Settings</h2>

      {/* toast-spam: non-destructive input changes */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">
          Display name
        </label>
        <input
          type="text"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm"
          onBlur={handleNameChange} // toast on blur — toast-spam
        />
      </div>

      {/* toast-spam: checkbox ticks */}
      <div className="space-y-2">
        {["Email notifications", "Slack notifications", "Weekly digest"].map(
          (item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                onChange={() => handleCheckbox(item)} // toast on every tick
                className="rounded"
              />
              {item}
            </label>
          )
        )}
      </div>

      {/* toast-spam: favorites */}
      <div className="flex gap-2">
        {["Dashboard", "Reports", "Settings"].map((item) => (
          <button
            key={item}
            onClick={() => handleFavorite(item)} // toast on star click
            className="px-3 py-1.5 text-sm border border-zinc-200 rounded-md hover:bg-zinc-50"
          >
            ☆ {item}
          </button>
        ))}
      </div>

      {/* toast-spam: feature toggles */}
      <div className="space-y-3">
        {["Dark mode", "Compact view", "Beta features"].map((feature) => (
          <div key={feature} className="flex items-center justify-between">
            <span className="text-sm text-zinc-700">{feature}</span>
            <button
              onClick={() => handleToggle(feature)} // toast on every toggle
              className="relative inline-flex h-5 w-9 items-center rounded-full bg-zinc-200"
            >
              <span className="sr-only">Toggle {feature}</span>
              <span className="h-3.5 w-3.5 translate-x-1 rounded-full bg-white transition" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleLoad}
        className="w-full py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-medium"
      >
        Save settings
      </button>
    </div>
  );
}
