# ChurchAcademy Development Guidelines

Complete development guidelines for the ChurchAcademy platform - a comprehensive web-based leadership development application designed specifically for churches.

> 📊 **See [FLOW_DIAGRAM.md](/FLOW_DIAGRAM.md)** for visual navigation flows and user journeys

---

## Project Overview

**ChurchAcademy** is a "Duolingo for leadership skills" - a gamified learning platform that helps church leaders develop essential ministry skills through interactive lessons, quizzes, and achievement tracking.

### Core Features
- Personalized onboarding with role selection
- Structured learning paths with hierarchical chapters
- 7 interactive question types (including drag-and-drop, matching, fill-in-blank, reflection)
- Gamification (lives, hints, points, badges, leaderboards)
- Reflection system with admin feedback
- Comprehensive admin panel for content management
- Clay-style UI inspired by Duolingo
- Profile management with avatar upload
- Course browsing and filtering

---

## Technology Stack

### Frontend Framework
- **React** - Component-based UI
- **TypeScript/JavaScript** - Type-safe development
- **Tailwind CSS v4.0** - Utility-first styling (no config file needed)

### Key Libraries
- **Motion (Framer Motion)** - Animations (`motion/react`)
- **Lucide React** - Icon library
- **Recharts** - Chart visualization
- **React DnD** - Drag and drop functionality
- **React Hook Form** - Form handling (`react-hook-form@7.55.0`)
- **Shadcn/UI** - Component library (in `/components/ui`)

### Styling
- **Custom CSS** - `styles/globals.css` for typography and tokens
- **Tailwind v4.0** - No `tailwind.config.js` file
- **CSS Variables** - Design tokens in globals.css

---

## File Structure

```
/
├── App.tsx                          # Main app component with routing
├── components/
│   ├── Login.tsx                    # Authentication page
│   ├── LogoutScreen.tsx            # Friendly logout farewell page
│   ├── Onboarding.tsx              # Role & goal selection
│   ├── Dashboard.tsx               # Main user dashboard
│   ├── Navigation.tsx              # Sidebar navigation
│   ├── LearningScenario.tsx        # Question flow & game mechanics
│   ├── ResultsScreen.tsx           # Chapter completion screen
│   ├── BrowseLessons.tsx           # Course browsing page
│   ├── CourseDetail.tsx            # Individual course details
│   ├── Profile.tsx                 # User profile with avatar upload
│   ├── MyReflections.tsx           # User reflection submissions & feedback
│   ├── Leaderboard.tsx             # Global rankings
│   ├── AdminDashboard.tsx          # Admin control panel
│   ├── PathEditor.tsx              # Path management interface
│   ├── PathEditorFull.tsx          # Detailed path editor
│   ├── UserManager.tsx             # User administration
│   ├── BadgeManager.tsx            # Badge system management
│   ├── AdminReflections.tsx        # Admin feedback on reflections
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Protected component for images
│   └── ui/                          # Shadcn components (40+ components)
├── styles/
│   └── globals.css                 # Typography, variables, base styles
└── guidelines/
    ├── Clay-Style-Guide.md         # Design system documentation
    ├── Guidelines.md               # This file
    ├── Prototype-Features.md       # Feature specifications
    ├── Page-Documentation.md       # Page-by-page element breakdown
    ├── User-Stories.md             # User journeys and outcomes
    ├── Documentation-Summary.md    # How all docs work together
    └── Quick-Reference.md          # Fast lookup guide
```

---

## Code Standards

### Component Structure

**Preferred Pattern**:
```tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Icon } from 'lucide-react';

export function ComponentName({ prop1, prop2, onAction }) {
  const [state, setState] = useState(initialValue);

  const handleEvent = () => {
    // Logic here
  };

  return (
    <div className="container">
      {/* JSX here */}
    </div>
  );
}
```

