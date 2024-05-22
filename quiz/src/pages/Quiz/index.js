import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicById } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";

export default function Quiz() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState();
  const [questions, setQuestions] = useState();

  // call api topic
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopicById(topicId);
      setTopic(response);
    };

    fetchApi();
  }, [topicId]);

  // call api question
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(topicId);
      setQuestions(response);
    };

    fetchApi();
  }, [topicId]);

  console.log(questions);

  return (
    <>
      <h2>Quiz on the topic: {topic?.name}</h2>
    </>
  );
}
