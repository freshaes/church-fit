import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  Plus, 
  Trash2, 
  Save,
  X,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Image,
  Video
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from './ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const roleOptions = [
  'Senior Pastor',
  'Youth Minister',
  'Worship Leader',
  'Admin Team',
  'Volunteer Leader',
  'Tech Team'
];

const goalOptions = [
  'Lead with Confidence',
  'Speak with Clarity',
  'Create Team Unity',
  'Resolve Conflicts Fast',
  'Develop Your People'
];

const categoryOptions = [
  'Leadership',
  'Communication',
  'Team Building',
  'Community',
  'Relationships',
  'Conflict Resolution',
  'Spiritual Growth',
  'Ministry Skills',
  'Administration',
  'Worship',
  'Youth Ministry',
  'Pastoral Care'
];

const difficultyOptions = [
  { value: 'Foundation', label: 'Foundation', description: 'Perfect for beginners' },
  { value: 'Intermediate', label: 'Intermediate', description: 'Some experience helpful' },
  { value: 'Expert', label: 'Expert', description: 'Advanced concepts' }
];

const questionTypes = [
  { value: 'content', label: 'Content Slide' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'true-false', label: 'True/False' },
  { value: 'multiple-answer', label: 'Multiple Answer' },
  { value: 'matching', label: 'Matching' },
  { value: 'fill-blank', label: 'Fill in the Blank' }
];

// Dummy path data for editing
const dummyPathData = {
  id: 1,
  title: 'Leadership Fundamentals',
  description: 'Master the essential principles of servant leadership in a church context.',
  difficulty: 'Intermediate',
  estimatedTime: '6 hours',
  categories: ['Leadership', 'Team Building'],
  thumbnailUrl: '',
  xpReward: 300,
  goals: [
    'Understand collaborative decision-making',
    'Practice servant leadership principles',
    'Adapt leadership styles to different situations',
    'Build and develop high-performing teams'
  ],
  targetRoles: ['Senior Pastor', 'Youth Minister', 'Volunteer Leader'],
  targetGoals: ['Lead with Confidence', 'Develop Your People'],
  status: 'published',
  chapters: [
    {
      id: 1,
      title: 'Introduction to Leadership',
      questions: [
        {
          id: 1,
          type: 'content',
          title: 'Welcome to Leadership Fundamentals',
          content: 'In this module, you\'ll learn the essential principles of servant leadership in a church context.\n\nEffective church leadership is about empowering others, building community, and creating an environment where everyone can use their gifts to serve God\'s mission.',
          imageUrl: '',
          videoUrl: ''
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: 'Your youth ministry team is divided on worship style preferences. How do you handle this conflict?',
          hint: 'Think about approaches that bring people together rather than impose solutions.',
          options: [
            {
              id: 'a',
              text: 'Make an executive decision quickly',
              explanation: 'Take charge to avoid prolonged conflict',
              feedback: 'While decisive leadership is important, this approach may miss valuable input.',
              points: 2,
              correct: false
            },
            {
              id: 'b',
              text: 'Organize team discussion meeting',
              explanation: 'Create space for collaborative solution',
              feedback: 'Excellent choice! This demonstrates collaborative leadership.',
              points: 5,
              correct: true
            },
            {
              id: 'c',
              text: 'Survey the congregation',
              explanation: 'Let those affected make the final choice',
              feedback: 'Good instinct, but this may undermine team leadership.',
              points: 3,
              correct: false
            }
          ],
          points: 5
        },
        {
          id: 3,
          type: 'true-false',
          question: 'Effective leadership requires always having the right answer immediately.',
          correctAnswer: false,
          feedback: {
            correct: 'Correct! Good leaders seek input and take time to make thoughtful decisions.',
            incorrect: 'Actually, effective leaders often seek input and take time for thoughtful decisions rather than rushing to answers.'
          },
          points: 5
        }
      ]
    },
    {
      id: 2,
      title: 'Team Building',
      questions: [
        {
          id: 4,
          type: 'multiple-answer',
          question: 'Which are key elements of a strong team? (Select all that apply)',
          options: [
            { id: 'a', text: 'Clear shared vision', correct: true },
            { id: 'b', text: 'Avoiding all conflict', correct: false },
            { id: 'c', text: 'Open communication', correct: true },
            { id: 'd', text: 'Mutual accountability', correct: true }
          ],
          feedback: 'Strong teams need vision, communication, and accountability - but healthy conflict resolution, not avoidance.',
          points: 5
        },
        {
          id: 5,
          type: 'matching',
          question: 'Match each leadership style with its best use case:',
          leftItems: [
            { id: '1', text: 'Directive Leadership' },
            { id: '2', text: 'Coaching Leadership' },
            { id: '3', text: 'Delegating Leadership' }
          ],
          rightItems: [
            { id: 'A', text: 'Crisis or emergency situations' },
            { id: 'B', text: 'Developing team member skills' },
            { id: 'C', text: 'Working with experienced team' }
          ],
          correctMatches: [
            { left: '1', right: 'A' },
            { left: '2', right: 'B' },
            { left: '3', right: 'C' }
          ],
          feedback: 'Different situations require different leadership approaches.',
          points: 5
        },
        {
          id: 6,
          type: 'fill-blank',
          question: 'Complete this leadership principle:',
          sentence: 'Great leaders focus on _____ people rather than _____ people.',
          blanks: [
            {
              position: 0,
              options: ['empowering', 'controlling', 'managing', 'directing'],
              correct: 'empowering'
            },
            {
              position: 1,
              options: ['controlling', 'helping', 'teaching', 'leading'],
              correct: 'controlling'
            }
          ],
          feedback: 'Empowerment creates ownership and growth, while control limits potential.',
          points: 5
        },
        {
          id: 7,
          type: 'image',
          question: 'Looking at this team interaction, what leadership principle is being demonstrated?',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
          questionType: 'multiple-choice',
          options: [
            {
              id: 'a',
              text: 'Top-down authority',
              feedback: 'The image shows more collaborative interaction.',
              points: 2,
              correct: false
            },
            {
              id: 'b',
              text: 'Collaborative teamwork',
              feedback: 'Exactly! Everyone is engaged and contributing equally.',
              points: 5,
              correct: true
            },
            {
              id: 'c',
              text: 'Individual work',
              feedback: 'The image clearly shows group interaction.',
              points: 1,
              correct: false
            }
          ],
          points: 5
        },
        {
          id: 8,
          type: 'video',
          question: 'Based on this team meeting, what made the leadership effective?',
          videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165',
          description: 'Video shows a church staff meeting with collaborative discussion.',
          questionType: 'true-false',
          question: 'The leader dominated the conversation throughout the meeting.',
          correctAnswer: false,
          feedback: {
            correct: 'Correct! Effective leaders create space for everyone to contribute.',
            incorrect: 'Actually, the leader facilitated discussion and encouraged participation from all team members.'
          },
          points: 5
        }
      ]
    }
  ]
};