### File Naming
- **Components**: PascalCase (e.g., `LearningScenario.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **UI Components**: lowercase with hyphens (e.g., `button.tsx`)

### Import Order
1. React and core libraries
2. Component imports from `/components/ui`
3. Other component imports
4. Icon imports
5. Utility imports
6. Type imports (if using TypeScript)

---

## Styling Guidelines

### Tailwind CSS v4.0

**Do Not Create**:
- No `tailwind.config.js` file (v4.0 doesn't use it)
- No custom Tailwind plugins

**Typography Classes**:
- ❌ **Avoid**: `text-2xl`, `font-bold`, `leading-tight`
- ✅ **Use**: HTML semantic tags (`<h1>`, `<h2>`, `<p>`)
- Typography is handled in `globals.css`

**Exception**: Only use font utility classes when explicitly requested by user

### CSS Custom Properties

Defined in `globals.css`:
```css
:root {
  --sage-green: #7A9B70;
  --dark-sage: #3A4A46;
  --coral: #E66E5A;
  --cream: #FFF8F2;
  /* etc. */
}
```

### Shadcn Component Usage

**Import Pattern**:
```tsx
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
```

**Available Components** (see `/components/ui/`):
- Forms: Button, Input, Textarea, Checkbox, Radio, Select, Switch
- Layout: Card, Tabs, Accordion, Collapsible, Separator
- Feedback: Alert, Badge, Progress, Skeleton, Toast (Sonner)
- Overlays: Dialog, Drawer, Popover, Sheet, Tooltip
- Navigation: Breadcrumb, Menu, Pagination, Sidebar
- Data: Table, Chart
- And many more...

---

## State Management

### Local State
- Use `useState` for component-level state
- Use `useEffect` for side effects
- Keep state as close to usage as possible

### Prop Drilling
- Pass callbacks for child-to-parent communication
- Use event handlers (e.g., `onComplete`, `onBack`)

### Example:
```tsx
// Parent
function Dashboard() {
  const [userData, setUserData] = useState(initialData);
  
  const handleComplete = (score) => {
    // Update state
    setUserData({ ...userData, score });
  };

  return (
    <LearningScenario 
      onComplete={handleComplete}
      userData={userData}
    />
  );
}

// Child
function LearningScenario({ onComplete, userData }) {
  const finishLesson = () => {
    onComplete(finalScore);
  };
  
  return <div>{/* UI */}</div>;
}
```

---

## Data Structures

### User Data
```javascript
{
  id: 1,
  username: "johndoe",
  email: "user@church.org",
  name: "John Doe",
  role: "Youth Minister",
  goals: ["Lead with Confidence", "Create Team Unity"],
  xp: 1250,
  lives: 3,
  hints: 3,
  streak: 7,
  level: 4,
  avatarUrl: "data:image/...",
  badgesEarned: [1, 3, 5],
  completedPaths: [1],
  currentPath: 2,
  progress: { /* path/chapter progress */ }
}
```

### Learning Path
```javascript
{
  id: 1,
  title: "Leadership Fundamentals",
  description: "Master essential principles...",
  difficulty: "Foundation", // or "Intermediate", "Expert"
  estimatedTime: "6 hours", // or "4 weeks", etc.
  categories: ["Leadership", "Team Building"],
  thumbnailUrl: "https://...",
  xpReward: 300,
  status: "published",
  targetRoles: ["Senior Pastor", "Youth Minister"],
  targetGoals: ["Lead with Confidence", "Develop Your People"],
  chapters: [
    {
      id: 1,
      title: "Introduction to Leadership",
      questions: [/* question objects */]
    }
  ]
}
```

### Question Object
```javascript
{
  id: 1,
  type: "multiple-choice", // or: content, true-false, multiple-answer, matching, fill-blank, reflection
  question: "Your question text here",
  imageUrl: "https://...", // optional
  videoUrl: "https://...", // optional
  hint: "Helpful clue...", // optional (not for reflection type)
  points: 5,
  options: [
    {
      id: "a",
      text: "Answer choice",
      explanation: "Brief rationale",
      feedback: "Detailed response",
      points: 5,
      correct: true
    }
  ]
  // For reflection questions, options array is empty
}
```

### Reflection Data Structure
```javascript
{
  id: 1,
  userId: 123,
  username: "johndoe",
  pathId: 5,
  pathTitle: "Leadership Fundamentals",
  chapterId: 2,
  chapterTitle: "Building Trust",
  questionId: 15,
  question: "How will you apply this principle in your ministry?",
  response: "User's thoughtful reflection text...",
  submittedAt: "2025-11-01T14:30:00Z",
  adminFeedback: "Great insight! Consider also...", // optional
  feedbackBy: "admin@church.org", // optional
  feedbackAt: "2025-11-01T16:45:00Z" // optional
}
```

---

## Image Handling

### ImageWithFallback Component
**Protected file**: `/components/figma/ImageWithFallback.tsx`

**Usage**:
```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="https://images.unsplash.com/photo-..." 
  alt="Description"
  className="w-full h-64 object-cover rounded-2xl"
/>
```

**Important**: Always use `ImageWithFallback` for new images, not `<img>` tag

### Unsplash Integration
Use `unsplash_tool` for fetching images:
- Provide 2-3 relevant keywords
- Returns URL ready for use
- Example: "church worship team meeting"

### User Uploads (Profile Pictures)
- Uses `URL.createObjectURL()` for local preview
- Stores as base64 data URL
- Clickable upload prototype (no backend required)

---

## Animation Patterns

### Page Transitions
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Staggered Lists
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Item */}
  </motion.div>
))}
```

### Button Press Effect
Already built into clay-style buttons:
```tsx
className="active:shadow-none active:translate-y-[2px] transition-all"
```

---

## Routing & Navigation

> 📊 **See [FLOW_DIAGRAM.md](/FLOW_DIAGRAM.md)** for complete visual navigation flows

### App Structure
```tsx
// App.tsx
function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userData, setUserData] = useState(null);

  switch (currentPage) {
    case 'login':
      return <Login onLogin={...} />;
    case 'onboarding':
      return <Onboarding onComplete={...} />;
    case 'dashboard':
      return <Dashboard userData={userData} />;
    // etc.
  }
}
```

### Navigation Flow
1. **Login** → Onboarding (first time) or Dashboard (returning)
2. **Onboarding** (6 steps):
   - Role selection
   - Goals (multi-select)
   - Time commitment
   - Account creation
   - Church info
   - **Recommended Path** (single selection)
3. **Dashboard** → Learning Scenario / Browse / Profile / My Reflections / Leaderboard / Admin
4. **Learning Scenario** → Results Screen → Dashboard
5. **My Reflections** → View submitted reflections and admin feedback
6. **Admin** (separate flow) → Admin Dashboard → Path Editor / User Manager / Admin Reflections
7. **Logout** → Logout Screen → Login (with "Back to Login" button)

For detailed flow diagrams including all question types, admin flows, and gamification logic, see **[FLOW_DIAGRAM.md](/FLOW_DIAGRAM.md)**.

---

## Question Types Implementation

### 7 Question Types

1. **Content Slide** (`type: 'content'`)
   - No answer required
   - Shows title and content
   - "Continue" button only

2. **Multiple Choice** (`type: 'multiple-choice'`)
   - Single correct answer
   - Shows options with explanations
   - Feedback on selection

3. **True/False** (`type: 'true-false'`)
   - Binary choice
   - Simple correct/incorrect feedback

4. **Multiple Answer** (`type: 'multiple-answer'`)
   - Select all that apply
   - Checkboxes instead of radio buttons
   - Must get all correct for full points

5. **Matching** (`type: 'matching'`)
   - Drag from left, drop on right
   - Color-coded matches
   - Touch and mouse support

6. **Fill in the Blank** (`type: 'fill-blank'`)
   - Drag words into sentence blanks
   - Multiple blanks possible
   - Word bank provided

7. **Reflection** (`type: 'reflection'`)
   - Open-ended text response
   - Textarea for thoughtful answers
   - No right/wrong - always awards full points
   - Submissions saved for admin review
   - Admins can provide feedback

### Universal Features (All Types)
- Optional `imageUrl` - Shows image above question
- Optional `videoUrl` - Shows video above question
- Optional `hint` - Costs 1 hint to reveal (not applicable to reflection type)
- `points` - Score value for question

---

## Gamification System

### Lives System
- Start with 3 lives per session
- Lose 1 life per incorrect answer
- Heart icons show remaining lives
- Game over at 0 lives (can retry)

### Hints System
- Start with 3 hints per session
- Click "Use Hint" to reveal hint text
- Lightbulb icon with count
- Disabled when none remain

### Points & Scoring
- **Question Points**: Variable (1-10 per question)
- **Chapter Bonus**: +50 points (when passing ≥70%)
- **Path Bonus**: +100 points (final chapter completion)
- **Total XP**: Sum of all points earned

### Results Screen
Shows:
- Percentage correct
- Star rating (1-3 stars)
- Pass/fail status
- Points breakdown (questions + bonuses)
- Motivational message
- Action buttons (Continue / Retry)

### Badges
- Awarded for achievements
- Displayed in profile
- Managed in BadgeManager
- Rarity levels: Common, Rare, Epic, Legendary

### Leaderboard
- Global XP rankings
- Current user highlighted
- Podium display (top 3)
- Rank badges for all users

### Reflection System
- **User Side (MyReflections Page)**:
  - View all submitted reflections chronologically
  - See path, chapter, and question context
  - View admin feedback when provided
  - Visual indicators for feedback status
  - Filter and search capabilities
  - Proper layout with `lg:ml-80` for sidebar
  
- **Admin Side (AdminReflections Component)**:
  - Review all user reflection submissions
  - Filter by user, path, or review status
  - Provide personalized feedback
  - Track feedback history with timestamps
  - User context displayed for each reflection
  
- **In Learning Flow**:
  - Reflection questions appear in chapter sequences
  - Text area for thoughtful responses
  - Auto-saves user input
  - Always awards full points (no wrong answers)
  - Encourages deeper learning and application

---

## Admin Features

### Admin Dashboard
- Tab-based interface (Paths, Users, Badges, Reflections)
- Create/Edit/Delete learning paths
- User management with role assignment
- Badge creation and awarding
- Review and provide feedback on user reflections

### Path Editor
- Quick path management list
- View/Edit/Delete existing paths
- "Edit Details" opens full editor

### PathEditorFull
- Comprehensive path editing
- **Basic Information Card:**
  - Title and description
  - Difficulty level (Foundation/Intermediate/Expert)
  - Estimated time (text: "6 hours", "4 weeks", etc.)
  - XP reward (total points for completion)
  - Thumbnail image URL with live preview
  - Published/Draft status toggle
- **Categories Card:**
  - 12 category options (Leadership, Communication, etc.)
  - Multi-select checkboxes
  - Badge preview of selected categories
- Target roles & goals selection
- Chapter and question management
- Media attachment (image/video URLs)
- All 7 question types supported (including reflection)
- Drag-and-drop question ordering

### User Manager
- User list with search/filter
- Role and level editing
- XP adjustment
- Badge awarding
- User deletion

### Badge Manager
- Create new badges
- Set name, description, rarity
- Upload badge icons (prototype)
- Award to specific users

### Admin Reflections
- View all user reflection submissions
- Filter by user, path, or chapter
- Provide personalized feedback on reflections
- Track which reflections have been reviewed
- Chronological display with user context

---

## Accessibility Requirements

### Keyboard Navigation
- All interactive elements focusable
- Tab order logical and intuitive
- Enter/Space to activate buttons

### Screen Readers
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels on icon-only buttons
- Alt text on all images
- Live regions for dynamic content

### Color Contrast
- Text meets WCAG AA (4.5:1 ratio)
- Dark sage on cream: ✅ Passes
- White on sage green: ✅ Passes
- Focus indicators visible

### Touch Targets
- Minimum 44x44px for all buttons
- Adequate spacing between interactive elements
- Works on mobile and tablet

---

## Responsive Design

### Mobile First
- Start with mobile layout
- Use Tailwind breakpoints: `md:` and `lg:`
- Stack cards vertically on mobile

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px` (md)
- Desktop: `> 1024px` (lg)

### Navigation
- Desktop: Fixed sidebar (w-80)
- Mobile: Hidden sidebar, hamburger menu
- **Critical**: Adjust spacing: `lg:ml-80` on main content pages
- **Layout Pattern**: Pages should NOT try to be full-page layouts
- **Correct Pattern**: Use `lg:ml-80` to account for sidebar, not `lg:pl-80`
- All content pages (Profile, BrowseLessons, MyReflections, etc.) must follow this pattern

### Components
- Learning cards: 1 column mobile, 2-3 desktop
- Question layouts: Full width mobile, max-w on desktop
- Forms: Stack on mobile, side-by-side on desktop

### Common Layout Patterns

**Standard Content Page (with Navigation sidebar)**:
```tsx
export function ContentPage() {
  return (
    <>
      <Navigation currentPage="content" onNavigate={...} userData={...} />
      <div className="min-h-screen bg-[var(--cream)] lg:ml-80">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page content */}
        </div>
      </div>
    </>
  );
}
```

**Key Points**:
- ❌ **Wrong**: Using `lg:pl-80` (padding pushes content but doesn't account for sidebar)
- ✅ **Correct**: Using `lg:ml-80` (margin-left pushes entire container past sidebar)
- Do NOT try to make the page a full-screen layout - work WITH the Navigation sidebar
- Examples to follow: Profile.tsx, BrowseLessons.tsx, MyReflections.tsx

---

## Performance Considerations

### Image Optimization
- Use `ImageWithFallback` for lazy loading
- Unsplash images pre-optimized
- Compress user uploads if needed

### Code Splitting
- Keep components modular
- Lazy load heavy components if needed
- Minimize bundle size

### Animation Performance
- Use CSS transforms (translate, scale)
- Avoid animating expensive properties
- Use `will-change` sparingly

---

## Testing Guidelines

### Manual Testing Checklist
- [ ] All buttons have clay-style (rounded, bordered, shadow)
- [ ] Icons use consistent colors (`#3A4A46` for stats)
- [ ] Animations smooth and performant
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (test with screen reader)
- [ ] Lives/hints system functions correctly
- [ ] Points calculation accurate
- [ ] All 7 question types work (including reflection)
- [ ] Reflection submissions save correctly
- [ ] Admin feedback displays on MyReflections page
- [ ] Admin features functional
- [ ] Content pages use `lg:ml-80` layout (no overlap with sidebar)

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Common Patterns

