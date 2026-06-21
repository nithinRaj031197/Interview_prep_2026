const FSD_TOPIC_IDS = new Set([
  "overview",
  "learning-path",
  "roadmap",
  "system-design-interviews",
  "core-web-fundamentals",
  "foundations",
  "component-architecture",
  "design-patterns",
  "react-internals",
  "state-management",
  "typescript-architecture",
  "css-styling-architecture",
  "performance",
  "data-layer",
  "security",
  "testing",
  "accessibility",
  "ui-system-patterns",
  "real-time-systems",
  "rendering-strategies",
  "nextjs-framework",
  "tooling",
  "design-system",
  "scalability",
  "pwa-offline",
  "advanced-topics",
  "observability",
  "deployment",
  "architect-mindset",
  "case-studies",
]);

export function resolveFsdMarkdownLink(href: string): string | null {
  if (!href || href.startsWith("#") || /^https?:\/\//i.test(href)) {
    return null;
  }

  if (/LEARNING_PATH\.md/i.test(href)) {
    return "/system-design/learning-path";
  }

  if (/ROADMAP\.md/i.test(href)) {
    return "/system-design/roadmap";
  }

  const topicMatch = href.match(/([a-z0-9-]+)\/README\.md/i);
  if (topicMatch) {
    const slug = topicMatch[1].toLowerCase();
    if (FSD_TOPIC_IDS.has(slug)) {
      return `/system-design/${slug}`;
    }
  }

  if (/^\.\/?README\.md$/i.test(href) || href.endsWith("/README.md")) {
    return "/system-design/overview";
  }

  return null;
}
