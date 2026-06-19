import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CompactTopicCard from "../../components/CompactTopicCard/CompactTopicCard";
import {
  filterConceptDashboard,
  getConceptDashboard,
} from "../../config/topicIndex";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useTopicStorage } from "../../hooks/useTopicStorage";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const { recent, pinned, togglePin, isPinned } = useTopicStorage();

  const conceptGroups = useMemo(() => getConceptDashboard(), []);
  const visibleGroups = useMemo(
    () => filterConceptDashboard(conceptGroups, debouncedQuery),
    [conceptGroups, debouncedQuery],
  );

  const isFiltering = debouncedQuery.trim().length > 0;

  return (
    <div className="home">
      <header className="home__header">
        <p className="home__eyebrow">Interview Prep</p>
        <h1 className="home__title">Topic Dashboard</h1>
        <p className="home__subtitle">
          Scan by concept, warm up easy → hard. Search is a shortcut when you
          need it.
        </p>
      </header>

      <div className="home__search-wrap">
        <input
          id="topic-search"
          type="search"
          className="home__search"
          placeholder="Quick search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {(recent.length > 0 || pinned.length > 0) && !isFiltering && (
        <div className="home__shortcuts">
          {recent.length > 0 && (
            <div className="home__shortcut-row">
              <span className="home__shortcut-label">Recent</span>
              {recent.map((item) => (
                <Link key={item.key} to={item.path} className="home__chip">
                  {item.title}
                </Link>
              ))}
            </div>
          )}
          {pinned.length > 0 && (
            <div className="home__shortcut-row">
              <span className="home__shortcut-label">Pinned</span>
              {pinned.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="home__chip home__chip--pinned"
                >
                  ★ {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="home__legend">
        <span>
          <strong>E</strong> Easy
        </span>
        <span>
          <strong>M</strong> Medium
        </span>
        <span>
          <strong>H</strong> Hard
        </span>
        <span>
          <strong>✓</strong> Done
        </span>
        <span>
          <strong>★</strong> Pinned
        </span>
      </div>

      {isFiltering && visibleGroups.length === 0 && (
        <p className="home__empty">No topics match &ldquo;{debouncedQuery}&rdquo;</p>
      )}

      <div className="home__concepts">
        {visibleGroups.map((group) => (
          <section key={group.id} className="concept-group">
            <div className="concept-group__header">
              <div className="concept-group__title-wrap">
                <span className="concept-group__icon">{group.icon}</span>
                <h2 className="concept-group__title">{group.label}</h2>
                <span className="concept-group__count">{group.topics.length}</span>
              </div>
              {!isFiltering && group.total > 0 && (
                <span className="concept-group__progress">
                  {group.completed}/{group.total} done
                </span>
              )}
            </div>

            <div className="concept-group__cards">
              {group.topics.map((topic) => (
                <CompactTopicCard
                  key={`${topic.track}:${topic.id}`}
                  topic={topic}
                  isPinned={isPinned(topic.track, topic.id)}
                  onTogglePin={togglePin}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
