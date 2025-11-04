# ChurchAcademy Database Schema

**Version**: 1.0  
**Database**: PostgreSQL (via Supabase)  
**Last Updated**: January 2025

---

## Overview

This document defines the complete database schema for ChurchAcademy, including tables, relationships, indexes, security policies, and migration strategy.

---

## Schema Diagram

```
┌──────────────┐
│    users     │──────┐
└──────────────┘      │
       │              │
       │ 1            │ 1
       │              │
       │              │
┌──────▼──────┐  ┌───▼──────────┐
│ user_stats  │  │user_progress │
└─────────────┘  └──────────────┘
       │              │
       │              │
       │ *            │ *
       │              │
┌──────▼──────────────▼────────┐
│   user_achievements          │
└──────────────────────────────┘
       │
       │ *
       │
┌──────▼──────┐
│achievements │
└─────────────┘

┌──────────────┐
│learning_paths│
└──────────────┘
```

---

## Core Tables

### 1. users

**Purpose**: Store user account and profile information

```sql
CREATE TABLE users (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Authentication (managed by Supabase Auth)
  email VARCHAR(255) UNIQUE NOT NULL,
  
  -- Profile Information
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  church_name VARCHAR(255),
  
  -- Avatar
  avatar_url TEXT,
  
  -- Onboarding Data
  goals TEXT[], -- Array of selected goals
  time_commitment VARCHAR(50), -- e.g., "10 minutes/day"
  selected_paths INTEGER[], -- Paths chosen during onboarding
  
  -- Permissions
  is_admin BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  last_active_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT valid_username CHECK (username ~ '^[a-zA-Z0-9_]{3,50}$'),
  CONSTRAINT valid_email CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$')
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_is_admin ON users(is_admin) WHERE is_admin = TRUE;

-- Comments
COMMENT ON TABLE users IS 'Core user account and profile data';
COMMENT ON COLUMN users.goals IS 'Array of goal strings selected during onboarding';
COMMENT ON COLUMN users.selected_paths IS 'Learning path IDs chosen in onboarding';
```

---

### 2. user_stats

**Purpose**: Track user gamification metrics (XP, lives, streak, etc.)

```sql
CREATE TABLE user_stats (
  -- Foreign Key (also serves as Primary Key)
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  -- Experience & Level
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_current_level INTEGER DEFAULT 0, -- XP earned in current level
  xp_next_level INTEGER DEFAULT 100, -- XP needed for next level
  
  -- Engagement Metrics
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  paths_completed INTEGER DEFAULT 0,
  
  -- Game Mechanics
  lives INTEGER DEFAULT 5,
  max_lives INTEGER DEFAULT 5,
  hints_available INTEGER DEFAULT 3,
  max_hints INTEGER DEFAULT 3,
  
  -- Refresh Tracking
  last_lives_refresh DATE DEFAULT CURRENT_DATE,
  last_streak_update DATE DEFAULT CURRENT_DATE,
  
  -- Timestamps
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_lives CHECK (lives >= 0 AND lives <= max_lives),
  CONSTRAINT valid_hints CHECK (hints_available >= 0 AND hints_available <= max_hints),
  CONSTRAINT valid_xp CHECK (total_xp >= 0),
  CONSTRAINT valid_level CHECK (current_level >= 1)
);

-- Indexes
CREATE INDEX idx_user_stats_total_xp ON user_stats(total_xp DESC);
CREATE INDEX idx_user_stats_level ON user_stats(current_level DESC);
CREATE INDEX idx_user_stats_streak ON user_stats(streak_days DESC);

-- Trigger: Auto-update timestamp
CREATE OR REPLACE FUNCTION update_user_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_stats_updated
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_timestamp();

-- Comments
COMMENT ON TABLE user_stats IS 'User gamification stats: XP, lives, streak, etc.';
COMMENT ON COLUMN user_stats.total_xp IS 'Total XP earned across all time';
COMMENT ON COLUMN user_stats.xp_current_level IS 'XP earned in current level (resets on level up)';
```

---

### 3. user_progress

**Purpose**: Track progress through learning paths and chapters

