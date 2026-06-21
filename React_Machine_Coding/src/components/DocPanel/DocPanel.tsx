import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { resolveFsdMarkdownLink } from "../../utilities/fsdLinks";
import "./DocPanel.css";

type DocPanelProps = {
  content: string;
};

const DocPanel = ({ content }: DocPanelProps) => {
  return (
    <article className="doc-panel">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children, ...props }) => {
            const internalPath = resolveFsdMarkdownLink(href);

            if (internalPath) {
              return (
                <Link to={internalPath} {...props}>
                  {children}
                </Link>
              );
            }

            const isExternal = /^https?:\/\//i.test(href);

            return (
              <a
                href={href}
                {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
};

export default DocPanel;
