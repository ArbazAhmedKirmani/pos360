import React, { createElement, useEffect, useState } from "react";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MoreOutlined,
  UserOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import whiteLogo from "../assets/images/logo-white.png";
import "./layout.css";
import Indicator from "../Components/BasicComponents/Indicator";
import { useNavigate } from "react-router-dom";

const HeaderBar = (props) => {
  const navigate = useNavigate();
  let { collapsed, toggleSidebar } = props;
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => setOnline(navigator.onLine));
    window.addEventListener("offline", () => setOnline(navigator.onLine));
    return () => {
      window.removeEventListener("online", console.log("ofline"));
      window.removeEventListener("offline", console.log("ofline"));
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("posToken");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="3">
        <UserOutlined /> &nbsp; Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="0">
        <a onClick={logout}>
          <LogoutOutlined /> &nbsp; Logout
        </a>
      </Menu.Item>
    </Menu>
  );

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
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button type="text" style={{ margin: "10px 0" }}>
              <MoreOutlined style={{ color: "white", fontSize: 26 }} />
            </Button>
          </Dropdown>
          <h3>
            {online ? (
              <Indicator tooltip="Online" color="green" />
            ) : (
              <Indicator tooltip="Offline" color="red" />
            )}
          </h3>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderBar;
