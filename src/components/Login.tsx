import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Church, Mail, Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function Login({ onLogin, onBackToOnboarding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Simulate login - in a real app, this would call an API
    // For demo purposes, any email/password combo works
    onLogin({
      name: email.split('@')[0],
      firstName: email.split('@')[0],
      lastName: 'User',
      email: email,
      role: 'pastor',
      goals: ['Improve conflict resolution skills', 'Develop team leadership abilities'],
      selectedPaths: [1, 2, 3]
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[var(--mint-primary)] rounded-xl flex items-center justify-center mb-4 shadow-md">
            <span className="text-4xl font-bold text-[var(--text-primary)]">A</span>
          </div>
          <CardTitle className="text-[var(--text-primary)]">Welcome Back!</CardTitle>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">
            Sign in to continue your leadership journey
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--text-primary)] font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[var(--text-tertiary)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-lg bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--text-primary)] font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-[var(--text-tertiary)]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 rounded-lg bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-[var(--text-secondary)]">Remember me</span>
              </label>
              <button type="button" className="text-[var(--gray-medium)] hover:text-[var(--text-primary)] transition-colors">
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[var(--gray-primary)] hover:bg-[var(--gray-hover)] text-white h-11 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
            >
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-light)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-[var(--text-tertiary)]">New to ChurchAcademy?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-lg hover:bg-[var(--powder-blue)] transition-all duration-200 font-medium"
              onClick={onBackToOnboarding}
            >
              Create New Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
