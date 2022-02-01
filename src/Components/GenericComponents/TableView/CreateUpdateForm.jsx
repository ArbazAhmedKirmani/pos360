import React from "react";
import { Button, Drawer, Row } from "antd";
import PropTypes from "prop-types";

const CreateUpdateForm = (props) => {
  return (
    <Drawer
      title={props.isUpdate ? "Updation Form" : "Creation Form"}
      placement={props.placement}
      onClose={props.onClose}
      visible={props.visible}
      width={props.width}
      bodyStyle={{ padding: "10px 15px" }}
      // footer={
      //   //{/* Close and Save/Update Button */}
      //   <Row style={{ justifyContent: "flex-end" }}>
      //     <Button
      //       className="button"
      //       type="primary"
      //       size="default"
      //       htmlType="submit"
      //       onClick={props.onSubmit}
      //       style={{ width: props.isUpdate ? 130 : 100 }}
      //     >
      //       {props.isUpdate ? "Update" : "Save"}
      //     </Button>
      //     <Button className="button" onClick={props.onClose} size="default">
      //       Close
      //     </Button>
      //   </Row>
      // }
    >
      <form
        onSubmit={props.onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Row
          style={{
            overflow: "auto",
          }}
        >
          {/* Content goes here... */}
          {props.children}
        </Row>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button
            loading={props.loading}
            className="button"
            type="primary"
            size="default"
            htmlType="submit"
            style={{ width: props.isUpdate ? 130 : 100 }}
          >
            {props.isUpdate ? "Update" : "Save"}
          </Button>
          <Button className="button" onClick={props.onClose} size="default">
            Close
          </Button>
        </Row>
      </form>
    </Drawer>
  );
};

CreateUpdateForm.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  width: PropTypes.string,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CreateUpdateForm;
