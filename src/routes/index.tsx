import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Cpu, Gauge, Hand, ShieldCheck, Sparkles, Waves } from "lucide-react";
import heroHand from "@/assets/hero-hand.jpg";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OSIGN — Emergency Sign Language Recognition" },
      {
        name: "description",
        content:
          "OSIGN turns emergency sign language into instant text with real-time hand tracking. Sign the Future.",
      },
      { property: "og:title", content: "OSIGN — Emergency Sign Language Recognition" },
      {
        property: "og:description",
        content:
          "Real-time recognition of 30 emergency signs, built for accessibility in critical moments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    icon: Gauge,
    title: "Real-Time Inference",
    body: "Sub-100ms predictions straight from the webcam feed, no cloud round trip required.",
  },
  {
    icon: Hand,
    title: "30 Emergency Signs",
    body: "A focused vocabulary covering medical, danger, assistance and communication needs.",
  },
  {
    icon: Cpu,
    title: "Landmark Intelligence",
    body: "21-point hand tracking feeds a sequence model trained on thousands of gesture clips.",
  },
  {
    icon: ShieldCheck,
    title: "Private By Design",
    body: "Frames are processed on device — video never leaves the browser session.",
  },
  {
    icon: Waves,
    title: "Confidence Signals",
    body: "Every prediction ships with a live confidence score so responders can trust it.",
  },
  {
    icon: Sparkles,
    title: "Learn Mode",
    body: "Practice each sign with guided descriptions before you ever need them.",
  },
];

const STEPS = [
  { n: "01", t: "Capture", d: "Your camera streams frames into the recognition pipeline." },
  { n: "02", t: "Track", d: "Hand landmarks are extracted frame by frame into a motion sequence." },
  { n: "03", t: "Classify", d: "The model matches the sequence against 30 emergency signs." },
  { n: "04", t: "Communicate", d: "The meaning appears as clear text and speech instantly." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main>
        <section className="relative overflow-hidden px-4 pt-36 pb-24">
          <div className="halo pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
                <span className="size-2 rounded-full bg-primary pulse-ring" />
                Emergency Recognition System
              </span>
              <h1 className="mt-6 text-5xl leading-[1.05] font-bold md:text-6xl">
                <span className="text-gradient">Sign the Future</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                OSIGN reads emergency sign language in real time and translates it into words
                everyone understands — so a gesture is never lost when seconds matter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/live"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                >
                  <Camera className="size-4" /> Try Live Demo
                </Link>
                <Link
                  to="/learn"
                  className="glass glass-hover inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
                >
                  Explore 30 Signs
                </Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {[
                  ["98.2%", "Accuracy"],
                  ["30", "Signs"],
                  ["<100ms", "Latency"],
                ].map(([v, l]) => (
                  <div key={l} className="glass rounded-2xl px-4 py-3">
                    <dt className="font-display text-xl font-bold text-primary">{v}</dt>
                    <dd className="text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="glass float-slow overflow-hidden rounded-[2rem] p-3">
                <img
                  src={heroHand}
                  alt="Glowing wireframe hand with tracked sign language landmarks"
                  width={1280}
                  height={1280}
                  className="w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="glass absolute -bottom-5 left-6 rounded-2xl px-4 py-3 text-sm">
                <p className="text-xs text-muted-foreground">Detected</p>
                <p className="font-display font-semibold text-primary">HELP · 97%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold md:text-4xl">Built for critical moments</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Everything in OSIGN is tuned for speed, clarity and trust under pressure.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article key={f.title} className="glass glass-hover rounded-3xl p-6">
                  <div className="inline-flex rounded-2xl bg-primary/12 p-3 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="glass glass-hover rounded-3xl p-6">
                  <p className="font-display text-4xl font-bold text-primary/30">{s.n}</p>
                  <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="glass mx-auto max-w-4xl rounded-[2rem] p-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to see OSIGN read a sign?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Open the live demo, allow camera access, and watch gestures become words.
            </p>
            <Link
              to="/live"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Camera className="size-4" /> Launch Live Demo
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
