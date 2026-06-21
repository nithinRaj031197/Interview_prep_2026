import { Link } from "react-router-dom";
import {
  DIFFICULTY_FULL,
  DIFFICULTY_LABEL,
} from "../../config/concepts";
import {
  getSystemDesignCurriculum,
  getSystemDesignTopicCount,
} from "../../config/systemDesignTopics";
import "./SystemDesignHub.css";

const SystemDesignHub = () => {
  const curriculum = getSystemDesignCurriculum();
  const topicCount = getSystemDesignTopicCount();

  return (
    <div className="fsd-hub">
      <header className="fsd-hub__header">
        <Link to="/" className="fsd-hub__back">
          ← Dashboard
        </Link>
        <p className="fsd-hub__eyebrow">Frontend System Design</p>
        <h1 className="fsd-hub__title">Study curriculum</h1>
        <p className="fsd-hub__subtitle">
          {topicCount} topics in order — beginner to architect. Read each
          chapter, follow cross-links, practice explaining tradeoffs aloud.
        </p>
      </header>

      <div className="fsd-hub__curriculum">
        {curriculum.map((section, sectionIndex) => (
          <section key={section.id} className="fsd-hub__phase">
            <div className="fsd-hub__phase-header">
              <span className="fsd-hub__phase-number">{sectionIndex + 1}</span>
              <div>
                <h2 className="fsd-hub__phase-title">{section.label}</h2>
                <p className="fsd-hub__phase-subtitle">{section.subtitle}</p>
              </div>
            </div>

            <ol className="fsd-hub__topic-list">
              {section.topics.map((topic, topicIndex) => (
                <li key={topic.id} className="fsd-hub__topic-item">
                  <Link to={topic.path} className="fsd-hub__topic-link">
                    <span className="fsd-hub__topic-index">
                      {topicIndex + 1}
                    </span>
                    <span className="fsd-hub__topic-body">
                      <span className="fsd-hub__topic-title">{topic.title}</span>
                      <span className="fsd-hub__topic-desc">
                        {topic.description}
                      </span>
                    </span>
                    <span
                      className={`fsd-hub__diff fsd-hub__diff--${topic.difficulty}`}
                      title={DIFFICULTY_FULL[topic.difficulty]}
                    >
                      {DIFFICULTY_LABEL[topic.difficulty]}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SystemDesignHub;
