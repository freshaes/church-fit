import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Star,
  Filter,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { motion, AnimatePresence } from 'motion/react';

// Mock reflection data - will be replaced with real data
const mockReflections = [
  {
    id: 1,
    userId: 1,
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 2,
    chapterTitle: 'Servant Leadership',
    questionId: 5,
    question: 'Reflect on a time when you had to make a difficult leadership decision. What did you learn from that experience?',
    reflectionText: 'When I had to restructure our youth ministry team last year, I learned that transparency and involving people in the process makes difficult decisions easier. I scheduled one-on-one conversations with each team member before announcing changes, which helped everyone feel heard and valued even during a challenging transition.',
    submittedAt: '2025-01-15T10:30:00Z',
    lastEditedAt: null,
    adminFeedback: {
      text: 'This is a wonderful example of servant leadership in action! Your approach of prioritizing individual conversations shows great care for your team. Consider how you might document this process to help other leaders navigate similar situations.',
      adminName: 'Pastor John',
      adminId: 5,
      feedbackAt: '2025-01-16T09:15:00Z',
      isFeatured: true
    },
    isPublic: false
  },
  {
    id: 2,
    userId: 1,
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 3,
    chapterTitle: 'Building Teams',
    questionId: 8,
    question: 'Describe your ideal team culture. What values and behaviors would you prioritize?',
    reflectionText: 'My ideal team culture values authenticity, collaboration, and grace. I want people to feel safe bringing their whole selves to the team, knowing they can make mistakes and learn together. Prayer and encouragement should be woven into everything we do.',
    submittedAt: '2025-01-14T14:20:00Z',
    lastEditedAt: null,
    adminFeedback: null,
    isPublic: false
  },
  {
    id: 3,
    userId: 1,
    pathId: 2,
    pathTitle: 'Conflict Resolution',
    chapterId: 1,
    chapterTitle: 'Understanding Conflict',
    questionId: 3,
    question: 'Think about a recent conflict you witnessed or experienced. What underlying needs or values were at stake?',
    reflectionText: 'Recently, two volunteers disagreed about the schedule for our Sunday morning setup. On the surface it seemed like a simple logistics issue, but deeper down, one person valued consistency and tradition while the other valued flexibility and innovation. Recognizing these different values helped me facilitate a conversation that honored both perspectives.',
    submittedAt: '2025-01-12T16:45:00Z',
    lastEditedAt: null,
    adminFeedback: {
      text: 'Excellent insight! You\'ve identified the key principle: most conflicts are about values, not just logistics. This kind of awareness will serve you well as a leader.',
      adminName: 'Pastor Sarah',
      adminId: 7,
      feedbackAt: '2025-01-13T11:30:00Z',
      isFeatured: false
    },
    isPublic: false
  }
];

