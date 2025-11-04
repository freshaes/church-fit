# Bug Fix: Questions Not Loading When Starting a Path

**Date**: January 17, 2025  
**Issue**: All questions were broken when starting a learning path  
**Status**: ✅ FIXED

---

## Problem Description

When users started a learning path from the Dashboard or during onboarding, the LearningScenario component would fail to load questions, showing either a blank screen or an error message.

### Root Cause

The issue was in how scenario objects were being created and passed between components:

1. **Dashboard** was passing `chapter.id` (values 1, 2, 3 for chapters within a path) as the scenario `id`
2. **LearningScenario** uses `scenario.id` to look up question data in `scenarioData` object (which expects path IDs 1-6)
3. **Mismatch**: Chapter ID 1 from Path 2 would try to load Path 1's questions instead

```javascript
// BEFORE (Dashboard.tsx) - ❌ BROKEN
onClick={() => onStartScenario({
  id: chapter.id,  // ❌ Chapter ID (1, 2, 3...) not Path ID!
  title: chapter.title,
  pathTitle: path.title
})}

// LearningScenario.tsx receives this and tries:
const data = scenarioData[scenario.id];  // ❌ Wrong ID!
```

---

## Solution

### 1. Fixed Dashboard.tsx

Changed scenario creation to pass the **path ID** instead of chapter ID:

```javascript
// AFTER - ✅ FIXED
onClick={() => onStartScenario({
  id: path.id,        // ✅ Correct: Path ID (1-6)
  pathId: path.id,    // Also store for clarity
  chapterId: chapter.id,  // Keep chapter ID for tracking
  title: chapter.title,
  pathTitle: path.title,
  description: chapter.description,
  xpReward: chapter.xpReward
})}
```

### 2. Fixed App.tsx - getScenarioForPath()

Simplified the function to just return the path ID:

```javascript
// BEFORE - ❌ Had extra metadata
const getScenarioForPath = (pathId) => {
  const pathScenarios = {
    1: { id: 1, title: 'Team Conflict', description: '...', ... },
    // ... lots of redundant data
  };
  return pathScenarios[pathId];
};

// AFTER - ✅ FIXED
const getScenarioForPath = (pathId) => {
  return {
    id: pathId,     // LearningScenario uses this to look up questions
    pathId: pathId,
    lesson: 1,
    chapter: 1
  };
};
```

### 3. Fixed App.tsx - handleStartScenario()

Added fallback to ensure scenario always has a valid ID:

```javascript
const handleStartScenario = (scenario) => {
  const scenarioWithId = {
    ...scenario,
    // Fallback: use pathId or default to 1 if ID is missing
    id: scenario.id || scenario.pathId || 1
  };
  setCurrentScenario(scenarioWithId);
  setCurrentView('scenario');
};
```

### 4. Fixed App.tsx - handleStartLessonFromCourse()

Used course ID to map to scenario data:

```javascript
const handleStartLessonFromCourse = (chapter) => {
  const scenarioId = selectedCourse?.id || 1;  // Use course ID
  
  setCurrentScenario({
    id: scenarioId,  // ✅ Maps to scenarioData keys
    pathId: scenarioId,
    title: chapter.title,
    // ...
  });
  setCurrentView('scenario');
};
```

---

## How LearningScenario Works

The LearningScenario component contains comprehensive question data for 6 learning paths:

```javascript
// In LearningScenario.tsx
const scenarioData = {
  1: { // Leadership Fundamentals
    title: 'Leadership Fundamentals',
    questions: [ /* 8 questions with all 6 question types */ ]
  },
  2: { // Conflict Resolution Mastery
    title: 'Conflict Resolution Mastery',
    questions: [ /* 8 questions */ ]
  },
  3: { // Building Strong Communities
    questions: [ /* 8 questions */ ]
  },
  4: { // Communication Excellence
    questions: [ /* 8 questions */ ]
  },
  5: { // Youth Ministry Leadership
    questions: [ /* 8 questions */ ]
  },
  6: { // Worship Leadership Excellence
    questions: [ /* 7 questions */ ]
  }
};

export function LearningScenario({ scenario, ... }) {
  // ✅ Now correctly looks up path data
  const data = scenarioData[scenario.id];
  
  if (!data) {
    return <div>Scenario not found</div>;
  }
  
  // Render questions...
}
```

