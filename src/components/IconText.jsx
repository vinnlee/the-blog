import React from "react";
import { Icon } from "antd";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 5 }} />
    {text}
  </span>
);

export default IconText;
