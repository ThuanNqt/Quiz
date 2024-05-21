const initialState = false;

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "login/checkLogin":
      return action.payload;
    default:
      return state;
  }
};
