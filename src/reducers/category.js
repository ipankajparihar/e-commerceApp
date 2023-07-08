import { DROPDOWN_CLICK, SELECT_CATEGORY } from "../actions/actionType";

const initialState = {
  items: [],
  selectedCategory: "",
};

export default function categoryData(state = initialState, action) {
  switch (action.type) {
    case DROPDOWN_CLICK:
      return {
        ...state,
        items: action.category_data,
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
    default:
      return state;
  }
}
