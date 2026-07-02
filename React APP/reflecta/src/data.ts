import { WardrobeItem } from "./types";

export const INITIAL_WARDROBE: WardrobeItem[] = [
  {
    id: "item-1",
    name: "Double-Breasted Wool Overcoat",
    category: "Outerwear",
    color: "Charcoal Gray",
    season: "Winter",
    occasions: ["Business", "Date", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop",
    isFavorite: true,
    notes: "Heavy premium Italian wool blend. Fits slightly oversized.",
    dateAdded: "2026-01-15"
  },
  {
    id: "item-2",
    name: "Cashmere Crewneck Knit",
    category: "Top",
    color: "Camel Brown",
    season: "Winter",
    occasions: ["Casual", "Business", "Date", "Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",
    isFavorite: true,
    notes: "Super soft 100% Mongolian cashmere. Perfect layering piece.",
    dateAdded: "2026-01-20"
  },
  {
    id: "item-3",
    name: "Classic Silk Button-Down",
    category: "Top",
    color: "Off-White",
    season: "Spring",
    occasions: ["Business", "Date", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop",
    notes: "Sandwashed mulberry silk. Drape is very elegant.",
    dateAdded: "2026-02-02"
  },
  {
    id: "item-4",
    name: "Japanese Raw Selvedge Denim",
    category: "Bottom",
    color: "Indigo Blue",
    season: "All-Season",
    occasions: ["Casual", "Date", "Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
    isFavorite: true,
    notes: "Straight cut, 14.5oz stiff denim. Fading beautifully.",
    dateAdded: "2026-01-10"
  },
  {
    id: "item-5",
    name: "Tailored Pleated Trousers",
    category: "Bottom",
    color: "Sandy Beige",
    season: "Spring",
    occasions: ["Business", "Date", "Casual", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    notes: "High-waisted, relaxed thigh, slight taper. Viscose-wool blend.",
    dateAdded: "2026-02-18"
  },
  {
    id: "item-6",
    name: "Unstructured Linen Blazer",
    category: "Outerwear",
    color: "Oatmeal",
    season: "Summer",
    occasions: ["Casual", "Business", "Date"],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    notes: "100% French flax linen. Breezy and effortless.",
    dateAdded: "2026-03-01"
  },
  {
    id: "item-7",
    name: "Minimalist Leather Trainers",
    category: "Shoes",
    color: "Chalk White",
    season: "All-Season",
    occasions: ["Casual", "Lounge", "Date"],
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
    isFavorite: true,
    notes: "Nappa leather with Margom rubber sole. Clean branding.",
    dateAdded: "2026-01-05"
  },
  {
    id: "item-8",
    name: "Calfskin Chelsea Boots",
    category: "Shoes",
    color: "Chocolate Brown",
    season: "Winter",
    occasions: ["Date", "Business", "Casual", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop",
    notes: "Handcrafted in Portugal. Elastic side panels are tight.",
    dateAdded: "2026-01-22"
  },
  {
    id: "item-9",
    name: "Premium Suede Loafers",
    category: "Shoes",
    color: "Taupe Grey",
    season: "Summer",
    occasions: ["Date", "Business", "Casual", "Formal"],
    imageUrl: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop",
    notes: "Unlined Italian suede. Extremely comfortable barefoot.",
    dateAdded: "2026-02-28"
  },
  {
    id: "item-10",
    name: "Acetate D-Frame Sunglasses",
    category: "Accessory",
    color: "Tortoiseshell",
    season: "Summer",
    occasions: ["Casual", "Date", "Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    notes: "Polarized green lenses. Vintage Japanese acetate frames.",
    dateAdded: "2026-01-12"
  },
  {
    id: "item-11",
    name: "Saffiano Leather Tote Bag",
    category: "Accessory",
    color: "Midnight Black",
    season: "All-Season",
    occasions: ["Business", "Casual", "Formal", "Date"],
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    notes: "Fits a 14-inch laptop easily. Scratch-resistant leather.",
    dateAdded: "2025-12-20"
  },
  {
    id: "item-12",
    name: "Heavyweight Cotton Ribbed Tee",
    category: "Top",
    color: "Sage Green",
    season: "Summer",
    occasions: ["Casual", "Lounge"],
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    notes: "300gsm heavy combed cotton. Preshrunk boxy fit.",
    dateAdded: "2026-04-10"
  }
];

export const PRESET_WEATHER = [
  { value: "Chilly & Windy (10°C / 50°F)", label: "Chilly & Windy", icon: "wind" },
  { value: "Cold & Snowing (0°C / 32°F)", label: "Cold & Snowing", icon: "snowflake" },
  { value: "Mild & Sunny (20°C / 68°F)", label: "Mild & Sunny", icon: "sun" },
  { value: "Warm & Humid (28°C / 82°F)", label: "Warm & Humid", icon: "thermometer-sun" },
  { value: "Rainy & Overcast (15°C / 59°F)", label: "Rainy & Overcast", icon: "cloud-rain" }
];

export const PRESET_OCCASIONS = [
  { value: "Casual Daily", label: "Casual Daily", desc: "Errands, walks, weekend coffee" },
  { value: "Business Casual", label: "Business Casual", desc: "Office work, professional meetings, lectures" },
  { value: "Date Night", label: "Date Night", desc: "Dinner parties, theater, elegant bar lounge" },
  { value: "Cocktail or Formal", label: "Cocktail / Formal", desc: "Weddings, galas, upscale exhibitions" },
  { value: "Athletic or Active", label: "Athletic & Active", desc: "Hiking, workout sessions, active travel" },
  { value: "Lounge or Travel", label: "Lounge & Travel", desc: "Work-from-home, airport comfort, relaxing indoors" }
];

export const PRESET_VIBES = [
  { value: "Nordic Minimalist", label: "Nordic Minimalist", desc: "Clean lines, neutrals, effortless drapes" },
  { value: "Urban Streetwear", label: "Urban Streetwear", desc: "Relaxed silhouettes, graphics, cargo, sneakers" },
  { value: "Sartorial Elegant", label: "Sartorial Elegant", desc: "Tailored structures, loafers, rich textures" },
  { value: "Cozy Earthy", label: "Cozy Earthy", desc: "Chunky knits, warm browns, olive greens, corduroy" },
  { value: "Chic Parisian", label: "Chic Parisian", desc: "Breton stripes, classic trench coats, tailored denim" },
  { value: "Avant-Garde Bold", label: "Avant-Garde Bold", desc: "Monochromatic, structural silhouettes, statement silver" }
];
