import {
  SET_BULK_FORM_FIELD,
  SET_DEFAULT_STATE,
  SET_FORM_FIELD,
  SET_LIST,
  TOGGLE_FORM_LOADING,
  TOGGLE_TABLE_LOADING,
  SET_FORM_FIELD_UPDATE,
} from "../Constants";

export const SET_DEFAULT_STATE_ACTION = () => ({
  type: SET_DEFAULT_STATE,
  payload: null,
});

export const TOGGLE_FORM_LOADING_ACTION = () => ({
  type: TOGGLE_FORM_LOADING,
  payload: null,
});

export const TOGGLE_TABLE_LOADING_ACTION = () => ({
  type: TOGGLE_TABLE_LOADING,
  payload: null,
});

export const SET_LIST_ACTION = (listArray) => ({
  type: SET_LIST,
  payload: listArray,
});

export const SET_FORM_FIELD_ACTION = (data) => ({
  type: SET_FORM_FIELD,
  payload: data,
});

export const SET_FORM_FIELD_UPDATE_ACTION = (data) => ({
  type: SET_FORM_FIELD_UPDATE,
  payload: data,
});

export const SET_BULK_FORM_FIELD_ACTION = (data) => ({
  type: SET_BULK_FORM_FIELD,
  payload: data,
});
