import { Input, Tag } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import FormInput from "../../../Components/GenericComponents/FormFields/FormInput";
import TableView from "../../../Components/GenericComponents/TableView";

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
  const [dataRows, setDataRows] = useState([]);

  useEffect(async () => {
    function getRecords() {
      setDataRows([
        ...[
          {
            fullName: "Syed Arbaz Ahmed Kirmani",
            username: "admin",
            email: "arbaz.kirmani@gmail.com",
            isActive: true,
            roleRef: { roleName: "Super Administrator" },
          },
        ],
      ]);
    }
    getRecords();
  }, []);

  const deleteRow = (record, index) => {
    console.log(record, " : ", index);
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
        searchSpace={
          <Fragment>
            <FormInput
              span={6}
              label="Full Name"
              name="fullname"
              size="large"
              placeholder="John Smith"
              // value={searchFields}
              // onChange={handleSearchFields}
            />
            <FormInput
              span={6}
              label="Email"
              name="email"
              size="large"
              placeholder="abc@abc.com"
              // value={searchFields}
              // onChange={handleSearchFields}
            />
          </Fragment>
        }
      />
    </div>
  );
};

export default Users;
