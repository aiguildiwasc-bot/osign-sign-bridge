import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const OPTIONS: { value: Theme; icon: string; label: string }[] = [
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "light", icon: "☀️", label: "Light" },
  { value: "system", icon: "💻", label: "System" },
];

export function applyTheme(theme: Theme) {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("osign-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    applyTheme(stored);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem("osign-theme") as Theme | null) === "system")
        applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const select = (value: Theme) => {
    setTheme(value);
    localStorage.setItem("osign-theme", value);
    applyTheme(value);
  };

  return (
    <div className="glass flex items-center gap-1 rounded-full p-1" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => select(o.value)}
          aria-label={`${o.label} theme`}
          aria-pressed={theme === o.value}
          className={`rounded-full px-2.5 py-1 text-sm transition-all duration-300 ${
            theme === o.value
              ? "bg-primary/15 scale-105 ring-1 ring-primary/40"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          <span aria-hidden>{o.icon}</span>
        </button>
      ))}
    </div>
  );
}
