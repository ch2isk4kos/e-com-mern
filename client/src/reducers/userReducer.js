export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return action.payload; // user = { email: "", password: "", cart: []}
    case "USER_SIGNOUT":
      return action.payload; // user = { null }
    default:
      return state;
  }
};
