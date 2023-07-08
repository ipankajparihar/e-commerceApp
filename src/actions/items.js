import { HOME_ITEMS, CLICKED_ITEM } from "./actionType";

export function homeItems(homeitems) {
  return {
    type: HOME_ITEMS,
    homeitems,
  };
}

export function fetchItems() {
  return async (dispatch) => {
    try {
      //fetching products from firebase database and dispatching the action
      const response = await fetch(
        "https://e-commerce-34ce9-default-rtdb.firebaseio.com/.json"
      );
      const data = await response.json();
      console.log("product", data);

      dispatch(homeItems(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function clickedItem(item) {
  return {
    type: CLICKED_ITEM,
    item,
  };
}
