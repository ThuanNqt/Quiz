import { get, post, edit, del } from "../utils/request";

export const getListAnswerByUser = async (userId) => {
  const response = await get(`answers/?userId=${userId}`);
  return response;
};

export const getAnswer = async (answerId) => {
  const response = await get(`answers/${answerId}`);
  return response;
};
