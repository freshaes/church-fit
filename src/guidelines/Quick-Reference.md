# ChurchAcademy Quick Reference Guide

Fast lookup reference for common development tasks and questions.

---

## 🎨 Colors

### Primary Palette
```
Sage Green:  #7A9B70 (buttons, success, progress)
Dark Sage:   #3A4A46 (ALL icons, text, borders)
Coral:       #E66E5A (errors, incorrect, warnings)
Cream:       #FFF8F2 (backgrounds)
```

### Icon Colors
**IMPORTANT**: All stat icons (XP, lives, hints, streak, level) MUST use `#3A4A46` (dark sage)

---

## 📐 Clay-Style Standards

### Rounded Corners
- Buttons: `rounded-2xl` (16px)
- Cards: `rounded-3xl` (24px)
- Inputs: `rounded-2xl` (16px)
- Badges: `rounded-xl` (12px)

### Borders
- All interactive: `border-2` (2px solid)
- Color: `#3A4A46` (dark sage)

### Shadows
```tsx
Button: shadow-[0_3px_0_0_rgba(58,74,70,0.15)]
Card: shadow-[0_4px_0_0_rgba(58,74,70,0.1)]
Input: shadow-[0_2px_0_0_rgba(58,74,70,0.1)]
```

### Active State (all buttons)
```tsx
active:shadow-none active:translate-y-[2px] transition-all
```

---

## 📁 File Locations

### Components
```
Login:           /components/Login.tsx
Onboarding:      /components/Onboarding.tsx
Dashboard:       /components/Dashboard.tsx
Learning:        /components/LearningScenario.tsx
Results:         /components/ResultsScreen.tsx
Browse:          /components/BrowseLessons.tsx
Course Detail:   /components/CourseDetail.tsx
Profile:         /components/Profile.tsx
Leaderboard:     /components/Leaderboard.tsx
Admin:           /components/AdminDashboard.tsx
Navigation:      /components/Navigation.tsx
```

### Documentation
```
Design System:      /guidelines/Clay-Style-Guide.md
Dev Guidelines:     /guidelines/Guidelines.md
Features:           /guidelines/Prototype-Features.md
Page Details:       /guidelines/Page-Documentation.md
User Journeys:      /guidelines/User-Stories.md
Documentation Map:  /guidelines/Documentation-Summary.md
```

---

## 🎮 Gamification Values

### Lives System
- Start: 3 lives per session
- Lost: 1 life per incorrect answer
- Game Over: 0 lives (can retry)

### Hints System
- Start: 3 hints per session
- Cost: 1 hint to reveal clue
- Status: Disabled when 0 remain

### Points System
- Question Points: 1-10 per question (variable)
- Chapter Bonus: +50 (when ≥70% correct)
- Path Bonus: +100 (final chapter complete)

### Stars
- 3 Stars: ≥90% correct
- 2 Stars: 70-89% correct
- 1 Star: <70% correct (failed)

---

## 🔤 Typography

**Font Family**: `Nunito, sans-serif`

**Rule**: Do NOT use Tailwind font classes (`text-2xl`, `font-bold`, etc.)

**Instead**: Use semantic HTML
```tsx
<h1>Main Heading</h1>      // Large, bold
<h2>Section Heading</h2>   // Medium, bold
<h3>Subsection</h3>        // Smaller heading
<p>Body text</p>           // Regular body
```

**Exception**: Only use font utilities when explicitly requested

---

## 🖼️ Images

### Always Use ImageWithFallback
```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="https://images.unsplash.com/..." 
  alt="Description"
  className="w-full h-64 object-cover rounded-2xl"
/>
```

### Never use: `<img>` tag directly

---

## 🎭 Question Types

### 6 Core Types
1. **content** - Teaching slide, no answer
2. **multiple-choice** - Single correct answer
3. **true-false** - Binary choice
4. **multiple-answer** - Select all that apply
5. **matching** - Drag-and-drop pairs
6. **fill-blank** - Drag words to blanks

### Universal Features (all types)
- Optional `imageUrl` - Shows above question
- Optional `videoUrl` - Shows above question
- Optional `hint` - Costs 1 hint to reveal
- Required `points` - Score value

---

## 🎨 Button Styles

### Primary Button
```tsx
className="bg-[#7A9B70] hover:bg-[#6B8A61] text-white rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.2)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

### Secondary/Outline Button
```tsx
className="bg-white hover:bg-secondary text-[#3A4A46] rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.1)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

### Danger Button
```tsx
className="bg-[#E66E5A] hover:bg-[#D45B47] text-white rounded-2xl 
border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.2)] 
active:shadow-none active:translate-y-[2px] transition-all"
```

---

## 📱 Responsive Breakpoints

```tsx
Mobile:  < 768px       // Base styles
Tablet:  md: (768px)   // Use md: prefix
Desktop: lg: (1024px)  // Use lg: prefix
```

### Common Pattern
```tsx
className="
  grid 
  grid-cols-1         // Mobile: 1 column
  md:grid-cols-2      // Tablet: 2 columns
  lg:grid-cols-3      // Desktop: 3 columns
  gap-6
"
```

---

## 🎬 Animation Patterns

### Fade In
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

### Slide Up
```tsx
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
>
```

### Stagger Children
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
  >
