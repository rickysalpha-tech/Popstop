export type WardrobeCategory = "Top" | "Bottom" | "Outerwear" | "Shoes" | "Accessory";

export interface WardrobeItem {
  id: string;
  name: string;
  category: WardrobeCategory;
  color: string;
  season: "Summer" | "Winter" | "Spring" | "Fall" | "All-Season";
  occasions: string[]; // Casual, Business, Formal, Date, Active, Lounge
  imageUrl?: string; // Hotlinked or custom-generated image link
  isFavorite?: boolean;
  notes?: string;
  dateAdded: string;
}

export interface RecommendationRequest {
  weather: string;
  occasion: string;
  styleVibe: string;
  wardrobeItems: WardrobeItem[];
}

export interface RecommendedItem {
  category: string;
  itemName: string;
  color: string;
  reason: string;
  matchedFromCloset: boolean;
  closetItemId?: string;
}

export interface RecommendedOutfit {
  id: string;
  name: string;
  description: string;
  items: RecommendedItem[];
  stylingTips: string[];
  suitabilityScore: number;
}

export interface AIRecommendationResponse {
  outfits: RecommendedOutfit[];
  generalAdvice: string;
}

export interface ScheduledOutfit {
  id: string;
  date: string; // YYYY-MM-DD
  outfit: RecommendedOutfit;
  occasion: string;
  weather: string;
  notes?: string;
}
