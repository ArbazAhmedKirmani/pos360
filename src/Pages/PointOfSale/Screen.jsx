import { Col, Row } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosHeader from "./PosHeader";
import PosProductScreenHeader from "./PosProductScreenHeader";

const Screen = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);

  const log = (name) => {
    console.error(name);
  };
  useEffect(() => {
    window.addEventListener("online", () => setOnline(navigator.onLine));
    window.addEventListener("offline", () => setOnline(navigator.onLine));
    return () => {
      window.removeEventListener("online", log("online"));
      window.removeEventListener("offline", log("offline"));
    };
  }, []);

  return (
    <Layout>
      <Header style={{ color: "white" }}>
        <PosHeader online={online} handleBackButton={() => navigate(-1)} />
      </Header>
      <Content style={{ height: "Calc(100vh - 134px)" }}>
        <Row>
          <Col
            span={18}
            style={{ background: "aliceblue", height: "Calc(100vh - 134px)" }}
          >
            <PosProductScreenHeader />
            Products
          </Col>
          <Col
            span={6}
            style={{ background: "lightgray", height: "Calc(100vh - 134px)" }}
          >
            Cart
          </Col>
        </Row>
      </Content>
      <Footer style={{ background: "lightblue" }}>Footer</Footer>
    </Layout>
  );
};

export default Screen;
