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
    console.log(location);
    let array = [];
    let reminder = "";
    location.forEach((loc, index) => {
      console.log("loc: ", loc);
      array.push({
        name: transformMethod.capitalizeFirstLetter(loc).toString(),
        path: reminder + `${loc}/`,
      });
      reminder = `${loc}/`;
      console.log(array);
      setBreadcrumbs(array);
    });
  }, []);

  return (
    <div>
      <Content
        theme="light"
        style={{
          padding: "10px 20px",
          height: "Calc(100vh - 64px)",
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
                data.name
              );
            return (
              <Breadcrumb.Item key={index}>
                {/* {name} */}
                <Link to={data.path}>{name}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <Outlet />
      </Content>
      <FooterContent />
    </div>
  );
};

export default MainContent;
