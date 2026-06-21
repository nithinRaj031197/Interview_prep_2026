import { Navigate, useParams } from "react-router-dom";
import SystemDesignLayout from "../../components/SystemDesignLayout/SystemDesignLayout";
import { getSystemDesignContent } from "../../config/systemDesignSources";
import { getSystemDesignTopicById } from "../../config/systemDesignTopics";

const SystemDesignPage = () => {
  const { topicId = "" } = useParams();
  const topic = getSystemDesignTopicById(topicId);
  const content = getSystemDesignContent(topicId);

  if (!topic || !content || topic.status === "upcoming") {
    return <Navigate to="/" replace />;
  }

  return (
    <SystemDesignLayout
      topicId={topicId}
      title={topic.title}
      content={content}
    />
  );
};

export default SystemDesignPage;
