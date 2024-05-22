import { get, post, del, edit } from "../utils/request";

export const getListTopic = async () => {
  const response = await get(`topics`);
  return response;
};
