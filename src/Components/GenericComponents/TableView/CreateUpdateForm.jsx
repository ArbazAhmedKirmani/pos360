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
      footer={
        //{/* Close and Save/Update Button */}
        <Row style={{ justifyContent: "flex-end" }}>
          <Button
            className="button"
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: props.isUpdate ? 130 : 100 }}
          >
            {props.isUpdate ? "Update" : "Save"}
          </Button>
          <Button className="button" onClick={props.onClose} size="large">
            Close
          </Button>
        </Row>
      }
    >
      <form onSubmit={props.onSubmit}>
        <Row>
          {/* Content goes here... */}
          {props.children}
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
};

export default CreateUpdateForm;
