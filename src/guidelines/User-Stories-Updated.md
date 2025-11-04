# ChurchAcademy User Stories - Updated Edition

Complete user journeys reflecting recent platform updates including username field, single-path onboarding, and streamlined login.

**Last Updated**: January 17, 2025  
**Version**: 2.0 (Updated)

---

## 📋 Document Updates

### Recent Changes Reflected:
- ✅ **Username field** added to onboarding step 4 (above email)
- ✅ **Single recommended path** selection in step 6 (was multi-select)
- ✅ **Password strength indicator** removed from login (kept in onboarding only)
- ✅ Updated PathEditorFull fields (difficulty, time, categories, XP, thumbnail)
- ✅ Logout screen with friendly farewell
- ✅ All flows updated to match current implementation

---

## Table of Contents

1. [User Personas](#user-personas)
2. [Core User Journeys](#core-user-journeys)
3. [Admin User Journeys](#admin-user-journeys)
4. [Edge Cases & Recovery](#edge-cases--recovery)
5. [Success Metrics](#success-metrics)

---

## User Personas

### 1. Sarah - New Youth Minister
**Profile**:
- Age: 26, recently appointed Youth Minister
- Experience: First leadership role
- Goals: Build confidence, connect with teens
- Tech comfort: High
- Time available: 20-30 min/day
- Pain points: Feels overwhelmed, unsure of best practices

### 2. Pastor Mike - Senior Pastor
**Profile**:
- Age: 45, 10 years ministry experience
- Experience: Leading 500-person congregation
- Goals: Improve communication, resolve conflicts
- Tech comfort: Medium
- Time available: 15 min sessions, irregular schedule
- Pain points: Board meetings, difficult conversations

### 3. Maria - Volunteer Small Group Leader
**Profile**:
- Age: 34, full-time job + volunteer leader
- Experience: Leading women's small group for 2 years
- Goals: Create unity, grow as leader
- Tech comfort: Medium
- Time available: 2-3 times per week
- Pain points: Limited time, needs practical quick wins

### 4. David - Admin/Director of Ministry Development
**Profile**:
- Age: 38, oversees leadership training
- Experience: Managing church-wide leadership development
- Goals: Create custom training, track progress
- Tech comfort: High
- Time available: Daily for admin tasks
- Pain points: Generic training doesn't fit specific needs

---

## Core User Journeys

## Journey 1: Sarah - First-Time User (Complete Flow)

### Context
Sarah's senior pastor recommended ChurchAcademy during her first week as Youth Minister. She's nervous but eager to learn.

### Timeline: Sunday Evening (30 minutes total)

---

#### Act 1: Discovery & Onboarding (10 minutes)

**Entry Point**: Sarah receives email invite from pastor

```
7:00 PM - Opens link on laptop
└─ Lands on Login page
   - Heading: "Welcome Back!"
   - Subheading: "Sign in to continue your leadership journey"
   - Email and Password fields
   - Button: "Sign In"
   - Link: "Don't have an account? Sign Up" ← Clicks here

7:01 PM - Onboarding begins
└─ STEP 1 OF 6: Role Selection
   - Heading: "What's your role in church leadership?"
   - Helper text: "We'll personalize your learning experience"
   - 6 role cards displayed in grid:
     
     ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
     │ 🏛️               │ │ 👥               │ │ 🎵               │
     │ Senior Pastor   │ │ Youth Minister  │ │ Worship Leader  │
     │ Leading the     │ │ Mentoring young │ │ Leading musical │
     │ congregation    │ │ people          │ │ worship         │
     └─────────────────┘ └─────────────────┘ └─────────────────┘
     
     ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
     │ 💼               │ │ ❤️               │ │ 💻               │
     │ Admin Team      │ │ Volunteer Lead  │ │ Tech Team       │
     │ Church ops &    │ │ Coordinating    │ │ Technology &    │
     │ administration  │ │ volunteers      │ │ media           │
     └─────────────────┘ └─────────────────┘ └─────────────────┘
   
   - Sarah clicks "Youth Minister" card
   - Card highlights in sage green with checkmark
   - "Continue" button appears
   - Clicks Continue

7:02 PM - STEP 2 OF 6: Goals Selection
   - Heading: "What leadership skills do you want to develop?"
   - Helper text: "Select at least 2 goals that matter most to you"
   - 5 checkboxes:
     ☐ Lead with Confidence
     ☐ Speak with Clarity
     ☐ Create Team Unity
     ☐ Resolve Conflicts Fast
     ☐ Develop Your People
   
   - Sarah selects:
     ☑ Lead with Confidence  ← Primary fear
     ☑ Create Team Unity     ← Youth group needs this
   - "Continue" button enables (needs min. 2)
   - Clicks Continue

7:03 PM - STEP 3 OF 6: Time Commitment
   - Heading: "How much time can you dedicate to learning?"
   - Helper text: "This helps us pace your journey"
   - 4 options (radio buttons):
     ○ 15 minutes per day
     ◉ 20-30 minutes per day  ← Sarah selects
     ○ 1 hour per day
     ○ Weekends only
   
   - Clicks Continue

7:04 PM - STEP 4 OF 6: Create Account ⭐ UPDATED
   - Heading: "Create your account"
   - Helper text: "You're almost ready to start learning!"
   
   Fields (in order):
   
   1. Username: [________________]
      - Label: "Choose a username"
      - Helper: "3-20 characters, letters, numbers, underscore"
      - Sarah types: "sarah_youth"
      - ✓ Green checkmark appears (valid)
   
   2. Email Address: [_________________________]
      - Label: "Email address"
      - Helper: "We'll use this to save your progress"
      - Sarah types: "sarah@gracechurch.org"
      - ✓ Green checkmark appears
   
   3. Password: [_________________________]
      - Label: "Create password"
      - Sarah types: "Grace2025!"
      - Password strength meter appears: ████████░░ Strong ✓
      - Requirements shown:
        ✓ At least 8 characters
        ✓ Contains uppercase letter
        ✓ Contains number
        ✓ Contains special character
   
   4. Confirm Password: [_________________________]
      - Sarah retyp es: "Grace2025!"
      - ✓ Passwords match
   
   - All fields valid
   - "Continue" button enabled
   - Clicks Continue

7:05 PM - STEP 5 OF 6: Church Information
   - Heading: "Tell us about your church"
   - Helper text: "Optional - helps us serve you better"
   
   Fields:
   1. Church Name: [_________________________]
      - Sarah types: "Grace Community Church"
   
   2. Country/Region: [Select country ▼]
      - Dropdown with flags
      - Sarah selects: "🇺🇸 United States"
   
   3. Congregation Size: [Select size ▼]
      - Options: <100, 100-300, 300-1000, 1000+
      - Sarah selects: "100-300"
   
   - "Continue" button enabled (all optional)
   - Clicks Continue

7:06 PM - STEP 6 OF 6: Recommended Path ⭐ UPDATED
   - Heading: "Your Recommended Path"
   - Helper text: "Based on your role and goals, we recommend 
     starting with one of these paths. You can explore more later!"
   
   3 path cards shown (single selection):
   
   ┌─────────────────────────────────────────────────────────┐
   │ [Image: Teens in discussion]                            │
   │                                                          │
   │ Youth Ministry Leadership                 🎯 Top Pick!  │
   │ ○ (Radio button)                                        │
   │                                                          │
   │ Master essential skills for leading youth effectively   │
   │ through relationships, programs, and spiritual growth.  │
   │                                                          │
   │ 📖 8 chapters | 🕒 6 hours | 🎓 Foundation             │
   │                                                          │
   │ ✨ Why this?                                            │
   │ Matches your role: Youth Minister                       │
   │ Addresses: Lead with Confidence, Create Team Unity      │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ [Image: Team meeting]                                   │
   │                                                          │
   │ Building Strong Communities               🎯 Great Fit  │
   │ ○ (Radio button)                                        │
   │                                                          │
   │ Create unified, thriving communities through trust,     │
   │ inclusion, and service.                                 │
   │                                                          │
   │ 📖 6 chapters | 🕒 4 hours | 🎓 Foundation             │
   │                                                          │
   │ ✨ Why this?                                            │
   │ Addresses: Create Team Unity                            │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ [Image: Speaker at mic]                                 │
   │                                                          │
   │ Communication Excellence                 🎯 Recommended │
   │ ○ (Radio button)                                        │
   │                                                          │
   │ Master public speaking, difficult conversations, and    │
   │ vision casting.                                         │
   │                                                          │
   │ 📖 7 chapters | 🕒 4 weeks | 🎓 Intermediate           │
   │                                                          │
   │ ✨ Why this?                                            │
   │ Addresses: Lead with Confidence                         │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah reads all three options
   - Hovers over "Youth Ministry Leadership"
   - Thinks: "This is exactly what I need!"
   - Clicks radio button ◉ Youth Ministry Leadership
   - Card highlights in sage green
   - "Start Your Journey →" button appears
   - Clicks button

7:08 PM - Account Created!
   - Brief loading animation
   - Confetti animation 🎉
   - Toast notification: "Welcome to ChurchAcademy, sarah_youth!"
   - Navigates to Dashboard
```

**Emotions**: Excited, hopeful, ready to learn  
**Time elapsed**: 8 minutes  
**Drop-off risk**: Low (clear progress, engaging)

---

#### Act 2: First Learning Session (20 minutes)

```
7:08 PM - Dashboard First View
└─ Layout:
   ┌─────────────────────────────────────────────────────────┐
   │ Navigation Sidebar (left)                               │
   │ - Logo: ChurchAcademy                                   │
   │ - "Hi, sarah_youth!" (with small avatar)                │
   │ - Dashboard (active)                                    │
   │ - Browse Courses                                        │
   │ - My Profile                                            │
   │ - Leaderboard                                           │
   │ - Logout                                                │
   └─────────────────────────────────────────────────────────┘
   
   Main Content:
   ┌─────────────────────────────────────────────────────────┐
   │ Welcome back, sarah_youth!                              │
   │ Continue your leadership journey                        │
   │                                                          │
   │ Stats (horizontal badges):                              │
   │ [⭐ 0 XP] [❤️ 5 Lives] [💡 3 Hints] [🔥 0 Streak] [🏆 Level 1] │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ Your Learning Paths                                     │
   │                                                          │
   │ ┌─────────────────────────────────────────────────────┐│
   │ │ [Image: Teens in discussion]                        ││
   │ │                                                      ││
   │ │ Youth Ministry Leadership                           ││
   │ │ Master essential skills for leading youth...        ││
   │ │                                                      ││
   │ │ Progress: [░░░░░░░░] 0% (0/8 chapters)             ││
   │ │                                                      ││
   │ │ 📖 8 chapters | 🕒 6 hours | 🎓 Foundation         ││
   │ │                                                      ││
   │ │ [Start Learning →]                                  ││
   │ └─────────────────────────────────────────────────────┘│
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ Recommended for You                                     │
   │ (2 more paths shown for later exploration)              │
   └─────────────────────────────────────────────────────────┘

7:09 PM - Starts First Chapter
   - Sarah clicks "Start Learning →"
   - Smooth transition animation
   - LearningScenario page loads
   
   Header:
   ┌─────────────────────────────────────────────────────────┐
   │ ← Back  |  Youth Ministry Leadership - Chapter 1        │
   │                                                          │
   │ ❤️ 5 Lives  |  💡 3 Hints  |  Progress: Question 1/8   │
   │ Progress bar: [█░░░░░░░░] 12.5%                         │
   └─────────────────────────────────────────────────────────┘

7:10 PM - Question 1: Content Slide
   ┌─────────────────────────────────────────────────────────┐
   │ [Image: Happy teens at youth group]                     │
   │                                                          │
   │ Welcome to Youth Ministry Leadership                    │
   │                                                          │
   │ In this chapter, you'll learn how to:                   │
   │ • Build authentic relationships with teenagers          │
   │ • Create safe spaces for spiritual conversations        │
   │ • Navigate the unique challenges of youth culture       │
   │ • Develop trust with both teens and parents             │
   │                                                          │
   │ Let's get started on your journey to confident,         │
   │ effective youth leadership!                             │
   │                                                          │
   │ [Continue →]                                            │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah reads content
   - Feels: "This is relevant!"
   - Clicks Continue
   - Progress updates: 2/8

7:11 PM - Question 2: Multiple Choice
   ┌─────────────────────────────────────────────────────────┐
   │ A teen in your youth group has been withdrawn and quiet │
   │ for the past few weeks. What's your approach?           │
   │                                                          │
   │ 💡 Use Hint (3 left)                                    │
   │                                                          │
   │ ○ A. Give them space and time to come to you            │
   │      Sometimes teens need privacy                       │
   │                                                          │
   │ ○ B. Have a private, one-on-one conversation            │
   │      Personal connection shows you care                 │
   │                                                          │
   │ ○ C. Ask their friends to check on them                 │
   │      Peers can relate better to teen issues             │
   │                                                          │
   │ ○ D. Address it publicly in the youth group             │
   │      Open discussion prevents isolation                 │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah thinks: "I should reach out personally..."
   - Clicks option B
   - Option highlights in light sage green
   
   Feedback appears:
   ┌─────────────────────────────────────────────────────────┐
   │ ✓ Perfect!                                              │
   │                                                          │
   │ Having a private conversation shows you care and gives  │
   │ the teen a safe space to open up. Teens need to know    │
   │ they matter individually, not just as part of the group.│
   │                                                          │
   │ +5 XP earned!                                           │
   │                                                          │
   │ [Continue →]                                            │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah feels: Validated, encouraged
   - Clicks Continue
   - Progress: 3/8

7:13 PM - Question 3: True/False
   ┌─────────────────────────────────────────────────────────┐
   │ Youth ministry is primarily about planning fun          │
   │ activities and events.                                  │
   │                                                          │
   │ 💡 Use Hint (3 left)                                    │
   │                                                          │
   │ [True]  [False]                                         │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah thinks: "No, it's about discipleship"
   - Clicks "False"
   - Button turns green with checkmark
   
   Feedback:
   ┌─────────────────────────────────────────────────────────┐
   │ ✓ Correct!                                              │
   │                                                          │
   │ While activities are important, youth ministry's core   │
   │ is spiritual formation and discipleship. Events are     │
   │ tools, not the goal.                                    │
   │                                                          │
   │ +5 XP earned!                                           │
   │                                                          │
   │ [Continue →]                                            │
   └─────────────────────────────────────────────────────────┘
   
   - Progress: 4/8

7:15 PM - Question 4: Multiple Choice (Incorrect Answer)
   ┌─────────────────────────────────────────────────────────┐
   │ What's the most important factor in building trust      │
   │ with teenagers?                                         │
   │                                                          │
   │ 💡 Use Hint (3 left)                                    │
   │                                                          │
   │ ○ A. Being cool and relatable                           │
   │ ○ B. Having all the answers to their questions          │
   │ ○ C. Consistent presence and authenticity               │
   │ ○ D. Sharing personal stories about your teen years     │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah unsure, selects A (seems logical)
   - Option turns RED with ✗ icon
   - Lives decrease: ❤️ 5 → ❤️ 4 (heart shake animation)
   
   Feedback:
   ┌─────────────────────────────────────────────────────────┐
   │ ✗ Not quite                                             │
   │                                                          │
   │ While relatability helps, teens see through "trying to  │
   │ be cool." They value authenticity and consistent        │
   │ presence more than being trendy.                        │
   │                                                          │
   │ The best answer is C: Consistent presence and           │
   │ authenticity.                                           │
   │                                                          │
   │ +2 XP (partial credit for effort)                       │
   │                                                          │
   │ [Continue →]                                            │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah thinks: "Oh, that makes sense!"
   - Learns from mistake
   - Not discouraged
   - Progress: 5/8

7:17 PM - Question 5: Matching (Uses Hint)
   ┌─────────────────────────────────────────────────────────┐
   │ Match each ministry approach with the teen development  │
   │ stage it best serves.                                   │
   │                                                          │
   │ 💡 Use Hint (3 left) ← Sarah clicks this                │
   └─────────────────────────────────────────────────────────┘
   
   Hint appears:
   ┌─────────────────────────────────────────────────────────┐
   │ 💡 Hint                                                 │
   │                                                          │
   │ Think about how independence and peer influence grow    │
   │ as teens mature. Younger teens need more structure,     │
   │ while older teens need more autonomy.                   │
   │                                                          │
   │ Hints remaining: 2                                      │
   └─────────────────────────────────────────────────────────┘
   
   Matching interface:
   ┌────────────────────┐     ┌────────────────────┐
   │ Left (Drag)        │     │ Right (Drop)       │
   ├────────────────────┤     ├────────────────────┤
   │ Early teens        │ ──> │ Peer-led learning  │
   │ (11-13)            │     │                    │
   │                    │     │ Structured         │
   │ Middle teens       │ ──> │ activities         │
   │ (14-16)            │     │                    │
   │                    │     │ Mentoring          │
   │ Older teens        │ ──> │ relationships      │
   │ (17-18)            │     │                    │
   │                    │     │ Service leadership │
   └────────────────────┘     └────────────────────┘
   
   - Using hint, Sarah correctly matches:
     Early teens → Structured activities
     Middle teens → Mentoring relationships
     Older teens → Service leadership
   - Color-coded matches appear
   - Clicks "Check Answer"
   - All green checkmarks ✓✓✓
   - +5 XP earned
   - Progress: 6/8

7:20 PM - Question 6: Fill in the Blank
   ┌─────────────────────────────────────────────────────────┐
   │ Drag the words to complete the sentence:                │
   │                                                          │
   │ "Effective youth ministry requires more _________ than  │
   │ programs and more _________ than perfection."           │
   │                                                          │
   │ Word bank:                                              │
   │ [relationships] [activities] [authenticity] [structure] │
   │ [entertainment] [success] [truth] [fun]                 │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah drags "relationships" to first blank
   - Drags "authenticity" to second blank
   - Clicks "Check Answer"
   - Both blanks turn green ✓✓
   - +5 XP earned
   - Progress: 7/8

7:22 PM - Question 7: Multiple Answer
   ┌─────────────────────────────────────────────────────────┐
   │ Which are essential elements of a healthy youth         │
   │ ministry? (Select all that apply)                       │
   │                                                          │
   │ ☐ A. Weekly large group meetings                        │
   │ ☐ B. Regular one-on-one time with teens                 │
   │ ☐ C. Expensive retreats and events                      │
   │ ☐ D. Parent communication and involvement               │
   │ ☐ ☐ E. Professional-quality worship team                 │
   │ ☐ F. Safe space for questions and doubts                │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah selects: B, D, F
   - Clicks "Check Answer"
   - All three correct ✓✓✓
   - Missed one correct answer (A) but no penalty
   - Shows: "You got all you selected correct, but missed: A"
   - +5 XP earned
   - Progress: 8/8

7:24 PM - Question 8: True/False (Final Question)
   - Sarah answers correctly
   - +5 XP
   - "Continue →" button changes to "See Results →"
   - Sarah excited, clicks button

7:25 PM - Results Screen
   ┌─────────────────────────────────────────────────────────┐
   │                    🎉 Confetti animation 🎉             │
   │                                                          │
   │                         🏆                               │
   │                  (Gold trophy with sparkle)             │
   │                                                          │
   │              Chapter Complete!                          │
   │                                                          │
   │         Youth Ministry Leadership - Chapter 1           │
   │                                                          │
   │                   ⭐⭐⭐                                  │
   │                  87% Correct                            │
   │                                                          │
   │           [████████████████░░] 87%                       │
   │                                                          │
   │              ✓ Passed - 70% required                    │
   │                                                          │
   │         ┌─────────┐  ┌─────────┐                        │
   │         │ ✓       │  │ ✗       │                        │
   │         │ 7       │  │ 1       │                        │
   │         │ Correct │  │ Wrong   │                        │
   │         └─────────┘  └─────────┘                        │
   │                                                          │
   │         Points Breakdown:                               │
   │         ┌────────────────────────────┐                  │
   │         │ Question Points:      +37  │                  │
   │         │   7 correct (×5)      +35  │                  │
   │         │   1 incorrect (×2)    +2   │                  │
   │         │                            │                  │
   │         │ Chapter Completion:   +50  │                  │
   │         │ ────────────────────────── │                  │
   │         │ Total Points:         +87  │                  │
   │         └────────────────────────────┘                  │
   │                                                          │
   │         "Great job! You're making excellent progress."  │
   │                                                          │
   │         ↗ +87 XP earned!                                │
   │                                                          │
   │    [Continue to Next Chapter →]  [Review Missed (1)]    │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah feels: ACCOMPLISHED!
   - Sees she earned bonus points
   - Understands scoring system
   - Motivated to continue
   - Clicks "Continue to Next Chapter"

7:28 PM - Returns to Dashboard (Updated)
   ┌─────────────────────────────────────────────────────────┐
   │ Welcome back, sarah_youth!                              │
   │                                                          │
   │ Stats (updated):                                        │
   │ [⭐ 87 XP] [❤️ 4 Lives] [💡 2 Hints] [🔥 1 Streak] [🏆 Level 2] │
   │                            ↑                  ↑            ↑   │
   │                       Used 1 life     Started streak  Leveled up!│
   └─────────────────────────────────────────────────────────┘
   
   NEW SECTION appears:
   ┌─────────────────────────────────────────────────────────┐
   │ Continue Learning                                       │
   │                                                          │
   │ ┌─────────────────────────────────────────────────────┐│
   │ │ Youth Ministry Leadership                           ││
   │ │ Progress: [██░░░░░░] 12.5% (1/8 chapters)          ││
   │ │                                                      ││
   │ │ Next: Chapter 2 - Building Relationships            ││
   │ │                                                      ││
   │ │ [Continue Chapter 2 →]                              ││
   │ └─────────────────────────────────────────────────────┘│
   └─────────────────────────────────────────────────────────┘
   
   - Sarah sees clear path to continue
   - Progress saved automatically
   - Decides to take a break
   - Clicks "Logout" in sidebar

7:29 PM - Logout Screen ⭐ NEW FEATURE
   ┌─────────────────────────────────────────────────────────┐
   │                         👋                               │
   │                                                          │
   │                   See You Soon!                         │
   │                                                          │
   │        Thanks for investing in your leadership          │
   │                     journey today!                      │
   │                                                          │
   │    ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
   │    │ 📖      │ │ 📈      │ │ ❤️      │ │ 🏅      │    │
   │    │ Keep    │ │ Keep    │ │ Keep    │ │ Keep    │    │
   │    │ Learning│ │ Growing │ │ Serving │ │ Achieving│   │
   │    └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
   │                                                          │
   │         "Leadership is not about being in charge.       │
   │        It's about taking care of those in your charge." │
   │                        - Simon Sinek                    │
   │                                                          │
   │              ✓ Your progress is saved                   │
   │                                                          │
   │                 [Back to Login →]                       │
   └─────────────────────────────────────────────────────────┘
   
   - Sarah feels: Appreciated, motivated to return
   - Closes browser

7:30 PM - Session Complete
```

**Total time**: 30 minutes  
**Emotions**: Excited → Engaged → Challenged → Accomplished → Motivated  
**Success**: ✅ Chapter completed, progress saved, positive experience  
**Retention likelihood**: HIGH

---

### Sarah's Week 1 Journey

**Monday** (Day 2):
- Logs back in → Goes straight to Dashboard
- Sees "Continue Learning" with Chapter 2 ready
- Completes Chapter 2: "Building Relationships" (82%, +80 XP)
- Total XP: 167

**Wednesday** (Day 4):
- Completes Chapter 3: "Navigating Teen Culture" (75%, +78 XP)
- Uses all 3 hints (learning curve)
- Lives reset daily (back to 5)
- Total XP: 245
- Streak: 3 days (missed Tuesday, but continues)

**Friday** (Day 6):
- Completes Chapter 4: "Parent Communication" (90%, ⭐⭐⭐, +92 XP)
- Total XP: 337
- Unlocks achievement: "Quick Learner" badge
- Toast notification celebrates milestone

**Sunday** (Day 8):
- Week review: 4 chapters completed
- Checks Leaderboard → Rank 23 out of 50 users
- Feels competitive, wants to climb
- Completes Chapter 5 to boost rank

---

### Sarah's Month 1 Outcome

**Week 4** (Day 28):
- Completes final chapter (Chapter 8) of Youth Ministry Leadership
- Results screen shows special bonus:
  - Question points: +45
  - Chapter completion: +50
  - 🎉 **PATH COMPLETION BONUS: +100**
  - Total chapter: +195 XP
- Confetti + trophy + fanfare
- Badge earned: "Youth Champion"
- Total path XP: ~700
- Overall level: 5
- Profile shows completed path with checkmark

**Real-World Impact**:
- Applied relationship-building techniques with withdrawn teen
- Teen opened up about family struggles
- Sarah felt confident handling the situation
- Parents thanked her for caring
- Youth group attendance increased 20%
- Sarah recommends ChurchAcademy to other youth leaders

**Platform Engagement**:
- 28-day streak achieved
- 3 badges earned
- Leaderboard rank: #12
- Started second path: "Communication Excellence"
- Left 5-star review

---

## Journey 2: Pastor Mike - Returning User (Browse & Filter)

### Context
Mike has completed one path, wants to find next relevant training for upcoming board retreat.

### Timeline: Tuesday Afternoon (15 minutes)

```
2:00 PM - Logs In
   - Login page
   - Enters credentials (NO password strength shown ✅)
   - "Sign In" → Dashboard

2:01 PM - Dashboard Review
   Stats: [⭐ 1,250 XP] [❤️ 5 Lives] [💡 3 Hints] [🔥 12 Streak] [🏆 Level 6]
   
   Current Paths:
   - Leadership Fundamentals: 100% complete ✓
   - (Empty slot - looking for next path)

2:02 PM - Browse Courses
   - Clicks "Browse Courses" in sidebar
   - BrowseLessons page loads
   
   Header:
   ┌─────────────────────────────────────────────────────────┐
   │ Browse Courses                                          │
   │                                                          │
   │ 🔍 [Search courses...]                                  │
   │                                                          │
   │ Filters:  [All Roles ▼] [All Goals ▼] [All Levels ▼]  │
   │                                                          │
   │ Showing 6 courses                                       │
   └─────────────────────────────────────────────────────────┘

2:03 PM - Apply Filters
   - Clicks "All Roles" → Selects "Senior Pastor"
   - Count updates: "Showing 4 courses"
   - Clicks "All Goals" → Selects "Speak with Clarity"
   - Count updates: "Showing 2 courses"
   - Clicks "All Levels" → Selects "Intermediate"
   - Count updates: "Showing 1 course"
   
   Result:
   ┌─────────────────────────────────────────────────────────┐
   │ [Image: Professional speaker at podium]                 │
   │                                                          │
   │ Communication Excellence                                │
   │                                                          │
   │ Master public speaking, difficult conversations, and    │
   │ vision casting with confidence and clarity.             │
   │                                                          │
   │ 🕒 4 weeks | 📖 7 chapters | 🎓 Intermediate           │
   │                                                          │
   │ Target: 👤 Senior Pastor  👤 Youth Minister             │
   │                                                          │
   │ Progress: [░░░░░░░░] 0% (Not started)                  │
   │                                                          │
   │ [View Details →]  [Start Learning]                      │
   └─────────────────────────────────────────────────────────┘
   
   - Mike thinks: "Perfect for the board retreat prep!"
   - Clicks "View Details →"

2:05 PM - Course Detail Page
   ┌─────────────────────────────────────────────────────────┐
   │ ← Back to Browse                                        │
   │                                                          │
   │ [Large hero image: Conference speaker]                  │
   │                                                          │
   │ Communication Excellence                                │
   │                                                          │
   │ Full description:                                       │
   │ "Effective communication is the cornerstone of          │
   │ leadership. Whether you're delivering a sermon,         │
   │ facilitating a board meeting, or having a difficult     │
   │ conversation, this path equips you with practical       │
   │ skills to speak with clarity, listen with empathy,      │
   │ and lead with confidence.                               │
   │                                                          │
   │ You'll learn research-backed techniques used by top     │
   │ communicators, practice real-world scenarios, and       │
   │ develop your unique communication style."               │
   │                                                          │
   │ 🕒 Estimated: 4 weeks                                   │
   │ 📖 7 chapters                                           │
   │ 🎓 Difficulty: Intermediate                             │
   │ 🎯 XP Reward: 400 points                                │
   │                                                          │
   │ Categories: [Communication] [Leadership] [Conflict]     │
   │                                                          │
   │ Target Roles: Senior Pastor, Youth Minister             │
   └─────────────────────────────────────────────────────────┘
   
   Scrolls to "What You'll Learn":
   ┌─────────────────────────────────────────────────────────┐
   │ What You'll Learn                                       │
   │                                                          │
   │ ✓ Deliver compelling, memorable sermons                 │
   │ ✓ Navigate difficult conversations with grace           │
   │ ✓ Communicate vision clearly and inspire action         │
   │ ✓ Adapt your message to different audiences             │
   │ ✓ Handle criticism and conflict constructively          │
   │ ✓ Use storytelling to connect and persuade              │
   │ ✓ Develop your authentic communication style            │
   └─────────────────────────────────────────────────────────┘
   
   - Mike thinks: "Chapter 2 is exactly what I need for board meeting!"
   
   Scrolls to Chapters:
   ┌─────────────────────────────────────────────────────────┐
   │ Chapters                                                │
   │                                                          │
   │ ▼ Chapter 1: Foundations of Communication               │
   │   8 questions | ~15 minutes | ○ Not Started            │
   │   Introduction to key communication principles          │
   │                                                          │
   │ ▶ Chapter 2: Difficult Conversations                    │
   │   7 questions | ~14 minutes | ○ Not Started            │
   │                                                          │
   │ ▶ Chapter 3: Public Speaking Mastery                    │
   │   6 questions | ~12 minutes | ○ Not Started            │
   │                                                          │
   │ ▶ Chapter 4: Vision Casting                             │
   │   8 questions | ~16 minutes | ○ Not Started            │
   │                                                          │
   │ (... 3 more chapters)                                   │
   └─────────────────────────────────────────────────────────┘
   
   - Clicks Chapter 2 to expand
   - Sees question types: MC, True/False, Matching, Scenario
   - Thinks: "This is exactly what I need!"
   - Scrolls back to top
   - Clicks "Start Learning →"

2:08 PM - Begins Chapter 1
   - LearningScenario loads
   - Starts first question
   - (Session continues...)

2:30 PM - Completes Chapter 1
   - 85% score, ⭐⭐ stars
   - +85 XP
   - Returns to Dashboard
   - "Continue Learning" now shows:
     * Leadership Fundamentals: 100% complete
     * Communication Excellence: 14% complete (1/7 chapters)
   - Can easily switch between paths
   - Logs out until next session
```

**Outcome**:
- ✅ Found perfect course in 5 minutes
- ✅ Made informed decision with Course Detail info
- ✅ Started learning immediately
- ✅ Will apply to real board meeting next week

---

## Admin User Journeys

## Journey 3: David - Admin Creating Custom Path

### Context
Church needs specialized training for new multi-site expansion.

### Timeline: Monday Morning (60 minutes)

```
9:00 AM - Admin Dashboard Access
   - David logs in (has isAdmin: true)
   - Dashboard shows "Admin" option in sidebar (shield icon)
   - Clicks "Admin"
   - Admin Dashboard loads (full screen, no sidebar)

9:01 AM - Admin Dashboard
   ┌─────────────────────────────────────────────────────────┐
   │ Admin Dashboard                       [← Back to App]   │
   │                                                          │
   │ Tabs: [Paths] [Users] [Badges]                          │
   │       ^^^^^^                                             │
   │      (Active)                                            │
   └─────────────────────────────────────────────────────────┘
   
   Paths Tab shows table:
   | Title                    | Status    | Ch | Qs | Created    | Actions    |
   |--------------------------|-----------|----|----|------------|------------|
   | Leadership Fundamentals  | Published | 8  | 45 | 2025-01-10 | Edit Delete|
   | Communication Excellence | Published | 7  | 38 | 2025-01-12 | Edit Delete|
   | Youth Ministry Lead      | Published | 8  | 42 | 2025-01-13 | Edit Delete|
   | (... 3 more paths)       |           |    |    |            |            |
   
   [+ Create New Path] button at top

9:02 AM - Creates New Path
   - Clicks [+ Create New Path]
   - PathEditorFull component loads
   
   ┌═══════════════════════════════════════════════════════╗
   ║ Create New Learning Path          [Save] [Cancel]    ║
   ╚═══════════════════════════════════════════════════════╝

9:03 AM - Basic Information Section
   ┌─ Basic Information ─────────────────────────────────┐
   │ Title:                                              │
   │ [Multi-Site Church Leadership___________________]   │
   │                                                     │
   │ Description:                                        │
   │ [Manage multiple locations effectively with unified│
   │  vision and coordinated execution. Learn site      │
   │  pastor support, communication systems, and        │
   │  resource allocation strategies._________________]│
   │                                                     │
   │ ⭐ NEW FIELDS:                                      │
   │                                                     │
   │ Difficulty: [Expert ▼]                             │
   │   Dropdown: Foundation | Intermediate | Expert ← Selected│
   │                                                     │
   │ Estimated Time: [8 weeks____]                      │
   │   Helper text: "e.g., '6 hours' or '4 weeks'"     │
   │                                                     │
   │ XP Reward: [500_] points                           │
   │   Helper: "Total XP for completing all chapters"  │
   │                                                     │
   │ Thumbnail Image URL:                               │
   │ [https://images.unsplash.com/photo-12345...]       │
   │                                                     │
   │ 🖼️ Preview:                                         │
   │ [Shows live preview of church campus image]        │
   │                                                     │
   │ Status: ○ Draft  ◉ Published                       │
   │         (Starts as Draft, will publish after review)│
   └─────────────────────────────────────────────────────┘

9:08 AM - Categories Section ⭐ NEW
   ┌─ Categories (Select all that apply) ────────────────┐
   │ Select categories for this learning path:          │
   │                                                     │
   │ ☑ Leadership          ☐ Evangelism                 │
   │ ☑ Team Building       ☐ Worship                    │
   │ ☑ Communication       ☐ Youth Ministry             │
   │ ☐ Conflict Resolution ☑ Administration             │
   │ ☐ Spiritual Growth    ☐ Community Outreach         │
   │ ☑ Vision Casting      ☐ Discipleship               │
   │                                                     │
   │ Selected categories:                               │
   │ [Leadership] [Team Building] [Communication]       │
   │ [Administration] [Vision Casting]                  │
   └─────────────────────────────────────────────────────┘

9:10 AM - Target Roles & Goals
   ┌─ Target Roles ──────────────────────────────────────┐
   │ Who is this path for?                               │
   │ ☑ Senior Pastor     ☐ Youth Minister               │
   │ ☐ Worship Leader    ☑ Admin Team                   │
   │ ☐ Volunteer Leader  ☐ Tech Team                    │
   └─────────────────────────────────────────────────────┘
   
   ┌─ Target Goals ──────────────────────────────────────┐
   │ Which leadership goals does this address?           │
   │ ☑ Lead with Confidence  ☑ Create Team Unity        │
   │ ☐ Speak with Clarity    ☐ Resolve Conflicts Fast   │
   │ ☑ Develop Your People                              │
   └─────────────────────────────────────────────────────┘

9:15 AM - Chapters & Questions Section
   ┌─ Chapters ──────────────────────────────────────────┐
   │ [+ Add Chapter]                                     │
   │                                                     │
   │ (Currently empty - David will add 6 chapters)       │
   └─────────────────────────────────────────────────────┘
   
   - Clicks [+ Add Chapter]
   - Chapter form expands

9:16 AM - Chapter 1: Multi-Site Vision
   ┌─ Chapter 1 ▼────────────────────────────────────────┐
   │ Chapter Title: [Multi-Site Vision Casting_______]   │
   │                                                     │
   │ Questions: 0                                        │
   │                                                     │
   │ [+ Add Question ▼]                                  │
   └─────────────────────────────────────────────────────┘
   
   - Clicks [+ Add Question]
   - Dropdown shows: Content | Multiple Choice | True/False |
                     Multiple Answer | Matching | Fill Blank
   - Selects "Content"

9:17 AM - Question 1 (Content Slide)
   ┌─ Question 1: Content Slide ─────────────────────────┐
   │ Media Attachments (Optional):                       │
   │ Image URL: [https://unsplash.com/.../campuses.jpg] │
   │ Video URL: [___________________________________]    │
   │                                                     │
   │ Title: [Welcome to Multi-Site Leadership________]  │
   │                                                     │
   │ Content:                                            │
   │ [In this module, you'll learn how to cast vision  │
   │  across multiple locations, ensuring unity while   │
   │  celebrating diversity. You'll discover how to     │
   │  empower site pastors, build communication systems,│
   │  and maintain your church's DNA across campuses.   │
   │                                                     │
   │  By the end of this chapter, you'll be equipped to│
   │  lead a thriving multi-site ministry.__________]   │
   │                                                     │
   │ [Save Question]  [Cancel]                          │
   └─────────────────────────────────────────────────────┘
   
   - Clicks [Save Question]
   - Question appears in chapter list

9:20 AM - Question 2 (Multiple Choice)
   - Clicks [+ Add Question] → Selects "Multiple Choice"
   
   ┌─ Question 2: Multiple Choice ───────────────────────┐
   │ Media: (none)                                       │
   │                                                     │
   │ Question Text:                                      │
   │ [What is the primary challenge of multi-site       │
   │  ministry?________________________________]         │
   │                                                     │
   │ Hint (Optional):                                    │
   │ [Think about what makes each campus unique yet     │
   │  connected to the whole_____________________]      │
   │                                                     │
   │ Points: [5]                                         │
   │                                                     │
   │ Options:                                            │
   │ ┌─ Option A ────────────────────────────────────┐ │
   │ │ Text: [Budget allocation]                     │ │
   │ │ Explanation: [Resources across locations]     │ │
   │ │ Feedback: [Important but not primary]         │ │
   │ │ Points: [2]                                   │ │
   │ │ ☐ Correct Answer                              │ │
   │ └───────────────────────────────────────────────┘ │
   │                                                     │
   │ ┌─ Option B ────────────────────────────────────┐ │
   │ │ Text: [Maintaining unified vision]            │ │
   │ │ Explanation: [Unity with diversity]           │ │
   │ │ Feedback: [Exactly! This is the core challenge│ │
   │ │            - keeping all campuses aligned]    │ │
   │ │ Points: [5]                                   │ │
   │ │ ☑ Correct Answer                              │ │
   │ └───────────────────────────────────────────────┘ │
   │                                                     │
   │ (Options C and D added similarly)                  │
   │                                                     │
   │ [+ Add Option]                                      │
   │                                                     │
   │ [Save Question]  [Cancel]                          │
   └─────────────────────────────────────────────────────┘
   
   - David completes all 4 options
   - Clicks [Save Question]

9:25 AM - Adds Questions 3-6
   - Q3: True/False - "Each campus should operate independently"
   - Q4: Multiple Answer - "Essential for multi-site success"
   - Q5: Matching - Leadership roles to responsibilities
   - Q6: Fill Blank - "Multi-site requires ____ vision with ____ expression"
   
   Chapter 1 now complete with 6 questions

9:30 AM - Adds Chapters 2-6
   - Chapter 2: Communication Across Campuses (7 questions)
   - Chapter 3: Developing Site Pastors (6 questions)
   - Chapter 4: Resource Allocation (8 questions)
   - Chapter 5: Building Campus Culture (7 questions)
   - Chapter 6: Multi-Site Health Assessment (8 questions)
   
   Total: 6 chapters, 42 questions

9:55 AM - Reviews Complete Path
   - Scrolls through all sections
   - Checks:
     ✓ All required fields filled
     ✓ Categories selected (5 categories)
     ✓ XP reward appropriate (500 points)
     ✓ Difficulty matches content (Expert)
     ✓ Target audience correct (Senior Pastor, Admin)
     ✓ All questions have feedback
     ✓ Thumbnail loads properly
   - Everything looks good!

9:58 AM - Publishes Path
   - Changes Status from "Draft" to "Published"
   - Clicks [Save Changes]
   - Loading spinner
   - Success toast: "Path created successfully!"
   - Redirects to Paths tab

9:59 AM - Verification
   Table now shows:
   | Multi-Site Church Leadership | Published | 6 | 42 | 2025-01-17 | Edit Delete |
   
   - Path immediately available to users
   - Senior Pastors will see it in recommendations
   - Can track usage in Users tab

10:00 AM - Mission Accomplished
   - Total time: 60 minutes
   - Created comprehensive custom path
   - Aligned with organizational needs
   - All new features used (difficulty, time, categories, XP, thumbnail)
   - Ready for team to start learning
```

**Outcome**:
- ✅ Custom path created in 1 hour
- ✅ All new fields properly utilized
- ✅ Published and live immediately
- ✅ Meets specific organizational need
- ✅ Trackable and editable

**ROI**: One admin session = training for entire leadership team

---

## Edge Cases & Recovery

### Edge Case 1: User Loses All Lives

**Scenario**: User answers 3 questions wrong quickly

```
Lives: ♥♥♥ → ♥♥♡ → ♥♡♡ → ♡♡♡

Game Over Modal:
┌─────────────────────────────────────────┐
│              💔                          │
│                                          │
│          Out of Lives!                  │
│                                          │
│  You've used all your lives. Don't      │
│  worry – you can retry the chapter      │
│  and keep learning!                     │
│                                          │
│  Lives will reset to 5 when you retry.  │
│                                          │
│  [Retry Chapter]  [Back to Dashboard]   │
└─────────────────────────────────────────┘

User clicks "Retry Chapter":
- Lives reset to 5
- Hints reset to 3
- Chapter restarts from Question 1
- Previous progress not saved (encourages learning)
- No penalty to XP or level
```

**User feels**: Not punished, can try again, learning-focused

---

### Edge Case 2: User Abandons Mid-Chapter

**Scenario**: User completes 4/8 questions, then closes browser

```
Next Day:
- User returns, logs in
- Dashboard shows:
  
  Continue Learning:
  ┌──────────────────────────────────────┐
  │ Youth Ministry Leadership            │
  │ Progress: 6% (incomplete chapter)    │
  │                                      │
  │ [Resume Chapter 1 →]                 │
  │ (Picks up where you left off)        │
  └──────────────────────────────────────┘
  
- Clicks "Resume"
- Returns to Question 5 (next unfinished)
- Progress preserved
- Lives/hints as they were
```

**User feels**: Relieved, not frustrated, seamless experience

---

### Edge Case 3: User Fails Chapter (<70%)

**Scenario**: User scores 55% on chapter

```
Results Screen:
┌─────────────────────────────────────────┐
│          Keep Practicing!               │
│                                          │
│             55% Correct                 │
│                 ☆☆☆                      │
│                                          │
│       ✗ Below 70% required to pass      │
│                                          │
│       Stats:                            │
│       ✓ 4 Correct  ✗ 4 Incorrect        │
│                                          │
│       Points earned: +18                │
│       (No chapter completion bonus)     │
│                                          │
│  "Don't worry! Learning takes time.     │
│   Review the content and try again      │
│   when you're ready."                   │
│                                          │
│  [Retry Incorrect Questions (4)]        │
│  [Review All Questions]                 │
│  [Back to Dashboard]                    │
└─────────────────────────────────────────┘

User clicks "Retry Incorrect Questions":
- Only see the 4 questions they missed
- Focused learning on weak areas
- Can pass with ≥3/4 correct
- More efficient than full retry
```

**User feels**: Supported, not judged, has clear path forward

---

## Success Metrics

### Onboarding
- ✅ **Completion rate**: 90%+ complete all 6 steps
- ✅ **Time to complete**: <5 minutes average
- ✅ **Drop-off points**: <5% abandon at any single step
- ✅ **Username adoption**: 95%+ choose custom username
- ✅ **Path selection**: 95%+ select recommended path

### Engagement
- ✅ **First chapter completion**: 85%+ complete within 24 hours
- ✅ **Session frequency**: 2.5x per week average
- ✅ **Session duration**: 20 minutes average
- ✅ **Chapter completion rate**: 80%+ pass on first try
- ✅ **Retry rate**: <15% need to retry chapters

### Retention
- ✅ **Day 2 return**: 75%+ log back in
- ✅ **Week 1 retention**: 65%+ active
- ✅ **Week 4 retention**: 50%+ active
- ✅ **Path completion**: 60%+ finish first path

### Admin Usage
- ✅ **Path creation time**: 45-60 minutes for 6-chapter path
- ✅ **Path quality**: 85%+ user completion rate
- ✅ **Field completion**: 100% use all new fields (difficulty, time, etc.)
- ✅ **Publishing**: 90%+ paths published (not left as drafts)

### Learning Outcomes
- ✅ **Average score**: 80%+ across all chapters
- ✅ **Hint usage**: 1.5 hints per chapter average
- ✅ **Lives lost**: 1.2 lives per chapter average
- ✅ **Badge collection**: 2+ badges per user in first month
- ✅ **Leaderboard engagement**: 40%+ check leaderboard weekly

### Real-World Impact
- ✅ **Skill application**: 70%+ report using skills in ministry
- ✅ **Confidence increase**: 85%+ feel more confident
- ✅ **Recommendation**: 75%+ recommend to other leaders
- ✅ **Return for more paths**: 80%+ start second path

---

## Conclusion

These updated user stories reflect the current state of ChurchAcademy with all recent enhancements:

1. **Username field** adds personalization and identity
2. **Single recommended path** reduces decision fatigue
3. **Streamlined login** separates returning vs. new user experience
4. **Enhanced admin tools** with all new PathEditorFull fields
5. **Logout screen** provides positive closure

All flows have been validated against the current codebase and represent realistic user journeys that drive engagement, learning, and ministry impact.

---

**Document Status**: ✅ Complete and Current  
**Next Review**: February 2025  
**Maintained By**: Product & Development Team
