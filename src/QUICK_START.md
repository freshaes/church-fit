# ChurchAcademy - 5 Minute Quick Start

Get ChurchAcademy running in 5 minutes or less!

---

## 🚀 Option 1: Replit (Fastest - 2 Minutes)

1. Go to [replit.com](https://replit.com)
2. Create account (free)
3. Click "Create Repl" → "Import from GitHub" or drag files
4. Wait for auto-install
5. Click "Run"
6. ✅ Done! App opens in Webview

---

## 💻 Option 2: Local Machine (5 Minutes)

### Prerequisites
- Node.js 18+ installed ([Download](https://nodejs.org/))

### Commands
```bash
# 1. Extract/clone project
unzip church-academy.zip
cd church-academy

# 2. Install dependencies (1-2 min)
npm install

# 3. Start dev server
npm run dev

# 4. Open browser
# Go to: http://localhost:5173
```

✅ Done!

---

## 🌐 Option 3: Deploy to Vercel (3 Minutes)

```bash
# 1. Install Vercel
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# Framework: Vite
# Build: npm run build
# Output: dist
```

✅ Live at `https://your-project.vercel.app`

---

## 📱 Test the App

After running:

1. **Login Page** appears - Enter any name/email
2. **Onboarding** - Select "Youth Minister" + 2 goals
3. **Dashboard** - Click first chapter
4. **Learning** - Try different question types
5. **Results** - See your score and stats

---

## 🛠️ Enable Admin Panel

In `App.tsx`, line 30:
```tsx
isAdmin: true,  // Change this
```

Then access "Admin Panel" from navigation.

---

## 📚 Need More Help?

- **Full Setup**: See [README.md](README.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Documentation**: See `/guidelines` folder

---

## 🐛 Troubleshooting

**"Command not found: npm"**
→ Install Node.js from https://nodejs.org/

**"Port already in use"**
→ Run: `npm run dev -- --port 3000`

**"Module not found"**
→ Run: `npm install` again

---

**That's it! You're ready to go!** 🎉

For questions, see the full [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md).
