import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormList from "../../../Hooks/useFormList";
import FormInput from "../../../Components/FormComponents/FormInput";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";

const columnNames = [
  {
    title: "Country",
    dataIndex: "CountryName",
    key: "CountryName",
  },
];

const Country = () => {
  const { formFields } = useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});

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
        name="CountryName"
        label="Country Name"
        placeholder="Country Name"
        value={searchObject.CountryName}
        onChange={handleSearchField}
      />
    </Fragment>
  );

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

  const { Component } = useFormList(
    "Country",
    searchSpace,
    createForm,
    "CountryId",
    columnNames,
    "small",
    searchObject
  );

  return <div>{Component}</div>;
};

export default Country;
