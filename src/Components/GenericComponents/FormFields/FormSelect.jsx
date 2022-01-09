import { Col, Select } from "antd";
import React from "react";
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
  } = props;

  return (
    <Col
      xl={span}
      lg={span}
      md={span * 0.75}
      sm={span / 2}
      style={{ padding: 3 }}
    >
      <span style={{ padding: "0 2px" }}>{label}</span>
      <Select
        placeholder={placeholder}
        placement="bottomRight"
        defaultValue={defaultValue}
        style={{ width: "100%" }}
        loading={loading}
        size={size}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {listArray.map((item, index) => (
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
