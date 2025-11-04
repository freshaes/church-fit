# ChurchAcademy Changelog

## Recent Updates (Current Session)

### 🎨 PathEditorFull Enhancements
**Date**: Current Session

#### Added Fields to Learning Path Editor

The admin panel's full path editor (`PathEditorFull.tsx`) now includes comprehensive metadata fields that match the Browse Lessons front-end display:

**New Fields Added:**
1. **Difficulty Level** - Dropdown selector with 3 levels:
   - Foundation (Perfect for beginners)
   - Intermediate (Some experience helpful)
   - Expert (Advanced concepts)

2. **Estimated Time** - Text input field
   - Examples: "6 hours", "4 weeks", "2 months"
   - Displays on course cards and detail pages

3. **Categories** - Multi-select checkboxes with 12 options:
   - Leadership, Communication, Team Building
   - Community, Relationships, Conflict Resolution
   - Spiritual Growth, Ministry Skills, Administration
   - Worship, Youth Ministry, Pastoral Care
   - Shows selected categories as badges below checkboxes
   - Used for filtering and discovery on Browse page

4. **XP Reward** - Number input (default: 300)
   - Total experience points awarded for path completion
   - Separate from individual question points
   - Helps users understand path value

5. **Thumbnail Image URL** - Text input with live preview
   - Displays the course card image
   - Shows on Browse Lessons page
   - Clay-style bordered preview
   - Helper text explains usage

**UI Organization:**
- All new fields in "Basic Information" card
- Categories get dedicated card section
- Difficulty and Time in 2-column grid layout
- Professional helper text throughout

**Data Structure Update:**
- Updated dummy path data in PathEditorFull.tsx
- Updated Guidelines.md Learning Path structure
- All fields properly integrated with state management

---

### 🎯 Onboarding Path Selection Improvements
**Date**: Current Session

#### Single Path Selection (Simplified UX)

Changed the onboarding path recommendation step from multi-select to single-select for better focus:

**Changes Made:**
1. **State Management:**
   - Changed from `selectedPaths` (array) → `selectedPath` (single value)
   - Updated `handlePathToggle()` → `handlePathSelect()`
   - Button validation: checks for single selection instead of array length

2. **UI/UX Updates:**
   - Heading: "Your Personalized Paths" → "Your Recommended Path"
   - Description: "we've curated these" → "we recommend starting with one of these"
   - Helper text: "Select 1-3 paths" → "Choose the path that interests you most"
   - Clearer single-selection UX with green highlight on selected card

3. **Terminology Change:**
   - Removed "Personalized" to avoid US/UK spelling confusion
   - Now uses "Recommended" throughout
   - More accurate - paths are recommended based on role/goals

4. **Username Field Added:**
   - Added username field in Step 4 (Account Creation)
   - Positioned above email address
   - Required field with validation
   - Username included in user data structure

5. **Login Page Streamlined:**
   - Removed password strength indicator from Login.tsx
   - Password strength kept in Onboarding.tsx for new account creation
   - Cleaner, simpler login experience for returning users
   - No visual feedback during password entry (login only validates on submit)

**Benefits:**
- Simpler decision making for new users
- Clearer onboarding flow
- Reduced cognitive load
- Users can explore more paths after onboarding
- Unique username for better user identification
- Faster, distraction-free login for returning users

---

### 🔧 File Structure Maintenance

**Recurring Issue Fixed:**
- System files (LICENSE, public/_redirects) keep becoming directories with React components
- Fixed in this session (cleaned up multiple times)
- These should remain simple text files

---

## Previous Major Updates

### Version 1.0 - Full Prototype Release

**Complete Features:**
- ✅ 6 question types with media support
- ✅ Lives and hints system
- ✅ Points breakdown with bonuses
- ✅ Clay-style UI throughout
- ✅ Admin panel with full CRUD
- ✅ Profile with avatar upload
- ✅ Course browsing and filtering
- ✅ Results screen with star ratings
- ✅ Leaderboard system
- ✅ Logout screen
- ✅ Comprehensive documentation

**Major Refactors:**
- Question system optimization
- Spacing improvements (Results & Onboarding)
- Admin path editor architecture

---

## Coming Soon

Potential future enhancements:
- Supabase integration for persistence
- Real-time features
- Progress analytics
- Mobile app version
- Multi-language support
- Social sharing features

---

**Last Updated**: January 16, 2025
