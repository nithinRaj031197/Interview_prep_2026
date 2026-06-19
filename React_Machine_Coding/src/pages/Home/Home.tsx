import { Link } from "react-router-dom";
import {
  MACHINE_CODING_PROJECTS,
  type ProjectStatus,
} from "../../config/projects";
import "./Home.css";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  upcoming: "Coming Soon",
};

const Home = () => {
  const available = MACHINE_CODING_PROJECTS.filter(
    (project) => project.status !== "upcoming",
  );
  const upcoming = MACHINE_CODING_PROJECTS.filter(
    (project) => project.status === "upcoming",
  );

  return (
    <div className="home">
      <header className="home__header">
        <p className="home__eyebrow">Interview Prep</p>
        <h1 className="home__title">React Machine Coding</h1>
        <p className="home__subtitle">
          Practice UI components and patterns commonly asked in frontend
          interviews. Pick a project below to start coding.
        </p>
      </header>

      <section className="home__section">
        <h2 className="home__section-title">Available Projects</h2>
        <div className="home__grid">
          {available.map((project) => (
            <Link
              key={project.id}
              to={project.path}
              className="project-card project-card--active"
            >
              <div className="project-card__top">
                <h3 className="project-card__title">{project.title}</h3>
                <span
                  className={`project-card__status project-card__status--${project.status}`}
                >
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__section-title">Upcoming</h2>
        <div className="home__grid">
          {upcoming.map((project) => (
            <article
              key={project.id}
              className="project-card project-card--upcoming"
              aria-disabled="true"
            >
              <div className="project-card__top">
                <h3 className="project-card__title">{project.title}</h3>
                <span className="project-card__status project-card__status--upcoming">
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home__structure">
        <h2 className="home__section-title">Project Folder Structure</h2>
        <pre className="home__code-block">{`src/
├── App.tsx                 # Router — home + project routes
├── config/
│   ├── projects.ts         # Register every project here
│   └── projectSources.ts   # Register source files for the Code tab
├── pages/
│   └── Home/               # Landing page (this page)
├── components/
│   └── ProjectLayout/      # Shared shell: back link, title, demo area
└── projects/
    ├── _template/          # Copy this when starting a new project
    │   ├── ProjectName.tsx
    │   ├── ProjectName.css
    │   └── utilities/
    │       └── constants.ts
    └── selectiveCells/     # One folder per machine coding round
        ├── SelectiveCells.tsx
        ├── SelectiveCells.css
        └── utilities/
            └── constants.ts`}</pre>
        <ol className="home__steps">
          <li>
            Copy <code>src/projects/_template/</code> to{" "}
            <code>src/projects/yourProject/</code>
          </li>
          <li>
            Add a lazy import in <code>PROJECT_COMPONENTS</code> inside{" "}
            <code>config/projects.ts</code>
          </li>
          <li>
            Add metadata (title, path, tags) to{" "}
            <code>MACHINE_CODING_PROJECTS</code>
          </li>
          <li>Set <code>status</code> to <code>"in-progress"</code> when ready</li>
          <li>
            Add <code>?raw</code> imports in <code>config/projectSources.ts</code>{" "}
            so your solution appears on the Code tab
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
