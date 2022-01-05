import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { NavLink } from "react-router-dom";

const SideMenu = ({ collapsed }) => {
  return (
    <Sider theme="dark" className="sidebar" collapsed={collapsed}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="3">
            <NavLink to={"/setup/users"}>Users</NavLink>
          </Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <SubMenu key="sub1-2" title="Submenu">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">
            <NavLink to={"/setup/users"}>Users</NavLink>
          </Menu.Item>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
        <Menu.Item key="NavLink" icon={<LinkOutlined />}>
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design
          </a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