### Modal/Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Form with Validation
```tsx
import { useForm } from 'react-hook-form@7.55.0';

const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register("email", { required: true })} />
  {errors.email && <span>Required</span>}
</form>
```

### Loading State
```tsx
import { Skeleton } from "./ui/skeleton";

{isLoading ? (
  <Skeleton className="h-24 w-full" />
) : (
  <ActualContent />
)}
```

---

## Protected Files

**Do Not Modify**:
- `/components/figma/ImageWithFallback.tsx`

These are system files that should remain unchanged.

---

## Deployment Notes

### Build Process
- No build configuration needed
- Tailwind v4.0 auto-processes CSS
- Static assets served from public folder

### Environment
- No backend required (frontend only)
- No environment variables needed
- Can deploy to any static host (Vercel, Netlify, etc.)

---

## Future Enhancements

Potential features for expansion:
- Supabase integration for real data persistence
- Real-time leaderboard updates
- Social features (share achievements)
- Mobile app (React Native)
- Analytics and progress tracking
- Content creator tools
- Multi-language support
- Accessibility improvements

---

## Support & Resources

### Documentation
- Clay-Style-Guide.md - Design system
- Prototype-Features.md - Feature specifications
- This file - Development guidelines

### Component Library
- Shadcn/UI: https://ui.shadcn.com/
- Lucide Icons: https://lucide.dev/
- Tailwind CSS: https://tailwindcss.com/

