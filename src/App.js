import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.less";
import AppRoutes from "./Routes/appRoutes.routes";
import { Provider } from "react-redux";
import { createStore } from "redux";
import combineReducer from "./Redux/combineReducer";
import { reduxStoreInNonFunctionalFile } from "./Services/ServiceConfig";

const Store = createStore(combineReducer);

reduxStoreInNonFunctionalFile(Store);

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
