import { CART, ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actionType";

const initialState = {
  cart: [],
  addedItem: "",
  removedItem: "",
};

export function addToCart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addedItem: action.item,
        cart: [...state.cart, action.item],
      };
    case CART:
      return {
        ...state,
        cart: action.cart,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        removedItem: action.item,
      };
    default:
      return state;
  }
}
