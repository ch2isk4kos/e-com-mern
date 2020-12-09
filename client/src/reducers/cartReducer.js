let initState = [];

// load cart from local storage
if (typeof window !== undefined) {
  if (localStorage.getItem("cart")) {
    initState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initState = [];
  }
}

export const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
