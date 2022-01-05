import React, { createElement, useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import HeaderBar from "./HeaderBar";
import MainContent from "./MainContent";
import "./layout.css";
import SideMenu from "./SideMenu";
import { Header } from "antd/lib/layout/layout";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="layout">
      <Header className="header site-layout-background">
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: toggleSidebar,
        })}
        <HeaderBar setCollapsed={setCollapsed} toggleSidebar={toggleSidebar} />
      </Header>
      <Layout>
        <SideMenu collapsed={collapsed} />
        <Layout>
          <MainContent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
