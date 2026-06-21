# Interview Prep 2026

A personal frontend interview preparation workspace — organized, runnable, and built to grow over time. The centerpiece is an interactive **React Machine Coding Hub**: a single app where you can browse challenges, run live demos, and read the exact source code behind each solution.

> Built for practice, structured like a product. Every machine coding round gets its own isolated module, lazy-loaded route, and syntax-highlighted code viewer.

---

## Why this repo exists

Frontend machine coding rounds test how you **build UI under pressure** — state, events, accessibility, and clean component design. This repo turns that practice into a repeatable system:

- **One hub, many challenges** — no scattered sandboxes or lost snippets
- **Demo + Code in one place** — interviewers (and future you) can see both behavior and implementation
- **Opinionated structure** — copy a template, register the project, ship

---

## Highlights

| Feature | Description |
|--------|-------------|
| **Project hub** | Home page with cards for available and upcoming machine coding rounds |
| **Live demos** | Interactive UI for each challenge (drag selection, forms, lists, etc.) |
| **Code viewer** | Prism-powered syntax highlighting with line numbers, file tabs, and copy |
| **Lazy-loaded routes** | Each project loads on demand — keeps the app fast as you add more |
| **Project registry** | Central config for metadata, routes, and source file mapping |
| **Scaffold template** | `_template/` folder to bootstrap new challenges in minutes |

---

## Tech stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

- **React 19** + **TypeScript** — type-safe components
- **Vite 8** — fast dev server and builds
- **React Router 7** — client-side routing between projects
- **react-syntax-highlighter** — multi-language code highlighting (TSX, CSS, JSON, …)

---

## Repository structure

```
Interview Prep/
├── frontend-system-design/       # FE system design curriculum (markdown, 17 topics + 2-month plan)
│   ├── LEARNING_PATH.md          # Week-by-week FE → Architect schedule
│   ├── case-studies/             # E-commerce, social feed, mock interviews
│   └── …                         # rendering, state, observability, deployment, etc.
├── JS/                           # JavaScript questions + solutions (see JS/README.md)
│   ├── _template/
│   └── debounce/
├── React_Machine_Coding/         # Unified practice hub (Vite app)
│   └── src/
│       ├── projects/             # React MC live demos
│       └── config/
│           ├── jsTopics.ts       # JS topic registry
│           └── jsTopicSources.ts # Links to ../JS via Vite alias
└── react/                        # Additional React notes (planned)
```

---

## Machine coding challenges

| Project | Status | Topics |
|---------|--------|--------|
| **Selective Cells** | In progress | Drag selection, grid, mouse events |
| **Pixel Art Drawing** | In progress | Draw/erase modes, color picker, canvas |
| **Memory Game** | Completed | Card flip, pair matching, configurable grid |
| **Debounce** (JS) | In progress | Closures, timers, utilities |
| Todo List | Upcoming | State, forms, lists |
| Autocomplete | Upcoming | Debounce, keyboard, API |
| Infinite Scroll | Upcoming | Pagination, Intersection Observer |
| Modal Dialog | Upcoming | Accessibility, focus trap, portal |

---

## Quick start

```bash
cd React_Machine_Coding
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — pick a project from the home page, switch between **Demo** and **Code** tabs.

### Other scripts

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## Adding a new challenge

1. Copy `src/projects/_template/` → `src/projects/yourProject/`
2. Register the lazy component in `src/config/projects.ts`
3. Add project metadata (title, path, tags, status)
4. Register source files in `src/config/projectSources.ts` for the Code tab
5. Set `status` to `"in-progress"` when ready to appear on the home page

See [React_Machine_Coding/README.md](./React_Machine_Coding/README.md) for the full walkthrough.

---

## Roadmap

- [ ] Deploy hub to GitHub Pages / Vercel
- [ ] Complete Selective Cells implementation
- [ ] Add Todo List, Autocomplete, Infinite Scroll, Modal Dialog
- [ ] JavaScript DSA and React theory sections under `JS/` and `react/`
- [ ] Optional: unit tests per machine coding project

---

## Author

**Nithin Raj** — [GitHub @nithinRaj031197](https://github.com/nithinRaj031197)

If this repo helps your interview prep, consider giving it a star.
