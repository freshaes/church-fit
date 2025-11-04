# Contributing to ChurchAcademy

Thank you for your interest in contributing to ChurchAcademy! This document provides guidelines for contributing to the project.

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/church-academy.git
   cd church-academy
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

---

## Development Guidelines

### Read the Documentation First

Before contributing, please read:
- `/guidelines/Guidelines.md` - Development standards
- `/guidelines/Clay-Style-Guide.md` - Design system
- `/guidelines/Quick-Reference.md` - Common patterns

### Code Style

**Follow existing patterns**:
- Use TypeScript/JSX for components
- Follow clay-style design system
- Use Tailwind CSS v4.0 utility classes
- Avoid typography classes (text-*, font-*) unless necessary

**Component structure**:
```tsx
import React, { useState } from 'react';
import { Button } from './ui/button';

export function MyComponent({ prop1, onAction }) {
  const [state, setState] = useState(null);
  
  return (
    <div className="container">
      {/* Component content */}
    </div>
  );
}
```

### Commit Messages

Use clear, descriptive commit messages:
- ✅ `feat: Add new matching question type`
- ✅ `fix: Correct lives counter in LearningScenario`
- ✅ `docs: Update Clay-Style-Guide with new colors`
- ✅ `style: Apply clay-style to new buttons`
- ❌ `update stuff`
- ❌ `fix bug`

### Branch Naming

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `style/description` - Styling changes

Examples:
- `feat/add-ranking-system`
- `fix/leaderboard-sorting`
- `docs/update-readme`

---

## Pull Request Process

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes** following the guidelines

3. **Test thoroughly**:
   - Test on mobile (375px, 768px, 1024px)
   - Test all question types if modifying learning flow
   - Check accessibility (keyboard navigation)
   - Verify clay-style design consistency

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: Add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feat/my-new-feature
   ```

6. **Open a Pull Request** on GitHub:
   - Use a clear title
   - Describe what changed and why
   - Reference any related issues
   - Include screenshots for UI changes

---

## What to Contribute

### High Priority

- **New question types** - Expand beyond the 6 current types
- **Accessibility improvements** - Screen reader support, keyboard nav
- **Performance optimizations** - Faster load times, smaller bundles
- **Mobile enhancements** - Better touch interactions
- **Bug fixes** - See GitHub Issues

### Medium Priority

- **Additional learning paths** - More course content
- **New badge designs** - Creative achievement badges
- **UI animations** - Smooth, performant transitions
- **Documentation** - Clarifications, examples

### Ideas Welcome

- **Social features** - Share achievements
- **Analytics** - Progress tracking
- **Gamification** - New mechanics
- **Admin tools** - Better content management

---

## Code Review

All contributions will be reviewed for:
- ✅ Code quality and clarity
- ✅ Adherence to design system (clay-style)
- ✅ Responsive design
- ✅ Accessibility
- ✅ Documentation updates (if needed)
- ✅ No breaking changes

We'll provide feedback and work with you to get your contribution merged!

---

## Protected Files

**Do not modify** these files without discussion:
- `/components/figma/ImageWithFallback.tsx` - System component
- `/styles/globals.css` - Base typography (discuss major changes)

---

## Testing Your Changes

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Login flow works
- [ ] Onboarding flow works
- [ ] Dashboard displays correctly
- [ ] Learning scenarios function (all question types)
- [ ] Results screen shows correct scores
- [ ] Admin panel accessible (if `isAdmin: true`)
- [ ] Profile page works
- [ ] Leaderboard displays
- [ ] Logout screen appears
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Clay-style design consistent

### Browser Testing

Test on at least 2 browsers:
- Chrome/Edge
- Firefox
- Safari (if on Mac)
- Mobile browser

---

## Documentation Updates

If your contribution changes functionality, update:
- `/guidelines/Page-Documentation.md` - For UI changes
- `/guidelines/Prototype-Features.md` - For feature changes
- `/guidelines/Guidelines.md` - For code pattern changes
- `/README.md` - For setup/deployment changes

---

## Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open a GitHub Issue
- **Feature requests**: Open a GitHub Issue with [Feature Request] tag
- **Urgent issues**: Tag @maintainers in the issue

---

## Code of Conduct

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Provide constructive feedback
- ✅ Focus on the project goals
- ✅ Help others learn and grow

### Not Acceptable

- ❌ Harassment or discrimination
- ❌ Unconstructive criticism
- ❌ Off-topic discussions
- ❌ Spam or self-promotion

---

## Recognition

Contributors will be:
- Listed in `Attributions.md`
- Credited in release notes
- Recognized in the community

Thank you for making ChurchAcademy better! 🙏

---

**Project Maintainers**: [Add maintainer info]  
**Last Updated**: January 2025
