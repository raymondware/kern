// AUDIT FIXTURE fx-02
// Seeded violations:
//   - visual: nested-card-soup (Card inside Card, three levels deep)
//   - visual: drop-shadow-decoration (shadow-xl on non-elevated elements)
// Expected: kern audit should flag both violations

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Fast Deployments", description: "Ship in seconds" },
  { title: "Smart Rollbacks", description: "One-click recovery" },
  { title: "Live Metrics", description: "See everything in real time" },
];

export default function FeatureSection() {
  return (
    // Outer wrapper card — level 1
    <Card className="shadow-xl rounded-2xl border border-zinc-200 p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Everything you need
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature) => (
            // Feature card — level 2 (inside level 1)
            <Card
              key={feature.title}
              className="shadow-lg rounded-xl border border-zinc-100"
            >
              <CardContent className="p-6">
                {/* Inner highlight card — level 3 (inside level 2) */}
                <Card className="shadow-md rounded-lg bg-zinc-50 p-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 text-lg">✦</span>
                  </div>
                </Card>
                <h3 className="font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
