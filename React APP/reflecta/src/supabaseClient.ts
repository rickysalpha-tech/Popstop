import { createClient } from "@supabase/supabase-js";

export let supabaseUrl = "";
export let supabaseAnonKey = "";

export let supabase = createClient(
  "https://placeholder-project.supabase.co",
  "placeholder-key"
);

export function checkSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://placeholder-project.supabase.co" &&
    !supabaseUrl.includes("placeholder-project")
  );
}

export async function initializeSupabase(): Promise<boolean> {
  try {
    const res = await fetch("/api/config");
    if (res.ok) {
      const config = await res.json();
      if (config.supabaseUrl && config.supabaseAnonKey) {
        supabaseUrl = config.supabaseUrl;
        supabaseAnonKey = config.supabaseAnonKey;

        // Re-initialize supabase with runtime keys
        supabase = createClient(supabaseUrl, supabaseAnonKey);
        return true;
      }
    }
  } catch (err) {
    console.error("[Supabase Config Fetch] Error loading dynamic config:", err);
  }
  return false;
}
