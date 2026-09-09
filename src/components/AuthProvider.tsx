import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

async function ensureProfile(user: User) {
  const displayName =
    typeof user.user_metadata?.["display_name"] === "string"
      ? user.user_metadata["display_name"]
      : typeof user.user_metadata?.["full_name"] === "string"
        ? user.user_metadata["full_name"]
        : user.email?.split("@")[0] ?? "OSIGN User";
  const avatarUrl =
    typeof user.user_metadata?.["avatar_url"] === "string"
      ? user.user_metadata["avatar_url"]
      : null;

  await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      display_name: displayName,
      avatar_url: avatarUrl,
    },
    { onConflict: "user_id", ignoreDuplicates: true },
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user ?? null);
      setLoading(false);
      if (data.user) void ensureProfile(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setLoading(false);
      if (nextUser) void ensureProfile(nextUser);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}