function QuestionEditor({ question, onUpdate, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateQuestion = (field, value) => {
    onUpdate({ ...question, [field]: value });
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...question.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    onUpdate({ ...question, options: newOptions });
  };

  const addOption = () => {
    const newOptions = question.options || [];
    const newId = String.fromCharCode(97 + newOptions.length); // a, b, c, d...
    onUpdate({ 
      ...question, 
      options: [...newOptions, { id: newId, text: '', feedback: '', points: 5, correct: false }] 
    });
  };

  const removeOption = (index) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    onUpdate({ ...question, options: newOptions });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="shadow-sm rounded-lg">
      <div className="flex items-center justify-between p-3 bg-[var(--powder-blue)]">
        <div className="flex items-center gap-3 flex-1">
          <GripVertical className="w-4 h-4 text-[var(--text-secondary)]" />
          <Badge variant="outline" className="shadow-sm">{questionTypes.find(t => t.value === question.type)?.label}</Badge>
          <span className="text-sm truncate text-[var(--text-primary)]">{question.question || question.title || 'New Question'}</span>
        </div>
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>

      <CollapsibleContent>
        <div className="p-4 space-y-4">
          {/* Question Type Selector */}
          <div>
            <Label className="text-[var(--text-primary)]">Question Type</Label>
            <Select value={question.type} onValueChange={(value) => updateQuestion('type', value)}>
              <SelectTrigger className="shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Slide */}
          {question.type === 'content' && (
            <>
              <div>
                <Label className="text-[var(--text-primary)]">Slide Title</Label>
                <Input
                  value={question.title || ''}
                  onChange={(e) => updateQuestion('title', e.target.value)}
                  placeholder="e.g., Welcome to Leadership Fundamentals"
                  className="shadow-sm"
                />
              </div>
              <div>
                <Label className="text-[var(--text-primary)]">Content (supports bullet points with •)</Label>
                <Textarea
                  value={question.content || ''}
                  onChange={(e) => updateQuestion('content', e.target.value)}
                  placeholder="Enter the lesson content...&#10;&#10;Key topics we'll cover:&#10;• Collaborative decision-making&#10;• Servant leadership principles"
                  rows={8}
                  className="shadow-sm"
                />
              </div>
              <div>
                <Label className="text-[var(--text-primary)]">Image URL (optional)</Label>
                <Input
                  value={question.imageUrl || ''}
                  onChange={(e) => updateQuestion('imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="shadow-sm"
                />
              </div>
              <div>
                <Label className="text-[var(--text-primary)]">Video URL (optional)</Label>
                <Input
                  value={question.videoUrl || ''}
                  onChange={(e) => updateQuestion('videoUrl', e.target.value)}
                  placeholder="https://player.vimeo.com/..."
                  className="shadow-sm"
                />
              </div>
            </>
          )}

          {/* Question Text (for all question types except content) */}
          {question.type !== 'content' && (
            <div>
              <Label className="text-[var(--text-primary)]">Question</Label>
              <Input
                value={question.question || ''}
                onChange={(e) => updateQuestion('question', e.target.value)}
                placeholder="Enter your question..."
                className="shadow-sm"
              />
            </div>
          )}

          {/* Hint (optional for all question types) */}
          {question.type !== 'content' && (
            <div>
              <Label className="text-[var(--text-primary)]">Hint (Optional)</Label>
              <Input
                value={question.hint || ''}
                onChange={(e) => updateQuestion('hint', e.target.value)}
                placeholder="Provide a helpful hint..."
                className="shadow-sm"
              />
            </div>
          )}

          {/* Multiple Choice Options */}
          {question.type === 'multiple-choice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Answer Options</Label>
                <Button onClick={addOption} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
              {question.options?.map((option, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={option.correct}
                          onCheckedChange={(checked) => updateOption(index, 'correct', checked)}
                        />
                        <Label>Correct Answer</Label>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Option Text</Label>
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(index, 'text', e.target.value)}
                        placeholder="e.g., Organize team discussion meeting"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Brief Explanation (shown in option card)</Label>
                      <Input
                        value={option.explanation || ''}
                        onChange={(e) => updateOption(index, 'explanation', e.target.value)}
                        placeholder="e.g., Create space for collaborative solution"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Feedback (shown after answer checked)</Label>
                      <Textarea
                        value={option.feedback || ''}
                        onChange={(e) => updateOption(index, 'feedback', e.target.value)}
                        placeholder="e.g., Excellent choice! This demonstrates collaborative leadership..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Points for This Answer</Label>
                      <Input
                        type="number"
                        value={option.points || 5}
                        onChange={(e) => updateOption(index, 'points', parseInt(e.target.value) || 0)}
                        min="0"
                        max="10"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* True/False */}
          {question.type === 'true-false' && (
            <div className="space-y-3">
              <div>
                <Label>Statement (optional - alternative phrasing shown in UI)</Label>
                <Input
                  value={question.statement || ''}
                  onChange={(e) => updateQuestion('statement', e.target.value)}
                  placeholder="e.g., Quick decision-making always demonstrates strong leadership."
                />
              </div>
              <div>
                <Label>Correct Answer</Label>
                <Select 
                  value={question.correctAnswer?.toString()} 
                  onValueChange={(value) => updateQuestion('correctAnswer', value === 'true')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Feedback for Correct Answer</Label>
                <Textarea
                  value={question.feedback?.correct || ''}
                  onChange={(e) => updateQuestion('feedback', { ...question.feedback, correct: e.target.value })}
                  placeholder="e.g., Correct! While decisiveness is important, the best leaders know when to take time..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Feedback for Incorrect Answer</Label>
                <Textarea
                  value={question.feedback?.incorrect || ''}
                  onChange={(e) => updateQuestion('feedback', { ...question.feedback, incorrect: e.target.value })}
                  placeholder="e.g., Actually, effective leadership often requires thoughtful consideration..."
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Multiple Answer */}
          {question.type === 'multiple-answer' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Options (check all correct answers)</Label>
                <Button onClick={addOption} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
              {question.options?.map((option, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                      checked={option.correct}
                      onCheckedChange={(checked) => updateOption(index, 'correct', checked)}
                    />
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(index, 'text', e.target.value)}
                      placeholder="Option text"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              <div>
                <Label>Overall Feedback</Label>
                <Textarea
                  value={question.feedback || ''}
                  onChange={(e) => updateQuestion('feedback', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Fill in the Blank */}
          {question.type === 'fill-blank' && (
            <div className="space-y-3">
              <div>
                <Label>Sentence (use _____ for blanks)</Label>
                <Textarea
                  value={question.sentence || ''}
                  onChange={(e) => updateQuestion('sentence', e.target.value)}
                  placeholder="Great leaders focus on _____ people rather than _____ people."
                  rows={2}
                />
              </div>
              <div>
                <Label>Blank Options & Answers</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Configure options for each blank in your sentence
                </p>
                {question.blanks?.map((blank, index) => (
                  <Card key={index} className="p-3 mb-2">
                    <Label className="mb-2 block">Blank {index + 1}</Label>
                    <div className="space-y-2">
                      <Input
                        value={blank.correct}
                        onChange={(e) => {
                          const newBlanks = [...question.blanks];
                          newBlanks[index] = { ...blank, correct: e.target.value };
                          updateQuestion('blanks', newBlanks);
                        }}
                        placeholder="Correct answer"
                      />
                      <Textarea
                        value={blank.options?.join(', ') || ''}
                        onChange={(e) => {
                          const newBlanks = [...question.blanks];
                          newBlanks[index] = { 
                            ...blank, 
                            options: e.target.value.split(',').map(s => s.trim()) 
                          };
                          updateQuestion('blanks', newBlanks);
                        }}
                        placeholder="Word options (comma-separated): empowering, controlling, managing"
                        rows={2}
                      />
                    </div>
                  </Card>
                ))}
              </div>
              <div>
                <Label>Feedback</Label>
                <Textarea
                  value={question.feedback || ''}
                  onChange={(e) => updateQuestion('feedback', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Image-based Question */}
          {question.type === 'image' && (
            <div className="space-y-3">
              <div>
                <Label>Image URL</Label>
                <Input
                  value={question.imageUrl || ''}
                  onChange={(e) => updateQuestion('imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                {question.imageUrl && (
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <img src={question.imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>
              <div>
                <Label>Question Type</Label>
                <Select 
                  value={question.questionType || 'multiple-choice'} 
                  onValueChange={(value) => updateQuestion('questionType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Multiple Choice Options for Image Question */}
              {question.questionType === 'multiple-choice' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button onClick={addOption} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                  {question.options?.map((option, index) => (
                    <Card key={index} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={option.correct}
                              onCheckedChange={(checked) => updateOption(index, 'correct', checked)}
                            />
                            <Label className="text-xs">Correct</Label>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          value={option.text}
                          onChange={(e) => updateOption(index, 'text', e.target.value)}
                          placeholder="Option text"
                        />
                        <Textarea
                          value={option.feedback || ''}
                          onChange={(e) => updateOption(index, 'feedback', e.target.value)}
                          placeholder="Feedback when selected"
                          rows={2}
                        />
                        <Input
                          type="number"
                          value={option.points || 5}
                          onChange={(e) => updateOption(index, 'points', parseInt(e.target.value) || 0)}
                          placeholder="Points"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {/* True/False Options for Image Question */}
              {question.questionType === 'true-false' && (
                <div className="space-y-3">
                  <div>
                    <Label>Correct Answer</Label>
                    <Select 
                      value={question.correctAnswer?.toString()} 
                      onValueChange={(value) => updateQuestion('correctAnswer', value === 'true')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Feedback for Correct</Label>
                    <Textarea
                      value={question.feedback?.correct || ''}
                      onChange={(e) => updateQuestion('feedback', { ...question.feedback, correct: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Feedback for Incorrect</Label>
                    <Textarea
                      value={question.feedback?.incorrect || ''}
                      onChange={(e) => updateQuestion('feedback', { ...question.feedback, incorrect: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video-based Question */}
          {question.type === 'video' && (
            <div className="space-y-3">
              <div>
                <Label>Video URL</Label>
                <Input
                  value={question.videoUrl || ''}
                  onChange={(e) => updateQuestion('videoUrl', e.target.value)}
                  placeholder="https://player.vimeo.com/external/..."
                />
              </div>
              <div>
                <Label>Video Description (shown before video plays)</Label>
                <Textarea
                  value={question.description || ''}
                  onChange={(e) => updateQuestion('description', e.target.value)}
                  placeholder="e.g., Video shows a team meeting where conflict arises..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Question Type</Label>
                <Select 
                  value={question.questionType || 'true-false'} 
                  onValueChange={(value) => updateQuestion('questionType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Multiple Choice Options for Video Question */}
              {question.questionType === 'multiple-choice' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button onClick={addOption} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                  {question.options?.map((option, index) => (
                    <Card key={index} className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={option.correct}
                              onCheckedChange={(checked) => updateOption(index, 'correct', checked)}
                            />
                            <Label className="text-xs">Correct</Label>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          value={option.text}
                          onChange={(e) => updateOption(index, 'text', e.target.value)}
                          placeholder="Option text"
                        />
                        <Textarea
                          value={option.feedback || ''}
                          onChange={(e) => updateOption(index, 'feedback', e.target.value)}
                          placeholder="Feedback when selected"
                          rows={2}
                        />
                        <Input
                          type="number"
                          value={option.points || 5}
                          onChange={(e) => updateOption(index, 'points', parseInt(e.target.value) || 0)}
                          placeholder="Points"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {/* True/False Options for Video Question */}
              {question.questionType === 'true-false' && (
                <div className="space-y-3">
                  <div>
                    <Label>Correct Answer</Label>
                    <Select 
                      value={question.correctAnswer?.toString()} 
                      onValueChange={(value) => updateQuestion('correctAnswer', value === 'true')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Feedback for Correct</Label>
                    <Textarea
                      value={question.feedback?.correct || ''}
                      onChange={(e) => updateQuestion('feedback', { ...question.feedback, correct: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Feedback for Incorrect</Label>
                    <Textarea
                      value={question.feedback?.incorrect || ''}
                      onChange={(e) => updateQuestion('feedback', { ...question.feedback, incorrect: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matching */}
          {question.type === 'matching' && (
            <div className="space-y-3">
              <div>
                <Label>Left Side Items</Label>
                <Textarea
                  value={question.leftItems?.map(item => item.text).join('\n') || ''}
                  onChange={(e) => {
                    const items = e.target.value.split('\n').map((text, i) => ({
                      id: String(i + 1),
                      text: text.trim()
                    }));
                    updateQuestion('leftItems', items);
                  }}
                  placeholder="One item per line&#10;Directive Leadership&#10;Coaching Leadership&#10;Delegating Leadership"
                  rows={4}
                />
              </div>
              <div>
                <Label>Right Side Items</Label>
                <Textarea
                  value={question.rightItems?.map(item => item.text).join('\n') || ''}
                  onChange={(e) => {
                    const items = e.target.value.split('\n').map((text, i) => ({
                      id: String.fromCharCode(65 + i), // A, B, C...
                      text: text.trim()
                    }));
                    updateQuestion('rightItems', items);
                  }}
                  placeholder="One item per line&#10;Crisis situations&#10;Developing skills&#10;Experienced team"
                  rows={4}
                />
              </div>
              <div>
                <Label>Feedback</Label>
                <Textarea
                  value={question.feedback || ''}
                  onChange={(e) => updateQuestion('feedback', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Points */}
          {question.type !== 'content' && (
            <div>
              <Label>Points</Label>
              <Input
                type="number"
                value={question.points || 5}
                onChange={(e) => updateQuestion('points', parseInt(e.target.value))}
                min="1"
                max="10"
              />
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function PathEditorFull({ pathId, onSave, onCancel }) {
  const [pathData, setPathData] = useState(dummyPathData);

  const updatePath = (field, value) => {
    setPathData({ ...pathData, [field]: value });
  };

  const updateGoal = (index, value) => {
    const newGoals = [...pathData.goals];
    newGoals[index] = value;
    setPathData({ ...pathData, goals: newGoals });
  };

  const addGoal = () => {
    setPathData({ ...pathData, goals: [...pathData.goals, ''] });
  };

  const removeGoal = (index) => {
    const newGoals = [...pathData.goals];
    newGoals.splice(index, 1);
    setPathData({ ...pathData, goals: newGoals });
  };

  const toggleRole = (role) => {
    const roles = pathData.targetRoles.includes(role)
      ? pathData.targetRoles.filter(r => r !== role)
      : [...pathData.targetRoles, role];
    setPathData({ ...pathData, targetRoles: roles });
  };

  const toggleGoal = (goal) => {
    const goals = pathData.targetGoals.includes(goal)
      ? pathData.targetGoals.filter(g => g !== goal)
      : [...pathData.targetGoals, goal];
    setPathData({ ...pathData, targetGoals: goals });
  };

  const toggleCategory = (category) => {
    const categories = pathData.categories?.includes(category)
      ? pathData.categories.filter(c => c !== category)
      : [...(pathData.categories || []), category];
    setPathData({ ...pathData, categories });
  };

  const addChapter = () => {
    setPathData({
      ...pathData,
      chapters: [
        ...pathData.chapters,
        { id: pathData.chapters.length + 1, title: `Chapter ${pathData.chapters.length + 1}`, questions: [] }
      ]
    });
  };

  const updateChapter = (chapterIndex, field, value) => {
    const newChapters = [...pathData.chapters];
    newChapters[chapterIndex] = { ...newChapters[chapterIndex], [field]: value };
    setPathData({ ...pathData, chapters: newChapters });
  };

  const deleteChapter = (chapterIndex) => {
    const newChapters = [...pathData.chapters];
    newChapters.splice(chapterIndex, 1);
    setPathData({ ...pathData, chapters: newChapters });
  };

  const addQuestion = (chapterIndex) => {
    const newChapters = [...pathData.chapters];
    const newQuestion = {
      id: Date.now(),
      type: 'multiple-choice',
      question: '',
      options: [],
      points: 5
    };
    newChapters[chapterIndex].questions.push(newQuestion);
    setPathData({ ...pathData, chapters: newChapters });
  };

  const updateQuestion = (chapterIndex, questionIndex, updatedQuestion) => {
    const newChapters = [...pathData.chapters];
    newChapters[chapterIndex].questions[questionIndex] = updatedQuestion;
    setPathData({ ...pathData, chapters: newChapters });
  };

  const deleteQuestion = (chapterIndex, questionIndex) => {
    const newChapters = [...pathData.chapters];
    newChapters[chapterIndex].questions.splice(questionIndex, 1);
    setPathData({ ...pathData, chapters: newChapters });
  };

  const handleSave = () => {
    console.log('Saving path data:', pathData);
    onSave(pathData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[var(--text-primary)]">Edit Learning Path</h1>
              <p className="text-sm text-[var(--text-secondary)]">Customize all aspects of your learning path</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel} className="shadow-sm hover:shadow-md">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Basic Information */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Basic Information</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">Configure the path title, description, and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-[var(--text-primary)]">Path Title</Label>
              <Input
                id="title"
                value={pathData.title}
                onChange={(e) => updatePath('title', e.target.value)}
                placeholder="e.g., Leadership Fundamentals"
                className="shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-[var(--text-primary)]">Description</Label>
              <Textarea
                id="description"
                value={pathData.description}
                onChange={(e) => updatePath('description', e.target.value)}
                placeholder="Describe what learners will achieve..."
                rows={3}
                className="shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty" className="text-[var(--text-primary)]">Difficulty Level</Label>
                <Select value={pathData.difficulty} onValueChange={(value) => updatePath('difficulty', value)}>
                  <SelectTrigger id="difficulty" className="shadow-sm">
                    <SelectValue placeholder="Select difficulty..." />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedTime" className="text-[var(--text-primary)]">Estimated Time</Label>
                <Input
                  id="estimatedTime"
                  value={pathData.estimatedTime || ''}
                  onChange={(e) => updatePath('estimatedTime', e.target.value)}
                  placeholder="e.g., 6 hours, 4 weeks"
                  className="shadow-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="xpReward" className="text-[var(--text-primary)]">XP Reward</Label>
              <Input
                id="xpReward"
                type="number"
                value={pathData.xpReward || 300}
                onChange={(e) => updatePath('xpReward', parseInt(e.target.value) || 0)}
                placeholder="300"
                min="0"
                className="shadow-sm"
              />
              <p className="text-xs text-[var(--text-secondary)] mt-1">Total experience points earned for completing this path</p>
            </div>

            <div>
              <Label htmlFor="thumbnailUrl" className="text-[var(--text-primary)]">Thumbnail Image URL</Label>
              <Input
                id="thumbnailUrl"
                value={pathData.thumbnailUrl || ''}
                onChange={(e) => updatePath('thumbnailUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="shadow-sm"
              />
              {pathData.thumbnailUrl && (
                <div className="mt-2 shadow-sm rounded-xl overflow-hidden">
                  <img src={pathData.thumbnailUrl} alt="Path thumbnail preview" className="w-full h-40 object-cover" />
                </div>
              )}
              <p className="text-xs text-[var(--text-secondary)] mt-1">This image appears on the Browse Lessons page</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="publish"
                checked={pathData.status === 'published'}
                onCheckedChange={(checked) => updatePath('status', checked ? 'published' : 'draft')}
              />
              <Label htmlFor="publish" className="text-[var(--text-primary)]">Published (visible to learners)</Label>
            </div>
          </CardContent>
        </Card>



        {/* Target Roles */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Target Roles</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">Who is this path designed for?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roleOptions.map(role => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={role}
                    checked={pathData.targetRoles.includes(role)}
                    onCheckedChange={() => toggleRole(role)}
                  />
                  <Label htmlFor={role} className="cursor-pointer text-[var(--text-primary)]">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Goals */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Target Goals</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">What leadership goals does this path address?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goalOptions.map(goal => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={pathData.targetGoals.includes(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                  />
                  <Label htmlFor={goal} className="cursor-pointer text-[var(--text-primary)]">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Categories</CardTitle>
            <CardDescription className="text-[var(--text-secondary)]">Tag this path with relevant categories for filtering and discovery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categoryOptions.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={pathData.categories?.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="cursor-pointer text-[var(--text-primary)]">{category}</Label>
                </div>
              ))}
            </div>
            {pathData.categories && pathData.categories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-[var(--text-secondary)] mb-2">Selected categories:</p>
                <div className="flex flex-wrap gap-2">
                  {pathData.categories.map(cat => (
                    <Badge key={cat} variant="secondary" className="shadow-sm">{cat}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chapters */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[var(--text-primary)]">Chapters & Questions</CardTitle>
                <CardDescription className="text-[var(--text-secondary)]">Organize your content into chapters with various question types</CardDescription>
              </div>
              <Button onClick={addChapter} variant="outline" className="shadow-sm hover:shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                Add Chapter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {pathData.chapters.map((chapter, chapterIndex) => (
              <Card key={chapter.id} className="shadow-sm">
                <CardHeader className="pb-3 bg-[var(--powder-blue)]">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-[var(--text-secondary)]" />
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapter(chapterIndex, 'title', e.target.value)}
                      className="shadow-sm"
                      placeholder="Chapter title"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteChapter(chapterIndex)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {chapter.questions.map((question, questionIndex) => (
                    <QuestionEditor
                      key={question.id}
                      question={question}
                      onUpdate={(updatedQuestion) => 
                        updateQuestion(chapterIndex, questionIndex, updatedQuestion)
                      }
                      onDelete={() => deleteQuestion(chapterIndex, questionIndex)}
                    />
                  ))}
                  <Button
                    onClick={() => addQuestion(chapterIndex)}
                    variant="outline"
                    size="sm"
                    className="w-full shadow-sm hover:shadow-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end pb-6">
          <Button variant="outline" onClick={onCancel} size="lg">
            Cancel
          </Button>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Path
          </Button>
        </div>
      </div>
    </div>
  );
}