```

---

## 🏗️ Data Structures

### User Object
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@church.org",
  role: "Youth Minister",
  goals: ["Lead with Confidence"],
  xp: 1250,
  lives: 3,
  hints: 3,
  streak: 7,
  level: 4,
  avatarUrl: "data:image/...",
  badgesEarned: [1, 3, 5],
  completedPaths: [1],
  progress: {}
}
```

### Question Object
```javascript
{
  id: 1,
  type: "multiple-choice",
  question: "Question text here",
  imageUrl: "https://...",  // optional
  videoUrl: "https://...",  // optional
  hint: "Helpful clue",     // optional
  points: 5,
  options: [
    {
      id: "a",
      text: "Answer",
      explanation: "Why",
      feedback: "Response",
      points: 5,
      correct: true
    }
  ]
}
```

---

## 🔍 Finding Information

### "What color should this be?"
→ **Clay-Style-Guide.md** - Color Palette

### "What happens when I click this?"
→ **Page-Documentation.md** - Find page & element

### "How do I implement this feature?"
→ **Guidelines.md** - Code patterns
→ **Prototype-Features.md** - Feature specs

### "What's the user journey?"
→ **User-Stories.md** - Complete journeys

### "Where do I start?"
→ **Documentation-Summary.md** - Overview

---

## ✅ Pre-Commit Checklist

Before committing changes:

**Styling**:
- [ ] All stat icons use `#3A4A46`
- [ ] Buttons have clay-style (rounded-2xl, border-2, shadow)
- [ ] Active state includes press effect
- [ ] No font size classes unless requested
- [ ] Colors match Clay Style Guide

**Code Quality**:
- [ ] No `<img>` tags (use ImageWithFallback)
- [ ] Proper component structure
- [ ] Import order correct
- [ ] No hardcoded values (use variables)

**Functionality**:
- [ ] Lives/hints system works
- [ ] Points calculation accurate
- [ ] Navigation flows correct
- [ ] All question types functional

**Responsive**:
- [ ] Tested at 375px (mobile)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 1024px+ (desktop)

**Accessibility**:
- [ ] Semantic HTML used
- [ ] Alt text on images
- [ ] Keyboard navigation works
- [ ] Focus states visible

---

## 🚀 Common Tasks

### Add a New Button
1. Use clay-style button pattern (see Button Styles above)
2. Add active press effect
3. Document purpose in Page-Documentation.md
4. Test on mobile

### Add a New Page
1. Create component in `/components/`
2. Add to routing in App.tsx
3. Add navigation link in Navigation.tsx
4. Document in Page-Documentation.md
5. Add user journey in User-Stories.md

### Change a Color
1. Update Clay-Style-Guide.md
2. Update CSS variables in globals.css
3. Search/replace in components
4. Test contrast ratios

### Add a Question Type
1. Define data structure in Guidelines.md
2. Implement in LearningScenario.tsx
3. Add to PathEditorFull.tsx
4. Document in Prototype-Features.md
5. Test in learning flow

### Style a Stat Icon
```tsx
// Always use this color for stat icons:
<Star className="w-5 h-5 text-[#3A4A46]" />
```

---

## 🎯 Quick Wins

### Make Any Button Clay-Style
Add these classes:
```tsx
rounded-2xl border-2 border-[#3A4A46] 
shadow-[0_3px_0_0_rgba(58,74,70,0.1)]
active:shadow-none active:translate-y-[2px]
transition-all
```

### Make Any Card Clay-Style
Add these classes:
```tsx
rounded-3xl border-2 border-[#3A4A46]
shadow-[0_4px_0_0_rgba(58,74,70,0.1)]
bg-white p-6
```

### Fix Icon Color Inconsistency
Change to: `text-[#3A4A46]`

---

## 📞 Get Help

### Stuck on styling?
→ Clay-Style-Guide.md

### Don't know what feature does?
→ Prototype-Features.md → User-Stories.md

### Need code pattern?
→ Guidelines.md

### Need to see page layout?
→ Page-Documentation.md

### Need complete overview?
→ Documentation-Summary.md

---

## 🏆 Best Practices

### DO ✅
- Use semantic HTML tags
- Apply clay-style to all interactive elements
- Use `#3A4A46` for ALL stat icons
- Use ImageWithFallback for images
- Test on mobile, tablet, desktop
- Document changes in relevant .md files
- Keep components modular
- Use Motion for animations

### DON'T ❌
- Use Tailwind font classes (text-2xl, font-bold)
- Use `<img>` tag directly
- Mix different icon colors for stats
- Create sharp corners (avoid rounded-sm)
- Use thin borders (avoid border-1)
- Hardcode colors (use hex values from guide)
- Skip active state on buttons

---

## 🎓 Learning Resources

### External Docs
- Shadcn/UI: https://ui.shadcn.com/
- Lucide Icons: https://lucide.dev/
- Tailwind CSS: https://tailwindcss.com/
- React: https://react.dev/
- Motion: https://motion.dev/

### Internal Docs (read in order)
1. Documentation-Summary.md (10 min read)
2. Clay-Style-Guide.md (20 min read)
3. Guidelines.md (30 min read)
4. Prototype-Features.md (scan as needed)
5. Page-Documentation.md (reference when building)
6. User-Stories.md (understand users)

---

**Last Updated**: January 2025  
**Version**: 1.0

**Keep this file open while developing!** 🚀
