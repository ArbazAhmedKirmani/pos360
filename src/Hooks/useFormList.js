import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableView from "../Components/GenericComponents/TableView";
import {
  getKeysAttached,
  getSearchString,
} from "../Functions/ComponentFunctions/FormMethods";
import {
  SET_DEFAULT_STATE_ACTION,
  SET_FORM_FIELD_UPDATE_ACTION,
  SET_LIST_ACTION,
} from "../Redux/Actions/PageAction";
import {
  createData,
  deleteData,
  getAllData,
  updateData,
} from "../Services/generalService";
import useLoading from "./useLoading";

/**
 *
 * @param {String} endpoint
 * @param {Element} searchFields
 * @param {Element} createForm
 * @param {String} IDkey
 * @param {[]} columnNames
 * @param {String} tableSize
 * @param {{}} searchObject
 * @param {String} formWidth
 * @param {Element} bulkFormFields
 * @returns
 */
const useFormList = (
  endpoint,
  searchFields,
  createForm,
  IDkey,
  columnNames,
  tableSize,
  searchObject,
  formWidth,
  queryCompany,
  bulkFormFields
) => {
  const { loginDetails } = useSelector((state) => state.AppReducer);
  const { list, formFields } = useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();
  const [formLoading, toggleFormLoading, stopFormLoading] = useLoading(false);
  const [tableLoading, toggleTableLoading, stopTableLoading] =
    useLoading(false);

  const getEndpoint = (endpnt, type, data) => {
    let endpointString = "";
    if (queryCompany === true) {
      switch (type) {
        case "get":
          return (endpointString = `${endpnt}?CompanyId=${loginDetails.companyId}`);
        case "post":
          return (endpointString = `${endpnt}?CompanyId=${loginDetails.companyId}`);
        case "put":
          if (data !== undefined)
            return (endpointString = `${endpnt}/${data[IDkey]}?CompanyId=${loginDetails.companyId}`);
        case "delete":
          return (endpointString = `${endpnt}?CompanyId=${loginDetails.companyId}`);
        default:
          break;
      }
    } else {
      switch (type) {
        case "get":
          return (endpointString = `${endpnt}`);
        case "post":
          return (endpointString = `${endpnt}`);
        case "put":
          if (data !== undefined)
            return (endpointString = `${endpnt}/${data[IDkey]}`);
        case "delete":
          return (endpointString = `${endpnt}`);
        default:
          break;
      }
    }
    // return endpointString
  };

  /**
   * for getting latest endpoint List
   * @param {String} endpointString Endpoint String
   */
  const getAllList = async (endpointString) => {
    try {
      toggleTableLoading();
      await getAllData(getEndpoint(endpointString, "get"), stopTableLoading)
        .then((response) => {
          dispatch(SET_LIST_ACTION(getKeysAttached(response)));
        })
        .catch((error) => {
          toggleTableLoading();
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllList(endpoint);
    return () => dispatch(SET_DEFAULT_STATE_ACTION());
  }, []);

  const createFormSubmit = async () => {
    try {
      toggleFormLoading();
      await createData(
        getEndpoint(endpoint, "post"),
        formFields,
        stopFormLoading
      )
        .then((response) => {
          getAllList(endpoint);
          dispatch(SET_DEFAULT_STATE_ACTION());
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteListItem = async (record) => {
    try {
      toggleTableLoading();
      await deleteData(
        getEndpoint(endpoint, "put", record),
        record,
        stopTableLoading
      ).then((response) => {
        getAllList(endpoint);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editRow = async (record) => {
    dispatch(SET_FORM_FIELD_UPDATE_ACTION(record));
  };

  const updateFormSubmit = async () => {
    try {
      toggleFormLoading();
      await updateData(
        getEndpoint(endpoint, "put", formFields),
        formFields,
        stopFormLoading
      ).then((response) => {
        getAllList(endpoint);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    let query = endpoint + "?" + getSearchString(searchObject);
    getAllList(query);
  };

  return {
    Component: (
      <TableView
        columns={columnNames}
        rows={list}
        searchSpace={searchFields}
        tableLoading={tableLoading}
        formLoading={formLoading}
        onSearchSubmit={searchSubmit}
        tableSize={tableSize}
        showCreateButton
        createFormField={createForm}
        updateFormField={createForm}
        onCreateSubmit={createFormSubmit}
        onUpdateSubmit={updateFormSubmit}
        deleteRowFunction={deleteListItem}
        editRowFunction={editRow}
        bulkFormFields={bulkFormFields}
        createUpdateDrawerWidth={formWidth}
      />
    ),
    getAllList,
  };
};

export default useFormList;
