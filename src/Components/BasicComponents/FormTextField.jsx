import { Col, Input } from "antd";
import { any } from "prop-types";
import { bool, func, number, string } from "prop-types";
import React from "react";

const FormTextField = (props) => {
  let {
    span,
    label,
    placeholder,
    size,
    onChange,
    value,
    required,
    type,
    disabled,
  } = props;

  const handleChange = (event) => {
    onChange({ name: event.target.name, value: event.target.value.trim() });
  };

  return (
    <Col
      xl={span}
      md={span + span * 0.75}
      sm={span * 2}
      xs={span * 2}
      className="input"
    >
      <span style={{ fontSize: 13, letterSpacing: 1 }}>{label}</span>
      <Input
        placeholder={placeholder}
        size={size}
        type={type}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      />
    </Col>
  );
};

FormTextField.propTypes = {
  span: number,
  label: string,
  placeholder: string,
  size: string,
  onChange: func,
  value: any,
  required: bool,
  type: string,
  disabled: bool,
};

export default FormTextField;
