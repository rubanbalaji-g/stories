# Design Specification: Surrealist Classic Literature Reader

> **Audience**: AI Agents & Frontend Engineers  
> **Philosophy**: Built with the rules of `frontend-design` (distinct point of view, anti-AI-slop) and `ui-ux-pro-max` (WCAG 2.2 accessibility, responsive interaction, typography hierarchy).

---

## 1. Aesthetic Thesis: Metaphysical Surrealism

This web reader rejects cookie-cutter SaaS layouts, generic purple gradient badges, and sterile dashboard cards. Instead, it embodies **Metaphysical Surrealism**, taking inspiration from:
- **René Magritte**: The juxtaposition of ordinary objects against impossible twilights, bowler hat silhouettes, floating doorway portals, and sky-filled frames.
- **Salvador Dalí**: Fluid, dripping forms, melting time, and distorted perspectives.
- **Giorgio de Chirico**: Deep melancholic shadows, warm Italian arcades, and mysterious geometric horizons.

---

## 2. Color System & Atmospheric Palettes

The UI supports three surrealist ambient states rather than standard light/dark switches:

### 1. `Magritte Twilight` (Default Night / Dream State)
- **Void Background**: `#070a13` (Deep metaphysical abyss)
- **Twilight Surface**: `#0f172a` (Belgian evening sky)
- **Cloud Slate**: `#1e293b` (Shadowed limestone)
- **Mist Text**: `#cbd5e1` (Soft lunar glow, high contrast ratio > 7:1)
- **Primary Accent**: `#f59e0b` (Warm incandescent streetlamp gold)
- **Secondary Accent**: `#4338ca` (Surreal dream violet)

### 2. `Dalí Vellum` (Daylight / Antique Reading State)
- **Vellum Background**: `#fdfbf7` (Aged handmade parchment)
- **Umber Text**: `#292524` (Deep sepia book ink)
- **Earthy Amber**: `#d97706` (Desert clock gold)
- **Crimson Wax**: `#991b1b` (Venetian seal red)

### 3. `Chirico Monolith` (Minimal High-Contrast State)
- **Pitch Black**: `#050505`
- **Bone White**: `#f8fafc`
- **Ochre Horizon**: `#b45309`

---

## 3. Typography Architecture

Typography is the primary vessel of literary mood.

| Role | Font Family | Fallback | Treatment |
| :--- | :--- | :--- | :--- |
| **Display / Book Titles** | `Cinzel`, `Playfair Display` | serif | Small-caps option, tracking `0.05em`, unhurried dignity |
| **Body (English)** | `EB Garamond` | Georgia, serif | Font size 18px–22px, line-height `1.8`, max width `68ch` |
| **Body (Tamil)** | `Noto Sans Tamil`, `Anek Tamil` | sans-serif | Elevated letter spacing, line-height `1.9`, max width `65ch` |
| **Meta & Controls** | `Inter`, `Cinzel` | sans-serif | 12px–14px, uppercase with `tracking-widest` |

### Strict Typographic Rules (Anti-AI-Slop):
- **Never** highlight a single random word with a tacky gradient in headlines.
- Maintain optimal reading line lengths (`< 75` characters per line).
- Preserve comfortable line heights (`leading-relaxed` / `1.8` to `2.0`) so dense prose breathes naturally.

---

## 4. Surrealist Micro-Interactions & Visual Signatures

1. **Melting Progress Ribbon**:
   - Instead of a generic horizontal bar, the reading progress is visualized as an organic, dripping bookmark on the viewport edge that elongates as the reader scrolls.
2. **Drifting Twilight Backdrop**:
   - Subtle, slow CSS keyframe motion (`18s` ease-in-out) creating shifting atmospheric clouds and stars behind the reading canvas.
3. **Floating Portals**:
   - Floating framed book spines that respond to mouse parallax with a 3D perspective tilt (`rotateX`, `rotateY`).
4. **Metaphysical Soundscape (Optional)**:
   - Subtle ambient toggle for soft antique clockwork ticking or distant rain.

---

## 5. Accessibility & UX Guidelines (WCAG 2.2 AA)
- Focus indicators: Always visible custom gold rings (`ring-2 ring-amber-400/80`).
- Minimum touch target: 44px × 44px on mobile viewports.
- Reading preferences persisted to `localStorage` (theme, font size, line spacing, language preference).
- Keyboard shortcuts: `J` / `K` (next/prev chapter), `T` (toggle theme), `L` (toggle language).
