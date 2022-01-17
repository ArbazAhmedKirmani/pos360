import { Button, Tag } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import FormInput from "../../../Components/GenericComponents/FormFields/FormInput";
import FormSelect from "../../../Components/GenericComponents/FormFields/FormSelect";
import TableView from "../../../Components/GenericComponents/TableView";
import FormMethods from "../../../Functions/ComponentFunctions/FormMethods";
import useInputField from "../../../Hooks/useInputField";
import { TransformationMethods } from "../../../Functions/commonFunctions";
import { getSearchedData } from "../../../Services/user.service";

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
  const transformationMethod = new TransformationMethods();
  const [dataRows, setDataRows] = useState([]);
  const [statusList, setStatusList] = useState([]);
  // const [searchItems, setSearchItems] = useState({});
  let search = {};
  let form = {};

  const { ...searchFields } = useInputField();

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

  const submitSearchFields = (e) => {
    e.preventDefault();
    let queryString = transformationMethod.buildQueryStringFromObject(search);
    getSearchedData(queryString);
  };

  const handleSearchField = (event) => {
    search = { ...search, [event.name]: event.value };
  };

  const deleteRow = (record, index) => {
    console.log(record, " : ", index);
  };

  const SearchComponent = () => {
    return (
      <Fragment>
        <FormSelect
          name="status"
          label="Status"
          span={3}
          placeholder="Select Status"
          listArray={statusList}
          size="default"
          onChange={handleSearchField}
        />
        <FormInput
          span={4}
          label="Email"
          name="email"
          size="default"
          placeholder="abc@abc.com"
          onChange={handleSearchField}
        />
        <FormInput
          span={4}
          label="Full Name"
          name="fullname"
          size="default"
          placeholder="John Smith"
          onChange={handleSearchField}
        />
        <Button
          type="primary"
          htmlType="submit"
          size="default"
          icon={<SearchOutlined />}
        >
          Search
        </Button>
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
        searchFunction={submitSearchFields}
      />
    </div>
  );
};

export default React.memo(Users);
