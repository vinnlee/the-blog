import React from "react";
import { Icon, Tooltip } from "antd";

const IconText = ({ type, text, tooltip = false, title = "", ...rest }) => {
  if (tooltip) {
    return (
      <Tooltip title={title}>
        <Icon type={type} />
        <span style={{ paddingLeft: 5, cursor: "pointer" }}>{text}</span>
      </Tooltip>
    );
  }
  return (
    <span>
      <Icon type={type} style={{ marginRight: 5 }} {...rest} />
      {text}
    </span>
  );
};

export default IconText;
