import { Link } from "react-router-dom";
import { getAvailableJsTopics, JS_TOPICS } from "../../config/jsTopics";
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
  const availableProjects = MACHINE_CODING_PROJECTS.filter(
    (project) => project.status !== "upcoming",
  );
  const upcomingProjects = MACHINE_CODING_PROJECTS.filter(
    (project) => project.status === "upcoming",
  );
  const availableJsTopics = getAvailableJsTopics();
  const upcomingJsTopics = JS_TOPICS.filter(
    (topic) => topic.status === "upcoming",
  );

  return (
    <div className="home">
      <header className="home__header">
        <p className="home__eyebrow">Interview Prep</p>
        <h1 className="home__title">Practice Hub</h1>
        <p className="home__subtitle">
          React machine coding demos and JavaScript interview questions in one
          place — run live UI, read questions, and inspect your solutions.
        </p>
      </header>

      <section className="home__section">
        <div className="home__section-header">
          <h2 className="home__section-title">React Machine Coding</h2>
          <span className="home__section-badge home__section-badge--react">
            Demo + Code
          </span>
        </div>
        <div className="home__grid">
          {availableProjects.map((project) => (
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
        <div className="home__section-header">
          <h2 className="home__section-title">JavaScript Practice</h2>
          <span className="home__section-badge home__section-badge--js">
            Question + Solution
          </span>
        </div>
        <div className="home__grid">
          {availableJsTopics.map((topic) => (
            <Link
              key={topic.id}
              to={topic.path}
              className="project-card project-card--active project-card--js"
            >
              <div className="project-card__top">
                <h3 className="project-card__title">{topic.title}</h3>
                <span
                  className={`project-card__status project-card__status--${topic.status}`}
                >
                  {STATUS_LABEL[topic.status]}
                </span>
              </div>
              <p className="project-card__description">{topic.description}</p>
              <div className="project-card__tags">
                {topic.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {upcomingJsTopics.map((topic) => (
            <article
              key={topic.id}
              className="project-card project-card--upcoming"
              aria-disabled="true"
            >
              <div className="project-card__top">
                <h3 className="project-card__title">{topic.title}</h3>
                <span className="project-card__status project-card__status--upcoming">
                  {STATUS_LABEL[topic.status]}
                </span>
              </div>
              <p className="project-card__description">{topic.description}</p>
              <div className="project-card__tags">
                {topic.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {upcomingProjects.length > 0 && (
        <section className="home__section">
          <h2 className="home__section-title">Upcoming React Projects</h2>
          <div className="home__grid">
            {upcomingProjects.map((project) => (
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
                <p className="project-card__description">
                  {project.description}
                </p>
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
      )}

      <section className="home__structure">
        <h2 className="home__section-title">Architecture</h2>
        <pre className="home__code-block">{`Interview Prep/
├── JS/                              # JS questions + solutions (you edit here)
│   ├── _template/
│   │   ├── question.md
│   │   └── solution.js
│   └── debounce/
│       ├── question.md
│       └── solution.js
└── React_Machine_Coding/            # This hub app
    └── src/
        ├── config/
        │   ├── projects.ts          # React MC registry
        │   ├── projectSources.ts
        │   ├── jsTopics.ts          # JS topic registry
        │   └── jsTopicSources.ts    # ?raw imports from ../JS
        ├── projects/                # React MC components (live demos)
        └── pages/JsTopic/           # Question + Solution viewer`}</pre>
        <div className="home__tracks">
          <div className="home__track">
            <h3>React Machine Coding</h3>
            <ol className="home__steps">
              <li>Copy <code>src/projects/_template/</code></li>
              <li>Register in <code>projects.ts</code> + <code>projectSources.ts</code></li>
              <li>Route: <code>/projects/your-slug</code> → Demo | Code</li>
            </ol>
          </div>
          <div className="home__track">
            <h3>JavaScript Practice</h3>
            <ol className="home__steps">
              <li>Copy <code>JS/_template/</code> → <code>JS/yourTopic/</code></li>
              <li>Register in <code>jsTopics.ts</code> + <code>jsTopicSources.ts</code></li>
              <li>Route: <code>/js/your-topic</code> → Question | Solution</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
