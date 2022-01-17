import React from "react";
import "./GenericDrawer.css";

const GenericDrawer = (props) => {
  return (
    <Drawer
      className="drawer-background"
      title={props.title}
      destroyOnClose={true}
      placement={props.placement}
      onClose={props.onClose}
      visible={props.visible}
      width={props.width}
      drawerStyle={{ margin: 100 }}
      footerStyle={{ backgroundColor: "white" }}
    >
      {props.children}
    </Drawer>
  );
};

export default GenericDrawer;
