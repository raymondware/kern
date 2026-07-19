// AUDIT FIXTURE fx-09
// Seeded violations:
//   - interaction: dishonest-cta ("Get started" actually requires credit card; "Learn more" goes to pricing)
//   - interaction: unnecessary-confirmation ("Are you sure you want to log out?")
//   - copy: generic-cta ("Submit", "Click here")
// Expected: kern audit should flag dishonest CTAs and unnecessary confirmation

import { useState } from "react";

export default function PricingCTAs() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="max-w-md mx-auto py-12 px-6 space-y-8">
      {/* dishonest-cta: "Get started free" but requires credit card */}
      <div className="rounded-xl border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Starter Plan — $0/mo</h2>
        <p className="text-sm text-zinc-500 mb-4">
          Everything you need to get going.
        </p>
        <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium">
          Get Started Free
        </button>
        {/* Credit card requirement hidden in fine print */}
        <p className="text-xs text-zinc-400 mt-2 text-center">
          * Credit card required
        </p>
      </div>

      {/* dishonest-cta: "Learn more" navigates to pricing page */}
      <div className="rounded-xl border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
        <p className="text-sm text-zinc-500 mb-4">Custom pricing for large teams.</p>
        <button className="w-full py-3 border border-zinc-300 rounded-lg font-medium text-zinc-700">
          Learn more
        </button>
        {/* "Learn more" goes to /pricing — not a learning resource */}
      </div>

      {/* unnecessary-confirmation: logout */}
      <div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          Log out
        </button>

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <h3 className="font-semibold text-lg mb-2">Are you sure?</h3>
              <p className="text-sm text-zinc-500 mb-6">
                You will be logged out of your account. You will need to log
                in again.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">
                  Yes, log out
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 border border-zinc-300 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* generic CTAs */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email..."
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm"
        />
        {/* "Submit" — generic CTA */}
        <button className="w-full py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium">
          Submit
        </button>
        <p className="text-sm text-zinc-400">
          <a href="#" className="underline">Click here</a> to view our privacy policy.
        </p>
      </form>
    </div>
  );
}
