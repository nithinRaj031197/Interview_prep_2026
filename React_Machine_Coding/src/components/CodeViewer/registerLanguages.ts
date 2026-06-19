import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";

const registered = new Set<string>();

const register = (name: string, language: typeof tsx) => {
  if (registered.has(name)) return;
  SyntaxHighlighter.registerLanguage(name, language);
  registered.add(name);
};

register("bash", bash);
register("css", css);
register("javascript", javascript);
register("json", json);
register("jsx", jsx);
register("markdown", markdown);
register("html", markup);
register("markup", markup);
register("python", python);
register("scss", scss);
register("tsx", tsx);
register("typescript", typescript);
register("yaml", yaml);

export { SyntaxHighlighter };
