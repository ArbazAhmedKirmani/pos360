import { Col, Row } from "antd";
import { func } from "prop-types";
import { bool } from "prop-types";
import React from "react";
import Indicator from "../../Components/BasicComponents/Indicator";

const PosHeader = (props) => {
  let { online, handleBackButton } = props;
  return (
    <Row>
      <Col span={10}>
        <Row>
          <h1
            style={{ color: "white", fontSize: 38, cursor: "pointer" }}
            onClick={() => handleBackButton()}
          >
            {"< "}
          </h1>
          <h2 style={{ color: "white" }}>&nbsp;&nbsp;&nbsp; Point Of Sale</h2>
        </Row>
      </Col>
      <Col span={14}>
        <Row style={{ flexDirection: "row-reverse", padding: "20px 0" }}>
          {online ? (
            <Indicator tooltip="Online" color="green" />
          ) : (
            <Indicator tooltip="Offline" color="red" />
          )}
        </Row>
      </Col>
    </Row>
  );
};

PosHeader.propTypes = {
  online: bool,
  handleBackButton: func,
};

export default PosHeader;
