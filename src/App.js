import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.less";
import AppRoutes from "./Routes/appRoutes.routes";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
}

export default App;
