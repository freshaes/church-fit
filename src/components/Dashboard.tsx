import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Target, 
  BookOpen, 
  Star, 
  Flame, 
  Users, 
  Award,
  ChevronRight,
  Trophy,
  TrendingUp,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Map role IDs to display names
const roleDisplayNames = {
  'senior-pastor': 'Senior Pastor',
  'youth-minister': 'Youth Minister',
  'worship-leader': 'Worship Leader',
  'admin-team': 'Admin Team',
  'volunteer-leader': 'Volunteer Leader',
  'tech-team': 'Tech Team'
};

const recommendedCourses = [
  {
    id: 4,
    title: 'Communication Excellence',
    description: 'Develop clear, compassionate communication skills for ministry leadership.',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['senior-pastor', 'youth-minister', 'admin-team'],
    icon: BookOpen,
    color: 'bg-[var(--sky-primary)]'
  },
  {
    id: 5,
    title: 'Youth Ministry Leadership',
    description: 'Engage and disciple the next generation with effective youth ministry strategies.',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['youth-minister', 'volunteer-leader'],
    icon: Users,
    color: 'bg-[var(--mint-primary)]'
  },
  {
    id: 6,
    title: 'Volunteer Management',
    description: 'Recruit, train, and retain dedicated volunteers for your ministry.',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['volunteer-leader', 'senior-pastor', 'youth-minister'],
    icon: Users,
    color: 'bg-[var(--coral-primary)]'
  },
  {
    id: 7,
    title: 'Spiritual Formation',
    description: 'Deepen your spiritual life and guide others in their faith journey.',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['senior-pastor', 'youth-minister', 'volunteer-leader'],
    icon: BookOpen,
    color: 'bg-[var(--mint-dark)]'
  }
];

