import { Col, Input } from "antd";
import React from "react";
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
      xl={span}
      lg={span}
      md={span * 0.75}
      sm={span / 2}
      style={{ padding: 3 }}
    >
      <span>{label}</span>
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
