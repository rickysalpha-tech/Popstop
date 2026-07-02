import React, { useState } from "react";
import { ScheduledOutfit, RecommendedOutfit } from "../types";
import {
  Calendar, Sun, Wind, Snowflake, CloudRain, ThermometerSun,
  Trash2, FileText, CheckCircle2, AlertCircle, PlusCircle, Bookmark, ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CalendarViewProps {
  scheduledOutfits: ScheduledOutfit[];
  onRemoveScheduledOutfit: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onNavigateToPlan: () => void;
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

export default function CalendarView({ scheduledOutfits, onRemoveScheduledOutfit, onUpdateNotes, onNavigateToPlan }: CalendarViewProps) {
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesTempText, setNotesTempText] = useState("");

  const getWeatherIcon = (weatherStr: string) => {
    const lower = weatherStr.toLowerCase();
    if (lower.includes("wind") || lower.includes("chilly")) return <Wind className="h-4 w-4 text-blue-500" />;
    if (lower.includes("snow") || lower.includes("cold")) return <Snowflake className="h-4 w-4 text-sky-400" />;
    if (lower.includes("rain") || lower.includes("wet")) return <CloudRain className="h-4 w-4 text-blue-400" />;
    if (lower.includes("warm") || lower.includes("humid")) return <ThermometerSun className="h-4 w-4 text-amber-500" />;
    return <Sun className="h-4 w-4 text-amber-400" />;
  };

  const startEditingNotes = (evt: ScheduledOutfit) => {
    setEditingNotesId(evt.id);
    setNotesTempText(evt.notes || "");
  };

  const saveNotes = (id: string) => {
    onUpdateNotes(id, notesTempText);
    setEditingNotesId(null);
  };

  return (
    <div className="space-y-6" id="calendar-scheduler">

      {/* Calendar Description */}
      <div className="bg-white border border-neutral-150 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="calendar-header">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-neutral-800" />
            <span>Weekly Styling Schedule</span>
          </h3>
          <p className="text-xs text-neutral-500">Coordinate and lock in outfits for upcoming occasions. Stay weather-ready and beautifully composed.</p>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-xl border border-neutral-200">
          Week of July 6, 2026
        </span>
      </div>

      {/* Week Calendar Stack */}
      <div className="space-y-4" id="calendar-stack">
        {DAYS_OF_WEEK.map((day) => {
          // Find if there is a scheduled outfit for this day
          const scheduleEvent = scheduledOutfits.find(evt => evt.date === day.date);

          return (
            <div
              key={day.date}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                scheduleEvent
                  ? "border-neutral-200 hover:shadow-md"
                  : "border-neutral-200/60 border-dashed"
              }`}
              id={`calendar-day-${day.name.toLowerCase()}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">

                {/* Left Panel: Day Indicator */}
                <div className="lg:col-span-3 p-5 bg-neutral-50/50 border-r border-neutral-100 flex lg:flex-col justify-between items-center lg:items-start gap-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-neutral-900">{day.name}</h4>
                    <span className="text-[10px] font-mono text-neutral-400 font-semibold block mt-1">July {day.date.split("-")[2]}, 2026</span>
                  </div>

                  {scheduleEvent ? (
                    <div className="flex flex-col gap-1.5 text-left lg:mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                        {getWeatherIcon(scheduleEvent.weather)}
                        <span className="truncate max-w-[120px]" title={scheduleEvent.weather}>
                          {scheduleEvent.weather.split(" ")[0]}
                        </span>
                      </div>
                      <span className="text-[10px] bg-neutral-150 text-neutral-700 px-2 py-0.5 rounded font-bold w-fit">
                        {scheduleEvent.occasion}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 font-bold">
                      Open Slot
                    </span>
                  )}
                </div>

                {/* Right Panel: Content Area */}
                <div className="lg:col-span-9 p-5 flex flex-col justify-between h-full bg-white">
                  {scheduleEvent ? (
                    <div className="space-y-4">

                      {/* Outfit Identity */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-neutral-900">{scheduleEvent.outfit.name}</h4>
                            <span className="bg-emerald-50 text-emerald-800 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                              Curated Style Match ({scheduleEvent.outfit.suitabilityScore}%)
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                            {scheduleEvent.outfit.description}
                          </p>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => onRemoveScheduledOutfit(scheduleEvent.id)}
                          className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          title="Remove Outfit"
                          id={`unschedule-btn-${day.name.toLowerCase()}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Item Swatches Carousel */}
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {scheduleEvent.outfit.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-150 py-1 px-2.5 rounded-lg text-[10px]"
                            id={`swatch-${idx}`}
                          >
                            <span className="w-2 h-2 rounded-full border border-neutral-300" style={{ backgroundColor: item.matchedFromCloset ? "#10B981" : "#A3A3A3" }}></span>
                            <span className="font-semibold text-neutral-700">{item.itemName}</span>
                            <span className="text-neutral-400 font-mono text-[9px]">({item.color})</span>
                          </div>
                        ))}
                      </div>

                      {/* Day Styling Diary Notes */}
                      <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row gap-3 items-start">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 shrink-0 pt-1">
                          <FileText className="h-3.5 w-3.5" />
                          <span>Diary / Notes:</span>
                        </div>

                        {editingNotesId === scheduleEvent.id ? (
                          <div className="flex-1 flex gap-2 w-full" id={`notes-edit-block-${scheduleEvent.id}`}>
                            <input
                              type="text"
                              className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-250 rounded-lg focus:outline-none focus:border-neutral-900 text-neutral-800"
                              placeholder="Add daily notes (e.g., 'Carry black umbrella', 'Wear silver watch')"
                              value={notesTempText}
                              onChange={(e) => setNotesTempText(e.target.value)}
                              id={`notes-input-${scheduleEvent.id}`}
                            />
                            <button
                              onClick={() => saveNotes(scheduleEvent.id)}
                              className="bg-neutral-900 text-white text-xs px-3 py-1 rounded-lg font-semibold hover:bg-neutral-800"
                              id={`save-notes-btn-${scheduleEvent.id}`}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => startEditingNotes(scheduleEvent)}
                            className="flex-1 text-xs text-neutral-600 bg-neutral-50 hover:bg-neutral-100/70 p-2 rounded-xl italic cursor-pointer leading-relaxed border border-neutral-100/50 flex justify-between items-center w-full"
                            id={`notes-view-block-${scheduleEvent.id}`}
                          >
                            <span>
                              {scheduleEvent.notes ? `"${scheduleEvent.notes}"` : "Click to log coordinate notes, weather amendments, or accessories..."}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold ml-2 shrink-0">Edit</span>
                          </div>
                        )}
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3">
                      <div className="flex items-center gap-2 text-neutral-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-medium italic">Empty Reflection. No garments allocated for {day.name}.</span>
                      </div>

                      <button
                        onClick={onNavigateToPlan}
                        className="flex items-center gap-1 text-xs font-bold text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-xl transition-all"
                        id={`plan-btn-${day.name.toLowerCase()}`}
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Curate Look</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
