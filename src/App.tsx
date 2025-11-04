import React, { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { BrowseLessons } from './components/BrowseLessons';
import { LearningScenario } from './components/LearningScenario';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { AdminDashboard } from './components/AdminDashboard';
import { CourseDetail } from './components/CourseDetail';
import { LogoutScreen } from './components/LogoutScreen';
import { MyReflections } from './components/MyReflections';

export default function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [userProfile, setUserProfile] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock user data
  const [userData, setUserData] = useState({
    xp: 1240,
    streak: 7,
    lessonsCompleted: 3,
    level: 2,
    lives: 5,
    maxLives: 5,
    hintsAvailable: 3,
    maxHints: 3,
    lastLivesRefresh: new Date().toDateString(), // Track when lives were last refreshed
    isAdmin: true, // Set to true for testing admin panel
    achievements: [
      { id: 1, name: '7-day streak', description: 'Kept it up!', earned: true },
      { id: 2, name: 'Team Builder', description: 'Master of unity', earned: true },
      { id: 3, name: 'Perfect Score', description: 'Got 100% in a lesson', earned: true }
    ]
  });

  // Check if lives should be refreshed daily
  useEffect(() => {
    const today = new Date().toDateString();
    if (userData.lastLivesRefresh !== today) {
      setUserData(prev => ({
        ...prev,
        lives: prev.maxLives,
        hintsAvailable: prev.maxHints,
        lastLivesRefresh: today
      }));
    }
  }, [userData.lastLivesRefresh]);

  const handleCompleteOnboarding = (profile) => {
    setUserProfile(profile);
    
    // Start with the first scenario from their selected learning paths
    if (profile.selectedPaths && profile.selectedPaths.length > 0) {
      const firstPathId = profile.selectedPaths[0];
      const firstScenario = getScenarioForPath(firstPathId);
      setCurrentScenario(firstScenario);
      setCurrentView('scenario');
    } else {
      setCurrentView('dashboard');
    }
  };

  // Helper function to get the first scenario for a learning path
  const getScenarioForPath = (pathId) => {
    // Map path IDs to titles for proper display in LearningScenario
    const pathTitles = {
      1: 'Leadership Fundamentals',
      2: 'Conflict Resolution Mastery',
      3: 'Building Strong Communities',
      4: 'Communication Excellence',
      5: 'Youth Ministry Leadership',
      6: 'Worship Leadership Excellence'
    };
    
    // Return a scenario object with the pathId as the ID
    // LearningScenario component uses this ID to look up question data
    return {
      id: pathId, // This must match scenarioData keys in LearningScenario
      pathId: pathId,
      pathTitle: pathTitles[pathId] || 'Learning Path',
      title: 'Getting Started', // Default chapter name for first chapter
      lesson: 1,
      chapter: 1
    };
  };

  const handleStartScenario = (scenario) => {
    // Ensure scenario has proper structure for LearningScenario component
    const scenarioWithId = {
      ...scenario,
      // If scenario doesn't have an ID, try to extract from pathId or default to 1
      id: scenario.id || scenario.pathId || 1
    };
    setCurrentScenario(scenarioWithId);
    setCurrentView('scenario');
  };

  const handleCompleteScenario = (score, livesLost = 0, hintsUsed = 0) => {
    const xpGained = Math.floor(score * 20);
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      lessonsCompleted: prev.lessonsCompleted + 1,
      lives: Math.max(0, prev.lives - livesLost),
      hintsAvailable: Math.max(0, prev.hintsAvailable - hintsUsed)
    }));
    
    // After completing a scenario, check if this was the first lesson from onboarding
    // If so, show a congratulations message and then go to dashboard
    if (currentScenario && currentScenario.lesson === 1) {
      // This was their first lesson from onboarding - celebrate completion
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 2000); // Give them a moment to see their score
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLivesUpdate = (newLivesCount) => {
    setUserData(prev => ({
      ...prev,
      lives: newLivesCount
    }));
  };

  const handleHintsUpdate = (newHintsCount) => {
    setUserData(prev => ({
      ...prev,
      hintsAvailable: newHintsCount
    }));
  };

  const handleLogin = (profile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const handleStartLessonFromCourse = (chapter) => {
    // Map course/chapter to a valid scenario ID (1-6)
    // For now, use a simple mapping based on course or default to 1
    const scenarioId = selectedCourse?.id || 1;
    
    setCurrentScenario({
      id: scenarioId, // Use course ID to map to scenario data
      pathId: scenarioId,
      title: chapter.title,
      description: chapter.description,
      pathTitle: selectedCourse?.title || 'Course',
      lesson: chapter.id,
      chapter: chapter.id
    });
    setCurrentView('scenario');
  };

  if (!userProfile && currentView === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        onBackToOnboarding={() => setCurrentView('onboarding')}
      />
    );
  }

  if (!userProfile && currentView === 'onboarding') {
    return (
      <Onboarding 
        onComplete={handleCompleteOnboarding}
        onNavigateToLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'logout') {
    return (
      <LogoutScreen 
        onBackToLogin={() => {
          setUserProfile(null);
          setCurrentView('login');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'admin' && (
        <Navigation 
          currentView={currentView} 
          onNavigate={setCurrentView}
          userProfile={userProfile}
          userData={userData}
          onUpdateProfile={setUserProfile}
        />
      )}
      
      <main className={currentView === 'admin' ? '' : 'pt-16 lg:pt-0'}>
        {currentView === 'dashboard' && (
          <Dashboard 
            userProfile={userProfile}
            userData={userData}
            onStartScenario={handleStartScenario}
            onViewCourse={handleViewCourse}
          />
        )}
        
        {currentView === 'scenario' && currentScenario && (
          <LearningScenario 
            scenario={currentScenario}
            userData={userData}
            onComplete={handleCompleteScenario}
            onBack={() => setCurrentView('dashboard')}
            onLivesUpdate={handleLivesUpdate}
            onHintsUpdate={handleHintsUpdate}
          />
        )}
        
        {currentView === 'browse' && (
          <BrowseLessons 
            userProfile={userProfile}
            onStartPath={(path) => {
              // Navigate to the dashboard to see the path details
              setCurrentView('dashboard');
            }}
            onViewCourse={handleViewCourse}
          />
        )}

        {currentView === 'course-detail' && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={() => setCurrentView('dashboard')}
            onStartLesson={handleStartLessonFromCourse}
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard userData={userData} />
        )}
        
        {currentView === 'profile' && (
          <Profile 
            userProfile={userProfile}
            userData={userData}
            onUpdateProfile={setUserProfile}
          />
        )}

        {currentView === 'myReflections' && (
          <MyReflections 
            onBack={() => setCurrentView('dashboard')}
            userProfile={userProfile}
          />
        )}

        {currentView === 'admin' && userData.isAdmin && (
          <AdminDashboard onBack={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
}