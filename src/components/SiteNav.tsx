import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/live", label: "Live" },
  { to: "/learn", label: "Learn" },
  { to: "/about", label: "About" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
          OSIGN
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary bg-primary/10" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!loading &&
            (user ? (
              <Button
                type="button"
                variant="ghost"
                className="hidden rounded-full md:inline-flex"
                onClick={signOut}
              >
                <LogOut aria-hidden="true" />
                Sign out
              </Button>
            ) : (
              <Button asChild className="hidden rounded-full md:inline-flex">
                <Link to="/auth">
                  <UserRound aria-hidden="true" />
                  Sign in
                </Link>
              </Button>
            ))}
          <button
            className="rounded-full p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass animate-fade-in mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          {!loading &&
            (user ? (
              <Button type="button" onClick={signOut} className="mt-1 w-full rounded-xl">
                <LogOut aria-hidden="true" />
                Sign out
              </Button>
            ) : (
              <Button asChild className="mt-1 w-full rounded-xl">
                <Link to="/auth" onClick={() => setOpen(false)}>
                  <UserRound aria-hidden="true" />
                  Sign in
                </Link>
              </Button>
            ))}
        </div>
      )}
    </header>
  );
}
