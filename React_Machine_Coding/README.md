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
    ├── selectiveCells/          # Drag-to-select grid
    └── pixelArtDrawing/         # Pixel art canvas with draw/erase
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

Follow these steps every time you start a new challenge. Example: **Pixel Art Drawing**.

### Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| Folder | camelCase | `pixelArtDrawing/` |
| Component file | PascalCase | `PixelArtDrawing.tsx` |
| Project `id` | kebab-case | `pixel-art-drawing` |
| Route `path` | kebab-case | `/projects/pixel-art-drawing` |

---

### Step 1 — Create the folder and files

```bash
mkdir -p src/projects/pixelArtDrawing/utilities
touch src/projects/pixelArtDrawing/PixelArtDrawing.tsx
touch src/projects/pixelArtDrawing/PixelArtDrawing.css
touch src/projects/pixelArtDrawing/utilities/constants.ts
```

Or copy the template:

```bash
cp -r src/projects/_template src/projects/pixelArtDrawing
# Rename ProjectName.tsx → PixelArtDrawing.tsx, ProjectName.css → PixelArtDrawing.css
```

Expected structure:

```
src/projects/pixelArtDrawing/
├── PixelArtDrawing.tsx      # Main component (your implementation)
├── PixelArtDrawing.css      # Styles scoped to this project
└── utilities/
    └── constants.ts         # Grid size, colors, mock data, helpers
```

---

### Step 2 — Register the component (`config/projects.ts`)

Add a lazy import:

```ts
export const PROJECT_COMPONENTS = {
  // ...
  "pixel-art-drawing": () =>
    import("../projects/pixelArtDrawing/PixelArtDrawing"),
};
```

Add metadata to the list:

```ts
{
  id: "pixel-art-drawing",
  title: "Pixel Art Drawing",
  description: "Paint on a pixel grid with color picker and eraser.",
  path: "/projects/pixel-art-drawing",
  status: "in-progress",   // "upcoming" | "in-progress" | "completed"
  tags: ["canvas", "grid", "mouse events", "state"],
},
```

> Set `status: "upcoming"` while scaffolding — switch to `"in-progress"` when the demo is ready to open from the home page.

---

### Step 3 — Register source files (`config/projectSources.ts`)

Add `?raw` imports at the top:

```ts
import pixelArtDrawingTsx from "../projects/pixelArtDrawing/PixelArtDrawing.tsx?raw";
import pixelArtDrawingCss from "../projects/pixelArtDrawing/PixelArtDrawing.css?raw";
import pixelArtDrawingConstants from "../projects/pixelArtDrawing/utilities/constants.ts?raw";
```

Register under `PROJECT_SOURCE_FILES`:

```ts
"pixel-art-drawing": [
  {
    label: "PixelArtDrawing.tsx",
    path: "projects/pixelArtDrawing/PixelArtDrawing.tsx",
    content: pixelArtDrawingTsx,
  },
  {
    label: "PixelArtDrawing.css",
    path: "projects/pixelArtDrawing/PixelArtDrawing.css",
    content: pixelArtDrawingCss,
  },
  {
    label: "constants.ts",
    path: "projects/pixelArtDrawing/utilities/constants.ts",
    content: pixelArtDrawingConstants,
  },
],
```

---

### Step 4 — Implement and verify

```bash
npm run dev
```

1. Open `http://localhost:5173` — project card should appear under **Available Projects**
2. Click **Pixel Art Drawing** → **Demo** tab shows your UI
3. Click **Code** tab → source files appear with syntax highlighting
4. Run `npm run build` before committing

---

### Checklist

- [ ] Folder created under `src/projects/<name>/`
- [ ] `PixelArtDrawing.tsx` + `.css` + `utilities/constants.ts` in place
- [ ] Entry added to `PROJECT_COMPONENTS`
- [ ] Entry added to `MACHINE_CODING_PROJECTS` with correct `id`, `path`, `status`
- [ ] Raw imports + entries added to `PROJECT_SOURCE_FILES`
- [ ] Demo works locally
- [ ] `npm run build` passes

---

### Quick reference (Todo List example)

<details>
<summary>Minimal registration snippet</summary>

```ts
// projects.ts
"todo-list": () => import("../projects/todoList/TodoList"),

{
  id: "todo-list",
  title: "Todo List",
  description: "Add, toggle, and delete todos.",
  path: "/projects/todo-list",
  status: "in-progress",
  tags: ["state", "forms"],
}
```

</details>

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
| `pixel-art-drawing` | `/projects/pixel-art-drawing` | In progress |

---

## Dependencies

- `react`, `react-dom` — UI
- `react-router-dom` — routing
- `react-syntax-highlighter` — code highlighting

Dev: Vite, TypeScript, ESLint.
