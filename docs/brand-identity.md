# Beacon — Brand Design Identity Guide

## 1. Typography Rules

The brand uses a modern Sans-serif paired with an elegant Serif for expressive contrast.

- **Primary Font (Sans-Serif):** Figtree (Medium 500, SemiBold 600) — UI elements, buttons, navigation, body copy
- **Secondary Font (Serif):** EB Garamond (Regular 400, Italic 400i) — Expressive headings, quotes, highlighted words

### Font Features
- `text-wrap: balance` on headings to prevent typographic orphans
- `-webkit-font-smoothing: antialiased` for crisp rendering
- Weights: `.text-weight-semibold`, `.text-weight-bold`
- Clamping: `.text-style-2lines`, `.text-style-3lines` for truncation with ellipsis

## 2. Color Rules

Dark, sophisticated palette with strategic colorful accents.

### Brand Core
| Token | Hex | Usage |
|-------|-----|-------|
| Deep Green (Primary Accent) | `#034f46` | Hover states, primary SVG illustrations |
| Off-White / Cream | `#FFFFEB` | Marquee text, light backgrounds |
| Dark Slate / Black | `#1A1A1A` | Primary dark UI, SVG lines |

### Highlight / Graphic Accents
| Token | Hex | Usage |
|-------|-----|-------|
| Light Purple | `#F0D7FF` | Underlines, highlight strokes |
| Bright Orange | `#FFA946` | Sparkle/AI accent strokes |
| Focus Blue | `#4D65FF` | Accessibility focus outlines |

### Text Colors (Semantic)
- `.text-color-black20`, `.text-color-black50`, `.text-color-black70` — Gray scales
- `.text-color-secondary`, `.text-color-tertiary`, `.text-color-alternate` — Contextual contrast

## 3. Component Rules

### Buttons
- **Primary:** Dark background, light text, OS-specific icon prepended via JS
- **Secondary/Icon:** Transparent/lighter background with small prepended icon
- **Pill:** Floating bottom-bar CTA, pill shape with download icon
- **Accessibility:** `0.125rem` outline offset on all focusable elements

### Navigation
- **Mega Menu:** Icon-led dropdown links with title + muted description
- **Hamburger:** 3-line CSS menu, `0.125rem` thick, `0.375rem` gap, rotates to X on open

### Cards
- **Use-Case Cards:** Author headshot, title, muted subtitle, arrow icon top-right
- **Chips/Tags:** Pill-shaped containers with icon + bold text, dark variant available

## 4. Interaction & Motion Rules

### Hover States
- Dropdown links → text turns Deep Green `#034f46`
- Cards → arrow translates `translate(10px, -10px)`
- Footer links → hidden arrow slides in (`translateX(0)`, `opacity: 1`, `300ms`)
- Buttons → SplitText GSAP letter wave (`yPercent: -20→20`, `rotation: -5→5`)

### Scroll & Animation
- Sticky navbar hides on scroll down (>50px), reappears on scroll up
- SVG line drawing with DrawSVGPlugin on scroll (`scrub: 1.2`)
- Infinite marquees on wavy SVG paths (30s–100s durations)
- Lottie/Rive for complex product demos

## 5. Layout & Structure Rules

### Grid & Spacing
- `.padding-global` — Standard site gutters
- `.container-medium`, `.container-large` — Centered via `margin: 0 auto`
- Vertical spacers: `xsmall`, `small`, `medium`, `large`, `xlarge`, `huge`, `xhuge`

### Platform Specificity
- JS injects `data-platform` attributes for OS-specific layouts/screenshots (Mac, Windows, iOS, Android)
