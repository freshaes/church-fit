# ChurchAcademy - Application Flow Diagrams

Complete visual flow diagrams for all user journeys and page navigation in ChurchAcademy.

---

## 📊 Main Application Flow

```mermaid
flowchart TD
    Start([User Visits App]) --> Login[Login Page]
    
    Login -->|First Time User| Onboarding[Onboarding Flow]
    Login -->|Returning User| Dashboard[Dashboard]
    
    Onboarding -->|Step 1| RoleSelection[Select Role]
    RoleSelection -->|Step 2| GoalSelection[Select 2 Goals]
    GoalSelection -->|Step 3| ProfileSetup[Set Profile Info]
    ProfileSetup --> Dashboard
    
    Dashboard --> DashboardActions{User Action}
    
    DashboardActions -->|Start Chapter| Learning[Learning Scenario]
    DashboardActions -->|Browse Courses| Browse[Browse Lessons]
    DashboardActions -->|View Profile| Profile[Profile Page]
    DashboardActions -->|Check Rankings| Leaderboard[Leaderboard]
    DashboardActions -->|Admin Access| AdminCheck{Is Admin?}
    DashboardActions -->|Logout| LogoutScreen[Logout Screen]
    
    AdminCheck -->|Yes| Admin[Admin Dashboard]
    AdminCheck -->|No| Dashboard
    
    Learning --> Questions[Answer Questions]
    Questions -->|Lives > 0| NextQuestion{More Questions?}
    Questions -->|Lives = 0| GameOver[Game Over Screen]
    
    NextQuestion -->|Yes| Questions
    NextQuestion -->|No| Results[Results Screen]
    
    GameOver -->|Retry| Learning
    GameOver -->|Exit| Dashboard
    
    Results -->|Continue| Dashboard
    Results -->|Retry Chapter| Learning
    
    Browse -->|Select Course| CourseDetail[Course Detail]
    CourseDetail -->|Enroll| Dashboard
    CourseDetail -->|Back| Browse
    
    Profile -->|Upload Avatar| Profile
    Profile -->|View Badges| Profile
    Profile -->|Back| Dashboard
    
    Leaderboard -->|View Rankings| Leaderboard
    Leaderboard -->|Back| Dashboard
    
    Admin --> AdminTabs{Select Tab}
    AdminTabs -->|Paths| PathEditor[Path Editor]
    AdminTabs -->|Users| UserManager[User Manager]
    AdminTabs -->|Badges| BadgeManager[Badge Manager]
    
    PathEditor -->|Create/Edit Path| PathEditorFull[Full Path Editor]
    PathEditorFull -->|Save| PathEditor
    PathEditor -->|Back| Admin
    
    UserManager -->|Edit User| UserManager
    UserManager -->|Back| Admin
    
    BadgeManager -->|Create Badge| BadgeManager
    BadgeManager -->|Back| Admin
    
    Admin -->|Exit Admin| Dashboard
    
    LogoutScreen -->|Back to Login| Login
    
    style Login fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style Dashboard fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Learning fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Admin fill:#FDD6A1,stroke:#3A4A46,stroke-width:2px
    style LogoutScreen fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 🎓 Learning Scenario Flow (Detailed)

```mermaid
flowchart TD
    Start([Enter Learning Scenario]) --> Init[Initialize Session<br/>Lives: 3<br/>Hints: 3<br/>Score: 0]
    
    Init --> LoadQuestion[Load Question]
    
    LoadQuestion --> QuestionType{Question Type?}
    
    QuestionType -->|Content| ContentSlide[Show Content Slide]
    QuestionType -->|Multiple Choice| MC[Multiple Choice UI]
    QuestionType -->|True/False| TF[True/False UI]
    QuestionType -->|Multiple Answer| MA[Multiple Answer UI]
    QuestionType -->|Matching| Match[Matching Drag-Drop UI]
    QuestionType -->|Fill Blank| FB[Fill in Blank UI]
    
    ContentSlide -->|Continue| NextQ
    
    MC --> CheckHint{Use Hint?}
    TF --> CheckHint
    MA --> CheckHint
    Match --> CheckHint
    FB --> CheckHint
    
    CheckHint -->|Yes| UseHint[Display Hint<br/>Hints - 1]
    CheckHint -->|No| SubmitAnswer[Submit Answer]
    UseHint --> SubmitAnswer
    
    SubmitAnswer --> Correct{Correct?}
    
    Correct -->|Yes| AddPoints[Add Points<br/>Show Feedback]
    Correct -->|No| LoseLive[Lives - 1<br/>Show Feedback]
    
    AddPoints --> NextQ{More Questions?}
    LoseLive --> CheckLives{Lives > 0?}
    
    CheckLives -->|Yes| NextQ
    CheckLives -->|No| GameOver[Game Over Screen<br/>Show Score<br/>Retry Available]
    
    NextQ -->|Yes| LoadQuestion
    NextQ -->|No| CalcResults[Calculate Results<br/>Chapter Bonus: +50<br/>Path Bonus: +100 if final]
    
    CalcResults --> ShowResults[Results Screen<br/>Percentage<br/>Stars<br/>Pass/Fail<br/>Points Breakdown]
    
    ShowResults --> UserChoice{User Choice}
    
    UserChoice -->|Continue| UpdateProgress[Update User Progress<br/>Award Badges if earned]
    UserChoice -->|Retry| Start
    
    UpdateProgress --> End([Return to Dashboard])
    
    GameOver -->|Retry| Start
    GameOver -->|Exit| End
    
    style Start fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style GameOver fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style ShowResults fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style End fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 👤 Onboarding Flow (Detailed)