```sql
CREATE TABLE user_progress (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Foreign Keys
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path_id INTEGER NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  
  -- Progress Tracking
  status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, abandoned
  current_chapter INTEGER DEFAULT 1,
  chapters_completed INTEGER[] DEFAULT '{}', -- Array of completed chapter IDs
  total_chapters INTEGER, -- Cached from learning_paths
  
  -- Calculated Fields
  percent_complete INTEGER GENERATED ALWAYS AS (
    CASE 
      WHEN total_chapters > 0 
      THEN (array_length(chapters_completed, 1) * 100) / total_chapters
      ELSE 0
    END
  ) STORED,
  
  -- Scores & Performance
  total_points_earned INTEGER DEFAULT 0,
  total_points_possible INTEGER DEFAULT 0,
  average_score INTEGER GENERATED ALWAYS AS (
    CASE 
      WHEN total_points_possible > 0
      THEN (total_points_earned * 100) / total_points_possible
      ELSE 0
    END
  ) STORED,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  UNIQUE(user_id, path_id),
  CONSTRAINT valid_status CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  CONSTRAINT valid_current_chapter CHECK (current_chapter >= 1)
);

-- Indexes
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_path_id ON user_progress(path_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
CREATE INDEX idx_user_progress_percent ON user_progress(percent_complete DESC);

-- Trigger: Update last_activity_at
CREATE OR REPLACE FUNCTION update_progress_activity()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_progress_activity
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_progress_activity();

-- Comments
COMMENT ON TABLE user_progress IS 'Tracks user progress through learning paths';
COMMENT ON COLUMN user_progress.chapters_completed IS 'Array of chapter numbers completed';
COMMENT ON COLUMN user_progress.percent_complete IS 'Auto-calculated completion percentage';
```

---

### 4. chapter_attempts

**Purpose**: Record individual chapter attempts for analytics

```sql
CREATE TABLE chapter_attempts (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Foreign Keys
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path_id INTEGER NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  chapter_id INTEGER NOT NULL,
  
  -- Attempt Data
  attempt_number INTEGER DEFAULT 1,
  
  -- Performance
  questions_total INTEGER NOT NULL,
  questions_correct INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  points_possible INTEGER NOT NULL,
  score_percentage INTEGER GENERATED ALWAYS AS (
    (points_earned * 100) / NULLIF(points_possible, 0)
  ) STORED,
  
  -- Game Mechanics
  lives_lost INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,
  
  -- Bonuses
  chapter_bonus_earned BOOLEAN DEFAULT FALSE,
  path_bonus_earned BOOLEAN DEFAULT FALSE,
  
  -- Result
  passed BOOLEAN GENERATED ALWAYS AS (
    score_percentage >= 70
  ) STORED,
  
  -- Time Tracking
  time_started TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time_completed TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  
  -- Constraints
  CONSTRAINT valid_score CHECK (points_earned <= points_possible),
  CONSTRAINT valid_questions CHECK (questions_correct <= questions_total)
);

-- Indexes
CREATE INDEX idx_chapter_attempts_user ON chapter_attempts(user_id);
CREATE INDEX idx_chapter_attempts_path ON chapter_attempts(path_id);
CREATE INDEX idx_chapter_attempts_passed ON chapter_attempts(passed);
CREATE INDEX idx_chapter_attempts_completed ON chapter_attempts(time_completed DESC);

-- Comments
COMMENT ON TABLE chapter_attempts IS 'Individual chapter attempt records for analytics';
COMMENT ON COLUMN chapter_attempts.passed IS 'Auto-calculated: true if score >= 70%';
```

---

### 5. learning_paths

**Purpose**: Store learning path content and metadata

```sql
CREATE TABLE learning_paths (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Basic Information
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) DEFAULT 'Foundation',
  estimated_time VARCHAR(50), -- e.g., "6 hours", "4 weeks"
  
  -- Rewards
  xp_reward INTEGER DEFAULT 0,
  
  -- Visual
  thumbnail_url TEXT,
  icon_name VARCHAR(50), -- Lucide icon name
  
  -- Categorization
  categories TEXT[], -- Array of category names
  target_roles TEXT[], -- Intended user roles
  target_goals TEXT[], -- Related goals
  
  -- Content (JSONB for flexibility)
  chapters JSONB DEFAULT '[]',
  /*
    chapters structure:
    [
      {
        "id": 1,
        "title": "Chapter Title",
        "description": "Chapter description",
        "questions": [
          {
            "id": 1,
            "type": "multiple-choice",
            "question": "Question text",
            "imageUrl": "https://...",
            "videoUrl": "https://...",
            "hint": "Helpful hint",
            "points": 5,
            "options": [
              {
                "id": "a",
                "text": "Option text",
                "correct": true,
                "explanation": "Why this is correct",
                "feedback": "Detailed feedback",
                "points": 5
              }
            ]
          }
        ]
      }
    ]
  */
  
  -- Publishing
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Stats (denormalized for performance)
  enrollments_count INTEGER DEFAULT 0,
  completions_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2),
  
  -- Constraints
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('Foundation', 'Intermediate', 'Expert')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

-- Indexes
CREATE INDEX idx_learning_paths_status ON learning_paths(status);
CREATE INDEX idx_learning_paths_difficulty ON learning_paths(difficulty);
CREATE INDEX idx_learning_paths_categories ON learning_paths USING GIN(categories);
CREATE INDEX idx_learning_paths_created_at ON learning_paths(created_at DESC);
CREATE INDEX idx_learning_paths_published_at ON learning_paths(published_at DESC);

-- Trigger: Auto-update timestamp
CREATE OR REPLACE FUNCTION update_learning_paths_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER learning_paths_updated
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_learning_paths_timestamp();

-- Comments
COMMENT ON TABLE learning_paths IS 'Learning path content and metadata';
COMMENT ON COLUMN learning_paths.chapters IS 'JSONB array of chapters with nested questions';
COMMENT ON COLUMN learning_paths.categories IS 'Array of category tags for filtering';
```

