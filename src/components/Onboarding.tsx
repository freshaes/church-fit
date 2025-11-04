import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronRight, Church, Users, Heart, BookOpen, Briefcase, UserCircle, Monitor, Music, Clock, Award, Search, Check } from 'lucide-react';

const roles = [
  { 
    id: 'senior-pastor', 
    name: 'Senior Pastor', 
    icon: Church,
    description: 'Leading congregation and spiritual guidance' 
  },
  { id: 'youth-minister', name: 'Youth Minister', icon: Users, description: 'Mentoring and guiding young people' },
  { id: 'worship-leader', name: 'Worship Leader', icon: Music, description: 'Leading musical worship and praise' },
  { id: 'admin-team', name: 'Admin Team', icon: Briefcase, description: 'Managing church operations and administration' },
  { id: 'volunteer-leader', name: 'Volunteer Leader', icon: Heart, description: 'Coordinating and leading volunteers' },
  { id: 'tech-team', name: 'Tech Team', icon: Monitor, description: 'Supporting technology and media needs' }
];

const goals = [
  'Lead with Confidence',
  'Speak with Clarity',
  'Create Team Unity',
  'Resolve Conflicts Fast',
  'Develop Your People'
];

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { name: 'Barbados', flag: '🇧🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Zambia', flag: '🇿🇲' },
  { name: 'Zimbabwe', flag: '🇿🇼' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Ivory Coast', flag: '🇨🇮' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Lebanon', flag: '🇱🇧' },
  { name: 'Jordan', flag: '🇯🇴' },
];