```mermaid
flowchart LR
    Start([New User]) --> Step1[Step 1 of 3<br/>Select Your Role]
    
    Step1 --> RoleOptions{Choose Role}
    
    RoleOptions -->|Option 1| Pastor[Senior Pastor]
    RoleOptions -->|Option 2| Youth[Youth Minister]
    RoleOptions -->|Option 3| Worship[Worship Leader]
    RoleOptions -->|Option 4| Admin[Church Admin]
    RoleOptions -->|Option 5| Elder[Elder/Board]
    RoleOptions -->|Option 6| Volunteer[Volunteer Lead]
    
    Pastor --> Step2
    Youth --> Step2
    Worship --> Step2
    Admin --> Step2
    Elder --> Step2
    Volunteer --> Step2
    
    Step2[Step 2 of 3<br/>Select 2 Goals] --> GoalSelect[Choose from:<br/>Lead with Confidence<br/>Develop Your People<br/>Create Team Unity<br/>Build Vision<br/>Navigate Conflict<br/>Grow Spiritually]
    
    GoalSelect --> Validate{2 Goals<br/>Selected?}
    
    Validate -->|No| GoalSelect
    Validate -->|Yes| Step3[Step 3 of 3<br/>Profile Setup]
    
    Step3 --> ProfileInfo[Enter:<br/>- Name<br/>- Email<br/>- Church Name optional]
    
    ProfileInfo --> Submit[Submit Onboarding]
    
    Submit --> CreateProfile[Create User Profile<br/>Assign Role<br/>Set Goals<br/>Initialize XP: 0<br/>Set Lives: 3<br/>Set Hints: 3]
    
    CreateProfile --> End([Navigate to Dashboard])
    
    style Start fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style End fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Step1 fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style Step2 fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style Step3 fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 🛠️ Admin Panel Flow

```mermaid
flowchart TD
    Start([Admin Dashboard]) --> Tabs{Select Tab}
    
    Tabs -->|Paths Tab| PathsView[View Learning Paths]
    Tabs -->|Users Tab| UsersView[View Users]
    Tabs -->|Badges Tab| BadgesView[View Badges]
    
    %% PATHS FLOW
    PathsView --> PathAction{Action}
    PathAction -->|Create New| CreatePath[Create Path Form<br/>Title, Description<br/>Difficulty, Duration<br/>Target Roles/Goals]
    PathAction -->|Edit Existing| PathEditor[Quick Path Editor<br/>List View]
    PathAction -->|Delete| ConfirmDelete{Confirm?}
    
    CreatePath --> SavePath[Save Path]
    SavePath --> PathsView
    
    PathEditor --> EditAction{Action}
    EditAction -->|Edit Details| FullEditor[Full Path Editor<br/>Chapters & Questions]
    EditAction -->|Quick Edit| UpdatePath[Update Basic Info]
    EditAction -->|Delete| ConfirmDelete
    
    FullEditor --> ChapterMgmt[Manage Chapters]
    ChapterMgmt --> QuestionMgmt[Manage Questions<br/>6 Types Available]
    
    QuestionMgmt --> QuestionType{Add Question}
    QuestionType -->|Content| AddContent[Content Slide<br/>Title + Text]
    QuestionType -->|Multiple Choice| AddMC[Multiple Choice<br/>Options + Correct]
    QuestionType -->|True/False| AddTF[True/False<br/>Correct Answer]
    QuestionType -->|Multiple Answer| AddMA[Multiple Answer<br/>Checkboxes]
    QuestionType -->|Matching| AddMatch[Matching<br/>Pairs]
    QuestionType -->|Fill Blank| AddFB[Fill in Blank<br/>Word Bank]
    
    AddContent --> SaveQuestion
    AddMC --> SaveQuestion
    AddTF --> SaveQuestion
    AddMA --> SaveQuestion
    AddMatch --> SaveQuestion
    AddFB --> SaveQuestion
    
    SaveQuestion[Save Question] --> MoreQuestions{Add More?}
    MoreQuestions -->|Yes| QuestionType
    MoreQuestions -->|No| SaveFullPath[Save Complete Path]
    
    SaveFullPath --> PathsView
    UpdatePath --> PathsView
    
    ConfirmDelete -->|Yes| DeletePath[Delete Path]
    ConfirmDelete -->|No| PathsView
    DeletePath --> PathsView
    
    %% USERS FLOW
    UsersView --> UserAction{Action}
    UserAction -->|Edit User| EditUser[Edit User Form<br/>Role, Level, XP<br/>Award Badges]
    UserAction -->|Delete User| ConfirmDeleteUser{Confirm?}
    UserAction -->|Search/Filter| FilterUsers[Apply Filters<br/>Role, Level, etc.]
    
    EditUser --> SaveUser[Save User Changes]
    SaveUser --> UsersView
    
    FilterUsers --> UsersView
    
    ConfirmDeleteUser -->|Yes| DeleteUser[Delete User]
    ConfirmDeleteUser -->|No| UsersView
    DeleteUser --> UsersView
    
    %% BADGES FLOW
    BadgesView --> BadgeAction{Action}
    BadgeAction -->|Create Badge| CreateBadge[Create Badge Form<br/>Name, Description<br/>Rarity, Icon]
    BadgeAction -->|Edit Badge| EditBadge[Edit Badge]
    BadgeAction -->|Delete Badge| ConfirmDeleteBadge{Confirm?}
    BadgeAction -->|Award Badge| AwardBadge[Award to User]
    
    CreateBadge --> SaveBadge[Save Badge]
    SaveBadge --> BadgesView
    
    EditBadge --> UpdateBadge[Update Badge]
    UpdateBadge --> BadgesView
    
    AwardBadge --> SelectUser[Select User]
    SelectUser --> ConfirmAward{Confirm Award?}
    ConfirmAward -->|Yes| AwardComplete[Badge Awarded]
    ConfirmAward -->|No| BadgesView
    AwardComplete --> BadgesView
    
    ConfirmDeleteBadge -->|Yes| DeleteBadge[Delete Badge]
    ConfirmDeleteBadge -->|No| BadgesView
    DeleteBadge --> BadgesView
    
    %% BACK TO DASHBOARD
    PathsView --> Exit[Exit Admin Panel]
    UsersView --> Exit
    BadgesView --> Exit
    Exit --> End([Return to Dashboard])
    
    style Start fill:#FDD6A1,stroke:#3A4A46,stroke-width:2px
    style End fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style PathsView fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style UsersView fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style BadgesView fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 🏆 Gamification System Flow

