import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./app";
import Login from "./login";

import '/static/navbar.css'
import '/static/colors.css'
import '/static/global.css'

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);