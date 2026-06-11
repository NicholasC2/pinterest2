import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./app.js";
import Login from "./login.js";

import "../static/navbar.css";
import "../static/colors.css";
import "../static/global.css";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById("root")!;

const root = createRoot(container);
root.render(<Root />);