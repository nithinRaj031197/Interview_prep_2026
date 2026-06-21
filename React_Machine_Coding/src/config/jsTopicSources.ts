import chunkQuestion from "@repo-js/chunk/question.md?raw";
import chunkSolution from "@repo-js/chunk/solution.js?raw";
import dropRightWhileQuestion from "@repo-js/dropRightWhile/question.md?raw";
import dropRightWhileSolution from "@repo-js/dropRightWhile/solution.js?raw";
import dropWhileQuestion from "@repo-js/dropWhile/question.md?raw";
import dropWhileSolution from "@repo-js/dropWhile/solution.js?raw";
import fillQuestion from "@repo-js/fill/question.md?raw";
import fillSolution from "@repo-js/fill/solution.js?raw";
import findIndexQuestion from "@repo-js/findIndex/question.md?raw";
import findIndexSolution from "@repo-js/findIndex/solution.js?raw";
import findLastIndexQuestion from "@repo-js/findLastIndex/question.md?raw";
import findLastIndexSolution from "@repo-js/findLastIndex/solution.js?raw";
import makeCounterQuestion from "@repo-js/makeCounter/question.md?raw";
import makeCounterSolution from "@repo-js/makeCounter/solution.js?raw";
import debounceQuestion from "@repo-js/debounce/question.md?raw";
import debounceSolution from "@repo-js/debounce/solution.js?raw";
import myCallQuestion from "@repo-js/myCall/question.md?raw";
import myCallSolution from "@repo-js/myCall/solution.js?raw";
import myApplyQuestion from "@repo-js/myApply/question.md?raw";
import myApplySolution from "@repo-js/myApply/solution.js?raw";

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
  "drop-right-while": {
    question: dropRightWhileQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/dropRightWhile/solution.js",
        content: dropRightWhileSolution,
      },
    ],
  },
  "drop-while": {
    question: dropWhileQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/dropWhile/solution.js",
        content: dropWhileSolution,
      },
    ],
  },
  fill: {
    question: fillQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/fill/solution.js",
        content: fillSolution,
      },
    ],
  },
  "find-index": {
    question: findIndexQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/findIndex/solution.js",
        content: findIndexSolution,
      },
    ],
  },
  "find-last-index": {
    question: findLastIndexQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/findLastIndex/solution.js",
        content: findLastIndexSolution,
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
  "my-call": {
    question: myCallQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/myCall/solution.js",
        content: myCallSolution,
      },
    ],
  },
  "my-apply": {
    question: myApplyQuestion,
    files: [
      {
        label: "solution.js",
        path: "JS/myApply/solution.js",
        content: myApplySolution,
      },
    ],
  },
};

export const getJsTopicContent = (topicId: string): JsTopicContent | null =>
  JS_TOPIC_CONTENT[topicId] ?? null;
