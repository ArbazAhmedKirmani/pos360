import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import FormSelect from "../../../Components/FormComponents/FormSelect";
import TableView from "../../../Components/GenericComponents/TableView";
import { showLinkedMessage } from "../../../Components/Messages";
import {
  getKeysAttached,
  getSelectListArray,
} from "../../../Functions/ComponentFunctions/FormMethods";
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
    title: "Company",
    dataIndex: "CompanyName",
    key: "CompanyName",
  },
  {
    title: "Total Branches",
    dataIndex: "TotalBranches",
    key: "TotalBranches",
  },
  {
    title: "No. of Terminals",
    dataIndex: "NoOfTerminals",
    key: "NoOfTerminals",
  },
];

const Company = () => {
  const { tableLoading, formLoading, list, searchString, formFields } =
    useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});
  const [countryList, setCountryList] = useState([]);

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

  const searchSpace = <Fragment></Fragment>;

  const handleFormFields = (event) => {
    dispatch(SET_FORM_FIELD_ACTION(event));
  };

  const createForm = (
    <Fragment>
      <FormInput
        label="Company Name"
        name="CompanyName"
        placeholder="ABC Company"
        span={10}
        value={formFields.CompanyName}
        onChange={handleFormFields}
        required={true}
      />
      <FormInput
        label="Total Branches"
        name="TotalBranches"
        placeholder="4"
        span={7}
        value={formFields.TotalBranches}
        onChange={handleFormFields}
        required={true}
      />
      <FormInput
        label="No. of Terminal"
        name="NoOfTerminals"
        span={7}
        type="number"
        placeholder="Quantity"
        value={formFields.NoOfTerminals}
        onChange={handleFormFields}
        required={true}
      />
      <FormSelect
        label="Country"
        name="CountryId"
        span={10}
        value={formFields.CountryId}
        onChange={handleFormFields}
        required={true}
        listArray={countryList}
      />
      {/* <DropUploadFilePicker span={4} /> */}
    </Fragment>
  );

  const getAllList = async () => {
    dispatch(TOGGLE_TABLE_LOADING_ACTION());
    await getAllData("Company")
      .then((response) => {
        dispatch(SET_LIST_ACTION(getKeysAttached(response)));
        dispatch(TOGGLE_TABLE_LOADING_ACTION());
      })
      .catch((error) => console.error(error));
  };

  useEffect(async () => {
    await getAllData("Country")
      .then((response) => {
        setCountryList(
          getSelectListArray(response, "CountryId", "CountryName")
        );
      })
      .catch((error) => console.error(error));
    getAllList();
    return () => dispatch(SET_DEFAULT_STATE_ACTION());
  }, []);

  const createFormSubmit = async () => {
    dispatch(TOGGLE_FORM_LOADING_ACTION());
    await createData(
      "Company",
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
    await deleteData("Company", record).then((response) => {
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
      "Company/" + formFields.CountryId,
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
      createUpdateDrawerWidth="40vw"
    />
  );
};

export default Company;
