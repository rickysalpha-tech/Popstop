import React, { useState } from "react";
import { supabase, checkSupabaseConfigured } from "../supabaseClient";
import { Sparkle, Mail, Lock, User, ChevronRight, AlertCircle, Info, Database } from "lucide-react";
import { motion } from "motion/react";

interface AuthProps {
  onAuthSuccess: (user: any) => void;
  onEnterDemoMode: () => void;
}

export default function Auth({ onAuthSuccess, onEnterDemoMode }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const configured = checkSupabaseConfigured();
    if (!configured) {
      setError("Supabase is not configured yet. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the .env file.");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (signUpErr) throw signUpErr;

        if (data?.user) {
          // If auto-confirm is on in Supabase, they might be logged in immediately.
          // Otherwise, notify them to check their email.
          if (data.session) {
            onAuthSuccess(data.user);
          } else {
            setMessage("Registration successful! Please check your email inbox to confirm your registration.");
          }
        }
      } else {
        const { data, error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInErr) throw signInErr;

        if (data?.user) {
          onAuthSuccess(data.user);
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err?.message || "An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4" id="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-neutral-150 rounded-3xl p-8 shadow-xl relative overflow-hidden"
        id="auth-card"
      >
        {/* Minimal border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900" />

        {/* Brand identity */}
        <div className="text-center space-y-2 mb-8" id="auth-brand-header">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 flex items-center justify-center text-white mx-auto">
            <Sparkle className="h-6 w-6 text-amber-200" />
          </div>
          <h2 className="text-lg font-black tracking-widest text-neutral-950 font-mono uppercase mt-4">
            R E F L E C T A
          </h2>
          <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
            AI Wardrobe Mirror & Stylist
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 bg-neutral-50 p-1.5 rounded-2xl border border-neutral-150/80 mb-6" id="auth-tabs">
          <button
            onClick={() => { setIsSignUp(false); setError(null); setMessage(null); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${!isSignUp ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${isSignUp ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            Create Account
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-xs text-rose-600 mb-5 leading-relaxed" id="auth-error-alert">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2 text-xs text-emerald-800 mb-5 leading-relaxed" id="auth-message-alert">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4" id="auth-form">
          {isSignUp && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Voss"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white text-neutral-800"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="auth-input-fullname"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="style@reflecta.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white text-neutral-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="auth-input-email"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white text-neutral-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="auth-input-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 disabled:bg-neutral-400 mt-6 cursor-pointer"
            id="auth-submit-btn"
          >
            <span>{loading ? "Authenticating..." : isSignUp ? "Establish Account" : "Access Studio"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Mode trigger */}
        <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col gap-3 text-center" id="auth-footer-actions">
          <p className="text-[10px] text-neutral-400 leading-relaxed">
            Want to test out the application instantly without connecting Supabase credentials?
          </p>
          <button
            onClick={onEnterDemoMode}
            className="text-xs font-bold text-neutral-800 hover:text-neutral-950 underline underline-offset-4 flex items-center justify-center gap-1.5"
            id="auth-demo-btn"
          >
            <Database className="h-3.5 w-3.5" />
            <span>Launch in Demo Mode (Local Storage)</span>
          </button>
        </div>
      </motion.div>

      {/* Supabase connection guide box */}
      {!checkSupabaseConfigured() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mt-6 p-4 bg-amber-50/60 border border-amber-200/50 rounded-2xl flex gap-3 text-amber-900"
          id="auth-credentials-warning"
        >
          <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold">Supabase Credentials Needed</h4>
            <p className="text-[10px] text-amber-800/80 leading-normal">
              To connect your real backend database, please paste your <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> into the <code>.env</code> file in the project directory, and restart the dev server.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
