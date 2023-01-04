import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { StateWidthProvider } from "./context/StateWidthProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StateWidthProvider>
      <App />
    </StateWidthProvider>
  </React.StrictMode>,
);
