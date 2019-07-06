import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const TheBlogFooter = React.memo(() => (
  <Footer className="footer">
    Made with{" "}
    <span role="img" aria-label="a laptop computer">
      💻
    </span>
    ,{" "}
    <span role="img" aria-label="a cup of tea">
      ☕
    </span>{" "}
    and{" "}
    <span role="img" aria-label="love">
      ❤️
    </span>{" "}
    by <a href="https://github.com/vinnlee/">Vincent Lee</a>
  </Footer>
));

export default TheBlogFooter;
