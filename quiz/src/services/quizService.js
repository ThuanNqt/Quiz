import { get, post, del, edit } from "../utils/request";

export const submitQuiz = async (records) => {
  const response = await post(`answers`, records);
  return response;
};
