import React from "react";
import whiteLogo from "../assets/images/logo-white.png";

const HeaderBar = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={whiteLogo} alt="logo" />
      </div>
    </div>
  );
};

export default HeaderBar;
