import overview from "@repo-fsd/README.md?raw";
import learningPath from "@repo-fsd/LEARNING_PATH.md?raw";
import roadmap from "@repo-fsd/ROADMAP.md?raw";
import systemDesignInterviews from "@repo-fsd/system-design-interviews/README.md?raw";
import coreWebFundamentals from "@repo-fsd/core-web-fundamentals/README.md?raw";
import foundations from "@repo-fsd/foundations/README.md?raw";
import componentArchitecture from "@repo-fsd/component-architecture/README.md?raw";
import designPatterns from "@repo-fsd/design-patterns/README.md?raw";
import reactInternals from "@repo-fsd/react-internals/README.md?raw";
import stateManagement from "@repo-fsd/state-management/README.md?raw";
import typescriptArchitecture from "@repo-fsd/typescript-architecture/README.md?raw";
import cssStylingArchitecture from "@repo-fsd/css-styling-architecture/README.md?raw";
import performance from "@repo-fsd/performance/README.md?raw";
import dataLayer from "@repo-fsd/data-layer/README.md?raw";
import security from "@repo-fsd/security/README.md?raw";
import testing from "@repo-fsd/testing/README.md?raw";
import accessibility from "@repo-fsd/accessibility/README.md?raw";
import uiSystemPatterns from "@repo-fsd/ui-system-patterns/README.md?raw";
import realTimeSystems from "@repo-fsd/real-time-systems/README.md?raw";
import renderingStrategies from "@repo-fsd/rendering-strategies/README.md?raw";
import nextjsFramework from "@repo-fsd/nextjs-framework/README.md?raw";
import tooling from "@repo-fsd/tooling/README.md?raw";
import designSystem from "@repo-fsd/design-system/README.md?raw";
import scalability from "@repo-fsd/scalability/README.md?raw";
import pwaOffline from "@repo-fsd/pwa-offline/README.md?raw";
import advancedTopics from "@repo-fsd/advanced-topics/README.md?raw";
import observability from "@repo-fsd/observability/README.md?raw";
import deployment from "@repo-fsd/deployment/README.md?raw";
import architectMindset from "@repo-fsd/architect-mindset/README.md?raw";
import caseStudies from "@repo-fsd/case-studies/README.md?raw";

export const SYSTEM_DESIGN_CONTENT: Record<string, string> = {
  overview,
  "learning-path": learningPath,
  roadmap,
  "system-design-interviews": systemDesignInterviews,
  "core-web-fundamentals": coreWebFundamentals,
  foundations,
  "component-architecture": componentArchitecture,
  "design-patterns": designPatterns,
  "react-internals": reactInternals,
  "state-management": stateManagement,
  "typescript-architecture": typescriptArchitecture,
  "css-styling-architecture": cssStylingArchitecture,
  performance,
  "data-layer": dataLayer,
  security,
  testing,
  accessibility,
  "ui-system-patterns": uiSystemPatterns,
  "real-time-systems": realTimeSystems,
  "rendering-strategies": renderingStrategies,
  "nextjs-framework": nextjsFramework,
  tooling,
  "design-system": designSystem,
  scalability,
  "pwa-offline": pwaOffline,
  "advanced-topics": advancedTopics,
  observability,
  deployment,
  "architect-mindset": architectMindset,
  "case-studies": caseStudies,
};

export const getSystemDesignContent = (topicId: string): string | null =>
  SYSTEM_DESIGN_CONTENT[topicId] ?? null;
