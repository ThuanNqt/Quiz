import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Answers.css";
import { getListTopic } from "../../services/topicService";
import { getListAnswerByUser } from "../../services/answersService";
import { getCookie } from "../../helpers/cookie";

export default function Result() {
  const [answers, setAnswers] = useState();
  const userId = getCookie("userId");

  // call api get list topic
  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getListAnswerByUser(userId);
      const listTopics = await getListTopic();

      // console.log(answersByUserId);
      // console.log(listTopics);

      // merge topic name
      const mergeAnswers = answersByUserId.map((answer) => {
        let topic = listTopics.find((topic) => topic.id === answer.topicId);
        return { ...answer, topicName: topic.name };
      });

      setAnswers(mergeAnswers.reverse());
    };

    fetchApi();
  }, [userId]);

  return (
    <>
      <h2>List answers</h2>
      {answers && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => {
              return (
                <tr>
                  <td>{answer.id}</td>
                  <td>{answer.topicName}</td>
                  <td>
                    <NavLink to={`/result/${answer.id}`}>detail</NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
