# Reflection Question System - Implementation Guide

## Overview
The Reflection Question System allows learners to write thoughtful responses to open-ended questions throughout their learning paths, and enables admins/mentors to provide personalized feedback.

---

## User-Facing Features

### 1. My Reflections Page
**Access**: Navigation sidebar → "My Reflections"

**Features**:
- View all submitted reflections organized by learning path
- Filter by:
  - Learning path
  - Feedback status (All / With Feedback / Awaiting Feedback)
- Expandable cards showing:
  - The reflection question
  - User's written response
  - Admin feedback (when available)
  - Submission date
  - Featured badge (for exceptional reflections)
- Visual indicators:
  - "New Feedback" badge for recent feedback
  - "Featured" badge for highlighted reflections
  - Status badges (Reviewed vs Pending)

### 2. Reflection Questions During Learning
**Location**: Embedded within learning paths (LearningScenario.tsx)

**Features**:
- Cozy, encouraging interface with guidance text
- Minimum character count (default: 100 characters)
- Real-time word counter
- Auto-save indicator
- No "wrong answers" - reflections always award full points
- Don't cost lives if incomplete (just can't continue until minimum met)

---

## Admin Features

### Admin Reflections Panel
**Access**: Admin Dashboard → "Reflections" tab

**Features**:
- Dashboard with key metrics:
  - Total reflections count
  - Pending feedback count (highlighted in coral)
  - Reviewed count (highlighted in sage green)
  
- Powerful filtering:
  - Search by user name or content
  - Filter by learning path
  - Filter by status (All / Pending / Reviewed)
  
- Reflection management:
  - Expandable table rows to view full reflection
  - In-line feedback editor
  - "Mark as Featured" checkbox to highlight exceptional work
  - Save feedback button
  - Real-time status updates

**Workflow**:
1. Admin clicks "View" on any reflection
2. Row expands showing:
   - The question asked
   - User's full reflection text
   - Feedback textarea (pre-filled if already reviewed)
   - Featured checkbox
3. Admin writes encouraging feedback
4. Clicks "Save Feedback"
5. Reflection instantly moves to "Reviewed" status
6. User sees feedback on their "My Reflections" page

---

## Technical Implementation

### Data Structure

**Reflection Object**:
```javascript
{
  id: 1,
  userId: 15,
  userName: 'Sarah Martinez',
  userEmail: 'sarah@church.org',
  pathId: 1,
  pathTitle: 'Leadership Fundamentals',
  chapterId: 2,
  chapterTitle: 'Servant Leadership',
  questionId: 5,
  question: 'Reflection question text...',
  reflectionText: 'User's response...',
  submittedAt: '2025-01-15T10:30:00Z',
  lastEditedAt: null, // Future: allow editing
  adminFeedback: {
    text: 'Admin feedback text...',
    adminName: 'Pastor John',
    adminId: 5,
    feedbackAt: '2025-01-16T09:15:00Z',
    isFeatured: true
  },
  isPublic: false, // Future: peer feedback feature
  status: 'reviewed' // or 'pending'
}
```

**Question Definition** (in scenarioData):
```javascript
{
  type: 'reflection',
  id: 'leadership-reflection-1',
  question: 'Reflect on a time when...',
  guidance: 'Think about a specific situation...',
  minCharacters: 100,
  maxCharacters: 1000,
  points: 10
}
```

### File Components

**New Components**:
- `/components/MyReflections.tsx` - User's reflection viewing page
- `/components/AdminReflections.tsx` - Admin feedback panel
- `/components/LearningScenario.tsx` - Updated with ReflectionQuestion component

**Updated Components**:
- `/App.tsx` - Added myReflections route
- `/components/Navigation.tsx` - Added "My Reflections" nav link
- `/components/AdminDashboard.tsx` - Added "Reflections" tab

### Key Functions

**In LearningScenario.tsx**:
- `ReflectionQuestion` component - Renders the reflection input interface
- `handleSubmit` - Modified to handle reflection type (always "correct")
- `isAnswerComplete` - Checks if minimum character count is met
- `getFeedbackContent` - Returns encouraging message for reflections

**State Management**:
- `reflectionText` - Local state for current reflection
- Mock data arrays in MyReflections and AdminReflections (ready for Supabase)

---

## Scoring & Gamification

