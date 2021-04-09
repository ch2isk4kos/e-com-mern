import { combineReducers } from "redux";
import { couponReducer } from "./couponReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  coupon: couponReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  search: searchReducer,
  user: userReducer,
});

export default rootReducer;
