import {
  TOGGLE_FORM_LOADING,
  TOGGLE_TABLE_LOADING,
  SET_DEFAULT_STATE,
  SET_FORM_FIELD,
  SET_BULK_FORM_FIELD,
  SET_LIST,
  SET_FORM_FIELD_UPDATE,
} from "../Constants";

const initialState = {
  tableLoading: false,
  formLoading: false,
  list: [],
  searchString: "",
  formFields: {},
  bulkFormFields: [],
};

const PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_STATE:
      return {
        ...state,
        formFields: {},
        bulkFormFields: [],
      };
    case TOGGLE_FORM_LOADING:
      return {
        ...state,
        formLoading: !state.formLoading,
      };
    case TOGGLE_TABLE_LOADING:
      return {
        ...state,
        tableLoading: !state.tableLoading,
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
    default:
      return state;
  }
};

export default PageReducer;
