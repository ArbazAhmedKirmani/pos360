import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import useFormList from "../../../Hooks/useFormList";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";

const columnNames = [
  {
    title: "Variant Name",
    dataIndex: "VariantName",
    key: "VariantName",
  },
  {
    title: "Variant Type",
    dataIndex: "VariantTypeName",
    key: "VariantTypeName",
  },
];

const Variants = () => {
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
        label="Variant Name"
        placeholder="Variant Name"
        value={formFields.VariantName}
      />
    </Fragment>
  );

  const handleFormFields = (event) => {
    dispatch(SET_FORM_FIELD_ACTION(event));
  };

  const createForm = <Fragment></Fragment>;

  const { Component, getAllList } = useFormList(
    "Variant",
    searchSpace,
    createForm,
    "VariantId",
    columnNames,
    "small",
    searchObject,
    "50vw"
  );

  return <div>{Component}</div>;
};

export default Variants;
