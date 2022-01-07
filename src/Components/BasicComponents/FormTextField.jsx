import { Col, Input } from "antd";
import React from "react";

const FormTextField = (props) => {
  let { span, label, placeholder, size, onChange, value } = props;
  return (
    <Col
      xl={span}
      md={span + span * 0.75}
      sm={span * 2}
      xs={span * 2}
      className="input"
    >
      <span>{label}</span>
      <Input
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={onChange}
      />
    </Col>
  );
};

export default FormTextField;
