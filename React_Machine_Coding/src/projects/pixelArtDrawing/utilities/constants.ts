export const GRID_SIZE = 15;
export const CELL_SIZE = 20;

export const CHECKER_LIGHT = "#ffffff";
export const CHECKER_DARK = "#e9ecef";

export const COLOR_ARRAY = [
  "#ffffff",
  "#e9ecef",
  "#000",
  "#cc0001",
  "#fb940b",
  "#ffff01",
  "#01cc00",
  "#38d9a9",
  "#228be6",
  "#7950f2",
  "#ff8787",
] as const;

export const COLOR_LABELS: Record<(typeof COLOR_ARRAY)[number], string> = {
  "#ffffff": "White",
  "#e9ecef": "Gray",
  "#000": "Black",
  "#cc0001": "Red",
  "#fb940b": "Orange",
  "#ffff01": "Yellow",
  "#01cc00": "Green",
  "#38d9a9": "Teal",
  "#228be6": "Blue",
  "#7950f2": "Purple",
  "#ff8787": "Beige",
};

export const getCheckerColor = (row: number, col: number) =>
  (row + col) % 2 === 0 ? CHECKER_LIGHT : CHECKER_DARK;

export const getColorPickerBorder = (
  color: string,
  isSelected: boolean,
): string => {
  if (!isSelected) return "2px solid transparent";
  if (color === "#ffffff") return "2px solid #adb5bd";
  if (color === "#000") return "2px solid #ffffff";
  return "2px solid #000";
};
