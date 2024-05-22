import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Topic.css";
import { getListTopic } from "../../services/topicService";

export default function Topic() {
  const [topics, setTopics] = useState();

  // call api get list topic
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      setTopics(response);
    };

    fetchApi();
  }, []);

  console.log(topics);

  return (
    <>
      <h2>List topics</h2>
      {topics && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Topic name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => {
              return (
                <tr>
                  <td>{topic.id}</td>
                  <td>{topic.name}</td>
                  <td>
                    <NavLink to={`/quiz/${topic.id}`}>practice</NavLink>
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
