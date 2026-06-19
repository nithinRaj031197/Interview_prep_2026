import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CodeViewer from "../CodeViewer/CodeViewer";
import { getProjectSourceFiles } from "../../config/projectSources";
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

  return (
    <div className="project-layout">
      <header className="project-layout__header">
        <Link to="/" className="project-layout__back">
          ← All Projects
        </Link>
        <div className="project-layout__heading">
          <h1 className="project-layout__title">{title}</h1>
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
