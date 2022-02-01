import { SET_APP_INFO, SET_MENUS } from "../Constants";

const initialState = {
  loginDetails: JSON.parse(localStorage.getItem("posLoginDetail")) || {},
  menus: JSON.parse(localStorage.getItem("posMenu")) || [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_INFO:
      return {
        ...state,
        loginDetails: action.payload,
      };
    case SET_MENUS:
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
