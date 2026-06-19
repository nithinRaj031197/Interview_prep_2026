import { Link } from "react-router-dom";
import TopicPinButton from "../TopicPinButton/TopicPinButton";
import {
  DIFFICULTY_FULL,
  DIFFICULTY_LABEL,
} from "../../config/concepts";
import type { TopicEntry } from "../../config/topicIndex";
import "./CompactTopicCard.css";

type CompactTopicCardProps = {
  topic: TopicEntry;
  isPinned: boolean;
  onTogglePin: (track: TopicEntry["track"], id: string) => void;
};

const CompactTopicCard = ({
  topic,
  isPinned,
  onTogglePin,
}: CompactTopicCardProps) => {
  const isUpcoming = topic.status === "upcoming";
  const isCompleted = topic.status === "completed";

  if (isUpcoming) {
    return (
      <div
        className="compact-card compact-card--upcoming"
        aria-disabled="true"
        title="Coming soon"
      >
        <span className="compact-card__name">{topic.title}</span>
        <span
          className={`compact-card__diff compact-card__diff--${topic.difficulty}`}
          title={DIFFICULTY_FULL[topic.difficulty]}
        >
          {DIFFICULTY_LABEL[topic.difficulty]}
        </span>
      </div>
    );
  }

  return (
    <div className="compact-card">
      <Link to={topic.path} className="compact-card__link">
        <span className="compact-card__name">{topic.title}</span>
        <span
          className={`compact-card__diff compact-card__diff--${topic.difficulty}`}
          title={DIFFICULTY_FULL[topic.difficulty]}
        >
          {DIFFICULTY_LABEL[topic.difficulty]}
        </span>
        {isCompleted && (
          <span className="compact-card__done" title="Completed">
            ✓
          </span>
        )}
        {isPinned && (
          <span className="compact-card__star" title="Pinned">
            ★
          </span>
        )}
      </Link>
      <TopicPinButton
        track={topic.track}
        topicId={topic.id}
        isPinned={isPinned}
        onToggle={onTogglePin}
        label={topic.title}
      />
    </div>
  );
};

export default CompactTopicCard;
