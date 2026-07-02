import React, { useState } from "react";
import { WardrobeItem, RecommendedOutfit, AIRecommendationResponse } from "../types";
import { PRESET_WEATHER, PRESET_OCCASIONS, PRESET_VIBES } from "../data";
import {
  Sparkles, Sun, Wind, Snowflake, CloudRain, ThermometerSun,
  ArrowRight, ShieldAlert, CheckCircle2, ShoppingBag, Calendar,
  Heart, HelpCircle, RefreshCw, Layers, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIPanelProps {
  wardrobeItems: WardrobeItem[];
  onScheduleOutfit: (outfit: RecommendedOutfit, date: string, occasion: string, weather: string) => void;
}

const DAYS_OF_WEEK = [
  { name: "Monday", date: "2026-07-06" },
  { name: "Tuesday", date: "2026-07-07" },
  { name: "Wednesday", date: "2026-07-08" },
  { name: "Thursday", date: "2026-07-09" },
  { name: "Friday", date: "2026-07-10" },
  { name: "Saturday", date: "2026-07-11" },
  { name: "Sunday", date: "2026-07-12" }
];

export default function AIPanel({ wardrobeItems, onScheduleOutfit }: AIPanelProps) {
  // Recommendation Input Parameters
  const [selectedWeather, setSelectedWeather] = useState(PRESET_WEATHER[2].value);
  const [selectedOccasion, setSelectedOccasion] = useState(PRESET_OCCASIONS[0].value);
  const [selectedVibe, setSelectedVibe] = useState(PRESET_VIBES[0].value);

  // Custom Override States
  const [customWeather, setCustomWeather] = useState("");
  const [customOccasion, setCustomOccasion] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Styling Response State
  const [isLoading, setIsLoading] = useState(false);
  const [stylingData, setStylingData] = useState<AIRecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Active Selected Outfit Details Modal
  const [schedulingOutfitId, setSchedulingOutfitId] = useState<string | null>(null);
  const [scheduleSuccessMsg, setScheduleSuccessMsg] = useState("");

  const getWeatherIcon = (weatherStr: string) => {
    const lower = weatherStr.toLowerCase();
    if (lower.includes("wind") || lower.includes("chilly")) return <Wind className="h-4 w-4" />;
    if (lower.includes("snow") || lower.includes("cold")) return <Snowflake className="h-4 w-4" />;
    if (lower.includes("rain") || lower.includes("wet")) return <CloudRain className="h-4 w-4" />;
    if (lower.includes("warm") || lower.includes("humid")) return <ThermometerSun className="h-4 w-4" />;
    return <Sun className="h-4 w-4" />;
  };

  const handleGenerateRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setStylingData(null);

    const finalWeather = isCustomMode && customWeather.trim() ? customWeather : selectedWeather;
    const finalOccasion = isCustomMode && customOccasion.trim() ? customOccasion : selectedOccasion;
    const finalVibe = isCustomMode && customVibe.trim() ? customVibe : selectedVibe;

    try {
      const response = await fetch("/api/recommend-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wardrobeItems,
          weather: finalWeather,
          occasion: finalOccasion,
          styleVibe: finalVibe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "API server error occurred.");
      }

      setStylingData(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Could not generate suggestions. Please ensure the dev server is active and Gemini API key is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleSelect = (outfit: RecommendedOutfit, day: typeof DAYS_OF_WEEK[0]) => {
    const finalWeather = isCustomMode && customWeather.trim() ? customWeather : selectedWeather;
    const finalOccasion = isCustomMode && customOccasion.trim() ? customOccasion : selectedOccasion;

    onScheduleOutfit(outfit, day.date, finalOccasion, finalWeather);
    setSchedulingOutfitId(null);

    setScheduleSuccessMsg(`Outfit Scheduled for ${day.name}!`);
    setTimeout(() => setScheduleSuccessMsg(""), 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="ai-styling-studio">

      {/* Left Column: Control Deck (Form Inputs) */}
      <div className="lg:col-span-4 bg-white border border-neutral-150 p-6 rounded-2xl shadow-sm space-y-6 h-fit" id="ai-control-deck">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-neutral-950 text-white shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-amber-300 fill-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Virtual Stylist Mirror</h3>
            <p className="text-[10px] text-neutral-500 font-medium">Configure parameters to generate dynamic styling fits.</p>
          </div>
        </div>

        <div className="space-y-4">

          {/* Custom Mode Toggle */}
          <div className="flex justify-between items-center bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-100">
            <span className="text-[11px] font-semibold text-neutral-700">Allow Custom Inputs</span>
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${isCustomMode ? "bg-neutral-900" : "bg-neutral-250"}`}
              id="custom-mode-switch"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isCustomMode ? "translate-x-4" : "translate-x-0"}`}></div>
            </button>
          </div>

          {!isCustomMode ? (
            <>
              {/* Presets Weather */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Current Weather</label>
                <div className="space-y-1.5" id="weather-presets">
                  {PRESET_WEATHER.map((w) => (
                    <button
                      key={w.value}
                      onClick={() => setSelectedWeather(w.value)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-xs text-left transition-all ${
                        selectedWeather === w.value
                          ? "bg-neutral-950 border-neutral-950 text-white font-semibold"
                          : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                      id={`weather-btn-${w.icon}`}
                    >
                      {getWeatherIcon(w.value)}
                      <span className="flex-1 text-xs">{w.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets Occasions */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Occasion Context</label>
                <select
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  id="preset-occasion-select"
                >
                  {PRESET_OCCASIONS.map((occ) => (
                    <option key={occ.value} value={occ.value}>
                      {occ.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-400 italic">
                  {PRESET_OCCASIONS.find(o => o.value === selectedOccasion)?.desc}
                </p>
              </div>

              {/* Presets Vibes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Style Vibe / Aesthetic</label>
                <select
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800 font-medium"
                  value={selectedVibe}
                  onChange={(e) => setSelectedVibe(e.target.value)}
                  id="preset-vibe-select"
                >
                  {PRESET_VIBES.map((vb) => (
                    <option key={vb.value} value={vb.value}>
                      {vb.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-neutral-400 italic">
                  {PRESET_VIBES.find(v => v.value === selectedVibe)?.desc}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Custom Weather */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Custom Weather / Temp</label>
                <input
                  type="text"
                  placeholder="e.g. Freezing with heavy gale winds (2°C)"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800"
                  value={customWeather}
                  onChange={(e) => setCustomWeather(e.target.value)}
                  id="custom-weather-input"
                />
              </div>

              {/* Custom Occasion */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Custom Occasion</label>
                <input
                  type="text"
                  placeholder="e.g. Architect Client Pitch Lunch"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800"
                  value={customOccasion}
                  onChange={(e) => setCustomOccasion(e.target.value)}
                  id="custom-occasion-input"
                />
              </div>

              {/* Custom Vibe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider font-mono">Custom Aesthetic Vibe</label>
                <input
                  type="text"
                  placeholder="e.g. Japanese Techwear & Gorpcore"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800"
                  value={customVibe}
                  onChange={(e) => setCustomVibe(e.target.value)}
                  id="custom-vibe-input"
                />
              </div>
            </>
          )}

          {/* Active Items Count Indicator */}
          <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl text-[11px] text-neutral-600 border border-neutral-100 font-mono">
            <Layers className="h-4 w-4 stroke-[1.5] text-neutral-500" />
            <span>Matching against <strong>{wardrobeItems.length}</strong> active wardrobe pieces.</span>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleGenerateRecommendations}
            disabled={isLoading}
            className="w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-neutral-400"
            id="generate-outfits-btn"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-amber-200" />
                <span>Consulting Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4.5 w-4.5 text-amber-200" />
                <span>Render AI Suggestions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Mirror Output (Visual Results) */}
      <div className="lg:col-span-8 space-y-6" id="ai-mirror-output">

        {/* Alerts / Success / Initial States */}
        {scheduleSuccessMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-bounce" id="schedule-success-alert">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
            <span>{scheduleSuccessMsg}</span>
          </div>
        )}

        {/* Loading Screen */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-neutral-150 rounded-2xl shadow-sm text-center px-6 min-h-[400px]" id="styling-loading-state">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-neutral-100 border-t-neutral-900 animate-spin"></div>
              <Sparkles className="absolute h-6 w-6 text-amber-400 animate-pulse" />
            </div>

            <h3 className="text-sm font-bold text-neutral-900 mt-5">Styling Recommendations In-Progress</h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm">
              Reflecta is analyzing your digital wardrobe silhouettes, textures, and color pallets to generate cohesive styling options...
            </p>

            <div className="mt-8 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100 max-w-sm flex items-start gap-2 text-left">
              <HelpCircle className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-500 leading-normal">
                <strong>Stylist Tip:</strong> Layering thin garments like fine-knit turtlenecks underneath linen button-downs allows you to wear summer textures into the spring and autumn months gracefully.
              </p>
            </div>
          </div>
        )}

        {/* Error Screen */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 bg-rose-50 border border-rose-150 rounded-2xl text-center px-6" id="styling-error-state">
            <ShieldAlert className="h-10 w-10 text-rose-500 stroke-[1.5]" />
            <h3 className="text-sm font-bold text-rose-800 mt-4">Failed to Generate Looks</h3>
            <p className="text-xs text-rose-600 mt-2 max-w-md leading-relaxed">{error}</p>
            <button
              onClick={handleGenerateRecommendations}
              className="mt-5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State / Initial Instructions */}
        {!isLoading && !stylingData && !error && (
          <div className="flex flex-col items-center justify-center py-24 bg-white border border-neutral-150 rounded-2xl text-center px-6 min-h-[400px]" id="styling-empty-state">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 mb-4 border border-neutral-100">
              <Sparkles className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold text-neutral-800">Your AI Smart Styling Mirror</h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm leading-relaxed">
              Select weather and mood on the left control deck, then click <strong>"Render AI Suggestions"</strong>. Our stylist agent will analyze your closet and recommend high-fashion ensembles.
            </p>
          </div>
        )}

        {/* AI Recommendations Results Display */}
        {stylingData && (
          <div className="space-y-6" id="styling-results">

            {/* General AI Stylist Couching Advice */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 shadow-sm relative overflow-hidden" id="general-advice-card">
              <div className="absolute right-4 top-4 opacity-5 text-neutral-900 pointer-events-none">
                <Sparkles className="h-24 w-24" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500" />
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono">Reflecta Editorial Coaching</h4>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed italic">
                "{stylingData.generalAdvice}"
              </p>
            </div>

            {/* Curated Ensembles Header */}
            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider font-mono mb-3">Curated Ensembles</h4>

              {/* Outfits Deck */}
              <div className="space-y-6" id="outfits-deck">
                {stylingData.outfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    className="bg-white border border-neutral-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    id={`outfit-recommendation-${outfit.id}`}
                  >

                    {/* Outfit Header */}
                    <div className="px-5 py-4 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-neutral-50/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-neutral-900">{outfit.name}</h3>
                          <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                            Fit Score: {outfit.suitabilityScore}%
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">{outfit.description}</p>
                      </div>

                      {/* Schedule Button and state */}
                      <div className="relative self-stretch sm:self-auto shrink-0">
                        {schedulingOutfitId === outfit.id ? (
                          <div className="absolute right-0 top-0 bg-white shadow-xl border border-neutral-200 rounded-xl p-3 z-30 min-w-[200px] flex flex-col gap-1.5" id="schedule-dropdown">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono tracking-wider mb-1 block">Pick day to style:</span>
                            {DAYS_OF_WEEK.map((day) => (
                              <button
                                key={day.name}
                                onClick={() => handleScheduleSelect(outfit, day)}
                                className="w-full text-left text-xs hover:bg-neutral-50 px-2 py-1.5 rounded-lg text-neutral-700 font-semibold transition-colors flex items-center justify-between"
                                id={`day-btn-${day.name.toLowerCase()}`}
                              >
                                <span>{day.name}</span>
                                <span className="text-[9px] font-mono text-neutral-400">07/0{day.date.split("-")[2]}</span>
                              </button>
                            ))}
                            <button
                              onClick={() => setSchedulingOutfitId(null)}
                              className="w-full text-center text-[10px] font-semibold text-rose-500 border-t border-neutral-100 pt-2 mt-1 hover:text-rose-700"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSchedulingOutfitId(outfit.id)}
                            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
                            id={`schedule-trigger-${outfit.id}`}
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Schedule to Wear</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Outfit Pieces Grid */}
                    <div className="p-5 border-b border-neutral-100" id="outfit-pieces-grid">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {outfit.items.map((piece, pIdx) => {
                          // Find matched item in user's real closet if applicable
                          const realClosetItem = piece.matchedFromCloset
                            ? wardrobeItems.find(item => item.id === piece.closetItemId || item.name.toLowerCase().includes(piece.itemName.toLowerCase()))
                            : null;

                          return (
                            <div
                              key={pIdx}
                              className={`p-3.5 rounded-xl border flex gap-3.5 items-start ${
                                piece.matchedFromCloset
                                  ? "bg-emerald-50/20 border-emerald-100"
                                  : "bg-neutral-50/20 border-neutral-200"
                              }`}
                              id={`piece-${pIdx}`}
                            >
                              {/* Visual Thumbnail */}
                              <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                                {realClosetItem ? (
                                  <img
                                    src={realClosetItem.imageUrl}
                                    alt={realClosetItem.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400">
                                    <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-400">
                                    {piece.category}
                                  </span>
                                  {piece.matchedFromCloset ? (
                                    <span className="bg-emerald-100 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-emerald-200">
                                      <CheckCircle2 className="h-2.5 w-2.5" />
                                      <span>Closet Match</span>
                                    </span>
                                  ) : (
                                    <span className="bg-neutral-100 text-neutral-600 text-[8px] font-bold px-1.5 py-0.5 rounded border border-neutral-200">
                                      Suggested Addition
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-xs font-bold text-neutral-800 leading-snug">
                                  {piece.itemName}
                                </h4>
                                <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                                  <span className="font-semibold text-neutral-600">Color:</span>
                                  <span>{piece.color}</span>
                                </div>
                                <p className="text-[10px] text-neutral-500 leading-relaxed">
                                  {piece.reason}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Styling Tips section */}
                    <div className="p-4 bg-neutral-50/50 flex flex-col md:flex-row gap-3 text-xs" id="styling-tips-box">
                      <div className="font-bold text-neutral-800 font-mono text-[10px] uppercase tracking-wider md:w-28 shrink-0 pt-0.5">
                        Styling Instructions:
                      </div>
                      <ul className="space-y-1 text-[11px] text-neutral-600 flex-1 list-disc pl-4 md:pl-0 list-inside">
                        {outfit.stylingTips.map((tip, tIdx) => (
                          <li key={tIdx} className="leading-relaxed">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
