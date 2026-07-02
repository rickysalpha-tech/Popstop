import React, { useState, useRef } from "react";
import { WardrobeItem, WardrobeCategory } from "../types";
import {
  Plus, Search, SlidersHorizontal, Heart, Trash2, Calendar,
  Tag, Compass, Info, Upload, Check, X, Sparkles, Filter, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WardrobeProps {
  items: WardrobeItem[];
  onAddItem: (item: Omit<WardrobeItem, "id" | "dateAdded">) => void;
  onDeleteItem: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSeedEssentials?: () => void;
}

const CATEGORIES: { value: WardrobeCategory | "All"; label: string }[] = [
  { value: "All", label: "All Items" },
  { value: "Top", label: "Tops" },
  { value: "Bottom", label: "Bottoms" },
  { value: "Outerwear", label: "Outerwear" },
  { value: "Shoes", label: "Footwear" },
  { value: "Accessory", label: "Accessories" }
];

const SEASONS = ["All", "Spring", "Summer", "Fall", "Winter", "All-Season"];

const COLOR_PRESETS = [
  { name: "Cream White", hex: "#FAF6F0", border: "border-neutral-300" },
  { name: "Sand Beige", hex: "#E8DCC4", border: "border-transparent" },
  { name: "Camel Brown", hex: "#C59B6D", border: "border-transparent" },
  { name: "Sage Green", hex: "#8DA399", border: "border-transparent" },
  { name: "Midnight Black", hex: "#1A1A1A", border: "border-neutral-800" },
  { name: "Slate Blue", hex: "#4A5D6E", border: "border-transparent" },
  { name: "Charcoal Gray", hex: "#5C5C5C", border: "border-transparent" },
  { name: "Burgundy Red", hex: "#722F37", border: "border-transparent" },
  { name: "Cognac Brown", hex: "#9E5638", border: "border-transparent" },
  { name: "Olive Green", hex: "#556B2F", border: "border-transparent" }
];

export default function Wardrobe({ items, onAddItem, onDeleteItem, onToggleFavorite, onSeedEssentials }: WardrobeProps) {
  const [activeCategory, setActiveCategory] = useState<WardrobeCategory | "All">("All");
  const [activeSeason, setActiveSeason] = useState<string>("All");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add item form state
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<WardrobeCategory>("Top");
  const [formColor, setFormColor] = useState("Cream White");
  const [formSeason, setFormSeason] = useState<WardrobeItem["season"]>("All-Season");
  const [formOccasions, setFormOccasions] = useState<string[]>(["Casual"]);
  const [formNotes, setFormNotes] = useState("");
  const [formImage, setFormImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSeason = activeSeason === "All" || item.season === activeSeason || item.season === "All-Season";
    const matchesFavorite = !onlyFavorites || item.isFavorite;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSeason && matchesFavorite && matchesSearch;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setFormImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setFormImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const toggleFormOccasion = (occ: string) => {
    if (formOccasions.includes(occ)) {
      setFormOccasions(formOccasions.filter(o => o !== occ));
    } else {
      setFormOccasions([...formOccasions, occ]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    // Default aesthetic mock images based on category if none uploaded
    let finalImage = formImage;
    if (!finalImage) {
      if (formCategory === "Top") {
        finalImage = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop";
      } else if (formCategory === "Bottom") {
        finalImage = "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop";
      } else if (formCategory === "Outerwear") {
        finalImage = "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop";
      } else if (formCategory === "Shoes") {
        finalImage = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop";
      } else {
        finalImage = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop";
      }
    }

    onAddItem({
      name: formName,
      category: formCategory,
      color: formColor,
      season: formSeason,
      occasions: formOccasions,
      imageUrl: finalImage,
      notes: formNotes,
      isFavorite: false
    });

    // Reset Form
    setFormName("");
    setFormCategory("Top");
    setFormColor("Cream White");
    setFormSeason("All-Season");
    setFormOccasions(["Casual"]);
    setFormNotes("");
    setFormImage("");
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-neutral-150 shadow-sm" id="wardrobe-toolbar">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search items, colors..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 transition-colors text-neutral-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="wardrobe-search-input"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Season Filter Dropdown */}
          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-2 border border-neutral-200 rounded-xl text-xs text-neutral-600">
            <Filter className="h-3 w-3" />
            <select
              className="bg-transparent focus:outline-none cursor-pointer pr-2 font-medium"
              value={activeSeason}
              onChange={(e) => setActiveSeason(e.target.value)}
              id="wardrobe-season-select"
            >
              <option value="All">All Seasons</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          </div>

          {/* Favorites Filter Button */}
          <button
            className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs transition-all ${
              onlyFavorites
                ? "bg-rose-50 border-rose-200 text-rose-600 font-medium"
                : "bg-neutral-50 border-neutral-200 text-neutral-600"
            }`}
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            id="wardrobe-favs-toggle"
          >
            <Heart className={`h-3 w-3 ${onlyFavorites ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>Favorites</span>
          </button>

          {/* Add Item Trigger */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 ml-auto md:ml-0 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-300"
            id="wardrobe-add-btn"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none border-b border-neutral-200 gap-2" id="wardrobe-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat.value
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-200"
            }`}
            id={`tab-category-${cat.value.toLowerCase()}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" id="wardrobe-grid">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="group bg-white rounded-2xl border border-neutral-150 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedItem(item)}
              id={`wardrobe-item-card-${item.id}`}
            >
              <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Favorite badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute right-2.5 top-2.5 p-1.5 rounded-full bg-white/90 shadow-sm backdrop-blur-sm hover:bg-white text-neutral-600 hover:text-rose-500 transition-colors"
                  id={`fav-btn-${item.id}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${item.isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>

                {/* Category small badge */}
                <span className="absolute left-2.5 bottom-2.5 px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-black/75 text-white rounded font-medium">
                  {item.category}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-neutral-800 line-clamp-1 group-hover:text-neutral-900 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-neutral-500">
                    <span className="w-2.5 h-2.5 rounded-full border border-neutral-300" style={{ backgroundColor: COLOR_PRESETS.find(c => c.name === item.color)?.hex || "#CCCCCC" }}></span>
                    <span>{item.color}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-50">
                  <span className="text-[9px] text-neutral-400 uppercase font-mono">{item.season}</span>
                  <div className="flex gap-1">
                    {item.occasions.slice(0, 1).map((occ, idx) => (
                      <span key={idx} className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-medium">
                        {occ}
                      </span>
                    ))}
                    {item.occasions.length > 1 && (
                      <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1 py-0.5 rounded font-semibold">
                        +{item.occasions.length - 1}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-neutral-150 rounded-2xl p-6" id="wardrobe-empty-state">
          {items.length === 0 ? (
            <>
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                <Layers className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-800">Your Virtual Closet is Empty</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm text-center leading-relaxed">
                Start building your sustainable capsule collection by adding individual garments, or seed your wardrobe instantly with our premium classic essentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
                  id="empty-add-item-btn"
                >
                  Add Custom Item
                </button>
                {onSeedEssentials && (
                  <button
                    onClick={onSeedEssentials}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 border border-neutral-200"
                    id="empty-seed-items-btn"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>Seed Capsule Essentials</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                <Compass className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-800">No items match your filters</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs text-center">Try adjusting your filters, searching for something else, or creating a new item to populate your virtual smart wardrobe.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSeason("All");
                  setOnlyFavorites(false);
                  setSearchQuery("");
                }}
                className="mt-4 text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
              >
                Clear All Filters
              </button>
            </>
          )}
        </div>
      )}

      {/* Item Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="item-details-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors z-20"
                id="close-item-modal-btn"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Left: Image */}
                <div className="relative aspect-square w-full bg-neutral-100 sm:h-full">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-3 bottom-3 flex gap-1">
                    <span className="bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded font-medium">
                      {selectedItem.category}
                    </span>
                  </div>
                </div>

                {/* Right: Info details */}
                <div className="p-6 flex flex-col justify-between h-full bg-white">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider">
                          {selectedItem.season} Item
                        </span>
                        <button
                          onClick={() => {
                            onToggleFavorite(selectedItem.id);
                            setSelectedItem(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
                          }}
                          className={`p-1 hover:scale-105 transition-transform ${selectedItem.isFavorite ? "text-rose-500" : "text-neutral-400"}`}
                        >
                          <Heart className={`h-5 w-5 ${selectedItem.isFavorite ? "fill-rose-500" : ""}`} />
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 mt-1 leading-snug">
                        {selectedItem.name}
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-neutral-400 font-medium w-16">Color:</span>
                        <div className="flex items-center gap-1.5 text-neutral-800">
                          <span className="w-3 h-3 rounded-full border border-neutral-300" style={{ backgroundColor: COLOR_PRESETS.find(c => c.name === selectedItem.color)?.hex || "#CCCCCC" }}></span>
                          <span>{selectedItem.color}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-neutral-400 font-medium w-16 pt-0.5">Occasions:</span>
                        <div className="flex flex-wrap gap-1 text-neutral-800 flex-1">
                          {selectedItem.occasions.map((occ, idx) => (
                            <span key={idx} className="bg-neutral-100 text-neutral-700 text-[10px] px-2 py-0.5 rounded font-medium">
                              {occ}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedItem.notes && (
                        <div className="pt-2 border-t border-neutral-100">
                          <span className="text-neutral-400 text-xs font-semibold block mb-1">Stylist Notes:</span>
                          <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl italic leading-relaxed border border-neutral-100">
                            "{selectedItem.notes}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 mt-6 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-neutral-400">Added {selectedItem.dateAdded}</span>
                    <button
                      onClick={() => {
                        onDeleteItem(selectedItem.id);
                        setSelectedItem(null);
                      }}
                      className="flex items-center gap-1 text-xs text-rose-500 font-semibold hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-all"
                      id={`delete-btn-${selectedItem.id}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Archive</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Item Modal Form */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="add-item-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-white">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">Add Wardrobe Piece</h3>
                    <p className="text-[10px] text-neutral-500">Incorporate a new item into your digital smart mirror.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto max-h-[75vh]">
                <div className="p-6 space-y-4">
                  {/* Image Upload Area */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-2">Item Visual</label>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={triggerFileSelect}
                      className={`relative aspect-[16/9] w-full rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ${
                        formImage
                          ? "border-neutral-300 bg-neutral-50"
                          : isDragging
                            ? "border-neutral-900 bg-neutral-50 scale-[0.99]"
                            : "border-neutral-250 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-400"
                      }`}
                      id="image-dropzone"
                    >
                      {formImage ? (
                        <>
                          <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 text-neutral-800 text-[10px] font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1">
                              <Upload className="h-3.5 w-3.5" />
                              Replace Image
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center">
                          <Upload className="h-6 w-6 text-neutral-400 mx-auto mb-2" />
                          <span className="text-xs font-semibold text-neutral-700 block">Drag & Drop Image</span>
                          <span className="text-[10px] text-neutral-400 block mt-1">or click to browse your files (PNG, JPG)</span>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                        id="wardrobe-file-input"
                      />
                    </div>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-1">Item Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vintage Suede Blazer, Organic Cotton Tee..."
                      className="w-full px-3 py-2 text-sm border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800 bg-white"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      id="input-item-name"
                    />
                  </div>

                  {/* Grid fields for Category and Season */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-800 block mb-1">Category</label>
                      <select
                        className="w-full px-3 py-2 text-sm border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 bg-white text-neutral-800"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as WardrobeCategory)}
                        id="select-item-category"
                      >
                        <option value="Top">Tops</option>
                        <option value="Bottom">Bottoms</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Shoes">Footwear</option>
                        <option value="Accessory">Accessories</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-800 block mb-1">Seasonal Suitability</label>
                      <select
                        className="w-full px-3 py-2 text-sm border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 bg-white text-neutral-800"
                        value={formSeason}
                        onChange={(e) => setFormSeason(e.target.value as WardrobeItem["season"])}
                        id="select-item-season"
                      >
                        <option value="All-Season">All-Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                      </select>
                    </div>
                  </div>

                  {/* Color Grid Selector */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-2">Item Hue ({formColor})</label>
                    <div className="flex flex-wrap gap-2" id="color-grid">
                      {COLOR_PRESETS.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setFormColor(color.name)}
                          className={`w-7 h-7 rounded-full border transition-all relative flex items-center justify-center ${color.border} ${
                            formColor === color.name ? "scale-110 shadow-sm" : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          id={`color-btn-${color.name.toLowerCase().replace(" ", "-")}`}
                        >
                          {formColor === color.name && (
                            <Check className={`h-3.5 w-3.5 ${color.name === "Cream White" ? "text-neutral-800" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multi-select Occasions */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-2">Suited Occasions</label>
                    <div className="flex flex-wrap gap-1.5" id="occasions-select-grid">
                      {["Casual", "Business", "Formal", "Date", "Active", "Lounge"].map((occ) => {
                        const isSelected = formOccasions.includes(occ);
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => toggleFormOccasion(occ)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-neutral-900 border border-neutral-900 text-white shadow-sm"
                                : "bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                            }`}
                            id={`occ-btn-${occ.toLowerCase()}`}
                          >
                            {occ}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Fabric info */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-800 block mb-1">Stylist Notes (Material, fit, etc.)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 100% cashmere, relaxed drop shoulders, style loosely..."
                      className="w-full px-3 py-2 text-sm border border-neutral-250 rounded-xl focus:outline-none focus:border-neutral-900 text-neutral-800 bg-white"
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      id="input-item-notes"
                    />
                  </div>
                </div>

                {/* Form Action buttons */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-3 rounded-b-2xl">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                    id="cancel-add-item-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                    id="save-item-btn"
                  >
                    Integrate Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
