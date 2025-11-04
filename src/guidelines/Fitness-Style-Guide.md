# ChurchAcademy Fitness Design System

Modern, clean fitness app aesthetic for the ChurchAcademy platform.

---

## Design Philosophy

**Clean. Data-Driven. Energetic.**

The fitness design system emphasizes clarity, progress tracking, and motivation through a modern, professional interface inspired by leading fitness and wellness applications.

### Core Principles
- **Clarity First**: Remove visual noise, emphasize content
- **Data-Driven Design**: Stats, metrics, and progress take center stage
- **Motivational**: Energetic colors that inspire action
- **Professional**: Clean, modern, trustworthy
- **Breathing Room**: Generous white space and padding

---

## Color Palette

### Primary Colors

**Background Tones:**
- `--bg-primary`: #FAFBFD (Light grayish-blue background)
- `--bg-secondary`: #F7F9FC (Slightly darker for cards)
- `--bg-tertiary`: #FFFFFF (Pure white for elevated content)

**Text Colors:**
- `--text-primary`: #1A2332 (Deep navy for headings)
- `--text-secondary`: #4B5563 (Medium gray for body text)
- `--text-tertiary`: #9CA3AF (Light gray for captions)

### Accent Colors

**Mint Green (Primary Accent):**
- `--mint-primary`: rgb(144, 255, 213) / #90FFD5
- `--mint-light`: rgb(178, 255, 226) / #B2FFE2
- `--mint-dark`: rgb(110, 230, 180) / #6EE6B4
- **Usage**: Success states, progress bars, completed items, CTAs

**Sky Blue (Secondary Accent):**
- `--sky-primary`: #60A5FA (Bright blue)
- `--sky-light`: #93C5FD (Light blue)
- `--sky-dark`: #3B82F6 (Medium blue)
- **Usage**: Info states, links, secondary actions

**Powder Blue (Tertiary):**
- `--powder-blue`: #DBEAFE (Very light blue)
- `--powder-blue-hover`: #BFDBFE (Light blue hover)
- **Usage**: Subtle backgrounds, hover states

**Sunset Coral:**
- `--coral-primary`: #FB7185 (Soft coral/pink)
- `--coral-light`: #FDA4AF (Light coral)
- `--coral-dark`: #F43F5E (Vibrant coral)
- **Usage**: Warnings, attention, energy indicators

**Amber Yellow:**
- `--amber-primary`: #FBBF24 (Golden yellow)
- `--amber-light`: #FCD34D (Light yellow)
- **Usage**: Highlights, rewards, streaks

### Semantic Colors

