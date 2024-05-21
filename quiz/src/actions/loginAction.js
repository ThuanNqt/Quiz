export const checkLogin = (status) => {
  return {
    type: "login/checkLogin",
    payload: status,
  };
};
