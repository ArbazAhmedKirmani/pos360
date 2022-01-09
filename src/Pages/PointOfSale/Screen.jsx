import { Col, Row } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Screen = () => {
  const navigate = useNavigate();
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
    <Layout>
      <Header style={{ color: "white" }}>
        <Row>
          <Col span={10}>
            <Row>
              <h1
                style={{ color: "white", fontSize: 38, cursor: "pointer" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                {"< "}
              </h1>
              <h2 style={{ color: "white" }}>
                &nbsp;&nbsp;&nbsp; Point Of Sale
              </h2>
            </Row>
          </Col>
          <Col span={14}>
            <Row style={{ flexDirection: "row-reverse", padding: "20px 0" }}>
              {online ? (
                <div
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 2,
                    background: "green",
                  }}
                ></div>
              ) : (
                <div
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 2,
                    background: "red",
                  }}
                ></div>
              )}
            </Row>
          </Col>
        </Row>
      </Header>
      <Content style={{ height: "Calc(100vh - 134px)" }}>
        <Row>
          <Col
            span={18}
            style={{ background: "aliceblue", height: "Calc(100vh - 134px)" }}
          >
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
