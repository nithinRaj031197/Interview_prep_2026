import { useState } from "react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ProjectSourceFile } from "../../config/projectSources";
import { getLanguageFromFile } from "./getLanguageFromFile";
import { SyntaxHighlighter } from "./registerLanguages";
import "./CodeViewer.css";

type CodeViewerProps = {
  files: ProjectSourceFile[];
};

const CodeViewer = ({ files }: CodeViewerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (files.length === 0) {
    return (
      <div className="code-viewer code-viewer--empty">
        <p>No source files registered for this project yet.</p>
        <p className="code-viewer__hint">
          Add entries in <code>src/config/projectSources.ts</code> or{" "}
          <code>src/config/jsTopicSources.ts</code>
        </p>
      </div>
    );
  }

  const activeFile = files[activeIndex];
  const language = getLanguageFromFile(activeFile.label, activeFile.language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer">
      <div className="code-viewer__toolbar">
        <div className="code-viewer__tabs" role="tablist" aria-label="Source files">
          {files.map((file, index) => (
            <button
              key={file.path}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`code-viewer__tab ${index === activeIndex ? "code-viewer__tab--active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {file.label}
            </button>
          ))}
        </div>
        <button type="button" className="code-viewer__copy" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy file"}
        </button>
      </div>

      <div className="code-viewer__meta">
        <p className="code-viewer__path">{activeFile.path}</p>
        <span className="code-viewer__language">{language}</span>
      </div>

      <div className="code-viewer__panel">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "1rem 0",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: 1.65,
          }}
          lineNumberStyle={{
            minWidth: "2.75rem",
            paddingRight: "1rem",
            color: "#475569",
            userSelect: "none",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
            },
          }}
        >
          {activeFile.content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;
