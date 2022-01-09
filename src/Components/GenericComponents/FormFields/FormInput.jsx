import React from "react";
import { Col, Input } from "antd";
import PropTypes from "prop-types";

/**
 * This component returns render the Input Field Component
 * @param {object} props props object {span, label, name, value, onChange, placeholder, type, className}
 * @returns JSX Element
 */
const FormInput = (props) => {
  let {
    span,
    label,
    name,
    value,
    onChange,
    placeholder,
    type,
    className,
    size,
    required,
  } = props;

  return (
    <Col
      xxl={span}
      xl={span}
      lg={span + span * 0.75}
      md={span + span * 0.75}
      sm={span + span / 2}
      style={{ padding: 3 }}
    >
      <span style={{ padding: "0 2px" }}>{label}</span>
      <Input
        className={className}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        size={size}
        required={required}
      />
    </Col>
  );
};

FormInput.propTypes = {
  span: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  required: PropTypes.bool,
};

export default FormInput;
