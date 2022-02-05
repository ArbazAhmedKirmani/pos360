import { Button } from "antd";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./errors.css";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div className="container-404">
      <Button
        onClick={() => navigate(-1)}
        type="text"
        style={{
          fontSize: 32,
          color: "aliceblue",
          position: "absolute",
          left: 20,
          top: 20,
        }}
      >
        <ArrowLeftOutlined />
      </Button>
      <h1>404 Not Found</h1>
      <h2>Sorry! This URL doesn't exist :( </h2>
    </div>
  );
};

export default NotFound404;
