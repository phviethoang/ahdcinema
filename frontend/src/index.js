import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./component/login"; // Đường dẫn đến file Login.js
import Register from "./component/Register"; // Đường dẫn đến file Register.js
import ForgotPassword from "./component/ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
      <Route path="/register" element={<Register />} /> Trang đăng ký
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
