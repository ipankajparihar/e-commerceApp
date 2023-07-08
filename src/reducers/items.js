import { HOME_ITEMS, CLICKED_ITEM } from "../actions/actionType";

export function homeItems(state = [], action) {
  switch (action.type) {
    case HOME_ITEMS:
      return action.homeitems;
    default:
      return state;
  }
}

const initialState = {
  items: "",
};

export function clickedItem(state = initialState, action) {
  switch (action.type) {
    case CLICKED_ITEM:
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
}
