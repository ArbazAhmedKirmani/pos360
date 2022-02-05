import { combineReducers } from "redux";
import AppReducer from "./Reducers/AppReducer";
import PageReducer from "./Reducers/PageReducer";

const combineReducer = combineReducers({
  AppReducer,
  PageReducer,
});

export default combineReducer;
