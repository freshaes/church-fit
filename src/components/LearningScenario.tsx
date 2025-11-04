import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResultsScreen } from './ResultsScreen';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Lightbulb,
  ChevronRight,
  Clock,
  X,
  Check,
  PlayCircle,
  Volume2,
  Heart,
  HelpCircle,
  AlertTriangle,
  Circle,
  Square,
  Triangle,
  Hexagon,
  BookOpen,
  Save
} from 'lucide-react';

// Detect touch device for drag-and-drop backend
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const DragBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

// Comprehensive question data for all learning paths
const scenarioData = {
  1: { // Leadership Fundamentals
    title: 'Leadership Fundamentals',
    totalQuestions: 9,
    currentQuestion: 1,
    questions: [
      {
        type: 'content',
        title: 'Welcome to Leadership Fundamentals',
        content: `In this module, you'll learn the essential principles of servant leadership in a church context.

Effective church leadership is about empowering others, building community, and creating an environment where everyone can use their gifts to serve God's mission.

Key topics we'll cover:
• Collaborative decision-making
• Servant leadership principles
• Adapting leadership styles to situations
• Building and developing teams

Take your time to absorb this content. When you're ready, click Continue to begin the exercises.`,
        imageUrl: null,
        videoUrl: null
      },
      {
        type: 'multiple-choice',
        question: 'Your youth ministry team is divided on worship style preferences. How do you handle this conflict?',
        hint: 'Think about approaches that bring people together rather than impose solutions. What creates ownership and buy-in?',
        options: [
          {
            id: 'a',
            text: 'Make an executive decision quickly',
            explanation: 'Take charge to avoid prolonged conflict and maintain momentum',
            feedback: 'While decisive leadership is important, this approach may miss valuable input and could create resentment.',
            points: 2
          },
          {
            id: 'b',
            text: 'Organize team discussion meeting',
            explanation: 'Create space for collaborative solution and understanding',
            feedback: 'Excellent choice! This demonstrates collaborative leadership and builds stronger team dynamics.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Survey the congregation',
            explanation: 'Let those affected by the decision make the final choice',
            feedback: 'Good instinct to involve stakeholders, but this may undermine team leadership and decision-making authority.',
            points: 3
          },
          {
            id: 'd',
            text: 'Maintain current approach',
            explanation: 'Avoid change until natural consensus emerges over time',
            feedback: 'This avoids immediate conflict but doesn\'t address underlying issues and may allow division to grow.',
            points: 1
          }
        ]
      },
      {
        type: 'true-false',
        question: 'Effective leaders should always make decisions quickly to show confidence.',
        statement: 'Quick decision-making always demonstrates strong leadership.',
        hint: 'Consider situations where taking time to think, consult others, or gather information might lead to better outcomes.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! While decisiveness is important, the best leaders know when to take time for consultation and reflection.',
          incorrect: 'Actually, effective leadership often requires thoughtful consideration. Quick decisions can sometimes lead to poor outcomes.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'Which of the following are essential qualities of servant leadership? (Select all that apply)',
        hint: 'Servant leadership focuses on serving others and empowering them. Think about qualities that put others first.',
        options: [
          { id: 'a', text: 'Listening actively to team members', correct: true },
          { id: 'b', text: 'Making all decisions independently', correct: false },
          { id: 'c', text: 'Empowering others to grow', correct: true },
          { id: 'd', text: 'Prioritizing personal advancement', correct: false },
          { id: 'e', text: 'Building community and trust', correct: true },
          { id: 'f', text: 'Avoiding difficult conversations', correct: false }
        ],
        feedback: 'Servant leadership focuses on serving others, active listening, empowerment, and community building.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each leadership style with its best application:',
        leftItems: [
          { id: '1', text: 'Collaborative Leadership' },
          { id: '2', text: 'Directive Leadership' },
          { id: '3', text: 'Coaching Leadership' },
          { id: '4', text: 'Delegating Leadership' }
        ],
        rightItems: [
          { id: 'A', text: 'Crisis situations requiring quick action' },
          { id: 'B', text: 'Developing new team members' },
          { id: 'C', text: 'Working with experienced, motivated team' },
          { id: 'D', text: 'Complex decisions affecting many people' }
        ],
        correctMatches: [
          { left: '1', right: 'D' },
          { left: '2', right: 'A' },
          { left: '3', right: 'B' },
          { left: '4', right: 'C' }
        ],
        feedback: 'Different situations call for different leadership approaches. Effective leaders adapt their style.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this principle of effective leadership:',
        sentence: 'A good leader must first learn to _____ before they can effectively _____ others.',
        blanks: [
          {
            position: 0,
            options: ['serve', 'command', 'judge', 'control'],
            correct: 'serve'
          },
          {
            position: 1,
            options: ['lead', 'manage', 'direct', 'oversee'],
            correct: 'lead'
          }
        ],
        feedback: 'The principle "lead by serving" is fundamental to Christian leadership and servant leadership.',
        points: 5
      },
      {
        type: 'image',
        question: 'Looking at this worship team meeting, what leadership approach would be most effective?',
        imageUrl: 'https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5MTIyNzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        questionType: 'multiple-choice',
        options: [
          {
            id: 'a',
            text: 'Take charge and assign roles quickly',
            feedback: 'While organization is important, this collaborative setting calls for more inclusive leadership.',
            points: 2
          },
          {
            id: 'b',
            text: 'Facilitate discussion and gather input',
            feedback: 'Perfect! This setting shows people ready to collaborate and contribute their gifts.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Let the most experienced person lead',
            feedback: 'Experience is valuable, but effective leaders create space for all voices to be heard.',
            points: 3
          }
        ]
      },
      {
        type: 'video',
        question: 'After watching this leadership scenario, what would be your next step?',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        description: 'Video shows a team meeting where conflict arises between two ministry leaders about resource allocation.',
        questionType: 'true-false',
        question: 'The leader should immediately side with the person who has more experience.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Good leaders remain neutral initially and seek to understand all perspectives before making decisions.',
          incorrect: 'Actually, effective leaders avoid taking sides immediately. They gather information and seek understanding first.'
        },
        points: 5
      },
      {
        type: 'reflection',
        id: 'leadership-reflection-1',
        question: 'Reflect on a time when you had to make a difficult leadership decision. What did you learn from that experience?',
        guidance: 'Think about a specific situation where you had to lead through uncertainty or make a hard choice. What factors did you consider? How did it turn out?',
        minCharacters: 100,
        maxCharacters: 1000,
        points: 10
      }
    ]
  },
  2: { // Conflict Resolution Mastery
    title: 'Conflict Resolution Mastery',
    totalQuestions: 8,
    currentQuestion: 1,
    questions: [
      {
        type: 'content',
        title: 'The Art of Conflict Resolution',
        content: `Conflict is a natural part of working with diverse teams in ministry. The key is not to avoid conflict, but to handle it with grace, wisdom, and biblical principles.

In this module, you'll learn practical techniques for:
• De-escalating tense situations
• Mediating between team members
• Finding win-win solutions
• Addressing emotions constructively
• Preventing conflicts before they escalate

Remember: Healthy conflict resolution strengthens relationships and builds trust.`,
        imageUrl: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGRpc2N1c3Npb258ZW58MXx8fHwxNzYwMzEyMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        videoUrl: null
      },
      {
        type: 'multiple-choice',
        question: 'Two volunteer coordinators have a heated disagreement about event planning approaches during a public meeting. How do you handle this situation?',
        options: [
          {
            id: 'a',
            text: 'Step in immediately and make the decision yourself',
            explanation: 'Take control to stop the conflict and move forward quickly',
            feedback: 'While stopping public conflict is important, this approach doesn\'t address underlying issues and may create resentment.',
            points: 2
          },
          {
            id: 'b',
            text: 'Pause the meeting and schedule private mediation',
            explanation: 'Address the conflict appropriately in a private setting',
            feedback: 'Wise choice! This protects everyone\'s dignity while ensuring the conflict gets proper attention and resolution.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Let them work it out themselves in the meeting',
            explanation: 'Allow them to resolve their differences openly',
            feedback: 'While autonomy is valuable, public conflicts can escalate and damage team relationships if not properly managed.',
            points: 2
          },
          {
            id: 'd',
            text: 'Change the topic and address it later',
            explanation: 'Redirect the conversation and deal with the issue afterward',
            feedback: 'Redirecting is good, but delaying conflict resolution can allow tensions to build and affect team dynamics.',
            points: 3
          }
        ]
      },
      {
        type: 'true-false',
        question: 'In conflict resolution, it\'s best to avoid discussing emotions and focus only on facts.',
        statement: 'Effective conflict resolution should avoid emotional discussions.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Emotions are often at the heart of conflicts. Addressing them with care is essential for lasting resolution.',
          incorrect: 'Actually, emotions are usually central to conflicts. Ignoring them often prevents true resolution.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'Which techniques are effective for de-escalating conflict? (Select all that apply)',
        options: [
          { id: 'a', text: 'Active listening without interrupting', correct: true },
          { id: 'b', text: 'Pointing out who is wrong immediately', correct: false },
          { id: 'c', text: 'Using "I" statements instead of "you" statements', correct: true },
          { id: 'd', text: 'Raising your voice to get attention', correct: false },
          { id: 'e', text: 'Finding common ground first', correct: true },
          { id: 'f', text: 'Taking sides to end the dispute quickly', correct: false }
        ],
        feedback: 'De-escalation requires patience, empathy, and neutral communication techniques.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each conflict resolution approach with the appropriate situation:',
        leftItems: [
          { id: '1', text: 'Collaborative Problem-Solving' },
          { id: '2', text: 'Compromise' },
          { id: '3', text: 'Accommodation' },
          { id: '4', text: 'Direct Confrontation' }
        ],
        rightItems: [
          { id: 'A', text: 'Both parties have valid points and relationship matters' },
          { id: 'B', text: 'Issue is minor and relationship is most important' },
          { id: 'C', text: 'Time is limited and partial solution is acceptable' },
          { id: 'D', text: 'Clear policy violation requires immediate action' }
        ],
        correctMatches: [
          { left: '1', right: 'A' },
          { left: '2', right: 'C' },
          { left: '3', right: 'B' },
          { left: '4', right: 'D' }
        ],
        feedback: 'Different conflicts require different approaches based on the situation and relationships involved.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this conflict resolution principle:',
        sentence: 'Seek first to _____, then to be _____.',
        blanks: [
          {
            position: 0,
            options: ['understand', 'convince', 'judge', 'correct'],
            correct: 'understand'
          },
          {
            position: 1,
            options: ['understood', 'right', 'heard', 'respected'],
            correct: 'understood'
          }
        ],
        feedback: 'This principle from Stephen Covey emphasizes the importance of listening and understanding before seeking to be understood.',
        points: 5
      },
      {
        type: 'multiple-choice',
        question: 'Based on the body language and setting in this image, what type of conflict resolution approach would be most appropriate?',
        imageUrl: 'https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjB3b3JrfGVufDF8fHx8MTc1OTEyMjc0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        options: [
          {
            id: 'a',
            text: 'Formal mediation process',
            feedback: 'This casual, collaborative setting suggests a more informal approach would be better.',
            points: 2
          },
          {
            id: 'b',
            text: 'Collaborative discussion',
            feedback: 'Excellent! The open, working environment suggests people ready to collaborate and find solutions together.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Separate individual meetings',
            feedback: 'While sometimes necessary, this collaborative setting shows people willing to work together.',
            points: 3
          }
        ]
      },
      {
        type: 'multiple-choice',
        question: 'After watching this conflict scenario, what was the most effective technique used?',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        hint: 'Watch how the leader responds to each person during the disagreement.',
        options: [
          {
            id: 'a',
            text: 'Interrupting to correct misunderstandings',
            explanation: 'Take control early to prevent escalation',
            feedback: 'Interrupting usually escalates conflict rather than resolving it.',
            points: 1
          },
          {
            id: 'b',
            text: 'Reflecting back what each person said',
            explanation: 'Ensure everyone feels heard and understood',
            feedback: 'Perfect! Active listening and reflection helps people feel heard and understood.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Immediately proposing a solution',
            explanation: 'Resolve the issue quickly to move forward',
            feedback: 'Rushing to solutions without full understanding often misses the real issues.',
            points: 2
          }
        ]
      }
    ]
  },
  3: { // Building Strong Communities
    title: 'Building Strong Communities',
    totalQuestions: 7,
    currentQuestion: 1,
    questions: [
      {
        type: 'multiple-choice',
        question: 'A new family joins your church but seems hesitant to participate in activities. What\'s your first approach?',
        options: [
          {
            id: 'a',
            text: 'Give them space and let them approach when ready',
            explanation: 'Allow them to adjust at their own pace',
            feedback: 'While respecting boundaries is important, some gentle outreach can help newcomers feel welcome.',
            points: 3
          },
          {
            id: 'b',
            text: 'Personally introduce them to key community members',
            explanation: 'Help them make meaningful connections',
            feedback: 'Excellent approach! Personal connections are key to helping newcomers feel included and valued.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Invite them to join multiple activities immediately',
            explanation: 'Get them involved quickly in various ministries',
            feedback: 'Good intentions, but overwhelming newcomers can be counterproductive to building lasting connections.',
            points: 2
          },
          {
            id: 'd',
            text: 'Assign them to a small group automatically',
            explanation: 'Ensure they have a place to belong right away',
            feedback: 'Structure can help, but forced connections often don\'t lead to authentic community.',
            points: 2
          }
        ]
      },
      {
        type: 'true-false',
        question: 'Strong communities naturally form without intentional effort from leaders.',
        statement: 'Healthy communities happen organically without leadership intervention.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Strong communities require intentional cultivation, systems, and ongoing leadership attention.',
          incorrect: 'Actually, while some community forms naturally, strong, inclusive communities require intentional leadership and systems.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'What are essential elements of a thriving church community? (Select all that apply)',
        options: [
          { id: 'a', text: 'Shared purpose and vision', correct: true },
          { id: 'b', text: 'Exclusive membership requirements', correct: false },
          { id: 'c', text: 'Regular meaningful interaction', correct: true },
          { id: 'd', text: 'Avoiding difficult conversations', correct: false },
          { id: 'e', text: 'Mutual care and support', correct: true },
          { id: 'f', text: 'Opportunities to serve together', correct: true }
        ],
        feedback: 'Thriving communities have shared purpose, regular interaction, mutual care, and service opportunities.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each community-building activity with its primary benefit:',
        leftItems: [
          { id: '1', text: 'Small Group Bible Study' },
          { id: '2', text: 'Community Service Project' },
          { id: '3', text: 'Social Fellowship Events' },
          { id: '4', text: 'Mentorship Programs' }
        ],
        rightItems: [
          { id: 'A', text: 'Builds relationships through shared mission' },
          { id: 'B', text: 'Develops individual growth and connection' },
          { id: 'C', text: 'Creates space for informal bonding' },
          { id: 'D', text: 'Deepens spiritual intimacy and trust' }
        ],
        correctMatches: [
          { left: '1', right: 'D' },
          { left: '2', right: 'A' },
          { left: '3', right: 'C' },
          { left: '4', right: 'B' }
        ],
        feedback: 'Different activities serve different community-building purposes. A healthy community needs variety.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this community principle:',
        sentence: 'True community is built on _____ relationships rather than _____ interactions.',
        blanks: [
          {
            position: 0,
            options: ['authentic', 'casual', 'formal', 'surface'],
            correct: 'authentic'
          },
          {
            position: 1,
            options: ['superficial', 'regular', 'planned', 'organized'],
            correct: 'superficial'
          }
        ],
        feedback: 'Authentic relationships that go beyond surface-level interaction are the foundation of strong community.',
        points: 5
      },
      {
        type: 'multiple-choice',
        question: 'Looking at this youth group activity, what community-building element is most evident?',
        imageUrl: 'https://images.unsplash.com/photo-1545886082-e66c6b9e011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGdyb3VwJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NTkxMjI3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        options: [
          {
            id: 'a',
            text: 'Structured learning environment',
            explanation: 'Clear educational objectives and structure',
            feedback: 'While learning happens, this image shows something more interpersonal.',
            points: 2
          },
          {
            id: 'b',
            text: 'Inclusive participation and engagement',
            explanation: 'Everyone involved and contributing equally',
            feedback: 'Exactly! Everyone appears engaged and included in the activity, which builds strong community bonds.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Leadership hierarchy',
            explanation: 'Clear roles and authority structure',
            feedback: 'The image shows collaborative engagement rather than hierarchical structure.',
            points: 1
          }
        ]
      },
      {
        type: 'true-false',
        question: 'The most effective community building happens through large group announcements.',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Personal, one-on-one interactions and small group connections are usually more effective for community building.',
          incorrect: 'Actually, while announcements have their place, personal connections and small group interactions build stronger community.'
        },
        points: 5
      }
    ]
  },
  4: { // Communication Excellence
    title: 'Communication Excellence',
    totalQuestions: 7,
    currentQuestion: 1,
    questions: [
      {
        type: 'multiple-choice',
        question: 'You need to address a sensitive topic with your ministry team about budget cuts. What\'s your approach?',
        options: [
          {
            id: 'a',
            text: 'Send an email with all the details',
            explanation: 'Provide complete information in writing',
            feedback: 'While documentation is important, sensitive topics require personal connection and dialogue.',
            points: 2
          },
          {
            id: 'b',
            text: 'Call a team meeting for open discussion',
            explanation: 'Address everyone together with transparency',
            feedback: 'Excellent choice! Face-to-face communication for sensitive topics builds trust and allows for questions.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Meet with team leaders individually first',
            explanation: 'Brief key people before wider announcement',
            feedback: 'Good strategy for preparation, but the whole team needs to hear important news together for transparency.',
            points: 3
          },
          {
            id: 'd',
            text: 'Wait until the next scheduled meeting',
            explanation: 'Address it during regular meeting time',
            feedback: 'Delaying sensitive communication can lead to rumors and anxiety. Timely communication is important.',
            points: 2
          }
        ]
      },
      {
        type: 'true-false',
        question: 'Effective communication is primarily about speaking clearly and persuasively.',
        statement: 'Good communication is mainly about clear speaking and persuasion.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Effective communication is equally about listening, understanding, and creating dialogue.',
          incorrect: 'Actually, listening, empathy, and understanding are just as important as clear speaking in effective communication.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'Which elements are crucial for effective public speaking in ministry? (Select all that apply)',
        options: [
          { id: 'a', text: 'Clear, organized message structure', correct: true },
          { id: 'b', text: 'Using complex theological terms', correct: false },
          { id: 'c', text: 'Authentic personal connection', correct: true },
          { id: 'd', text: 'Speaking without notes to show mastery', correct: false },
          { id: 'e', text: 'Engaging storytelling and examples', correct: true },
          { id: 'f', text: 'Adapting to audience needs and understanding', correct: true }
        ],
        feedback: 'Effective ministry communication combines clear structure, authenticity, engaging content, and audience awareness.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each communication challenge with the best approach:',
        leftItems: [
          { id: '1', text: 'Delivering difficult news' },
          { id: '2', text: 'Teaching complex concepts' },
          { id: '3', text: 'Motivating volunteers' },
          { id: '4', text: 'Resolving misunderstandings' }
        ],
        rightItems: [
          { id: 'A', text: 'Use stories and analogies' },
          { id: 'B', text: 'Be direct, compassionate, and available for questions' },
          { id: 'C', text: 'Listen first, then clarify with empathy' },
          { id: 'D', text: 'Connect to vision and personal impact' }
        ],
        correctMatches: [
          { left: '1', right: 'B' },
          { left: '2', right: 'A' },
          { left: '3', right: 'D' },
          { left: '4', right: 'C' }
        ],
        feedback: 'Different communication situations require different approaches and skills.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this communication principle:',
        sentence: 'The key to great communication is not just being _____ but ensuring you are _____.',
        blanks: [
          {
            position: 0,
            options: ['heard', 'understood', 'eloquent', 'confident'],
            correct: 'heard'
          },
          {
            position: 1,
            options: ['understood', 'respected', 'persuasive', 'admired'],
            correct: 'understood'
          }
        ],
        feedback: 'True communication happens when the message is not just delivered but truly understood by the audience.',
        points: 5
      },
      {
        type: 'multiple-choice',
        question: 'Looking at this presentation setting, what communication principle should be the top priority?',
        imageUrl: 'https://images.unsplash.com/photo-1758507595623-811a2ea5cb7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTkxMjI3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        options: [
          {
            id: 'a',
            text: 'Speaking loudly enough to be heard',
            explanation: 'Ensure clear vocal projection throughout',
            feedback: 'Volume is important, but there are more critical elements for effective communication.',
            points: 2
          },
          {
            id: 'b',
            text: 'Connecting personally with the audience',
            explanation: 'Build authentic rapport and engagement',
            feedback: 'Perfect! This intimate setting requires personal connection and authentic engagement with the audience.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Using professional presentation slides',
            explanation: 'Provide visual support for key points',
            feedback: 'Visual aids can help, but personal connection is more important in this setting.',
            points: 3
          }
        ]
      },
      {
        type: 'multiple-choice',
        question: 'What made the communication in this video most effective?',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        hint: 'Pay attention to how the pastor balances different aspects of the feedback.',
        options: [
          {
            id: 'a',
            text: 'Using formal, professional language',
            explanation: 'Maintain appropriate professional tone',
            feedback: 'Formal language has its place, but authentic connection is usually more effective.',
            points: 2
          },
          {
            id: 'b',
            text: 'Balancing encouragement with constructive feedback',
            explanation: 'Affirm strengths while addressing growth areas',
            feedback: 'Excellent! Effective ministry communication affirms people while helping them grow.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Focusing only on positive aspects',
            explanation: 'Keep morale high with positive reinforcement',
            feedback: 'While encouragement is important, balanced feedback helps people grow and improve.',
            points: 3
          }
        ]
      }
    ]
  },
  5: { // Youth Ministry Leadership
    title: 'Youth Ministry Leadership',
    totalQuestions: 7,
    currentQuestion: 1,
    questions: [
      {
        type: 'multiple-choice',
        question: 'A regular youth group attendee has become increasingly disengaged and withdrawn. Your approach?',
        options: [
          {
            id: 'a',
            text: 'Give them space and wait for them to come around',
            explanation: 'Respect their need for space and time',
            feedback: 'While space can be helpful, proactive care and connection are important for youth ministry.',
            points: 2
          },
          {
            id: 'b',
            text: 'Have a private, caring conversation with them',
            explanation: 'Reach out personally to understand what\'s happening',
            feedback: 'Perfect approach! Youth need to know someone cares and notices when they\'re struggling.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Ask their friends to check on them',
            explanation: 'Use peer connections to help re-engage them',
            feedback: 'Peer support is valuable, but adult mentorship and direct care is also essential.',
            points: 3
          },
          {
            id: 'd',
            text: 'Address it publicly to encourage participation',
            explanation: 'Motivate them in front of the group',
            feedback: 'Public attention usually makes withdrawal worse. Private, caring conversation is more effective.',
            points: 1
          }
        ]
      },
      {
        type: 'true-false',
        question: 'Youth ministry is primarily about providing fun activities to keep young people engaged.',
        statement: 'The main goal of youth ministry is entertainment and engagement.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! While engagement is important, youth ministry\'s primary goal is spiritual development and discipleship.',
          incorrect: 'Actually, while fun and engagement matter, youth ministry\'s core purpose is spiritual growth and discipleship.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'What are key principles for effective youth ministry leadership? (Select all that apply)',
        options: [
          { id: 'a', text: 'Building authentic relationships with youth', correct: true },
          { id: 'b', text: 'Maintaining strict authority and distance', correct: false },
          { id: 'c', text: 'Creating safe spaces for questions and doubts', correct: true },
          { id: 'd', text: 'Avoiding difficult topics and conversations', correct: false },
          { id: 'e', text: 'Involving youth in leadership and decision-making', correct: true },
          { id: 'f', text: 'Making all decisions without youth input', correct: false }
        ],
        feedback: 'Effective youth ministry combines authentic relationships, safe exploration, and shared leadership.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each youth ministry challenge with the best response:',
        leftItems: [
          { id: '1', text: 'Youth questioning their faith' },
          { id: '2', text: 'Cliques forming in the group' },
          { id: '3', text: 'Low attendance at events' },
          { id: '4', text: 'Behavioral problems during activities' }
        ],
        rightItems: [
          { id: 'A', text: 'Evaluate relevance and ask youth for input' },
          { id: 'B', text: 'Create space for honest dialogue and exploration' },
          { id: 'C', text: 'Set clear expectations with grace and consistency' },
          { id: 'D', text: 'Intentionally mix groups and build inclusion' }
        ],
        correctMatches: [
          { left: '1', right: 'B' },
          { left: '2', right: 'D' },
          { left: '3', right: 'A' },
          { left: '4', right: 'C' }
        ],
        feedback: 'Different youth ministry challenges require different approaches, always centered on relationship and growth.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this youth ministry principle:',
        sentence: 'Youth need _____ more than programs and _____ more than perfection.',
        blanks: [
          {
            position: 0,
            options: ['relationships', 'activities', 'structure', 'entertainment'],
            correct: 'relationships'
          },
          {
            position: 1,
            options: ['authenticity', 'success', 'achievement', 'compliance'],
            correct: 'authenticity'
          }
        ],
        feedback: 'Youth ministry is fundamentally about authentic relationships rather than perfect programs.',
        points: 5
      },
      {
        type: 'multiple-choice',
        question: 'Looking at this youth group interaction, what leadership approach would be most effective?',
        imageUrl: 'https://images.unsplash.com/photo-1545886082-e66c6b9e011a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGdyb3VwJTIwYWN0aXZpdGllc3xlbnwxfHx8fDE3NTkxMjI3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        options: [
          {
            id: 'a',
            text: 'Take charge and direct the activity',
            explanation: 'Provide strong leadership and clear direction',
            feedback: 'While leadership is important, this engaged group shows readiness for collaborative leadership.',
            points: 2
          },
          {
            id: 'b',
            text: 'Facilitate and guide their natural interaction',
            explanation: 'Support and enhance existing engagement',
            feedback: 'Perfect! The engagement and connection shown here calls for facilitative leadership that empowers youth.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Step back and let them manage themselves',
            explanation: 'Allow youth independence and ownership',
            feedback: 'While youth need autonomy, they also benefit from adult guidance and mentorship.',
            points: 3
          }
        ]
      },
      {
        type: 'multiple-choice',
        question: 'What was the most effective aspect of the youth ministry approach shown in this video?',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        hint: 'Notice how the youth pastor facilitates rather than dominates the discussion.',
        options: [
          {
            id: 'a',
            text: 'Providing clear rules and expectations',
            explanation: 'Set boundaries and standards for behavior',
            feedback: 'Rules have their place, but connection and dialogue are more effective for youth development.',
            points: 2
          },
          {
            id: 'b',
            text: 'Creating space for youth to share and process',
            explanation: 'Facilitate open dialogue and exploration',
            feedback: 'Excellent! Youth learn best when they can express themselves and work through issues in community.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Giving definitive answers to all questions',
            explanation: 'Provide authoritative guidance and direction',
            feedback: 'While guidance is important, youth grow more when they can explore and discover with support.',
            points: 3
          }
        ]
      }
    ]
  },
  6: { // Worship Leadership Excellence
    title: 'Worship Leadership Excellence',
    totalQuestions: 7,
    currentQuestion: 1,
    questions: [
      {
        type: 'multiple-choice',
        question: 'Your worship team is struggling with coordination during rehearsals, and tensions are rising. What\'s your priority?',
        options: [
          {
            id: 'a',
            text: 'Focus on getting the music right first',
            explanation: 'Prioritize musical excellence to build confidence',
            feedback: 'While musical excellence matters, team relationships and communication often need attention first.',
            points: 2
          },
          {
            id: 'b',
            text: 'Address team dynamics and communication',
            explanation: 'Work on relationships and how the team functions together',
            feedback: 'Wise priority! When team relationships are healthy, musical excellence follows more naturally.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Replace struggling team members',
            explanation: 'Make personnel changes to improve performance',
            feedback: 'This should be a last resort. Investment in current team relationships usually yields better results.',
            points: 1
          },
          {
            id: 'd',
            text: 'Increase rehearsal time to work out issues',
            explanation: 'Spend more time practicing together',
            feedback: 'More time can help, but addressing underlying communication and relationship issues is more effective.',
            points: 2
          }
        ]
      },
      {
        type: 'true-false',
        question: 'The worship leader\'s primary role is to be the best musician on the team.',
        statement: 'Worship leaders should be the most skilled musicians on their team.',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! Worship leaders are primarily facilitators and shepherds who help others use their gifts effectively.',
          incorrect: 'Actually, worship leaders are more like conductors - they help others shine and coordinate the team effectively.'
        },
        points: 5
      },
      {
        type: 'multiple-answer',
        question: 'What are essential qualities for effective worship leadership? (Select all that apply)',
        options: [
          { id: 'a', text: 'Musical skill and technical proficiency', correct: true },
          { id: 'b', text: 'Heart for worship and spiritual maturity', correct: true },
          { id: 'c', text: 'Ability to perform solo without the team', correct: false },
          { id: 'd', text: 'Team building and communication skills', correct: true },
          { id: 'e', text: 'Flexibility and adaptability during services', correct: true },
          { id: 'f', text: 'Preference for contemporary music styles only', correct: false }
        ],
        feedback: 'Effective worship leadership combines musical skill, spiritual maturity, team leadership, and adaptability.',
        points: 5
      },
      {
        type: 'matching',
        question: 'Match each worship leadership challenge with the best approach:',
        leftItems: [
          { id: '1', text: 'Team member consistently late to rehearsal' },
          { id: '2', text: 'Congregation not engaging during worship' },
          { id: '3', text: 'Technical difficulties during service' },
          { id: '4', text: 'Conflict over song selection' }
        ],
        rightItems: [
          { id: 'A', text: 'Stay calm, adapt, and keep worship flowing' },
          { id: 'B', text: 'Have private conversation about commitment' },
          { id: 'C', text: 'Evaluate song accessibility and team leading style' },
          { id: 'D', text: 'Collaborate on selection process and criteria' }
        ],
        correctMatches: [
          { left: '1', right: 'B' },
          { left: '2', right: 'C' },
          { left: '3', right: 'A' },
          { left: '4', right: 'D' }
        ],
        feedback: 'Worship leadership requires different skills for different challenges, always prioritizing team and congregation.',
        points: 5
      },
      {
        type: 'fill-blank',
        question: 'Complete this worship leadership principle:',
        sentence: 'Great worship leaders create _____ for others to encounter God rather than _____ for personal performance.',
        blanks: [
          {
            position: 0,
            options: ['space', 'music', 'atmosphere', 'energy'],
            correct: 'space'
          },
          {
            position: 1,
            options: ['platforms', 'opportunities', 'venues', 'stages'],
            correct: 'platforms'
          }
        ],
        feedback: 'Worship leadership is about facilitating encounters with God rather than showcasing personal talent.',
        points: 5
      },
      {
        type: 'multiple-choice',
        question: 'Looking at this worship team setting, what leadership principle is most important?',
        imageUrl: 'https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5MTIyNzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        options: [
          {
            id: 'a',
            text: 'Maintaining strict musical discipline',
            explanation: 'Ensure technical excellence and precision',
            feedback: 'Discipline is important, but this collaborative setting suggests other priorities.',
            points: 2
          },
          {
            id: 'b',
            text: 'Fostering team collaboration and unity',
            explanation: 'Build strong relational bonds among team',
            feedback: 'Perfect! This setting shows people working together, which is essential for effective worship leadership.',
            points: 5,
            correct: true
          },
          {
            id: 'c',
            text: 'Showcasing individual musical talents',
            explanation: 'Highlight each member\'s unique abilities',
            feedback: 'Individual talents matter, but team unity and collaboration create better worship experiences.',
            points: 1
          }
        ]
      },
      {
        type: 'true-false',
        question: 'The most important part of worship team preparation is musical rehearsal.',
        videoUrl: 'https://player.vimeo.com/external/424812641.sd.mp4?s=b60c8a4a1e4a8d5e6f8a2b0c3d4e5f6a7b8c9d0e&profile_id=165&oauth2_token_id=57447761',
        correctAnswer: false,
        feedback: {
          correct: 'Correct! While musical preparation matters, spiritual preparation and team unity are equally or more important.',
          incorrect: 'Actually, spiritual preparation, prayer, and team connection are just as crucial as musical rehearsal.'
        },
        points: 5
      }
    ]
  }
};