**Success:** Mint Green (#90FFD5)
**Info:** Sky Blue (#60A5FA)
**Warning:** Amber Yellow (#FBBF24)
**Error:** Coral (#FB7185)

### Border & Divider Colors

- `--border-light`: #E5E7EB (Subtle dividers)
- `--border-medium`: #D1D5DB (Standard borders)
- `--border-dark`: #9CA3AF (Emphasized borders)

---

## Typography

### Font Family

**Primary Font:** Inter
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Alternative:** DM Sans (if Inter doesn't fit the vibe)

### Type Scale

```css
/* Headings */
h1: 32px / 40px, font-weight: 700 (bold)
h2: 24px / 32px, font-weight: 600 (semibold)
h3: 20px / 28px, font-weight: 600 (semibold)
h4: 18px / 26px, font-weight: 600 (semibold)
h5: 16px / 24px, font-weight: 600 (semibold)
h6: 14px / 20px, font-weight: 600 (semibold)

/* Body */
body: 16px / 24px, font-weight: 400 (regular)
small: 14px / 20px, font-weight: 400 (regular)
caption: 12px / 16px, font-weight: 400 (regular)

/* UI Text */
button: 14px / 20px, font-weight: 500 (medium)
label: 14px / 20px, font-weight: 500 (medium)
```

### Font Weights

- 400 (Regular): Body text, descriptions
- 500 (Medium): Buttons, labels, UI elements
- 600 (Semibold): Headings, emphasis
- 700 (Bold): Large headings, key metrics

---

## Spacing System

Consistent 4px base unit:

```
4px  → 0.25rem → spacing-1
8px  → 0.5rem  → spacing-2
12px → 0.75rem → spacing-3
16px → 1rem    → spacing-4
20px → 1.25rem → spacing-5
24px → 1.5rem  → spacing-6
32px → 2rem    → spacing-8
40px → 2.5rem  → spacing-10
48px → 3rem    → spacing-12
64px → 4rem    → spacing-16
```

### Component Spacing Guidelines

- **Card Padding**: 24px (1.5rem)
- **Section Padding**: 32px (2rem)
- **Button Padding**: 12px 24px (0.75rem 1.5rem)
- **Input Padding**: 12px 16px (0.75rem 1rem)
- **Gap Between Cards**: 16px-24px (1rem-1.5rem)

---

## Shadows

Subtle elevation system:

```css
/* Shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
```

### Usage Guidelines

- **Cards**: shadow-sm or shadow-md
- **Modals**: shadow-lg or shadow-xl
- **Dropdowns**: shadow-md
- **Buttons**: shadow-sm (optional)
- **Hover States**: Increase shadow by one level

---

## Border Radius

Moderate, modern rounding:

```css
--radius-sm: 6px   (small elements, badges)
--radius-md: 8px   (buttons, inputs)
--radius-lg: 12px  (cards)
--radius-xl: 16px  (large cards, modals)
--radius-2xl: 20px (hero sections)
--radius-full: 9999px (pills, avatars)
```

---

## Buttons

### Primary Button (Mint Green)
```tsx
className="px-6 py-3 bg-[rgb(144,255,213)] hover:bg-[rgb(110,230,180)] text-[#1A2332] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
```

### Secondary Button (Sky Blue)
```tsx
className="px-6 py-3 bg-[#60A5FA] hover:bg-[#3B82F6] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
```

### Ghost Button
```tsx
className="px-6 py-3 bg-transparent hover:bg-[#F7F9FC] text-[#4B5563] rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all duration-200 font-medium"
```

### Danger Button
```tsx
className="px-6 py-3 bg-[#FB7185] hover:bg-[#F43F5E] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
```

---

## Cards

### Standard Card
```tsx
className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-[#E5E7EB]"
```

### Elevated Card (No Border)
```tsx
className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6"
```

### Interactive Card (Clickable)
```tsx
className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-[#E5E7EB] cursor-pointer hover:border-[rgb(144,255,213)]"
```

---

## Forms

### Input Field
```tsx
className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(144,255,213)] focus:border-transparent transition-all"
```

### Label
```tsx
className="block text-sm font-medium text-[#4B5563] mb-2"
```

### Error Message
```tsx
className="text-sm text-[#FB7185] mt-1"
```

---

## Badges & Pills

### Success Badge (Mint)
```tsx
className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[rgb(178,255,226)] text-[#1A2332]"
```

### Info Badge (Blue)
```tsx
className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#DBEAFE] text-[#1E40AF]"
```

### Warning Badge (Amber)
```tsx
className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FEF3C7] text-[#92400E]"
```

---

## Progress Indicators

### Progress Bar (Mint Green)
```tsx
<div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
  <div 
    className="bg-[rgb(144,255,213)] h-full transition-all duration-500"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Circular Progress
- Outer ring: #E5E7EB
- Progress ring: rgb(144, 255, 213)
- Text: #1A2332 (bold)

---

## Icons

### Icon Style
- Use **outline/stroke icons** (not filled)
- Lucide React icon library
- Standard sizes: 16px, 20px, 24px, 32px

### Icon Colors
- Primary: #4B5563 (default)
- Active: rgb(144, 255, 213) (mint)
- Secondary: #60A5FA (blue)
- Error: #FB7185 (coral)

---

## Navigation

### Sidebar (Desktop)
- Background: White (#FFFFFF)
- Width: 280px (80 in Tailwind)
- Border: 1px solid #E5E7EB (right edge)
- Active item: Light mint background with mint text
- Hover: #F7F9FC background

### Mobile Navigation
- Bottom bar or hamburger menu
- Icons only (mobile)
- Text + icons (tablet)

---

## Animations

### Transitions
All transitions use `transition-all duration-200` for smooth, snappy feel.

### Hover Effects
- Shadow increase (one level up)
- Slight scale on buttons: `hover:scale-[1.02]`
- Border color change
- Background color darken/lighten

### Loading States
- Skeleton screens with shimmer effect
- Spinner: Mint green (#90FFD5)

---

## Data Visualization

### Charts (Recharts)
**Color Palette for Charts:**
1. rgb(144, 255, 213) - Mint (primary metric)
2. #60A5FA - Sky blue (secondary metric)
3. #FB7185 - Coral (comparison/negative)
4. #FBBF24 - Amber (highlights)

### Stats Cards
- Large bold number (32px-48px)
- Small label below (12px-14px)
- Icon on the side or top
- Subtle background color or gradient

---

## Specific Component Styles

### Dashboard Stat Card
```tsx
<div className="bg-white rounded-lg shadow-sm p-6 border border-[#E5E7EB]">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-[#9CA3AF]">Total XP</p>
      <p className="text-3xl font-bold text-[#1A2332] mt-1">1,250</p>
    </div>
    <div className="w-12 h-12 bg-[rgb(178,255,226)] rounded-lg flex items-center justify-center">
      <Award className="w-6 h-6 text-[#1A2332]" />
    </div>
  </div>
</div>
```

### Learning Path Card
```tsx
<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-[#E5E7EB] cursor-pointer group">
  <div className="relative h-48 overflow-hidden">
    <img src="..." className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    <div className="absolute top-4 left-4">
      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#1A2332]">
        Foundation
      </span>
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold text-[#1A2332] mb-2">Path Title</h3>
    <p className="text-sm text-[#4B5563] mb-4">Description text...</p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#9CA3AF]">6 hours</span>
      <span className="text-sm font-medium text-[rgb(144,255,213)]">+300 XP</span>
    </div>
  </div>
</div>
```

### Question Option (Multiple Choice)
```tsx
{/* Unselected */}
<button className="w-full p-4 bg-[#F7F9FC] hover:bg-[#DBEAFE] border border-[#E5E7EB] hover:border-[#60A5FA] rounded-lg text-left transition-all duration-200">
  <span className="text-[#1A2332]">Option text</span>
</button>

{/* Selected - Correct */}
<div className="w-full p-4 bg-[rgb(178,255,226)] border-2 border-[rgb(144,255,213)] rounded-lg">
  <div className="flex items-center justify-between">
    <span className="text-[#1A2332] font-medium">Option text</span>
    <CheckCircle className="w-5 h-5 text-[rgb(110,230,180)]" />
  </div>
</div>

{/* Selected - Incorrect */}
<div className="w-full p-4 bg-[#FEE2E2] border-2 border-[#FB7185] rounded-lg">
  <div className="flex items-center justify-between">
    <span className="text-[#1A2332] font-medium">Option text</span>
    <XCircle className="w-5 h-5 text-[#FB7185]" />
  </div>
</div>
```

---

## Accessibility

### Focus States
All interactive elements must have visible focus indicators:
```tsx
focus:outline-none focus:ring-2 focus:ring-[rgb(144,255,213)] focus:ring-offset-2
```

### Color Contrast
All text must meet WCAG AA standards:
- Primary text on white: ✅ #1A2332 (19.6:1)
- Secondary text on white: ✅ #4B5563 (9.5:1)
- Mint on white (for text): ⚠️ Use #1A2332 text on mint backgrounds

---

## Mobile Optimization

- Minimum touch target: 44x44px
- Stack cards vertically
- Full-width buttons on mobile
- Reduce padding (16px instead of 24px)
- Single column layouts

---

## Examples

### Before (Clay) vs After (Fitness)

**Clay Button:**
```tsx
className="px-6 py-3 bg-[#7A9B70] text-white rounded-2xl border-4 border-[#3A4A46] shadow-[4px_4px_0px_0px_#3A4A46]"
```

**Fitness Button:**
```tsx
className="px-6 py-3 bg-[rgb(144,255,213)] text-[#1A2332] rounded-lg shadow-sm hover:shadow-md transition-all"
```

**Clay Card:**
```tsx
className="bg-[#FFF8F2] rounded-2xl border-4 border-[#3A4A46] shadow-[6px_6px_0px_0px_#3A4A46]"
```

**Fitness Card:**
```tsx
className="bg-white rounded-lg shadow-sm border border-[#E5E7EB]"
```

---

## Design Inspiration Sources

Based on leading fitness and wellness apps:
- Clean data visualization
- Motivational color schemes
- Progress-focused UI
- Professional yet energetic
- Modern, minimal aesthetic

---

**Version**: 1.0
**Last Updated**: November 4, 2025
