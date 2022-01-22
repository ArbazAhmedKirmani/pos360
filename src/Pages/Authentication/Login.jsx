import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./authentication.css";
import { authRoute } from "../../Services/ServiceConfig";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitLogin = () => {
    authRoute(data).then(
      (success) => console.log(success),
      (error) => console.error(error)
    );
    // localStorage.setItem("posToken", );
    navigate("/dashboard");
  };
  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={submitLogin}
      >
        <Form.Item
          rules={[{ required: true, message: "Please input your Username" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            name="Username"
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your Password" }]}
        >
          <Input
            name="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Log in
          </Button>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form>
    </div>
  );
};

export default Login;
