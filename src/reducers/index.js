// reducers/rootReducer.js
import { combineReducers } from "redux";
import authReducer from "./auth.js";
import { homeItems, clickedItem } from "./items.js";
import categoryData from "./category.js";
import { addToCart } from "./cart.js";

const rootReducer = combineReducers({
  auth: authReducer,
  homeitems: homeItems,
  categoryData,
  item: clickedItem,
  cart: addToCart,
});

export default rootReducer;
