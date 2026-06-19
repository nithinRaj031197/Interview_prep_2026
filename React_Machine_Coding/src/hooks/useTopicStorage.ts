import { useCallback, useEffect, useState } from "react";
import {
  getPinnedTopics,
  getRecentTopics,
  isTopicPinned,
  notifyTopicStorageUpdate,
  toggleTopicPinned,
  TOPIC_STORAGE_EVENT,
  type StoredTopicRef,
} from "../utilities/topicStorage";
import type { TopicTrack } from "../config/topicIndex";

export const useTopicStorage = () => {
  const [recent, setRecent] = useState<StoredTopicRef[]>(getRecentTopics);
  const [pinned, setPinned] = useState<StoredTopicRef[]>(getPinnedTopics);

  const refresh = useCallback(() => {
    setRecent(getRecentTopics());
    setPinned(getPinnedTopics());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refresh();
    window.addEventListener(TOPIC_STORAGE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(TOPIC_STORAGE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  const togglePin = useCallback(
    (track: TopicTrack, id: string) => {
      toggleTopicPinned(track, id);
      notifyTopicStorageUpdate();
    },
    [],
  );

  const checkPinned = useCallback(
    (track: TopicTrack, id: string) => isTopicPinned(track, id),
    [pinned],
  );

  return { recent, pinned, togglePin, isPinned: checkPinned, refresh };
};
