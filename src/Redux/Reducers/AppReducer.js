import { SET_APP_INFO } from "../Constants";

const initialState = {
  inputState: { name: null, value: null },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_INFO:
      return {
        ...state,
        inputState: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
