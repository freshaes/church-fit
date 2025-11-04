# ChurchAcademy Feature Specifications

Comprehensive feature documentation for all user-facing and administrative functionality.

---

## Table of Contents
1. [Authentication & Onboarding](#authentication--onboarding)
2. [Main Dashboard](#main-dashboard)
3. [Learning Experience](#learning-experience)
4. [Question Types](#question-types)
5. [Gamification System](#gamification-system)
6. [Browse & Discovery](#browse--discovery)
7. [Profile Management](#profile-management)
8. [Leaderboard](#leaderboard)
9. [Admin Panel](#admin-panel)
10. [Navigation](#navigation)

---

## Authentication & Onboarding

### Login Page
**File**: `/components/Login.tsx`

**Features**:
- Email and password input fields
- "Sign In" button with clay styling
- Bypasses actual authentication (prototype)
- Routes to onboarding for first-time users
- Routes to dashboard for returning users

**UI Elements**:
- Large welcome heading
- Subtitle describing platform
- Input fields with rounded borders
- Primary action button (sage green)
- Background: Cream (#FFF8F2)

**User Flow**:
```
Login → Check if new user
  ├─ New User → Onboarding
  └─ Returning User → Dashboard
```

---

### Onboarding
**File**: `/components/Onboarding.tsx`

**Purpose**: Personalize learning experience by collecting role and goals

**Step 1: Role Selection**
- **Prompt**: "What's your role in church leadership?"
- **Options** (with icons):
  - Senior Pastor (Church icon)
  - Youth Minister (Users icon)
  - Worship Leader (Music icon)
  - Admin Team (Briefcase icon)
  - Volunteer Leader (Heart icon)
  - Tech Team (Monitor icon)

**Step 2: Goal Selection**
- **Prompt**: "What leadership skills do you want to develop?"
- **Options** (checkboxes):
  - Lead with Confidence
  - Speak with Clarity
  - Create Team Unity
  - Resolve Conflicts Fast
  - Develop Your People
- Can select multiple goals

**Step 3: Personalization**
- **Fields**:
  - Full Name (text input)
  - Church Name (text input, optional)
- Submit button: "Start Learning Journey"

**UI/UX**:
- Card-based selection with hover states
- Selected state: Sage green background
- Progress indicator (dots at bottom)
- Back/Continue navigation buttons
- Smooth transitions between steps

**Completion**:
- Creates user profile with selected preferences
- Routes to Dashboard
- Uses role/goals for learning path recommendations

---

## Main Dashboard

### Dashboard Overview
**File**: `/components/Dashboard.tsx`

**Layout**:
- Sidebar navigation (left, 320px wide)
- Main content area (cream background)
- Header with user stats
- Card-based content grid

### Header Section

**User Greeting**:
- "Welcome back, [Name]!"
- Subtitle: "Continue your leadership journey"

**Stats Bar** (horizontal badges):
- **XP**: Star icon + total experience points (e.g., "1,250 XP")
- **Lives**: Heart icon + remaining lives (e.g., "3 Lives")
- **Hints**: Lightbulb icon + remaining hints (e.g., "3 Hints")
- **Streak**: Flame icon + consecutive days (e.g., "7 Day Streak")
- **Level**: Trophy icon + current level (e.g., "Level 4")

**Styling**:
- All icons use `#3A4A46` (dark sage) for consistency
- Badges: White background, dark sage border, rounded-xl
- Responsive: Stack on mobile, horizontal on desktop

### Learning Paths Section

**"Your Learning Paths"**:
Grid of learning path cards (1 col mobile, 2-3 cols desktop)

**Card Components**:
- **Thumbnail**: Unsplash image, rounded-2xl
- **Title**: Path name (e.g., "Leadership Fundamentals")
- **Description**: Brief summary (2 lines, truncated)
- **Progress Bar**: Visual completion indicator
- **Stats Row**:
  - Chapter count (BookOpen icon)
  - Estimated duration (Clock icon)
  - Difficulty badge (color-coded)
- **Action Button**: "Continue" or "Start Learning"

**Progress States**:
- Not Started: "Start Learning" button
- In Progress: Progress bar + "Continue" button
- Completed: Checkmark badge + "Review" option

**Interactions**:
- Click card to open learning scenario
- Hover: Slight scale and shadow increase
- Shows locked state if prerequisites not met

### Recommended Paths

**"Recommended for You"**:
Based on selected role and goals during onboarding

**Card Layout**:
- Similar to learning path cards
- "Recommended" badge in top corner
- "Why this?" tooltip showing match reasons
- "Add to My Paths" button

### Recent Activity

**Optional Section**:
- Recent badge earned
- Last completed chapter
- Streak maintenance reminder

---

## Learning Experience

### Learning Scenario
**File**: `/components/LearningScenario.tsx`

**Purpose**: Interactive question flow with game mechanics

### Page Layout

**Header Bar**:
- Back button (returns to Dashboard)
- Lives counter (hearts, red when low)
- Hints counter (lightbulb icon)
- Current question number / total

**Progress Indicator**:
- Linear progress bar showing chapter completion
- Percentage display (e.g., "3 / 8 questions")
- Color: Sage green fill, light background

**Content Area**:
- Max width container (centered)
- Question card with clay styling
- Media display (if image/video present)
- Answer interface (type-dependent)
- Continue button (appears after answering)

### Question Flow

**1. Question Display**:
- Media content first (image or video if present)
- Question text (large, clear)
- Hint button (if hint available)

**2. Answer Input**:
- Type-specific interface (see Question Types section)
- Active selection state highlighting
- Disable options after submission

**3. Feedback Display**:
- Immediate feedback after answer
- Correct: Green border, check icon
- Incorrect: Red border, X icon, lose 1 life
- Show detailed feedback text
- Points earned display

**4. Continue**:
- "Continue" button appears
- Click to advance to next question
- Last question → Results Screen

### Hint System

**Hint Button**:
- Icon: Lightbulb
- Label: "Use Hint (X left)"
- Only visible if question has hint
- Disabled if no hints remaining

**Hint Display**:
- Appears in yellow card above question
- Icon: 💡
- Shows hint text
- Remains visible for rest of question

**Cost**:
- Deducts 1 hint from user's hint bank
- Updates hint counter in header

### Lives System

**Lives Display**:
- Heart icons in header badge
- Color: Red when at 1 life
- Shows count numerically

**Life Loss**:
- Incorrect answer = -1 life
- Heart icon animation (shake, fade out)
- Warning message at 1 life

**Game Over**:
- Triggered at 0 lives
- Shows game over overlay
- Options:
  - Retry chapter (resets lives to 3)
  - Back to Dashboard
- Doesn't save progress

---

## Question Types

### 1. Content Slide
**Type**: `'content'`

**UI**:
- Large title at top
- Body content (multi-line, supports bullets)
- Optional image below text
- Optional video embed
- Single "Continue" button

**Features**:
- No answer required
- Not counted in score
- Used for teaching moments
- Can include rich media

**Example Use**:
- Chapter introductions
- Concept explanations
- Biblical foundations
- Transition slides

---

### 2. Multiple Choice
**Type**: `'multiple-choice'`

**UI**:
- Question text at top
- 3-4 answer options (typically)
- Each option shows:
  - Letter identifier (A, B, C, D)
  - Answer text (bold)
  - Brief explanation (smaller text, shown before selection)

**Interaction**:
1. Click to select option
2. Selected option highlights
3. Show feedback text
4. Display check or X icon
5. "Continue" button appears

**States**:
- **Unselected**: White background, dark sage border
- **Selected (before submission)**: Light sage background
- **Correct**: Green border, green background tint, check icon
- **Incorrect**: Red border, red background tint, X icon

**Scoring**:
- Each option has individual points value
- Correct answer typically 5 points
- Incorrect answers may give 1-3 points (partial credit)

---

### 3. True/False
**Type**: `'true-false'`

**UI**:
- Statement to evaluate
- Two large buttons:
  - "True"
  - "False"

**Interaction**:
1. Click True or False
2. Button highlights
3. Show correct/incorrect state
4. Display appropriate feedback
5. "Continue" button appears

**Feedback**:
- Separate feedback for correct vs. incorrect
- Explains why answer is true or false

**Points**:
- Fixed point value (typically 5)
- All or nothing scoring

---

### 4. Multiple Answer
**Type**: `'multiple-answer'`

**UI**:
- Question with "(Select all that apply)" instruction
- List of options with checkboxes
- Can select multiple options
- "Check Answer" button (appears when ≥1 selected)

**Interaction**:
1. Check multiple boxes
2. Click "Check Answer"
3. Show which selections were correct/incorrect
4. Check marks appear on correct answers
5. X marks on incorrect selections
6. "Continue" button appears

**States**:
- **Correct selected**: Green background, check icon
- **Incorrect selected**: Red background, X icon
- **Correct unselected**: Green outline, check icon (shows what was missed)
- **Incorrect unselected**: No highlight

**Scoring**:
- Must get ALL correct for full points
- Partial credit based on percentage correct
- Penalties for selecting incorrect options

---

### 5. Matching
**Type**: `'matching'`

**UI**:
- Two-column layout (on desktop)
- **Left column**: Items to match (drag sources)
- **Right column**: Match targets (drop zones)
- Color-coded matches (each pair gets unique color)
- Match counter: "3 / 4 matched"
- "Reset All" button

**Interaction**:
1. Drag item from left column
2. Drop onto matching item in right column
3. Match persists with color coding
4. Click X to remove match
5. "Check Answer" button (when all matched)
6. Show correct/incorrect per match
7. Display correct answers overlay

**Touch Support**:
- Works on mobile and desktop
- Touch and drag enabled
- Visual feedback on hover/drag

**Feedback**:
- Shows all correct pairings
- Highlights user's correct matches (green)
- Highlights user's incorrect matches (red)
- Lists out proper matches for reference

**Colors**:
- 6 pre-defined color pairs for visual distinction
- Sage, coral, beige, orange variations

---

### 6. Fill in the Blank
**Type**: `'fill-blank'`

**UI**:
- Sentence with yellow blank boxes (_____)
- Word bank below sentence
- Draggable word tiles
- Multiple blanks possible

**Interaction**:
1. Drag word from bank
2. Drop into blank space
3. Word fills blank, disappears from bank
4. Click X on word to remove and return to bank
5. Rearrange words between blanks
6. "Check Answer" when all filled
7. Show correct/incorrect per blank
8. Display correct answers

**Word Tiles**:
- Rounded rectangles with borders
- Include correct answers + distractors
- Visual feedback while dragging
- Snap into blank spaces

**Feedback**:
- Green blanks for correct words
- Red blanks for incorrect words
- Shows correct words for wrong blanks

**Complexity**:
- Can have 2-4 blanks per sentence
- Each blank has own word options
- All options available in shared word bank

---

## Gamification System

### Points System

**Question Points**:
- Earned based on answer correctness
- Variable per option (1-10 points)
- Typical: 5 points for correct, 2-3 for partial

**Chapter Completion Bonus**:
- **+50 points** when passing chapter (≥70% correct)
- Shows in results screen breakdown

**Path Completion Bonus**:
- **+100 points** when completing final chapter
- Special celebration (confetti, 🎉 emoji)
- Shows in results screen breakdown

**Total XP**:
```
Total = Question Points + Chapter Bonus + Path Bonus
```

**XP Display**:
- Accumulated across all learning
- Shows in dashboard header
- Used for leveling up
- Drives leaderboard rankings

### Star Rating System

**Performance Tiers**:
- **3 Stars**: ≥90% correct (Excellent)
- **2 Stars**: 70-89% correct (Good)
- **1 Star**: <70% correct (Needs work)

**Visual**:
- Gold filled stars for earned
- Gray outline stars for unearned
- Animated entrance (rotate + scale)
- Sparkle effect on 3-star achievement

### Results Screen
**File**: `/components/ResultsScreen.tsx`

**Triggered**: After completing all chapter questions

**Layout**:
- **Trophy/Award Icon**: Large, centered, animated
- **Title**: "Chapter Complete!" or "Keep Trying!"
- **Path & Chapter Name**: Subtitle
- **Star Rating**: 1-3 stars with animation
- **Percentage**: Large display (e.g., "87%")
- **Correct/Incorrect Count**: "7 of 8 correct"
- **Progress Bar**: Visual representation
- **Pass/Fail Badge**: Green (passed) or red (needs 70%)

**Stats Grid** (2 columns):
- Correct answers (green card, check icon)
- Incorrect answers (red card, X icon)

**Points Breakdown** (if passed):
Card showing itemized points:
- Question Points: +35
- Chapter Completion: +50 (green)
- Path Completion: +100 (gold, if final chapter)
- **Total Points**: Large, bold

**Motivational Message**:
Performance-based encouragement:
- 90%+: "Outstanding work! You've mastered this chapter."
- 70-89%: "Great job! You're making excellent progress."
- 50-69%: "Good effort! Review missed questions."
- <50%: "Keep practicing! Learning takes time."

**Action Buttons**:
- **Passed**:
  - Primary: "Continue to Next Chapter" or "Complete Path"
  - Secondary: "Review Missed Questions (X)" (if any wrong)
- **Failed**:
  - Primary: "Retry Incorrect Questions"
  - Secondary: "Back to Dashboard"

**Animations**:
- Confetti on pass (50 colored dots falling)
- Trophy scales and rotates
- Stars appear with spring animation
- Staggered entrances for all elements

**XP Banner** (bottom):
- Icon: TrendingUp
- Text: "+190 XP earned!" (total with bonuses)
- Spring animation entrance

---

### Badge System
**Managed in**: `/components/BadgeManager.tsx`

**Badge Properties**:
- **Name**: Achievement title
- **Description**: What it's for
- **Icon**: Visual representation
- **Rarity**: Common, Rare, Epic, Legendary
- **Criteria**: How to earn (not enforced in prototype)

**Badge Display**:
- Profile page shows earned badges
- Dashboard can show recent badge earned
- Badge modal shows details on click

**Earning Badges** (Admin-Awarded):
- Admin can manually award badges to users
- Shown in user's collection
- Counts toward profile stats

**Rarity Colors**:
- Common: Gray/silver
- Rare: Blue
- Epic: Purple
- Legendary: Gold

---

### Leaderboard
**File**: `/components/Leaderboard.tsx`

**Purpose**: Global XP rankings for all users

**Layout**:
- **Podium Section** (Top 3):
  - 1st place: Center, tallest, gold crown
  - 2nd place: Left, shorter, silver medal
  - 3rd place: Right, shortest, bronze medal
  - Shows avatar, name, XP
  - Elevated cards with special styling

- **Rankings List** (4th+):
  - Table format
  - Columns: Rank, User, XP, Level
  - Current user row highlighted (sage background)
  - Rank badges for visual interest

**Rank Badges**:
- Top 3: Crown/medal icons with colors
- 4-10: Numbered badges
- 11+: Simple rank numbers

**User Row Highlight**:
- Highlighted row for logged-in user
- "You" label
- Sage green background
- Slightly bolder text

**Refresh**:
- Manual refresh button
- Shows last updated time
- Real-time updates (future feature)

**Empty State**:
- "No rankings yet" message
- Encouragement to complete paths

---

## Browse & Discovery

### Browse Courses Page
**File**: `/components/BrowseLessons.tsx`

**Purpose**: Explore all available learning paths

**Layout**:
- Header with title and search
- Filters sidebar (or horizontal on mobile)
- Course grid (responsive columns)

**Search Bar**:
- Icon: Search (magnifying glass)
- Placeholder: "Search courses..."
- Live filtering as you type
- Searches title and description

**Filters**:
- **Role Filter**: Dropdown or checkboxes
  - All Roles
  - Senior Pastor
  - Youth Minister
  - Worship Leader
  - Admin Team
  - Volunteer Leader
  - Tech Team

- **Goal Filter**: Multi-select
  - Lead with Confidence
  - Speak with Clarity
  - Create Team Unity
  - Resolve Conflicts Fast
  - Develop Your People

- **Difficulty**: Buttons or dropdown
  - All Levels
  - Beginner
  - Intermediate
  - Advanced

- **Status** (optional):
  - Not Started
  - In Progress
  - Completed

**Course Cards**:
- Thumbnail image (rounded corners)
- Title
- Description (truncated)
- Difficulty badge
- Duration (e.g., "4 weeks")
- Chapter count
- Progress bar (if started)
- "View Details" or "Start Learning" button

**Grid**:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- Consistent card heights

**Empty State**:
- "No courses match your filters"
- Clear filters button
- Illustration or icon

---

### Course Detail Page
**File**: `/components/CourseDetail.tsx`

**Purpose**: Detailed view of single learning path

**Header Section**:
- Large course title
- Breadcrumb navigation (Home > Browse > Course Name)
- Action buttons:
  - "Start Learning" (primary)
  - "Add to My Paths" (secondary)
  - "Share" icon button

**Hero Section**:
- Large thumbnail image
- Course overview stats:
  - Duration (Clock icon)
  - Chapters (BookOpen icon)
  - Difficulty badge
  - Target roles tags

**"What You'll Learn" Section**:
- Positioned above chapter list
- Bullet list of learning objectives
- Clear, concise goals
- Icons for visual interest

**Chapters Section**:
- Accordion/Collapsible list
- **Chapter Header**:
  - Chapter number and title
  - Question count
  - Completion badge (if completed)
  - Expand/collapse icon

- **Chapter Content** (when expanded):
  - Question list (just counts, not full questions)
  - Estimated time
  - Status: Locked, Available, Completed

**Prerequisites** (if any):
- "Complete X first" message
- Link to prerequisite course

**Progress Indicator**:
- Overall path progress bar
- "X of Y chapters complete"

**Responsive**:
- Stacked on mobile
- Two-column on desktop (info + chapters)

---

## Profile Management

### Profile Page
**File**: `/components/Profile.tsx`

**Purpose**: User settings and achievement display

**Layout**:
- Two-column (desktop) or stacked (mobile)
- Left: User info and settings
- Right: Achievements and stats

### User Info Card

**Avatar Upload**:
- Circular profile picture (128x128px)
- Click to upload (file input)
- Uses `URL.createObjectURL()` for preview
- Saves as base64 data URL locally
- Placeholder: Initials if no avatar

**Editable Fields**:
- Full Name (text input)
- Email (text input)
- Role (dropdown)
- Church Name (text input, optional)

**Save Button**:
- "Save Changes" (primary button)
- Shows "Saved!" confirmation

### Stats Overview

**Grid Display**:
- Total XP (with progress to next level)
- Current Level
- Paths Completed
- Badges Earned
- Current Streak
- Lives Remaining
- Hints Remaining

**Visual Design**:
- Card-based layout
- Icons for each stat (dark sage color)
- Rounded corners, borders, shadows

### Badges Section

**"My Badges"**:
- Grid of earned badges
- Badge card includes:
  - Icon/image
  - Name
  - Rarity indicator
  - Date earned

**Empty State**:
- "No badges yet"
- Motivational message
- Link to learning paths

**Badge Detail Modal**:
- Click badge to see details
- Shows description
- Shows criteria
- Shows date earned

### Goals & Role

**Selected Goals**:
- Shows goals from onboarding
- Editable (can change later)
- Checkbox interface

**Current Role**:
- Dropdown to change role
- Updates recommendations

### Delete Account

**Danger Zone**:
- Red-outlined section at bottom
- "Delete Account" button
- Confirmation dialog before deletion
- Warning about data loss

---

## Admin Panel

### Admin Dashboard
**File**: `/components/AdminDashboard.tsx`

**Access**: Separate navigation item (Admin-only)

**Layout**:
- Tab-based interface
- Three main tabs:
  1. Learning Paths
  2. Users
  3. Badges

**Tab Style**:
- Clay-style tabs with rounded corners
- Active tab highlighted (sage green)
- Smooth tab switching

---

### Tab 1: Learning Paths
**Component**: PathEditor included

**Features**:
- List of all learning paths
- Create new path button
- Edit existing paths
- Delete paths
- Publish/unpublish toggle

**Path List Table**:
Columns:
- Title
- Status (Published/Draft badge)
- Chapters count
- Questions count
- Created date
- Actions (Edit, Delete buttons)

**Create Path**:
- Button opens PathEditorFull
- Modal or full-screen editor

**Edit Path**:
- Opens PathEditorFull with existing data
- All fields editable

**Delete Path**:
- Confirmation dialog
- Warning about removing user progress
- Permanent deletion

---

### Tab 2: Users
**Component**: `/components/UserManager.tsx`

**User List Table**:
Columns:
- Avatar
- Name
- Email
- Role
- XP
- Level
- Joined date
- Actions

**Search & Filter**:
- Search by name/email
- Filter by role
- Sort by XP, level, join date

**User Actions**:
- **Edit**: Click to open edit modal
- **Delete**: Remove user (with confirmation)
- **Award Badge**: Open badge selection dialog

**Edit User Modal**:
Fields:
- Name
- Email
- Role (dropdown)
- Level (number input)
- XP (number input)
- Badges (multi-select)

**Award Badge**:
- Select badge from list
- Adds to user's collection
- Shows confirmation

**Bulk Actions** (future):
- Select multiple users
- Award badge to all
- Export user list

---

### Tab 3: Badges
**Component**: `/components/BadgeManager.tsx`

**Badge List**:
Grid of badge cards showing:
- Icon/image
- Name
- Description
- Rarity
- Times awarded count
- Edit/Delete buttons

**Create New Badge**:
- Form with fields:
  - Name (text input)
  - Description (textarea)
  - Rarity (dropdown: Common, Rare, Epic, Legendary)
  - Icon upload (file input, prototype)
  - Criteria (textarea, informational only)

**Edit Badge**:
- Same form, pre-filled with existing data
- Save changes button

**Delete Badge**:
- Confirmation dialog
- Removes from all users who earned it
- Permanent deletion

**Award to Users**:
- Select badge
- Choose user(s) from list
- Award button
- Confirmation message

---

### Path Editor Full
**File**: `/components/PathEditorFull.tsx`

**Purpose**: Comprehensive path editing interface

**Layout**:
- Sticky header with Save/Cancel
- Scrollable content area
- Card-based sections

### Section 1: Basic Information

**Fields**:
- **Title**: Text input
- **Description**: Textarea (2-3 sentences)
- **Status**: Toggle (Published / Draft)
- **Difficulty**: Dropdown (Beginner, Intermediate, Advanced)
- **Duration**: Text input (e.g., "4 weeks")
- **Thumbnail URL**: Text input (Unsplash URL)

### Section 2: Learning Objectives

**"What You'll Learn"**:
- List of goal statements
- Add/remove goals
- Text input for each goal
- Reorder with drag handles (future)

### Section 3: Target Roles

**Checkboxes**:
- Senior Pastor
- Youth Minister
- Worship Leader
- Admin Team
- Volunteer Leader
- Tech Team

Multiple selections allowed

### Section 4: Target Goals

**Checkboxes**:
- Lead with Confidence
- Speak with Clarity
- Create Team Unity
- Resolve Conflicts Fast
- Develop Your People

Multiple selections allowed

### Section 5: Chapters & Questions

**Chapter Management**:
- **Add Chapter**: Button to create new chapter
- **Chapter Card**: Collapsible card for each chapter
  - Chapter title (editable)
  - Question count
  - Expand/collapse content
  - Delete chapter button

**Question Management** (inside chapter):
- **Add Question**: Dropdown to select question type
- **Question Editor**: Collapsible form for each question
  - Question type badge
  - Question preview text
  - Expand to edit
  - Delete button

**Universal Question Fields**:
- **Media Attachments** (at top):
  - Image URL (text input)
  - Video URL (text input)
- **Question Type**: Dropdown (6 options)
- **Points**: Number input (1-10)

**Type-Specific Fields**:

**Content**:
- Title
- Content (textarea)

**Multiple Choice**:
- Question text
- Hint (optional)
- Options (array):
  - Add/remove options
  - Option text
  - Explanation
  - Feedback
  - Points
  - Correct checkbox

**True/False**:
- Question text
- Hint (optional)
- Correct answer (toggle: True/False)
- Feedback for correct
- Feedback for incorrect

**Multiple Answer**:
- Question text
- Hint (optional)
- Feedback
- Options (array):
  - Option text
  - Correct checkbox

**Matching**:
- Question text
- Hint (optional)
- Feedback
- Left items (textarea, one per line)
- Right items (textarea, one per line)
- Correct matches (auto-paired by position)

**Fill in the Blank**:
- Question text
- Hint (optional)
- Sentence template (with _____ for blanks)
- Feedback
- Blanks (array):
  - Position (auto-numbered)
  - Correct answer
  - Word options (comma-separated)

**Save & Preview**:
- Save changes button (sticky header)
- Preview question (future feature)
- Validation errors displayed

---

## Navigation

### Sidebar Navigation
**File**: `/components/Navigation.tsx`

**Layout**:
- Fixed position (left side, 320px wide)
- White background
- Scrollable content
- Sticky logout button at bottom

**Logo/Header**:
- "ChurchAcademy" title
- Optional logo icon
- User greeting ("Hi, [Name]!")

**Navigation Links**:
- **Dashboard** (Home icon)
- **Browse Courses** (BookOpen icon)
- **My Profile** (User icon)
- **Leaderboard** (Trophy icon)
- **Admin** (Shield icon, admin only)

**Link Styling**:
- Rounded rectangles
- Hover: Light sage background
- Active: Sage green background, white text
- Icon + text label
- Smooth transitions

**User Stats Section**:
- Compact version of header stats
- Lives, hints, streak mini-display

**Logout Button** (bottom):
- Sticky position at bottom
- Red text and border
- "Sign Out" text + LogOut icon
- Confirmation dialog

**Mobile**:
- Hidden by default
- Hamburger menu to open
- Overlay on top of content
- Slide-in animation

---

## Common UI Patterns

### Empty States

**No Content**:
- Centered icon (relevant to context)
- Headline (e.g., "No learning paths yet")
- Subtext explaining why empty
- Call-to-action button

**Example**:
```
[Icon: BookOpen]
No Learning Paths Yet
Start your leadership journey by browsing available courses.
[Browse Courses Button]
```

### Loading States

**Skeleton Screens**:
- Use Skeleton component from UI library
- Match shape of actual content
- Pulse animation
- Replace with real content when loaded

**Spinners**:
- For actions (button loading)
- Centered for full-page loads
- Sage green color

### Error States

**Error Messages**:
- Red border alert card
- Error icon (AlertCircle)
- Clear error message
- Action button (Retry, Go Back)

### Confirmation Dialogs

**Delete Confirmations**:
- Modal dialog
- Warning icon
- Clear warning message
- Two buttons:
  - Cancel (secondary, default)
  - Confirm Delete (danger, red)

**Success Confirmations**:
- Toast notification (Sonner)
- Green checkmark icon
- Brief success message
- Auto-dismiss after 3 seconds

---

## Data Persistence

**Current State**: Prototype (no backend)

**Local Storage**:
- User data stored in component state
- Lost on page refresh
- Sufficient for prototype demonstration

**Future Implementation** (Supabase):
- User authentication
- Learning progress tracking
- Leaderboard data
- Admin-created content
- Real-time updates

---

## Future Features (Not in Current Prototype)

### Planned Enhancements:
- **Social Features**: Share achievements, friend leaderboards
- **Discussion Forums**: Community Q&A per learning path
- **Video Content**: Embedded teaching videos in content slides
- **Certificates**: Downloadable completion certificates
- **Mobile App**: React Native version
- **Offline Mode**: Download paths for offline learning
- **Notifications**: Reminders, achievements, streak warnings
- **Analytics**: Admin dashboard with usage stats
- **Multi-language**: Internationalization support
- **Accessibility**: Enhanced screen reader support, high contrast mode
- **API Integration**: Connect to church management systems
- **Custom Branding**: White-label option for churches
- **Content Marketplace**: Share/sell learning paths between churches

---

## Version Notes

**Current Version**: 1.0 (Full Prototype)
- All 6 question types implemented
- Complete gamification system
- Full admin panel with CRUD operations
- Clay-style UI throughout
- Responsive design
- Profile management with avatar upload
- Course browsing and filtering
- Hierarchical learning paths
- Results screen with bonus points
- Leaderboard system

**Last Updated**: January 2025

---

## Support

For questions or feature requests, refer to:
- **Guidelines.md** - Development standards
- **Clay-Style-Guide.md** - Design system
- Code comments in individual component files
