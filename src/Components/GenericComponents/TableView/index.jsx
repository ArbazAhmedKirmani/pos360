import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Row } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "./tableView.css";
import PropTypes, { object } from "prop-types";
import { getTableColumnWithSorting } from "../../../Functions/ComponentFunctions/FormMethods";
import CreateUpdateForm from "./CreateUpdateForm";

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
    additionalSpace, // Space before Table and after Create Button
    createForm, // Creation Form
    updateForm, // Updation Form
    bulkForm, // Bulk Creation Form
    tableSize, // Size of the table
    tableLoading, // loading state of Table
    createUpdateDrawerWidth, // Drawer width of Create/Update Form
    bulkCreateDrawerWidth, // Drawer width for Bulk Create Form
    onCreateSubmit, // Create Form Submit Function
    onUpdateSubmit, // Update Form Submit Function
    onSearchSubmit, // Search Submit Function
    formLoading, // Form Loading state
    resetState, // main state function
  } = props;

  const [visible, setVisible] = useState(false);
  const [bulkVisible, setBulkVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [columnList, setColumnList] = useState([]);

  const editRow = (record) => {
    setUpdating(true);
    setVisible(!visible);
    editRowFunction(record);
  };

  const deleteRow = (record) => {
    deleteRowFunction(record);
  };

  useEffect(() => {
    let formColumn = getTableColumnWithSorting(columns, editRow, deleteRow);
    setColumnList([...formColumn]);
  }, [columns]);

  const toggleDrawer = () => {
    setVisible(!visible);
    setUpdating(false);
    resetState();
  };

  const toggleBulkDrawer = () => {
    setBulkVisible(!bulkVisible);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (updating) {
      onUpdateSubmit();
    } else {
      onCreateSubmit();
    }
  };

  const onBulkSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Fragment>
      {searchSpace && (
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottom: "0.5px solid #f1f1f1",
            paddingBottom: 10,
          }}
        >
          <form onSubmit={onSearchSubmit}>
            {searchSpace}
            <Button htmlType="submit">Search Submit</Button>
          </form>
        </Row>
      )}
      <div style={{ display: "flex" }}>{children}</div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          <Button
            className="button"
            type="primary"
            size="default"
            icon={<FormOutlined />}
            onClick={toggleDrawer}
          >
            Create
          </Button>
          {bulkCreate && (
            <Button
              className="button"
              type="secondary"
              size="default"
              icon={<FormOutlined />}
              onClick={toggleBulkDrawer}
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
      <Table
        columns={columnList}
        dataSource={rows}
        size={tableSize}
        loading={tableLoading}
        pagination={{
          pageSize: 20,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 20,
          responsive: ["xxl", "xl", "lg", "md", "sm"],
        }}
      />

      {/* Footer Component to be rendered here... */}
      {footerComponent}

      {/* Create Update Form */}
      <CreateUpdateForm
        loading={formLoading}
        isUpdate={updating}
        placement="right"
        onClose={toggleDrawer}
        visible={visible}
        width={createUpdateDrawerWidth}
        onSubmit={onSubmit}
      >
        {updating ? updateForm : createForm}
      </CreateUpdateForm>

      {/* Create Update Form */}
      <CreateUpdateForm
        loading={formLoading}
        placement="bottom"
        onClose={toggleBulkDrawer}
        visible={bulkVisible}
        height={bulkCreateDrawerWidth}
        onSubmit={onBulkSubmit}
      >
        {bulkForm}
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
  additionalSpace: PropTypes.element,
  bulkForm: PropTypes.element,
  tableSize: PropTypes.string,
  tableLoading: PropTypes.bool,
  createUpdateDrawerWidth: PropTypes.string,
  bulkCreateDrawerWidth: PropTypes.string,
  formLoading: PropTypes.bool,
};

export default TableView;
