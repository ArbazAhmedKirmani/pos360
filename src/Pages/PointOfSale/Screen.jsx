import { Col, Row } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";

const Screen = () => {
  return (
    <Layout>
      <Header>Header</Header>
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
