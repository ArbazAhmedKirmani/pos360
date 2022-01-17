import React from "react";

const Dashboard = () => {
  const changeTheme = () => {
    window.less.modifyVars({ "@primary-color": "#dddddd" }).then(() => {
      alert("Theme Chnaged Su");
    });
  };
  return (
    <div className="container">
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
