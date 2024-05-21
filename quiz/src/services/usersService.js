import { get, post, edit, del } from "../utils/request";

export const login = async (email, password) => {
  const response = await get(`users?email=${email}&password=${password}`);
  return response;
};
