import { Tag } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import FormInput from "../../../Components/GenericComponents/FormFields/FormInput";
import FormSelect from "../../../Components/GenericComponents/FormFields/FormSelect";
import TableView from "../../../Components/GenericComponents/TableView";
import FormMethods from "../../../Functions/ComponentFunctions/FormMethods";

const columnNames = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "roleRef",
    key: "roleRef",
    render: (x) => x.roleName,
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (x) => (
      <Tag color={x.isActive ? "green" : "red"}>
        {x.isActive ? "Active" : "In Active"}
      </Tag>
    ),
  },
];

const Users = () => {
  const formMethods = new FormMethods();
  const [dataRows, setDataRows] = useState([]);
  const [statusList, setStatusList] = useState([]);

  useEffect(async () => {
    function getRecords() {
      setDataRows(
        formMethods.getKeysAttached([
          {
            fullName: "Syed Arbaz Ahmed Kirmani",
            username: "admin",
            email: "arbaz.kirmani@gmail.com",
            isActive: true,
            roleRef: { roleName: "Super Administrator" },
          },
        ])
      );
    }
    getRecords();
    let statusList = formMethods.getSelectArrayList(
      [
        { userID: "1", userName: "Active" },
        { userID: "2", userName: "In Active" },
      ],
      "userID",
      "userName"
    );
    setStatusList([...statusList]);
  }, []);

  const deleteRow = (record, index) => {
    console.log(record, " : ", index);
  };

  const SearchComponent = () => {
    return (
      <Fragment>
        <FormSelect
          label="Status"
          span={3}
          placeholder="Select Status"
          listArray={statusList}
          size="large"
        />
        <FormInput
          span={4}
          label="Email"
          name="email"
          size="large"
          placeholder="abc@abc.com"
          type="email"
          // value={searchFields}
          // onChange={handleSearchFields}
        />
        <FormInput
          span={4}
          label="Full Name"
          name="fullname"
          size="large"
          placeholder="John Smith"
          // value={searchFields}
          // onChange={handleSearchFields}
        />
      </Fragment>
    );
  };

  const editRow = (record, index) => {
    console.log(record, " : ", index);
  };
  return (
    <div className="container">
      <TableView
        columns={columnNames}
        rows={dataRows}
        deleteRowFunction={deleteRow}
        editRowFunction={editRow}
        bulkCreate={true}
        createUpdateDrawerWidth="40vw"
        bulkCreateDrawerWidth="60vh"
        searchSpace={<SearchComponent />}
      />
    </div>
  );
};

export default Users;
