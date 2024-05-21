import { get, post, edit, del } from "../utils/request";

export const login = async (email, password) => {
  const response = await get(`users?email=${email}&password=${password}`);
  return response;
};

export const register = async (records) => {
  const response = await post(`users`, records);
  return response;
};

export const checkExist = async (key, value) => {
  const response = await get(`users?${key}=${value}`);
  return response;
};
