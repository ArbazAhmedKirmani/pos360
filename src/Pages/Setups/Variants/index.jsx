import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../Components/FormComponents/FormInput";
import FormSelect from "../../../Components/FormComponents/FormSelect";
import { getSelectListArray } from "../../../Functions/ComponentFunctions/FormMethods";
import useFormList from "../../../Hooks/useFormList";
import { SET_FORM_FIELD_ACTION } from "../../../Redux/Actions/PageAction";
import { getAllWithCompany } from "../../../Services/ServiceConfig";

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
  const { loginDetails } = useSelector((state) => state.AppReducer);
  const dispatch = useDispatch();

  const [searchObject, setSearchObject] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);
  const [variantTypeList, setVariantTypeList] = useState([]);

  useEffect(() => {
    setSearchLoading(true);
    getAllWithCompany("VariantType", loginDetails.companyId).then(
      (response) => {
        setVariantTypeList(
          getSelectListArray(
            response.data.Data,
            "VariantTypeId",
            "VariantTypeName"
          )
        );
        setSearchLoading(false);
      }
    );
  }, []);

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
        name="VariantName"
        placeholder="Variant Name"
        value={searchObject.VariantName}
        onChange={handleSearchField}
      />
      <FormSelect
        name="VariantTypeId"
        label="Variant Type"
        span={5}
        loading={searchLoading}
        listArray={variantTypeList}
        value={searchObject.VariantTypeId}
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
        label="Variant Name"
        name="VariantName"
        placeholder="Variant Name"
        value={formFields.VariantName}
        onChange={handleFormFields}
      />
      <FormSelect
        name="VariantTypeId"
        label="Variant Type"
        span={5}
        loading={searchLoading}
        listArray={variantTypeList}
        value={formFields.VariantTypeId}
        onChange={handleFormFields}
      />
    </Fragment>
  );

  const { Component } = useFormList(
    "Variant",
    searchSpace,
    createForm,
    "VariantId",
    columnNames,
    "small",
    searchObject,
    "50vw",
    true
  );

  return <div>{Component}</div>;
};

export default Variants;
