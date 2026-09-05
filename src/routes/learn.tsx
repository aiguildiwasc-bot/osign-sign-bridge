import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { EMERGENCY_SIGNS } from "@/data/signs";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn 30 Emergency Signs — OSIGN" },
      {
        name: "description",
        content:
          "Practice the 30 emergency signs OSIGN recognises, from medical needs to danger alerts.",
      },
      { property: "og:title", content: "Learn 30 Emergency Signs — OSIGN" },
      {
        property: "og:description",
        content: "A guided grid of the emergency sign vocabulary powering OSIGN.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learn,
});

const CATEGORIES = ["All", "Medical", "Danger", "Assistance", "Communication"] as const;

function Learn() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const signs = EMERGENCY_SIGNS.filter((s) => active === "All" || s.category === active);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32">
        <h1 className="text-4xl font-bold md:text-5xl">
          Learn the <span className="text-gradient">30 Emergency Signs</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Every sign OSIGN recognises, grouped by the situation it belongs to.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((s, i) => (
            <article key={s.name} className="glass glass-hover rounded-3xl p-5">
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl font-bold text-primary/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
                  {s.category}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{s.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.description}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
