import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProjectLayout from "./components/ProjectLayout/ProjectLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import {
  getAvailableProjects,
  LAZY_PROJECT_COMPONENTS,
} from "./config/projects";
import Home from "./pages/Home/Home";
import JsTopicPage from "./pages/JsTopic/JsTopicPage";
import SystemDesignHub from "./pages/SystemDesign/SystemDesignHub";
import SystemDesignPage from "./pages/SystemDesign/SystemDesignPage";
import "./App.css";

const availableProjects = getAvailableProjects();

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          {availableProjects.map((project) => {
            const LazyComponent = LAZY_PROJECT_COMPONENTS[project.id];

            return (
              <Route
                key={project.id}
                path={project.path}
                element={
                  <ProjectLayout
                    title={project.title}
                    projectId={project.id}
                  >
                    <Suspense
                      fallback={
                        <div className="app__loading">Loading project…</div>
                      }
                    >
                      <LazyComponent />
                    </Suspense>
                  </ProjectLayout>
                }
              />
            );
          })}
          <Route path="/js/:topicId" element={<JsTopicPage />} />
          <Route path="/system-design" element={<SystemDesignHub />} />
          <Route path="/system-design/:topicId" element={<SystemDesignPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
