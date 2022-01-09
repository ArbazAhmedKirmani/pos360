import React, { useState } from "react";
import { Popconfirm, Space } from "antd";
import { Fragment } from "react";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

export default class FormMethods {
  /**
   * This Method is used for getting the Array for Table Column when it was Provided by {name, dataIndex}[]
   * @param {{}[]} columnList list of column to be displayed
   * @param {Function} editFunction list of column to be displayed
   * @param {Function} deleteFunction list of column to be displayed
   * @returns Array of object to be passed for table columns
   */
  //  * @param {Function} cancelDeleteFunction list of column to be displayed
  getTableColumnWithSorting = (columnList, editFunction, deleteFunction) => {
    let array = columnList;
    // let isDelete = false;
    let data = {};
    if (
      array &&
      array[array.length - 1].title &&
      array[array.length - 1].title !== "Actions"
    ) {
      data = {
        title: "Actions",
        dataIndex: "action",
        key: "xyz",
        render: (record, index) => (
          <TableLastItem
            deleteFunction={deleteFunction}
            editFunction={editFunction}
            record={record}
            index={index}
          />
        ),
      };
      array.push(data);
    }
    return array;
  };

  /**
   * this function helps you to get an array for Dropdown / Select Component
   * @param {Object[]} array
   * @param {string} keyID
   * @param {string} keyName
   * @returns Array of Objects with id and name fields
   */
  getSelectArrayList = (array, keyID, keyName) => {
    let arr = [];
    if (typeof array[1] !== "object") return;
    array &&
      array.length &&
      array.forEach((object) => {
        let obj = { id: object[keyID], name: object[keyName] };
        arr.push(obj);
      });
    return arr;
  };

  getKeysAttached = (array) => {
    let arr = [];
    array.forEach((item, index) => {
      item.key = index;
      arr.push(item);
    });
    return arr;
  };
}

const TableLastItem = (props) => {
  let { editFunction, deleteFunction, record, index } = props;
  const [isDelete, setIsDelete] = useState(false);
  const toggleDelete = () => {
    setIsDelete(!isDelete);
  };
  return (
    <Fragment>
      <Space size="large">
        <a onClick={() => editFunction(record, index)}>
          <EditFilled style={{ fontSize: 16 }} />
        </a>
        <Popconfirm
          title="Are you sure to delete this Row?"
          onConfirm={() => deleteFunction(record, index)}
          onCancel={toggleDelete}
          okText="Yes"
          cancelText="No"
          placement="topRight"
          visible={isDelete}
        >
          <a onClick={toggleDelete}>
            <DeleteOutlined style={{ fontSize: 16 }} />
          </a>
        </Popconfirm>
      </Space>
    </Fragment>
  );
};
