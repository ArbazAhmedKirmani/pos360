import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import useFormList from "../../../Hooks/useFormList";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";

const columnNames = [
  {
    title: "Variant Type Name",
    dataIndex: "VariantTypeName",
    key: "VariantTypeName",
  },
];

const VariantType = () => {
  const { formFields } = useSelector((state) => state.PageReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});

  const handleSearchField = (event) => {
    setSearchObject({
      ...searchObject,
      [event.name]: event.value,
    });
  };

  const searchSpace = (
    <Fragment>
      <FormInput
        name="VariantTypeName"
        label="Variant Type Name"
        required
        value={searchObject.VariantTypeName}
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
        name="VariantTypeName"
        label="Variant Type Name"
        required
        value={formFields.VariantTypeName}
        onChange={handleFormFields}
      />
    </Fragment>
  );

  const { Component } = useFormList(
    "VariantType",
    searchSpace,
    createForm,
    "VariantTypeId",
    columnNames,
    "small",
    searchObject,
    "20vw",
    true
  );

  return <div>{Component}</div>;
};

export default VariantType;