### Learning Resources
- React: https://react.dev/
- Motion: https://motion.dev/
- React DnD: https://react-dnd.github.io/react-dnd/

---

## Recent Updates

### Latest Changes (Current Session - Nov 1, 2025)

**Reflection System Implementation:**
- ✅ Added 7th question type: Reflection (open-ended text responses)
- ✅ Created MyReflections page for users to view submissions and feedback
- ✅ Created AdminReflections component for admin review and feedback
- ✅ Implemented reflection data structure with admin feedback support
- ✅ Added proper routing throughout app (Navigation, App.tsx, AdminDashboard)
- ✅ Reflection questions always award full points (no right/wrong answers)
- ✅ Admin feedback system with timestamp and author tracking

**Critical UI Layout Fix:**
- ✅ Fixed MyReflections page layout issue (content was overlapping/hidden)
- ✅ Changed from full-page layout to proper sidebar-aware layout
- ✅ Now uses `lg:ml-80` pattern (not `lg:pl-80`) to account for Navigation sidebar
- ✅ Follows same layout pattern as Profile, BrowseLessons, and other content pages
- ✅ Documented proper layout pattern in guidelines to prevent future issues

**Previous Session Updates (Jan 16, 2025):**

_Admin Panel Enhancements:_
- ✅ Added 5 new fields to PathEditorFull (Difficulty, Time, Categories, XP, Thumbnail)
- ✅ All fields now match front-end Browse/CourseDetail displays
- ✅ Categories section with badge preview

_Onboarding Improvements:_
- ✅ Changed from multi-path to single-path selection
- ✅ Renamed "Personalized Paths" → "Recommended Path"
- ✅ Added username field above email address in step 4

_Login Page Streamlined:_
- ✅ Removed password strength indicator from login
- ✅ Simpler login experience for returning users

**See [CHANGELOG.md](/CHANGELOG.md) for detailed update history.**

---

## Version History

**Current Version**: 1.1 - Full Prototype with Reflection System
- Complete 7-question type system (including reflections)
- Reflection system with admin feedback
- MyReflections page for users
- AdminReflections component for instructors
- Gamification (lives, hints, points, badges)
- Admin panel with full CRUD
- Clay-style UI throughout
- Responsive design
- Profile with avatar upload
- Course browsing and filtering
- Hierarchical learning paths
- Results screen with bonus points
- Leaderboard system

**Last Updated**: November 1, 2025
