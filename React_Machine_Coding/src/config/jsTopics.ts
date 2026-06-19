import type { ProjectStatus } from "./projects";

export type JsTopic = {
  id: string;
  title: string;
  description: string;
  path: string;
  status: ProjectStatus;
  tags: string[];
};

/**
 * Register JS practice topics here.
 * Source files live in the repo-root JS/ folder (see jsTopicSources.ts).
 */
export const JS_TOPICS: JsTopic[] = [
  {
    id: "make-counter",
    title: "Make Counter",
    description: "Return a function that increments and returns a counter on each call.",
    path: "/js/make-counter",
    status: "in-progress",
    tags: ["closures", "higher-order functions"],
  },
  {
    id: "debounce",
    title: "Debounce",
    description: "Delay a function until after a wait period with no new calls.",
    path: "/js/debounce",
    status: "in-progress",
    tags: ["closures", "timers", "utilities"],
  },
  {
    id: "throttle",
    title: "Throttle",
    description: "Limit how often a function can run over time.",
    path: "/js/throttle",
    status: "upcoming",
    tags: ["closures", "timers", "utilities"],
  },
  {
    id: "deep-clone",
    title: "Deep Clone",
    description: "Recursively clone nested objects and arrays.",
    path: "/js/deep-clone",
    status: "upcoming",
    tags: ["recursion", "objects"],
  },
];

export const getJsTopicById = (id: string) =>
  JS_TOPICS.find((topic) => topic.id === id);

export const getAvailableJsTopics = () =>
  JS_TOPICS.filter((topic) => topic.status !== "upcoming");

export const getUpcomingJsTopics = () =>
  JS_TOPICS.filter((topic) => topic.status === "upcoming");
