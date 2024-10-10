import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login';  // Đường dẫn đến file Login.js
 import Register from './component/Register';  // Đường dẫn đến file Register.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Trang đăng nhập */}
        <Route path="/register" element={<Register />} />  Trang đăng ký
      </Routes>
    </Router>
  );
}

export default App;
