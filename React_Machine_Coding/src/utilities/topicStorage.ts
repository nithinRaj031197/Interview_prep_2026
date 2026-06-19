import {
  getTopicByKey,
  getTopicKey,
  type TopicTrack,
} from "../config/topicIndex";

const RECENT_KEY = "interview-prep:recent-topics";
const PINNED_KEY = "interview-prep:pinned-topics";
const MAX_RECENT = 5;

export type StoredTopicRef = {
  key: string;
  track: TopicTrack;
  id: string;
  title: string;
  path: string;
  visitedAt: number;
};

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const recordTopicVisit = (input: {
  track: TopicTrack;
  id: string;
  title: string;
  path: string;
}) => {
  const key = getTopicKey(input.track, input.id);
  const entry: StoredTopicRef = {
    key,
    track: input.track,
    id: input.id,
    title: input.title,
    path: input.path,
    visitedAt: Date.now(),
  };

  const recent = readJson<StoredTopicRef[]>(RECENT_KEY, []).filter(
    (item) => item.key !== key,
  );
  recent.unshift(entry);
  writeJson(RECENT_KEY, recent.slice(0, MAX_RECENT));
};

export const getRecentTopics = (): StoredTopicRef[] =>
  readJson<StoredTopicRef[]>(RECENT_KEY, [])
    .map((item) => {
      const topic = getTopicByKey(item.key);
      if (!topic || topic.status === "upcoming") return null;
      return {
        ...item,
        title: topic.title,
        path: topic.path,
      };
    })
    .filter((item): item is StoredTopicRef => item !== null);

export const getPinnedKeys = (): string[] =>
  readJson<string[]>(PINNED_KEY, []);

export const isTopicPinned = (track: TopicTrack, id: string) =>
  getPinnedKeys().includes(getTopicKey(track, id));

export const toggleTopicPinned = (track: TopicTrack, id: string) => {
  const key = getTopicKey(track, id);
  const pinned = getPinnedKeys();
  const next = pinned.includes(key)
    ? pinned.filter((item) => item !== key)
    : [...pinned, key];
  writeJson(PINNED_KEY, next);
  return next.includes(key);
};

export const getPinnedTopics = (): StoredTopicRef[] =>
  getPinnedKeys()
    .map((key) => {
      const topic = getTopicByKey(key);
      if (!topic || topic.status === "upcoming") return null;
      return {
        key,
        track: topic.track,
        id: topic.id,
        title: topic.title,
        path: topic.path,
        visitedAt: 0,
      };
    })
    .filter((item): item is StoredTopicRef => item !== null);

export const TOPIC_STORAGE_EVENT = "interview-prep:storage-update";

export const notifyTopicStorageUpdate = () => {
  window.dispatchEvent(new Event(TOPIC_STORAGE_EVENT));
};
