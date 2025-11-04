# ChurchAcademy Deployment Guide

Complete guide for deploying ChurchAcademy to various platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] All files from the project structure
- [ ] `package.json` with all dependencies
- [ ] `vite.config.ts` configuration file
- [ ] `index.html` entry point
- [ ] `main.tsx` React entry point
- [ ] `tsconfig.json` TypeScript configuration
- [ ] `/components` folder with all React components
- [ ] `/styles/globals.css` with Tailwind imports
- [ ] `/guidelines` folder with documentation
- [ ] Node.js 18+ installed (for local development)

---

## 🔥 Quick Deploy: Replit (5 Minutes)

**Best for**: Quick testing, sharing prototypes, collaborative editing

### Step-by-Step

1. **Create Replit Account**:
   - Go to https://replit.com
   - Sign up (free account works)

2. **Create New Repl**:
   - Click "Create Repl"
   - Select "Import from GitHub" OR "Blank Repl"
   - Choose "Vite + React" template (if available)
   - Name it: "church-academy"

3. **Upload Files**:
   - Drag and drop all project files into Replit
   - Maintain folder structure:
     ```
     / (root)
     ├── package.json
     ├── vite.config.ts
     ├── index.html
     ├── main.tsx
     ├── App.tsx
     ├── components/
     ├── styles/
     └── guidelines/
     ```

4. **Configure Run Command**:
   - Replit should auto-detect it's a Vite project
   - If not, set in `.replit` file: `run = "npm run dev"`

5. **Install Dependencies**:
   ```bash
   npm install
   ```
   - Replit may auto-install on first run
   - Watch the Console for progress

6. **Run the App**:
   ```bash
   npm run dev
   ```
   - Click the green "Run" button in Replit
   - Webview panel will open automatically
   - Access at: `https://<repl-name>.<username>.repl.co`

7. **Share Your Repl**:
   - Click "Invite" to collaborate
   - Click "Share" to get public link
   - Anyone can fork and remix

### Troubleshooting Replit

**Issue**: "Cannot find module"
- **Fix**: Run `npm install` again, restart Repl

**Issue**: Port not accessible
- **Fix**: Check Webview is enabled in Replit settings

**Issue**: Out of memory
- **Fix**: Upgrade to Replit Hacker plan, or optimize build

---

## 💻 Local Development Setup

**Best for**: Active development, full control

