import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Star, 
  RotateCcw, 
  ChevronRight, 
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function ResultsScreen({ 
  score, 
  totalQuestions,
  questionsCorrect,
  questionsWrong,
  wrongQuestionIds = [],
  chapterTitle,
  pathTitle,
  isLastChapter = false,
  passThreshold = 70, // Percentage needed to pass
  onRetakeWrong,
  onContinue,
  onBackToDashboard
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.round((questionsCorrect / totalQuestions) * 100);
  const passed = percentage >= passThreshold;
  
  // Calculate bonus points
  const chapterBonus = passed ? 50 : 0; // 50 points for completing a chapter
  const pathBonus = passed && isLastChapter ? 100 : 0; // 100 points for completing entire path
  const totalScore = score + chapterBonus + pathBonus;
  
  // Calculate stars (1-3 based on performance)
  const getStars = () => {
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    return 1;
  };
  
  const stars = getStars();

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [passed]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                rotate: 0 
              }}
              animate={{ 
                top: '100vh', 
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['var(--mint-primary)', '#60A5FA', '#A78BFA', '#FBBF24', '#F472B6'][Math.floor(Math.random() * 5)]
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardContent className="p-6 md:p-8 text-center">
            {/* Trophy/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
              className="mx-auto w-20 h-20 mb-4"
            >
              {passed ? (
                <div className="relative">
                  <Trophy className="w-20 h-20 text-amber-500" />
                  {stars === 3 && (
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-6 h-6 text-[var(--mint-dark)]" />
                    </motion.div>
                  )}
                </div>
              ) : (
                <Award className="w-20 h-20 text-[var(--gray-medium)]" />
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[var(--text-primary)] mb-2"
            >
              {passed ? 'Chapter Complete!' : 'Keep Trying!'}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--text-secondary)] mb-3 text-sm"
            >
              {pathTitle} • {chapterTitle}
            </motion.p>

            {/* Stars */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="flex justify-center gap-2 mb-4"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.5 + (i * 0.1),
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  <Star
                    className={`w-12 h-12 ${
                      i <= stars 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-5"
            >
              <div className="text-5xl text-[var(--text-primary)] mb-1">
                {percentage}<span className="text-2xl text-[var(--text-secondary)]">%</span>
              </div>
              <div className="text-[var(--text-secondary)] text-sm">
                {questionsCorrect} of {totalQuestions} correct
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto mt-3">
                <Progress value={percentage} className="h-3" />
              </div>

              {/* Pass/Fail Indicator */}
              <div className="mt-3">
                {passed ? (
                  <Badge className="bg-[var(--mint-primary)]/20 text-[var(--mint-dark)] px-4 py-2 shadow-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Passed - {passThreshold}% required
                  </Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-600 px-4 py-2 shadow-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {passThreshold}% needed to continue
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 gap-3 mb-5 max-w-md mx-auto"
            >
              <div className="bg-[var(--mint-primary)]/20 rounded-xl p-3 shadow-sm">
                <div className="text-[var(--mint-dark)] mb-0.5">
                  <CheckCircle className="w-4 h-4 mx-auto" />
                </div>
                <div className="text-xl text-[var(--text-primary)]">{questionsCorrect}</div>
                <div className="text-xs text-[var(--text-secondary)]">Correct</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 shadow-sm">
                <div className="text-red-500 mb-0.5">
                  <AlertCircle className="w-4 h-4 mx-auto" />
                </div>
                <div className="text-xl text-[var(--text-primary)]">{questionsWrong}</div>
                <div className="text-xs text-[var(--text-secondary)]">Incorrect</div>
              </div>
            </motion.div>

            {/* Points Breakdown */}
            {passed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-4 max-w-md mx-auto"
              >
                <div className="bg-amber-50 rounded-xl p-3 shadow-sm">
                  <div className="text-xs text-[var(--text-primary)] mb-2">Points Earned</div>
                  
                  <div className="space-y-1.5 text-xs text-[var(--text-primary)]">
                    <div className="flex justify-between">
                      <span>Question Points:</span>
                      <span>+{score}</span>
                    </div>
                    
                    {chapterBonus > 0 && (
                      <div className="flex justify-between">
                        <span>Chapter Completion:</span>
                        <span className="text-[var(--mint-dark)]">+{chapterBonus}</span>
                      </div>
                    )}
                    
                    {pathBonus > 0 && (
                      <div className="flex justify-between">
                        <span>🎉 Path Completion:</span>
                        <span className="text-amber-600">+{pathBonus}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-1.5 mt-1.5 flex justify-between">
                      <span>Total Points:</span>
                      <span className="text-sm text-[var(--text-primary)]">{totalScore}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Motivational Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: passed ? 1.2 : 1 }}
              className="mb-5 p-3 bg-[var(--mint-primary)]/10 rounded-xl shadow-sm"
            >
              <p className="text-[var(--text-primary)] text-sm">
                {percentage >= 90 && "Outstanding work! You've mastered this chapter."}
                {percentage >= 70 && percentage < 90 && "Great job! You're making excellent progress."}
                {percentage >= 50 && percentage < 70 && "Good effort! Review the missed questions to strengthen your understanding."}
                {percentage < 50 && "Keep practicing! Learning takes time and repetition."}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: passed ? 1.3 : 1.1 }}
              className="space-y-3"
            >
              {passed ? (
                <>
                  <Button 
                    onClick={onContinue}
                    className="w-full bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg"
                    size="lg"
                  >
                    {isLastChapter ? 'Complete Path' : 'Continue to Next Chapter'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  {questionsWrong > 0 && (
                    <Button 
                      onClick={onRetakeWrong}
                      variant="outline"
                      className="w-full shadow-sm hover:shadow-md"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Review Missed Questions ({questionsWrong})
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button 
                    onClick={onRetakeWrong}
                    className="w-full bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg"
                    size="lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Retry Incorrect Questions
                  </Button>
                  
                  <Button 
                    onClick={onBackToDashboard}
                    variant="outline"
                    className="w-full shadow-sm hover:shadow-md"
                    size="lg"
                  >
                    Back to Dashboard
                  </Button>
                </>
              )}
            </motion.div>

            {/* XP Gained (if passed) */}
            {passed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                className="mt-4 flex items-center justify-center gap-2 text-[var(--mint-dark)] text-sm"
              >
                <TrendingUp className="w-4 h-4" />
                <span>+{totalScore} XP earned!</span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
