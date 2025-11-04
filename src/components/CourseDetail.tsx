import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Star, 
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Lock,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock chapter data structure
const getMockChapters = (courseId) => {
  // Different chapter structures based on course
  const chapterStructures = {
    4: [ // Communication Excellence
      {
        id: 1,
        title: 'Foundations of Communication',
        description: 'Learn the core principles of effective ministry communication.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Active Listening Skills',
        description: 'Develop deep listening skills for pastoral care.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Public Speaking Mastery',
        description: 'Communicate with confidence from the pulpit.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ],
    5: [ // Youth Ministry Leadership
      {
        id: 1,
        title: 'Understanding Gen Z',
        description: 'Connect with the next generation effectively.',
        totalQuestions: 8,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 120
      },
      {
        id: 2,
        title: 'Building Trust',
        description: 'Create authentic relationships with youth.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Event Planning',
        description: 'Design impactful youth events and retreats.',
        totalQuestions: 8,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 120
      }
    ],
    6: [ // Volunteer Management
      {
        id: 1,
        title: 'Recruitment Strategies',
        description: 'Attract and onboard dedicated volunteers.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Training & Development',
        description: 'Equip volunteers for effective ministry.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Retention & Recognition',
        description: 'Keep volunteers engaged and appreciated.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  };
  
  return chapterStructures[courseId] || chapterStructures[4];
};

export function CourseDetail({ course, onBack, onStartLesson }) {
  const [chapters] = useState(getMockChapters(course.id));
  
  // Calculate overall progress
  const totalQuestions = chapters.reduce((sum, ch) => sum + ch.totalQuestions, 0);
  const completedQuestions = chapters.reduce((sum, ch) => sum + ch.completedQuestions, 0);
  const overallProgress = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const completedChapters = chapters.filter(ch => ch.status === 'completed').length;

  return (
    <div className="lg:ml-80 p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-2 text-[var(--gray-primary)] hover:bg-[var(--powder-blue)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Course Header Card */}
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-[var(--powder-blue)] to-white">
            <div className="space-y-4">
              {/* Title and Difficulty */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-14 h-14 rounded-xl ${course.color} shadow-md flex items-center justify-center`}>
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-[var(--text-primary)] mb-1">{course.title}</h1>
                      <Badge variant="secondary" className="text-sm shadow-sm">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white/80 rounded-lg p-3 shadow-sm">
                  <Clock className="w-4 h-4 text-[var(--gray-primary)]" />
                  <div>
                    <div className="text-xs text-[var(--text-secondary)]">Duration</div>
                    <div className="text-[var(--text-primary)] text-sm">{course.estimatedTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/80 rounded-lg p-3 shadow-sm">
                  <Star className="w-4 h-4 text-[var(--gray-primary)]" />
                  <div>
                    <div className="text-xs text-[var(--text-secondary)]">Total XP</div>
                    <div className="text-[var(--text-primary)] text-sm">{course.xpReward} XP</div>
                  </div>
                </div>
              </div>

              {/* Categories and Roles */}
              <div className="space-y-2">
                {course.categories && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-[var(--text-secondary)]">Categories:</span>
                    {course.categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs shadow-sm">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {course.roles && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-[var(--text-secondary)]">For:</span>
                    {course.roles.slice(0, 3).map((role) => (
                      <Badge key={role} variant="outline" className="text-xs shadow-sm">
                        {role}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Overall Progress */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--text-primary)]">
                    {completedChapters} of {chapters.length} chapters
                  </span>
                  <span className="text-sm text-[var(--text-primary)]">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* What You'll Learn */}
        <Card className="shadow-sm">
          <CardHeader>
            <h3 className="text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              What You'll Learn
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-dark)] mt-0.5 flex-shrink-0" />
                <span>Master {course.title.toLowerCase()} principles and best practices</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-dark)] mt-0.5 flex-shrink-0" />
                <span>Apply biblical wisdom to real-world ministry scenarios</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-dark)] mt-0.5 flex-shrink-0" />
                <span>Complete interactive exercises and receive personalized feedback</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-dark)] mt-0.5 flex-shrink-0" />
                <span>Earn {course.xpReward} XP and unlock achievement badges</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => {
            const chapterProgress = chapter.totalQuestions > 0 
              ? (chapter.completedQuestions / chapter.totalQuestions) * 100 
              : 0;
            
            return (
              <Card 
                key={chapter.id}
                className={`overflow-hidden transition-all shadow-sm ${
                  chapter.status === 'locked' ? 'opacity-60' : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Chapter Number/Status Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl shadow-md flex items-center justify-center ${
                      chapter.status === 'completed' ? 'bg-[var(--mint-primary)]' :
                      chapter.status === 'in-progress' ? 'bg-blue-400' :
                      chapter.status === 'locked' ? 'bg-[var(--gray-lighter)]' :
                      'bg-white border-2 border-[var(--gray-light)]'
                    }`}>
                      {chapter.status === 'completed' ? (
                        <CheckCircle2 className="w-8 h-8 text-[var(--gray-primary)]" />
                      ) : chapter.status === 'locked' ? (
                        <Lock className="w-6 h-6 text-[var(--gray-medium)]" />
                      ) : (
                        <span className={`text-2xl ${
                          chapter.status === 'in-progress' ? 'text-white' : 'text-[var(--gray-primary)]'
                        }`}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Chapter Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <h3 className="text-[var(--text-primary)] mb-1">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {chapter.description}
                        </p>
                      </div>

                      {/* Progress (if started) */}
                      {(chapter.status === 'in-progress' || chapter.status === 'completed') && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[var(--text-secondary)]">
                              {chapter.completedQuestions} of {chapter.totalQuestions} questions
                            </span>
                            {chapter.status === 'completed' && chapter.score && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--mint-dark)]">
                                  Score: {chapter.score}%
                                </span>
                                <div className="flex items-center">
                                  {[1, 2, 3].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-3 h-3 ${
                                        star <= (chapter.stars || 0)
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <Progress value={chapterProgress} className="h-2" />
                        </div>
                      )}

                      {/* Chapter Stats & Actions */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                          <Star className="w-4 h-4 text-[var(--gray-primary)]" />
                          <span className="text-sm">{chapter.xpReward} XP</span>
                        </div>

                        <Button 
                          size="sm"
                          onClick={() => onStartLesson(chapter)}
                          disabled={chapter.status === 'locked'}
                          className={
                            chapter.status === 'completed' 
                              ? 'bg-[var(--mint-primary)] hover:bg-[var(--mint-dark)] text-[var(--gray-primary)] shadow-md hover:shadow-lg' 
                              : chapter.status === 'in-progress'
                              ? 'bg-blue-400 hover:bg-blue-500 text-white shadow-md hover:shadow-lg'
                              : chapter.status === 'locked'
                              ? 'bg-[var(--gray-lighter)] text-[var(--gray-medium)] cursor-not-allowed shadow-sm'
                              : 'bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg'
                          }
                        >
                          {chapter.status === 'completed' ? (
                            <>Review <ChevronRight className="w-4 h-4 ml-1" /></>
                          ) : chapter.status === 'in-progress' ? (
                            <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                          ) : chapter.status === 'locked' ? (
                            <>Locked <Lock className="w-4 h-4 ml-1" /></>
                          ) : (
                            <>Start <PlayCircle className="w-4 h-4 ml-1" /></>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Completion Card (if all chapters done) */}
        {completedChapters === chapters.length && (
          <Card className="bg-gradient-to-r from-[var(--mint-primary)]/20 to-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[var(--mint-primary)] shadow-md flex items-center justify-center">
                  <Award className="w-8 h-8 text-[var(--gray-primary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[var(--text-primary)] mb-1">
                    Course Complete! 🎉
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Congratulations on completing {course.title}! You've earned {course.xpReward} XP.
                  </p>
                </div>
                <Button className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg">
                  View Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
