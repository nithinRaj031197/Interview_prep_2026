import { Link } from "react-router-dom";
import DocPanel from "../DocPanel/DocPanel";
import TopicPinButton from "../TopicPinButton/TopicPinButton";
import { useTopicStorage } from "../../hooks/useTopicStorage";
import { useTopicVisit } from "../../hooks/useTopicVisit";
import "./SystemDesignLayout.css";

type SystemDesignLayoutProps = {
  topicId: string;
  title: string;
  content: string;
};

const SystemDesignLayout = ({
  topicId,
  title,
  content,
}: SystemDesignLayoutProps) => {
  const { togglePin, isPinned } = useTopicStorage();
  const path = `/system-design/${topicId}`;

  useTopicVisit({ track: "system-design", id: topicId, title, path });

  return (
    <div className="system-design-layout">
      <header className="system-design-layout__header">
        <Link to="/system-design" className="system-design-layout__back">
          ← All topics
        </Link>
        <div className="system-design-layout__heading">
          <p className="system-design-layout__eyebrow">Frontend System Design</p>
          <div className="system-design-layout__title-row">
            <h1 className="system-design-layout__title">{title}</h1>
            <TopicPinButton
              track="system-design"
              topicId={topicId}
              isPinned={isPinned("system-design", topicId)}
              onToggle={togglePin}
              label={title}
            />
          </div>
        </div>
      </header>

      <main className="system-design-layout__main">
        <DocPanel content={content} />
      </main>
    </div>
  );
};

export default SystemDesignLayout;
