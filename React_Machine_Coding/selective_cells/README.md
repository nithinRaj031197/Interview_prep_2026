# React Machine Coding Hub

Interactive practice app for frontend machine coding interviews. Browse challenges from a central home page, run live demos, and inspect syntax-highlighted source — all in one Vite + React workspace.

---

## App overview

```
Home (/)  ──►  Project page (/projects/:slug)
                    ├── Demo tab   → live interactive UI
                    └── Code tab   → highlighted source files
```

Each challenge is a self-contained module under `src/projects/`. The hub handles routing, layout, and code display — you focus on the component logic.

---

## Architecture

```
src/
├── App.tsx                      # Router: home + lazy project routes
├── config/
│   ├── projects.ts              # Registry: metadata, routes, lazy imports
│   └── projectSources.ts        # Raw source files for the Code tab
├── pages/Home/                  # Landing page with project cards
├── components/
│   ├── ProjectLayout/           # Back nav, Demo | Code tabs
│   └── CodeViewer/              # Syntax highlighting, file tabs, copy
└── projects/
    ├── _template/               # Scaffold for new challenges
    └── selectiveCells/          # Example: drag-to-select grid
        ├── SelectiveCells.tsx
        ├── SelectiveCells.css
        └── utilities/constants.ts
```

### Design decisions

- **Lazy loading** — projects are code-split via `React.lazy()` so the bundle stays small
- **Central registry** — `projects.ts` is the single source of truth for what's live vs upcoming
- **Raw source imports** — Vite `?raw` imports keep the Code tab in sync with actual files
- **Language auto-detection** — file extension maps to Prism language (tsx, css, json, …)

---

## Getting started

```bash
npm install
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:5173` |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Add a new machine coding project

### 1. Scaffold the folder

```bash
cp -r src/projects/_template src/projects/todoList
# Rename ProjectName.tsx → TodoList.tsx, update CSS imports
```

### 2. Register the component (`config/projects.ts`)

```ts
export const PROJECT_COMPONENTS = {
  // ...
  "todo-list": () => import("../projects/todoList/TodoList"),
};

export const MACHINE_CODING_PROJECTS = [
  {
    id: "todo-list",
    title: "Todo List",
    description: "Add, toggle, and delete todos.",
    path: "/projects/todo-list",
    status: "in-progress",   // "upcoming" | "in-progress" | "completed"
    tags: ["state", "forms"],
  },
];
```

### 3. Register source files (`config/projectSources.ts`)

```ts
import todoListTsx from "../projects/todoList/TodoList.tsx?raw";

export const PROJECT_SOURCE_FILES = {
  "todo-list": [
    {
      label: "TodoList.tsx",
      path: "projects/todoList/TodoList.tsx",
      content: todoListTsx,
    },
  ],
};
```

The project appears on the home page once `status` is not `"upcoming"` and a component is registered.

---

## Code viewer

The Code tab uses **Prism** (via `react-syntax-highlighter`) with the One Dark theme.

Supported languages (auto-detected from extension): `tsx`, `typescript`, `jsx`, `javascript`, `css`, `scss`, `json`, `html`, `markdown`, `python`, `yaml`, `bash`.

Override detection per file:

```ts
{ label: "utils.ts", path: "...", content: raw, language: "typescript" }
```

---

## Current projects

| ID | Route | Status |
|----|-------|--------|
| `selective-cells` | `/projects/selective-cells` | In progress |

---

## Dependencies

- `react`, `react-dom` — UI
- `react-router-dom` — routing
- `react-syntax-highlighter` — code highlighting

Dev: Vite, TypeScript, ESLint.
