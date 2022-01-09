import React, { Fragment } from "react";
import FormInput from "../../../Components/GenericComponents/FormFields/FormInput";
import TableView from "../../../Components/GenericComponents/TableView";

const columnNames = [
  {
    title: "Role Name",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Role Description",
    dataIndex: "roleDesc",
    key: "roleDesc",
  },
];

const Roles = () => {
  const SearchSpace = () => {
    return (
      <Fragment>
        <FormInput
          label="Role Name"
          name="roleName"
          size="large"
          placeholder="Role Name"
        />
      </Fragment>
    );
  };

  return (
    <div className="container">
      <TableView
        columns={columnNames}
        bulkCreate={true}
        searchSpace={<SearchSpace />}
      />
    </div>
  );
};

export default Roles;
