# ChurchAcademy Clay-Style Design System

A warm, cozy, game-like design system inspired by Duolingo's playful aesthetic, tailored for church leadership development.

---

## Color Palette

### Primary Colors

**Sage Green** - Primary brand color
- `#7A9B70` - Main sage green (buttons, accents, success states)
- `#6B8A61` - Hover state for sage green
- `#A7B6A0` - Light sage (backgrounds, subtle highlights)
- `#8FA888` - Medium sage variant

**Dark Sage** - Text and icons
- `#3A4A46` - Primary text, borders, icons (unified across all pages)
- `#6B7B77` - Secondary text, muted content

**Coral/Orange** - Secondary accent
- `#E66E5A` - Incorrect answers, alerts, warnings
- `#D45B47` - Coral hover state
- `#F0AA9E` - Light coral

**Cream/Beige** - Backgrounds
- `#FFF8F2` - Main background color (warm white)
- `#FDD6A1` - Accent beige for cards
- `#F4A460` - Gold/orange for achievements

**Neutral Tones**
- `#E6DFD8` - Light beige
- `#C9B8A8` - Medium beige
- `#C5D1BF` - Light sage tint

### Color Usage Guidelines

**Consistency Rules**:
- ✅ **ALL stat icons** use `#3A4A46` (dark sage) - no exceptions
- ✅ **ALL interactive backgrounds** use sage green variations
- ✅ **Lives/Hearts** always use `#3A4A46` for icon color
- ✅ **Hints/Lightbulbs** always use `#3A4A46` for icon color
- ✅ **Star/Trophy** icons use `#3A4A46` for icon color
- ✅ Backgrounds for stats use sage green tints with low opacity

**Color Meanings**:
- **Sage Green**: Success, correct answers, progress, positive actions
- **Coral**: Errors, incorrect answers, warnings, attention needed
- **Dark Sage**: All UI icons, text, borders (unified approach)
- **Cream**: Warm, welcoming backgrounds
- **Gold**: Achievements, bonuses, special rewards

---

## Typography

### Font Family
- **Primary Font**: `'Nunito', sans-serif`
- **Fallback**: System fonts

### Font Weights
- Regular: 400
- Medium: 500 (default for body text)
- Semi-Bold: 600
- Bold: 700
- Extra-Bold: 800

### Type Scale
Defined in `globals.css` with default sizes for each HTML element:
- **h1**: Large headings (hero text)
- **h2**: Section headings
- **h3**: Subsection headings
- **p**: Body text
- **small**: Helper text, captions

**Important**: Do not use Tailwind font size classes (like `text-2xl`) unless specifically requested. Use HTML semantic tags and let CSS handle sizing.

---

## Clay-Style Components

### Rounded Corners
All interactive elements use generous border radius:
- **Buttons**: `rounded-2xl` (16px)
- **Cards**: `rounded-3xl` (24px)
- **Input fields**: `rounded-2xl` (16px)
- **Badges**: `rounded-xl` (12px)
- **Icons containers**: `rounded-xl` or `rounded-2xl`

### Thick Borders
- **Primary borders**: `border-2` (2px solid)
- **Border color**: `#3A4A46` (dark sage) for consistency
- **Accent borders**: Use on cards, buttons, interactive elements

### Soft Shadows
Custom shadow system for depth:
- **Default shadow**: `shadow-[0_4px_0_0_rgba(58,74,70,0.1)]`
- **Button shadow**: `shadow-[0_3px_0_0_rgba(58,74,70,0.1)]`
- **Card shadow**: `shadow-[0_8px_0_0_rgba(58,74,70,0.1)]`
- **Small shadow**: `shadow-[0_2px_0_0_rgba(58,74,70,0.1)]`

**Active State**: Buttons translate down and lose shadow when clicked
```tsx
active:shadow-none active:translate-y-[2px]
```

### Button Styles