// Individual question components
function MultipleChoiceQuestion({ question, options, selectedOption, onSelect, showFeedback, showExplanation }) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          disabled={showFeedback}
          className={`w-full p-4 rounded-xl text-left transition-all ${
            selectedOption?.id === option.id
              ? showFeedback
                ? option.correct
                  ? 'bg-[var(--mint-primary)]/20 shadow-md'
                  : 'bg-red-50 shadow-md'
                : 'bg-[var(--gray-primary)] text-white shadow-md'
              : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
              selectedOption?.id === option.id
                ? showFeedback
                  ? option.correct
                    ? 'bg-[var(--mint-primary)] border-2 border-[var(--mint-dark)]'
                    : 'bg-red-400 border-2 border-red-500'
                  : 'bg-white border-2 border-white'
                : 'bg-[var(--gray-lighter)] border-2 border-[var(--gray-light)]'
            }`}>
              {selectedOption?.id === option.id && showFeedback && (
                option.correct ? <Check className="w-4 h-4 text-[var(--gray-primary)]" /> : <X className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className={`mb-1 ${selectedOption?.id === option.id && !showFeedback ? 'text-white' : 'text-[var(--text-primary)]'}`}>{option.text}</p>
              {showExplanation && selectedOption?.id === option.id && (
                <p className={`text-sm ${selectedOption?.id === option.id && !showFeedback ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
                  {option.explanation}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function TrueFalseQuestion({ question, correctAnswer, selectedAnswer, onSelect, showFeedback }) {
  return (
    <div className="space-y-3">
      <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => onSelect(value === 'true')}>
        <Label 
          htmlFor="true" 
          className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${
            selectedAnswer === true 
              ? showFeedback
                ? correctAnswer === true ? 'bg-[var(--mint-primary)]/20 shadow-md' : 'bg-red-50 shadow-md'
                : 'bg-[var(--gray-primary)] text-white shadow-md'
              : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md'
          }`}
        >
          <RadioGroupItem value="true" id="true" disabled={showFeedback} />
          <span className={`flex-1 ${selectedAnswer === true && !showFeedback ? 'text-white' : 'text-[var(--text-primary)]'}`}>True</span>
          {showFeedback && selectedAnswer === true && (
            correctAnswer === true ? <Check className="w-4 h-4 text-[var(--mint-dark)]" /> : <X className="w-4 h-4 text-red-500" />
          )}
        </Label>
        
        <Label 
          htmlFor="false" 
          className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${
            selectedAnswer === false 
              ? showFeedback
                ? correctAnswer === false ? 'bg-[var(--mint-primary)]/20 shadow-md' : 'bg-red-50 shadow-md'
                : 'bg-[var(--gray-primary)] text-white shadow-md'
              : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md'
          }`}
        >
          <RadioGroupItem value="false" id="false" disabled={showFeedback} />
          <span className={`flex-1 ${selectedAnswer === false && !showFeedback ? 'text-white' : 'text-[var(--text-primary)]'}`}>False</span>
          {showFeedback && selectedAnswer === false && (
            correctAnswer === false ? <Check className="w-4 h-4 text-[var(--mint-dark)]" /> : <X className="w-4 h-4 text-red-500" />
          )}
        </Label>
      </RadioGroup>
    </div>
  );
}

function MultipleAnswerQuestion({ question, options, selectedAnswers, onSelect, showFeedback }) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedAnswers.includes(option.id);
        const isCorrect = option.correct;
        
        return (
          <Label 
            key={option.id}
            htmlFor={option.id}
            className={`flex items-start gap-3 p-4 rounded-xl transition-all cursor-pointer ${
              isSelected
                ? showFeedback
                  ? isCorrect ? 'bg-[var(--mint-primary)]/20 shadow-md' : 'bg-red-50 shadow-md'
                  : 'bg-[var(--gray-primary)] text-white shadow-md'
                : showFeedback && isCorrect
                  ? 'bg-[var(--mint-primary)]/10 shadow-sm'
                  : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md'
            }`}
          >
            <Checkbox
              id={option.id}
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(option.id, checked)}
              disabled={showFeedback}
              className="mt-0.5"
            />
            <span className={`flex-1 ${isSelected && !showFeedback ? 'text-white' : 'text-[var(--text-primary)]'}`}>
              {option.text}
              {showFeedback && (
                <span className="ml-2">
                  {isCorrect ? <Check className="w-4 h-4 text-[var(--mint-dark)] inline" /> : ''}
                  {isSelected && !isCorrect ? <X className="w-4 h-4 text-red-500 inline" /> : ''}
                </span>
              )}
            </span>
          </Label>
        );
      })}
    </div>
  );
}

// Fitness color palette for matching - minimal gray tones
const MATCH_COLORS = [
  { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-[var(--text-primary)]', badge: 'bg-[var(--gray-primary)]' },
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-[var(--text-primary)]', badge: 'bg-blue-400' },
  { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-[var(--text-primary)]', badge: 'bg-purple-400' },
  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-[var(--text-primary)]', badge: 'bg-amber-400' },
  { bg: 'bg-green-50', border: 'border-green-200', text: 'text-[var(--text-primary)]', badge: 'bg-green-400' },
  { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-[var(--text-primary)]', badge: 'bg-rose-400' }
];

function DraggableMatchItem({ item, index, isMatched, matchedTo, showFeedback, isCorrect, onRemove }) {
  const color = MATCH_COLORS[index % MATCH_COLORS.length];
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MATCH_ITEM',
    item: { id: item.id, index },
    canDrag: !showFeedback && !isMatched,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [showFeedback, item.id, index, isMatched]);

  return (
    <div
      ref={drag}
      className={`p-3 rounded-xl transition-all ${
        isDragging 
          ? 'opacity-30' 
          : isMatched
            ? showFeedback
              ? isCorrect
                ? 'bg-[var(--mint-primary)]/20 shadow-md'
                : 'bg-red-50 shadow-md'
              : `${color.bg} shadow-sm opacity-70`
            : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md cursor-move'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color.badge} text-white flex-shrink-0 shadow-sm`}>
          {item.id}
        </div>
        <span className={`flex-1 text-[var(--text-primary)] ${isMatched && !showFeedback ? 'opacity-60' : ''}`}>
          {item.text}
        </span>
        {showFeedback && isMatched && (
          isCorrect ? (
            <Check className="w-5 h-5 text-[var(--mint-dark)] flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
          )
        )}
        {isMatched && !showFeedback && matchedTo && (
          <button
            onClick={() => onRemove(item.id)}
            className="text-[var(--gray-medium)] hover:text-red-500 transition-colors flex-shrink-0"
            title="Remove match"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {isMatched && matchedTo && !showFeedback && (
        <div className={`mt-2 text-xs ${color.text} pl-11`}>
          Matched to: {matchedTo}
        </div>
      )}
    </div>
  );
}

function DropTarget({ item, index, matches, leftItems, onDrop, onRemove, showFeedback, correctMatches }) {
  const color = MATCH_COLORS[index % MATCH_COLORS.length];
  
  // Find if something is matched to this target
  const matchedLeftId = Object.keys(matches).find(leftId => matches[leftId] === item.id);
  const matchedLeftItem = leftItems.find(i => i.id === matchedLeftId);
  const matchedLeftIndex = leftItems.findIndex(i => i.id === matchedLeftId);
  
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'MATCH_ITEM',
    canDrop: () => !showFeedback,
    drop: (draggedItem) => {
      onDrop(draggedItem.id, item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [matches, showFeedback, item.id]);

  const isCorrect = matchedLeftId && correctMatches.find(m => m.left === matchedLeftId && m.right === item.id);
  const matchColor = matchedLeftItem ? MATCH_COLORS[matchedLeftIndex % MATCH_COLORS.length] : color;

  return (
    <div
      ref={drop}
      className={`p-3 rounded-xl transition-all min-h-[60px] ${
        isOver && canDrop
          ? `${color.bg} border-2 ${color.border} scale-[1.02] shadow-md`
          : matchedLeftItem
            ? showFeedback
              ? isCorrect
                ? 'bg-[var(--mint-primary)]/20 shadow-md'
                : 'bg-red-50 shadow-md'
              : `${matchColor.bg} shadow-sm`
            : 'border-2 border-dashed border-[var(--gray-light)] bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          matchedLeftItem ? matchColor.badge : 'bg-[var(--gray-medium)]'
        } text-white flex-shrink-0 shadow-sm`}>
          {matchedLeftItem ? matchedLeftId : item.id}
        </div>
        <div className="flex-1">
          {matchedLeftItem ? (
            <div>
              <div className="text-[var(--text-primary)]">{matchedLeftItem.text}</div>
              <div className="text-sm text-[var(--text-secondary)] mt-0.5">→ {item.text}</div>
            </div>
          ) : (
            <div className="text-[var(--text-secondary)]">{item.text}</div>
          )}
        </div>
        {showFeedback && matchedLeftItem && (
          isCorrect ? (
            <Check className="w-5 h-5 text-[var(--mint-dark)] flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
          )
        )}
        {matchedLeftItem && !showFeedback && (
          <button
            onClick={() => onRemove(matchedLeftId)}
            className="text-[var(--gray-medium)] hover:text-red-500 transition-colors flex-shrink-0"
            title="Remove match"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function MatchingQuestion({ question, leftItems, rightItems, matches, onMatch, showFeedback, correctMatches }) {
  const handleDrop = (leftId, rightId) => {
    onMatch(leftId, rightId);
  };

  const handleRemove = (leftId) => {
    // Create new matches object without this match
    const newMatches = { ...matches };
    delete newMatches[leftId];
    // Update via onMatch with the new matches object
    // We need to signal removal - pass null as rightId
    onMatch(leftId, null);
  };

  const handleResetAll = () => {
    // Remove all matches
    leftItems.forEach(item => {
      if (matches[item.id]) {
        handleRemove(item.id);
      }
    });
  };

  const matchCount = Object.keys(matches).length;
  const totalCount = leftItems.length;

  return (
    <div className="space-y-4">
      {/* Instructions & Controls */}
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex-1">
          <p className="text-sm text-blue-900">
            <strong>Instructions:</strong> Drag items from the left list and drop them on the matching answers on the right.
          </p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <Badge variant="secondary" className="text-sm">
            {matchCount} / {totalCount} matched
          </Badge>
          {!showFeedback && matchCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetAll}
              className="whitespace-nowrap"
            >
              Reset All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Items to match */}
        <div className="space-y-2">
          <h4 className="font-medium mb-3">Items to Match</h4>
          {leftItems.map((item, index) => {
            const isMatched = matches[item.id] !== undefined;
            const matchedRightItem = rightItems.find(r => r.id === matches[item.id]);
            const correctMatch = correctMatches.find(m => m.left === item.id);
            const isCorrect = isMatched && correctMatch && matches[item.id] === correctMatch.right;
            
            return (
              <DraggableMatchItem
                key={item.id}
                item={item}
                index={index}
                isMatched={isMatched}
                matchedTo={matchedRightItem?.text}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                onRemove={handleRemove}
              />
            );
          })}
        </div>

        {/* Right: Drop targets */}
        <div className="space-y-2">
          <h4 className="font-medium mb-3">Possible Matches</h4>
          {rightItems.map((item, index) => (
            <DropTarget
              key={item.id}
              item={item}
              index={index}
              matches={matches}
              leftItems={leftItems}
              onDrop={handleDrop}
              onRemove={handleRemove}
              showFeedback={showFeedback}
              correctMatches={correctMatches}
            />
          ))}
        </div>
      </div>

      {/* Feedback after submission */}
      {showFeedback && (
        <div className="p-4 bg-amber-50 rounded-xl shadow-sm">
          <h5 className="text-[var(--text-primary)] mb-3">Correct Matches:</h5>
          <div className="space-y-2">
            {correctMatches.map((match) => {
              const leftItem = leftItems.find(i => i.id === match.left);
              const rightItem = rightItems.find(i => i.id === match.right);
              const userGotItRight = matches[match.left] === match.right;
              return (
                <div key={match.left} className="flex items-center gap-2 text-sm">
                  {userGotItRight ? (
                    <Check className="w-4 h-4 text-[var(--mint-dark)]" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-[var(--text-primary)]">
                    {leftItem?.text} → {rightItem?.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Draggable word tile for fill-in-the-blank
function WordTile({ word, index, isUsed, onDragStart, showFeedback }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WORD_TILE',
    item: { word, sourceIndex: index, isFromBank: true },
    canDrag: !showFeedback && !isUsed,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [showFeedback, isUsed, word, index]);

  return (
    <div
      ref={drag}
      className={`inline-block px-4 py-2 rounded-lg transition-all ${
        isDragging
          ? 'opacity-30 scale-95'
          : isUsed
            ? 'bg-[var(--gray-lighter)] text-[var(--gray-medium)] cursor-not-allowed shadow-sm'
            : 'bg-[var(--gray-primary)] text-white cursor-move hover:bg-[var(--gray-hover)] hover:scale-105 shadow-sm hover:shadow-md'
      }`}
    >
      {word}
    </div>
  );
}

// Blank slot that accepts word tiles
function BlankSlot({ blankIndex, filledWord, onDrop, onRemove, isCorrect, showFeedback, blank }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'WORD_TILE',
    canDrop: () => !showFeedback,
    drop: (item) => {
      onDrop(blankIndex, item.word, item.sourceBlankIndex);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [showFeedback, blankIndex, onDrop]);

  // Make filled slots draggable too
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WORD_TILE',
    item: { word: filledWord, sourceBlankIndex: blankIndex, isFromBank: false },
    canDrag: !showFeedback && filledWord,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [showFeedback, filledWord, blankIndex]);

  const combinedRef = (el) => {
    drag(el);
    drop(el);
  };

  return (
    <span
      ref={combinedRef}
      className={`inline-block mx-1 px-4 py-2 rounded-lg min-w-[120px] text-center transition-all ${
        isDragging
          ? 'opacity-30'
          : isOver && canDrop
            ? 'border-2 border-[var(--mint-dark)] bg-[var(--mint-primary)]/20 scale-105 shadow-md'
            : filledWord
              ? showFeedback
                ? isCorrect
                  ? 'bg-[var(--mint-primary)]/20 text-[var(--text-primary)] shadow-sm'
                  : 'bg-red-50 text-[var(--text-primary)] shadow-sm'
                : 'bg-[var(--gray-primary)] text-white cursor-move hover:scale-105 shadow-sm'
              : 'border-2 border-dashed border-[var(--gray-light)] bg-white text-[var(--gray-medium)] shadow-sm'
      }`}
    >
      {filledWord || '?'}
      {filledWord && !showFeedback && (
        <button
          onClick={() => onRemove(blankIndex)}
          className="ml-2 text-white hover:text-red-300 inline-block"
          title="Remove"
        >
          <X className="w-3 h-3 inline" />
        </button>
      )}
      {showFeedback && filledWord && (
        <span className="ml-2 inline-block">
          {isCorrect ? (
            <Check className="w-4 h-4 inline text-[var(--mint-dark)]" />
          ) : (
            <X className="w-4 h-4 inline text-red-500" />
          )}
        </span>
      )}
    </span>
  );
}

function FillBlankQuestion({ question, sentence, blanks, selectedAnswers, onSelect, showFeedback }) {
  // Get all unique words from all blanks
  const allWords = [...new Set(blanks.flatMap(b => b.options))];
  
  // Count how many times each word appears in the word bank
  const wordCounts = {};
  blanks.forEach(blank => {
    blank.options.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  });
  
  // Track how many times each word has been used
  const usedWordCounts = {};
  Object.values(selectedAnswers).filter(Boolean).forEach(word => {
    usedWordCounts[word] = (usedWordCounts[word] || 0) + 1;
  });
  
  const handleDrop = (blankIndex, word, sourceBlankIndex) => {
    // If dragged from another blank, clear that blank first
    if (sourceBlankIndex !== undefined && sourceBlankIndex !== blankIndex) {
      onSelect(sourceBlankIndex, '');
    }
    // Fill the target blank
    onSelect(blankIndex, word);
  };

  const handleRemove = (blankIndex) => {
    onSelect(blankIndex, '');
  };

  const renderSentence = () => {
    const parts = sentence.split('_____');
    const result = [];
    
    parts.forEach((part, index) => {
      result.push(<span key={`text-${index}`}>{part}</span>);
      if (index < blanks.length) {
        const blank = blanks.find(b => b.position === index);
        const selectedAnswer = selectedAnswers[index];
        const isCorrect = selectedAnswer === blank?.correct;
        
        result.push(
          <BlankSlot
            key={`blank-${index}`}
            blankIndex={index}
            filledWord={selectedAnswer}
            onDrop={handleDrop}
            onRemove={handleRemove}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
            blank={blank}
          />
        );
      }
    });
    
    return result;
  };

  return (
    <div className="space-y-6">
      {/* The sentence with blank slots */}
      <div className="text-lg leading-loose p-6 bg-secondary rounded-2xl border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] text-[#3A4A46]">
        {renderSentence()}
      </div>
      
      {/* Word bank */}
      <div>
        <h4 className="font-bold text-[#3A4A46] mb-3">Word Bank</h4>
        <div className="flex flex-wrap gap-2 p-4 bg-white rounded-2xl border-2 border-[#3A4A46] min-h-[60px] shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
          {allWords.map((word, index) => {
            // A word is "used up" only if it's been used as many times as it appears in the bank
            const timesUsed = usedWordCounts[word] || 0;
            const timesAvailable = wordCounts[word] || 1;
            const isUsed = timesUsed >= timesAvailable;
            return (
              <WordTile
                key={`${word}-${index}`}
                word={word}
                index={index}
                isUsed={isUsed}
                showFeedback={showFeedback}
              />
            );
          })}
        </div>
        <p className="text-xs text-[#6B7B77] mt-2">
          Drag words from the word bank to fill in the blanks above
        </p>
      </div>
      
      {/* Feedback */}
      {showFeedback && (
        <div className="space-y-2">
          {blanks.map((blank, index) => {
            const selectedAnswer = selectedAnswers[index];
            const isCorrect = selectedAnswer === blank.correct;
            
            if (!isCorrect) {
              return (
                <div key={index} className="p-3 bg-[#FDD6A1]/40 border-2 border-[#3A4A46] rounded-2xl shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
                  <p className="text-sm text-[#3A4A46] font-medium">
                    Blank {index + 1}: The correct answer is <strong className="font-bold">{blank.correct}</strong>
                    {selectedAnswer && ` (you chose: ${selectedAnswer})`}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

function ImageQuestion({ question, imageUrl, questionType, ...props }) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <ImageWithFallback
          src={imageUrl}
          alt="Question context image"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      {questionType === 'multiple-choice' && (
        <MultipleChoiceQuestion question={question} {...props} />
      )}
      {questionType === 'true-false' && (
        <TrueFalseQuestion question={question} {...props} />
      )}
    </div>
  );
}

function VideoQuestion({ question, videoUrl, description, questionType, ...props }) {
  return (
    <div className="space-y-6">
      <div className="relative bg-gray-100 rounded-lg p-8 text-center">
        <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-muted-foreground mb-2">Video Content</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 text-xs text-muted-foreground">
          <Volume2 className="w-4 h-4 inline mr-1" />
          Video: {videoUrl ? 'Available' : 'Placeholder'}
        </div>
      </div>
      {questionType === 'multiple-choice' && (
        <MultipleChoiceQuestion question={question} {...props} />
      )}
      {questionType === 'true-false' && (
        <TrueFalseQuestion question={question} {...props} />
      )}
    </div>
  );
}

function ContentSlide({ title, content, imageUrl, videoUrl, videoDescription }) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="mb-4">
          <h3 className="text-xl">{title}</h3>
        </div>
      )}
      
      {videoUrl && (
        <div className="relative bg-gray-100 rounded-lg p-8 text-center mb-6">
          <PlayCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-muted-foreground mb-2">Video Content</p>
          {videoDescription && (
            <p className="text-sm text-muted-foreground">{videoDescription}</p>
          )}
          <div className="mt-4 text-xs text-muted-foreground">
            <Volume2 className="w-4 h-4 inline mr-1" />
            Video: {videoUrl ? 'Available' : 'Placeholder'}
          </div>
        </div>
      )}
      
      {imageUrl && (
        <div className="relative mb-6">
          <ImageWithFallback
            src={imageUrl}
            alt="Content image"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      
      {content && (
        <div className="prose prose-sm max-w-none">
          <p className="text-base leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
}

function ReflectionQuestion({ question, guidance, minCharacters, maxCharacters, reflectionText, onReflectionChange }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const characterCount = reflectionText?.length || 0;
  const wordsCount = reflectionText ? reflectionText.trim().split(/\s+/).filter(w => w).length : 0;
  const meetsMinimum = characterCount >= (minCharacters || 100);
  
  // Auto-save indicator
  React.useEffect(() => {
    if (reflectionText && reflectionText.length > 0) {
      setIsSaved(false);
      const timer = setTimeout(() => {
        setIsSaved(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [reflectionText]);

  return (
    <div className="space-y-4">
      {/* Gentle prompt */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <BookOpen className="w-6 h-6 text-[var(--gray-primary)] flex-shrink-0 mt-1" />
          <div>
            <p className="text-[var(--text-primary)] mb-2">Take a moment to reflect...</p>
            {guidance && (
              <p className="text-sm text-[var(--text-secondary)]">{guidance}</p>
            )}
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Textarea
          value={reflectionText || ''}
          onChange={(e) => onReflectionChange(e.target.value)}
          placeholder="Share your thoughts here... Be honest and thoughtful. There are no wrong answers."
          className="min-h-[200px] rounded-xl bg-white p-4 text-[var(--text-primary)] placeholder:text-[var(--gray-medium)]/50 focus:ring-2 focus:ring-[var(--mint-primary)] resize-none shadow-sm"
          style={{ fontSize: '16px', lineHeight: '1.6' }}
        />
        
        {/* Character counter and save indicator */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className={`${meetsMinimum ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-medium)]'}`}>
              {wordsCount} words
            </span>
            {minCharacters && (
              <span className="text-[var(--gray-medium)]">
                {meetsMinimum ? '✓' : `(minimum ${Math.ceil(minCharacters / 5)} words)`}
              </span>
            )}
          </div>
          {isSaved && reflectionText && (
            <div className="flex items-center gap-1 text-[var(--mint-dark)]">
              <Save className="w-3 h-3" />
              <span>Saved</span>
            </div>
          )}
        </div>
      </div>

      {/* Encouraging message */}
      <div className="bg-[var(--powder-blue)] rounded-xl p-4 shadow-sm">
        <p className="text-sm text-[var(--text-secondary)] text-center">
          Your reflection will be saved and you'll receive personalized feedback from your mentor.
        </p>
      </div>
    </div>
  );
}

export function LearningScenario({ scenario, userData, onComplete, onBack, onLivesUpdate, onHintsUpdate }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [matches, setMatches] = useState({});
  const [selectedBlankAnswers, setSelectedBlankAnswers] = useState({});
  const [pendingMatch, setPendingMatch] = useState(null);
  const [reflectionText, setReflectionText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [livesLost, setLivesLost] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  
  // Track which questions were answered correctly/incorrectly
  const [questionResults, setQuestionResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [retakeMode, setRetakeMode] = useState(false);
  const [questionsToRetake, setQuestionsToRetake] = useState([]);

  const data = scenarioData[scenario.id];
  
  if (!data) {
    return (
      <div className="lg:ml-80 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="mb-4">Scenario not found</h2>
            <p className="text-muted-foreground mb-6">
              The requested learning scenario is not available.
            </p>
            <Button onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions - defined early to avoid hoisting issues
  const resetQuestionState = () => {
    setSelectedOption(null);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setMatches({});
    setSelectedBlankAnswers({});
    setPendingMatch(null);
    setReflectionText('');
    setShowFeedback(false);
    setShowExplanation(false);
    setHintRevealed(false);
  };

  const handleContinueAfterResults = () => {
    // Calculate final score (0-1 for compatibility with existing code)
    const correctCount = questionResults.filter(r => r.correct).length;
    // Exclude content slides from total count
    const totalCount = data.questions.filter(q => q.type !== 'content').length;
    const score = totalCount > 0 ? correctCount / totalCount : 0;
    
    onComplete(score, livesLost, hintsUsed);
  };

  const handleRetakeWrong = () => {
    // Find all questions that were answered incorrectly
    const wrongQuestions = questionResults
      .filter(result => !result.correct)
      .map(result => result.questionIndex);
    
    if (wrongQuestions.length === 0) {
      // No wrong answers, continue
      handleContinueAfterResults();
      return;
    }
    
    // Set up retake mode
    setQuestionsToRetake(wrongQuestions);
    setRetakeMode(true);
    setCurrentQuestionIndex(0);
    setQuestionResults([]);
    setShowResults(false);
    setLivesLost(0); // Reset lives lost counter for retry
    setHintsUsed(0); // Reset hints used counter for retry
    resetQuestionState();
  };

  // Show results screen if quiz is complete
  if (showResults) {
    const correctCount = questionResults.filter(r => r.correct).length;
    // Exclude content slides from total count
    const totalCount = retakeMode 
      ? questionsToRetake.filter(idx => data.questions[idx].type !== 'content').length 
      : data.questions.filter(q => q.type !== 'content').length;
    const wrongCount = totalCount - correctCount;
    const wrongQuestionIds = questionResults
      .filter(result => !result.correct)
      .map(result => result.questionIndex);
    
    // Calculate score (for XP calculation)
    const score = totalCount > 0 ? Math.floor((correctCount / totalCount) * 100) : 0;
    
    return (
      <ResultsScreen
        score={score}
        totalQuestions={totalCount}
        questionsCorrect={correctCount}
        questionsWrong={wrongCount}
        wrongQuestionIds={wrongQuestionIds}
        chapterTitle={`Chapter 1`}
        pathTitle={data.title}
        isLastChapter={true}
        passThreshold={70}
        onRetakeWrong={handleRetakeWrong}
        onContinue={handleContinueAfterResults}
        onBackToDashboard={onBack}
      />
    );
  }

  const actualQuestionIndex = retakeMode && questionsToRetake.length > 0 
    ? questionsToRetake[currentQuestionIndex] 
    : currentQuestionIndex;
  const currentQuestion = data.questions[actualQuestionIndex];
  const questionsLength = retakeMode ? questionsToRetake.length : data.questions.length;
  const progress = ((currentQuestionIndex + 1) / questionsLength) * 100;
  
  // Safety check - if currentQuestion is undefined, show error
  if (!currentQuestion) {
    return (
      <div className="lg:ml-80 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="mb-4">Question not found</h2>
            <p className="text-muted-foreground mb-6">
              There was an error loading this question.
            </p>
            <Button onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const useHint = () => {
    if (userData.hintsAvailable > 0 && !hintRevealed) {
      setHintRevealed(true);
      const newHintsCount = userData.hintsAvailable - 1;
      onHintsUpdate(newHintsCount);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const loseLife = () => {
    const newLivesCount = Math.max(0, userData.lives - 1);
    onLivesUpdate(newLivesCount);
    setLivesLost(livesLost + 1);
    
    // Only show game over if this isn't the last question
    const questionsLength = retakeMode ? questionsToRetake.length : data.questions.length;
    const isLastQuestion = currentQuestionIndex >= questionsLength - 1;
    
    if (newLivesCount === 0 && !isLastQuestion) {
      setShowGameOver(true);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
  };

  const handleTrueFalseSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleMultipleAnswerSelect = (optionId, checked) => {
    if (checked) {
      setSelectedAnswers([...selectedAnswers, optionId]);
    } else {
      setSelectedAnswers(selectedAnswers.filter(id => id !== optionId));
    }
  };

  const handleMatch = (leftId, rightId) => {
    if (rightId === null) {
      // Remove the match
      const newMatches = { ...matches };
      delete newMatches[leftId];
      setMatches(newMatches);
    } else {
      // Add or update the match
      setMatches({
        ...matches,
        [leftId]: rightId
      });
    }
  };

  const handleBlankSelect = (blankIndex, value) => {
    setSelectedBlankAnswers((prevAnswers) => ({
      ...prevAnswers,
      [blankIndex]: value
    }));
  };

  const handleSubmit = () => {
    // Content slides don't need submission - just continue
    if (currentQuestion.type === 'content') {
      handleContinue();
      return;
    }
    
    setShowFeedback(true);
    
    // Check if answer is wrong and deduct a life
    let isCorrect = false;
    
    switch (currentQuestion.type) {
      case 'reflection':
        // Reflections are always "correct" - just check if they wrote something
        isCorrect = reflectionText && reflectionText.trim().length >= (currentQuestion.minCharacters || 100);
        // TODO: Save reflection to database here
        console.log('Saving reflection:', {
          questionId: currentQuestion.id,
          text: reflectionText,
          pathId: scenario.pathId,
          chapterId: scenario.chapter
        });
        break;
      case 'multiple-choice':
        isCorrect = selectedOption?.correct || false;
        break;
      case 'true-false':
        isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        break;
      case 'multiple-answer':
        const correctAnswers = currentQuestion.options.filter(opt => opt.correct).map(opt => opt.id);
        isCorrect = selectedAnswers.length === correctAnswers.length && 
                   selectedAnswers.every(id => correctAnswers.includes(id));
        break;
      case 'matching':
        isCorrect = currentQuestion.correctMatches.every(match => 
          matches[match.left] === match.right
        );
        break;
      case 'fill-blank':
        isCorrect = currentQuestion.blanks.every((blank, index) => 
          selectedBlankAnswers[index] === blank.correct
        );
        break;
      case 'image':
      case 'video':
        if (currentQuestion.questionType === 'multiple-choice') {
          isCorrect = selectedOption?.correct || false;
        } else {
          isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        }
        break;
      default:
        isCorrect = false;
    }
    
    // Track the result
    const actualQuestionIndex = retakeMode ? questionsToRetake[currentQuestionIndex] : currentQuestionIndex;
    const newResult = {
      questionIndex: actualQuestionIndex,
      correct: isCorrect
    };
    setQuestionResults([...questionResults, newResult]);
    
    if (!isCorrect) {
      loseLife();
    }
  };

  const handleContinue = () => {
    const questionsLength = retakeMode ? questionsToRetake.length : data.questions.length;
    
    if (currentQuestionIndex < questionsLength - 1) {
      // Not the last question yet
      if (userData.lives === 0) {
        // Game over - go back to dashboard
        onBack();
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetQuestionState();
    } else {
      // All questions completed - show results screen (even if lives are 0)
      setShowResults(true);
    }
  };

  // handleRetakeWrong and handleContinueAfterResults are defined earlier (before showResults check)

  const isAnswerComplete = () => {
    switch (currentQuestion.type) {
      case 'content':
        return true; // Content slides don't require an answer
      case 'reflection':
        return reflectionText && reflectionText.trim().length >= (currentQuestion.minCharacters || 100);
      case 'multiple-choice':
        return selectedOption !== null;
      case 'true-false':
        return selectedAnswer !== null;
      case 'multiple-answer':
        return selectedAnswers.length > 0;
      case 'matching':
        return Object.keys(matches).length === currentQuestion.leftItems.length;
      case 'fill-blank':
        return currentQuestion.blanks.every((blank, index) => selectedBlankAnswers[index]);
      case 'image':
      case 'video':
        return currentQuestion.questionType === 'multiple-choice' ? selectedOption !== null : selectedAnswer !== null;
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    const questionProps = {
      question: currentQuestion.question,
      showFeedback,
      showExplanation
    };

    switch (currentQuestion.type) {
      case 'content':
        return (
          <ContentSlide
            title={currentQuestion.title}
            content={currentQuestion.content}
            imageUrl={currentQuestion.imageUrl}
            videoUrl={currentQuestion.videoUrl}
            videoDescription={currentQuestion.videoDescription}
          />
        );
      
      case 'reflection':
        return (
          <ReflectionQuestion
            question={currentQuestion.question}
            guidance={currentQuestion.guidance}
            minCharacters={currentQuestion.minCharacters}
            maxCharacters={currentQuestion.maxCharacters}
            reflectionText={reflectionText}
            onReflectionChange={setReflectionText}
          />
        );
      
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            {...questionProps}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        );
      
      case 'true-false':
        return (
          <TrueFalseQuestion
            {...questionProps}
            correctAnswer={currentQuestion.correctAnswer}
            selectedAnswer={selectedAnswer}
            onSelect={handleTrueFalseSelect}
          />
        );
      
      case 'multiple-answer':
        return (
          <MultipleAnswerQuestion
            {...questionProps}
            options={currentQuestion.options}
            selectedAnswers={selectedAnswers}
            onSelect={handleMultipleAnswerSelect}
          />
        );
      
      case 'matching':
        return (
          <MatchingQuestion
            {...questionProps}
            leftItems={currentQuestion.leftItems}
            rightItems={currentQuestion.rightItems}
            matches={matches}
            onMatch={handleMatch}
            correctMatches={currentQuestion.correctMatches}
          />
        );
      
      case 'fill-blank':
        return (
          <FillBlankQuestion
            {...questionProps}
            sentence={currentQuestion.sentence}
            blanks={currentQuestion.blanks}
            selectedAnswers={selectedBlankAnswers}
            onSelect={handleBlankSelect}
          />
        );
      
      case 'image':
        return (
          <ImageQuestion
            {...questionProps}
            imageUrl={currentQuestion.imageUrl}
            questionType={currentQuestion.questionType}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
            correctAnswer={currentQuestion.correctAnswer}
            selectedAnswer={selectedAnswer}
            onSelect={currentQuestion.questionType === 'multiple-choice' ? handleOptionSelect : handleTrueFalseSelect}
          />
        );
      
      case 'video':
        return (
          <VideoQuestion
            {...questionProps}
            videoUrl={currentQuestion.videoUrl}
            description={currentQuestion.description}
            questionType={currentQuestion.questionType}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
            correctAnswer={currentQuestion.correctAnswer}
            selectedAnswer={selectedAnswer}
            onSelect={currentQuestion.questionType === 'multiple-choice' ? handleOptionSelect : handleTrueFalseSelect}
          />
        );
      
      default:
        return <div>Question type not supported</div>;
    }
  };

  const getFeedbackContent = () => {
    switch (currentQuestion.type) {
      case 'content':
        return null; // No feedback for content slides
      case 'reflection':
        return 'Your reflection has been saved. Your thoughts matter! You\'ll receive personalized feedback from your mentor soon.';
      case 'multiple-choice':
        return selectedOption?.feedback;
      case 'true-false':
        return selectedAnswer === currentQuestion.correctAnswer 
          ? currentQuestion.feedback.correct 
          : currentQuestion.feedback.incorrect;
      case 'multiple-answer':
      case 'matching':
      case 'fill-blank':
        return currentQuestion.feedback;
      case 'image':
      case 'video':
        if (currentQuestion.questionType === 'multiple-choice') {
          return selectedOption?.feedback;
        } else {
          return selectedAnswer === currentQuestion.correctAnswer 
            ? currentQuestion.feedback.correct 
            : currentQuestion.feedback.incorrect;
        }
      default:
        return 'Great work!';
    }
  };

  return (
    <DndProvider backend={DragBackend}>
      <div className="lg:ml-80 p-6 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-[var(--gray-primary)] hover:bg-[var(--powder-blue)]">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant={userData.lives <= 1 ? "destructive" : "outline"} className="flex items-center gap-1.5 shadow-sm">
              <Heart className="w-3 h-3" />
              <span>{userData.lives} Lives</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 shadow-sm">
              <Lightbulb className="w-3 h-3" />
              <span>{userData.hintsAvailable} Hints</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 shadow-sm">
              <Clock className="w-3 h-3" />
              <span>15 min</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 shadow-sm">
              <Star className="w-3 h-3" />
              <span>100 XP</span>
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3 gap-4">
              {/* Two-line header: Path name above, Chapter name below (bold) */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-secondary)] mb-1">
                  {scenario.pathTitle || data.title}
                </p>
                <h2 className="text-[var(--text-primary)]">
                  {scenario.title || `Chapter ${scenario.chapter || 1}`}
                  {retakeMode && <span className="text-red-500 ml-2">- Retry Mode</span>}
                </h2>
              </div>
              
              {/* Larger question counter - aligned with chapter title */}
              <div className="text-right flex-shrink-0 pt-[1.375rem]">
                <span className="text-[var(--text-primary)]">
                  Question {currentQuestionIndex + 1} of {questionsLength}
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Question */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[var(--text-primary)]">{currentQuestion.type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}</CardTitle>
              <Badge variant="outline" className="shadow-sm">Intermediate</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-6">
              <p className="leading-relaxed flex-1 text-[var(--text-primary)]">
                {currentQuestion.question}
              </p>
              
              {currentQuestion.hint && userData.hintsAvailable > 0 && !hintRevealed && !showFeedback && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={useHint}
                  className="ml-4 flex items-center gap-1.5 shadow-sm hover:shadow-md"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Use Hint</span>
                </Button>
              )}
            </div>

            {/* Hint Display */}
            {hintRevealed && currentQuestion.hint && (
              <Card className="mb-4 bg-amber-50 shadow-sm">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5" />
                    <p className="text-sm text-[var(--text-primary)]">{currentQuestion.hint}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {renderQuestion()}

            {/* Feedback */}
            {showFeedback && (
              <Card className="mt-6 bg-[var(--mint-primary)]/10 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-[var(--mint-dark)] mt-0.5" />
                    <div>
                      <h4 className="text-[var(--text-primary)] mb-2">
                        Great work!
                      </h4>
                      <p className="text-[var(--text-primary)]">{getFeedbackContent()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={onBack} className="shadow-sm hover:shadow-md">
                Exit Lesson
              </Button>
              
              {!showFeedback ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!isAnswerComplete()}
                  className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion.type === 'content' ? 'Continue' : 'Check Answer'}
                </Button>
              ) : (
                <Button onClick={handleContinue} className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg">
                  {currentQuestionIndex < questionsLength - 1 ? 'Next Question' : (retakeMode ? 'Finish Retry' : 'View Results')}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Game Over Modal */}
        {showGameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 shadow-2xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-[var(--text-primary)] mb-2">Out of Lives!</h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    You've run out of lives for today. Come back tomorrow to continue your learning journey!
                  </p>
                  <div className="space-y-2 mb-6 bg-[var(--powder-blue)] rounded-lg p-4">
                    <p className="text-sm text-[var(--text-primary)]">
                      • Lives refill daily at midnight
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      • You get {userData.maxLives} lives each day
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      • Hints also refill daily
                    </p>
                  </div>
                  <Button onClick={onBack} className="w-full bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg">
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </div>
    </DndProvider>
  );
}