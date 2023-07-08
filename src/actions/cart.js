import { CART, ADD_TO_CART, REMOVE_FROM_CART } from "./actionType";

//creating cart and adding a item to cart action
export function userCart(cart) {
  return {
    type: CART,
    cart,
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item,
  };
}

export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    item,
  };
}
