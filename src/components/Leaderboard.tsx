import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown,
  TrendingUp,
  Calendar,
  Users,
  Award,
  Flame
} from 'lucide-react';

const leaderboardData = {
  weekly: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 2485, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Michael Johnson', role: 'Youth Leader', xp: 2340, streak: 8, avatar: 'M', badge: 'gold' },
    { rank: 3, name: 'Emily Chen', role: 'Worship Leader', xp: 2180, streak: 15, avatar: 'E', badge: 'silver' },
    { rank: 4, name: 'David Wilson', role: 'Bible Teacher', xp: 1980, streak: 6, avatar: 'D', badge: 'bronze' },
    { rank: 5, name: 'You', role: 'Youth Leader', xp: 1240, streak: 7, avatar: 'Y', isCurrentUser: true },
    { rank: 6, name: 'Lisa Thompson', role: 'Pastor', xp: 1150, streak: 4, avatar: 'L' },
    { rank: 7, name: 'Robert Kim', role: 'Worship Leader', xp: 1089, streak: 9, avatar: 'R' },
    { rank: 8, name: 'Maria Garcia', role: 'Bible Teacher', xp: 987, streak: 3, avatar: 'M' }
  ],
  monthly: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 8945, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Emily Chen', role: 'Worship Leader', xp: 8120, streak: 15, avatar: 'E', badge: 'gold' },
    { rank: 3, name: 'Michael Johnson', role: 'Youth Leader', xp: 7890, streak: 8, avatar: 'M', badge: 'silver' },
    { rank: 4, name: 'You', role: 'Youth Leader', xp: 6240, streak: 7, avatar: 'Y', isCurrentUser: true, badge: 'bronze' },
    { rank: 5, name: 'David Wilson', role: 'Bible Teacher', xp: 5980, streak: 6, avatar: 'D' }
  ],
  allTime: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 24580, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Emily Chen', role: 'Worship Leader', xp: 22340, streak: 15, avatar: 'E', badge: 'gold' },
    { rank: 3, name: 'Michael Johnson', role: 'Youth Leader', xp: 19870, streak: 8, avatar: 'M', badge: 'silver' },
    { rank: 4, name: 'David Wilson', role: 'Bible Teacher', xp: 18990, streak: 6, avatar: 'D', badge: 'bronze' },
    { rank: 12, name: 'You', role: 'Youth Leader', xp: 8240, streak: 7, avatar: 'Y', isCurrentUser: true }
  ]
};

const achievements = [
  { name: 'Learning Streak Master', description: '30-day learning streak', icon: '🔥', rarity: 'legendary' },
  { name: 'Perfect Score Champion', description: '10 perfect scores in a row', icon: '⭐', rarity: 'epic' },
  { name: 'Team Builder', description: 'Completed team leadership course', icon: '👥', rarity: 'rare' },
  { name: 'Conflict Resolver', description: 'Mastered conflict resolution', icon: '🤝', rarity: 'rare' }
];

export function Leaderboard({ userData }) {
  const [activeTab, setActiveTab] = useState('weekly');

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'crown': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'gold': return <Medal className="w-4 h-4 text-amber-500" />;
      case 'silver': return <Medal className="w-4 h-4 text-gray-400" />;
      case 'bronze': return <Medal className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-amber-700 bg-amber-100';
      case 2: return 'text-gray-700 bg-gray-100';
      case 3: return 'text-orange-700 bg-orange-100';
      default: return 'text-[var(--text-primary)] bg-[var(--powder-blue)]';
    }
  };

  return (
    <div className="lg:ml-80 p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[var(--text-primary)] mb-2">Leaderboard</h1>
            <p className="text-[var(--text-secondary)]">
              See how you rank among fellow church leaders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-lg px-3 py-1 shadow-sm">
                #{leaderboardData.weekly.find(u => u.isCurrentUser)?.rank || 'N/A'}
              </Badge>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Your Rank</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shadow-sm">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-[var(--text-primary)]">{userData.xp}</p>
                  <p className="text-sm text-[var(--text-secondary)]">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shadow-sm">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-[var(--text-primary)]">{userData.streak}</p>
                  <p className="text-sm text-[var(--text-secondary)]">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-[var(--text-primary)]">3</p>
                  <p className="text-sm text-[var(--text-secondary)]">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Trophy className="w-5 h-5" />
                  <span>Rankings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly" className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Week</span>
                    </TabsTrigger>
                    <TabsTrigger value="monthly">Month</TabsTrigger>
                    <TabsTrigger value="allTime">All Time</TabsTrigger>
                  </TabsList>

                  {Object.entries(leaderboardData).map(([period, data]) => (
                    <TabsContent key={period} value={period} className="space-y-3 mt-6">
                      {data.map((user) => (
                        <div
                          key={user.rank}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all shadow-sm ${
                            user.isCurrentUser 
                              ? 'bg-[var(--mint-primary)]/10 shadow-md' 
                              : 'bg-white hover:bg-[var(--powder-blue)] hover:shadow-md'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${getRankColor(user.rank)}`}>
                            {user.rank <= 3 ? getBadgeIcon(user.badge) : user.rank}
                          </div>

                          <Avatar className="w-12 h-12 shadow-sm">
                            <AvatarFallback className={user.isCurrentUser ? 'bg-[var(--mint-primary)] text-[var(--gray-primary)]' : 'bg-[var(--powder-blue)] text-[var(--gray-primary)]'}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-[var(--text-primary)]">{user.name}</p>
                              {user.isCurrentUser && (
                                <Badge variant="secondary" className="text-xs shadow-sm">You</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] capitalize">
                              {user.role.replace('_', ' ')}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[var(--text-primary)]">{user.xp.toLocaleString()}</p>
                            <p className="text-xs text-[var(--text-secondary)]">XP</p>
                          </div>

                          <div className="text-center px-3 py-1.5 bg-orange-50 rounded-lg shadow-sm">
                            <p className="text-sm text-orange-600">{user.streak}</p>
                            <p className="text-xs text-[var(--text-secondary)]">streak</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Medal className="w-5 h-5" />
                  <span>Your Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white hover:bg-[var(--powder-blue)] transition-colors shadow-sm hover:shadow-md">
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-[var(--powder-blue)] rounded-lg shadow-sm">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm text-[var(--text-primary)]">{achievement.name}</p>
                        <Badge 
                          variant="outline" 
                          className="text-xs shadow-sm"
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{achievement.description}</p>
                    </div>
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
