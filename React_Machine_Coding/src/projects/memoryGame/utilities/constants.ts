export type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export const EMOJIS = [
  "🐵",
  "🐶",
  "🦊",
  "🐱",
  "🦁",
  "🐯",
  "🐴",
  "🦄",
  "🦓",
  "🦌",
  "🐮",
  "🐷",
  "🐭",
  "🐹",
  "🐻",
  "🐨",
  "🐼",
  "🐽",
  "🐸",
  "🐰",
] as const;

export const DEFAULT_PAIR_COUNT = 8;
export const MIN_PAIR_COUNT = 2;
export const PAIR_COUNT_STEP = 2;
export const MAX_PAIR_COUNT = EMOJIS.length;

export const MATCH_DELAY_MS = 500;
export const MISMATCH_DELAY_MS = 800;

export function clampPairCount(count: number): number {
  let safe = Math.min(MAX_PAIR_COUNT, Math.max(MIN_PAIR_COUNT, count));

  if (safe % PAIR_COUNT_STEP !== 0) {
    safe -= 1;
    if (safe < MIN_PAIR_COUNT) {
      safe = MIN_PAIR_COUNT;
    }
  }

  return safe;
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function generateBoard(pairCount = DEFAULT_PAIR_COUNT): Card[] {
  const safeCount = clampPairCount(pairCount);
  const picked = shuffle([...EMOJIS]).slice(0, safeCount);
  const duplicate = [...picked, ...picked];

  return shuffle(
    duplicate.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    })),
  );
}
