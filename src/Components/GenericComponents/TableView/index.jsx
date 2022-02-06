import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Row } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "./tableView.css";
import {
  array,
  arrayOf,
  bool,
  element,
  func,
  object,
  string,
} from "prop-types";
import { getTableColumnWithSorting } from "../../../Functions/ComponentFunctions/FormMethods";
import CreateUpdateForm from "./CreateUpdateForm";

/**
 * This Component render the main window of page with a table view and Create / Update Form
 * @param {object} props
 *  [columns] : Column Fields array of object
 *  [rows] : Data Rows array of object
 *  [deleteRowFunction] : function for deleting the row
 *  [editRowFunction] : function for editing the row
 *  [showCreateButton] :
 *  [showBulkCreate] : show/hide bulk upload button
 *  [footerComponent] : Space after Table
 *  [children] : Space after Search Bar before Create Button
 *  [buttonRightFlex] : Space to the right of the Create Button
 *  [searchSpace] : Space before Search Bar
 *  [additionalSpace] : Space before Table and after Create Button
 *  [createFormField] : Creation Form
 *  [updateFormField] : Updation Form
 *  [bulkFormField] : Bulk Creation Form
 *  [tableSize] : Size of the table
 *  [tableLoading] : loading state of Table
 *  [createUpdateDrawerWidth] : Drawer width of Create/Update Form
 *  [bulkCreateDrawerWidth] : Drawer width for Bulk Create Form
 *  [onCreateSubmit] : Create Form Submit Function
 *  [onUpdateSubmit] : Update Form Submit Function
 *  [onSearchSubmit] : Search Submit Function
 *  [onBulkSubmit] : Search Submit Function
 *  [formLoading] : Form Loading state
 * @returns
 */
const TableView = (props) => {
  let {
    columns, // Column Fields array of object
    rows, // Data Rows array of object
    deleteRowFunction, // function for deleting the row
    editRowFunction, // function for editing the row
    showCreateButton,
    showBulkCreate, // show/hide bulk upload button
    footerComponent, // Space after Table
    children, // Space after Search Bar before Create Button
    buttonRightFlex, // Space to the right of the Create Button
    searchSpace, // Space before Search Bar
    additionalSpace, // Space before Table and after Create Button
    createFormField, // Creation Form
    updateFormField, // Updation Form
    bulkFormField, // Bulk Creation Form
    tableSize, // Size of the table
    tableLoading, // loading state of Table
    createUpdateDrawerWidth, // Drawer width of Create/Update Form
    bulkCreateDrawerWidth, // Drawer width for Bulk Create Form
    onCreateSubmit, // Create Form Submit Function
    onUpdateSubmit, // Update Form Submit Function
    onSearchSubmit, // Search Submit Function
    onBulkSubmit, // Bulk Form Submit Function
    formLoading, // Form Loading state
  } = props;

  const [visible, setVisible] = useState(false);
  const [bulkVisible, setBulkVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [columnList, setColumnList] = useState([]);

  const editRow = (record) => {
    editRowFunction(record);
    setUpdating(true);
    setVisible(!visible);
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
  };

  const toggleBulkDrawer = () => {
    setBulkVisible(!bulkVisible);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (updating) {
      await onUpdateSubmit();
    } else {
      await onCreateSubmit();
    }
    toggleDrawer();
  };

  const onBulkFormSubmit = (e) => {
    e.preventDefault();
    onBulkSubmit();
  };

  return (
    <Fragment>
      {searchSpace && (
        <form onSubmit={onSearchSubmit}>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "0.5px solid #f1f1f1",
              paddingBottom: 10,
            }}
          >
            {searchSpace}
            <Button htmlType="submit" type="primary" style={{ marginTop: 20 }}>
              Search Submit
            </Button>
          </Row>
        </form>
      )}
      <div style={{ display: "flex" }}>{children}</div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          {showCreateButton && (
            <Button
              className="button"
              type="primary"
              size="default"
              icon={<FormOutlined />}
              onClick={toggleDrawer}
            >
              Create
            </Button>
          )}

          {showBulkCreate && (
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
        scroll={{ x: 300 }}
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
        {updating ? updateFormField : createFormField}
      </CreateUpdateForm>

      {/* Create Update Form */}
      <CreateUpdateForm
        loading={formLoading}
        placement="bottom"
        onClose={toggleBulkDrawer}
        visible={bulkVisible}
        height={bulkCreateDrawerWidth}
        onSubmit={onBulkFormSubmit}
      >
        {bulkFormField}
      </CreateUpdateForm>
    </Fragment>
  );
};

TableView.propTypes = {
  columns: array,
  rows: array,
  deleteRowFunction: func,
  editRowFunction: func,
  showCreateButton: bool,
  showBulkCreate: bool,
  footerComponent: element,
  children: element,
  buttonRightFlex: element,
  searchSpace: element,
  additionalSpace: element,
  createFormField: element,
  updateFormField: element,
  bulkFormField: bool,
  tableSize: string,
  tableLoading: bool,
  createUpdateDrawerWidth: string,
  bulkCreateDrawerWidth: string,
  onCreateSubmit: func,
  onUpdateSubmit: func,
  onSearchSubmit: func,
  formLoading: bool,
  onBulkSubmit: func,
};

export default TableView;
