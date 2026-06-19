import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CodeViewer from "../CodeViewer/CodeViewer";
import TopicPinButton from "../TopicPinButton/TopicPinButton";
import { getProjectSourceFiles } from "../../config/projectSources";
import { useTopicStorage } from "../../hooks/useTopicStorage";
import { useTopicVisit } from "../../hooks/useTopicVisit";
import "./ProjectLayout.css";

type ProjectTab = "demo" | "code";

type ProjectLayoutProps = {
  title: string;
  projectId: string;
  children: ReactNode;
};

const ProjectLayout = ({ title, projectId, children }: ProjectLayoutProps) => {
  const [activeTab, setActiveTab] = useState<ProjectTab>("demo");
  const sourceFiles = getProjectSourceFiles(projectId);
  const { togglePin, isPinned } = useTopicStorage();
  const path = `/projects/${projectId}`;

  useTopicVisit({ track: "react", id: projectId, title, path });

  return (
    <div className="project-layout">
      <header className="project-layout__header">
        <Link to="/" className="project-layout__back">
          ← Dashboard
        </Link>
        <div className="project-layout__heading">
          <div className="project-layout__title-row">
            <h1 className="project-layout__title">{title}</h1>
            <TopicPinButton
              track="react"
              topicId={projectId}
              isPinned={isPinned("react", projectId)}
              onToggle={togglePin}
              label={title}
            />
          </div>
          <div className="project-layout__tabs" role="tablist" aria-label="Project views">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "demo"}
              className={`project-layout__tab ${activeTab === "demo" ? "project-layout__tab--active" : ""}`}
              onClick={() => setActiveTab("demo")}
            >
              Demo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "code"}
              className={`project-layout__tab ${activeTab === "code" ? "project-layout__tab--active" : ""}`}
              onClick={() => setActiveTab("code")}
            >
              Code
              {sourceFiles.length > 0 && (
                <span className="project-layout__tab-count">{sourceFiles.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main
        className={`project-layout__main ${activeTab === "demo" ? "project-layout__main--demo" : "project-layout__main--code"}`}
      >
        {activeTab === "demo" ? (
          <div className="project-layout__demo">{children}</div>
        ) : (
          <CodeViewer files={sourceFiles} />
        )}
      </main>
    </div>
  );
};

export default ProjectLayout;
