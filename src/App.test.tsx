import React from "react";
import reactDom from "react-dom";
import App from "./App";

test("renders learn react link", () => {
  const div = document.createElement("div");
  reactDom.render(<App />, div);
  reactDom.unmountComponentAtNode(div);
});
