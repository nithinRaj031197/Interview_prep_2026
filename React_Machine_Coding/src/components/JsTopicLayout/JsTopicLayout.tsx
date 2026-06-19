import { useState } from "react";
import { Link } from "react-router-dom";
import CodeViewer from "../CodeViewer/CodeViewer";
import QuestionPanel from "../QuestionPanel/QuestionPanel";
import TopicPinButton from "../TopicPinButton/TopicPinButton";
import type { JsSourceFile } from "../../config/jsTopicSources";
import { useTopicStorage } from "../../hooks/useTopicStorage";
import { useTopicVisit } from "../../hooks/useTopicVisit";
import "./JsTopicLayout.css";

type JsTopicTab = "question" | "solution";

type JsTopicLayoutProps = {
  topicId: string;
  title: string;
  question: string;
  sourceFiles: JsSourceFile[];
};

const JsTopicLayout = ({
  topicId,
  title,
  question,
  sourceFiles,
}: JsTopicLayoutProps) => {
  const [activeTab, setActiveTab] = useState<JsTopicTab>("question");
  const { togglePin, isPinned } = useTopicStorage();
  const path = `/js/${topicId}`;

  useTopicVisit({ track: "js", id: topicId, title, path });

  return (
    <div className="js-topic-layout">
      <header className="js-topic-layout__header">
        <Link to="/" className="js-topic-layout__back">
          ← Dashboard
        </Link>
        <div className="js-topic-layout__heading">
          <p className="js-topic-layout__eyebrow">JavaScript</p>
          <div className="js-topic-layout__title-row">
            <h1 className="js-topic-layout__title">{title}</h1>
            <TopicPinButton
              track="js"
              topicId={topicId}
              isPinned={isPinned("js", topicId)}
              onToggle={togglePin}
              label={title}
            />
          </div>
          <div
            className="js-topic-layout__tabs"
            role="tablist"
            aria-label="Topic views"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "question"}
              className={`js-topic-layout__tab ${activeTab === "question" ? "js-topic-layout__tab--active" : ""}`}
              onClick={() => setActiveTab("question")}
            >
              Question
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "solution"}
              className={`js-topic-layout__tab ${activeTab === "solution" ? "js-topic-layout__tab--active" : ""}`}
              onClick={() => setActiveTab("solution")}
            >
              Solution
              {sourceFiles.length > 0 && (
                <span className="js-topic-layout__tab-count">
                  {sourceFiles.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="js-topic-layout__main">
        {activeTab === "question" ? (
          <QuestionPanel content={question} />
        ) : (
          <CodeViewer files={sourceFiles} />
        )}
      </main>
    </div>
  );
};

export default JsTopicLayout;
