import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  drawer: drawerReducer,
  search: searchReducer,
  user: userReducer,
});

export default rootReducer;
