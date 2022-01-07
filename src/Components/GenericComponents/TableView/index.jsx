import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Row, Col } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import "./tableView.css";
import PropTypes, { object } from "prop-types";
import FormMethods from "../../../Functions/ComponentFunctions/FormMethods";
import CreateUpdateForm from "./CreateUpdateForm";
import FormInput from "../FormFields/FormInput";

/**
 * This Component render the main window of page with a table view and Create / Update Form
 * @param {object} props props object {columns, rows, deleteRowFunction, editRowFunction, bulkCreate, footerComponent, children, buttonRightFlex,searchSpace, searchFunction, additionalSpace}
 * @returns
 */
const TableView = (props) => {
  let {
    columns, // Column Fields array of object
    rows, // Data Rows array of object
    deleteRowFunction, // function for deleting the row
    editRowFunction, // function for editing the row
    bulkCreate, // show/hide bulk upload button
    footerComponent, // Space after Table
    children, // Space after Search Bar before Create Button
    buttonRightFlex, // Space to the right of the Create Button
    searchSpace, // Space before Search Bar
    searchFunction, // Search Function
    additionalSpace, // Space before Table and after Create Button
    createForm, // Creation Form
    updateForm, // Updation Form
  } = props;

  const formMethod = new FormMethods();

  const [visible, setVisible] = useState(false);
  const [bulkVisible, setBulkVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [columnList, setColumnList] = useState([]);
  const [searchFields, setSearchFields] = useState({});

  const editRow = (record, index) => {
    setUpdating(true);
    setVisible(!visible);
    editRowFunction(record, index);
  };

  const deleteRow = (record, index) => {
    deleteRowFunction(record, index);
  };

  useEffect(() => {
    let formColumn = formMethod.getTableColumnWithSorting(
      columns,
      editRow,
      deleteRow
    );
    setColumnList([...formColumn]);
  }, [columns]);

  const toggleDrawer = () => {
    setVisible(!visible);
    setUpdating(false);
  };

  const toggleBulkDrawer = () => {
    setBulkVisible(!bulkVisible);
  };

  const handleSearchFields = (event) => {
    setSearchFields({
      ...searchFields,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    console.log(searchFields);
  };

  return (
    <Fragment>
      <Row style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
        {searchSpace}
        {searchSpace && (
          <Col span={2} className="input">
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={() => searchFunction()}
            >
              Search
            </Button>
          </Col>
        )}
      </Row>
      <div style={{ display: "flex" }}>{children}</div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          <Button
            className="button"
            type="primary"
            size="large"
            icon={<FormOutlined />}
            onClick={toggleDrawer}
          >
            Create
          </Button>
          {bulkCreate && (
            <Button
              className="button"
              type="secondary"
              size="large"
              icon={<FormOutlined />}
              onClick={() => toggleBulkDrawer}
            >
              Bulk Create
            </Button>
          )}
        </div>
        <div style={{ display: "flex", flex: 2, justifyContent: "flex-end" }}>
          {buttonRightFlex}
        </div>
      </div>

      {/* Additional Space Before Data Table and after Create Button */}
      <div style={{ display: "flex" }}>{additionalSpace}</div>

      {/* Data Table */}
      <Table columns={columnList} dataSource={rows} size="default" />

      {/* Footer Component to be rendered here... */}
      {footerComponent}

      {/* Create Update Form */}
      <CreateUpdateForm
        isUpdate={updating}
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        width="30vw"
        onSubmit={onSubmit}
      >
        {updating ? updateForm : createForm}
      </CreateUpdateForm>
    </Fragment>
  );
};

TableView.propTypes = {
  columns: PropTypes.arrayOf(object),
  rows: PropTypes.arrayOf(object),
  deleteRowFunction: PropTypes.func,
  editRowFunction: PropTypes.func,
  bulkCreate: PropTypes.bool,
  footerComponent: PropTypes.element,
  children: PropTypes.element,
  buttonRightFlex: PropTypes.element,
  searchSpace: PropTypes.element,
  searchFunction: PropTypes.func,
  additionalSpace: PropTypes.element,
};

export default TableView;
