import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);

// Determine backend URL: Tauri injects it, otherwise fall back to localhost
const backendUrl =
  (typeof window !== "undefined" && (window as any).__OMH_BACKEND__) ||
  "http://localhost:3000";

if (typeof window !== "undefined") {
  (window as any).__OMH_BACKEND__ = backendUrl;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