```mermaid
flowchart TD
    Start([User Action]) --> ActionType{Action Type}
    
    %% LIVES SYSTEM
    ActionType -->|Wrong Answer| LoseLive[Lives - 1]
    LoseLive --> CheckLives{Lives = 0?}
    CheckLives -->|Yes| GameOver[Game Over<br/>Show Retry Option]
    CheckLives -->|No| Continue[Continue Playing]
    
    %% HINTS SYSTEM
    ActionType -->|Use Hint| CheckHints{Hints > 0?}
    CheckHints -->|Yes| UseHint[Show Hint<br/>Hints - 1]
    CheckHints -->|No| NoHints[Hint Unavailable]
    UseHint --> Continue
    NoHints --> Continue
    
    %% POINTS SYSTEM
    ActionType -->|Correct Answer| AddPoints[Add Question Points]
    AddPoints --> TotalPoints[Update Total XP]
    
    ActionType -->|Complete Chapter| ChapterCheck{Pass Chapter?<br/>≥70%}
    ChapterCheck -->|Yes| ChapterBonus[+50 Bonus Points]
    ChapterCheck -->|No| NoBonus[No Bonus]
    
    ChapterBonus --> CheckFinal{Final Chapter<br/>of Path?}
    CheckFinal -->|Yes| PathBonus[+100 Path Bonus]
    CheckFinal -->|No| UpdateTotal
    
    NoBonus --> UpdateTotal
    PathBonus --> UpdateTotal[Update Total XP]
    
    %% BADGES SYSTEM
    UpdateTotal --> CheckBadges{XP Milestone<br/>Reached?}
    CheckBadges -->|Yes| AwardBadge[Award Badge<br/>Show Notification]
    CheckBadges -->|No| CheckLevel
    
    AwardBadge --> CheckLevel{Level Up?}
    CheckLevel -->|Yes| LevelUp[Increase Level<br/>Show Celebration]
    CheckLevel -->|No| UpdateProfile
    
    LevelUp --> UpdateProfile[Update User Profile]
    
    %% LEADERBOARD
    UpdateProfile --> LeaderboardUpdate[Update Leaderboard<br/>Position]
    
    LeaderboardUpdate --> End([Return to Game])
    
    Continue --> End
    GameOver --> End
    TotalPoints --> End
    
    style Start fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style GameOver fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style AwardBadge fill:#FDD6A1,stroke:#3A4A46,stroke-width:2px
    style LevelUp fill:#FDD6A1,stroke:#3A4A46,stroke-width:2px
    style End fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 📱 Navigation Flow

```mermaid
flowchart LR
    Dashboard[Dashboard] --> Nav{Navigation Menu}
    
    Nav -->|Icon 1| Home[Dashboard<br/>Home Icon]
    Nav -->|Icon 2| Browse[Browse Lessons<br/>Book Icon]
    Nav -->|Icon 3| Profile[Profile<br/>User Icon]
    Nav -->|Icon 4| Leaderboard[Leaderboard<br/>Trophy Icon]
    Nav -->|Icon 5 Admin Only| Admin[Admin Panel<br/>Settings Icon]
    Nav -->|Bottom| Logout[Logout<br/>Log Out Icon]
    
    Home --> Dashboard
    
    Browse --> BrowseView[Course Grid<br/>Search & Filter]
    BrowseView --> CourseDetail[Course Detail<br/>View Info<br/>Enroll]
    CourseDetail --> Dashboard
    
    Profile --> ProfileView[Profile Page<br/>Avatar Upload<br/>Stats Display<br/>Badge Collection]
    ProfileView --> Dashboard
    
    Leaderboard --> LeaderboardView[Rankings Table<br/>Podium Display<br/>User Highlight]
    LeaderboardView --> Dashboard
    
    Admin --> AdminDashboard[Admin Dashboard<br/>3 Tabs<br/>Paths/Users/Badges]
    AdminDashboard --> Dashboard
    
    Logout --> LogoutScreen[Logout Screen<br/>Farewell Message<br/>Back to Login Link]
    LogoutScreen --> Login[Login Page]
    
    style Dashboard fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Admin fill:#FDD6A1,stroke:#3A4A46,stroke-width:2px
    style Logout fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Login fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
