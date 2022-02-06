import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormList from "../../../Hooks/useFormList";
import FormInput from "../../../Components/FormComponents/FormInput";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";

const columnNames = [
  {
    title: "Category",
    dataIndex: "CountryName",
    key: "CountryName",
  },
];

const Department = () => {
  const { formFields } = useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});

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

  const createForm = <Fragment></Fragment>;

  const { Component } = useFormList(
    "Department",
    searchSpace,
    createForm,
    "Department",
    columnNames,
    "small",
    searchObject
  );

  return <div>{Component}</div>;
};

export default Department;