### Requirements
- Node.js 18+ ([Download](https://nodejs.org/))
- npm, yarn, or pnpm
- Code editor (VS Code recommended)

### Setup Steps

1. **Extract/Clone Project**:
   ```bash
   unzip church-academy.zip
   cd church-academy
   # OR
   git clone <repo-url>
   cd church-academy
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # Takes 1-2 minutes for all packages
   ```

3. **Start Dev Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   - Go to: http://localhost:5173
   - Hot reload enabled (saves auto-refresh)

5. **Build for Production**:
   ```bash
   npm run build
   # Creates /dist folder
   ```

6. **Preview Production Build**:
   ```bash
   npm run preview
   # Test production build locally
   ```

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**

---

## 🌐 Cloud Deployment Options

### 1. Vercel (Recommended for Production)

**Best for**: Production sites, automatic deployments, custom domains

**Pros**: Free tier, auto-builds, instant rollback, CDN
**Cons**: None significant

#### Deploy via Web

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repo
5. Vercel auto-detects Vite
6. Click "Deploy"
7. Done! Get URL like: `https://church-academy.vercel.app`

#### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd church-academy
vercel

# Follow prompts
# Project name: church-academy
# Framework: Vite
# Build command: npm run build
# Output directory: dist

# Production deploy
vercel --prod
```

#### Custom Domain

1. Go to Vercel dashboard
2. Select project → Settings → Domains
3. Add your domain: `churchacademy.org`
4. Update DNS records as instructed
5. SSL certificate auto-provisioned

---

### 2. Netlify

**Best for**: Static sites, form handling, serverless functions

#### Deploy via Web (Drag & Drop)

1. Go to https://netlify.com
2. Sign up
3. Drag `/dist` folder to "Deploy" area
4. Done! Get URL like: `https://church-academy.netlify.app`

#### Deploy via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Init project
netlify init

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Custom Domain

1. Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS
4. SSL auto-enabled

---

### 3. GitHub Pages

**Best for**: Open source projects, free hosting

#### Setup

1. **Install gh-pages**:
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**:
   ```ts
   export default defineConfig({
     base: '/church-academy/', // Your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repo → Settings → Pages
   - Source: gh-pages branch
   - URL: `https://<username>.github.io/church-academy/`

---

### 4. Render

**Best for**: Full-stack apps, databases, cron jobs

#### Deploy

1. Go to https://render.com
2. Sign up
3. New → Static Site
4. Connect GitHub repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Create Static Site"

URL: `https://church-academy.onrender.com`

---

### 5. Railway

**Best for**: Hobby projects, easy setup

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

URL: `https://church-academy.up.railway.app`

---

### 6. Firebase Hosting

**Best for**: Google ecosystem, Firebase features

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

URL: `https://church-academy.web.app`

---

## 🎯 Platform Comparison

| Platform | Free Tier | Build Time | Custom Domain | SSL | CDN | Best For |
|----------|-----------|------------|---------------|-----|-----|----------|
| **Vercel** | ✅ Yes | ~30s | ✅ Yes | ✅ Auto | ✅ Yes | Production |
| **Netlify** | ✅ Yes | ~40s | ✅ Yes | ✅ Auto | ✅ Yes | Production |
| **Replit** | ✅ Yes | Instant | ❌ No | ✅ Yes | ❌ No | Prototypes |
| **GitHub Pages** | ✅ Yes | ~1m | ✅ Yes | ✅ Auto | ❌ No | Open source |
| **Render** | ✅ Yes | ~2m | ✅ Yes | ✅ Auto | ✅ Yes | Full-stack |
| **Railway** | ⚠️ Trial | ~1m | ✅ Yes | ✅ Auto | ✅ Yes | Hobby |
| **Firebase** | ✅ Yes | ~45s | ✅ Yes | ✅ Auto | ✅ Yes | Google eco |

---

## 📦 Exporting for Handoff

### Create Complete Package

```bash
# Include all files except node_modules and dist
zip -r church-academy-v1.0.zip . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x "*.log"
```

### What to Include

**Essential Files**:
- ✅ `package.json` - Dependencies
- ✅ `vite.config.ts` - Build config
- ✅ `tsconfig.json` - TypeScript config
- ✅ `index.html` - Entry point
- ✅ `main.tsx` - React entry
- ✅ `App.tsx` - Main app
- ✅ `/components` - All components
- ✅ `/styles` - CSS files
- ✅ `README.md` - Setup instructions
- ✅ `DEPLOYMENT.md` - This file

**Documentation**:
- ✅ `/guidelines` - Complete docs (7 files)

**Don't Include**:
- ❌ `node_modules/` (too large)
- ❌ `dist/` (build output)
- ❌ `.git/` (version control)
- ❌ `package-lock.json` (auto-generated)
- ❌ `.env` (secrets)

---

## 🔐 Environment Variables

If you add backend features, use environment variables:

### Create `.env` file:

```env
# API Configuration (example)
VITE_API_URL=https://api.churchacademy.org
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_KEY=your-key-here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ADMIN=true
```

### Access in Code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

### Platform-Specific Setup:

**Vercel**:
- Dashboard → Settings → Environment Variables

**Netlify**:
- Site settings → Environment variables

**Render**:
- Dashboard → Environment → Environment Variables

---

## 🚀 Performance Optimization

### Before Deploying:

1. **Optimize Images**:
   - Use WebP format where possible
   - Compress images (80-85% quality)
   - Use appropriate sizes

2. **Code Splitting**:
   - Already handled by Vite
   - Lazy load heavy components if needed

3. **Remove Console Logs**:
   ```bash
   # Search for console.log
   grep -r "console.log" components/
   ```

4. **Run Production Build**:
   ```bash
   npm run build
   # Check dist/ size (should be < 2MB)
   ```

5. **Test Production Build Locally**:
   ```bash
   npm run preview
   ```

---

## 🧪 Testing Before Deploy

### Checklist:

- [ ] All pages load without errors
- [ ] Login/Onboarding flow works
- [ ] Learning scenario questions work
- [ ] Admin panel accessible (if `isAdmin: true`)
- [ ] Profile avatar upload works
- [ ] Leaderboard displays correctly
- [ ] Responsive on mobile (test at 375px)
- [ ] Responsive on tablet (test at 768px)
- [ ] Responsive on desktop (test at 1024px+)
- [ ] All buttons have clay-style
- [ ] All icons use correct colors
- [ ] Navigation works on all pages
- [ ] Logout flow works and shows LogoutScreen

### Browser Testing:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 🐛 Common Deployment Issues

### 1. "Cannot find module 'X'"

**Problem**: Missing dependency
**Solution**:
```bash
npm install X
# or check package.json for typos
```

### 2. Blank Page After Deploy

**Problem**: Base URL incorrect
**Solution**: Check `vite.config.ts`:
```ts
base: '/' // For root domain
base: '/church-academy/' // For subdirectory
```

### 3. 404 on Refresh

**Problem**: SPA routing not configured
**Solution**: Add to `public/_redirects` (Netlify):
```
/*    /index.html   200
```

Or in Vercel, add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### 4. Fonts Not Loading

**Problem**: Google Fonts blocked or slow
**Solution**: Fonts are already in `index.html`. Check network tab.

### 5. Images Not Loading

**Problem**: CORS or broken URLs
**Solution**: Check Unsplash URLs are valid. Use `ImageWithFallback`.

---

## 📊 Monitoring After Deploy

### Check These:

1. **Page Load Speed**:
   - Use Google PageSpeed Insights
   - Target: < 3 seconds

2. **Bundle Size**:
   - Check Vite build output
   - Target: < 500KB (gzipped)

3. **Error Tracking**:
   - Check browser console
   - Monitor for React errors

4. **Mobile Performance**:
   - Test on real devices
   - Use Chrome DevTools mobile emulation

---

## 🎓 Next Steps After Deployment

### For Production Use:

1. **Add Backend**:
   - Connect to Supabase for data persistence
   - Implement real authentication
   - Store user progress in database

2. **Add Analytics**:
   - Google Analytics
   - Plausible
   - PostHog

3. **Add Monitoring**:
   - Sentry for error tracking
   - Vercel Analytics

4. **Custom Domain**:
   - Purchase domain (e.g., churchacademy.org)
   - Configure DNS
   - Enable SSL

5. **SEO Optimization**:
   - Add meta tags
   - Create sitemap.xml
   - Add robots.txt

---

## 📞 Support & Resources

### Documentation:
- `/guidelines/Quick-Reference.md` - Fast lookup
- `/guidelines/Guidelines.md` - Dev guidelines
- `/guidelines/Page-Documentation.md` - Component details
- `README.md` - Project overview

### External Resources:
- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com
- Vercel Docs: https://vercel.com/docs

---

## ✅ Deployment Success Checklist

After deploying, confirm:

- [ ] Site loads at public URL
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Animations smooth
- [ ] Responsive design works
- [ ] Forms function correctly
- [ ] Navigation works
- [ ] Performance is good (< 3s load)
- [ ] No console errors
- [ ] Works on mobile devices
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Team can access admin panel (if enabled)

---

**You're ready to deploy ChurchAcademy! 🚀**

Choose your platform, follow the steps, and your leadership development platform will be live in minutes.

For questions, refer to the documentation in `/guidelines` or the platform-specific support docs.

**Happy deploying!** 🎉
