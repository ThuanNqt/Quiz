import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import "./Result.css";
export default function Result() {
  const { answerId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswer(answerId);
      const dataQuestions = await getListQuestion(dataAnswer.topicId);

      // console.log(dataAnswer);
      // console.log(dataQuestions);

      const resultFinal = dataQuestions.map((question) => {
        return {
          ...question,
          userAnswer: dataAnswer.answers.find(
            (answer) => answer.questionId === question.id
          ).answer,
        };
      });
      setResults(resultFinal);
    };

    fetchApi();
  }, [answerId]);

  return (
    <>
      <h2>Result</h2>
      <div className="result__list">
        {results.map((result, index) => (
          <div className="result__item">
            <p>
              Câu {index + 1}: {result.question}
              {/* resolve correctAnswer  */}
              {result.correctAnswer === result.answer ? (
                <span className="result__tag result__tag--true">True</span>
              ) : (
                <span className="result__tag result__tag--false">False</span>
              )}
            </p>
            {/* show answer */}
            {result.answers.map((itemAnswer, indexAnswer) => {
              let className = "";
              let checked = false;

              // checked answer from user
              if (indexAnswer === result.userAnswer - 1) {
                checked = true;
                className = "result__item--selected";
              }

              // check answer correct
              if (result.correctAnswer === indexAnswer + 1) {
                className = "result__item--correct";
              }

              return (
                <div className="form-quiz__answer" key={indexAnswer}>
                  <input type="radio" checked={checked} disabled />
                  <label className={className}>{itemAnswer}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
