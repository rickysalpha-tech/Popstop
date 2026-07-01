---
name: Reflecta
colors:
  surface: '#FFFFFF'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414845'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#717975'
  outline-variant: '#c1c8c4'
  surface-tint: '#45655a'
  primary: '#37574c'
  on-primary: '#ffffff'
  primary-container: '#4f6f64'
  on-primary-container: '#cdf1e3'
  inverse-primary: '#abcec1'
  secondary: '#5c5f5e'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0de'
  on-secondary-container: '#616362'
  tertiary: '#6c4642'
  on-tertiary: '#ffffff'
  tertiary-container: '#875e59'
  on-tertiary-container: '#ffe2de'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c7eadc'
  primary-fixed-dim: '#abcec1'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#2d4d43'
  secondary-fixed: '#e2e3e1'
  secondary-fixed-dim: '#c5c7c5'
  on-secondary-fixed: '#191c1b'
  on-secondary-fixed-variant: '#454746'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#eebab4'
  on-tertiary-fixed: '#2f1310'
  on-tertiary-fixed-variant: '#623d39'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
  text-primary: '#1D1D1F'
  text-secondary: '#52525B'
  border: '#D9DDD7'
  mirror-bg: '#141619'
  glass-overlay: rgba(255, 255, 255, 0.72)
  focus-ring: rgba(79, 111, 100, 0.22)
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: clamp(2.25rem, 7vw, 4.75rem)
    fontWeight: '600'
    lineHeight: '1.0'
  screen-title:
    fontFamily: Plus Jakarta Sans
    fontSize: clamp(1.5rem, 4vw, 2.25rem)
    fontWeight: '600'
    lineHeight: '1.15'
  section-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.15'
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.55'
  metadata:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1180px
  gutter: 1rem
  margin-clamp: clamp(1rem, 4vw, 3rem)
  target-min: 44px
---

# Design System: Reflecta

## 1. Visual Theme & Atmosphere

Reflecta is a restrained, elegant interface with the quiet confidence of a private dressing room and the precision of a premium utility app. The atmosphere should feel polished, calm, expert, and supportive: spacious enough to feel refined, structured enough for daily use.

Density: Daily App Balanced, 5/10. The companion app should support repeated wardrobe tasks without feeling crowded. The mirror screen should be gallery-airy, 3/10, with large glanceable content and minimal metadata.

Variance: Offset Asymmetric, 6/10. Use confident left alignment, offset image compositions, and irregular garment grids. Avoid centered generic landing layouts except for small empty states.

Motion: Fluid CSS, 5/10. Motion should feel soft and intentional, like fabric settling or a mirror display waking. Use quiet spring movement, opacity fades, and small transform shifts only.

## 2. Color Palette & Roles

