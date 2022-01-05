import React, { Fragment, useState } from "react";
import { Table, Button, Drawer, Input } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import "./tableView.css";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const TableView = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
      ellipsis: true,
    },
  ];
  return (
    <Fragment>
      <div className="row">
        <Input className="input" placeholder="Name" />
        <Input className="input" placeholder="Username" />
        <Input className="input" placeholder="Role" />
        <Input className="input" placeholder="Status" />
        <Input className="input" placeholder="CreatedAt" />
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="button"
          type="primary"
          size="large"
          icon={<FormOutlined />}
        >
          Bulk Create
        </Button>
        <Button
          className="button"
          type="primary"
          size="large"
          icon={<FormOutlined />}
          onClick={toggleDrawer}
        >
          Create
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        size="default"
      />
      <Drawer
        title="Create User"
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        width={"30vw"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Fragment>
  );
};

export default TableView;
