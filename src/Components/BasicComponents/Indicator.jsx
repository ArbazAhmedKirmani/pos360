import React from "react";
import { Tooltip } from "antd";
import { string } from "prop-types";

const Indicator = (props) => {
  let { tooltip, color } = props;
  return (
    <Tooltip placement="bottom" title={tooltip}>
      <div
        style={{
          height: 20,
          width: 20,
          borderRadius: 2,
          background: { color },
        }}
      ></div>
    </Tooltip>
  );
};

Indicator.propTypes = {
  tooltip: string,
  color: string,
};

export default Indicator;