---

### 6. achievements

**Purpose**: Define available badges and achievements

```sql
CREATE TABLE achievements (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Visual
  icon_url TEXT,
  icon_name VARCHAR(50), -- Lucide icon name as fallback
  
  -- Rarity & Display
  rarity VARCHAR(50) DEFAULT 'common',
  display_order INTEGER DEFAULT 0,
  
  -- Unlock Criteria (JSONB for flexibility)
  unlock_criteria JSONB,
  /*
    Examples:
    {
      "type": "xp_milestone",
      "threshold": 1000
    }
    {
      "type": "streak",
      "days": 7
    }
    {
      "type": "paths_completed",
      "count": 5
    }
    {
      "type": "perfect_score",
      "path_id": 1
    }
  */
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Constraints
  CONSTRAINT valid_rarity CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

-- Indexes
CREATE INDEX idx_achievements_rarity ON achievements(rarity);
CREATE INDEX idx_achievements_is_active ON achievements(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_achievements_display_order ON achievements(display_order);

-- Comments
COMMENT ON TABLE achievements IS 'Available badges and achievements';
COMMENT ON COLUMN achievements.unlock_criteria IS 'JSONB defining how achievement is earned';
```

---

### 7. user_achievements

**Purpose**: Track which users have earned which achievements

```sql
CREATE TABLE user_achievements (
  -- Foreign Keys (Composite Primary Key)
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  
  -- Metadata
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_data JSONB, -- For partially-completed achievements
  
  -- Primary Key
  PRIMARY KEY (user_id, achievement_id)
);

-- Indexes
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement ON user_achievements(achievement_id);
CREATE INDEX idx_user_achievements_earned_at ON user_achievements(earned_at DESC);

-- Comments
COMMENT ON TABLE user_achievements IS 'Junction table: users to achievements';
COMMENT ON COLUMN user_achievements.progress_data IS 'Optional progress tracking for multi-step achievements';
```

---

## Views

### 1. leaderboard

**Purpose**: Global leaderboard with rankings

```sql
CREATE VIEW leaderboard AS
SELECT 
  u.id,
  u.username,
  u.name,
  u.avatar_url,
  u.role,
  u.church_name,
  us.total_xp,
  us.current_level,
  us.streak_days,
  us.lessons_completed,
  us.paths_completed,
  ROW_NUMBER() OVER (ORDER BY us.total_xp DESC, u.created_at ASC) as rank,
  -- Calculate percentile
  PERCENT_RANK() OVER (ORDER BY us.total_xp DESC) as percentile
FROM users u
JOIN user_stats us ON u.id = us.user_id
ORDER BY us.total_xp DESC;

-- Comments
COMMENT ON VIEW leaderboard IS 'Global user rankings by XP';
```

---

### 2. user_dashboard

**Purpose**: Aggregated dashboard data for a user