const getRecommendedPaths = (role, goals) => {
  const allPaths = [
    {
      id: 1,
      title: 'Leadership Fundamentals',
      description: 'Master the basics of Christian leadership with biblical foundations',
      lessons: 12,
      duration: '4 weeks',
      difficulty: 'Beginner',
      matches: ['Lead with Confidence', 'Develop Your People'],
      roles: ['senior-pastor', 'youth-minister', 'worship-leader', 'admin-team', 'volunteer-leader', 'tech-team']
    },
    {
      id: 2,
      title: 'Conflict Resolution Mastery',
      description: 'Advanced techniques for resolving conflicts with grace and wisdom',
      lessons: 8,
      duration: '3 weeks',
      difficulty: 'Intermediate',
      matches: ['Resolve Conflicts Fast', 'Speak with Clarity'],
      roles: ['senior-pastor', 'youth-minister', 'admin-team', 'volunteer-leader']
    },
    {
      id: 3,
      title: 'Building Strong Communities',
      description: 'Create lasting connections and foster unity in your ministry',
      lessons: 10,
      duration: '3 weeks',
      difficulty: 'Beginner',
      matches: ['Create Team Unity', 'Develop Your People'],
      roles: ['senior-pastor', 'youth-minister', 'worship-leader', 'volunteer-leader']
    },
    {
      id: 4,
      title: 'Communication Excellence',
      description: 'Develop powerful communication skills for ministry impact',
      lessons: 6,
      duration: '2 weeks',
      difficulty: 'Beginner',
      matches: ['Speak with Clarity', 'Lead with Confidence'],
      roles: ['senior-pastor', 'worship-leader', 'admin-team', 'volunteer-leader']
    },
    {
      id: 5,
      title: 'Youth Ministry Leadership',
      description: 'Specialized training for effective youth ministry leadership',
      lessons: 15,
      duration: '5 weeks',
      difficulty: 'Intermediate',
      matches: ['Create Team Unity', 'Develop Your People'],
      roles: ['youth-minister', 'volunteer-leader']
    },
    {
      id: 6,
      title: 'Worship Leadership Excellence',
      description: 'Lead worship teams with confidence and spiritual depth',
      lessons: 12,
      duration: '4 weeks',
      difficulty: 'Intermediate',
      matches: ['Lead with Confidence', 'Create Team Unity'],
      roles: ['worship-leader', 'tech-team']
    }
  ];

  return allPaths
    .filter(path => path.roles.includes(role))
    .map(path => ({
      ...path,
      relevanceScore: path.matches.filter(match => goals.includes(match)).length
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 4);
};

const timeCommitments = [
  { id: 1, time: '5 mins', minutes: 5, dailyGoal: 50, icon: Clock, description: 'Quick daily practice' },
  { id: 2, time: '15 mins', minutes: 15, dailyGoal: 150, icon: Clock, description: 'Steady progress' },
  { id: 3, time: '30+ mins', minutes: 30, dailyGoal: 300, icon: Clock, description: 'Deep learning' }
];

export function Onboarding({ onComplete, onNavigateToLogin }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [dailyTimeCommitment, setDailyTimeCommitment] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [churchName, setChurchName] = useState('');
  const [churchSize, setChurchSize] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedPath, setSelectedPath] = useState(null);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '', percentage: 0 };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Count how many checks pass
    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    // Determine strength level
    if (score <= 1) {
      return { score, label: 'Weak', color: '#E66E5A', percentage: 20, checks };
    } else if (score === 2) {
      return { score, label: 'Fair', color: '#F59E0B', percentage: 40, checks };
    } else if (score === 3) {
      return { score, label: 'Good', color: '#9BB88F', percentage: 60, checks };
    } else if (score === 4) {
      return { score, label: 'Strong', color: 'var(--mint-dark)', percentage: 80, checks };
    } else {
      return { score, label: 'Very Strong', color: 'var(--mint-primary)', percentage: 100, checks };
    }
  }, [password]);
  
  // Country dropdown states
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  
  // Filter countries based on search
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoalToggle = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handlePathSelect = (pathId) => {
    setSelectedPath(pathId);
  };

  const handleComplete = () => {
    const timeData = timeCommitments.find(t => t.id === dailyTimeCommitment);
    
    onComplete({
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      username,
      email,
      password,
      role: selectedRole,
      goals: selectedGoals,
      dailyTimeCommitment: timeData?.minutes || 15,
      dailyPointsGoal: timeData?.dailyGoal || 150,
      country,
      churchName,
      churchSize,
      website,
      selectedPath
    });
  };

  const handleSkipChurchInfo = () => {
    setStep(6); // Skip to recommendations
  };

  const recommendedPaths = getRecommendedPaths(selectedRole, selectedGoals);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-[var(--mint-primary)] rounded-xl flex items-center justify-center mb-3 shadow-md">
            <span className="text-4xl font-bold text-[var(--text-primary)]">A</span>
          </div>
          <CardTitle className="text-[var(--text-primary)] mb-1">Welcome to ChurchAcademy!</CardTitle>
          <p className="text-[var(--text-secondary)] font-medium text-sm">
            Your personalized leadership development journey starts here
          </p>
          
          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? 'w-8 bg-[var(--mint-primary)]' : 'w-2 bg-[var(--gray-lighter)]'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">What's your primary role?</h3>
                <p className="text-[var(--text-secondary)] text-sm">Choose the role that best describes your ministry</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl text-left transition-all shadow-sm hover:shadow-md active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[var(--gray-primary)] shadow-md'
                          : 'bg-white hover:bg-[var(--powder-blue)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                          isSelected ? 'bg-white' : 'bg-[var(--bg-secondary)]'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-[var(--gray-primary)]' : 'text-[var(--text-secondary)]'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                            {role.name}
                          </div>
                          <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-[var(--text-secondary)]'}`}>
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Goal Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">What are your goals?</h3>
                <p className="text-[var(--text-secondary)] text-sm">Select at least 1 skill you'd like to develop</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  
                  return (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-4 rounded-xl text-left transition-all shadow-sm hover:shadow-md active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[var(--mint-primary)]/20 shadow-md'
                          : 'bg-white hover:bg-[var(--powder-blue)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                          {goal}
                        </span>
                        {isSelected && (
                          <Badge className="bg-[var(--mint-primary)] text-[var(--text-primary)] font-medium px-3 py-1">✓ Selected</Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className="text-center text-sm text-[var(--text-secondary)]">
                {selectedGoals.length} skill{selectedGoals.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}

          {/* Step 3: Daily Time Commitment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">How much time can you give each day?</h3>
                <p className="text-[var(--text-secondary)] text-sm">We'll set your daily points goal based on your commitment</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {timeCommitments.map((commitment) => {
                  const isSelected = dailyTimeCommitment === commitment.id;
                  const Icon = commitment.icon;
                  
                  return (
                    <button
                      key={commitment.id}
                      onClick={() => setDailyTimeCommitment(commitment.id)}
                      className={`p-4 rounded-xl text-left transition-all shadow-sm hover:shadow-md active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[var(--gray-primary)] shadow-md'
                          : 'bg-white hover:bg-[var(--powder-blue)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                          isSelected ? 'bg-white' : 'bg-[var(--bg-secondary)]'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-[var(--gray-primary)]' : 'text-[var(--text-secondary)]'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}`}>{commitment.time}</h3>
                            <div className="flex items-center gap-2">
                              <Award className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--amber-primary)]'}`} />
                              <span className={`font-semibold ${isSelected ? 'text-white' : 'text-[var(--text-primary)]'}`}>{commitment.dailyGoal} pts/day</span>
                            </div>
                          </div>
                          <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-[var(--text-secondary)]'}`}>{commitment.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">Tell us about yourself</h3>
                <p className="text-[var(--text-secondary)] text-sm">We'll use this to personalize your experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[var(--text-primary)] font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 rounded-lg bg-white shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[var(--text-primary)] font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 rounded-lg bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[var(--text-primary)] font-medium">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 rounded-lg bg-white shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--text-primary)] font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg bg-white shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[var(--text-primary)] font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg bg-white shadow-sm"
                />
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-secondary)]">Password Strength:</span>
                      <span 
                        className="text-xs font-semibold"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${passwordStrength.percentage}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.length ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-lighter)]'}`} 
                        />
                        <span className={passwordStrength.checks?.length ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.uppercase ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-lighter)]'}`} 
                        />
                        <span className={passwordStrength.checks?.uppercase ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.lowercase ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-lighter)]'}`} 
                        />
                        <span className={passwordStrength.checks?.lowercase ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}>
                          One lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.number ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-lighter)]'}`} 
                        />
                        <span className={passwordStrength.checks?.number ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}>
                          One number
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.special ? 'text-[var(--mint-dark)]' : 'text-[var(--gray-lighter)]'}`} 
                        />
                        <span className={passwordStrength.checks?.special ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}>
                          One special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Church Information */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">Tell us about your church</h3>
                <p className="text-[var(--text-secondary)] text-sm">This helps us personalize your experience (optional)</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2" ref={countryDropdownRef}>
                  <Label className="text-[var(--text-primary)] font-medium">Country</Label>
                  
                  {/* Searchable Country Input */}
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                      <Input
                        type="text"
                        placeholder="Search for your country..."
                        value={country ? `${countries.find(c => c.name === country)?.flag || ''} ${country}` : countrySearch}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Remove flag emoji if it exists
                          const searchValue = value.replace(/^[\u{1F1E6}-\u{1F1FF}]{2}\s*/u, '');
                          setCountrySearch(searchValue);
                          setCountry('');
                          setIsCountryDropdownOpen(true);
                        }}
                        onFocus={() => setIsCountryDropdownOpen(true)}
                        className="pl-10 h-11 rounded-lg bg-white shadow-sm"
                      />
                    </div>
                    
                    {/* Dropdown List */}
                    {isCountryDropdownOpen && filteredCountries.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredCountries.map((countryOption) => (
                          <button
                            key={countryOption.name}
                            type="button"
                            onClick={() => {
                              setCountry(countryOption.name);
                              setCountrySearch('');
                              setIsCountryDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[var(--powder-blue)] transition-colors flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
                          >
                            <span className="text-2xl">{countryOption.flag}</span>
                            <span className="text-[var(--text-primary)]">{countryOption.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* No results message */}
                    {isCountryDropdownOpen && filteredCountries.length === 0 && countrySearch && (
                      <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg p-4 text-center text-[var(--text-tertiary)]">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-[var(--text-primary)] font-medium">Church Name</Label>
                  <Input
                    id="churchName"
                    type="text"
                    placeholder="Your Church Name"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    className="h-11 rounded-lg bg-white shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchSize" className="text-[var(--text-primary)] font-medium">Church Size</Label>
                  <select
                    id="churchSize"
                    value={churchSize}
                    onChange={(e) => setChurchSize(e.target.value)}
                    className="w-full h-11 px-4 rounded-lg bg-white text-[var(--text-primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--mint-primary)]/30 font-medium"
                  >
                    <option value="">Select size</option>
                    <option value="1-50">1-50 members</option>
                    <option value="51-200">51-200 members</option>
                    <option value="201-500">201-500 members</option>
                    <option value="501-1000">501-1,000 members</option>
                    <option value="1001-2000">1,001-2,000 members</option>
                    <option value="2001+">2,001+ members</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-[var(--text-primary)] font-medium">Church Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourchurch.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-11 rounded-lg bg-white shadow-sm"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSkipChurchInfo}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--powder-blue)]"
                >
                  Skip this step
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Path Recommendations */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-[var(--text-primary)] mb-1">Your Recommended Path</h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Based on your role and goals, we recommend starting with one of these paths
                </p>
              </div>
              
              <div className="space-y-3">
                {recommendedPaths.map((path) => {
                  const isSelected = selectedPath === path.id;
                  
                  return (
                    <button
                      key={path.id}
                      onClick={() => handlePathSelect(path.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all shadow-sm hover:shadow-md active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[var(--mint-primary)]/20 shadow-md'
                          : 'bg-white hover:bg-[var(--powder-blue)]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-base mb-1 ${isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                            {path.title}
                          </h4>
                          <p className={`text-xs mb-2 ${isSelected ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'}`}>
                            {path.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Badge className="ml-3 bg-[var(--mint-primary)] text-[var(--text-primary)] flex-shrink-0 font-medium px-3 py-1">✓ Selected</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}`}>
                          <BookOpen className="w-3 h-3" />
                          <span className="font-medium">{path.lessons} lessons</span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}`}>
                          <Users className="w-3 h-3" />
                          <span className="font-medium">{path.duration}</span>
                        </div>
                        <Badge variant="outline" className={`${isSelected ? 'border-[var(--mint-dark)] bg-[var(--mint-primary)]/10 text-[var(--mint-dark)]' : 'border-[var(--border-light)] bg-white text-[var(--text-primary)]'} px-2 py-0.5`}>
                          {path.difficulty}
                        </Badge>
                        {path.relevanceScore > 0 && (
                          <Badge className="bg-[var(--amber-light)] text-[var(--text-primary)] px-2 py-0.5">
                            {path.relevanceScore} goal{path.relevanceScore > 1 ? 's' : ''} match
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className="text-center text-sm text-[var(--text-secondary)] bg-[var(--powder-blue)] rounded-xl p-4">
                💡 Choose the path that interests you most. You can explore other paths anytime from your dashboard!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-[var(--border-light)]">
            {step === 1 ? (
              <Button
                variant="outline"
                onClick={onNavigateToLogin}
                className="hover:bg-[var(--powder-blue)] transition-all"
              >
                Sign In Instead
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="hover:bg-[var(--powder-blue)] transition-all"
              >
                Back
              </Button>
            )}
            
            {step < 6 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedRole) ||
                  (step === 2 && selectedGoals.length < 1) ||
                  (step === 3 && !dailyTimeCommitment) ||
                  (step === 4 && (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !email.includes('@')))
                }
                className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium disabled:opacity-50"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!selectedPath}
                className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium disabled:opacity-50"
              >
                Start Learning <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