const mockLearningPaths = [
  {
    id: 1,
    title: 'Leadership Fundamentals',
    description: 'Master the essential principles of servant leadership in a church context.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    completedChapters: 1,
    chapters: [
      {
        id: 1,
        title: 'Introduction to Leadership',
        description: 'Understanding the basics of Christian leadership and team dynamics.',
        totalQuestions: 7,
        completedQuestions: 7,
        status: 'completed',
        xpReward: 100,
        score: 92,
        stars: 3
      },
      {
        id: 2,
        title: 'Team Building',
        description: 'Learn to build and develop high-performing ministry teams.',
        totalQuestions: 7,
        completedQuestions: 3,
        status: 'in-progress',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Decision Making',
        description: 'Make wise decisions through prayer, counsel, and discernment.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  },
  {
    id: 2,
    title: 'Conflict Resolution Mastery',
    description: 'Learn advanced techniques for resolving conflicts with grace and wisdom.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    completedChapters: 0,
    chapters: [
      {
        id: 1,
        title: 'Understanding Conflict',
        description: 'Identify the root causes and types of conflicts in ministry.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Resolution Strategies',
        description: 'Learn practical tools for mediating and resolving disputes.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Restoration & Healing',
        description: 'Guide relationships toward reconciliation and restoration.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  },
  {
    id: 3,
    title: 'Building Strong Communities',
    description: 'Create lasting connections and foster unity in your ministry.',
    difficulty: 'Beginner',
    totalChapters: 3,
    completedChapters: 0,
    chapters: [
      {
        id: 1,
        title: 'Welcoming Newcomers',
        description: 'Make first-time visitors feel welcomed and valued.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Building Relationships',
        description: 'Foster deep, meaningful connections within your community.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Creating Culture',
        description: 'Develop a healthy, vibrant community culture.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  }
];

const friends = [
  { name: 'Sarah M.', xp: 2485, avatar: 'S' },
  { name: 'Mike D.', xp: 980, avatar: 'M' },
  { name: 'You', xp: 1240, avatar: 'Y', isCurrentUser: true }
];

export function Dashboard({ userProfile, userData, onStartScenario, onViewCourse }) {
  const [expandedPaths, setExpandedPaths] = useState([1]); // Start with first path expanded
  const todaysGoal = 200;
  const progressToday = (userData.xp % todaysGoal) / todaysGoal * 100;

  const togglePath = (pathId) => {
    setExpandedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId)
        : [...prev, pathId]
    );
  };

  // PROTOTYPE: Hardcoded recommendations (in production, this would be personalized by role)
  const personalizedRecommendations = [
    recommendedCourses[0], // Communication Excellence
    recommendedCourses[1], // Youth Ministry Leadership
    recommendedCourses[2]  // Volunteer Management
  ];

  return (
    <div className="lg:ml-80 min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Welcome back, {userProfile.name}!
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            Continue your leadership development journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Progress - Fitness Style */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--mint-primary)]/20 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-[var(--mint-dark)]" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Daily Activity Goal</CardTitle>
                  </div>
                  <Badge className="bg-[var(--powder-blue)] text-[var(--text-primary)] font-medium text-sm px-3 py-1">
                    {userData.xp % todaysGoal}/{todaysGoal} pts
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progressToday} className="mb-3 h-2.5" />
                <p className="text-sm text-[var(--text-secondary)]">
                  {todaysGoal - (userData.xp % todaysGoal)} points to reach today's goal
                </p>
              </CardContent>
            </Card>

            {/* Learning Paths - Training Programs */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-[var(--text-primary)]">
                  <BookOpen className="w-5 h-5 text-[var(--text-primary)]" />
                  <span>Training Programs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockLearningPaths.map((path) => {
                  const isExpanded = expandedPaths.includes(path.id);
                  const pathProgress = (path.completedChapters / path.totalChapters) * 100;
                  
                  // Find the next chapter to continue (first non-completed chapter)
                  const nextChapter = path.chapters.find(ch => ch.status !== 'completed') || path.chapters[0];
                  
                  return (
                    <Collapsible
                      key={path.id}
                      open={isExpanded}
                      onOpenChange={() => togglePath(path.id)}
                    >
                      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
                        {/* Path Header - Quick Summary */}
                        <div className="bg-gradient-to-r from-[var(--mint-primary)]/10 to-[var(--powder-blue)]/30 p-5">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{path.title}</h3>
                              <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{path.description}</p>
                            </div>
                            
                            {/* Details Toggle Button */}
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-shrink-0 h-9 px-3 hover:bg-white/60 rounded-lg border-0 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="mr-1">Details</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-[var(--text-tertiary)]">
                                {path.completedChapters} of {path.totalChapters} chapters
                              </span>
                              <span className="text-xs font-bold text-[var(--text-primary)]">
                                {Math.round(pathProgress)}%
                              </span>
                            </div>
                            <Progress value={pathProgress} className="h-2" />
                          </div>
                          
                          {/* Continue Button */}
                          <Button
                            onClick={() => onStartScenario({
                              id: path.id,
                              pathId: path.id,
                              chapterId: nextChapter.id,
                              title: nextChapter.title,
                              pathTitle: path.title,
                              description: nextChapter.description,
                              xpReward: nextChapter.xpReward
                            })}
                            className="w-full bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium border-0 h-11 text-sm"
                          >
                            {path.completedChapters === path.totalChapters ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Review Path
                              </>
                            ) : path.completedChapters > 0 ? (
                              <>
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Continue: {nextChapter.title}
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Learning
                              </>
                            )}
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          </Button>
                        </div>

                        {/* Detailed Chapters List */}
                        <CollapsibleContent>
                          <div className="bg-white border-t border-[var(--border-light)]">
                            {/* Path Metadata (shown when expanded) */}
                            <div className="px-5 py-3 border-b border-[var(--border-light)] bg-[var(--bg-secondary)]">
                              <div className="flex items-center gap-4 text-sm">
                                <Badge className="text-xs bg-[var(--powder-blue)] text-[var(--text-primary)] border-0 font-medium">
                                  {path.difficulty}
                                </Badge>
                                <span className="text-[var(--text-secondary)] text-sm">
                                  {path.totalChapters} chapters
                                </span>
                              </div>
                            </div>
                            
                            {/* Chapter List */}
                            <div className="divide-y divide-[var(--border-light)]">
                              {path.chapters.map((chapter, index) => (
                                <div
                                  key={chapter.id}
                                  className={`p-5 transition-colors ${
                                    chapter.status === 'locked' 
                                      ? 'opacity-60 bg-[var(--bg-secondary)]' 
                                      : 'hover:bg-[var(--bg-secondary)]'
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    {/* Chapter Number */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold flex-shrink-0 ${
                                      chapter.status === 'completed'
                                        ? 'bg-[var(--mint-primary)] text-[var(--text-primary)] shadow-sm'
                                        : chapter.status === 'in-progress'
                                        ? 'bg-[var(--gray-primary)] text-white shadow-sm'
                                        : chapter.status === 'locked'
                                        ? 'bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-tertiary)]'
                                        : 'bg-white border border-[var(--border-medium)] text-[var(--text-primary)] shadow-sm'
                                    }`}>
                                      {chapter.status === 'completed' ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                      ) : chapter.status === 'locked' ? (
                                        <Lock className="w-5 h-5" />
                                      ) : (
                                        <span className="text-base">{index + 1}</span>
                                      )}
                                    </div>

                                    {/* Chapter Content */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-3 mb-2">
                                        <div>
                                          <h4 className="font-semibold text-[var(--text-primary)] mb-1 text-base">
                                            {chapter.title}
                                          </h4>
                                          <p className="text-sm text-[var(--text-secondary)]">
                                            {chapter.description}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Chapter Progress */}
                                      {(chapter.status === 'in-progress' || chapter.status === 'completed') && (
                                        <div className="mb-3">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-[var(--text-tertiary)] font-medium">
                                              {chapter.completedQuestions} of {chapter.totalQuestions} questions
                                            </span>
                                            {chapter.status === 'completed' && (
                                              <div className="flex items-center gap-3">
                                                <span className="text-xs text-[var(--mint-dark)] font-semibold">
                                                  Score: {chapter.score}%
                                                </span>
                                                <div className="flex items-center gap-0.5">
                                                  {[1, 2, 3].map((star) => (
                                                    <Star
                                                      key={star}
                                                      className={`w-3.5 h-3.5 ${
                                                        star <= chapter.stars
                                                          ? 'fill-[var(--amber-primary)] text-[var(--amber-primary)]'
                                                          : 'text-[var(--border-medium)]'
                                                      }`}
                                                    />
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <Progress 
                                            value={(chapter.completedQuestions / chapter.totalQuestions) * 100} 
                                            className="h-2"
                                          />
                                        </div>
                                      )}

                                      {/* Chapter Actions */}
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                                          <Star className="w-4 h-4 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                                          <span className="font-medium">{chapter.xpReward} XP</span>
                                        </div>
                                        
                                        <Button
                                          onClick={() => onStartScenario({
                                            id: path.id,
                                            pathId: path.id,
                                            chapterId: chapter.id,
                                            title: chapter.title,
                                            pathTitle: path.title,
                                            description: chapter.description,
                                            xpReward: chapter.xpReward
                                          })}
                                          size="sm"
                                          disabled={chapter.status === 'locked'}
                                          className={`${
                                            chapter.status === 'completed'
                                              ? 'bg-white hover:bg-[var(--powder-blue)] text-[var(--text-primary)] border border-[var(--border-medium)]'
                                              : 'bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white border-0'
                                          } shadow-sm hover:shadow-md transition-all duration-200 font-medium h-9 px-4 rounded-lg text-sm`}
                                        >
                                          {chapter.status === 'completed' ? (
                                            <>Review <ChevronRight className="w-4 h-4 ml-1" /></>
                                          ) : chapter.status === 'in-progress' ? (
                                            <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                                          ) : chapter.status === 'locked' ? (
                                            <>Locked <Lock className="w-4 h-4 ml-1" /></>
                                          ) : (
                                            <>Start <ChevronRight className="w-4 h-4 ml-1" /></>
                                          )}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recommended for You */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-[var(--text-primary)]">
                    <Star className="w-5 h-5 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                    <span>Recommended Programs</span>
                  </CardTitle>
                  <Badge className="bg-[var(--powder-blue)] text-[var(--text-primary)] font-medium text-xs px-3 py-1">
                    Personalized
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalizedRecommendations.map((course) => {
                    const IconComponent = course.icon;
                    return (
                      <div 
                        key={course.id}
                        className="rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-[var(--bg-secondary)] hover:bg-white"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`w-14 h-14 rounded-lg ${course.color} shadow-sm flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-[var(--text-primary)] text-base">{course.title}</h4>
                              <Badge className="bg-[var(--powder-blue)] text-[var(--text-primary)] border-0 font-medium text-xs flex-shrink-0">
                                {course.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                              {course.description}
                            </p>

                            {/* Stats & CTA */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                                <div className="flex items-center gap-1.5">
                                  <Target className="w-4 h-4 text-[var(--text-tertiary)]" />
                                  <span className="font-medium">{course.estimatedTime}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Star className="w-4 h-4 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                                  <span className="font-medium">{course.xpReward} XP</span>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => onViewCourse(course)}
                                className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 font-medium h-9 px-4 rounded-lg text-sm"
                              >
                                View Course
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[var(--text-primary)]">Today's Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[var(--powder-blue)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Flame className="w-6 h-6 text-[var(--coral-primary)]" fill="var(--coral-primary)" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">Day Streak</span>
                  </div>
                  <span className="text-3xl font-bold text-[var(--text-primary)]">{userData.streak}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[var(--powder-blue)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Star className="w-6 h-6 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">Points Earned</span>
                  </div>
                  <span className="text-3xl font-bold text-[var(--text-primary)]">120</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[var(--powder-blue)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <BookOpen className="w-6 h-6 text-[var(--gray-medium)]" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-secondary)]">Lessons</span>
                  </div>
                  <span className="text-3xl font-bold text-[var(--text-primary)]">{userData.lessonsCompleted}</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-[var(--text-primary)]">
                  <Award className="w-5 h-5 text-[var(--amber-primary)]" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {userData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3 p-3 bg-[var(--powder-blue)] rounded-xl hover:shadow-sm transition-shadow">
                    <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Award className="w-6 h-6 text-[var(--amber-primary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--text-primary)]">{achievement.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Friends Leaderboard */}
            <Card className="bg-white shadow-md rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-lg font-semibold text-[var(--text-primary)]">
                    <Trophy className="w-5 h-5 text-[var(--amber-primary)]" />
                    <span>This Week</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[var(--bg-secondary)] rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[var(--text-secondary)]" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {friends.map((friend, index) => (
                  <div key={friend.name} className={`flex items-center gap-3 p-3 rounded-xl ${friend.isCurrentUser ? 'bg-[var(--mint-primary)]/15 shadow-sm' : 'bg-[var(--bg-secondary)]'}`}>
                    <div className="text-sm font-bold text-[var(--text-tertiary)] w-6">
                      #{index + 1}
                    </div>
                    <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                      <AvatarFallback className={`${friend.isCurrentUser ? 'bg-[var(--mint-primary)] text-[var(--text-primary)]' : 'bg-white text-[var(--text-primary)]'} font-semibold`}>
                        {friend.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{friend.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)] font-medium">{friend.xp} pts</p>
                    </div>
                    {friend.isCurrentUser && (
                      <Badge className="bg-[var(--mint-primary)] text-[var(--text-primary)] font-semibold text-xs px-2.5 py-0.5">You</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
