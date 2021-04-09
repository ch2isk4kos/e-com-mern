let initState = false;

export const couponReducer = (state = initState, action) => {
  switch (action.type) {
    case "COUPON_APPLIED":
      return action.payload;
    default:
      return state;
  }
};
