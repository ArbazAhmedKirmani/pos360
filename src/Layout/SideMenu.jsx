import React from "react";
import { Menu } from "antd";
import {
  ToolOutlined,
  LaptopOutlined,
  AppstoreFilled,
  SettingOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { NavLink } from "react-router-dom";

const SideMenu = ({ collapsed }) => {
  return (
    <Sider theme="dark" className="sidebar" collapsed={collapsed}>
      <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark">
        <Menu.Item key="1" icon={<AppstoreFilled />}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<LaptopOutlined />}>
          <NavLink to="/pos">P O S</NavLink>
        </Menu.Item>
        <SubMenu key="sub1" icon={<ToolOutlined />} title="Setups">
          <Menu.Item key="3">
            <NavLink to="/setup/users">Users</NavLink>
          </Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Configuration">
          <Menu.Item key="7">Roles</Menu.Item>
          <Menu.Item key="8">
            <NavLink to="/setup/users">Users</NavLink>
          </Menu.Item>
          <Menu.Item key="9">Roles Route Mapping</Menu.Item>
          <Menu.Item key="10">Side Menu</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
