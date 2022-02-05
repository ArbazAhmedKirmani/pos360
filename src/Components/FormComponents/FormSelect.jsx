import { Col, Select } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const FormSelect = (props) => {
  let {
    label, // Component Label
    listArray, // Items Array
    span, // width of the component
    defaultValue, // Default Value
    loading, // Set Loading when performing action
    value, // Current Value
    onChange, // On Change Function
    disabled, // Disable the component
    size, // Size of the component
    placeholder, // Placeholder for COmponent
    name, // name of component
  } = props;

  const handleChange = (value, name) => {
    return onChange({ name, value });
  };

  return (
    <Col
      xl={span}
      lg={span}
      md={span * 0.75}
      sm={span / 2}
      style={{ padding: 3, marginTop: 15 }}
    >
      <span
        style={{
          position: "absolute",
          top: -18,
          fontSize: 14,
        }}
      >
        {label}
      </span>
      <Select
        name={name}
        placeholder={placeholder}
        placement="bottomRight"
        defaultValue={defaultValue}
        style={{ width: "100%" }}
        loading={loading}
        size={size}
        value={value}
        onChange={(value) => handleChange(value, name)}
        disabled={disabled}
      >
        {listArray &&
          listArray.length &&
          listArray.map((item, index) => (
            <Select.Option key={index} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
    </Col>
  );
};

FormSelect.propTypes = {
  listArray: PropTypes.array,
  span: PropTypes.number,
  defaultValue: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormSelect;
