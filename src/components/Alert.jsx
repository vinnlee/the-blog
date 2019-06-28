import React from "react";
import { notification, Icon } from "antd";

const alerSuccess = (
  message,
  description,
  icon = <Icon type="info-circle" theme="twoTone" />,
  duration = 2.5
) => {
  notification.open({
    message,
    description,
    icon,
    duration // time in seconds
  });
};

export default alerSuccess;
