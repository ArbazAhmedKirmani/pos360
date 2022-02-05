import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./authentication.css";
import { authRoute } from "../../Services/ServiceConfig";
import { useDispatch } from "react-redux";
import {
  SET_APP_INFORMATION,
  SET_APP_MENUS,
} from "../../Redux/Actions/AppAction";
import { showLinkedMessage } from "../../Components/Messages";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitLogin = () => {
    setIsLoading(!isLoading);
    showLinkedMessage("loading", "Signing In", "signin");
    authRoute(data).then(
      (success) => {
        let { loginDetails, menu, token } = success.data.Data;
        dispatch(SET_APP_INFORMATION(loginDetails));
        dispatch(SET_APP_MENUS(menu));
        localStorage.setItem("posLoginDetail", JSON.stringify(loginDetails));
        localStorage.setItem("posMenu", JSON.stringify(menu));
        localStorage.setItem("posToken", token.tokenValue);
        setIsLoading(!isLoading);
        showLinkedMessage("success", "SignIn Successful", "signin");
        navigate("/dashboard");
      },
      (error) => {
        console.error(error);
        setIsLoading(!isLoading);
        openLinkedMessage("error", "Something went wrong", "signin");
      }
    );
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
            loading={isLoading}
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
