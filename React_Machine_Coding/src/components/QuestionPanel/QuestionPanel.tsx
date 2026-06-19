import Markdown from "react-markdown";
import "./QuestionPanel.css";

type QuestionPanelProps = {
  content: string;
};

const QuestionPanel = ({ content }: QuestionPanelProps) => {
  return (
    <article className="question-panel">
      <Markdown>{content}</Markdown>
    </article>
  );
};

export default QuestionPanel;
