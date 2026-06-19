import { useEffect } from "react";
import type { TopicTrack } from "../config/topicIndex";
import {
  notifyTopicStorageUpdate,
  recordTopicVisit,
} from "../utilities/topicStorage";

export const useTopicVisit = (input: {
  track: TopicTrack;
  id: string;
  title: string;
  path: string;
}) => {
  useEffect(() => {
    recordTopicVisit(input);
    notifyTopicStorageUpdate();
  }, [input.id, input.track, input.title, input.path]);
};