```

---

## 🎯 Question Type Flow

```mermaid
flowchart TD
    Start([Question Loaded]) --> HasMedia{Has Media?}
    
    HasMedia -->|Image| ShowImage[Display Image]
    HasMedia -->|Video| ShowVideo[Display Video]
    HasMedia -->|None| ShowQuestion
    
    ShowImage --> ShowQuestion[Display Question Text]
    ShowVideo --> ShowQuestion
    
    ShowQuestion --> Type{Question Type}
    
    %% CONTENT
    Type -->|Content| ContentUI[Show Content Slide<br/>Title + Text<br/>Continue Button Only]
    ContentUI --> NextQuestion[Load Next Question]
    
    %% MULTIPLE CHOICE
    Type -->|Multiple Choice| MCUI[Show Radio Buttons<br/>4 Options]
    MCUI --> SelectMC{User Selects}
    SelectMC --> CheckMC{Correct?}
    CheckMC -->|Yes| CorrectMC[Show Explanation<br/>Add Points<br/>Green Highlight]
    CheckMC -->|No| WrongMC[Show Feedback<br/>Lose Life<br/>Red Highlight]
    CorrectMC --> NextQuestion
    WrongMC --> NextQuestion
    
    %% TRUE/FALSE
    Type -->|True/False| TFUI[Show 2 Buttons<br/>True / False]
    TFUI --> SelectTF{User Selects}
    SelectTF --> CheckTF{Correct?}
    CheckTF -->|Yes| CorrectTF[Show Feedback<br/>Add Points]
    CheckTF -->|No| WrongTF[Show Feedback<br/>Lose Life]
    CorrectTF --> NextQuestion
    WrongTF --> NextQuestion
    
    %% MULTIPLE ANSWER
    Type -->|Multiple Answer| MAUI[Show Checkboxes<br/>Select All That Apply]
    MAUI --> SelectMA{User Selects Multiple}
    SelectMA --> CheckMA{All Correct?}
    CheckMA -->|Yes| CorrectMA[Full Points<br/>Show Feedback]
    CheckMA -->|Partial| PartialMA[Partial Points<br/>Show Which Wrong]
    CheckMA -->|No| WrongMA[No Points<br/>Lose Life]
    CorrectMA --> NextQuestion
    PartialMA --> NextQuestion
    WrongMA --> NextQuestion
    
    %% MATCHING
    Type -->|Matching| MatchUI[Show Drag Sources Left<br/>Drop Targets Right]
    MatchUI --> DragDrop[User Drags & Drops]
    DragDrop --> CheckMatch{All Correct?}
    CheckMatch -->|Yes| CorrectMatch[Show Color Coded<br/>Add Points]
    CheckMatch -->|No| WrongMatch[Show Incorrect<br/>Lose Life]
    CorrectMatch --> NextQuestion
    WrongMatch --> NextQuestion
    
    %% FILL IN BLANK
    Type -->|Fill Blank| FBUI[Show Sentence with Blanks<br/>Word Bank Below]
    FBUI --> DragWords[User Drags Words<br/>to Blanks]
    DragWords --> CheckFB{All Correct?}
    CheckFB -->|Yes| CorrectFB[Highlight Green<br/>Add Points]
    CheckFB -->|No| WrongFB[Highlight Red<br/>Lose Life]
    CorrectFB --> NextQuestion
    WrongFB --> NextQuestion
    
    style Start fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style NextQuestion fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style CorrectMC fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style CorrectTF fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style CorrectMA fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style CorrectMatch fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style CorrectFB fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style WrongMC fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style WrongTF fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style WrongMA fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style WrongMatch fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
    style WrongFB fill:#E66E5A,stroke:#3A4A46,stroke-width:2px,color:#fff
