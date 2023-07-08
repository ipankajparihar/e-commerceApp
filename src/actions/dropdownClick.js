import { DROPDOWN_CLICK, SELECT_CATEGORY } from "./actionType";

export function categoryData(category_data) {
  return {
    type: DROPDOWN_CLICK,
    category_data,
  };
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  };
}

export function fetchCategory(e) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://e-commerce-34ce9-default-rtdb.firebaseio.com/.json`
      );

      const data = await response.json();
      const arr = data.filter((item) => item.category === e);
      dispatch(categoryData(arr, e));
    } catch (error) {
      console.log(error);
    }
  };
}
