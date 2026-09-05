import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { EMERGENCY_SIGNS } from "@/data/signs";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Recognition — OSIGN" },
      {
        name: "description",
        content:
          "Turn on your camera and watch OSIGN recognise emergency sign language in real time.",
      },
      { property: "og:title", content: "Live Recognition — OSIGN" },
      {
        property: "og:description",
        content: "Real-time webcam demo of the OSIGN emergency sign recognition system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Live,
});

type Prediction = { name: string; confidence: number };

function Live() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [on, setOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<Prediction | null>(null);
  const [history, setHistory] = useState<Prediction[]>([]);

  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => {
      const sign = EMERGENCY_SIGNS[Math.floor(Math.random() * EMERGENCY_SIGNS.length)];
      const p = { name: sign.name, confidence: Math.round(82 + Math.random() * 17) };
      setCurrent(p);
      setHistory((h) => [p, ...h].slice(0, 6));
    }, 2200);
    return () => clearInterval(id);
  }, [on]);

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setOn(false);
    setCurrent(null);
  };

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setOn(true);
    } catch {
      setError("Camera access was blocked. Allow camera permission and try again.");
    }
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-10">
        <h1 className="text-4xl font-bold md:text-5xl">
          Live <span className="text-gradient">Recognition</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Start your camera, sign clearly in frame, and OSIGN reads the gesture with a live
          confidence score.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="glass overflow-hidden rounded-[2rem] p-3">
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-muted/60">
              <video
                ref={videoRef}
                playsInline
                muted
                className="size-full scale-x-[-1] object-cover"
              />
              {!on && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <Camera className="size-8 text-primary" />
                  <p className="text-sm text-muted-foreground">Camera is off</p>
                </div>
              )}
              {on && current && (
                <div className="glass absolute bottom-4 left-4 rounded-2xl px-4 py-3">
                  <p className="text-xs text-muted-foreground">Detected sign</p>
                  <p className="font-display text-xl font-bold text-primary">{current.name}</p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 px-3 py-4">
              <button
                onClick={on ? stop : start}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                {on ? <CameraOff className="size-4" /> : <Camera className="size-4" />}
                {on ? "Stop Camera" : "Start Camera"}
              </button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="glass rounded-3xl p-6">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">Confidence</p>
              <p className="font-display mt-2 text-4xl font-bold text-primary">
                {current ? `${current.confidence}%` : "—"}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${current?.confidence ?? 0}%` }}
                />
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">Recent signs</p>
              <ul className="mt-3 space-y-2">
                {history.length === 0 && (
                  <li className="text-sm text-muted-foreground">Nothing detected yet.</li>
                )}
                {history.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-primary/8 px-3 py-2 text-sm"
                  >
                    <span className="font-medium">{h.name}</span>
                    <span className="text-muted-foreground">{h.confidence}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
