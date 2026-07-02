/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { WardrobeItem, RecommendedOutfit, ScheduledOutfit } from "./types";
import { INITIAL_WARDROBE } from "./data";
import Wardrobe from "./components/Wardrobe";
import AIPanel from "./components/AIPanel";
import CalendarView from "./components/CalendarView";
import Analytics from "./components/Analytics";
import Auth from "./components/Auth";
import { supabase, initializeSupabase } from "./supabaseClient";
import {
  Sparkles, Layers, Calendar as CalendarIcon,
  BarChart3, Sparkle, ArrowUpRight, LogOut, Loader2, Database, User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ActiveTab = "mirror" | "closet" | "schedule" | "insights";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("mirror");
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [scheduled, setScheduled] = useState<ScheduledOutfit[]>([]);

  // Auth and Loading States
  const [user, setUser] = useState<any | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [dbSyncing, setDbSyncing] = useState<boolean>(false);

  // 1. Check for active Supabase Auth Session on mount
  useEffect(() => {
    let subscription: any = null;

    async function init() {
      const configured = await initializeSupabase();

      const demoPreference = localStorage.getItem("reflecta_demo_preference");
      if (demoPreference === "true") {
        setIsDemoMode(true);
        loadDemoData();
        setAuthLoading(false);
      } else if (configured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchUserData(session.user.id);
          } else {
            setAuthLoading(false);
          }
        } catch (err) {
          console.error("Auth session retrieval error:", err);
          setAuthLoading(false);
        }

        // Subscribe to auth state changes only if configured
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            setUser(session.user);
            setIsDemoMode(false);
            localStorage.removeItem("reflecta_demo_preference");
            fetchUserData(session.user.id);
          } else {
            setUser(null);
            if (event === "SIGNED_OUT") {
              setWardrobe([]);
              setScheduled([]);
            }
            setAuthLoading(false);
          }
        });
        subscription = data.subscription;
      } else {
        // Fallback to demo mode if not configured yet
        setIsDemoMode(true);
        loadDemoData();
        setAuthLoading(false);
      }
    }

    init();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // 2. Fetch User Data from Supabase
  const fetchUserData = async (userId: string) => {
    setDbSyncing(true);
    try {
      // A. Fetch Wardrobe Closet
      const { data: wardrobeData, error: wardrobeErr } = await supabase
        .from("wardrobe_items")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (wardrobeErr) throw wardrobeErr;

      const mappedWardrobe: WardrobeItem[] = (wardrobeData || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        color: item.color,
        season: item.season,
        occasions: item.occasions || [],
        imageUrl: item.image_url,
        isFavorite: item.is_favorite,
        notes: item.notes,
        dateAdded: item.created_at ? item.created_at.split("T")[0] : new Date().toISOString().split("T")[0]
      }));

      setWardrobe(mappedWardrobe);

      // B. Fetch Scheduled Planner Outfits
      const { data: scheduledData, error: scheduledErr } = await supabase
        .from("scheduled_outfits")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: true });

      if (scheduledErr) throw scheduledErr;

      const mappedScheduled: ScheduledOutfit[] = (scheduledData || []).map((evt: any) => ({
        id: evt.id,
        date: evt.date,
        occasion: evt.occasion,
        weather: evt.weather,
        notes: evt.notes,
        outfit: {
          id: evt.id,
          name: evt.outfit_name,
          description: evt.outfit_description || "",
          suitabilityScore: evt.suitability_score || 100,
          items: evt.items || [],
          stylingTips: evt.styling_tips || []
        }
      }));

      setScheduled(mappedScheduled);
    } catch (err) {
      console.error("Failed to fetch user data from Supabase:", err);
    } finally {
      setDbSyncing(false);
      setAuthLoading(false);
    }
  };

  // 3. Load Offline Demo Data from LocalStorage
  const loadDemoData = () => {
    const savedWardrobe = localStorage.getItem("reflecta_wardrobe");
    if (savedWardrobe) {
      try {
        setWardrobe(JSON.parse(savedWardrobe));
      } catch (e) {
        setWardrobe(INITIAL_WARDROBE);
      }
    } else {
      setWardrobe(INITIAL_WARDROBE);
    }

    const savedScheduled = localStorage.getItem("reflecta_scheduled");
    if (savedScheduled) {
      try {
        setScheduled(JSON.parse(savedScheduled));
      } catch (e) {
        setScheduled([]);
      }
    }
  };

  // 4. Save Offline Demo Data to LocalStorage
  const saveDemoWardrobe = (newWardrobe: WardrobeItem[]) => {
    setWardrobe(newWardrobe);
    localStorage.setItem("reflecta_wardrobe", JSON.stringify(newWardrobe));
  };

  const saveDemoScheduled = (newScheduled: ScheduledOutfit[]) => {
    setScheduled(newScheduled);
    localStorage.setItem("reflecta_scheduled", JSON.stringify(newScheduled));
  };

  // 5. Handlers for Wardrobe Actions
  const handleAddItem = async (newItem: Omit<WardrobeItem, "id" | "dateAdded">) => {
    if (isDemoMode) {
      const item: WardrobeItem = {
        ...newItem,
        id: `item-${Date.now()}`,
        dateAdded: new Date().toISOString().split("T")[0]
      };
      const updated = [item, ...wardrobe];
      saveDemoWardrobe(updated);
    } else if (user) {
      setDbSyncing(true);
      try {
        const { data, error } = await supabase
          .from("wardrobe_items")
          .insert({
            user_id: user.id,
            name: newItem.name,
            category: newItem.category,
            color: newItem.color,
            season: newItem.season,
            occasions: newItem.occasions,
            image_url: newItem.imageUrl,
            is_favorite: false,
            notes: newItem.notes
          })
          .select();

        if (error) throw error;

        if (data && data[0]) {
          const item = data[0];
          const mapped: WardrobeItem = {
            id: item.id,
            name: item.name,
            category: item.category,
            color: item.color,
            season: item.season,
            occasions: item.occasions,
            imageUrl: item.image_url,
            isFavorite: item.is_favorite,
            notes: item.notes,
            dateAdded: item.created_at ? item.created_at.split("T")[0] : new Date().toISOString().split("T")[0]
          };
          setWardrobe([mapped, ...wardrobe]);
        }
      } catch (err: any) {
        console.error("Error adding item to Supabase:", err);
        alert("Failed to integrate item: " + err.message);
      } finally {
        setDbSyncing(false);
      }
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (isDemoMode) {
      const updated = wardrobe.filter(item => item.id !== id);
      saveDemoWardrobe(updated);

      const filteredSchedule = scheduled.filter(evt => {
        const containsDeleted = evt.outfit.items.some(piece => piece.closetItemId === id);
        return !containsDeleted;
      });
      saveDemoScheduled(filteredSchedule);
    } else if (user) {
      setDbSyncing(true);
      try {
        const { error } = await supabase
          .from("wardrobe_items")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) throw error;

        setWardrobe(wardrobe.filter(item => item.id !== id));

        // Also clear from schedule if scheduled (done client-side to avoid stale data,
        // and database triggers/cascades could clean it but clean UI makes it immediate)
        setScheduled(scheduled.filter(evt => {
          const containsDeleted = evt.outfit.items.some(piece => piece.closetItemId === id);
          return !containsDeleted;
        }));
      } catch (err: any) {
        console.error("Error archiving item from Supabase:", err);
        alert("Failed to delete item: " + err.message);
      } finally {
        setDbSyncing(false);
      }
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const itemToToggle = wardrobe.find(item => item.id === id);
    if (!itemToToggle) return;

    const nextFavorite = !itemToToggle.isFavorite;

    if (isDemoMode) {
      const updated = wardrobe.map(item =>
        item.id === id ? { ...item, isFavorite: nextFavorite } : item
      );
      saveDemoWardrobe(updated);
    } else if (user) {
      try {
        const { error } = await supabase
          .from("wardrobe_items")
          .update({ is_favorite: nextFavorite })
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) throw error;

        setWardrobe(wardrobe.map(item =>
          item.id === id ? { ...item, isFavorite: nextFavorite } : item
        ));
      } catch (err) {
        console.error("Error updating favorite in Supabase:", err);
      }
    }
  };

  // 6. Handlers for Schedule Actions
  const handleScheduleOutfit = async (outfit: RecommendedOutfit, date: string, occasion: string, weather: string) => {
    if (isDemoMode) {
      const filtered = scheduled.filter(evt => evt.date !== date);
      const newEvent: ScheduledOutfit = {
        id: `evt-${Date.now()}`,
        date,
        outfit,
        occasion,
        weather,
        notes: ""
      };
      saveDemoScheduled([...filtered, newEvent]);
    } else if (user) {
      setDbSyncing(true);
      try {
        // First delete any existing schedule for that day to avoid duplicate unique key error
        await supabase
          .from("scheduled_outfits")
          .delete()
          .eq("user_id", user.id)
          .eq("date", date);

        const { data, error } = await supabase
          .from("scheduled_outfits")
          .insert({
            user_id: user.id,
            date,
            outfit_name: outfit.name,
            outfit_description: outfit.description,
            suitability_score: outfit.suitabilityScore,
            occasion,
            weather,
            items: outfit.items,
            styling_tips: outfit.stylingTips,
            notes: ""
          })
          .select();

        if (error) throw error;

        if (data && data[0]) {
          const evt = data[0];
          const newEvent: ScheduledOutfit = {
            id: evt.id,
            date: evt.date,
            occasion: evt.occasion,
            weather: evt.weather,
            notes: evt.notes,
            outfit: {
              id: evt.id,
              name: evt.outfit_name,
              description: evt.outfit_description || "",
              suitabilityScore: evt.suitability_score || 100,
              items: evt.items || [],
              stylingTips: evt.styling_tips || []
            }
          };
          const filteredLocal = scheduled.filter(e => e.date !== date);
          setScheduled([...filteredLocal, newEvent]);
        }
      } catch (err: any) {
        console.error("Error scheduling outfit in Supabase:", err);
        alert("Failed to schedule outfit: " + err.message);
      } finally {
        setDbSyncing(false);
      }
    }
  };

  const handleRemoveScheduledOutfit = async (id: string) => {
    if (isDemoMode) {
      const updated = scheduled.filter(evt => evt.id !== id);
      saveDemoScheduled(updated);
    } else if (user) {
      try {
        const { error } = await supabase
          .from("scheduled_outfits")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) throw error;

        setScheduled(scheduled.filter(evt => evt.id !== id));
      } catch (err) {
        console.error("Error unscheduling outfit from Supabase:", err);
      }
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    if (isDemoMode) {
      const updated = scheduled.map(evt =>
        evt.id === id ? { ...evt, notes } : evt
      );
      saveDemoScheduled(updated);
    } else if (user) {
      try {
        const { error } = await supabase
          .from("scheduled_outfits")
          .update({ notes })
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) throw error;

        setScheduled(scheduled.map(evt =>
          evt.id === id ? { ...evt, notes } : evt
        ));
      } catch (err) {
        console.error("Error updating scheduled notes in Supabase:", err);
      }
    }
  };

  // Seeding Essentials function for new users
  const handleSeedEssentials = async () => {
    if (isDemoMode) {
      saveDemoWardrobe(INITIAL_WARDROBE);
    } else if (user) {
      setDbSyncing(true);
      try {
        const itemsToInsert = INITIAL_WARDROBE.map(item => ({
          user_id: user.id,
          name: item.name,
          category: item.category,
          color: item.color,
          season: item.season,
          occasions: item.occasions,
          image_url: item.imageUrl,
          is_favorite: item.isFavorite || false,
          notes: item.notes || ""
        }));

        const { error } = await supabase
          .from("wardrobe_items")
          .insert(itemsToInsert);

        if (error) throw error;

        // Reload wardrobe
        await fetchUserData(user.id);
      } catch (err: any) {
        console.error("Error seeding initial wardrobe:", err);
        alert("Failed to seed wardrobe: " + err.message);
      } finally {
        setDbSyncing(false);
      }
    }
  };

  // AuthSuccess Handlers
  const handleAuthSuccess = (authenticatedUser: any) => {
    setUser(authenticatedUser);
    setIsDemoMode(false);
    localStorage.removeItem("reflecta_demo_preference");
    fetchUserData(authenticatedUser.id);
  };

  const handleEnterDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem("reflecta_demo_preference", "true");
    loadDemoData();
  };

  const handleSignOut = async () => {
    if (isDemoMode) {
      setIsDemoMode(false);
      localStorage.removeItem("reflecta_demo_preference");
      setWardrobe([]);
      setScheduled([]);
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center items-center" id="global-loading">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900" />
        <p className="text-xs font-semibold text-neutral-500 font-mono tracking-wider mt-4">INITIALIZING REFLECTA STUDIO...</p>
      </div>
    );
  }

  // Auth Screen (Only show if not logged in AND not in demo mode)
  if (!user && !isDemoMode) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
        <div className="h-1.5 w-full bg-neutral-900" />
        <Auth onAuthSuccess={handleAuthSuccess} onEnterDemoMode={handleEnterDemoMode} />
        <footer className="border-t border-neutral-200 bg-white py-6 px-6 text-center text-xs text-neutral-400">
          <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">REFLECTA STUDIO</span>
          <span className="text-neutral-300 mx-2">•</span>
          <span>Digital Closet Mirror & AI Wardrober</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white" id="reflecta-root">

      {/* Editorial Top Border Accent */}
      <div className="h-1.5 w-full bg-neutral-900" />

      {/* Styled Premium Header */}
      <header className="bg-white border-b border-neutral-150 py-4 px-6 sticky top-0 z-40 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo Identity & Mode Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white relative group overflow-hidden">
              <Sparkle className="h-5 w-5 text-amber-200 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black tracking-widest text-neutral-950 font-mono uppercase">
                  R E F L E C T A
                </h1>
                <span className={`text-[8px] uppercase tracking-wider font-bold font-mono px-2 py-0.5 rounded ${
                  isDemoMode
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                }`}>
                  {isDemoMode ? "Demo Mode" : "Supabase Live"}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">
                AI Wardrobe Mirror & Stylist
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex flex-wrap items-center gap-1 bg-neutral-50 p-1 rounded-xl border border-neutral-150/80" id="main-nav">
            <button
              onClick={() => setActiveTab("mirror")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === "mirror"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
              id="nav-mirror-btn"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Smart Mirror</span>
            </button>

            <button
              onClick={() => setActiveTab("closet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === "closet"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
              id="nav-closet-btn"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>My Closet</span>
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === "schedule"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
              id="nav-schedule-btn"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Planner</span>
            </button>

            <button
              onClick={() => setActiveTab("insights")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === "insights"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
              id="nav-insights-btn"
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Insights</span>
            </button>
          </nav>

          {/* User profile & Database sync / signout bar */}
          <div className="flex items-center gap-3 bg-neutral-50 py-1.5 pl-3 pr-2 rounded-xl border border-neutral-150/80 text-xs">
            <div className="flex items-center gap-1.5">
              {isDemoMode ? (
                <Database className="h-3.5 w-3.5 text-amber-500" />
              ) : (
                <User className="h-3.5 w-3.5 text-neutral-600" />
              )}
              <span className="font-semibold text-neutral-700 max-w-[120px] truncate">
                {isDemoMode ? "Guest Style Preview" : (user?.user_metadata?.full_name || user?.email?.split("@")[0])}
              </span>
              {dbSyncing && (
                <Loader2 className="h-3 w-3 animate-spin text-neutral-400" />
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
              title="Sign Out"
              id="header-signout-btn"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="active-workspace-tab-container"
          >
            {activeTab === "mirror" && (
              <AIPanel
                wardrobeItems={wardrobe}
                onScheduleOutfit={handleScheduleOutfit}
              />
            )}

            {activeTab === "closet" && (
              <Wardrobe
                items={wardrobe}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onToggleFavorite={handleToggleFavorite}
                onSeedEssentials={handleSeedEssentials}
              />
            )}

            {activeTab === "schedule" && (
              <CalendarView
                scheduledOutfits={scheduled}
                onRemoveScheduledOutfit={handleRemoveScheduledOutfit}
                onUpdateNotes={handleUpdateNotes}
                onNavigateToPlan={() => setActiveTab("mirror")}
              />
            )}

            {activeTab === "insights" && (
              <Analytics items={wardrobe} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Minimal Footnotes */}
      <footer className="border-t border-neutral-200 bg-white py-8 mt-16 px-6 text-center" id="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">REFLECTA STUDIO</span>
            <span className="text-neutral-300">•</span>
            <span>Sustainable capsule wardrobing curated by Artificial Intelligence</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors flex items-center gap-0.5 font-semibold">
              <span>Image Sources</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
