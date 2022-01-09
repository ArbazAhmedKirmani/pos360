import React, { useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import FooterContent from "./FooterContent";
import { Breadcrumb } from "antd";
import { AppstoreFilled } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { TransformationMethods } from "../Functions/commonFunctions";

const MainContent = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const transformMethod = new TransformationMethods();
  let location;
  useEffect(() => {
    location = window.location.pathname.split("/");
    let array = [];
    let reminder = "";
    location.forEach((loc, index) => {
      array.push({
        name: transformMethod.capitalizeFirstLetter(loc).toString(),
        path: reminder + `${loc}/`,
      });
      reminder = `${loc}/`;
      setBreadcrumbs(array);
    });
  }, []);

  return (
    <div>
      <Content
        theme="light"
        style={{
          padding: "15px 20px",
          height: "Calc(100vh - 112px)",
        }}
      >
        <Breadcrumb separator=">">
          {breadcrumbs.map((data, index) => {
            let name =
              index === 0 ? (
                <Link to={"dashboard"}>
                  <AppstoreFilled />
                </Link>
              ) : (
                <Link to={data.path}>{data.name}</Link>
              );
            return <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Outlet />
      </Content>
      <FooterContent />
    </div>
  );
};

export default MainContent;