```sql
CREATE VIEW user_dashboard AS
SELECT 
  u.id,
  u.username,
  u.name,
  u.email,
  u.role,
  u.avatar_url,
  -- Stats
  us.total_xp,
  us.current_level,
  us.streak_days,
  us.lessons_completed,
  us.paths_completed,
  us.lives,
  us.hints_available,
  -- Progress
  COUNT(DISTINCT up.path_id) FILTER (WHERE up.status = 'in_progress') as paths_in_progress,
  COUNT(DISTINCT up.path_id) FILTER (WHERE up.status = 'completed') as paths_completed_count,
  -- Achievements
  COUNT(DISTINCT ua.achievement_id) as achievements_earned,
  -- Recent Activity
  MAX(up.last_activity_at) as last_learning_activity
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id
LEFT JOIN user_progress up ON u.id = up.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
GROUP BY u.id, u.username, u.name, u.email, u.role, u.avatar_url,
         us.total_xp, us.current_level, us.streak_days, us.lessons_completed,
         us.paths_completed, us.lives, us.hints_available;

-- Comments
COMMENT ON VIEW user_dashboard IS 'Aggregated dashboard data per user';
```

---

### 3. path_analytics

**Purpose**: Analytics for learning paths

```sql
CREATE VIEW path_analytics AS
SELECT 
  lp.id,
  lp.title,
  lp.status,
  lp.difficulty,
  -- Enrollment Stats
  COUNT(DISTINCT up.user_id) as total_enrollments,
  COUNT(DISTINCT up.user_id) FILTER (WHERE up.status = 'completed') as total_completions,
  -- Completion Rate
  CASE 
    WHEN COUNT(DISTINCT up.user_id) > 0 
    THEN (COUNT(DISTINCT up.user_id) FILTER (WHERE up.status = 'completed') * 100.0) 
         / COUNT(DISTINCT up.user_id)
    ELSE 0
  END as completion_rate,
  -- Average Performance
  AVG(up.average_score) FILTER (WHERE up.status = 'completed') as avg_completion_score,
  -- Time Stats
  AVG(EXTRACT(EPOCH FROM (up.completed_at - up.started_at)) / 3600) 
    FILTER (WHERE up.completed_at IS NOT NULL) as avg_hours_to_complete
FROM learning_paths lp
LEFT JOIN user_progress up ON lp.id = up.path_id
GROUP BY lp.id, lp.title, lp.status, lp.difficulty;

-- Comments
COMMENT ON VIEW path_analytics IS 'Performance analytics for each learning path';
```

---

## Functions

### 1. complete_chapter

**Purpose**: Handle chapter completion logic (XP, bonuses, progress)

