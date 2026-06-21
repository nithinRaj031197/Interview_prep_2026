import type { ProjectStatus } from "./projects";
import type { Difficulty } from "./concepts";

export type JsTopic = {
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
 * Register JS practice topics here.
 * Source files live in the repo-root JS/ folder (see jsTopicSources.ts).
 */
export const JS_TOPICS: JsTopic[] = [
  {
    id: "chunk",
    title: "Chunk",
    description: "Split an array into groups of a given size.",
    path: "/js/chunk",
    status: "completed",
    concept: "arrays",
    difficulty: "easy",
    tags: ["arrays", "loops"],
  },
  {
    id: "drop-right-while",
    title: "Drop Right While",
    description:
      "Slice an array by dropping trailing elements while a predicate is true.",
    path: "/js/drop-right-while",
    status: "completed",
    concept: "arrays",
    difficulty: "easy",
    tags: ["arrays", "loops", "predicates"],
  },
    {
    id: "drop-while",
    title: "Drop While",
    description:
      "Slice an array by dropping leading elements while a predicate is true.",
    path: "/js/drop-while",
    status: "completed",
    concept: "arrays",
    difficulty: "easy",
    tags: ["arrays", "loops", "predicates"],
  },
    {
    id: "fill",
    title: "Fill",
    description:
      "Mutate an array by filling a range with a value, with index normalization.",
    path: "/js/fill",
    status: "completed",
    concept: "arrays",
    difficulty: "easy",
    tags: ["arrays", "loops", "mutation"],
  },
    {
    id: "find-index",
    title: "Find Index",
    description:
      "Return the index of the first element matching a predicate from a start index.",
    path: "/js/find-index",
    status: "completed",
    concept: "arrays",
    difficulty: "easy",
    tags: ["arrays", "loops", "predicates"],
  },
    {
    id: "make-counter",
    title: "Make Counter",
    description: "Return a function that increments and returns a counter on each call.",
    path: "/js/make-counter",
    status: "in-progress",
    concept: "closures",
    difficulty: "easy",
    tags: ["closures", "higher-order functions"],
  },
  {
    id: "debounce",
    title: "Debounce",
    description: "Delay a function until after a wait period with no new calls.",
    path: "/js/debounce",
    status: "in-progress",
    concept: "closures",
    difficulty: "medium",
    tags: ["closures", "timers", "utilities"],
  },
  {
    id: "throttle",
    title: "Throttle",
    description: "Limit how often a function can run over time.",
    path: "/js/throttle",
    status: "upcoming",
    concept: "closures",
    difficulty: "hard",
    tags: ["closures", "timers", "utilities"],
  },
  {
    id: "deep-clone",
    title: "Deep Clone",
    description: "Recursively clone nested objects and arrays.",
    path: "/js/deep-clone",
    status: "upcoming",
    concept: "objects",
    difficulty: "hard",
    tags: ["recursion", "objects"],
  },
];

export const getJsTopicById = (id: string) =>
  JS_TOPICS.find((topic) => topic.id === id);

export const getAvailableJsTopics = () =>
  JS_TOPICS.filter((topic) => topic.status !== "upcoming");

export const getUpcomingJsTopics = () =>
  JS_TOPICS.filter((topic) => topic.status === "upcoming");
