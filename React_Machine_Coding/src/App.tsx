import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProjectLayout from "./components/ProjectLayout/ProjectLayout";
import {
  getAvailableProjects,
  LAZY_PROJECT_COMPONENTS,
} from "./config/projects";
import Home from "./pages/Home/Home";
import "./App.css";

const availableProjects = getAvailableProjects();

const App = () => {
  return (
    <BrowserRouter>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
