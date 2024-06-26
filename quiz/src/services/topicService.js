import { get, post, del, edit } from "../utils/request";

export const getListTopic = async () => {
  const response = await get(`topics`);
  return response;
};

export const getTopicById = async (topicId) => {
  const response = await get(`topics/${topicId}`);
  return response;
};
