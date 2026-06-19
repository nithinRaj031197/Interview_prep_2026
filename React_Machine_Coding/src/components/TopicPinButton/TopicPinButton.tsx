import type { TopicTrack } from "../../config/topicIndex";
import "./TopicPinButton.css";

type TopicPinButtonProps = {
  track: TopicTrack;
  topicId: string;
  isPinned: boolean;
  onToggle: (track: TopicTrack, id: string) => void;
  label?: string;
};

const TopicPinButton = ({
  track,
  topicId,
  isPinned,
  onToggle,
  label,
}: TopicPinButtonProps) => {
  return (
    <button
      type="button"
      className={`topic-pin ${isPinned ? "topic-pin--active" : ""}`}
      aria-label={isPinned ? `Unpin ${label ?? "topic"}` : `Pin ${label ?? "topic"}`}
      aria-pressed={isPinned}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle(track, topicId);
      }}
    >
      {isPinned ? "★" : "☆"}
    </button>
  );
};

export default TopicPinButton;
