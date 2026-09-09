import { useEffect, useState } from "react";
import { Laptop, Moon, Sun, type LucideIcon } from "lucide-react";

type Theme = "dark" | "light" | "system";

const OPTIONS: { value: Theme; icon: LucideIcon; label: string }[] = [
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Laptop, label: "System" },
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
        (() => {
          const ThemeIcon = o.icon;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => select(o.value)}
              aria-label={`${o.label} theme`}
              aria-pressed={theme === o.value}
              title={`${o.label} theme`}
              className={`flex size-8 items-center justify-center rounded-full transition-all duration-300 ${
                theme === o.value
                  ? "scale-105 bg-primary/15 text-primary ring-1 ring-primary/40"
                  : "text-muted-foreground opacity-70 hover:text-foreground hover:opacity-100"
              }`}
            >
              <ThemeIcon className="size-4" aria-hidden="true" />
            </button>
          );
        })()
      ))}
    </div>
  );
}
