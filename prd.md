# App Plan — Reflecta

## 1. App Overview

Reflecta is a smart mirror and companion app for women aged 25-45 who want to dress well for every occasion without wasting time or money. The app stores a private wardrobe archive built from clothing photos or shopping links, then creates outfit ideas from items the user already owns. Based on weather, occasion, and wardrobe availability, Reflecta shows complete looks in the app and sends the selected look to a passive mirror display. The experience must feel confident, expert, supportive, calm, and elegant.

Primary positioning: "Dress for the day with the wardrobe you already own." Supporting message: "Reflecta helps you choose occasion-ready looks, save favorites, and see your selected outfit directly on your mirror."

## 2. Key Components

- Wardrobe capture from photo: upload or camera input, item image preview, editable item details.
- Wardrobe capture from shopping link: URL input, extracted or manually entered name, image, category, color, season, and formality.
- Wardrobe archive: visual grid, filters by category, color, season, occasion, and formality.
- Outfit suggestion engine: combines owned items with occasion and weather context.
- Occasion planner: Work, Dinner, Formal event, Casual weekend, Travel, Date, Wedding guest.
- Weather context: location, temperature, condition, precipitation chance, wind.
- Favorite looks: save, view, reopen, and remove saved outfits.
- Mirror display: passive screen showing selected look, weather, occasion, and key items.
- Privacy settings: clear copy for private wardrobe data and account-based sync if added.
- Copy system: reusable voice rules, banned words, CTA labels, empty states, and suggestion rationale templates.

Enhancements for the user experience: starter wardrobe sample data for first launch, sparse-wardrobe fallback suggestions, mirror preview inside the app, and refined empty states that guide the next action without pushing purchases.

## 3. App Structure

Main screens:

- Launch: product name, value promise, and primary action to begin wardrobe setup.
- Wardrobe: browse owned items and filter the archive.
- Add Item: choose Photo or Shopping Link, then save item details.
- Item Detail: edit category, color, season, formality, occasion fit, source, and notes.
- Outfit Suggestions: choose occasion and weather context, then view generated looks.
- Occasion Planner: create a planned occasion with date, location, notes, and formality.
- Favorites: review saved looks and reopen one.
- Mirror Preview: see exactly what the mirror will display.
- Mirror Display: passive full-screen layout for the selected outfit.
- Settings: privacy text, sync choice, location/weather settings, and mirror connection state.

Navigation flow: Launch leads to Add Item or Wardrobe. Wardrobe leads to Item Detail, Add Item, and Outfit Suggestions. Outfit Suggestions leads to Favorite, Mirror Preview, or Occasion Planner. Mirror Preview leads to Mirror Display. Settings remains available from the app shell.

## 4. User Interface

Launch: full-height app screen with Reflecta wordmark, headline, one sentence of supporting copy, and two buttons: "Add First Item" and "View Sample Wardrobe."

Wardrobe: fixed top bar with Reflecta left and Settings icon right; filter chips below; 2-column mobile item grid with image, category, color, and season. Empty state CTA: "Add First Item."

Add Item: segmented control for Photo and Link. Photo view has image picker, preview, and item form. Link view has URL field, "Import Item Details" button, preview card, and manual edit fields.

Outfit Suggestions: occasion selector at top, weather chip row, "Create Looks" CTA, then outfit cards. Each card shows item thumbnails, title, owned-item count, short rationale, Save icon, and "Show on Mirror."

Mirror Preview: app-sized preview of the mirror output with controls outside the preview: "Send to Mirror" and "Choose Another Look."

Mirror Display: dark, calm full-screen screen with large look title, occasion, weather line, 3-5 item images or placeholders, and one concise rationale. No touch, voice, or editing controls.

Copywriting strategy: use specific benefit-led copy. CTAs should name the outcome: "Add First Item," "Create Looks," "Save This Look," "Show on Mirror." Avoid "Submit," "Learn More," hype claims, body commentary, and the banned product words in `AGENTS.md`. Suggestion copy should connect feature to benefit: "Warm enough for tonight" or "Built from your wardrobe."

