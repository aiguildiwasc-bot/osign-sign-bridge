import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the OSIGN Project" },
      {
        name: "description",
        content:
          "How OSIGN was built: the mission, the team and the technology behind emergency sign recognition.",
      },
      { property: "og:title", content: "About the OSIGN Project" },
      {
        property: "og:description",
        content: "Mission, team and tech stack behind the OSIGN emergency recognition system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Team Lead", role: "Model architecture & training" },
  { name: "ML Engineer", role: "Landmark pipeline & datasets" },
  { name: "Frontend Engineer", role: "Realtime interface & accessibility" },
  { name: "Research Analyst", role: "Sign vocabulary & evaluation" },
];

const STACK = [
  "Python",
  "TensorFlow",
  "MediaPipe",
  "OpenCV",
  "LSTM Sequence Model",
  "React",
  "TypeScript",
  "Tailwind CSS",
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32">
        <h1 className="text-4xl font-bold md:text-5xl">
          About <span className="text-gradient">OSIGN</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          OSIGN is a student research project building an emergency sign language recognition
          system. In a crisis, a deaf or non-verbal person may only have their hands — OSIGN makes
          sure those hands are heard.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["Mission", "Remove the communication gap between signers and first responders."],
            ["Approach", "Landmark sequences classified by a lightweight recurrent model."],
            ["Scope", "A focused vocabulary of 30 high-impact emergency signs."],
          ].map(([t, d]) => (
            <div key={t} className="glass glass-hover rounded-3xl p-6">
              <h2 className="text-lg font-semibold text-primary">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">The team</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Placeholder names — send me the real ones and I'll swap them in.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.role} className="glass glass-hover rounded-3xl p-6">
                <div className="font-display flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-lg font-bold text-primary">
                  {m.name.charAt(0)}
                </div>
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Tech stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {STACK.map((s) => (
              <span key={s} className="glass rounded-full px-4 py-2 text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
