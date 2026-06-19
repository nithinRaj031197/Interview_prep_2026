import selectiveCellsTsx from "../projects/selectiveCells/SelectiveCells.tsx?raw";
import selectiveCellsCss from "../projects/selectiveCells/SelectiveCells.css?raw";
import selectiveCellsConstants from "../projects/selectiveCells/utilities/constants.ts?raw";
import pixelArtDrawingTsx from "../projects/pixelArtDrawing/PixelArtDrawing.tsx?raw";
import pixelArtDrawingCss from "../projects/pixelArtDrawing/PixelArtDrawing.css?raw";
import pixelArtDrawingConstants from "../projects/pixelArtDrawing/utilities/constants.ts?raw";

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
};

export const getProjectSourceFiles = (projectId: string) =>
  PROJECT_SOURCE_FILES[projectId] ?? [];
