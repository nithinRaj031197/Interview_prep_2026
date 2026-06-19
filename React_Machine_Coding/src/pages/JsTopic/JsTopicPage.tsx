import { Navigate, useParams } from "react-router-dom";
import JsTopicLayout from "../../components/JsTopicLayout/JsTopicLayout";
import { getJsTopicContent } from "../../config/jsTopicSources";
import { getJsTopicById } from "../../config/jsTopics";

const JsTopicPage = () => {
  const { topicId = "" } = useParams();
  const topic = getJsTopicById(topicId);
  const content = getJsTopicContent(topicId);

  if (!topic || !content || topic.status === "upcoming") {
    return <Navigate to="/" replace />;
  }

  return (
    <JsTopicLayout
      title={topic.title}
      question={content.question}
      sourceFiles={content.files}
    />
  );
};

export default JsTopicPage;