**Primary Button** (Sage Green):
```tsx
className="bg-[#7A9B70] hover:bg-[#6B8A61] text-white rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.2)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

**Secondary Button** (White/Outline):
```tsx
className="bg-white hover:bg-secondary text-[#3A4A46] rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.1)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

**Danger Button** (Coral):
```tsx
className="bg-[#E66E5A] hover:bg-[#D45B47] text-white rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.2)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

### Card Styles

**Standard Card**:
```tsx
className="rounded-3xl border-2 border-[#3A4A46] 
shadow-[0_8px_0_0_rgba(58,74,70,0.1)] bg-white"
```

**Accent Card** (with sage background):
```tsx
className="rounded-3xl border-2 border-[#3A4A46] 
shadow-[0_4px_0_0_rgba(58,74,70,0.1)] bg-[#A7B6A0]/20"
```

**Achievement Card** (beige):
```tsx
className="rounded-2xl border-2 border-[#3A4A46] 
shadow-[0_2px_0_0_rgba(58,74,70,0.1)] bg-[#FDD6A1]/40"
```

### Badge Styles

**Stat Badge** (Lives, Hints, Points):
```tsx
className="flex items-center gap-2 px-3 py-2 rounded-xl 
border-2 border-[#3A4A46] bg-white shadow-[0_2px_0_0_rgba(58,74,70,0.1)]"
```

**Progress Badge**:
```tsx
className="bg-[#7A9B70]/20 text-[#3A4A46] border-2 border-[#7A9B70] 
px-4 py-2 rounded-xl"
```

### Icon Containers

**Stat Icon Box**:
```tsx
className="w-10 h-10 rounded-xl bg-[#7A9B70]/20 border-2 
border-[#3A4A46] flex items-center justify-center"
```
Icon color: `text-[#3A4A46]` (always dark sage)

**Large Achievement Icon**:
```tsx
className="w-16 h-16 rounded-2xl bg-white border-2 border-[#3A4A46] 
flex items-center justify-center shadow-[0_2px_0_0_rgba(58,74,70,0.1)]"
```

---

## Interactive States

### Hover States
- **Buttons**: Darken background color
- **Cards**: Slight background color change `hover:bg-secondary`
- **Links**: Underline or color change

### Active/Pressed States
- **All clickable elements**: 
  - Remove shadow: `active:shadow-none`
  - Translate down: `active:translate-y-[2px]`
  - Creates "pressed" effect

### Selected States
- **Background**: `bg-[#7A9B70]` or `bg-[#7A9B70]/30`
- **Border**: `border-[#3A4A46]`
- **Text**: High contrast for readability

### Disabled States
- **Opacity**: `opacity-50`
- **Cursor**: `cursor-not-allowed`
- **No hover effects**

---

## Layout Patterns

### Navigation Sidebar
- **Width**: `w-80` (320px) on desktop
- **Background**: `bg-white`
- **Border**: Right border with `border-r-2 border-[#3A4A46]`
- **Sticky position**: `fixed left-0 top-0 h-screen`
- **Logout button**: Sticky at bottom with clay styling

### Main Content Area
- **Margin**: `lg:ml-80` to account for sidebar
- **Background**: `bg-[#FFF8F2]` (cream)
- **Padding**: `p-6` or `p-8`
- **Max width**: `max-w-7xl mx-auto` for large screens

### Card Grids
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Responsive**: Single column on mobile, adapt on larger screens

---

## Animation Guidelines

### Motion Library
Use `motion/react` (Framer Motion) for animations

### Common Animations

**Fade In**:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

**Slide Up**:
```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2 }}
>
```

**Scale Pop**:
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: 'spring', stiffness: 200 }}
>
```

**Stagger Children**:
```tsx
transition={{ delay: 0.5 + (index * 0.1) }}
```

### Transition Timing
- **Fast**: 150ms - Small UI changes
- **Normal**: 300ms - Standard animations
- **Slow**: 500ms - Major transitions
- **Spring**: Use for playful, bouncy effects

---

## Component-Specific Guidelines

### Question Cards (Learning Scenario)
- **Container**: Max width with centered content
- **Option buttons**: Full width, clay-style with borders
- **Correct state**: Green border `border-[#7A9B70]`, light green bg
- **Incorrect state**: Coral border `border-[#E66E5A]`, light coral bg
- **Unselected**: White bg, dark sage border

### Progress Indicators
- **Progress bar**: Sage green fill, cream background
- **Percentage**: Large display with smaller % symbol
- **Stars**: Gold fill `fill-[#F4A460]` when earned, gray when not

### Results Screen
- **Trophy icon**: Gold `text-[#F4A460]`
- **Confetti**: Multi-color dots falling animation
- **Points breakdown**: Beige card with itemized list
- **Motivational text**: Sage green card with encouraging message

### Learning Path Cards
- **Thumbnail**: Rounded image at top
- **Progress bar**: Below title
- **Stats**: Icons use `text-[#3A4A46]` consistently
- **Hover**: Slight scale and shadow increase

### Leaderboard
- **Rank badges**: Circular with border
- **Current user**: Highlighted row with sage background
- **Podium positions**: Gold, silver, bronze styling

---

## Accessibility

### Color Contrast
- Ensure text meets WCAG AA standards (4.5:1 minimum)
- Dark sage `#3A4A46` on cream `#FFF8F2` passes
- White text on sage green `#7A9B70` passes

### Interactive Elements
- **Focus rings**: Visible focus states on all interactive elements
- **Touch targets**: Minimum 44x44px for buttons
- **Keyboard navigation**: All features accessible via keyboard

### Screen Readers
- Use semantic HTML (`button`, `nav`, `main`, etc.)
- Provide `aria-label` for icon-only buttons
- Use `alt` text for all images

---

## Responsive Design

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px` (md)
- **Desktop**: `> 1024px` (lg)

### Mobile Considerations
- Hide sidebar, use hamburger menu
- Stack cards vertically
- Larger touch targets
- Simplify navigation

### Desktop Features
- Fixed sidebar navigation
- Multi-column layouts
- Hover states
- Keyboard shortcuts

---

## Do's and Don'ts

### ✅ Do:
- Use rounded corners liberally (xl, 2xl, 3xl)
- Apply thick borders (border-2) to interactive elements
- Use soft shadows for depth
- Maintain consistent icon colors (`#3A4A46` for stats)
- Add active states with translate and shadow removal
- Use sage green for success/progress
- Use coral for errors/warnings
- Keep backgrounds warm and welcoming

### ❌ Don't:
- Use sharp corners (avoid `rounded-sm` or `rounded-md`)
- Mix different icon colors for stats (always use `#3A4A46`)
- Use thin borders (avoid `border` or `border-1`)
- Use harsh shadows (avoid `shadow-xl` without customization)
- Use cold colors (blues, grays) for primary elements
- Override default typography sizes without reason
- Create inconsistent button styles

---

## Implementation Checklist

When creating new components:

- [ ] Uses Nunito font family
- [ ] Rounded corners (2xl or 3xl)
- [ ] Thick borders (border-2) with `#3A4A46`
- [ ] Soft shadows with custom values
- [ ] Active state with translate and shadow removal
- [ ] Sage green for primary actions
- [ ] Dark sage `#3A4A46` for ALL stat icons
- [ ] Cream background `#FFF8F2` for pages
- [ ] Accessible color contrast
- [ ] Responsive design
- [ ] Motion animations for delight
- [ ] Semantic HTML structure

---

## Design Inspiration

ChurchAcademy's design draws inspiration from:
- **Duolingo**: Playful, game-like interface with character
- **Educational apps**: Clear, friendly, achievement-focused
- **Clay/Neomorphism**: Soft, tactile, 3D-like elements
- **Church community**: Warm, welcoming, inclusive atmosphere

The result is a unique blend that feels:
- Professional yet approachable
- Serious about learning yet fun to use
- Modern yet timeless
- Technical yet human-centered
