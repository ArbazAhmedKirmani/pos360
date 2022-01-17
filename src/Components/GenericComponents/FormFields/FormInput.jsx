import React, { useState } from "react";
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
    onChange,
    placeholder,
    type,
    className,
    size,
    required,
  } = props;

  const [input, setInput] = useState(null);

  const handleChange = (event) => {
    console.log(event.target);
    setInput(event.target.value);
    return onChange({ name: event.target.name, value: event.target.value });
  };

  return (
    <Col
      xxl={span}
      xl={span}
      lg={span + span * 0.75}
      md={span + span * 0.75}
      sm={span + span / 2}
      style={{ padding: 3 }}
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
      <Input
        className={className}
        name={name}
        placeholder={placeholder}
        value={input}
        onChange={handleChange}
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  required: PropTypes.bool,
};

export default React.memo(FormInput);
