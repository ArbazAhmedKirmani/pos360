import React from "react";
import { Menu } from "antd";
import {
  ToolOutlined,
  CaretRightOutlined,
  AppstoreFilled,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { bool, func } from "prop-types";

import img from "../assets/images/logo-white.png";

const SideMenu = ({ collapsed, onCollapse }) => {
  const { menus, loginDetails } = useSelector((state) => state.AppReducer);

  return (
    <Sider
      className="sidebar"
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div
        style={{
          height: 58,
          margin: 4,
          background: "#020e1a",
          borderRadius: 2,
        }}
      >
        <img
          src={loginDetails.companyLogo}
          style={{
            textAlign: "center",
            height: 58,
            width: "auto",
            fontSize: 20,
            fontWeight: "bold",
            padding: 10,
            color: "white",
          }}
        />
      </div>
      <div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode={collapsed === false ? "inline" : "vertical"}
          theme="dark"
        >
          {menus.map((menu, index) => {
            if (
              menu.isChild === "False" &&
              menu.isParent === "False" &&
              menu.parentId === "-1"
            ) {
              return (
                <Menu.Item key={index} icon={<AppstoreFilled />}>
                  <NavLink to={menu.menuUrl}>
                    {collapsed === false && menu.menuName}
                  </NavLink>
                </Menu.Item>
              );
            } else if (
              menu.isChild === "False" &&
              menu.isParent === "True" &&
              menu.parentId === ""
            ) {
              return (
                <SubMenu
                  key={index}
                  icon={<ToolOutlined />}
                  title={collapsed === false && menu.menuName}
                >
                  {menus.map((menuChild, childIndex) => {
                    if (
                      menuChild.isChild === "True" &&
                      menuChild.isParent === "False" &&
                      menuChild.parentId === menu.menuId
                    ) {
                      return (
                        <Menu.Item
                          key={childIndex}
                          icon={<CaretRightOutlined />}
                        >
                          <NavLink to={menuChild.menuUrl}>
                            {menuChild.menuName}
                          </NavLink>
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </div>
    </Sider>
  );
};

SideMenu.propTypes = {
  onCollapse: func,
  collapsed: bool,
};

export default SideMenu;
