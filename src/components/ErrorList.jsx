import React from "react";
import { Icon } from "antd";

const ErrorList = props => {
  const items = Object.keys(props.items).map((item, index) => {
    return (
      <li key={index}>
        <Icon
          type="warning"
          style={{ fontSize: 18, color: "#ffc107", marginRight: 5 }}
        />
        <span style={{ textTransform: "capitalize" }}>{item}</span>{" "}
        {props.items[item]}
      </li>
    );
  });
  return (
    <div className="error-list">
      <ul>{items}</ul>
    </div>
  );
};

export default ErrorList;