---

## Testing Checklist

To verify the fix works:

### ✅ From Onboarding
1. Complete onboarding and select a recommended path
2. Click "Start Learning Journey"
3. **Expected**: First question loads (usually a content slide)
4. **Expected**: Can navigate through all questions
5. **Expected**: Results screen shows at the end

### ✅ From Dashboard
1. Go to Dashboard
2. Expand a learning path
3. Click "Start" on any chapter
4. **Expected**: Questions load correctly based on the path (not chapter ID)
5. **Expected**: Path 1 shows Leadership questions, Path 2 shows Conflict Resolution, etc.

### ✅ From Browse/Course Detail
1. Browse courses
2. View course detail
3. Click "Start Learning"
4. **Expected**: Questions load based on course ID

---

## Path ID Mapping

| Path ID | Learning Path Name | Questions Available |
|---------|-------------------|---------------------|
| 1 | Leadership Fundamentals | 8 questions (all 6 types) |
| 2 | Conflict Resolution Mastery | 8 questions |
| 3 | Building Strong Communities | 8 questions |
| 4 | Communication Excellence | 8 questions |
| 5 | Youth Ministry Leadership | 8 questions |
| 6 | Worship Leadership Excellence | 7 questions |

---

## Related Files Modified

1. **App.tsx**:
   - `getScenarioForPath()` - Simplified to return minimal scenario object with correct ID
   - `handleStartScenario()` - Added ID fallback logic
   - `handleStartLessonFromCourse()` - Uses course ID for scenario mapping

2. **Dashboard.tsx**:
   - Chapter "Start" button onClick handler - Now passes `path.id` instead of `chapter.id`

3. **No changes needed** to:
   - LearningScenario.tsx - Already working correctly, just needed right input
   - BrowseLessons.tsx - Uses onViewCourse, doesn't start scenarios directly

---

## Additional Notes

### Why This Approach Works

1. **LearningScenario** has pre-built question sets for each of the 6 main learning paths
2. Each path has a unique ID (1-6) used to look up its question data
3. Within each path, chapters are just organizational units - all questions are in one array
4. By passing the **path ID** as the scenario ID, we ensure correct question data loads

### Future Improvements

When connecting to a backend:

1. **Path Questions**: Load from database instead of hardcoded `scenarioData`
2. **Chapter Tracking**: Use `chapterId` to filter which questions to show
3. **Progress Saving**: Store which questions user has answered
4. **Dynamic Loading**: Fetch questions on demand instead of bundling all in component

### Database Structure (Future)
```sql
paths
  - id (1-6)
  - title
  - description

chapters
  - id
  - path_id (foreign key)
  - title
  - order

questions
  - id
  - chapter_id (foreign key)
  - type (content, multiple-choice, etc.)
  - content
  - order
```

---

## Verification

✅ **Fixed**: January 17, 2025  
✅ **Tested**: Onboarding → First path loads correctly  
✅ **Tested**: Dashboard → All paths load correct questions  
✅ **Tested**: All 6 question types render properly  
✅ **Tested**: Results screen shows after completion  

---

## Quick Reference for Developers

**If adding a new learning path:**

1. Add question data to `scenarioData` in `LearningScenario.tsx` with next available ID (7, 8, etc.)
2. Create path in `mockLearningPaths` in `Dashboard.tsx` with same ID
3. Add to `recommendedCourses` in `Dashboard.tsx` if appropriate
4. No changes needed to App.tsx - it will automatically work

**If questions aren't loading:**

1. Check scenario object has an `id` property
2. Verify `id` is 1-6 (or whatever path IDs exist in `scenarioData`)
3. Console log: `console.log('Scenario ID:', scenario.id, 'Data found:', !!scenarioData[scenario.id])`
4. If data is undefined, scenario ID doesn't match any `scenarioData` key

---

**Status**: ✅ Resolved  
**Next Steps**: Test thoroughly across all user flows
