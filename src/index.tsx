import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
