import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const container = document.getElementById("root") as HTMLDivElement;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);

