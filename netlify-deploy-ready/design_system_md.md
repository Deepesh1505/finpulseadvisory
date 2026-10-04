# DESIGN_SYSTEM.md — Design System & UI Specifications

## 1. Purpose

This document defines the visual design system, color palette tokens, typography rules, component variations, and responsive specifications for the Stock Market Advisory Website. It ensures absolute visual consistency, accessibility, and high conversion optimization across light and dark modes.

---

## 2. Brand Identity & Visual Strategy

* **Tone & Feeling:** Trustworthy, wealth-oriented, professional, modern, and accessible.
* **Aesthetic Direction:** Clean financial dashboard vibe with soft mint highlights, high readability, and smooth rounded corners (`12px` to `16px`).
* **Theme Strategy:** **Light Mode as Default** for maximum readability, with an instant toggle to **Dark Mode** for evening browsing or high-contrast trading views.

---

## 3. Explicit Color Palette Tokens

### 3.1 Primary & Emerald Accent Tokens (User Defined)

* **Primary Dark Slate (`#0F172A`):** Used for primary text in light mode, dark mode backgrounds, hero cards, footers, and high-emphasis headings.
* **Primary Emerald (`#10B981`):** Primary action buttons, positive stock indicators, key badges, and CTA highlights.
* **Mint Accent (`#34D399`):** Secondary CTA hover states, active tab highlights, and secondary graph indicators.
* **Soft Mint (`#A7F3D0`):** Subtle borders, icon backgrounds, focus state rings, and notification badge fills.
* **Very Light Mint (`#ECFDF5`):** Light mode card container fills, secondary background surfaces, and lead form highlight areas.

### 3.2 Light Mode (Default Theme)

* **Page Background:** `#FFFFFF` / `#F8FAFC`
* **Surface / Card Background:** `#ECFDF5` (Soft Tinted Containers) / `#FFFFFF` (Elevated Cards)
* **Text Primary:** `#0F172A`
* **Text Muted / Secondary:** `#475569`
* **Border Color:** `#A7F3D0` (Soft Mint Border) / `#E2E8F0`

### 3.3 Dark Mode (Toggle Theme)

* **Page Background:** `#0F172A` (Slate Dark Blue)
* **Surface / Card Background:** `#1E293B` (Elevated Slate Card)
* **Text Primary:** `#ECFDF5` (Very Light Mint)
* **Text Muted / Secondary:** `#94A3B8`
* **Border Color:** `#334155` / `#10B981` (Glow borders)

---

## 4. Typography Rules

### 4.1 Fonts

* **Primary Body & Headings:** `Inter` or `Poppins` (Google Fonts).
* **Financial Data & Ticker Numbers:** `JetBrains Mono` or `Inter` (tabular numbers enabled for stock price alignment).

### 4.2 Scale & Sizes

* **Display 1 (Hero Heading):** `36px` (Mobile) / `52px` (Desktop) | Bold (`700`)
* **Heading 1 (Page Title):** `28px` (Mobile) / `36px` (Desktop) | SemiBold (`600`)
* **Heading 2 (Section Title):** `22px` (Mobile) / `28px` (Desktop) | SemiBold (`600`)
* **Heading 3 (Card Title):** `18px` (Mobile) / `20px` (Desktop) | Medium (`500`)
* **Body Text:** `15px` / `16px` | Regular (`400`)
* **Ticker / Caption Text:** `13px` / `14px` | Medium (`500`)

---

## 5. Layout & Component Specifications

### 5.1 Corner Radius & Elevation (Curved Style)

* **Buttons & Inputs:** `rounded-lg` (`8px` to `10px`).
* **Cards & Containers:** `rounded-2xl` (`16px`).
* **Badges & Pills:** `rounded-full` (`9999px`).
* **Shadows:** Soft blur shadows (`0 10px 25px -5px rgba(16, 185, 129, 0.1)`) to create depth without harsh outlines.

### 5.2 Theme Switcher Toggle

* **Location:** Fixed in the main header / navigation bar next to the WhatsApp/Call button.
* **Component:** Smooth sliding pill toggle with Sun (`#F59E0B`) and Moon (`#34D399`) icons.
* **Persistence:** Saves user preference in `localStorage` (`theme: light | dark`).

### 5.3 Live Stock Ticker Bar

* **Light Mode:** Background `#0F172A` with `#ECFDF5` text and `#10B981` green gain badges.
* **Dark Mode:** Background `#020617` with `#34D399` text.
* **Behavior:** Smooth continuous ticker animation with hover-to-pause.

### 5.4 Lead Capture Form Container

* **Style:** Elevated `#FFFFFF` card in Light Mode (or `#1E293B` in Dark Mode) with a prominent `#A7F3D0` border ring.
* **Primary CTA Button:** `#10B981` background, `#FFFFFF` bold text, rounded corners (`12px`), with a soft scale effect on hover.

---

## 6. Key Assumptions

* **Tailwind CSS Utility:** The project will use Tailwind CSS utility classes to map these design tokens directly during development.
* **Icon Set:** Lucide React / FontAwesome vector icons will be used for consistency across light and dark themes.

---

## 7. Unresolved Questions

1. Do you want a subtle smooth background gradient transition when toggling between light and dark modes?
2. Should the floating WhatsApp button stay official WhatsApp Green (`#25D366`) in both themes, or adapt to the site's Emerald Green (`#10B981`)?