### How Reflections Affect Progress
- **Points**: Reflections award points (typically 10 points)
- **Lives**: Never cost lives (can't be "wrong")
- **Completion**: Must meet minimum character count to continue
- **XP**: Contributes to total chapter/path XP

### Progression Logic
- User writes reflection
- Clicks "Check" when minimum words reached
- Receives confirmation message
- Reflection saved (currently mock, ready for backend)
- Can continue to next question
- Full points awarded automatically

---

## Future Enhancements

### Planned Features
1. **Peer Feedback System**:
   - Make reflections optionally public
   - Allow learners to read and comment on others' reflections
   - "Helpful" voting system
   
2. **Reflection Editing**:
   - Allow users to revise reflections before mentor reviews
   - Track edit history
   
3. **Mentor Assignment**:
   - Assign specific mentors to specific users
   - Notification system when new reflections arrive
   
4. **Reflection Templates**:
   - Pre-formatted question types (STAR method, etc.)
   - Guided prompts for deeper thinking
   
5. **Analytics**:
   - Track reflection engagement rates
   - Average word counts
   - Feedback turnaround time
   - Most featured reflections

### Database Integration (Supabase)

**Tables Needed**:
```sql
-- reflections table
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  path_id INTEGER REFERENCES learning_paths(id),
  chapter_id INTEGER,
  question_id TEXT,
  question_text TEXT,
  reflection_text TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_at TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending'
);

-- reflection_feedback table
CREATE TABLE reflection_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reflection_id UUID REFERENCES reflections(id),
  admin_id UUID REFERENCES users(id),
  admin_name TEXT,
  feedback_text TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- peer_comments table (future)
CREATE TABLE peer_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reflection_id UUID REFERENCES reflections(id),
  user_id UUID REFERENCES users(id),
  comment_text TEXT,
  is_helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**API Endpoints Needed**:
- `POST /reflections` - Submit new reflection
- `GET /reflections/user/:userId` - Get user's reflections
- `GET /reflections/pending` - Get reflections awaiting feedback (admin)
- `POST /reflections/:id/feedback` - Submit admin feedback
- `PATCH /reflections/:id` - Update reflection text
- `PATCH /reflections/:id/feature` - Toggle featured status

---

## UX Design Principles

### For Learners
- **Encouraging Language**: "Share your thoughts... There are no wrong answers"
- **Non-Threatening**: Soft colors (sage green), rounded corners, gentle prompts
- **Progress Indicators**: Word counter, save status
- **Feedback Celebration**: New feedback gets highlighted badge
- **Easy Access**: Dedicated nav item, filterable view

### For Admins
- **Efficiency First**: In-line editing, one-click expand/collapse
- **Clear Priorities**: Pending reflections highlighted in warm coral
- **Powerful Filtering**: Search, path filter, status filter work together
- **Encouraging Tone**: Prompts to give "encouraging and constructive feedback"
- **Recognition System**: Featured checkbox to highlight great work

---

## Testing Checklist

### User Flow Testing
- [ ] Navigate to "My Reflections" from sidebar
- [ ] Filters work correctly (path, status)
- [ ] Reflections expand and collapse properly
- [ ] Feedback displays when available
- [ ] Featured badge shows correctly
- [ ] "New Feedback" badge appears for recent feedback
- [ ] Mobile responsive layout works

### Learning Flow Testing
- [ ] Reflection question appears in learning path
- [ ] Word counter updates in real time
- [ ] Can't continue until minimum words met
- [ ] Auto-save indicator appears
- [ ] Full points awarded on completion
- [ ] Reflection saved (check console.log)
- [ ] No lives lost for incomplete reflection

### Admin Flow Testing
- [ ] "Reflections" tab appears in Admin Dashboard
- [ ] Stats cards show correct counts
- [ ] Search works across name and content
- [ ] Filters update results correctly
- [ ] Can expand multiple reflections
- [ ] Feedback textarea works
- [ ] Featured checkbox toggles
- [ ] Save button updates status
- [ ] Reviewed reflections show green badge

---

## Current Limitations (Prototype)

1. **No Real Database**: Currently using mock data arrays
2. **No Persistence**: Reflections don't save between sessions
3. **No Notifications**: Users don't get notified of new feedback
4. **No Editing**: Can't edit reflections after submission
5. **Single Admin**: No admin assignment or routing
6. **No Search Highlighting**: Search doesn't highlight matched text

These are all ready to implement once Supabase is connected!

---

## Design System Alignment

### Colors Used
- **Sage Green** (#7A9B70): Positive feedback, reviewed status
- **Coral** (#E66E5A): Pending status, "New Feedback" badge
- **Cream** (#FFF8F2): Background, neutral cards
- **Dark Sage** (#3A4A46): Text, borders

### Components Used
- Shadcn Card, Badge, Button, Textarea, Select, Table
- Motion animations for expand/collapse
- Lucide icons (MessageSquare, BookOpen, Star, Calendar, etc.)

### Typography
- All typography follows globals.css defaults
- No custom font size/weight classes used
- Semantic HTML for accessibility

---

## Support & Maintenance

### Common Issues

**"My reflection isn't showing"**
- Check console for save confirmation
- Currently mock data - won't persist

**"Admin tab not appearing"**
- User must have `isAdmin: true` in userData
- Check App.tsx routing

**"Can't continue after writing reflection"**
- Must meet minimum character count (100 by default)
- Check word counter at bottom

### Code Locations
- Question definition: `LearningScenario.tsx` lines 215-224
- User reflections page: `MyReflections.tsx`
- Admin panel: `AdminReflections.tsx`
- Routing: `App.tsx` line 258
- Navigation link: `Navigation.tsx` line 38

---

**Last Updated**: January 2025  
**Status**: ✅ Fully Implemented (Frontend Prototype)  
**Next Step**: Supabase Integration
