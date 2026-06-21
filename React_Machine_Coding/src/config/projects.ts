import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { Difficulty } from "./concepts";

export type ProjectStatus = "completed" | "in-progress" | "upcoming";

export type MachineCodingProject = {
  id: string;
  title: string;
  description: string;
  path: string;
  status: ProjectStatus;
  concept: string;
  difficulty: Difficulty;
  tags: string[];
};

/**
 * Central registry for all machine coding projects.
 * To add a new project:
 * 1. Create a folder under src/projects/<projectName>/
 * 2. Add a lazy import entry in PROJECT_COMPONENTS below
 * 3. Register metadata in MACHINE_CODING_PROJECTS
 * 4. Register source files in config/projectSources.ts (for the Code tab)
 */
export const PROJECT_COMPONENTS: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "selective-cells": () =>
    import("../projects/selectiveCells/SelectiveCells"),
  "pixel-art-drawing": () =>
    import("../projects/pixelArtDrawing/PixelArtDrawing"),
  "memory-game": () => import("../projects/memoryGame/MemoryGame"),
};

export const MACHINE_CODING_PROJECTS: MachineCodingProject[] = [
  {
    id: "selective-cells",
    title: "Selective Cells",
    description: "Drag to select a rectangular region of grid cells.",
    path: "/projects/selective-cells",
    status: "in-progress",
    concept: "grid-canvas",
    difficulty: "medium",
    tags: ["drag", "grid", "mouse events"],
  },
  {
    id: "pixel-art-drawing",
    title: "Pixel Art Drawing",
    description: "Paint on a pixel grid with color picker and eraser.",
    path: "/projects/pixel-art-drawing",
    status: "in-progress",
    concept: "grid-canvas",
    difficulty: "hard",
    tags: ["canvas", "grid", "mouse events", "state"],
  },
  {
    id: "memory-game",
    title: "Memory Game",
    description: "Flip cards and match emoji pairs before the board clears.",
    path: "/projects/memory-game",
    status: "completed",
    concept: "state",
    difficulty: "medium",
    tags: ["state", "grid", "game logic", "timers"],
  },
  {
    id: "todo-list",
    title: "Todo List",
    description: "Add, toggle, and delete todos with local state.",
    path: "/projects/todo-list",
    status: "upcoming",
    concept: "state",
    difficulty: "easy",
    tags: ["state", "forms", "lists"],
  },
  {
    id: "autocomplete",
    title: "Autocomplete",
    description: "Search input with debounced suggestions dropdown.",
    path: "/projects/autocomplete",
    status: "upcoming",
    concept: "state",
    difficulty: "medium",
    tags: ["debounce", "keyboard", "api"],
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    description: "Paginated list that loads more items on scroll.",
    path: "/projects/infinite-scroll",
    status: "upcoming",
    concept: "performance",
    difficulty: "medium",
    tags: ["pagination", "intersection observer"],
  },
  {
    id: "modal-dialog",
    title: "Modal Dialog",
    description: "Accessible modal with focus trap and escape to close.",
    path: "/projects/modal-dialog",
    status: "upcoming",
    concept: "accessibility",
    difficulty: "hard",
    tags: ["accessibility", "portal", "focus"],
  },
];

export const LAZY_PROJECT_COMPONENTS = Object.fromEntries(
  Object.entries(PROJECT_COMPONENTS).map(([id, loader]) => [id, lazy(loader)]),
) as Record<string, LazyExoticComponent<ComponentType>>;

export const getLazyProjectComponent = (
  id: string,
): LazyExoticComponent<ComponentType> | null =>
  LAZY_PROJECT_COMPONENTS[id] ?? null;

export const getAvailableProjects = () =>
  MACHINE_CODING_PROJECTS.filter(
    (project) =>
      project.status !== "upcoming" && PROJECT_COMPONENTS[project.id],
  );

export const getUpcomingProjects = () =>
  MACHINE_CODING_PROJECTS.filter((project) => project.status === "upcoming");
