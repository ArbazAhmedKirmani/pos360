import {
  SET_BULK_FORM_FIELD,
  SET_DEFAULT_STATE,
  SET_FORM_FIELD,
  SET_LIST,
  SET_FORM_FIELD_UPDATE,
  SET_SEARCH_STRING,
} from "../Constants";

export const SET_DEFAULT_STATE_ACTION = () => ({
  type: SET_DEFAULT_STATE,
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

export const SET_SEARCH_STRING_ACTION = (data) => ({
  type: SET_SEARCH_STRING,
  payload: data,
});