```

---

## 📊 Data Flow Architecture

```mermaid
flowchart TD
    User[User Interaction] --> Component[React Component]
    
    Component --> State{Update State?}
    
    State -->|Yes| SetState[setState Hook]
    SetState --> Rerender[Component Re-renders]
    
    State -->|Parent Needs Update| Callback[Call Parent Callback]
    Callback --> ParentState[Parent Updates State]
    ParentState --> PropsPassed[New Props Passed Down]
    PropsPassed --> Rerender
    
    Rerender --> UI[Update UI]
    
    Component --> LocalStorage{Persist Data?}
    LocalStorage -->|Yes| SaveLocal[Save to localStorage]
    SaveLocal --> ReadLocal[Read on Init]
    ReadLocal --> Component
    
    LocalStorage -->|No| State
    
    UI --> UserSees[User Sees Updated UI]
    
    style User fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
    style Component fill:#FFF8F2,stroke:#3A4A46,stroke-width:2px
    style UI fill:#7A9B70,stroke:#3A4A46,stroke-width:2px,color:#fff
```

---

## 🎨 Color Legend

- **Green (#7A9B70)**: Primary actions, success states, navigation
- **Cream (#FFF8F2)**: Content pages, neutral states
- **Coral (#E66E5A)**: Errors, warnings, game over
- **Beige (#FDD6A1)**: Admin features, special states

---

## 📖 How to Use These Diagrams

### For Developers:
- Use to understand routing logic
- Reference when adding new features
- Verify user flows during testing

### For Designers:
- Understand user journeys
- Plan new features and flows
- Ensure consistent UX

### For Product Managers:
- Communicate features to stakeholders
- Plan feature expansions
- Document user stories

### For QA:
- Create test cases
- Verify all paths work
- Check edge cases

---

## 🔄 Updating These Diagrams

When adding new features:

1. **Update main flow** if navigation changes
2. **Add new question types** to question flow
3. **Update admin flow** for new admin features
4. **Document in this file** with clear mermaid syntax

---

## 🎯 Page Count Summary

Total Pages/Views: **12**

1. Login
2. Logout Screen
3. Onboarding (3 steps)
4. Dashboard
5. Learning Scenario
6. Results Screen
7. Browse Lessons
8. Course Detail
9. Profile
10. Leaderboard
11. Admin Dashboard
12. Path Editor (multiple views)

---

**Last Updated**: January 2025  
**Diagram Version**: 1.0
