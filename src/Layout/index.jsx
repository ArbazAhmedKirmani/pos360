import React, { useState } from "react";
import { Layout } from "antd";
import HeaderBar from "./HeaderBar";
import MainContent from "./MainContent";
import "./layout.css";
import SideMenu from "./SideMenu";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout">
      <Header className="header site-layout-background">
        <HeaderBar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </Header>
      <div style={{ display: "flex" }}>
        <SideMenu collapsed={collapsed} />
        <Layout>
          <MainContent />
        </Layout>
      </div>
    </Layout>
  );
};

export default MainLayout;
