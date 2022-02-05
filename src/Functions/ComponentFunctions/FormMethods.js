import React, { useState } from "react";
import { Popconfirm, Space } from "antd";
import { Fragment } from "react";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

/**
 * This Method is used for getting the Array for Table Column when it was Provided by {name, dataIndex}[]
 * @param {{}[]} columnList list of column to be displayed
 * @param {Function} editFunction list of column to be displayed
 * @param {Function} deleteFunction list of column to be displayed
 * @returns Array of object to be passed for table columns
 */
//  * @param {Function} cancelDeleteFunction list of column to be displayed
export const getTableColumnWithSorting = (
  columnList,
  editFunction,
  deleteFunction
) => {
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
      key: "action",
      render: (index, record) => {
        return (
          <DeleteIconButton
            key={record + "-" + index}
            deleteFunction={() => deleteFunction(record)}
            editFunction={() => editFunction(record)}
            record={record}
          />
        );
      },
    };
    array.push(data);
  }
  return array;
};

/**
 * this function helps you to get an array for Dropdown / Select Component
 * @param {Object[]} array
 * @param {string} keyID value column name
 * @param {string} keyName display column name
 * @returns Array of Objects with id and name fields
 */
export const getSelectListArray = (array, keyID, keyName) => {
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

/**
 * this function is used to have key field in every object of a list
 * @param {[]]} array (array of objects) to include key field
 * @returns
 */
export const getKeysAttached = (array) => {
  let arr = [];
  array.forEach((item, index) => {
    item.key = index;
    arr.push(item);
  });
  return arr;
};

/**
 *
 * @param {Object} searchObject Object of search field
 * @returns {String} Search String
 */
export const getSearchString = (searchObject) => {
  let nameArray = Object.keys(searchObject);
  let mainArray = [];
  nameArray.forEach(
    (name) =>
      searchObject[name] &&
      searchObject[name] != "" &&
      mainArray.push(`${name}=${searchObject[name]}`)
  );
  return mainArray.join("&");
};

export const DeleteIconButton = (props) => {
  let { editFunction, deleteFunction, record, index, style } = props;
  const [isDelete, setIsDelete] = useState(false);
  const toggleDelete = () => {
    setIsDelete(!isDelete);
  };
  return (
    <Fragment>
      <Space size="large">
        <a onClick={() => editFunction(record, index)}>
          <EditFilled style={style || { fontSize: 16 }} />
        </a>
        <Popconfirm
          title="Are you sure to delete this Row?"
          onConfirm={() => {
            deleteFunction(record, index);
            toggleDelete();
          }}
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
