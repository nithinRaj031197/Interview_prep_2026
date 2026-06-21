import { JS_TOPICS } from "./jsTopics";
import { SYSTEM_DESIGN_TOPICS } from "./systemDesignTopics";
import {
  CONCEPT_GROUPS,
  DIFFICULTY_ORDER,
  getConceptMeta,
  type Difficulty,
} from "./concepts";
import {
  MACHINE_CODING_PROJECTS,
  type ProjectStatus,
} from "./projects";

export type TopicTrack = "react" | "js" | "system-design";

export type TopicEntry = {
  id: string;
  title: string;
  description: string;
  path: string;
  status: ProjectStatus;
  concept: string;
  difficulty: Difficulty;
  tags: string[];
  track: TopicTrack;
  sortOrder?: number;
};

export type ConceptGroup = {
  id: string;
  label: string;
  icon: string;
  topics: TopicEntry[];
  completed: number;
  total: number;
};

const isDashboardTopic = (topic: TopicEntry) => topic.track !== "system-design";

export const getTopicKey = (track: TopicTrack, id: string) => `${track}:${id}`;

export const ALL_TOPICS: TopicEntry[] = [
  ...MACHINE_CODING_PROJECTS.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    path: project.path,
    status: project.status,
    concept: project.concept,
    difficulty: project.difficulty,
    tags: project.tags,
    track: "react" as const,
  })),
  ...JS_TOPICS.map((topic) => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    path: topic.path,
    status: topic.status,
    concept: topic.concept,
    difficulty: topic.difficulty,
    tags: topic.tags,
    track: "js" as const,
  })),
  ...SYSTEM_DESIGN_TOPICS.map((topic) => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    path: topic.path,
    status: topic.status,
    concept: "system-design",
    difficulty: topic.difficulty,
    tags: topic.tags,
    track: "system-design" as const,
    sortOrder: topic.sortOrder,
  })),
];

export const getSearchableTopics = () =>
  ALL_TOPICS.filter(
    (topic) => topic.status !== "upcoming" && isDashboardTopic(topic),
  );

export const getTopicByKey = (key: string) => {
  const [track, ...idParts] = key.split(":");
  const id = idParts.join(":");
  return ALL_TOPICS.find(
    (topic) => topic.track === track && topic.id === id,
  );
};

export const searchTopics = (query: string): TopicEntry[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getSearchableTopics().filter(
    (topic) =>
      topic.title.toLowerCase().includes(normalized) ||
      topic.description.toLowerCase().includes(normalized) ||
      topic.concept.toLowerCase().includes(normalized) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );
};

const sortTopics = (topics: TopicEntry[]) =>
  [...topics].sort((a, b) => {
    const orderA = a.sortOrder ?? 1000 + DIFFICULTY_ORDER[a.difficulty];
    const orderB = b.sortOrder ?? 1000 + DIFFICULTY_ORDER[b.difficulty];
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });

export const getConceptDashboard = (): ConceptGroup[] => {
  const dashboardTopics = ALL_TOPICS.filter(isDashboardTopic);
  const conceptIds = new Set([
    ...CONCEPT_GROUPS.map((group) => group.id),
    ...dashboardTopics.map((topic) => topic.concept),
  ]);

  return [...conceptIds]
    .map((conceptId) => {
      const meta = getConceptMeta(conceptId);
      const topics = sortTopics(
        dashboardTopics.filter((topic) => topic.concept === conceptId),
      );
      const active = topics.filter((topic) => topic.status !== "upcoming");

      return {
        id: conceptId,
        label: meta.label,
        icon: meta.icon,
        topics,
        completed: active.filter((topic) => topic.status === "completed").length,
        total: active.length,
      };
    })
    .filter((group) => group.topics.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const filterConceptDashboard = (
  groups: ConceptGroup[],
  query: string,
): ConceptGroup[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return groups;

  return groups
    .map((group) => {
      const groupMatches =
        group.label.toLowerCase().includes(normalized) ||
        group.id.toLowerCase().includes(normalized);

      const topics = groupMatches
        ? group.topics.filter((topic) => topic.status !== "upcoming")
        : group.topics.filter(
            (topic) =>
              topic.status !== "upcoming" &&
              (topic.title.toLowerCase().includes(normalized) ||
                topic.description.toLowerCase().includes(normalized) ||
                topic.tags.some((tag) =>
                  tag.toLowerCase().includes(normalized),
                )),
          );

      return { ...group, topics };
    })
    .filter((group) => group.topics.length > 0);
};