```sql
CREATE OR REPLACE FUNCTION complete_chapter(
  p_user_id UUID,
  p_path_id INTEGER,
  p_chapter_id INTEGER,
  p_questions_total INTEGER,
  p_questions_correct INTEGER,
  p_points_earned INTEGER,
  p_points_possible INTEGER,
  p_lives_lost INTEGER,
  p_hints_used INTEGER
) RETURNS JSONB AS $$
DECLARE
  v_passed BOOLEAN;
  v_chapter_bonus INTEGER := 0;
  v_path_bonus INTEGER := 0;
  v_total_xp INTEGER;
  v_is_final_chapter BOOLEAN;
  v_total_chapters INTEGER;
  v_new_level INTEGER;
BEGIN
  -- Calculate if passed (70% or higher)
  v_passed := (p_points_earned * 100.0 / p_points_possible) >= 70;
  
  -- Only continue if passed
  IF NOT v_passed THEN
    -- Record failed attempt
    INSERT INTO chapter_attempts (
      user_id, path_id, chapter_id,
      questions_total, questions_correct,
      points_earned, points_possible,
      lives_lost, hints_used,
      time_completed
    ) VALUES (
      p_user_id, p_path_id, p_chapter_id,
      p_questions_total, p_questions_correct,
      p_points_earned, p_points_possible,
      p_lives_lost, p_hints_used,
      NOW()
    );
    
    RETURN jsonb_build_object(
      'passed', FALSE,
      'score', (p_points_earned * 100 / p_points_possible),
      'xp_gained', 0
    );
  END IF;
  
  -- Get path info
  SELECT 
    jsonb_array_length(chapters),
    (jsonb_array_length(chapters) = p_chapter_id)
  INTO v_total_chapters, v_is_final_chapter
  FROM learning_paths
  WHERE id = p_path_id;
  
  -- Calculate bonuses
  v_chapter_bonus := 50; -- Standard chapter bonus
  IF v_is_final_chapter THEN
    v_path_bonus := 100; -- Path completion bonus
  END IF;
  
  v_total_xp := p_points_earned + v_chapter_bonus + v_path_bonus;
  
  -- Record successful attempt
  INSERT INTO chapter_attempts (
    user_id, path_id, chapter_id,
    questions_total, questions_correct,
    points_earned, points_possible,
    lives_lost, hints_used,
    chapter_bonus_earned, path_bonus_earned,
    time_completed
  ) VALUES (
    p_user_id, p_path_id, p_chapter_id,
    p_questions_total, p_questions_correct,
    p_points_earned, p_points_possible,
    p_lives_lost, p_hints_used,
    TRUE, v_is_final_chapter,
    NOW()
  );
  
  -- Update user progress
  INSERT INTO user_progress (
    user_id, path_id, total_chapters,
    chapters_completed, current_chapter,
    total_points_earned, total_points_possible
  ) VALUES (
    p_user_id, p_path_id, v_total_chapters,
    ARRAY[p_chapter_id], p_chapter_id + 1,
    v_total_xp, p_points_possible
  )
  ON CONFLICT (user_id, path_id) DO UPDATE SET
    chapters_completed = array_append(user_progress.chapters_completed, p_chapter_id),
    current_chapter = GREATEST(user_progress.current_chapter, p_chapter_id + 1),
    total_points_earned = user_progress.total_points_earned + v_total_xp,
    total_points_possible = user_progress.total_points_possible + p_points_possible,
    status = CASE 
      WHEN v_is_final_chapter THEN 'completed'
      ELSE 'in_progress'
    END,
    completed_at = CASE
      WHEN v_is_final_chapter THEN NOW()
      ELSE user_progress.completed_at
    END;
  
  -- Update user stats
  UPDATE user_stats
  SET 
    total_xp = total_xp + v_total_xp,
    xp_current_level = xp_current_level + v_total_xp,
    lessons_completed = lessons_completed + 1,
    paths_completed = CASE 
      WHEN v_is_final_chapter THEN paths_completed + 1
      ELSE paths_completed
    END,
    lives = GREATEST(0, lives - p_lives_lost),
    hints_available = GREATEST(0, hints_available - p_hints_used)
  WHERE user_id = p_user_id
  RETURNING current_level INTO v_new_level;
  
  -- Check for level up (simplified: every 100 XP)
  -- In production, use exponential curve
  PERFORM check_level_up(p_user_id);
  
  -- Check for achievements
  PERFORM check_achievements(p_user_id);
  
  -- Return summary
  RETURN jsonb_build_object(
    'passed', TRUE,
    'score', (p_points_earned * 100 / p_points_possible),
    'points_earned', p_points_earned,
    'chapter_bonus', v_chapter_bonus,
    'path_bonus', v_path_bonus,
    'total_xp', v_total_xp,
    'is_path_complete', v_is_final_chapter,
    'new_level', v_new_level
  );
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON FUNCTION complete_chapter IS 'Handles all chapter completion logic';
```

---

### 2. refresh_daily_resources

**Purpose**: Reset lives and hints daily

```sql
CREATE OR REPLACE FUNCTION refresh_daily_resources()
RETURNS void AS $$
BEGIN
  UPDATE user_stats
  SET 
    lives = max_lives,
    hints_available = max_hints,
    last_lives_refresh = CURRENT_DATE
  WHERE last_lives_refresh < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Schedule this to run daily (via pg_cron or external cron)
-- Example: SELECT cron.schedule('refresh-resources', '0 0 * * *', 'SELECT refresh_daily_resources()');

-- Comments
COMMENT ON FUNCTION refresh_daily_resources IS 'Resets lives and hints to max daily';
```

---

### 3. check_achievements

**Purpose**: Award achievements based on user stats

```sql
CREATE OR REPLACE FUNCTION check_achievements(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_stats RECORD;
  v_achievement RECORD;
BEGIN
  -- Get user stats
  SELECT * INTO v_stats
  FROM user_stats
  WHERE user_id = p_user_id;
  
  -- Check each achievement type
  FOR v_achievement IN 
    SELECT * FROM achievements WHERE is_active = TRUE
  LOOP
    -- XP Milestone
    IF v_achievement.unlock_criteria->>'type' = 'xp_milestone' THEN
      IF v_stats.total_xp >= (v_achievement.unlock_criteria->>'threshold')::INTEGER THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (p_user_id, v_achievement.id)
        ON CONFLICT DO NOTHING;
      END IF;
    END IF;
    
    -- Streak
    IF v_achievement.unlock_criteria->>'type' = 'streak' THEN
      IF v_stats.streak_days >= (v_achievement.unlock_criteria->>'days')::INTEGER THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (p_user_id, v_achievement.id)
        ON CONFLICT DO NOTHING;
      END IF;
    END IF;
    
    -- Paths Completed
    IF v_achievement.unlock_criteria->>'type' = 'paths_completed' THEN
      IF v_stats.paths_completed >= (v_achievement.unlock_criteria->>'count')::INTEGER THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (p_user_id, v_achievement.id)
        ON CONFLICT DO NOTHING;
      END IF;
    END IF;
    
    -- Add more achievement types as needed
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON FUNCTION check_achievements IS 'Awards achievements based on current user stats';
```

