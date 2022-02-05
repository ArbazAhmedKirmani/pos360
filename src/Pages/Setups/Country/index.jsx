import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import TableView from "../../../Components/GenericComponents/TableView";
import { showLinkedMessage } from "../../../Components/Messages";
import { getKeysAttached } from "../../../Functions/ComponentFunctions/FormMethods";
import {
  SET_DEFAULT_STATE_ACTION,
  SET_FORM_FIELD_ACTION,
  SET_FORM_FIELD_UPDATE_ACTION,
  SET_LIST_ACTION,
  TOGGLE_FORM_LOADING_ACTION,
  TOGGLE_TABLE_LOADING_ACTION,
} from "../../../Redux/Actions/PageAction";
import {
  createData,
  deleteData,
  getAllData,
  updateData,
} from "../../../Services/generalService";

const columnNames = [
  {
    title: "Country",
    dataIndex: "CountryName",
    key: "CountryName",
  },
];

const Country = () => {
  const { tableLoading, formLoading, list, searchString, formFields } =
    useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});

  const MODEL = {
    Code: null,
    CompanyId: 3,
    CompanyLogo: null,
    CompanyName: "",
    CountryId: "",
    IsActive: true,
    NoOfTerminals: null,
    TotalBranches: null,
  };

  const handleSearchField = (event) => {
    setSearchObject({
      ...searchObject,
      [event.name]: event.value,
    });
  };

  const searchSpace = (
    <Fragment>
      <FormInput
        name="CountryName"
        label="Country Name"
        placeholder="Country Name"
        value={searchObject.CountryName}
        onChange={handleSearchField}
      />
    </Fragment>
  );

  const handleFormFields = (event) => {
    dispatch(SET_FORM_FIELD_ACTION(event));
  };

  const createForm = (
    <Fragment>
      <FormInput
        name="CountryName"
        label="Country Name"
        placeholder="Country Name"
        value={formFields.CountryName}
        onChange={handleFormFields}
      />
    </Fragment>
  );

  const getAllList = async () => {
    dispatch(TOGGLE_TABLE_LOADING_ACTION());
    await getAllData("Country")
      .then((response) => {
        dispatch(SET_LIST_ACTION(getKeysAttached(response)));
        dispatch(TOGGLE_TABLE_LOADING_ACTION());
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllList();
    return () => dispatch(SET_DEFAULT_STATE_ACTION());
  }, []);

  const createFormSubmit = async () => {
    dispatch(TOGGLE_FORM_LOADING_ACTION());
    await createData(
      "Country",
      formFields,
      dispatch(TOGGLE_FORM_LOADING_ACTION())
    )
      .then((response) => {
        getAllList();
        dispatch(TOGGLE_FORM_LOADING_ACTION());
        dispatch(SET_DEFAULT_STATE_ACTION());
      })
      .catch((error) => console.error(error));
  };

  const deleteListItem = async (record) => {
    dispatch(TOGGLE_TABLE_LOADING_ACTION());
    await deleteData("Country", record).then((response) => {
      dispatch(TOGGLE_TABLE_LOADING_ACTION());
      getAllList();
    });
  };

  const editRow = async (record) => {
    console.log("record: ", record);
    dispatch(SET_FORM_FIELD_UPDATE_ACTION(record));
  };

  const updateFormSubmit = async () => {
    dispatch(TOGGLE_FORM_LOADING_ACTION());
    await updateData(
      "Country/" + formFields.CountryId,
      formFields,
      dispatch(TOGGLE_FORM_LOADING_ACTION())
    ).then((response) => {
      dispatch(TOGGLE_TABLE_LOADING_ACTION());
      getAllList();
    });
  };

  const seacrhSubmit = () => {};

  return (
    <TableView
      columns={columnNames}
      rows={list}
      searchSpace={searchSpace}
      tableLoading={tableLoading}
      formLoading={formLoading}
      onSearchSubmit={seacrhSubmit}
      tableSize="small"
      showCreateButton
      createFormField={createForm}
      updateFormField={createForm}
      onCreateSubmit={createFormSubmit}
      onUpdateSubmit={updateFormSubmit}
      deleteRowFunction={deleteListItem}
      editRowFunction={editRow}
    />
  );
};

export default Country;
