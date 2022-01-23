import { SET_APP_INFO, SET_MENUS } from "../Constants";

export const SET_APP_INFORMATION = (data) => ({
  type: SET_APP_INFO,
  payload: data,
});

export const SET_APP_MENUS = (data) => ({
  type: SET_MENUS,
  payload: data,
});
