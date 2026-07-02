import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 1b. API: Dynamic Client Configuration
app.get("/api/config", (req, res) => {
  res.json({
    supabaseUrl: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON || "",
  });
});

// 2. API: Generate Smart Outfit Recommendations
app.post("/api/recommend-outfit", async (req, res) => {
  try {
    const { wardrobeItems = [], weather, occasion, styleVibe } = req.body;

    if (!weather || !occasion || !styleVibe) {
      res.status(400).json({ error: "Missing required parameters: weather, occasion, styleVibe" });
      return;
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are Reflecta, an elite AI virtual wardrobe architect, personal designer, and master stylist.
Your tone is professional, sophisticated, yet warm and encouraging. You give detailed styling rationales and high-fashion matching logic.

Your goal is to curate 3 distinct, exceptionally stylish, and cohesive outfit suggestions tailored perfectly to:
- Weather conditions: ${weather}
- Occasion: ${occasion}
- Style Vibe: ${styleVibe}

You have access to the user's closet (wardrobe items):
${JSON.stringify(wardrobeItems, null, 2)}

Instructions:
1. Maximize matches from the user's existing closet items where appropriate (set matchedFromCloset = true and include the closetItemId).
2. If the user's closet is empty or doesn't have suitable items, recommend ideal pieces that would complete the outfit. Mark these suggested items as matchedFromCloset = false and leave closetItemId blank.
3. Every outfit must be a complete look. A complete look must contain:
   - Upper body (Top / Inner layer)
   - Lower body (Bottom, e.g., trousers, skirts, shorts - unless a single-piece dress is used)
   - Outerwear (Outer layer, highly recommended if weather is chilly, windy, or cold)
   - Footwear (Shoes matching the occasion)
   - Accessories (Bags, hats, jewelry, sunglasses to elevate the outfit)
4. Ensure colors harmonize beautifully. Avoid clashing colors unless the style vibe explicitly calls for high-contrast color-blocking.
5. Provide distinct styling tips for each outfit (e.g., "French tuck the sweater into the high-waisted trousers", "Roll the sleeves twice for an effortless look").`;

    const userPrompt = `Please recommend 3 outfits for a ${occasion} event under ${weather} weather conditions, following a ${styleVibe} aesthetic vibe. Give detailed feedback and match as many closet items as possible.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outfits: {
              type: Type.ARRAY,
              description: "A list of exactly 3 distinct outfit recommendations.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A unique short random string ID for this outfit option, e.g., 'opt-1'" },
                  name: { type: Type.STRING, description: "An evocative, stylish name for this outfit, e.g., 'Urban Minimalist Charcoal' or 'Sunset Linen Breeze'" },
                  description: { type: Type.STRING, description: "Overall description of the aesthetic narrative and matching logic." },
                  items: {
                    type: Type.ARRAY,
                    description: "The individual clothing and accessory pieces comprising this outfit.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        category: { type: Type.STRING, description: "Type of item: Top, Bottom, Outerwear, Shoes, Accessory" },
                        itemName: { type: Type.STRING, description: "Detailed descriptive name of the item, e.g. 'Oversized Silk Button-Down' or 'Classic Indigo Selvedge Denim'" },
                        color: { type: Type.STRING, description: "Specific shade/color, e.g. 'Eggshell White', 'Olive Green', 'Deep Black'" },
                        reason: { type: Type.STRING, description: "Why this specific piece is included and how it elevates the look." },
                        matchedFromCloset: { type: Type.BOOLEAN, description: "True if this matches an item from user's wardrobe, false if it's a new ideal recommendation" },
                        closetItemId: { type: Type.STRING, description: "The ID of the matched wardrobe item, or empty string if not matched" },
                      },
                      required: ["category", "itemName", "color", "reason", "matchedFromCloset"],
                    },
                  },
                  stylingTips: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Pro styling tips (e.g., tucking style, rolling sleeves, accessory styling).",
                  },
                  suitabilityScore: { type: Type.INTEGER, description: "Score from 1 to 100 on how perfectly this meets the weather, occasion, and vibe." },
                },
                required: ["id", "name", "description", "items", "stylingTips", "suitabilityScore"],
              },
            },
            generalAdvice: {
              type: Type.STRING,
              description: "Overall fashion advice, accessorizing direction, or weather adaptation coaching for this selection.",
            },
          },
          required: ["outfits", "generalAdvice"],
        },
      },
    });

    const responseText = response.text || "{}";
    const result = JSON.parse(responseText.trim());
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/recommend-outfit:", error);
    res.status(500).json({
      error: "Failed to generate recommendations. Please ensure your GEMINI_API_KEY is configured in Settings > Secrets.",
      details: error?.message || error,
    });
  }
});

// 3. Initialize Dev/Production static servers
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Reflecta Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();
