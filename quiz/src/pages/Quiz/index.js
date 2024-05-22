import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicById } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { submitQuiz } from "../../services/quizService";

export default function Quiz() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState();
  const [questions, setQuestions] = useState();
  const navigate = useNavigate();

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

  const handleSubmitFormQuiz = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        // name = questionId
        // value = answer (index+1)
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({
          questionId: name,
          answer: parseInt(value),
        });
      }
    }

    // call api submit
    const records = {
      userId: getCookie("userId"),
      topicId: topicId,
      answers: selectedAnswers,
    };
    const response = await submitQuiz(records);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  };

  return (
    <>
      <h2>Quiz on the topic: {topic?.name}</h2>
      <div className="form-quiz">
        <form onSubmit={handleSubmitFormQuiz}>
          {questions?.map((item, index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {/* choice answer */}
              {item.answers.map((itemAnswer, indexAnswer) => (
                <div className="form-quiz__answer">
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAnswer + 1}
                    id={`quiz-${item.id}-${indexAnswer + 1}`}
                    key={indexAnswer}
                  />
                  <label htmlFor={`quiz-${item.id}-${indexAnswer + 1}`}>
                    {itemAnswer}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
