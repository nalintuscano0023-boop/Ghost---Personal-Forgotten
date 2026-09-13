# Ghost — Personal Forgotten-Things Intelligence System

> “Reminders tell you what to remember. Ghost tells you what you forgot.”

Ghost is a frontend-only personal intelligence system for finding the loose ends that are quietly consuming attention. It identifies unfinished, inactive, overdue, forgotten, or at-risk items and helps determine the smallest useful next action.

## The Problem Ghost Solves

Traditional reminder and to-do applications depend on the user already knowing what needs attention. They store tasks and notify people about dates, but they rarely surface the things that have silently gone inactive, become risky, or are blocking something else.

Ghost is designed as a personal radar rather than another task list. It evaluates inactivity, deadlines, importance, dependencies, consequences, and local history to highlight what may have been forgotten and why it matters. The goal is to reduce mental effort: understand the signal, choose a practical next action, and close the loose end quickly.

## Key Features

- **Ghost Sweep** — Run a cinematic local scan across stored items and surface the highest-risk Ghosts.
- **Explainable deterministic risk scoring** — Transparent TypeScript rules evaluate inactivity, deadlines, importance, dependencies, and related risk signals without random or opaque scores.
- **Quick Wins** — Find low-effort actions that can create immediate relief.
- **Dependency Radar** — See which unfinished items affect or block other items.
- **Pattern Detection** — Identify constructive patterns in locally stored activity and history.
- **Ghost Graveyard and restore** — Intentionally abandon items, record the reason, and restore them later if priorities change.
- **Snooze** — Temporarily defer an item until a selected future date.
- **CRUD item management** — Add, edit, complete, snooze, abandon, and restore personal items.
- **LocalStorage persistence** — Keep Ghost data in the current browser with corruption-safe loading and legacy-data compatibility.
- **Dark/light mode** — Switch between persisted visual themes without changing the local-first architecture.
- **Responsive design** — Use Ghost across desktop, tablet, and mobile layouts with touch-friendly navigation and reduced-motion support.

## How It Works

```text
Add items
   ↓
Local analysis
   ↓
Risk evaluation
   ↓
Ghost detection
   ↓
Recommended next action
```

You add an unfinished project, application, appointment, purchase, course, commitment, or any other item worth tracking. Ghost analyzes it in the browser, evaluates its risk using deterministic rules, identifies why it may need attention, and recommends the next smallest useful action.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- HTML/CSS
- LocalStorage
- Deterministic TypeScript logic

## Frontend-Only Architecture

Ghost runs entirely in the browser. It does **not** use:

- A backend server
- A database
- Firebase
- Supabase
- External AI APIs
- External authentication services

There are no server-side processes or cloud data services required for the application.

## Privacy

User data is stored locally in the browser using `LocalStorage`. Ghost does not send item data to a backend or external service. The application does not require passwords, payment details, authentication secrets, or private keys.

## Built with GitHub Copilot

Ghost was created as part of GitHub Copilot Day using the GitHub Copilot app for AI-assisted development.

GitHub Copilot was used during development to help turn the Ghost concept and specification into a working frontend application. The resulting application uses deterministic local logic rather than an external AI model.



## Project Structure

```text
.
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── src/
│   ├── App.tsx
│   ├── data.ts
│   ├── engine.ts
│   ├── main.tsx
│   ├── storage.ts
│   ├── styles.css
│   ├── types.ts
│   ├── vite-env.d.ts
│   └── engine/
│       ├── nextBestActionEngine.ts
│       └── timeBudgetEngine.ts
└── README.md
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Project Vision

> “Don't just remind people what they planned to do. Help them discover what they may have forgotten.”

Ghost is intended to make unfinished work visible without turning personal life into an endless task queue. It focuses attention on the few things most likely to become costly, stressful, or difficult to recover from if they remain ignored.

## License

This project is available for educational and demonstration purposes.

---

<div align="center">

### 👻 Ghost

**Developed by Nalin Tuscano**

</div>
