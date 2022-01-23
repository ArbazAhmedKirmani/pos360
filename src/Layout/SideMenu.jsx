import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  ToolOutlined,
  LaptopOutlined,
  AppstoreFilled,
  SettingOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideMenu = ({ collapsed }) => {
  const app = useSelector((state) => state.AppReducer);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (app.menus.length === 0) {
      console.log("If", JSON.parse(localStorage.getItem("posMenu")));
      setMenuList(JSON.parse(localStorage.getItem("posMenu")));
    } else {
      console.log("Else: ", app.menus);
      setMenuList(app.menus);
    }
  }, []);

  return (
    <Sider theme="light" className="sidebar" collapsed={collapsed}>
      <Menu defaultSelectedKeys={["1"]} mode="inline" theme="light">
        {menuList.map((menu) => {
          if (
            menu.isChild === "False" &&
            menu.isParent === "False" &&
            menu.parentId === ""
          ) {
            return (
              <Menu.Item key={menu.menuId} icon={<AppstoreFilled />}>
                <NavLink to={menu.menuUrl}>{menu.menuName}</NavLink>
              </Menu.Item>
            );
          } else if (
            menu.isChild === "False" &&
            menu.isParent === "True" &&
            menu.parentId === ""
          ) {
            return (
              <SubMenu
                key={menu.menuId}
                icon={<ToolOutlined />}
                title={menu.menuName}
              >
                {menuList.map((menuChild) => {
                  if (
                    menuChild.isChild === "True" &&
                    menuChild.isParent === "False" &&
                    menuChild.parentId === menu.menuId
                  ) {
                    return (
                      <Menu.Item
                        key={menuChild.menuId}
                        icon={<AppstoreFilled />}
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

        <Menu.Item key="2" icon={<LaptopOutlined />}>
          <NavLink to="/pos">P O S</NavLink>
        </Menu.Item>
        <SubMenu key="sub1" icon={<ToolOutlined />} title="Setups">
          <Menu.Item key="abc">
            <NavLink to="/setup/users">Users</NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
