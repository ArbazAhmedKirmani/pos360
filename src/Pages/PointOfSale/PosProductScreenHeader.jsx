import { Button, Col, Row } from "antd";
import React from "react";
import FormSelect from "../../Components/GenericComponents/FormFields/FormSelect";

const PosProductScreenHeader = () => {
  return (
    <Row style={{ padding: 5 }}>
      <Col span={10}>
        <Row style={{ justifyContent: "space-evenly" }}>
          <Button size="large" type="primary">
            <b>HELD ORDER</b>
          </Button>
          <Button size="large" type="primary">
            <b>HOLD ORDER</b>
          </Button>
          <Button size="large" type="primary">
            <b>CLEAR ORDER</b>
          </Button>
          <Button size="large" type="primary">
            <b>RETURN ORDER</b>
          </Button>
        </Row>
      </Col>
      <Col xxl={12} xl={12} lg={12}>
        <Row style={{ justifyContent: "space-evenly" }}>
          {/* <FormSelect placeholder="Branches" /> */}
          <Button size="large" type="primary">
            <b>CUSTOMER</b>
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default PosProductScreenHeader;
