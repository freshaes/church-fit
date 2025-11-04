# ChurchAcademy Page Documentation

Complete page-by-page breakdown of purposes, interactions, and content areas.

---

## Table of Contents
1. [Page Inventory](#page-inventory)
2. [Login Page](#login-page)
3. [Logout Screen](#logout-screen)
4. [Onboarding Flow](#onboarding-flow)
5. [Dashboard](#dashboard)
6. [Learning Scenario](#learning-scenario)
7. [Results Screen](#results-screen)
8. [Browse Courses](#browse-courses)
9. [Course Detail](#course-detail)
10. [Profile](#profile)
11. [Leaderboard](#leaderboard)
12. [Admin Dashboard](#admin-dashboard)
13. [Navigation Sidebar](#navigation-sidebar)

---

## Page Inventory

| Page | File | Purpose | Access |
|------|------|---------|--------|
| Login | `Login.tsx` | Authenticate users and route to appropriate starting point | Public |
| Logout Screen | `LogoutScreen.tsx` | Friendly farewell with encouragement and re-login option | After logout |
| Onboarding | `Onboarding.tsx` | Collect user role and goals for personalization | First-time users |
| Dashboard | `Dashboard.tsx` | Central hub for learning progress and navigation | Authenticated users |
| Learning Scenario | `LearningScenario.tsx` | Interactive question-based learning experience | From Dashboard/Browse |
| Results Screen | `ResultsScreen.tsx` | Chapter completion feedback and scoring | After Learning Scenario |
| Browse Courses | `BrowseLessons.tsx` | Discover and filter available learning paths | From Navigation |
| Course Detail | `CourseDetail.tsx` | Detailed view of a single learning path | From Browse/Dashboard |
| Profile | `Profile.tsx` | User settings, stats, and badge collection | From Navigation |
| Leaderboard | `Leaderboard.tsx` | Global XP rankings and competition | From Navigation |
| Admin Dashboard | `AdminDashboard.tsx` | Content and user management (admin only) | From Navigation (admin) |
| Navigation | `Navigation.tsx` | Sidebar navigation across all pages | Authenticated users |

---

## Login Page

**File**: `/components/Login.tsx`

### Page Purpose
First touchpoint for users. Authenticates (in prototype: bypasses) and routes to appropriate entry point based on user status.

### Layout Structure

```
┌─────────────────────────────────────┐
│         [ChurchAcademy Logo]        │
│                                     │
│    Welcome to ChurchAcademy         │
│    Develop leadership skills        │
│                                     │
│    ┌─────────────────────┐        │
│    │ Email Input         │        │
│    └─────────────────────┘        │
│                                     │
│    ┌─────────────────────┐        │
│    │ Password Input      │        │
│    └─────────────────────┘        │
│                                     │
│    ┌─────────────────────┐        │
│    │  [Sign In Button]   │        │
│    └─────────────────────┘        │
└─────────────────────────────────────┘
```

### Interactive Elements

**Email Input Field**
- **Purpose**: Collect user email address
- **Type**: Text input (email type)
- **Validation**: Email format (in production)
- **State**: Empty → Typing → Filled
- **Clay Styling**: Rounded-2xl, thick border, white background

**Password Input Field**
- **Purpose**: Collect user password
- **Type**: Password input (masked)
- **Validation**: Required field (in production)
- **State**: Empty → Typing → Filled
- **Clay Styling**: Rounded-2xl, thick border, white background

**Sign In Button**
- **Purpose**: Submit credentials and authenticate
- **Action**: Routes to Onboarding (new) or Dashboard (returning)
- **State**: Default → Hover → Pressed → Loading
- **Clay Styling**: Sage green, rounded-2xl, thick border, shadow with press effect
- **Label**: "Sign In"

### Content Areas

**Header Section**
- **Logo/Title**: "ChurchAcademy" - Brand identity
- **Tagline**: "Develop leadership skills for effective ministry" - Value proposition

**Form Container**
- **Purpose**: Group authentication inputs
- **Styling**: Card with rounded-3xl, white background, soft shadow

**Background**
- **Purpose**: Create warm, welcoming atmosphere
- **Color**: Cream (#FFF8F2)
- **Pattern**: Optional subtle texture or gradient

### User Flow
```
Enter email → Enter password → Click Sign In →
  ├─ New user → Onboarding
  └─ Returning user → Dashboard
```

---

## Onboarding Flow

**File**: `/components/Onboarding.tsx`

### Page Purpose
Personalize user experience by collecting role and learning goals. Creates foundation for course recommendations and customized content.

### Layout Structure (Step 1: Role Selection)

```
┌─────────────────────────────────────┐
│  What's your role in church         │
│  leadership?                        │
│                                     │
│  ┌───────────┐  ┌───────────┐     │
│  │ [Church]  │  │ [Users]   │     │
│  │ Senior    │  │ Youth     │     │
│  │ Pastor    │  │ Minister  │     │
│  └───────────┘  └───────────┘     │
│                                     │
│  ┌───────────┐  ┌───────────┐     │
│  │ [Music]   │  │ [Briefcase]│     │
│  │ Worship   │  │ Admin     │     │
│  │ Leader    │  │ Team      │     │
│  └───────────┘  └───────────┘     │
│                                     │
│  ● ○ ○              [Continue →]   │
└─────────────────────────────────────┘
```

### Step 1: Role Selection

**Question Header**
- **Purpose**: Clearly state the question being asked
- **Text**: "What's your role in church leadership?"
- **Styling**: Large heading, dark sage color

**Role Selection Cards** (6 cards)
- **Purpose**: Allow user to select their primary church role
- **Options**:
  1. Senior Pastor (Church icon)
  2. Youth Minister (Users icon)
  3. Worship Leader (Music icon)
  4. Admin Team (Briefcase icon)
  5. Volunteer Leader (Heart icon)
  6. Tech Team (Monitor icon)
- **Interaction**: Click to select (single selection)
- **States**:
  - Unselected: White background, dark sage border
  - Hover: Light sage background
  - Selected: Sage green background, white text, thick border
- **Layout**: 2 columns on mobile, 3 on desktop
- **Clay Styling**: Rounded-2xl, thick borders, shadow with press effect

**Progress Dots**
- **Purpose**: Show current step in 3-step process
- **Display**: ● ○ ○ (filled = current, hollow = upcoming)
- **Position**: Bottom left

**Continue Button**
- **Purpose**: Advance to next step
- **Label**: "Continue →"
- **State**: Disabled until role selected
- **Position**: Bottom right
- **Clay Styling**: Sage green, rounded-2xl, press effect

### Step 2: Goal Selection

```
┌─────────────────────────────────────┐
│  What leadership skills do you want │
│  to develop?                        │
│                                     │
│  ☐ Lead with Confidence            │
│  ☐ Speak with Clarity              │
│  ☐ Create Team Unity               │
│  ☐ Resolve Conflicts Fast          │
│  ☐ Develop Your People             │
│                                     │
│  [← Back]    ○ ● ○    [Continue →] │
└─────────────────────────────────────┘
```

**Question Header**
- **Purpose**: State the question
- **Text**: "What leadership skills do you want to develop?"

**Goal Checkboxes** (5 options)
- **Purpose**: Allow multiple goal selection for personalized recommendations
- **Options**:
  1. Lead with Confidence
  2. Speak with Clarity
  3. Create Team Unity
  4. Resolve Conflicts Fast
  5. Develop Your People
- **Interaction**: Click to toggle (multiple selection allowed)
- **States**:
  - Unchecked: White background, empty checkbox
  - Checked: Sage green checkmark, light sage background
- **Layout**: Stacked vertically, full width
- **Clay Styling**: Rounded checkbox, thick border

**Back Button**
- **Purpose**: Return to previous step
- **Label**: "← Back"
- **Position**: Bottom left
- **Clay Styling**: Outline style, rounded-2xl

**Continue Button**
- **Purpose**: Advance to final step
- **Label**: "Continue →"
- **State**: Disabled until at least 1 goal selected
- **Position**: Bottom right

### Step 3: Personalization

```
┌─────────────────────────────────────┐
│  Tell us about yourself             │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ Full Name                    │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─────────────────────────────┐  │
│  │ Church Name (optional)       │  │
│  └─────────────────────────────┘  │
│                                     │
│  [← Back]    ○ ○ ●                │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Start Learning Journey →      │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Header**
- **Purpose**: Introduce final step
- **Text**: "Tell us about yourself"

**Name Input**
- **Purpose**: Collect user's full name
- **Label**: "Full Name"
- **Required**: Yes
- **Clay Styling**: Rounded-2xl, thick border

**Church Name Input**
- **Purpose**: Optional organizational context
- **Label**: "Church Name (optional)"
- **Required**: No
- **Clay Styling**: Rounded-2xl, thick border

**Back Button**
- **Purpose**: Return to goal selection
- **Label**: "← Back"
- **Position**: Bottom left

**Submit Button**
- **Purpose**: Complete onboarding and enter application
- **Label**: "Start Learning Journey →"
- **Action**: Create user profile, navigate to Dashboard
- **State**: Disabled until name entered
- **Position**: Bottom, full width
- **Clay Styling**: Primary sage green, large, prominent

### User Flow
```
Step 1: Select Role → Continue →
Step 2: Select Goals (1+) → Continue →
Step 3: Enter Name + Church (opt) → Start Learning Journey →
Dashboard
```

---

## Dashboard

**File**: `/components/Dashboard.tsx`

### Page Purpose
Central hub for users. Shows learning progress, provides quick access to continue learning, displays recommendations, and surfaces key stats and achievements.

### Layout Structure

```
┌───────────────────────────────────────────────────────┐
│ Welcome back, John!                                   │
│ Continue your leadership journey                      │
│                                                       │
│ [★ XP] [♥ Lives] [💡 Hints] [🔥 Streak] [🏆 Level] │
├───────────────────────────────────────────────────────┤
│ Continue Learning                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ [Path 1] │ │ [Path 2] │ │ [Path 3] │            │
│ │ 60% ▓▓▓░ │ │ 20% ▓░░░ │ │  0% ░░░░ │            │
│ └──────────┘ └──────────┘ └──────────┘            │
│                                                       │
│ Recommended for You                                   │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ [Rec 1]  │ │ [Rec 2]  │ │ [Rec 3]  │            │
│ └──────────┘ └──────────┘ └──────────┘            │
└───────────────────────────────────────────────────────┘
```

### Content Sections

#### 1. Header Section

**Greeting Message**
- **Purpose**: Personalize experience and welcome user
- **Text**: "Welcome back, [User Name]!"
- **Styling**: Large heading
- **Dynamic**: Uses user's name from profile

**Subtitle**
- **Purpose**: Motivational message
- **Text**: "Continue your leadership journey"
- **Styling**: Muted text color

#### 2. Stats Bar

**XP Badge**
- **Purpose**: Show total experience points earned
- **Icon**: Star (⭐)
- **Display**: "1,250 XP"
- **Icon Color**: `#3A4A46` (dark sage - consistent across all stats)
- **Interaction**: Non-interactive display
- **Tooltip**: "Experience Points - Earn by completing lessons"

**Lives Badge**
- **Purpose**: Show remaining lives for current session
- **Icon**: Heart (♥)
- **Display**: "3 Lives"
- **Icon Color**: `#3A4A46` (dark sage)
- **State**: Red warning when at 1 life
- **Interaction**: Non-interactive display
- **Tooltip**: "Lives - Lost when answering incorrectly"

**Hints Badge**
- **Purpose**: Show remaining hints for current session
- **Icon**: Lightbulb (💡)
- **Display**: "3 Hints"
- **Icon Color**: `#3A4A46` (dark sage)
- **Interaction**: Non-interactive display
- **Tooltip**: "Hints - Use during questions for help"

**Streak Badge**
- **Purpose**: Motivate daily usage
- **Icon**: Flame (🔥)
- **Display**: "7 Day Streak"
- **Icon Color**: `#3A4A46` (dark sage)
- **Interaction**: Non-interactive display
- **Tooltip**: "Current learning streak"

**Level Badge**
- **Purpose**: Show progression through leveling system
- **Icon**: Trophy (🏆)
- **Display**: "Level 4"
- **Icon Color**: `#3A4A46` (dark sage)
- **Interaction**: Non-interactive display
- **Tooltip**: "Your current level"

**Badge Container Styling**
- **Layout**: Horizontal flex row with gap
- **Responsive**: Wrap on mobile, stack if needed
- **Each Badge**: White background, rounded-xl, thick border, shadow
- **Consistency**: ALL icons use same color (#3A4A46)

#### 3. Continue Learning Section

**Section Header**
- **Purpose**: Label for in-progress learning paths
- **Text**: "Continue Learning"
- **Styling**: Section heading

**Learning Path Cards** (1-3 displayed)
- **Purpose**: Quick access to resume learning
- **Display**: Only shows paths with progress > 0%
- **Layout**: Grid (1 col mobile, 2-3 desktop)

**Path Card Components**:

**Thumbnail**
- **Purpose**: Visual identification of path
- **Source**: Unsplash image
- **Styling**: Rounded-2xl, top of card
- **Aspect Ratio**: 16:9 or 4:3

**Title**
- **Purpose**: Path name
- **Example**: "Leadership Fundamentals"
- **Styling**: Bold heading

**Description**
- **Purpose**: Brief path overview
- **Length**: 2 lines, truncated with ellipsis
- **Styling**: Muted text

**Progress Bar**
- **Purpose**: Visual progress indicator
- **Display**: Percentage (e.g., "60%") + filled bar
- **Color**: Sage green fill, light gray background
- **Styling**: Rounded, thick border
- **Position**: Below description

**Stats Row**
- **Purpose**: Quick path information
- **Display**: 
  - Chapter count (📖 icon)
  - Duration (⏱️ icon)
  - Difficulty badge (color-coded)
- **Icons**: All use `#3A4A46` (dark sage)
- **Layout**: Horizontal, space-between

**Continue Button**
- **Purpose**: Resume learning from last position
- **Label**: "Continue" or "Resume Chapter X"
- **Action**: Opens LearningScenario at last question
- **Styling**: Primary sage green, rounded-2xl, full width
- **State**: Hover → scale slightly, press → translate down

**Empty State** (if no in-progress paths)
- **Display**: "No learning paths in progress"
- **Action Button**: "Browse Courses" → navigates to Browse page
- **Icon**: BookOpen icon
- **Styling**: Centered, muted colors

#### 4. Recommended for You Section

**Section Header**
- **Purpose**: Label for personalized recommendations
- **Text**: "Recommended for You"
- **Subtext**: "Based on your role and goals"
- **Styling**: Section heading

**Recommendation Cards** (3 displayed)
- **Purpose**: Suggest relevant learning paths user hasn't started
- **Criteria**: Matches user's role and/or selected goals
- **Layout**: Grid (1 col mobile, 3 desktop)

**Recommendation Badge**
- **Purpose**: Highlight personalized nature
- **Text**: "Based on your role"
- **Position**: Top corner of card
- **Styling**: Small badge, sage green background

**Card Components** (similar to Continue Learning):
- Thumbnail
- Title
- Description
- Duration
- Difficulty
- Target roles tags
- "Start Learning" button

**Start Learning Button**
- **Purpose**: Begin a new learning path
- **Label**: "Start Learning"
- **Action**: Opens LearningScenario at Chapter 1, Question 1
- **Styling**: Primary sage green, rounded-2xl, full width

**View All Link**
- **Purpose**: Navigate to full Browse page
- **Text**: "View All Courses →"
- **Position**: Bottom right of section
- **Action**: Navigate to Browse Courses page
- **Styling**: Text link, sage green, underline on hover

### User Flows

**Primary Flow: Continue Existing Path**
```
Dashboard → Click "Continue" on Path Card →
LearningScenario (resume at last question) →
Complete questions → ResultsScreen →
Dashboard (progress updated)
```

**Secondary Flow: Start New Path**
```
Dashboard → Click "Start Learning" on Recommendation Card →
LearningScenario (Chapter 1, Question 1) →
Complete questions → ResultsScreen →
Dashboard (new path added to Continue Learning)
```

**Tertiary Flow: Browse More**
```
Dashboard → Click "View All Courses" →
Browse Courses page
```

---

## Learning Scenario

**File**: `/components/LearningScenario.tsx`

### Page Purpose
Core learning experience. Presents questions interactively, manages game mechanics (lives, hints), provides immediate feedback, and tracks progress through chapter.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ [← Back]          [♥ 3] [💡 3]    Progress: 3/8    │
├─────────────────────────────────────────────────────┤
│                                                     │
│                   [Media Content]                   │
│                   (Image or Video)                  │
│                                                     │
│   Question Text Here?                               │
│                                                     │
│   [💡 Use Hint (3 left)]                          │
│                                                     │
│   ┌──────────────────────────────────────┐        │
│   │ A. Answer Option 1                   │        │
│   │    Brief explanation                 │        │
│   └──────────────────────────────────────┘        │
│   ┌──────────────────────────────────────┐        │
│   │ B. Answer Option 2                   │        │
│   │    Brief explanation                 │        │
│   └──────────────────────────────────────┘        │
│   ┌──────────────────────────────────────┐        │
│   │ C. Answer Option 3                   │        │
│   │    Brief explanation                 │        │
│   └──────────────────────────────────────┘        │
│                                                     │
│   [Feedback Display]                                │
│                                                     │
│   ┌────────────────────────────┐                  │
│   │     [Continue →]           │                  │
│   └────────────────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### Header Bar

**Back Button**
- **Purpose**: Exit learning scenario and return to previous page
- **Label**: "← Back" or "← Dashboard"
- **Action**: Confirms exit (shows dialog if progress will be lost)
- **Position**: Top left
- **Styling**: Ghost button, dark sage text

**Lives Counter**
- **Purpose**: Display remaining lives
- **Icon**: Heart (♥)
- **Display**: "3 Lives" (number dynamic)
- **Icon Color**: `#3A4A46` (dark sage)
- **State Changes**:
  - 3 lives: Normal display
  - 2 lives: Warning color
  - 1 life: Red badge, attention state
  - 0 lives: Game over overlay
- **Position**: Top center-right

**Hints Counter**
- **Purpose**: Display remaining hints
- **Icon**: Lightbulb (💡)
- **Display**: "3 Hints" (number dynamic)
- **Icon Color**: `#3A4A46` (dark sage)
- **State**: Grayed out when 0 remaining
- **Position**: Top center-right (next to lives)

**Progress Indicator**
- **Purpose**: Show current position in chapter
- **Display**: "3 / 8" (current / total)
- **Position**: Top right
- **Styling**: Muted text

**Progress Bar**
- **Purpose**: Visual progress through chapter
- **Display**: Filled bar showing percentage complete
- **Color**: Sage green fill
- **Position**: Below header, full width
- **Styling**: Thin, rounded

#### Media Content Area

**Image Display** (if imageUrl present)
- **Purpose**: Provide visual context for question
- **Display**: Full-width responsive image
- **Styling**: Rounded-2xl, border, shadow
- **Position**: Above question text
- **Component**: Uses ImageWithFallback

**Video Player** (if videoUrl present)
- **Purpose**: Provide video context for question
- **Display**: Embedded video player with controls
- **Styling**: Rounded-2xl, border
- **Position**: Above question text
- **Controls**: Play, pause, volume, fullscreen

#### Question Area

**Question Text**
- **Purpose**: Present the question to be answered
- **Display**: Large, clear text
- **Styling**: Dark sage color, readable font size
- **Position**: Below media, above answer options

**Hint Button** (if hint available)
- **Purpose**: Reveal helpful clue
- **Label**: "💡 Use Hint (X left)"
- **Action**: 
  - Deducts 1 hint
  - Shows hint in yellow card
  - Disables button
- **State**: Disabled when no hints remain or hint already shown
- **Position**: Below question text
- **Styling**: Outline button, rounded-xl

**Hint Display** (after clicking hint button)
- **Purpose**: Show helpful clue
- **Display**: Yellow card with lightbulb icon
- **Text**: Hint content
- **Position**: Below hint button
- **Styling**: Yellow background, dark text, rounded-xl, border

#### Answer Interface (varies by question type)

**Multiple Choice Options** (example shown above)
- **Purpose**: Present answer choices
- **Count**: 3-4 options typically
- **Layout**: Vertical stack, full width

**Option Card Components**:
- **Letter Identifier**: A, B, C, D in rounded badge
- **Answer Text**: Main choice text (bold)
- **Explanation**: Supporting rationale (smaller text)
- **States**:
  - Unselected: White background, dark sage border
  - Hover: Light sage background
  - Selected (before feedback): Light sage background
  - Correct: Green border, green tint, check icon
  - Incorrect: Red border, red tint, X icon
- **Interaction**: Click to select (disables after selection)
- **Styling**: Rounded-2xl, thick border, shadow with press effect

**Option Click Flow**:
```
Click option →
Highlight selected →
Check answer →
Show correct/incorrect state →
Display feedback →
Update lives (if incorrect) →
Enable Continue button
```

**Other Question Types**:
- True/False: Two large buttons
- Multiple Answer: Checkboxes with Submit button
- Matching: Drag-and-drop interface
- Fill in Blank: Drag words to blanks
- Content: No options, just Continue button

#### Feedback Area

**Feedback Card** (appears after answering)
- **Purpose**: Explain why answer is correct/incorrect
- **Display**: Card below selected answer
- **Content**: Option's feedback text
- **Styling**: 
  - Correct: Light green background
  - Incorrect: Light red background
- **Animation**: Slide in from bottom

**Points Earned**
- **Purpose**: Show points awarded for this question
- **Display**: "+5 points" badge
- **Position**: Next to feedback
- **Styling**: Sage green badge
- **Animation**: Scale pop-in

#### Continue Button

**Purpose**: Advance to next question
- **Label**: "Continue →" or "Next Question →"
- **Action**: 
  - Loads next question
  - Resets answer interface
  - Updates progress
- **State**: Hidden until answer submitted, enabled after feedback shown
- **Position**: Bottom of question area, full width
- **Styling**: Primary sage green, large, rounded-2xl, press effect
- **Final Question**: Label changes to "See Results →"

### Special States

**Game Over Overlay** (0 lives)
- **Purpose**: Handle loss condition
- **Display**: Modal overlay covering page
- **Icon**: Broken heart or sad face
- **Message**: "Out of Lives!"
- **Explanation**: "You've lost all lives. Don't worry, you can try again!"
- **Actions**:
  - "Retry Chapter" button (resets to first question, restores 3 lives)
  - "Back to Dashboard" button (exits scenario)
- **Styling**: Dark overlay, centered card, sad but encouraging tone

**Loading State**
- **Purpose**: Show while question data loads
- **Display**: Skeleton UI matching question layout
- **Animation**: Pulse effect

**Error State**
- **Purpose**: Handle failed data loading
- **Display**: Error message with retry option
- **Icon**: AlertCircle
- **Message**: "Couldn't load question"
- **Action**: "Try Again" button

### User Flow

**Standard Question Flow**:
```
View question (with optional media) →
[Optional: Click hint button → View hint] →
Select/input answer →
View feedback and points →
Click Continue →
Next question (or Results Screen if last)
```

**Game Over Flow**:
```
Answer incorrectly → Lose life →
[If 0 lives] → Game Over overlay →
  ├─ Retry → Reset to question 1 with 3 lives
  └─ Exit → Return to Dashboard
```

---

## Results Screen

**File**: `/components/ResultsScreen.tsx`

### Page Purpose
Celebrate completion, provide detailed feedback on performance, show points breakdown with bonuses, offer next steps based on pass/fail status.

### Layout Structure (Passed)

```
┌─────────────────────────────────────────────────────┐
│            [Confetti Animation]                     │
│                                                     │
│                  [Trophy Icon]                      │
│                                                     │
│              Chapter Complete!                      │
│          Leadership Fundamentals •                  │
│          Introduction to Leadership                 │
│                                                     │
│            ⭐ ⭐ ⭐                                  │
│                                                     │
│                  87%                                │
│              7 of 8 correct                         │
│          ▓▓▓▓▓▓▓▓▓░░░░░░                         │
│           ✓ Passed - 70% required                  │
│                                                     │
│   ┌──────────┐  ┌──────────┐                      │
│   │ ✓ 7      │  │ ✗ 1      │                      │
│   │ Correct  │  │ Incorrect│                      │
│   └──────────┘  └──────────┘                      │
│                                                     │
│          Points Earned                              │
│   ┌────────────────────────────┐                  │
│   │ Question Points:      +35  │                  │
│   │ Chapter Completion:   +50  │                  │
│   │ Total Points:         85   │                  │
│   └────────────────────────────┘                  │
│                                                     │
│   Great job! You're making excellent progress.     │
│                                                     │
│   ┌────────────────────────────┐                  │
│   │  Continue to Next Chapter →│                  │
│   └────────────────────────────┘                  │
│   ┌────────────────────────────┐                  │
│   │  Review Missed Questions   │                  │
│   └────────────────────────────┘                  │
│                                                     │
│            +85 XP earned! ↗                        │
└─────────────────────────────────────────────────────┘
```

### Content Areas

#### 1. Confetti Animation (if passed)

**Purpose**: Celebrate success
- **Display**: 50 colored dots falling from top
- **Colors**: Sage, coral, beige, cream variations
- **Duration**: 3 seconds
- **Animation**: Random positions, rotations, speeds
- **Trigger**: Only shows if passed (≥70%)

#### 2. Achievement Icon

**Trophy Icon** (passed)
- **Purpose**: Visual celebration
- **Icon**: Trophy (🏆)
- **Color**: Gold (#F4A460)
- **Size**: Large (96px)
- **Animation**: Scale in with spring effect
- **Additional**: Sparkle animation if 3 stars

**Award Icon** (failed)
- **Purpose**: Participation acknowledgment
- **Icon**: Award/Medal
- **Color**: Gray/muted
- **Size**: Large (96px)
- **Animation**: Scale in

#### 3. Title Section

**Primary Heading**
- **Purpose**: State outcome
- **Text**: "Chapter Complete!" (passed) or "Keep Trying!" (failed)
- **Styling**: Large heading, dark sage
- **Animation**: Fade in with slide up

**Path & Chapter Name**
- **Purpose**: Identify completed content
- **Format**: "[Path Title] • [Chapter Title]"
- **Example**: "Leadership Fundamentals • Introduction to Leadership"
- **Styling**: Muted text, smaller
- **Animation**: Fade in

#### 4. Star Rating

**Star Display**
- **Purpose**: Visual performance indicator
- **Count**: 3 stars total
- **Filled Based on Score**:
  - 90%+: ⭐⭐⭐ (3 stars, gold)
  - 70-89%: ⭐⭐☆ (2 stars, gold)
  - <70%: ⭐☆☆ (1 star, gold)
- **Styling**: Large stars, gold fill or gray outline
- **Animation**: Each star rotates in with stagger effect

#### 5. Score Display

**Percentage**
- **Purpose**: Primary score metric
- **Display**: Large number (e.g., "87%")
- **Size**: 6xl font
- **Animation**: Count up from 0

**Fraction Display**
- **Purpose**: Show correct vs total
- **Format**: "7 of 8 correct"
- **Position**: Below percentage
- **Styling**: Muted text

**Progress Bar**
- **Purpose**: Visual score representation
- **Display**: Filled bar matching percentage
- **Color**: Sage green fill, light gray background
- **Styling**: Rounded, thick
- **Animation**: Fill from left to right

**Pass/Fail Badge**
- **Purpose**: Clear pass/fail indication
- **Text**: 
  - Passed: "✓ Passed - 70% required"
  - Failed: "✗ 70% needed to continue"
- **Styling**:
  - Passed: Green background, green border
  - Failed: Red background, red border
- **Position**: Below progress bar

#### 6. Stats Grid

**Correct Card**
- **Purpose**: Show number of correct answers
- **Icon**: CheckCircle (✓)
- **Display**: Large number + "Correct"
- **Styling**: Green background tint, green border, rounded-2xl
- **Position**: Left side of 2-column grid

**Incorrect Card**
- **Purpose**: Show number of incorrect answers
- **Icon**: AlertCircle (✗)
- **Display**: Large number + "Incorrect"
- **Styling**: Red background tint, red border, rounded-2xl
- **Position**: Right side of 2-column grid

#### 7. Points Breakdown (if passed)

**Points Card**
- **Purpose**: Itemize points earned
- **Display**: Card with breakdown list
- **Styling**: Beige background, thick border, rounded-2xl

**Breakdown Items**:

**Question Points Row**
- **Label**: "Question Points:"
- **Value**: "+35" (sum of all question points)
- **Styling**: Regular text

**Chapter Bonus Row** (if passed)
- **Label**: "Chapter Completion:"
- **Value**: "+50"
- **Color**: Green text
- **Condition**: Only shows if ≥70% correct

**Path Bonus Row** (if final chapter and passed)
- **Label**: "🎉 Path Completion:"
- **Value**: "+100"
- **Color**: Gold text
- **Condition**: Only shows on last chapter if passed

**Total Row**
- **Label**: "Total Points:"
- **Value**: Sum of above (e.g., "85")
- **Styling**: Bold, larger text, dark sage, border above
- **Position**: Bottom of breakdown, visually separated

**Animation**: Fade in with slide up, appears after stats

#### 8. Motivational Message

**Purpose**: Encourage user based on performance

**Message Card**
- **Styling**: Sage green background tint, thick border, rounded-2xl
- **Position**: Below points breakdown or stats

**Message Text** (varies by score):
- **90%+**: "Outstanding work! You've mastered this chapter."
- **70-89%**: "Great job! You're making excellent progress."
- **50-69%**: "Good effort! Review the missed questions to strengthen your understanding."
- **<50%**: "Keep practicing! Learning takes time and repetition."

**Animation**: Fade in with slide up

#### 9. Action Buttons

**If Passed (≥70%)**:

**Continue Button** (primary)
- **Purpose**: Advance to next chapter or complete path
- **Label**: 
  - Not final chapter: "Continue to Next Chapter →"
  - Final chapter: "Complete Path 🎉"
- **Action**: 
  - Not final: Loads next chapter's first question
  - Final: Returns to Dashboard with completion celebration
- **Styling**: Primary sage green, large, full width, rounded-2xl
- **Position**: First button

**Review Missed Button** (secondary, conditional)
- **Purpose**: Let user review incorrect answers
- **Label**: "Review Missed Questions (X)"
- **Condition**: Only shows if questionsWrong > 0
- **Action**: Returns to LearningScenario showing only incorrect questions
- **Styling**: Outline style, full width, rounded-2xl
- **Position**: Below Continue button

**If Failed (<70%)**:

**Retry Button** (primary)
- **Purpose**: Attempt chapter again
- **Label**: "Retry Incorrect Questions"
- **Action**: Returns to LearningScenario showing only incorrect questions
- **Styling**: Primary sage green, large, full width, rounded-2xl
- **Position**: First button

**Exit Button** (secondary)
- **Purpose**: Return without retrying
- **Label**: "Back to Dashboard"
- **Action**: Navigate to Dashboard
- **Styling**: Outline style, full width, rounded-2xl
- **Position**: Below Retry button

**Button Animation**: Fade in with slide up, staggered

#### 10. XP Banner (if passed)

**Purpose**: Celebrate total XP earned
- **Icon**: TrendingUp (↗)
- **Display**: "+85 XP earned!"
- **Value**: Shows totalScore (questions + bonuses)
- **Color**: Sage green
- **Position**: Bottom of screen, centered
- **Styling**: Bold text, icon + text
- **Animation**: Scale pop-in with spring effect, appears last

### User Flows

**Passed Flow**:
```
Complete chapter questions →
ResultsScreen (shows passed state) →
View points breakdown →
  ├─ Click Continue → Next chapter or Dashboard
  └─ Click Review (if wrong answers) → Review mode
```

**Failed Flow**:
```
Complete chapter questions →
ResultsScreen (shows failed state) →
View performance feedback →
  ├─ Click Retry → Review incorrect questions
  └─ Click Back → Return to Dashboard
```

**Final Chapter Passed Flow**:
```
Complete final chapter →
ResultsScreen (shows passed + path bonus) →
View full breakdown with +100 path bonus →
Click Complete Path →
Dashboard (path marked complete, celebration)
```

---

## Browse Courses

**File**: `/components/BrowseLessons.tsx`

### Page Purpose
Discovery interface for all available learning paths. Allows users to search, filter, and explore courses they haven't started yet.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Browse Courses                                      │
│ ┌─────────────────────────────────────┐            │
│ │ 🔍 Search courses...                │            │
│ └─────────────────────────────────────┘            │
│                                                     │
│ Filters:                                            │
│ [All Roles ▼] [All Goals ▼] [All Levels ▼]       │
│                                                     │
│ Showing 6 courses                                   │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ │ Course 1 │ │ Course 2 │ │ Course 3 │          │
│ │ [Image]  │ │ [Image]  │ │ [Image]  │          │
│ │ Title    │ │ Title    │ │ Title    │          │
│ │ Desc...  │ │ Desc...  │ │ Desc...  │          │
│ │ Progress │ │ Progress │ │ Progress │          │
│ │ [Start]  │ │ [View]   │ │ [View]   │          │
│ └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ │ Course 4 │ │ Course 5 │ │ Course 6 │          │
│ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### 1. Page Header

**Title**
- **Purpose**: Identify page
- **Text**: "Browse Courses"
- **Styling**: Large heading, dark sage

**Subtitle** (optional)
- **Purpose**: Provide context
- **Text**: "Discover leadership development paths"
- **Styling**: Muted text

#### 2. Search Bar

**Purpose**: Filter courses by text search
- **Input Type**: Text search
- **Placeholder**: "🔍 Search courses..."
- **Search Scope**: Searches title and description
- **Behavior**: Live filtering as user types
- **Styling**: Full width, rounded-2xl, thick border, white background
- **Clear Button**: X icon appears when text entered

**Search Logic**:
```
User types → Filter courses in real-time →
Update course count → Re-render grid
```

#### 3. Filter Bar

**Role Filter Dropdown**
- **Purpose**: Filter by target role
- **Label**: "All Roles" (when no filter)
- **Options**:
  - All Roles (default, shows all)
  - Senior Pastor
  - Youth Minister
  - Worship Leader
  - Admin Team
  - Volunteer Leader
  - Tech Team
- **Interaction**: Click to open dropdown, select option
- **Styling**: Rounded-2xl, thick border, dropdown arrow
- **Icon**: User icon

**Goal Filter Dropdown**
- **Purpose**: Filter by target goal
- **Label**: "All Goals" (when no filter)
- **Options**:
  - All Goals (default)
  - Lead with Confidence
  - Speak with Clarity
  - Create Team Unity
  - Resolve Conflicts Fast
  - Develop Your People
- **Multiple Selection**: Can select multiple goals (checkbox dropdown)
- **Styling**: Rounded-2xl, thick border
- **Icon**: Target icon

**Difficulty Filter Dropdown**
- **Purpose**: Filter by difficulty level
- **Label**: "All Levels" (when no filter)
- **Options**:
  - All Levels (default)
  - Beginner
  - Intermediate
  - Advanced
- **Interaction**: Single selection
- **Styling**: Rounded-2xl, thick border
- **Icon**: Layers icon

**Filter Behavior**:
- Filters combine with AND logic
- Live updating of course grid
- Course count updates
- Empty state if no matches

**Clear Filters Button** (appears if any filter active)
- **Purpose**: Reset all filters
- **Label**: "Clear Filters"
- **Position**: Right side of filter bar
- **Styling**: Text link, sage green

#### 4. Results Counter

**Purpose**: Show number of matching courses
- **Display**: "Showing X courses" or "X courses found"
- **Position**: Below filters, above course grid
- **Styling**: Muted text, small
- **Updates**: Real-time with filters/search

#### 5. Course Grid

**Layout**
- **Grid**: Responsive columns
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- **Gap**: Consistent spacing between cards
- **Animation**: Fade in, stagger effect

**Course Card** (per course):

**Thumbnail Image**
- **Purpose**: Visual identification
- **Source**: Unsplash image specific to course
- **Styling**: Rounded-2xl top, covers 40% of card height
- **Aspect Ratio**: 16:9
- **Hover**: Slight scale effect

**Title**
- **Purpose**: Course name
- **Example**: "Communication Excellence"
- **Styling**: Bold, dark sage, truncate if too long
- **Position**: Below thumbnail

**Description**
- **Purpose**: Brief course overview
- **Length**: 2-3 lines, truncated with ellipsis
- **Styling**: Muted text, smaller size
- **Position**: Below title

**Metadata Row**
- **Purpose**: Quick course information
- **Display Items**:
  - Duration (🕒 icon): "4 weeks"
  - Chapters (📖 icon): "8 chapters"
- **Layout**: Horizontal, space between
- **Icons**: All `#3A4A46` (dark sage)
- **Styling**: Small text, muted

**Difficulty Badge**
- **Purpose**: Show complexity level
- **Display**: "Beginner", "Intermediate", or "Advanced"
- **Styling**: 
  - Beginner: Green badge
  - Intermediate: Yellow badge
  - Advanced: Red badge
- **Position**: Below metadata

**Progress Bar** (if course started)
- **Purpose**: Show completion progress
- **Display**: Percentage bar
- **Color**: Sage green fill
- **Condition**: Only shows if progress > 0%
- **Position**: Above action button

**Action Button**
- **Purpose**: Primary course action
- **Label**: 
  - Not started: "Start Learning"
  - In progress: "Continue Learning"
  - Completed: "Review Course"
- **Action**: 
  - Start: Begin Chapter 1, Question 1
  - Continue: Resume at last position
  - Review: Open course detail
- **Styling**: Primary sage green, full width, rounded-2xl
- **Position**: Bottom of card

**View Details Link** (alternative)
- **Purpose**: See full course information
- **Label**: "View Details →"
- **Action**: Navigate to CourseDetail page
- **Position**: Bottom of card (instead of or below button)
- **Styling**: Text link, sage green, underline on hover

#### 6. Empty State

**Trigger**: No courses match filters/search

**Display**:
- **Icon**: BookOpen or Search icon (large, muted)
- **Heading**: "No courses found"
- **Message**: "Try adjusting your filters or search terms"
- **Action Button**: "Clear Filters" (if filters active)
- **Styling**: Centered, muted colors, generous spacing

#### 7. Loading State

**Trigger**: While courses loading (if async)

**Display**:
- **Skeleton Cards**: 6 placeholder cards matching course card layout
- **Animation**: Pulse effect
- **Styling**: Gray rectangles matching card dimensions

### User Flows

**Search Flow**:
```
Browse page → Type in search bar →
Courses filter in real-time →
Click course → CourseDetail or Start Learning
```

**Filter Flow**:
```
Browse page → Select role filter →
Courses filter → Select difficulty filter →
Courses filter further →
Click course → CourseDetail or Start Learning
```

**Start Course Flow**:
```
Browse page → Click "Start Learning" →
LearningScenario (Chapter 1, Q1) →
Complete chapter → ResultsScreen →
Dashboard (course appears in Continue Learning)
```

---

## Course Detail

**File**: `/components/CourseDetail.tsx`

### Page Purpose
Comprehensive view of a single learning path. Shows what users will learn, displays chapter breakdown, provides context on difficulty and time commitment, allows user to start or continue the path.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ [← Back to Browse]                                  │
│                                                     │
│ Leadership Fundamentals                             │
│ Master essential principles of servant leadership   │
│                                                     │
│ ┌────────────────────────┐                        │
│ │                        │                        │
│ │   [Hero Image]         │                        │
│ │                        │                        │
│ └────────────────────────┘                        │
│                                                     │
│ [🕒 4 weeks] [📖 8 chapters] [Beginner]           │
│ [👤 Senior Pastor] [👤 Youth Minister]            │
│                                                     │
│ ┌────────────────────────────┐                    │
│ │  [Start Learning →]        │                    │
│ └────────────────────────────┘                    │
│                                                     │
│ What You'll Learn                                   │
│ • Collaborative decision-making                     │
│ • Servant leadership principles                     │
│ • Adapting leadership styles                        │
│ • Building high-performing teams                    │
│                                                     │
│ Chapters                                            │
│ ┌────────────────────────────────────┐            │
│ │ ▼ 1. Introduction to Leadership    │            │
│ │    8 questions • 15 min • ✓        │            │
│ │    ┌──────────────────────────┐   │            │
│ │    │ • Content slide          │   │            │
│ │    │ • Multiple choice        │   │            │
│ │    │ • True/false            │   │            │
│ │    └──────────────────────────┘   │            │
│ └────────────────────────────────────┘            │
│                                                     │
│ ┌────────────────────────────────────┐            │
│ │ ▶ 2. Leadership Styles             │            │
│ │    6 questions • 12 min • 🔒       │            │
│ └────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### 1. Navigation

**Back Button**
- **Purpose**: Return to previous page
- **Label**: "← Back to Browse"
- **Action**: Navigate back to Browse Courses
- **Position**: Top left
- **Styling**: Ghost button, dark sage text

**Breadcrumb** (alternative or additional)
- **Purpose**: Show navigation path
- **Display**: "Home > Browse > Leadership Fundamentals"
- **Interaction**: Each segment clickable
- **Position**: Top of page
- **Styling**: Text links, separator icons

#### 2. Course Header

**Title**
- **Purpose**: Course name
- **Text**: Full course title (e.g., "Leadership Fundamentals")
- **Styling**: Large heading (h1), dark sage
- **Position**: Top of page

**Subtitle/Description**
- **Purpose**: Brief course overview
- **Text**: 1-2 sentence summary
- **Example**: "Master essential principles of servant leadership in a church context"
- **Styling**: Muted text, larger than body
- **Position**: Below title

#### 3. Hero Section

**Hero Image**
- **Purpose**: Visual representation of course
- **Source**: Unsplash image
- **Size**: Large, prominent (cover 30% of viewport)
- **Styling**: Rounded-2xl, thick border, shadow
- **Position**: Below header

**Info Badges Row**
- **Purpose**: Key course metadata at a glance
- **Layout**: Horizontal flex row with gap
- **Position**: Below hero image

**Duration Badge**
- **Icon**: Clock (🕒)
- **Text**: "4 weeks"
- **Icon Color**: `#3A4A46` (dark sage)
- **Styling**: White background, rounded-xl, border

**Chapter Count Badge**
- **Icon**: BookOpen (📖)
- **Text**: "8 chapters"
- **Icon Color**: `#3A4A46` (dark sage)
- **Styling**: White background, rounded-xl, border

**Difficulty Badge**
- **Purpose**: Show course complexity
- **Text**: "Beginner", "Intermediate", or "Advanced"
- **Color**:
  - Beginner: Green
  - Intermediate: Yellow
  - Advanced: Red
- **Styling**: Colored background, rounded-xl, border

**Target Roles Tags**
- **Purpose**: Show who course is designed for
- **Display**: Multiple tags (e.g., "👤 Senior Pastor", "👤 Youth Minister")
- **Layout**: Wrap if multiple
- **Styling**: Small badges, sage background tint, rounded

#### 4. Primary Action

**Start/Continue Button**
- **Purpose**: Main call-to-action
- **Label**: 
  - Not started: "Start Learning →"
  - In progress: "Continue Learning →"
  - Completed: "Review Course →"
- **Action**: 
  - Start: Begin Chapter 1, Question 1
  - Continue: Resume at last completed position
  - Review: Begin Chapter 1 for review
- **Styling**: Large, primary sage green, full width (on mobile) or prominent, rounded-2xl
- **Position**: Below info badges, prominent placement
- **State**: Hover → scale, Press → translate down

**Secondary Button** (if course in progress)
- **Purpose**: Reset progress
- **Label**: "Start Over"
- **Action**: Confirm dialog → Reset progress to beginning
- **Styling**: Outline style, smaller than primary
- **Position**: Next to primary button

#### 5. What You'll Learn Section

**Section Header**
- **Purpose**: Label section
- **Text**: "What You'll Learn"
- **Styling**: Section heading (h2), dark sage
- **Position**: Above learning objectives

**Objectives List**
- **Purpose**: Show learning outcomes
- **Display**: Bulleted list of goals
- **Format**: "• [Objective text]"
- **Examples**:
  - • Understand collaborative decision-making
  - • Practice servant leadership principles
  - • Adapt leadership styles to different situations
  - • Build and develop high-performing teams
- **Count**: 4-6 objectives typically
- **Styling**: Clear bullets, readable text, generous spacing
- **Icons**: Optional check or target icons before each

**Card Styling**
- **Background**: Light sage tint or white
- **Border**: Thick dark sage border
- **Padding**: Generous
- **Styling**: Rounded-2xl

#### 6. Chapters Section

**Section Header**
- **Purpose**: Label chapter list
- **Text**: "Chapters"
- **Styling**: Section heading (h2), dark sage
- **Position**: Above chapter accordion

**Chapter Accordion List**
- **Purpose**: Show detailed chapter breakdown
- **Component**: Collapsible/Accordion from UI library
- **Layout**: Vertical stack

**Chapter Card** (per chapter):

**Chapter Header** (always visible):
- **Icon**: Chevron (▼ expanded, ▶ collapsed)
- **Number & Title**: "1. Introduction to Leadership"
- **Metadata**: "8 questions • 15 min"
- **Status Icon**:
  - ✓ Completed: Green checkmark
  - ▶ In Progress: Sage play icon
  - 🔒 Locked: Gray lock icon
  - ○ Not Started: Empty circle
- **Interaction**: Click to expand/collapse
- **Styling**: Rounded-2xl, thick border, hover effect

**Chapter Content** (when expanded):
- **Question List**: Shows question types (not full questions)
  - "• Content slide"
  - "• Multiple choice question"
  - "• True/false question"
  - "• Matching exercise"
- **Purpose**: Preview chapter structure
- **Styling**: Indented, muted text, smaller

**Chapter States**:

**Completed Chapter**
- **Status**: ✓ Completed
- **Header Style**: Light green background tint
- **Border**: Green
- **Action**: "Review Chapter" button (when expanded)

**Current Chapter** (in progress)
- **Status**: ▶ In Progress
- **Header Style**: Light sage background
- **Border**: Sage green
- **Action**: "Continue Chapter" button (when expanded)
- **Progress**: Shows question progress (e.g., "3/8 completed")

**Available Chapter** (not started, unlocked)
- **Status**: ○ Not Started
- **Header Style**: White background
- **Border**: Dark sage
- **Action**: "Start Chapter" button (when expanded)

**Locked Chapter** (prerequisites not met)
- **Status**: 🔒 Locked
- **Header Style**: Gray background
- **Border**: Gray
- **Opacity**: Reduced (0.6)
- **Interaction**: Cannot expand
- **Tooltip**: "Complete previous chapters to unlock"

#### 7. Prerequisites Section (if applicable)

**Purpose**: Show requirements to start course

**Display** (if prerequisites exist):
- **Icon**: AlertCircle
- **Message**: "Complete [Prerequisite Course Name] first"
- **Link**: Click to view prerequisite course
- **Styling**: Yellow/orange background, thick border, rounded-2xl
- **Position**: Above chapters or near primary action

#### 8. Overall Progress (if started)

**Progress Bar**
- **Purpose**: Show overall course completion
- **Display**: "X% Complete" + filled bar
- **Calculation**: Completed chapters / total chapters
- **Color**: Sage green fill
- **Position**: Below hero section or above chapters
- **Styling**: Rounded bar, thick border

**Stats Summary**
- **Display**: "3 / 8 chapters complete"
- **Position**: Above or below progress bar
- **Styling**: Muted text

### User Flows

**Start New Course Flow**:
```
Browse → Click course card → CourseDetail page →
Read course info → Click "Start Learning" →
LearningScenario (Chapter 1, Q1)
```

**Continue Course Flow**:
```
Dashboard → Click "Continue" on path card →
OR
Browse → CourseDetail →
Click "Continue Learning" →
LearningScenario (resume at last position)
```

**Review Chapter Flow**:
```
CourseDetail → Expand completed chapter →
Click "Review Chapter" →
LearningScenario (chapter from start, review mode)
```

---

## Profile

**File**: `/components/Profile.tsx`

### Page Purpose
User settings and personalization hub. Manage account information, view statistics, display earned badges, adjust preferences, and upload profile picture.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ My Profile                                          │
│                                                     │
│ ┌──────────┐  ┌─────────────────────────────────┐ │
│ │          │  │ Name: John Doe                   │ │
│ │  [Photo] │  │ Email: john@church.org           │ │
│ │  [Click  │  │ Role: Youth Minister             │ │
│ │  Upload] │  │ Church: Community Church         │ │
│ │          │  │                                   │ │
│ └──────────┘  │ [Save Changes]                   │ │
│               └─────────────────────────────────┘ │
│                                                     │
│ ┌──────────────────────────────────────────────┐  │
│ │ Your Stats                                   │  │
│ │                                               │  │
│ │ [⭐ 1,250] [🏆 Level 4] [🔥 7 Day]          │  │
│ │ [📖 2 Paths] [🏅 5 Badges]                  │  │
│ └──────────────────────────────────────────────┘  │
│                                                     │
│ ┌──────────────────────────────────────────────┐  │
│ │ My Badges                                    │  │
│ │                                               │  │
│ │ [Badge 1] [Badge 2] [Badge 3]               │  │
│ │ [Badge 4] [Badge 5]                         │  │
│ └──────────────────────────────────────────────┘  │
│                                                     │
│ ┌──────────────────────────────────────────────┐  │
│ │ Learning Goals                               │  │
│ │ ☑ Lead with Confidence                      │  │
│ │ ☑ Create Team Unity                         │  │
│ │ ☐ Speak with Clarity                        │  │
│ └──────────────────────────────────────────────┘  │
│                                                     │
│ ┌──────────────────────────────────────────────┐  │
│ │ ⚠ Danger Zone                               │  │
│ │ [Delete Account]                             │  │
│ └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### 1. Page Header

**Title**
- **Purpose**: Identify page
- **Text**: "My Profile"
- **Styling**: Large heading (h1), dark sage

#### 2. Profile Information Card

**Avatar Section**:

**Profile Picture Display**
- **Purpose**: Show user's avatar
- **Size**: Large circle (128px diameter)
- **Styling**: Circular, thick dark sage border, shadow
- **Fallback**: Initials if no image (e.g., "JD")
- **Position**: Left side of card

**Upload Button/Area**
- **Purpose**: Allow avatar upload
- **Label**: "Click to upload" or camera icon overlay
- **Interaction**: Click opens file picker
- **File Types**: image/png, image/jpeg, image/jpg
- **Max Size**: 5MB (display warning if exceeded)
- **Preview**: Shows image immediately using URL.createObjectURL()
- **Save**: Converts to base64 data URL on save
- **Styling**: Hover shows semi-transparent overlay with upload icon

**Upload Flow**:
```
Click avatar → File picker opens →
Select image → Preview shows →
Click Save Changes → Image saved to profile
```

**Editable Fields** (right side of avatar):

**Name Input**
- **Purpose**: User's full name
- **Label**: "Full Name"
- **Type**: Text input
- **Required**: Yes
- **Default**: Current user name
- **Styling**: Rounded-2xl, thick border

**Email Input**
- **Purpose**: User's email address
- **Label**: "Email"
- **Type**: Email input
- **Required**: Yes
- **Default**: Current email
- **Styling**: Rounded-2xl, thick border
- **Note**: In production, would require verification

**Role Dropdown**
- **Purpose**: Select user's church role
- **Label**: "Role"
- **Type**: Select dropdown
- **Options**: Same 6 roles from onboarding
- **Default**: Current role
- **Styling**: Rounded-2xl, thick border
- **Impact**: Updates course recommendations

**Church Input**
- **Purpose**: User's church name
- **Label**: "Church Name"
- **Type**: Text input
- **Required**: No (optional)
- **Default**: Current church name if set
- **Styling**: Rounded-2xl, thick border

**Save Changes Button**
- **Purpose**: Persist profile updates
- **Label**: "Save Changes"
- **Action**: 
  - Validate inputs
  - Update user profile
  - Show success toast
- **Styling**: Primary sage green, rounded-2xl
- **Position**: Bottom of form
- **State**: Disabled until changes made

**Success Feedback**:
- **Display**: Toast notification (Sonner)
- **Message**: "Profile updated successfully!"
- **Duration**: 3 seconds
- **Icon**: CheckCircle (green)

#### 3. Your Stats Card

**Purpose**: Display key user metrics

**Card Styling**:
- **Background**: White or light sage tint
- **Border**: Thick dark sage
- **Padding**: Generous
- **Styling**: Rounded-2xl

**Stat Display Grid**:
- **Layout**: 2x3 grid (mobile: 2x2, wrap)
- **Gap**: Consistent spacing

**Stat Items**:

**Total XP**
- **Icon**: Star (⭐)
- **Display**: "1,250 XP"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Show cumulative points
- **Progress**: Optional bar showing progress to next level

**Current Level**
- **Icon**: Trophy (🏆)
- **Display**: "Level 4"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Show progression tier

**Current Streak**
- **Icon**: Flame (🔥)
- **Display**: "7 Day Streak"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Show consecutive learning days

**Paths Completed**
- **Icon**: BookOpen (📖)
- **Display**: "2 Paths Complete"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Show completed learning paths

**Badges Earned**
- **Icon**: Medal (🏅)
- **Display**: "5 Badges"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Show achievement count
- **Interaction**: Click to scroll to badges section

**Lives Remaining**
- **Icon**: Heart (♥)
- **Display**: "3 Lives"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Current session lives

**Hints Remaining**
- **Icon**: Lightbulb (💡)
- **Display**: "3 Hints"
- **Icon Color**: `#3A4A46` (dark sage)
- **Purpose**: Current session hints

**Each Stat Item Styling**:
- **Container**: Small card with border
- **Icon**: Top, centered
- **Value**: Large, bold
- **Label**: Small, muted

#### 4. My Badges Card

**Purpose**: Display earned achievements

**Card Header**:
- **Title**: "My Badges"
- **Badge Count**: "(5 earned)"
- **Styling**: Section heading

**Badge Grid**:
- **Layout**: Grid (2-3 cols mobile, 4-5 desktop)
- **Gap**: Consistent spacing

**Badge Item** (per badge):

**Badge Icon/Image**
- **Purpose**: Visual representation
- **Size**: Medium square (80px)
- **Styling**: Rounded-xl, border, shadow
- **Rarity Border Color**:
  - Common: Gray
  - Rare: Blue
  - Epic: Purple
  - Legendary: Gold

**Badge Name**
- **Display**: Below icon
- **Text**: Badge title
- **Styling**: Small, bold, centered

**Badge Interaction**:
- **Hover**: Slight scale increase
- **Click**: Opens badge detail modal

**Badge Detail Modal**:
- **Display**: Full badge information
- **Content**:
  - Large badge icon
  - Name
  - Description
  - Rarity level
  - Date earned
  - Criteria (how to earn)
- **Close**: X button or click outside
- **Styling**: Clay-style dialog, rounded-3xl

**Empty State** (no badges earned):
- **Icon**: Medal icon (large, muted)
- **Message**: "No badges earned yet"
- **Subtext**: "Complete learning paths to earn badges"
- **Action**: "Browse Courses" link
- **Styling**: Centered, encouraging tone

#### 5. Learning Goals Card

**Purpose**: Display and manage selected goals

**Card Header**:
- **Title**: "Learning Goals"
- **Subtext**: "Your selected leadership development areas"
- **Styling**: Section heading

**Goals List**:
- **Display**: All 5 goals with checkboxes
- **Layout**: Vertical stack

**Goal Item** (per goal):
- **Checkbox**: Checked if goal selected
- **Label**: Goal text
- **Example**: "☑ Lead with Confidence"
- **Interaction**: Click to toggle selection
- **Styling**: Clay-style checkbox, rounded

**Goals**:
1. ☐ Lead with Confidence
2. ☐ Speak with Clarity
3. ☐ Create Team Unity
4. ☐ Resolve Conflicts Fast
5. ☐ Develop Your People

**Save Goals**:
- **Auto-save**: Updates immediately on change
- **OR Manual**: "Update Goals" button at bottom
- **Feedback**: Toast confirmation
- **Impact**: Updates course recommendations

#### 6. Danger Zone Card

**Purpose**: Destructive account actions

**Card Styling**:
- **Border**: Red (warning color)
- **Background**: Light red tint
- **Icon**: AlertTriangle (⚠)
- **Position**: Bottom of page

**Header**:
- **Title**: "⚠ Danger Zone"
- **Warning Text**: "Irreversible actions"
- **Styling**: Red text, bold

**Delete Account Button**:
- **Purpose**: Permanently delete user account
- **Label**: "Delete Account"
- **Styling**: Red background, rounded-2xl, thick border
- **Interaction**: Click → Confirmation dialog

**Confirmation Dialog**:
- **Purpose**: Prevent accidental deletion
- **Display**: Modal overlay
- **Content**:
  - Warning icon (large, red)
  - "Are you sure you want to delete your account?"
  - "This action cannot be undone. All your progress and data will be permanently deleted."
  - Password confirmation input (in production)
- **Actions**:
  - "Cancel" (secondary, default focus)
  - "Yes, Delete My Account" (danger, red)
- **After Confirmation**:
  - Delete user data
  - Show farewell message
  - Navigate to Login

### User Flows

**Update Profile Flow**:
```
Profile page →
Edit fields (name, email, role, church) →
Click Save Changes →
Validation →
Success toast →
Profile updated
```

**Upload Avatar Flow**:
```
Profile page →
Click avatar →
File picker opens →
Select image →
Preview shows →
Click Save Changes →
Avatar saved
```

**View Badge Flow**:
```
Profile page →
Scroll to Badges section →
Click badge →
Modal opens with details →
Read description →
Close modal
```

**Update Goals Flow**:
```
Profile page →
Scroll to Goals section →
Check/uncheck goals →
Auto-save OR click Update Goals →
Confirmation →
Recommendations update
```

**Delete Account Flow**:
```
Profile page →
Scroll to Danger Zone →
Click Delete Account →
Confirmation dialog →
[Cancel → Close dialog]
OR
[Confirm delete → Account deleted → Login page]
```

---

## Leaderboard

**File**: `/components/Leaderboard.tsx`

### Page Purpose
Display global XP rankings to foster friendly competition and motivation. Highlight user's current position and celebrate top performers.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Leaderboard                                         │
│ Top performers this month                           │
│                                                     │
│        ┌────────────────────────────┐              │
│        │                            │              │
│        │    [🥈 2nd Place]         │              │
│   ┌────┤    Sarah Johnson          │───────┐      │
│   │    │    1,480 XP • Level 5     │       │      │
│   │ 🥇 │                            │ 🥉    │      │
│   │ 1st└────────────────────────────┘ 3rd   │      │
│   │ Maria                             Tom   │      │
│   │ 1,650                            1,290   │      │
│   └─────────────────────────────────────────┘      │
│                                                     │
│ ┌────────────────────────────────────────────────┐ │
│ │ Rank │ User          │ XP    │ Level           │ │
│ ├──────┼───────────────┼───────┼─────────────────┤ │
│ │  4   │ John Doe      │ 1,250 │ Level 4         │ │
│ │  5   │ Emily Chen    │ 1,180 │ Level 4   (You) │ │
│ │  6   │ David Park    │ 1,090 │ Level 3         │ │
│ │  7   │ Lisa Anderson │  980  │ Level 3         │ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ [🔄 Refresh]                    Last updated: 2m ago│
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### 1. Page Header

**Title**
- **Purpose**: Identify page
- **Text**: "Leaderboard"
- **Styling**: Large heading (h1), dark sage

**Subtitle**
- **Purpose**: Provide context
- **Text**: "Top performers this month"
- **Styling**: Muted text
- **Note**: Could be "All time" or time-period specific

#### 2. Podium Section (Top 3)

**Purpose**: Celebrate and highlight top 3 performers

**Layout**:
- **Desktop**: 3 columns side-by-side (2nd-1st-3rd order)
- **Mobile**: Vertical stack (1st-2nd-3rd order)
- **Elevation**: 1st is tallest, 2nd is medium, 3rd is shortest

**1st Place Card**:
- **Position**: Center (desktop), Top (mobile)
- **Medal**: 🥇 Gold crown icon
- **Height**: Tallest of three
- **Background**: Gold tint or gradient
- **Border**: Gold thick border
- **Styling**: Rounded-2xl, prominent shadow

**2nd Place Card**:
- **Position**: Left (desktop), Middle (mobile)
- **Medal**: 🥈 Silver medal icon
- **Height**: Medium
- **Background**: Silver tint or gradient
- **Border**: Silver thick border
- **Styling**: Rounded-2xl, shadow

**3rd Place Card**:
- **Position**: Right (desktop), Bottom (mobile)
- **Medal**: 🥉 Bronze medal icon
- **Height**: Shortest
- **Background**: Bronze tint or gradient
- **Border**: Bronze thick border
- **Styling**: Rounded-2xl, shadow

**Card Contents** (all podium cards):

**Rank Badge**
- **Display**: Medal icon + rank text
- **Example**: "🥇 1st Place"
- **Position**: Top of card
- **Size**: Large, prominent

**Avatar**
- **Display**: User's profile picture
- **Size**: Medium circle (64px)
- **Fallback**: Initials
- **Position**: Center of card
- **Styling**: Circular, thick border matching medal color

**User Name**
- **Display**: Full name
- **Example**: "Maria Rodriguez"
- **Styling**: Bold, large
- **Position**: Below avatar

**XP Display**
- **Display**: Total XP with icon
- **Example**: "1,650 XP"
- **Icon**: Star (⭐), color `#3A4A46`
- **Position**: Below name

**Level Display**
- **Display**: Current level with icon
- **Example**: "Level 5"
- **Icon**: Trophy (🏆), color `#3A4A46`
- **Position**: Below XP or next to XP

**Interaction**:
- **Hover**: Slight scale increase
- **Click**: Optional - opens user profile modal (future)

#### 3. Rankings Table

**Purpose**: Show rankings 4th place and below

**Table Header**:
- **Columns**:
  - Rank (number)
  - User (avatar + name)
  - XP (total points)
  - Level (current level)
- **Styling**: Bold, dark sage background tint, rounded top

**Table Rows** (per user):

**Rank Cell**:
- **Display**: Numerical rank
- **Example**: "4", "5", "6"
- **Styling**: Muted text, centered
- **4-10**: Optional badge styling

**User Cell**:
- **Avatar**: Small circle (32px) with user image/initials
- **Name**: User's full name
- **Layout**: Horizontal (avatar + name)
- **Styling**: Left-aligned

**XP Cell**:
- **Display**: Total XP number
- **Example**: "1,250"
- **Format**: Comma-separated if > 999
- **Styling**: Regular text, right-aligned

**Level Cell**:
- **Display**: Level number
- **Example**: "Level 4"
- **Styling**: Badge style, sage green background

**Current User Row Highlight**:
- **Condition**: Row matches logged-in user
- **Background**: Light sage green
- **Border**: Thick sage green border on left
- **Label**: "(You)" badge next to name
- **Scroll**: Auto-scroll to visible on page load

**Row Styling**:
- **Alternating**: Optional zebra striping
- **Border**: Bottom border between rows
- **Hover**: Light sage background
- **Padding**: Generous for readability

#### 4. Controls and Info

**Refresh Button**:
- **Purpose**: Manually refresh leaderboard data
- **Label**: "🔄 Refresh"
- **Action**: Re-fetch leaderboard data, show loading state
- **Position**: Bottom left
- **Styling**: Outline button, rounded-xl
- **State**: Disabled during refresh with spinner

**Last Updated Timestamp**:
- **Purpose**: Show data freshness
- **Display**: "Last updated: 2m ago"
- **Format**: Relative time (2m, 5h, 1d ago)
- **Position**: Bottom right
- **Styling**: Small, muted text

**Pagination** (if >50 users):
- **Purpose**: Load more rankings
- **Display**: Page numbers or "Load More" button
- **Position**: Bottom center
- **Styling**: Rounded buttons, clay style

#### 5. Empty State

**Trigger**: No leaderboard data

**Display**:
- **Icon**: Trophy icon (large, muted)
- **Heading**: "No rankings yet"
- **Message**: "Be the first to complete a learning path!"
- **Action**: "Browse Courses" button
- **Styling**: Centered, encouraging

#### 6. Loading State

**Trigger**: While data loading

**Display**:
- **Podium**: 3 skeleton cards matching podium layout
- **Table**: 10-15 skeleton rows
- **Animation**: Pulse effect
- **Styling**: Gray placeholders

### User Flows

**View Leaderboard Flow**:
```
Navigation → Click Leaderboard →
Page loads with rankings →
View top 3 podium →
Scroll to find own ranking (auto-highlighted) →
Compare with others
```

**Refresh Flow**:
```
Leaderboard page →
Click Refresh button →
Loading spinner →
Updated rankings displayed →
Updated timestamp
```

**Competitive Flow**:
```
View leaderboard →
See ranking → Motivated to improve →
Navigate to Dashboard →
Complete more learning paths →
Return to Leaderboard →
See improved ranking
```

---

## Admin Dashboard

**File**: `/components/AdminDashboard.tsx`

### Page Purpose
Administrative control center for managing learning content, users, and badges. Provides CRUD operations for all major entities. Admin-only access.

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Admin Dashboard                                     │
│ ┌────────┬────────┬────────┐                       │
│ │ Paths  │ Users  │ Badges │                       │
│ └────────┴────────┴────────┘                       │
│                                                     │
│ [Active Tab Content]                                │
│                                                     │
│ Learning Paths                                      │
│ [+ Create New Path]                                 │
│                                                     │
│ ┌────────────────────────────────────────────────┐ │
│ │ Title            │ Status │ Chapters │ Actions │ │
│ ├──────────────────┼────────┼──────────┼─────────┤ │
│ │ Leadership Fund. │ 📗 Pub │    8     │ [Edit]  │ │
│ │ Conflict Resol.  │ 📕 Dft │    7     │ [Edit]  │ │
│ │ Communication    │ 📗 Pub │    6     │ [Edit]  │ │
│ └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Interactive Elements

#### 1. Page Header

**Title**
- **Purpose**: Identify admin section
- **Text**: "Admin Dashboard"
- **Icon**: Shield or Settings icon
- **Styling**: Large heading (h1), dark sage
- **Access Badge**: "Admin" badge in corner

**Access Control**:
- **Visibility**: Only shown if `userData.isAdmin === true`
- **Redirect**: Non-admins redirected to Dashboard
- **Navigation**: Admin link only visible to admins

#### 2. Tab Navigation

**Purpose**: Switch between admin sections

**Tabs**:
1. **Learning Paths Tab**
2. **Users Tab**
3. **Badges Tab**

**Tab Styling** (clay-style):
- **Container**: Horizontal tab list with pill-shaped background
- **Active Tab**: White background, thick border, shadow (elevated)
- **Inactive Tabs**: Transparent, muted text
- **Hover**: Light sage background
- **Transition**: Smooth background/border changes
- **Mobile**: Stack vertically or scroll horizontally

**Tab Click**:
```
Click tab → Switch active content →
Persist tab in state →
Load corresponding data
```

---

### Tab 1: Learning Paths

**File Component**: Uses `PathEditor.tsx`

**Purpose**: Manage all learning paths (CRUD operations)

**Header Row**:
- **Title**: "Learning Paths"
- **Create Button**: "+ Create New Path"
  - **Action**: Opens PathEditorFull in create mode
  - **Styling**: Primary sage green, rounded-2xl
  - **Icon**: Plus icon

**Path List Table**:

**Table Columns**:
1. **Title**: Path name
2. **Status**: Published/Draft badge
3. **Chapters**: Number count
4. **Questions**: Total count
5. **Created**: Date created
6. **Actions**: Edit/Delete buttons

**Table Row** (per path):

**Title Cell**:
- **Display**: Full path title
- **Styling**: Bold, clickable
- **Interaction**: Click opens CourseDetail preview

**Status Cell**:
- **Published Badge**: 
  - Icon: Green book (📗)
  - Text: "Published"
  - Background: Light green
  - Meaning: Visible to all users
- **Draft Badge**:
  - Icon: Red book (📕)
  - Text: "Draft"
  - Background: Light gray
  - Meaning: Hidden from users, editable

**Toggle Status**:
- **Interaction**: Click badge to toggle
- **Confirmation**: "Publish this path?" dialog
- **Action**: Updates path status immediately

**Chapters Cell**:
- **Display**: Number of chapters
- **Example**: "8"
- **Styling**: Centered, regular text

**Questions Cell**:
- **Display**: Total questions across all chapters
- **Example**: "42"
- **Styling**: Centered, muted text

**Created Cell**:
- **Display**: Creation date
- **Format**: "Jan 15, 2025" or relative
- **Styling**: Small, muted text

**Actions Cell**:
- **Edit Button**:
  - **Label**: "Edit" or pencil icon
  - **Action**: Opens PathEditorFull with path data
  - **Styling**: Sage green outline, small, rounded-xl
  
- **Delete Button**:
  - **Label**: "Delete" or trash icon
  - **Action**: Confirmation dialog → Delete path
  - **Styling**: Red outline, small, rounded-xl

**Delete Confirmation Dialog**:
- **Message**: "Delete [Path Title]? This cannot be undone."
- **Warning**: "Users' progress on this path will be lost."
- **Actions**:
  - "Cancel" (secondary)
  - "Delete Path" (danger, red)

**Empty State** (no paths):
- **Icon**: BookOpen (large, muted)
- **Message**: "No learning paths yet"
- **Action**: "Create First Path" button
- **Styling**: Centered, encouraging

**Create/Edit Flow** (opens PathEditorFull):
See PathEditorFull documentation below

---

### Tab 2: Users

**File Component**: Uses `UserManager.tsx`

**Purpose**: Manage user accounts and permissions

**Header Row**:
- **Title**: "Users"
- **Search Bar**: Search by name/email
- **Filter Dropdown**: Filter by role
- **Create Button**: "+ Add User" (future feature)

**Search Bar**:
- **Purpose**: Filter users by name or email
- **Placeholder**: "🔍 Search users..."
- **Behavior**: Live filtering as user types
- **Styling**: Rounded-2xl, thick border
- **Position**: Top right

**User List Table**:

**Table Columns**:
1. **Avatar**: Profile picture
2. **Name**: Full name
3. **Email**: Email address
4. **Role**: Church role
5. **XP**: Total experience
6. **Level**: Current level
7. **Joined**: Join date
8. **Actions**: Edit/Delete buttons

**Table Row** (per user):

**Avatar Cell**:
- **Display**: Small circular avatar (32px)
- **Fallback**: Initials
- **Styling**: Thick border

**Name Cell**:
- **Display**: User's full name
- **Styling**: Bold
- **Sort**: Clickable column header to sort A-Z

**Email Cell**:
- **Display**: User's email
- **Styling**: Regular text, monospace
- **Truncate**: On mobile if too long

**Role Cell**:
- **Display**: User's selected role
- **Styling**: Small badge, sage background
- **Options**: 6 church roles

**XP Cell**:
- **Display**: Total XP number
- **Format**: Comma-separated
- **Example**: "1,250"
- **Sort**: Clickable to sort high-low

**Level Cell**:
- **Display**: Current level
- **Example**: "Level 4"
- **Styling**: Badge, numbered

**Joined Cell**:
- **Display**: Account creation date
- **Format**: "Jan 10, 2025" or relative
- **Styling**: Small, muted

**Actions Cell**:
- **Edit Button**:
  - **Label**: "Edit" or pencil icon
  - **Action**: Opens edit user modal
  - **Styling**: Sage outline, small
  
- **Delete Button**:
  - **Label**: "Delete" or trash icon
  - **Action**: Confirmation → Delete user
  - **Styling**: Red outline, small
  
- **Award Badge Button**:
  - **Label**: Medal icon
  - **Action**: Opens badge selection dialog
  - **Styling**: Gold outline, small

**Edit User Modal**:

**Purpose**: Update user information

**Fields**:
- Name (text input)
- Email (text input)
- Role (dropdown)
- Level (number input)
- XP (number input)
- Badges (multi-select checkboxes)

**Actions**:
- "Cancel" (secondary)
- "Save Changes" (primary sage green)

**Award Badge Dialog**:

**Purpose**: Give badge to user

**Display**:
- List of all available badges
- Checkboxes for each
- Already earned badges checked and disabled

**Actions**:
- "Cancel"
- "Award Badges" (primary)

**Delete User Confirmation**:
- **Message**: "Delete [User Name]'s account?"
- **Warning**: "All their progress will be permanently deleted."
- **Actions**:
  - "Cancel"
  - "Delete User" (danger, red)

---

### Tab 3: Badges

**File Component**: Uses `BadgeManager.tsx`

**Purpose**: Create and manage achievement badges

**Header Row**:
- **Title**: "Badges"
- **Create Button**: "+ Create New Badge"
  - **Action**: Opens create badge modal
  - **Styling**: Primary sage green, rounded-2xl

**Badge Grid**:
- **Layout**: Grid (2-3 cols mobile, 4-5 desktop)
- **Gap**: Consistent spacing

**Badge Card** (per badge):

**Badge Icon/Image**:
- **Display**: Badge visual (80px square)
- **Upload**: File upload or icon selector
- **Styling**: Rounded-xl, border matching rarity

**Badge Name**:
- **Display**: Badge title
- **Example**: "First Steps"
- **Styling**: Bold, centered

**Badge Description**:
- **Display**: Short explanation
- **Example**: "Complete your first chapter"
- **Length**: 1-2 sentences
- **Styling**: Small, muted

**Rarity Badge**:
- **Display**: Colored badge showing rarity
- **Options**:
  - Common (gray)
  - Rare (blue)
  - Epic (purple)
  - Legendary (gold)
- **Position**: Top corner of card

**Times Awarded**:
- **Display**: Count of users who earned it
- **Example**: "12 users earned"
- **Position**: Bottom of card
- **Styling**: Small, muted

**Actions Row**:
- **Edit Button**:
  - **Label**: "Edit" or pencil icon
  - **Action**: Opens edit badge modal
  - **Styling**: Sage outline, small

- **Delete Button**:
  - **Label**: "Delete" or trash icon
  - **Action**: Confirmation → Delete badge
  - **Styling**: Red outline, small

**Create/Edit Badge Modal**:

**Purpose**: Define badge properties

**Fields**:

**Name Input**:
- **Label**: "Badge Name"
- **Type**: Text input
- **Required**: Yes
- **Example**: "Master Communicator"
- **Max Length**: 30 characters

**Description Textarea**:
- **Label**: "Description"
- **Type**: Textarea
- **Required**: Yes
- **Example**: "Complete the Communication Excellence path"
- **Max Length**: 200 characters

**Rarity Dropdown**:
- **Label**: "Rarity"
- **Options**:
  - Common
  - Rare
  - Epic
  - Legendary
- **Default**: Common
- **Purpose**: Visual distinction and prestige

**Icon Upload**:
- **Label**: "Badge Icon"
- **Type**: File upload
- **Accept**: image/png, image/svg
- **Size**: Recommend 256x256px
- **Preview**: Shows uploaded image
- **Fallback**: Medal icon if no upload

**Criteria Textarea**:
- **Label**: "How to Earn (optional)"
- **Type**: Textarea
- **Purpose**: Document earning criteria
- **Example**: "Complete all 8 chapters in the Leadership Fundamentals path with 90%+ score"
- **Note**: Informational only, not enforced by system

**Actions**:
- **Cancel**: Close without saving
- **Save Badge** (create) or **Update Badge** (edit)
  - Primary sage green button
  - Validates required fields
  - Shows success toast

**Delete Badge Confirmation**:
- **Message**: "Delete [Badge Name]?"
- **Warning**: "This badge will be removed from all users who earned it."
- **Actions**:
  - "Cancel"
  - "Delete Badge" (danger, red)

**Award Badge to User**:

**Access**: From Users tab, click medal icon on user row

**Display**: Modal with badge selection

**Badge List**:
- Shows all badges with checkboxes
- Already earned badges: Checked and disabled
- Not earned badges: Unchecked and enabled

**Actions**:
- **Cancel**: Close without changes
- **Award Selected Badges**: 
  - Primary button
  - Adds badges to user's collection
  - Success toast: "Badges awarded to [User Name]!"

---

### User Flows

**Create New Path Flow**:
```
Admin Dashboard → Paths tab →
Click "+ Create New Path" →
PathEditorFull opens (blank form) →
Fill in path details →
Add chapters and questions →
Click "Save Changes" →
Path created →
Returns to Paths tab (new path visible)
```

**Edit Existing Path Flow**:
```
Admin Dashboard → Paths tab →
Click "Edit" on path row →
PathEditorFull opens (pre-filled) →
Modify details →
Click "Save Changes" →
Path updated →
Returns to Paths tab
```

**Award Badge Flow**:
```
Admin Dashboard → Users tab →
Find user in table →
Click medal icon on user row →
Badge selection dialog opens →
Check badges to award →
Click "Award Badges" →
Success toast →
Dialog closes
```

**Create Badge Flow**:
```
Admin Dashboard → Badges tab →
Click "+ Create New Badge" →
Modal opens →
Fill badge details →
Upload icon →
Click "Save Badge" →
Badge created →
Modal closes →
New badge in grid
```

---

## Navigation Sidebar

**File**: `/components/Navigation.tsx`

### Page Purpose
Persistent navigation across all pages. Provides quick access to main sections, displays user identity, shows current page, and allows logout.

### Layout Structure

```
┌─────────────────────┐
│ ChurchAcademy       │
│ Hi, John!           │
│                     │
│ [🏠 Dashboard]      │
│ [📖 Browse]         │
│ [👤 Profile]        │
│ [🏆 Leaderboard]    │
│ [🛡️ Admin]          │
│                     │
│                     │
│ ─────────────────── │
│ ⭐ 1,250 XP        │
│ ♥ 3 Lives          │
│ 💡 3 Hints         │
│ 🔥 7 Day Streak    │
│ ─────────────────── │
│                     │
│ [Sign Out]          │
└─────────────────────┘
```

### Interactive Elements

#### 1. Header Section

**Logo/Brand**:
- **Display**: "ChurchAcademy" text or logo
- **Styling**: Large, bold, dark sage
- **Position**: Top of sidebar
- **Interaction**: Optional - click to go to Dashboard

**User Greeting**:
- **Display**: "Hi, [First Name]!"
- **Example**: "Hi, John!"
- **Styling**: Friendly greeting, regular text
- **Position**: Below logo

**Avatar** (optional):
- **Display**: Small circular avatar
- **Size**: 40px
- **Position**: Next to or below greeting
- **Click**: Navigate to Profile

#### 2. Navigation Links

**Purpose**: Main navigation menu

**Link Items**:

**Dashboard Link**:
- **Label**: "Dashboard" or "Home"
- **Icon**: Home (🏠)
- **Route**: `/dashboard`
- **Active When**: currentPage === 'dashboard'

**Browse Link**:
- **Label**: "Browse Courses"
- **Icon**: BookOpen (📖)
- **Route**: `/browse`
- **Active When**: currentPage === 'browse'

**Profile Link**:
- **Label**: "My Profile"
- **Icon**: User (👤)
- **Route**: `/profile`
- **Active When**: currentPage === 'profile'

**Leaderboard Link**:
- **Label**: "Leaderboard"
- **Icon**: Trophy (🏆)
- **Route**: `/leaderboard`
- **Active When**: currentPage === 'leaderboard'

**Admin Link** (conditional):
- **Label**: "Admin"
- **Icon**: Shield (🛡️) or Settings (⚙️)
- **Route**: `/admin`
- **Active When**: currentPage === 'admin'
- **Visibility**: Only shown if `userData.isAdmin === true`

**Link Styling**:

**Active State**:
- **Background**: Sage green (#7A9B70)
- **Text Color**: White
- **Border**: Thick dark sage border
- **Icon Color**: White
- **Styling**: Rounded-2xl, shadow

**Inactive State**:
- **Background**: White or transparent
- **Text Color**: Dark sage (#3A4A46)
- **Border**: Transparent or light border
- **Icon Color**: Muted (#6B7B77)
- **Hover**: Light sage background

**All States**:
- **Layout**: Horizontal flex (icon + text)
- **Padding**: Generous (py-3, px-4)
- **Gap**: Space between icon and text
- **Transition**: Smooth background/color changes
- **Cursor**: Pointer

**Icon Sizing**:
- **Size**: 20px (w-5 h-5)
- **Position**: Left of text
- **Color**: Matches text color state

#### 3. Stats Mini Section

**Purpose**: Quick glance at key stats

**Separator**:
- **Display**: Horizontal line
- **Color**: Light border
- **Position**: Above and below stats

**Stat Items** (compact version):

**Total XP**:
- **Icon**: Star (⭐)
- **Display**: "1,250 XP"
- **Icon Color**: `#3A4A46` (dark sage)

**Lives**:
- **Icon**: Heart (♥)
- **Display**: "3 Lives"
- **Icon Color**: `#3A4A46` (dark sage)

**Hints**:
- **Icon**: Lightbulb (💡)
- **Display**: "3 Hints"
- **Icon Color**: `#3A4A46` (dark sage)

**Streak**:
- **Icon**: Flame (🔥)
- **Display**: "7 Day Streak"
- **Icon Color**: `#3A4A46` (dark sage)

**Styling**:
- **Layout**: Vertical stack or 2-column grid
- **Size**: Smaller than header stats
- **Padding**: Compact
- **Font**: Small but readable

#### 4. Logout Button

**Purpose**: Sign out of application

**Position**: 
- **Sticky**: Bottom of sidebar
- **Fixed**: Stays visible when scrolling
- **Spacing**: Separated from content above

**Button Styling**:
- **Label**: "Sign Out" or "Log Out"
- **Icon**: LogOut icon (door with arrow)
- **Colors**: 
  - Text: Red or dark sage
  - Border: Red thick border
  - Background: White or transparent
- **Hover**: Light red background
- **Full Width**: Spans sidebar width
- **Rounded**: rounded-2xl
- **Shadow**: Clay-style shadow

**Interaction**:
```
Click "Sign Out" →
Confirmation dialog (optional) →
Clear user session →
Navigate to Login page
```

**Confirmation Dialog** (optional):
- **Message**: "Are you sure you want to sign out?"
- **Actions**:
  - "Cancel" (stay logged in)
  - "Sign Out" (confirm logout)

#### 5. Mobile Behavior

**Closed State** (default mobile):
- **Display**: Hamburger menu icon (☰)
- **Position**: Top left corner
- **Size**: 48x48px touch target
- **Action**: Click to open sidebar

**Open State**:
- **Display**: Sidebar slides in from left
- **Overlay**: Dark semi-transparent overlay on content
- **Width**: 80% of screen or 320px max
- **Close**: Click overlay, X button, or nav link
- **Animation**: Slide transition

**Desktop Behavior**:
- **Display**: Always visible, fixed position
- **Width**: 320px (w-80)
- **Border**: Thick right border
- **Layout**: Content shifts right to accommodate

### User Flows

**Navigate Between Pages**:
```
Any page with sidebar →
Click navigation link →
Active state updates →
Page changes →
Sidebar remains visible
```

**Check Stats Quick**:
```
Any page →
Glance at sidebar stats section →
See lives, hints, XP, streak →
Make decision about learning session
```

**Logout Flow**:
```
Any page →
Click "Sign Out" button →
[Optional: Confirmation dialog] →
Session cleared →
Navigate to Login page
```

**Mobile Navigation**:
```
Mobile device →
Click hamburger menu →
Sidebar slides in →
Click nav link →
Sidebar closes →
Page changes
```

---

## Logout Screen

**File**: `/components/LogoutScreen.tsx`

### Page Purpose
Friendly farewell page shown after user logs out. Provides encouragement, reinforces learning journey, and offers easy way to log back in.

### Layout Structure

```
┌─────────────────────────────────────┐
│                                     │
│          👋 (animated wave)         │
│                                     │
│        See You Soon!                │
│   Thanks for investing in your      │
│   leadership journey today.         │
│                                     │
│   ┌─────────┐  ┌─────────┐        │
│   │ 📖 Keep  │  │ 📈 Keep  │        │
│   │ Learning │  │ Growing  │        │
│   └─────────┘  └─────────┘        │
│   ┌─────────┐  ┌─────────┐        │
│   │ ♥ Keep   │  │ 🏅 Keep  │        │
│   │ Serving  │  │ Achieving│        │
│   └─────────┘  └─────────┘        │
│                                     │
│   💡 "Leadership is not about       │
│   being in charge..."               │
│                                     │
│   ┌───────────────────────────┐   │
│   │  🔑 Back to Login        │   │
│   └───────────────────────────┘   │
│                                     │
│   Your progress is saved.          │
│   Come back anytime! 🙏            │
└─────────────────────────────────────┘
```

### Interactive Elements

#### 1. Animated Wave Emoji

**Purpose**: Friendly, playful farewell
- **Display**: Large wave emoji (👋)
- **Size**: 60px (text-6xl)
- **Animation**: Wave motion using Motion
  - Rotates: 0° → 14° → -8° → 14° → -4° → 10° → 0°
  - Duration: 1.5 seconds
  - Repeats: Once
  - Delay: 0.2s after page load
- **Easing**: easeInOut
- **Purpose**: Add personality and warmth

#### 2. Main Card Container

**Purpose**: Center content with clay styling
- **Background**: White
- **Border**: Thick 2px, dark sage (#3A4A46)
- **Border Radius**: rounded-3xl (24px)
- **Shadow**: `shadow-[0_8px_0_0_rgba(58,74,70,0.1)]`
- **Padding**: p-8 (generous spacing)
- **Max Width**: max-w-md (448px)
- **Centering**: Flexbox center in viewport
- **Animation**: Scale in from 0.9 to 1.0, fade in
- **Duration**: 0.4s

#### 3. Heading Section

**Primary Heading**:
- **Text**: "See You Soon!"
- **Styling**: Default h1 from globals.css
- **Color**: Dark sage (#3A4A46)
- **Animation**: Fade in + slide up
- **Delay**: 0.3s

**Subheading Text**:
- **Text**: "Thanks for investing in your leadership journey today. Keep growing!"
- **Color**: Muted (#6B7B77)
- **Animation**: Fade in + slide up
- **Delay**: 0.4s
- **Purpose**: Positive reinforcement

#### 4. Encouragement Cards Grid

**Purpose**: Motivational messages to return

**Layout**:
- **Grid**: 2x2 (4 cards total)
- **Gap**: gap-4 (16px)
- **Responsive**: 2 columns on all screens
- **Animation**: Fade in + slide up, delay 0.5s

**Card Styling** (all 4 cards):
- **Background**: Light sage tint (#7A9B70/10%)
- **Border**: 2px, sage green (#7A9B70)
- **Border Radius**: rounded-2xl (16px)
- **Padding**: p-4
- **Content**: Icon + text, centered

**Card 1: Keep Learning**:
- **Icon**: BookOpen (📖), 24px
- **Icon Color**: #3A4A46 (dark sage)
- **Text**: "Keep Learning"
- **Purpose**: Remind about learning journey

**Card 2: Keep Growing**:
- **Icon**: TrendingUp (📈), 24px
- **Icon Color**: #3A4A46 (dark sage)
- **Text**: "Keep Growing"
- **Purpose**: Emphasize personal development

**Card 3: Keep Serving**:
- **Icon**: Heart (♥), 24px
- **Icon Color**: #3A4A46 (dark sage)
- **Text**: "Keep Serving"
- **Purpose**: Connect to ministry purpose

**Card 4: Keep Achieving**:
- **Icon**: Award (🏅), 24px
- **Icon Color**: #3A4A46 (dark sage)
- **Text**: "Keep Achieving"
- **Purpose**: Celebrate accomplishments

#### 5. Quote Card

**Purpose**: Inspirational leadership quote
- **Background**: Beige tint (#FDD6A1/40%)
- **Border**: 2px, dark sage (#3A4A46)
- **Border Radius**: rounded-2xl
- **Padding**: p-4
- **Margin**: mb-6 (bottom spacing)
- **Animation**: Fade in + slide up, delay 0.6s

**Content**:
- **Emoji**: 💡 (lightbulb)
- **Quote**: "Leadership is not about being in charge. It's about taking care of those in your charge."
- **Styling**: Italic text
- **Color**: Dark sage (#3A4A46)
- **Purpose**: Leave user with meaningful thought

#### 6. Back to Login Button

**Purpose**: Primary action to return to login

**Button Styling**:
- **Type**: Primary sage green button
- **Width**: Full width (w-full)
- **Background**: #7A9B70 (sage green)
- **Hover**: #6B8A61 (darker sage)
- **Text**: White
- **Border**: 2px, #3A4A46
- **Border Radius**: rounded-2xl
- **Shadow**: `shadow-[0_4px_0_0_rgba(58,74,70,0.2)]`
- **Active State**: 
  - `active:shadow-none`
  - `active:translate-y-[2px]`
- **Transition**: All properties
- **Padding**: py-3 px-6
- **Animation**: Fade in + slide up, delay 0.7s

**Button Content**:
- **Icon**: LogIn (🔑), 20px
- **Text**: "Back to Login"
- **Layout**: Flex row, center aligned, gap-2
- **Icon Position**: Left of text

**Button Action**:
```
Click "Back to Login" →
Clear user profile →
Navigate to Login page
```

#### 7. Footer Message

**Purpose**: Reassure about progress persistence
- **Text**: "Your progress is saved. Come back anytime! 🙏"
- **Position**: Below main card
- **Color**: Muted (#6B7B77)
- **Alignment**: Centered
- **Margin**: mt-6 (top spacing)
- **Animation**: Fade in, delay 0.9s
- **Purpose**: Reduce anxiety about losing progress

### Background

**Full Page Background**:
- **Color**: Cream (#FFF8F2)
- **Min Height**: Full viewport height
- **Display**: Flexbox
- **Alignment**: Center horizontally and vertically
- **Padding**: p-6 (for mobile spacing)

### Animations

**Entry Sequence**:
1. Card scales in and fades in (0s)
2. Wave emoji animates (0.2s)
3. Heading fades in (0.3s)
4. Subtext fades in (0.4s)
5. Encouragement cards fade in (0.5s)
6. Quote card fades in (0.6s)
7. Button fades in (0.7s)
8. Footer message fades in (0.9s)

**Total Animation Time**: ~1 second

**Animation Library**: Motion (Framer Motion)
- Uses `motion.div` for animated elements
- Combines opacity, scale, and translate animations
- Smooth transitions with easing

### User Flows

**Logout Flow**:
```
User clicks "Log Out" in Navigation →
Confirmation (optional) →
Navigate to LogoutScreen →
Animations play →
User sees encouragement →
Clicks "Back to Login" →
Returns to Login page
```

**Quick Return Flow**:
```
LogoutScreen loads →
User changes mind immediately →
Clicks "Back to Login" →
Returns to Login →
Can log back in quickly
```

**Take a Break Flow**:
```
LogoutScreen loads →
User reads encouragement →
Feels motivated to return →
Closes tab/browser →
Returns later →
Login page ready
```

### Purpose & Benefits

**User Experience**:
- ✅ Not abrupt - friendly farewell
- ✅ Motivational - encourages return
- ✅ Clear action - easy to get back
- ✅ Reassuring - progress is saved
- ✅ Playful - wave animation adds personality

**Brand Value**:
- ✅ Reinforces learning mission
- ✅ Shows care for user journey
- ✅ Maintains clay-style consistency
- ✅ Positive emotional close

**Technical Benefits**:
- ✅ Clear session end point
- ✅ User explicitly logged out
- ✅ Clean state transition
- ✅ No confusion about status

### Responsive Design

**Desktop** (≥1024px):
- Card centered in viewport
- All animations visible
- Comfortable spacing

**Tablet** (768px - 1024px):
- Card adapts to width
- Maintains all features
- Readable text sizes

**Mobile** (<768px):
- Full width card (with padding)
- Grid remains 2x2
- Text stays readable
- Touch-friendly button
- All animations preserved

### Accessibility

**Keyboard Navigation**:
- Button is focusable
- Enter key activates
- Tab order logical

**Screen Readers**:
- Heading hierarchy clear
- Button has descriptive text
- Icons are decorative (aria-hidden implied)
- Quote is readable

**Color Contrast**:
- Dark sage on cream: ✅ Passes WCAG AA
- White on sage green: ✅ Passes WCAG AA
- Muted text: ✅ Adequate contrast

**Reduced Motion**:
- Animations respect `prefers-reduced-motion`
- Core functionality works without animations
- Button always visible and functional

### Future Enhancements

Potential additions:
- Show user's final stats (XP earned today)
- Display badges earned this session
- Add social share option
- Show streak preservation info
- Suggest returning tomorrow for streak
- Quick actions (schedule next session)

---

## Summary

This documentation provides a complete inventory of all pages, their purposes, interactive elements, content areas, and user flows. Each button, input, and significant content div is documented with:

- **Purpose**: Why it exists
- **Behavior**: What it does
- **Styling**: How it looks (clay-style)
- **States**: Different appearances
- **Interactions**: How users engage with it
- **User Flows**: Complete journey paths

Use this as a reference for:
- Development implementation
- QA testing checklists  
- User training and onboarding
- Feature documentation
- Handoff to other teams
- Future enhancements planning

**Last Updated**: January 2025  
**Version**: 1.1 - Added Logout Screen
