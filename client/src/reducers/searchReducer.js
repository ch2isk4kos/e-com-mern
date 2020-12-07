export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload }; // search = { data: {}, action { payload: {} } }
    default:
      return state;
  }
};
