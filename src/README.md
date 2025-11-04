# ChurchAcademy - Leadership Development Platform

A comprehensive web-based leadership development platform designed specifically for churches. Built with React, Tailwind CSS v4.0, and a clay-style UI inspired by Duolingo.

![ChurchAcademy](https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=400&fit=crop)

## 🎯 Features

- **Personalized Onboarding** - Role selection and goal setting
- **6 Question Types** - Multiple choice, true/false, multiple answer, matching, fill-in-blank, and content slides
- **Gamification System** - Lives, hints, points, badges, and leaderboards
- **Admin Panel** - Complete CRUD for learning paths, users, and badges
- **Profile Management** - Avatar upload, stats tracking, badge collection
- **Course Browsing** - Search and filter learning paths
- **Responsive Design** - Mobile-first, tablet, and desktop support
- **Clay-Style UI** - Warm, friendly design inspired by Duolingo

## 🚀 Quick Start

### Option 1: Replit (Recommended for Quick Testing)

1. **Import to Replit**:
   - Go to [Replit](https://replit.com)
   - Click "Create Repl" → "Import from GitHub" (or drag/drop files)
   - Upload all files maintaining the folder structure

2. **Configure Replit**:
   - Replit should auto-detect it's a Vite + React project
   - If not, set the run command: `npm run dev`
   - Set the build command: `npm run build`

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Access**: Open the Webview panel in Replit (usually auto-opens)

### Option 2: Local Development

#### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**

#### Installation Steps

1. **Clone/Download the Project**:
   ```bash
   # If from Git
   git clone <repository-url>
   cd church-academy

   # Or extract from ZIP
   unzip church-academy.zip
   cd church-academy
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in Browser**:
   - Navigate to `http://localhost:5173`
   - The app should automatically open

### Option 3: CodeSandbox

1. Go to [CodeSandbox](https://codesandbox.io)
2. Click "Import from GitHub" or "Create Sandbox"
3. Upload the project files
4. CodeSandbox will auto-detect dependencies
5. Click "Run" to start

### Option 4: StackBlitz

1. Go to [StackBlitz](https://stackblitz.com)
2. Click "New Project" → "Import Project"
3. Upload the files or connect to GitHub
4. StackBlitz will auto-install and run

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts. Vercel auto-detects Vite projects.

### Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Other Platforms

The `dist/` folder contains static files that can be deployed to:
- AWS S3 + CloudFront
- Firebase Hosting
- Render
- Railway
- Any static hosting service

## 📁 Project Structure

```
church-academy/
├── index.html              # HTML entry point
├── main.tsx                # React entry point
├── App.tsx                 # Main app with routing
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── components/             # React components
│   ├── Login.tsx
│   ├── LogoutScreen.tsx
│   ├── Onboarding.tsx
│   ├── Dashboard.tsx
│   ├── Navigation.tsx
│   ├── LearningScenario.tsx
│   ├── ResultsScreen.tsx
│   ├── BrowseLessons.tsx
│   ├── CourseDetail.tsx
│   ├── Profile.tsx
│   ├── Leaderboard.tsx
│   ├── AdminDashboard.tsx
│   ├── PathEditor.tsx
│   ├── PathEditorFull.tsx
│   ├── UserManager.tsx
│   ├── BadgeManager.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/                 # Shadcn UI components (40+)
├── styles/
│   └── globals.css         # Global styles + Tailwind
└── guidelines/             # Complete documentation
    ├── Clay-Style-Guide.md
    ├── Guidelines.md
    ├── Prototype-Features.md
    ├── Page-Documentation.md
    ├── User-Stories.md
    ├── Documentation-Summary.md
    └── Quick-Reference.md
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Utility-first styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icon library
- **Recharts** - Chart visualization
- **React DnD** - Drag and drop
- **Shadcn/UI** - Component library
- **React Hook Form** - Form handling

## 📚 Documentation

### 🆕 Latest Updates (Jan 16, 2025)
- **[RECENT_UPDATES.md](RECENT_UPDATES.md)** - Latest session changes summary
- **[CHANGELOG.md](CHANGELOG.md)** - Complete version history
- **[FEATURE_COMPARISON.md](FEATURE_COMPARISON.md)** - Before/after comparison

### Core Documentation
Comprehensive documentation is available in the `/guidelines` folder:

- **[Clay-Style-Guide.md](guidelines/Clay-Style-Guide.md)** - Complete design system
- **[Guidelines.md](guidelines/Guidelines.md)** - Development guidelines
- **[Prototype-Features.md](guidelines/Prototype-Features.md)** - Feature specifications
- **[Page-Documentation.md](guidelines/Page-Documentation.md)** - Page-by-page breakdown
- **[User-Stories.md](guidelines/User-Stories.md)** - User journeys
- **[Documentation-Summary.md](guidelines/Documentation-Summary.md)** - Doc overview
- **[Quick-Reference.md](guidelines/Quick-Reference.md)** - Fast lookup guide

## 🎨 Design System

**Color Palette**:
- Sage Green: `#7A9B70` (primary actions)
- Dark Sage: `#3A4A46` (text, borders, icons)
- Coral: `#E66E5A` (errors, warnings)
- Cream: `#FFF8F2` (background)
- Beige: `#FDD6A1` (highlights)

**Typography**: Nunito font family (loaded from Google Fonts)

**Clay-Style Elements**:
- Rounded corners (rounded-2xl, rounded-3xl)
- Thick borders (border-2)
- Soft shadows
- Active press states

## 🧪 Testing Locally

1. **Login Page**: Start here - enter any name/email
2. **Onboarding**: Select role and goals
3. **Dashboard**: See learning paths and progress
4. **Learning**: Click a chapter to start learning
5. **Questions**: Try all 6 question types
6. **Admin Panel**: Toggle `isAdmin: true` in App.tsx (line 30)
7. **Profile**: Upload avatar, view badges
8. **Leaderboard**: See rankings

### Test Admin Features

In `App.tsx`, set:
```tsx
isAdmin: true,  // Line 30
```

Then access Admin Panel from navigation.

## 🐛 Troubleshooting

### "Module not found" Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Vite Port Already in Use

```bash
# Use a different port
npm run dev -- --port 3000
```

### Tailwind Styles Not Loading

1. Ensure `@import 'tailwindcss'` is at the top of `styles/globals.css`
2. Restart the dev server: `npm run dev`

### Fonts Not Loading

Check that the Google Fonts link in `index.html` is accessible.

## 🔧 Configuration

### Change Port

Edit `vite.config.ts`:
```ts
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Add Environment Variables

Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```ts
const apiUrl = import.meta.env.VITE_API_URL
```

## 📦 Exporting for Other Developers

### Create a ZIP Package

```bash
# Exclude node_modules
zip -r church-academy.zip . -x "node_modules/*" -x "dist/*" -x ".git/*"
```

### Share on GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### NPM Package Script

To share as a template, others can:
```bash
npx degit <your-username>/church-academy my-church-academy
cd my-church-academy
npm install
npm run dev
```

## 🎓 Learning Path

**For New Developers**:
1. Read `guidelines/Quick-Reference.md` (10 min)
2. Read `guidelines/Clay-Style-Guide.md` (20 min)
3. Read `guidelines/Guidelines.md` (30 min)
4. Explore components in `/components`
5. Review `guidelines/Page-Documentation.md` as needed

## 🤝 Contributing

This is a prototype/reference implementation. To extend:

1. Add new question types in `LearningScenario.tsx`
2. Add new pages in `/components`
3. Update routing in `App.tsx`
4. Document changes in `/guidelines`
5. Follow clay-style design system

## 📄 License

This project is provided as-is for church leadership development purposes.

## 🙏 Credits

- **Design Inspiration**: Duolingo
- **Icons**: Lucide React
- **Components**: Shadcn UI
- **Images**: Unsplash
- **Fonts**: Google Fonts (Nunito)

## 📞 Support

For questions or issues:
1. Check the `/guidelines` documentation
2. Review `Quick-Reference.md` for common tasks
3. See `Page-Documentation.md` for component details

## 🚀 What's Next?

**Potential Enhancements**:
- Add Supabase for real data persistence
- Implement real authentication
- Add social features (share achievements)
- Mobile app version (React Native)
- Analytics dashboard
- Multi-language support
- Progress export/import

---

**Built with ❤️ for church leaders**

Start your leadership development journey today! 🎓✨
