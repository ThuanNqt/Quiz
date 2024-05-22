import { get, post, del, edit } from "../utils/request";

export const getListQuestion = async (topicId) => {
  const response = await get(`questions/?topicId=${topicId}`);
  return response;
};