## 5. Backend Requirements

A backend is useful for private accounts, image storage, shopping-link item records, saved looks, and cross-device mirror sync. For the first Google AI Studio prototype, mock the backend with local state and localStorage so the core flows can be tested quickly. Keep the data layer shaped like a future cloud backend.

Entities:

- User: id, email, createdAt, privacySettings, mirrorSettings.
- WardrobeItem: id, userId, name, category, colors, season, formality, occasions, imageUrl, sourceType, sourceUrl, notes, createdAt, updatedAt.
- OutfitLook: id, userId, name, itemIds, occasionType, weatherContext, rationale, favorite, createdAt.
- Occasion: id, userId, type, date, location, notes, formality.
- MirrorSession: id, userId, activeLookId, deviceName, lastSyncedAt.

File handling: store uploaded clothing photos privately. In prototype mode, use local object URLs or bundled sample images. In production, use private object storage tied to the signed-in user.

Auth: account-based private sync is allowed, but public profiles and public sharing are not part of V1.

## 6. APIs and Libraries

- Gemini API: generate outfit combinations and concise rationale from structured wardrobe, weather, and occasion data. Return JSON only: look title, item IDs, rationale, weather note, and confidence note.
- Weather API: fetch temperature, condition, precipitation chance, wind, and location label.
- Link metadata extraction: read product title and image from shopping URLs when available; allow manual entry when extraction fails.
- React: app UI, mirror route, state-driven rendering.
- LocalStorage or IndexedDB: prototype wardrobe, favorites, settings, and active mirror look.
- Optional image tools: client-side image compression before storing clothing photos.

Platform built-ins: use Google AI Studio Build for the React app shell, Gemini integration, quick preview, and environment variable setup. Keep any API keys out of visible browser code where the platform allows server-side calls.

## 7. Testing Strategy

Unit tests:

- Wardrobe item creation and edit validation.
- Filter logic for category, color, season, and occasion.
- Outfit suggestion input builder.
- Banned-word checker for customer-facing copy constants.

Integration tests:

- Add item by photo, save it, and see it in Wardrobe.
- Add item by link with manual fallback.
- Create looks for each supported occasion.
- Save a favorite look and reopen it.
- Send a selected look to Mirror Preview and Mirror Display.

User acceptance tests:

- A new user can add 3 wardrobe items and create a dinner look in under 3 minutes.
- A weather change visibly changes the suggested outfit rationale.
- Mirror Display remains readable from a short distance and contains no dense controls.
- No body measurements, body scoring, public sharing, or social features appear anywhere.

## 8. Platform-Specific Considerations

Google AI Studio Build should produce a React web app with two routes: app experience and mirror display. Keep Gemini prompts short and structured; pass wardrobe items as JSON, not long prose. Ask Gemini for explainable suggestions using owned item IDs only, then validate returned IDs before rendering.

Recommended Gemini instruction: "Create 3 occasion-ready outfit looks using only the provided wardrobe item IDs. Consider weather. Do not mention bodies, shapes, attractiveness, or purchases. Return valid JSON."

Use sample wardrobe data so the prototype works before the user uploads clothes. Keep mirror state in a single activeLook object so the display updates predictably. Use calm visuals, clear spacing, and real garment imagery or placeholders.

## 9. Out of Scope for v1

- Public sharing.
- Social feeds, comments, follows, or public profiles.
- Body measurements.
- Body-rating or appearance judgment.
- Mirror touch input.
- Mirror voice input.
- Mirror gesture input.
- Marketplace checkout.
- Buy-first recommendation flows.
- Influencer content.
- Native iOS or Android builds.

## 10. Definition of Done

- A user can add wardrobe items by photo and by shopping link.
- A user can categorize, edit, browse, and filter owned clothes.
- A user can create outfit ideas for all seven V1 occasions.
- Weather context changes the suggestion rationale in a visible way.
- Suggestions use owned items and validate item IDs before display.
- A user can save and reopen favorite looks.
- The selected look appears on a passive mirror display route.
- All customer-facing copy follows Reflecta voice and avoids banned terms.
