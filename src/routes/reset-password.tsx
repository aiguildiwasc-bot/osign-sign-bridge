import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset your OSIGN password" },
      { name: "description", content: "Request a secure OSIGN password reset or choose a new password." },
      { property: "og:title", content: "Reset your OSIGN password" },
      { property: "og:description", content: "Recover access to your OSIGN account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [recovery, setRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setRecovery(hash.get("type") === "recovery");
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    if (recovery) {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      setSubmitting(false);
      if (updateError) return setError(updateError.message);
      await navigate({ to: "/auth", replace: true });
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (resetError) return setError(resetError.message);
    setMessage("Check your email for a secure password reset link.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="relative flex min-h-screen items-center justify-center px-4 py-32">
        <div className="halo absolute inset-x-0 top-0 h-[34rem]" aria-hidden="true" />
        <section className="glass relative w-full max-w-md rounded-2xl p-6 sm:p-8">
          <Link to="/auth" className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
          <div className="mb-7 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="size-5" />
          </div>
          <h1 className="text-3xl font-bold">{recovery ? "Choose a new password" : "Reset your password"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{recovery ? "Use at least 8 characters for your new password." : "We’ll email you a secure link to restore access."}</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="space-y-2">
              <Label htmlFor={recovery ? "new-password" : "reset-email"}>{recovery ? "New password" : "Email"}</Label>
              <div className="relative">
                {recovery ? <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /> : <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />}
                <Input id={recovery ? "new-password" : "reset-email"} type={recovery ? "password" : "email"} value={recovery ? password : email} onChange={(event) => recovery ? setPassword(event.target.value) : setEmail(event.target.value)} className="h-11 pl-10" minLength={recovery ? 8 : undefined} required />
              </div>
            </div>
            {error && <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
            {message && <p role="status" className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{message}</p>}
            <Button type="submit" className="h-11 w-full" disabled={submitting}>{submitting ? "Please wait…" : recovery ? "Update password" : "Send reset link"}</Button>
          </form>
        </section>
      </main>
    </div>
  );
}