import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card } from './ui/card';
import { 
  Home, 
  Trophy, 
  User, 
  Menu, 
  X,
  Church,
  Flame,
  Star,
  Heart,
  Lightbulb,
  Shield,
  Camera,
  BookOpen,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { useState } from 'react';

export function Navigation({ currentView, onNavigate, userProfile, userData, onUpdateProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedProfile = { ...userProfile, profilePicture: imageUrl };
      onUpdateProfile(updatedProfile);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Browse Courses', icon: BookOpen },
    { id: 'myReflections', label: 'My Reflections', icon: MessageSquare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Add admin link if user is an admin
  if (userData.isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield });
  }

  const handleLogout = () => {
    // Navigate to logout screen
    onNavigate('logout');
    setMobileMenuOpen(false);
  };

  const NavContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[var(--mint-primary)] rounded-lg flex items-center justify-center shadow-sm">
          <Church className="w-7 h-7 text-[var(--text-primary)]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">ChurchAcademy</h1>
          <p className="text-sm text-[var(--text-tertiary)]">Leadership Development</p>
        </div>
      </div>

      {/* User Profile Card */}
      {userProfile && (
        <div className="bg-gradient-to-br from-[var(--mint-light)] to-[var(--mint-primary)] rounded-xl p-5 mb-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative group">
              <Avatar className="w-14 h-14 ring-2 ring-white/50 shadow-md">
                {userProfile.profilePicture ? (
                  <img src={userProfile.profilePicture} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-white text-[var(--text-primary)] font-bold text-lg">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <label 
                htmlFor="nav-profile-pic-upload" 
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-5 h-5 text-white" />
              </label>
              <input
                id="nav-profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)] truncate">{userProfile.name}</h3>
              <p className="text-sm text-[var(--text-primary)]/70 capitalize truncate">
                {userProfile.role.replace('_', ' ')} Leader
              </p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                <span className="text-lg font-bold text-[var(--text-primary)]">{userData.xp}</span>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] text-center font-medium">Points</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-[var(--coral-primary)]" fill="var(--coral-primary)" />
                <span className="text-lg font-bold text-[var(--text-primary)]">{userData.streak}</span>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] text-center font-medium">Day Streak</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-[var(--coral-primary)]" fill="var(--coral-primary)" />
                <span className="text-lg font-bold text-[var(--text-primary)]">{userData.lives}/{userData.maxLives}</span>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] text-center font-medium">Lives</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Lightbulb className="w-4 h-4 text-[var(--amber-primary)]" fill="var(--amber-primary)" />
                <span className="text-lg font-bold text-[var(--text-primary)]">{userData.hintsAvailable}/{userData.maxHints}</span>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] text-center font-medium">Hints</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items - No Borders */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                isActive 
                  ? 'bg-[var(--mint-primary)]/15 text-[var(--text-primary)] shadow-sm' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--mint-dark)]' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-[var(--border-light)]">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-[var(--text-secondary)] hover:bg-[var(--coral-primary)]/10 hover:text-[var(--coral-primary)] transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--mint-primary)] rounded-lg flex items-center justify-center shadow-sm">
              <Church className="w-6 h-6 text-[var(--text-primary)]" />
            </div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">ChurchAcademy</h1>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg hover:bg-[var(--bg-secondary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-80 h-full bg-white p-6 overflow-y-auto shadow-2xl flex flex-col">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar - No Border */}
      <div className="hidden lg:flex fixed left-0 top-0 w-80 h-full bg-white p-6 overflow-y-auto flex-col shadow-sm">
        <NavContent />
      </div>
    </>
  );
}
