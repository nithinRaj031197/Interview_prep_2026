import selectiveCellsTsx from "../projects/selectiveCells/SelectiveCells.tsx?raw";
import selectiveCellsCss from "../projects/selectiveCells/SelectiveCells.css?raw";
import selectiveCellsConstants from "../projects/selectiveCells/utilities/constants.ts?raw";

export type ProjectSourceFile = {
  label: string;
  path: string;
  content: string;
  /** Override auto-detected language (tsx, typescript, css, json, etc.) */
  language?: string;
};

/**
 * Register source files to display on each project's "Code" tab.
 * Add ?raw imports above, then list them here when adding a new project.
 */
export const PROJECT_SOURCE_FILES: Record<string, ProjectSourceFile[]> = {
  "selective-cells": [
    {
      label: "SelectiveCells.tsx",
      path: "projects/selectiveCells/SelectiveCells.tsx",
      content: selectiveCellsTsx,
    },
    {
      label: "SelectiveCells.css",
      path: "projects/selectiveCells/SelectiveCells.css",
      content: selectiveCellsCss,
    },
    {
      label: "constants.ts",
      path: "projects/selectiveCells/utilities/constants.ts",
      content: selectiveCellsConstants,
    },
  ],
};

export const getProjectSourceFiles = (projectId: string) =>
  PROJECT_SOURCE_FILES[projectId] ?? [];
