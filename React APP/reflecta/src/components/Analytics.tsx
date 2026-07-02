import React from "react";
import { WardrobeItem } from "../types";
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from "recharts";
import {
  TrendingUp, CircleDot, Sparkles, FolderHeart,
  Paintbrush, Layers, ShieldCheck, Compass
} from "lucide-react";

interface AnalyticsProps {
  items: WardrobeItem[];
}

// Earthy minimalist palette
const CHART_COLORS = [
  "#4F4F4F", // Charcoal Gray
  "#8DA399", // Sage Green
  "#C59B6D", // Camel Brown
  "#9E8C78", // Taupe Grey
  "#E8DCC4", // Sand Beige
  "#5C6F7E", // Slate Blue
  "#7D5F54", // Cognac Brown
  "#4E6251"  // Olive Green
];

export default function Analytics({ items }: AnalyticsProps) {

  // 1. Calculate General Stats
  const totalItems = items.length;
  const favoriteItems = items.filter(i => i.isFavorite).length;

  // Find most common color
  const colorCounts: Record<string, number> = {};
  items.forEach(item => {
    colorCounts[item.color] = (colorCounts[item.color] || 0) + 1;
  });
  const mostCommonColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  // Find dominant category
  const categoryCounts: Record<string, number> = {};
  items.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });
  const dominantCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  // 2. Format Category Distribution Data
  const categoriesList = ["Top", "Bottom", "Outerwear", "Shoes", "Accessory"];
  const categoryData = categoriesList.map(cat => ({
    name: cat === "Shoes" ? "Footwear" : cat === "Accessory" ? "Accessories" : `${cat}s`,
    count: categoryCounts[cat] || 0
  }));

  // 3. Format Color Distribution Data (Top 5 colors, aggregate others)
  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
  const topColors = sortedColors.slice(0, 5);
  const otherColorsCount = sortedColors.slice(5).reduce((sum, current) => sum + current[1], 0);

  const colorData = topColors.map(([name, value]) => ({ name, value }));
  if (otherColorsCount > 0) {
    colorData.push({ name: "Other Hues", value: otherColorsCount });
  }

  // 4. Seasonal Breakdown
  const seasonCounts: Record<string, number> = {};
  items.forEach(item => {
    seasonCounts[item.season] = (seasonCounts[item.season] || 0) + 1;
  });
  const seasonsList = ["Spring", "Summer", "Fall", "Winter", "All-Season"];
  const seasonData = seasonsList.map(sn => ({
    name: sn,
    Items: seasonCounts[sn] || 0
  }));

  return (
    <div className="space-y-6" id="analytics-panel">

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-grid">

        {/* Card 1: Total Pieces */}
        <div className="bg-white border border-neutral-150 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
            <Layers className="h-5 w-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-neutral-400 block">Total Pieces</span>
            <span className="text-xl font-black text-neutral-900 mt-0.5 block">{totalItems}</span>
          </div>
        </div>

        {/* Card 2: Favorites Count */}
        <div className="bg-white border border-neutral-150 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <FolderHeart className="h-5 w-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-neutral-400 block">Starred Items</span>
            <span className="text-xl font-black text-neutral-900 mt-0.5 block">{favoriteItems}</span>
          </div>
        </div>

        {/* Card 3: Dominant Shade */}
        <div className="bg-white border border-neutral-150 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
            <Paintbrush className="h-5 w-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-neutral-400 block">Dominant Shade</span>
            <span className="text-xs font-bold text-neutral-900 mt-0.5 block truncate max-w-[120px]" title={mostCommonColor}>{mostCommonColor}</span>
          </div>
        </div>

        {/* Card 4: Main Category */}
        <div className="bg-white border border-neutral-150 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
            <TrendingUp className="h-5 w-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-neutral-400 block">Primary Silhouette</span>
            <span className="text-xs font-bold text-neutral-900 mt-0.5 block truncate max-w-[120px]" title={dominantCategory}>{dominantCategory}s</span>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      {totalItems > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="charts-grid">

          {/* Chart A: Closet Color Distribution */}
          <div className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-sm flex flex-col justify-between" id="colors-chart-card">
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
                <CircleDot className="h-3.5 w-3.5 text-neutral-500" />
                <span>Color Spectrum Analysis</span>
              </h4>
              <p className="text-[10px] text-neutral-400">Proportional representation of color shades present in your collection.</p>
            </div>

            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={colorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {colorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E5E5", fontSize: "11px", fontFamily: "sans-serif" }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", color: "#666" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart B: Category Densities */}
          <div className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-sm flex flex-col justify-between" id="category-chart-card">
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
                <Layers className="h-3.5 w-3.5 text-neutral-500" />
                <span>Category Composition</span>
              </h4>
              <p className="text-[10px] text-neutral-400">Detailed volume count of garments separated by classification.</p>
            </div>

            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="name" stroke="#999" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#999" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E5E5", fontSize: "11px" }}
                  />
                  <Bar dataKey="count" name="Count" fill="#4F4F4F" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart C: Seasonal Breakdown */}
          <div className="bg-white border border-neutral-150 p-6 rounded-2xl shadow-sm md:col-span-2 flex flex-col justify-between" id="season-chart-card">
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
                <Compass className="h-3.5 w-3.5 text-neutral-500" />
                <span>Seasonal garment suitability</span>
              </h4>
              <p className="text-[10px] text-neutral-400">Total count of outfits and items tailored for individual climatic periods.</p>
            </div>

            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F0" />
                  <XAxis type="number" stroke="#999" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" stroke="#999" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E5E5", fontSize: "11px" }}
                  />
                  <Bar dataKey="Items" fill="#8DA399" radius={[0, 4, 4, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-neutral-150 rounded-2xl" id="analytics-empty-state">
          <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 mb-3 border border-neutral-100">
            <Compass className="h-5 w-5 stroke-[1.5]" />
          </div>
          <h3 className="text-sm font-bold text-neutral-800">Closet Metrics Silenced</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs text-center">Incorporate beautiful pieces into your Wardrobe Closet first to visualize style analytics and seasonal density charts.</p>
        </div>
      )}

      {/* Wardrobe health indicator block */}
      <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" id="analytics-footer">
        <div className="flex gap-3 items-start">
          <ShieldCheck className="h-5 w-5 text-neutral-800 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-neutral-800">Capsule Wardrobe Balance</h4>
            <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Your wardrobe achieves a neutral silhouette balance with an equal density of tops, outerwear, and bottom combinations, providing solid AI generation accuracy.</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-neutral-400 font-mono tracking-wider bg-white border border-neutral-150 px-2.5 py-1 rounded">
          STATUS: BALANCED
        </span>
      </div>

    </div>
  );
}
