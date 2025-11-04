import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Star, 
  Award, 
  BookOpen, 
  Target,
  Calendar,
  Edit3,
  Trophy,
  Flame,
  TrendingUp,
  Church,
  Globe,
  Users as UsersIcon,
  Camera,
  Lock,
  Check
} from 'lucide-react';

export function Profile({ userProfile, userData, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email || '',
    role: userProfile.role,
    goals: userProfile.goals,
    dailyTimeCommitment: userProfile.dailyTimeCommitment || 15,
    dailyPointsGoal: userProfile.dailyPointsGoal || 150,
    country: userProfile.country || '',
    churchName: userProfile.churchName || '',
    churchSize: userProfile.churchSize || '',
    website: userProfile.website || ''
  });

  // Password reset states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!newPassword) return { score: 0, label: '', color: '', percentage: 0 };

    let score = 0;
    const checks = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    };

    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    if (score <= 1) {
      return { score, label: 'Weak', color: '#EF4444', percentage: 20, checks };
    } else if (score === 2) {
      return { score, label: 'Fair', color: '#F59E0B', percentage: 40, checks };
    } else if (score === 3) {
      return { score, label: 'Good', color: '#8ED96A', percentage: 60, checks };
    } else if (score === 4) {
      return { score, label: 'Strong', color: 'var(--mint-dark)', percentage: 80, checks };
    } else {
      return { score, label: 'Very Strong', color: 'var(--gray-primary)', percentage: 100, checks };
    }
  }, [newPassword]);

  const totalLessonsInCourse = 50;
  const progressPercentage = (userData.lessonsCompleted / totalLessonsInCourse) * 100;

  const stats = [
    {
      label: 'Total XP',
      value: userData.xp.toLocaleString(),
      icon: Star,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      label: 'Current Streak',
      value: `${userData.streak} days`,
      icon: Flame,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Lessons Completed',
      value: userData.lessonsCompleted,
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'Achievements',
      value: userData.achievements.length,
      icon: Trophy,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  const recentActivity = [
    { date: '2025-01-20', activity: 'Completed "Conflict Resolution Basics"', xp: 120 },
    { date: '2025-01-19', activity: 'Earned "Team Builder" achievement', xp: 50 },
    { date: '2025-01-18', activity: 'Completed "Leadership Scenarios"', xp: 100 },
    { date: '2025-01-17', activity: 'Started new learning path', xp: 0 },
    { date: '2025-01-16', activity: 'Completed "Communication Skills"', xp: 90 }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handlePasswordReset = () => {
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Simulate password reset
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 3000);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedProfile = { ...userProfile, profilePicture: imageUrl };
      onUpdateProfile(updatedProfile);
    }
  };

  return (
    <div className="lg:ml-80 p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative group">
                <Avatar className="w-20 h-20 shadow-md">
                  {userProfile.profilePicture ? (
                    <img src={userProfile.profilePicture} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label 
                  htmlFor="profile-pic-upload" 
                  className="absolute inset-0 flex items-center justify-center bg-[var(--gray-primary)]/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-white" />
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Full Name"
                    />
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      className="w-full h-11 px-4 rounded-lg bg-white text-[var(--text-primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--mint-primary)]/30"
                    >
                      <option value="senior-pastor">Senior Pastor</option>
                      <option value="youth-minister">Youth Minister</option>
                      <option value="worship-leader">Worship Leader</option>
                      <option value="admin-team">Admin Team</option>
                      <option value="volunteer-leader">Volunteer Leader</option>
                      <option value="tech-team">Tech Team</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-[var(--text-primary)]">{userProfile.name}</h1>
                    <p className="text-[var(--text-secondary)] capitalize">
                      {userProfile.role.replace('-', ' ')}
                    </p>
                    {userProfile.churchName && (
                      <p className="text-[var(--text-secondary)] text-sm mt-1 flex items-center gap-1.5">
                        <Church className="w-3.5 h-3.5" />
                        {userProfile.churchName}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <Badge variant="secondary" className="flex items-center gap-1.5 shadow-sm">
                    <Star className="w-3 h-3" />
                    <span>Level {userData.level}</span>
                  </Badge>
                  <Badge variant="outline" className="shadow-sm">
                    {userData.xp} XP
                  </Badge>
                  {userProfile.country && (
                    <Badge variant="outline" className="flex items-center gap-1.5 shadow-sm">
                      <Globe className="w-3 h-3" />
                      {userProfile.country}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg">Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="shadow-sm hover:shadow-md">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="shadow-sm hover:shadow-md">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form - Daily Goal */}
        {isEditing && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                <Target className="w-5 h-5" />
                <span>Daily Learning Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[var(--text-primary)]">How much time can you give each day?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { time: '5 mins', minutes: 5, goal: 50 },
                      { time: '15 mins', minutes: 15, goal: 150 },
                      { time: '30+ mins', minutes: 30, goal: 300 }
                    ].map((option) => {
                      const isSelected = editForm.dailyTimeCommitment === option.minutes;
                      return (
                        <button
                          key={option.minutes}
                          type="button"
                          onClick={() => setEditForm({
                            ...editForm,
                            dailyTimeCommitment: option.minutes,
                            dailyPointsGoal: option.goal
                          })}
                          className={`p-4 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-[var(--gray-primary)] text-white shadow-md'
                              : 'bg-white hover:bg-[var(--powder-blue)] shadow-sm hover:shadow-md'
                          }`}
                        >
                          <div className="text-center">
                            <div className="mb-1">{option.time}</div>
                            <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-[var(--text-secondary)]'}`}>
                              {option.goal} pts/day goal
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-[var(--powder-blue)] rounded-xl p-4 shadow-sm">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--text-primary)]">Current daily goal:</span> {editForm.dailyPointsGoal} points
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Reach your goal each day to earn streak badges!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Form - Church Information */}
        {isEditing && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                <Church className="w-5 h-5" />
                <span>Church Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--text-primary)]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    placeholder="your.email@church.org"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-[var(--text-primary)]">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    value={editForm.country}
                    onChange={(e) => setEditForm({...editForm, country: e.target.value})}
                    placeholder="United States"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-[var(--text-primary)]">Church Name</Label>
                  <Input
                    id="churchName"
                    type="text"
                    value={editForm.churchName}
                    onChange={(e) => setEditForm({...editForm, churchName: e.target.value})}
                    placeholder="Your Church Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchSize" className="text-[var(--text-primary)]">Church Size</Label>
                  <select
                    id="churchSize"
                    value={editForm.churchSize}
                    onChange={(e) => setEditForm({...editForm, churchSize: e.target.value})}
                    className="w-full h-11 px-4 rounded-lg bg-white text-[var(--text-primary)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--mint-primary)]/30"
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-[var(--text-primary)]">Church Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={editForm.website}
                  onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                  placeholder="https://yourchurch.org"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Password Reset Section */}
        {isEditing && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                <Lock className="w-5 h-5" />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {passwordSuccess && (
                <div className="p-4 bg-[var(--mint-primary)]/20 rounded-xl shadow-sm">
                  <p className="text-sm text-[var(--text-primary)] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--mint-dark)]" />
                    Password changed successfully!
                  </p>
                </div>
              )}

              {passwordError && (
                <div className="p-4 bg-red-50 rounded-xl shadow-sm">
                  <p className="text-sm text-red-600">{passwordError}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-[var(--text-primary)]">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-[var(--text-primary)]">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-secondary)]">Password Strength:</span>
                      <span 
                        className="text-xs"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${passwordStrength.percentage}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 pt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.length ? 'text-[var(--mint-dark)]' : 'text-gray-300'}`} 
                        />
                        <span className={passwordStrength.checks?.length ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.uppercase ? 'text-[var(--mint-dark)]' : 'text-gray-300'}`} 
                        />
                        <span className={passwordStrength.checks?.uppercase ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.lowercase ? 'text-[var(--mint-dark)]' : 'text-gray-300'}`} 
                        />
                        <span className={passwordStrength.checks?.lowercase ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                          One lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.number ? 'text-[var(--mint-dark)]' : 'text-gray-300'}`} 
                        />
                        <span className={passwordStrength.checks?.number ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                          One number
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.special ? 'text-[var(--mint-dark)]' : 'text-gray-300'}`} 
                        />
                        <span className={passwordStrength.checks?.special ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                          One special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[var(--text-primary)]">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              <Button 
                onClick={handlePasswordReset}
                className="w-full md:w-auto bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white shadow-md hover:shadow-lg"
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg text-[var(--text-primary)]">{stat.value}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress and Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                <TrendingUp className="w-5 h-5" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--text-primary)]">Course Completion</span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {userData.lessonsCompleted}/{totalLessonsInCourse}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--text-primary)]">Next Level</span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {userData.xp}/2000 XP
                  </span>
                </div>
                <Progress value={(userData.xp % 2000) / 2000 * 100} className="h-2" />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-[var(--text-secondary)]">
                  {2000 - (userData.xp % 2000)} XP until Level {userData.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                <Target className="w-5 h-5" />
                <span>Learning Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProfile.goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--mint-primary)] rounded-full" />
                    <span className="text-sm text-[var(--text-primary)]">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements and Activity */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Award className="w-5 h-5" />
                  <span>Your Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="rounded-xl p-4 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[var(--mint-primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Award className="w-6 h-6 text-[var(--mint-dark)]" />
                      </div>
                      <h4 className="text-sm mb-1 text-[var(--text-primary)]">{achievement.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{achievement.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs shadow-sm">Earned</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Calendar className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
                      <div>
                        <p className="text-sm text-[var(--text-primary)]">{item.activity}</p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      {item.xp > 0 && (
                        <Badge variant="secondary" className="flex items-center gap-1.5 shadow-sm">
                          <Star className="w-3 h-3" />
                          <span>+{item.xp} XP</span>
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
