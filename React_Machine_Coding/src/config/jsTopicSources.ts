import chunkQuestion from "@repo-js/chunk/question.md?raw";
import chunkSolution from "@repo-js/chunk/solution.js?raw";
import makeCounterQuestion from "@repo-js/makeCounter/question.md?raw";
import makeCounterSolution from "@repo-js/makeCounter/solution.js?raw";
import debounceQuestion from "@repo-js/debounce/question.md?raw";
import debounceSolution from "@repo-js/debounce/solution.js?raw";

export type JsSourceFile = {
  label: string;
  path: string;
  content: string;
  language?: string;
};

export type JsTopicContent = {
  question: string;
  files: JsSourceFile[];
};

/**
 * Map topic id → question markdown + solution files from JS/.
 * Add ?raw imports above when you create a new topic folder.
 */
export const JS_TOPIC_CONTENT: Record<string, JsTopicContent> = {
  chunk: {
    question: chunkQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/chunk/solution.js",
        content: chunkSolution,
      },
    ],
  },
  "make-counter": {
    question: makeCounterQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/makeCounter/solution.js",
        content: makeCounterSolution,
      },
    ],
  },
  debounce: {
    question: debounceQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/debounce/solution.js",
        content: debounceSolution,
      },
    ],
  },
};

export const getJsTopicContent = (topicId: string): JsTopicContent | null =>
  JS_TOPIC_CONTENT[topicId] ?? null;
