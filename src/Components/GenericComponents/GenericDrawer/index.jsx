import React from "react";

const GenericDrawer = (props) => {
  return (
    <Drawer
      title={props.title}
      placement={props.placement}
      onClose={props.onClose}
      visible={props.visible}
      width={props.width}
    >
      {props.children}
    </Drawer>
  );
};

export default GenericDrawer;