- **Mirror Mist** (#F7F8F6) - Primary app background. Clean, light, and quiet without becoming beige or sterile.
- **Pure Wardrobe Surface** (#FFFFFF) - Form surfaces, item detail panels, modal sheets, and selected app areas.
- **Soft Graphite** (#1D1D1F) - Primary text and mirror display text. Never use pure black.
- **Tailored Zinc** (#52525B) - Secondary text, metadata, helper text, and inactive navigation labels.
- **Silver Thread** (#D9DDD7) - Borders, dividers, input outlines, and item-card structure.
- **Glass Veil** (rgba(255,255,255,0.72)) - Translucent overlays on mirror previews and image-heavy states.
- **Mirror Charcoal** (#141619) - Passive mirror display background and dark preview state.
- **Verdigris Silk** (#4F6F64) - Single accent for primary CTAs, active filters, selection states, focus rings, and synced mirror status.

Color rules:

- Verdigris Silk is the only accent color. Do not add purple, neon blue, hot pink, or multi-accent palettes.
- Use Mirror Mist for app pages and Mirror Charcoal only for the passive mirror route.
- Avoid heavy gradients. If depth is needed, use a very subtle vertical shift from Mirror Mist to Pure Wardrobe Surface.
- Shadows must be soft and neutral: `0 18px 44px rgba(29,29,31,0.08)`.
- Focus rings use `0 0 0 3px rgba(79,111,100,0.22)`.

## 3. Typography Rules

- **Display:** Satoshi - calm, confident, track-tight headings with controlled scale. Use weight 600 or 700, never oversized shouting type.
- **Body:** Satoshi - relaxed leading, readable app labels, 65ch maximum line length for body copy and rationale text.
- **Mono:** JetBrains Mono - temperatures, timestamps, item counts, sync status, and weather metadata.
- **Scale:** App H1 `clamp(2.25rem, 7vw, 4.75rem)`, screen title `clamp(1.5rem, 4vw, 2.25rem)`, section title `1.125rem`, body `1rem`, metadata `0.8125rem`.
- **Line height:** Display 0.96 to 1.04, titles 1.15, body 1.55, labels 1.2.
- **Letter spacing:** 0. Do not use negative letter spacing.
- **Banned:** Inter, generic serif fonts, default system stacks, all-caps paragraphs, excessive gradient text.

Typography behavior:

- Reflecta wordmark should be text-based, quiet, and precise.
- Mirror Display title can be large but must remain readable from a short distance.
- Weather and occasion metadata should use JetBrains Mono sparingly for a measured, expert tone.

## 4. Component Stylings

* **Buttons:** Primary buttons use Verdigris Silk fill, Pure Wardrobe Surface text, 8px radius, 44px minimum height, and no outer glow. Active state translates down 1px and reduces shadow. Secondary buttons use transparent fill, Silver Thread border, Soft Graphite text.
* **Icon Buttons:** Square 44px targets with 8px radius. Use recognizable icons for save, settings, close, camera, link, and mirror. Always include a tooltip or accessible label.
* **Cards:** Use cards only for wardrobe items, outfit looks, modals, and framed tools. Radius is 8px maximum. Use a 1px Silver Thread border and subtle shadow only when elevation clarifies hierarchy.
* **Wardrobe Item Cards:** Fixed image aspect ratio 4:5, object-fit cover, label row beneath image, category and color metadata. Hover lifts by 2px through transform only.
* **Outfit Cards:** Asymmetric thumbnail arrangement: one larger hero item image plus 2-4 smaller item tiles. Include look title, occasion chip, weather chip, rationale, Save icon, and Show on Mirror button.
* **Inputs:** Label above input, helper text below when needed, error text below in clear language. Inputs use Pure Wardrobe Surface fill, Silver Thread border, 8px radius, and Verdigris Silk focus ring.
* **Segmented Controls:** Use for Photo vs Link and app vs mirror preview modes. Selected segment uses Verdigris Silk tint with Soft Graphite text; unselected segments stay quiet.
* **Filter Chips:** Compact 36px height chips with border, not pill-heavy decoration. Active chips use Verdigris Silk at low opacity with Verdigris Silk border.
* **Mirror Preview Frame:** Use a dark unframed preview area, not a decorative device mockup. The preview must show the same content hierarchy as the mirror route.
* **Loaders:** Skeleton blocks matching wardrobe grid, outfit card, and mirror layout dimensions. No circular spinners.
* **Empty States:** Use a composed wardrobe starter layout: one image placeholder, one concise line of copy, one action button. Never use only "No data" text.
* **Error States:** Inline message under the relevant field or section. Use practical language and one recovery action.

## 5. Layout Principles

Use CSS Grid as the primary layout tool. Keep every element in a clear spatial zone; no overlapping text, controls, or garment images. Contain app pages to a maximum width of 1180px with responsive side padding: `clamp(1rem, 4vw, 3rem)`.

App structure:

- Mobile app pages use a single-column layout with fixed bottom navigation or a compact top bar.
- Tablet and desktop app pages use a two-zone layout: navigation/sidebar on the left, active work surface on the right.
- Wardrobe grid uses 2 columns on mobile, 3-4 columns on tablet, and 5 columns maximum on desktop.
- Outfit Suggestions should not use 3 equal horizontal feature cards. Use a lead recommendation plus a staggered grid of alternatives.
- Forms use one column on mobile and two columns only when fields are short and clearly paired.

Launch screen:

- Use an asymmetric split: left-aligned copy and CTA, right-side wardrobe/mirror visual composition.
- Include inline image typography only if the generated screen can keep photos between words without overlap. On mobile, move inline images below the headline as a separate strip.
- Maximum one primary CTA above the fold: "Add First Item."

Mirror Display:

- Use `min-h-[100dvh]`, Mirror Charcoal background, generous side margins, and a wide grid.
- Left zone: look title, occasion, weather line, and rationale.
- Right zone: garment images in a composed vertical arrangement.
- No controls on the mirror route. App controls live outside the mirror display.

Responsive rules:

- Collapse all multi-column layouts below 768px.
- No horizontal scroll on mobile.
- Touch targets must be at least 44px.
- Fixed-format elements need stable dimensions using aspect ratio, grid tracks, or min/max constraints.
- Text must never overflow buttons, chips, cards, or mirror panels.

## 6. Motion & Interaction

Use spring physics for all interactive UI: stiffness 100, damping 20. Animate only `transform` and `opacity`; never animate top, left, width, or height.

Motion behaviors:

- Page entry: content fades in with a 10px upward transform over 220ms.
- Wardrobe grid: items reveal in a soft cascade with 35ms delay between items.
- Outfit cards: selected card settles into place with a 2px lift and subtle shadow change.
- Save action: heart or bookmark icon fills with one restrained scale pulse, then rests.
- Mirror sync status: active state uses a quiet opacity shimmer on the sync chip, not a glow.
- Loading: skeleton shimmer moves slowly across exact content shapes.

Perpetual micro-interactions:

- Active weather chip may use a subtle 4-second opacity breath.
- Mirror preview can use a slow 8-second ambient gradient shift inside Mirror Charcoal only.
- Do not animate garment images constantly; stillness feels more premium.

Performance rules:

- Keep animations hardware-accelerated.
- Avoid heavy blur filters on large fixed elements.
- Respect reduced-motion settings by replacing movement with opacity changes.

## 7. Anti-Patterns (Banned)

- No emojis anywhere.
- No Inter font.
- No pure black (#000000).
- No neon colors, neon shadows, or outer glow effects.
- No purple or blue AI-style gradients.
- No oversaturated accent colors.
- No 3-column equal feature-card rows.
- No nested cards.
- No decorative orbs, bokeh blobs, or abstract gradient blobs.
- No centered hero sections for Reflecta launch screens.
- No custom mouse cursors.
- No overlapping elements.
- No generic placeholder names like John Doe, Acme, or Nexus.
- No fake statistics or fake social proof.
- No broken image links. Use local sample assets, generated garment images, or stable placeholders.
- No filler text such as "Scroll to explore" or "Swipe down."
- No AI copy cliches such as "Elevate," "Unleash," "Next-Gen," "Seamless," or "Revolutionary."
- No product copy that uses banned Reflecta language from AGENTS.md.
- No body commentary, body scoring, measurements, appearance ratings, or social comparison language.
- No public sharing or social UI patterns in V1 screens.