export function MyReflections({ onBack, userProfile }) {
  const [reflections, setReflections] = useState(mockReflections);
  const [selectedPath, setSelectedPath] = useState('all');
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [expandedReflections, setExpandedReflections] = useState(new Set([1])); // First one expanded by default

  // Get unique paths from reflections
  const pathsMap = new Map();
  reflections.forEach(r => {
    if (!pathsMap.has(r.pathId)) {
      pathsMap.set(r.pathId, { id: r.pathId, title: r.pathTitle });
    }
  });
  const paths = Array.from(pathsMap.values());

  // Filter reflections
  const filteredReflections = reflections.filter(reflection => {
    const pathMatch = selectedPath === 'all' || reflection.pathId === parseInt(selectedPath);
    const feedbackMatch = feedbackFilter === 'all' || 
      (feedbackFilter === 'with-feedback' && reflection.adminFeedback) ||
      (feedbackFilter === 'no-feedback' && !reflection.adminFeedback);
    return pathMatch && feedbackMatch;
  });

  const toggleExpanded = (id) => {
    setExpandedReflections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="lg:ml-80 p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            My Reflections
          </h1>
          <p className="text-[var(--text-secondary)]">Your thoughts and feedback</p>
        </div>

        {/* Main Content */}
        <div>
          {/* Filters */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm text-[var(--text-secondary)] mb-2 block">Filter by Path</label>
                  <Select value={selectedPath} onValueChange={setSelectedPath}>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="All Paths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Paths</SelectItem>
                      {paths.map(path => (
                        <SelectItem key={path.id} value={path.id.toString()}>
                          {path.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-[var(--text-secondary)] mb-2 block">Feedback Status</label>
                  <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reflections</SelectItem>
                      <SelectItem value="with-feedback">With Feedback</SelectItem>
                      <SelectItem value="no-feedback">Awaiting Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflections List */}
          <div className="mt-6">
            {filteredReflections.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <h3 className="text-[var(--text-primary)] mb-2">No Reflections Yet</h3>
                <p className="text-[var(--text-secondary)]">
                  Start a learning path to write your first reflection
                </p>
                <Button
                  onClick={onBack}
                  className="mt-6 bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg px-8"
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredReflections.map((reflection, index) => {
                  const isExpanded = expandedReflections.has(reflection.id);
                  const hasNewFeedback = reflection.adminFeedback && 
                    new Date(reflection.adminFeedback.feedbackAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

                  return (
                    <motion.div
                      key={reflection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                        <CardHeader className="bg-[var(--powder-blue)] pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge 
                                  variant="secondary" 
                                  className="bg-white text-[var(--text-primary)] shadow-sm"
                                >
                                  {reflection.pathTitle}
                                </Badge>
                                {reflection.adminFeedback?.isFeatured && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-yellow-100 text-yellow-800 shadow-sm"
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {hasNewFeedback && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-orange-100 text-orange-800 shadow-sm"
                                  >
                                    New Feedback
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-[var(--text-primary)] mb-1">
                                {reflection.chapterTitle}
                              </CardTitle>
                              <p className="text-sm text-[var(--text-primary)] opacity-90">
                                {reflection.question}
                              </p>
                            </div>
                            <Button
                              onClick={() => toggleExpanded(reflection.id)}
                              variant="ghost"
                              size="icon"
                              className="rounded-lg hover:bg-white/50 flex-shrink-0"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-[var(--text-primary)]" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-[var(--text-primary)]" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CardContent className="p-6">
                                {/* User's Reflection */}
                                <div className="mb-6">
                                  <h4 className="text-sm text-[var(--text-secondary)] mb-3">Your Reflection</h4>
                                  <div className="bg-[var(--powder-blue)] rounded-lg border border-gray-200 p-4 shadow-sm">
                                    <p className="text-[var(--text-primary)]">
                                      {reflection.reflectionText}
                                    </p>
                                  </div>
                                </div>

                                {/* Admin Feedback */}
                                {reflection.adminFeedback ? (
                                  <div className="bg-green-50 rounded-lg border border-green-200 p-4 shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                      <MessageSquare className="w-4 h-4 text-green-700" />
                                      <h4 className="text-sm text-green-900">
                                        Feedback from {reflection.adminFeedback.adminName}
                                      </h4>
                                    </div>
                                    <p className="text-green-900 mb-3">
                                      {reflection.adminFeedback.text}
                                    </p>
                                    <p className="text-xs text-green-700">
                                      {formatDate(reflection.adminFeedback.feedbackAt)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 text-center shadow-sm">
                                    <p className="text-sm text-[var(--text-secondary)]">
                                      Awaiting feedback from your mentor
                                    </p>
                                  </div>
                                )}

                                {/* Footer */}
                                <Separator className="my-4 bg-gray-200" />
                                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Written {formatDate(reflection.submittedAt)}
                                  </div>
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Collapsed Preview */}
                        {!isExpanded && (
                          <CardContent className="p-6 pt-0">
                            <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                              {reflection.reflectionText}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                <Calendar className="w-3 h-3" />
                                {formatDate(reflection.submittedAt)}
                              </div>
                              {reflection.adminFeedback && (
                                <Badge 
                                  variant="secondary" 
                                  className="bg-green-100 text-green-800 shadow-sm text-xs"
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Has Feedback
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
