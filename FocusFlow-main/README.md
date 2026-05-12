# ⚡ FocusFlow

A productivity task manager built with **React** and **Tailwind CSS**. Combines task management with a built-in Pomodoro focus timer, priority sorting, deadline tracking, and a gamification system.

> Built as a personal project to learn React component architecture, custom hooks, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## ✨ Features

- ⚡ **Focus Mode** - 25-minute Pomodoro timer; other tasks dim while you focus
- 🔴 **Priority System** - High / Medium / Low with color-coded sorting
- 📅 **Deadline Tracking** - overdue tasks automatically highlight in red
- 📊 **Progress Bar** - see daily completion at a glance
- 🎮 **MiniGame** - earn +10 points per task and level up
- 🔍 **Filter Bar** - All / Active / Done / Overdue views
- 💾 **Persistent Storage** - saved to localStorage, survives page refresh
- 🌙 **Dark Mode** - toggle button in the header

---

## 🛠️ Tech Used

| Tool | Purpose |
|---|---|
| React 18 | UI components and state |
| Tailwind CSS 3 | Utility-first styling |
| Vite | Dev server and build tool |
| Tabler Icons | Icon font |
| localStorage | Client-side data persistence |

---

## 🚀 How to Start

### Requirements
- Node.js v18 or higher — [download here](https://nodejs.org)

### Run locally

```bash
# 1. Clone the repo
git clone https://github.com/KaiPham27/focusflow.git
cd focusflow-main

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes into the `dist/` folder — ready to deploy anywhere.

---

## 🌐 Deployment

### Netlify (easiest)
1. Run `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist/` folder
4. Live instantly ✅

### Vercel
```bash
npm install -g vercel
vercel
```

---