---

## Row-Level Security (RLS)

### Enable RLS on all tables

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
```

---

### users policies

```sql
-- Users can view their own profile
CREATE POLICY "users_select_own"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (except admin flag)
CREATE POLICY "users_update_own"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND is_admin = (SELECT is_admin FROM users WHERE id = auth.uid())
  );

-- Admins can view all users
CREATE POLICY "admin_select_all_users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admins can update any user
CREATE POLICY "admin_update_users"
  ON users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
```

---

### user_stats policies

```sql
-- Users can view and update their own stats
CREATE POLICY "user_stats_select_own"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_stats_update_own"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can view all stats
CREATE POLICY "admin_select_all_stats"
  ON user_stats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
```

---

### user_progress policies

```sql
-- Users can manage their own progress
CREATE POLICY "user_progress_select_own"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_progress_insert_own"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_update_own"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### learning_paths policies

```sql
-- Anyone can view published paths
CREATE POLICY "learning_paths_select_published"
  ON learning_paths FOR SELECT
  USING (status = 'published');

-- Admins can do anything
CREATE POLICY "admin_manage_paths"
  ON learning_paths FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
```

---

### achievements policies

```sql
-- Anyone can view active achievements
CREATE POLICY "achievements_select_active"
  ON achievements FOR SELECT
  USING (is_active = TRUE);

-- Admins can manage achievements
CREATE POLICY "admin_manage_achievements"
  ON achievements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
```

---

### user_achievements policies

```sql
-- Users can view their own achievements
CREATE POLICY "user_achievements_select_own"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

-- System can insert (via functions)
CREATE POLICY "system_insert_achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (TRUE);
```

---

## Indexes Summary

```sql
-- Performance-critical indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_stats_xp ON user_stats(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_path ON user_progress(path_id);
CREATE INDEX IF NOT EXISTS idx_chapter_attempts_user ON chapter_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_paths_status ON learning_paths(status);
CREATE INDEX IF NOT EXISTS idx_learning_paths_categories ON learning_paths USING GIN(categories);
```

---

## Migration Strategy

### Phase 1: Initial Schema

```sql
-- Run in order:
1. Create users table
2. Create user_stats table (with foreign key to users)
3. Create learning_paths table
4. Create user_progress table
5. Create chapter_attempts table
6. Create achievements table
7. Create user_achievements table
8. Create views
9. Create functions
10. Enable RLS and create policies
```

### Phase 2: Seed Data

```sql
-- Insert initial achievements
INSERT INTO achievements (name, description, rarity, unlock_criteria) VALUES
('First Steps', 'Complete your first lesson', 'common', '{"type": "lessons_completed", "count": 1}'),
('Week Warrior', 'Maintain a 7-day streak', 'rare', '{"type": "streak", "days": 7}'),
('XP Master', 'Reach 1000 XP', 'rare', '{"type": "xp_milestone", "threshold": 1000}'),
('Path Pioneer', 'Complete your first learning path', 'epic', '{"type": "paths_completed", "count": 1}'),
('Perfect Score', 'Score 100% on any chapter', 'rare', '{"type": "perfect_score"}');

-- Insert sample learning path (simplified)
INSERT INTO learning_paths (title, description, difficulty, status) VALUES
('Leadership Fundamentals', 'Master essential leadership principles', 'Foundation', 'published');
```

---

## Backup & Maintenance

```sql
-- Daily backup command (via cron)
pg_dump -h localhost -U postgres churchacademy > backup_$(date +%Y%m%d).sql

-- Vacuum tables monthly
VACUUM ANALYZE users;
VACUUM ANALYZE user_stats;
VACUUM ANALYZE user_progress;
VACUUM ANALYZE chapter_attempts;

-- Reindex if needed
REINDEX TABLE user_stats;
```

---

## Performance Monitoring

```sql
-- Check slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## Version History

- **v1.0** (Jan 2025): Initial schema design
- **v1.1** (Planned): Add ratings, reviews, comments tables
- **v2.0** (Planned): Multi-tenancy for church organizations

---

**End of Database Schema Documentation**
