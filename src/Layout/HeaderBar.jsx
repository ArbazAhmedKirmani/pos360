import React, { createElement, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import whiteLogo from "../assets/images/logo-white.png";
import "./layout.css";

const HeaderBar = (props) => {
  let { collapsed, toggleSidebar } = props;
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => setOnline(navigator.onLine));
    window.addEventListener("offline", () => setOnline(navigator.onLine));
    return () => {
      window.removeEventListener("online");
      window.removeEventListener("offline");
    };
  }, []);
  return (
    <Row>
      <Col span={8}>
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => toggleSidebar(),
        })}
        <img src={whiteLogo} alt="logo" style={{ height: 15, width: "auto" }} />
      </Col>
      <Col span={16}>
        <Row style={{ flexDirection: "row-reverse" }}>
          <h3>{online ? "Connected" : "Disconnected"}</h3>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderBar;
