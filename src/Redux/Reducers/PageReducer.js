import {
  SET_DEFAULT_STATE,
  SET_FORM_FIELD,
  SET_BULK_FORM_FIELD,
  SET_LIST,
  SET_FORM_FIELD_UPDATE,
  SET_SEARCH_STRING,
} from "../Constants";

const initialState = {
  list: [],
  searchString: "",
  formFields: {},
  bulkFormFields: [],
};

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_STATE:
      return {
        list: [],
        searchString: "",
        formFields: {},
        bulkFormFields: [],
      };
    case SET_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case SET_FORM_FIELD:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [action.payload.name]: action.payload.value,
        },
      };
    case SET_FORM_FIELD_UPDATE:
      return {
        ...state,
        formFields: { ...state.formFields, ...action.payload },
      };
    case SET_BULK_FORM_FIELD:
      return {
        ...state,
        bulkFormFields: bulkFormFields.push(action.payload),
      };
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
      };
    default:
      return state;
  }
};

export default PageReducer;
