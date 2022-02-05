import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import FormSelect from "../../../Components/FormComponents/FormSelect";
import { getSelectListArray } from "../../../Functions/ComponentFunctions/FormMethods";
import useFormList from "../../../Hooks/useFormList";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";
import { getAllData } from "../../../Services/generalService";
import { getAll } from "../../../Services/ServiceConfig";

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
  const { formFields } = useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getAll("Country").then((response) =>
      setCountryList(
        getSelectListArray(response.data.Data, "CountryId", "CountryName")
      )
    );
  }, []);

  const handleSearchField = (event) => {
    setSearchObject({
      ...searchObject,
      [event.name]: event.value,
    });
  };

  const handleFormFields = (event) => {
    dispatch(SET_FORM_FIELD_ACTION(event));
  };

  const searchSpace = (
    <Fragment>
      <FormInput
        label="Company Name"
        name="CompanyName"
        placeholder="ABC Company"
        span={5}
        value={searchObject.CompanyName}
        onChange={handleSearchField}
        required={true}
      />
      <FormInput
        label="No. of Terminal"
        name="NoOfTerminals"
        span={5}
        type="number"
        placeholder="Quantity"
        value={searchObject.NoOfTerminals}
        onChange={handleSearchField}
        required={true}
      />
    </Fragment>
  );

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
        type="number"
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

  const { Component } = useFormList(
    "Company",
    searchSpace,
    createForm,
    "CompanyId",
    columnNames,
    "small",
    searchObject,
    "40vw"
  );

  return <div>{Component}</div>;
};

export default Company;
