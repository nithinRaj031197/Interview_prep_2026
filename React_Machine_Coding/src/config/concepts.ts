export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "E",
  medium: "M",
  hard: "H",
};

export const DIFFICULTY_FULL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export type ConceptMeta = {
  id: string;
  label: string;
  icon: string;
};

export const CONCEPT_GROUPS: ConceptMeta[] = [
  { id: "closures", label: "Closures", icon: "🧩" },
  { id: "grid-canvas", label: "Grid / Canvas", icon: "🎨" },
  { id: "state", label: "State & Forms", icon: "📋" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "accessibility", label: "Accessibility", icon: "♿" },
  { id: "objects", label: "Objects & Recursion", icon: "🔗" },
];

export const getConceptMeta = (conceptId: string) =>
  CONCEPT_GROUPS.find((group) => group.id === conceptId) ?? {
    id: conceptId,
    label: conceptId,
    icon: "📁",
  };
