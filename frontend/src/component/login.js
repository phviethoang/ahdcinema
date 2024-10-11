import React, { useState } from "react";
import "../login.css"; // Optional nếu bạn muốn thêm CSS riêng
import { Apple, Google, Microsoft } from "./icon";
import { Link } from "react-router-dom";
// import { FaFacebookF, FaGoogle } from 'react-icons/fa';

function Login() {
  // Khai báo state cho email và password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hàm xử lý khi form đăng nhập được submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra đơn giản: Email và Password phải được nhập
    if (email === "" || password === "") {
      setErrorMessage("Email và mật khẩu không được để trống");
    } else {
      setErrorMessage("");
      // Ở đây bạn có thể gọi API để xác thực thông tin đăng nhập
      console.log("Email:", email, "Password:", password);
    }
  };
  //  // Hàm xử lý đăng nhập bằng Facebook
  //  const handleFacebookLogin = () => {
  //   console.log('Đăng nhập bằng Facebook');
  //   // Ở đây bạn có thể tích hợp API đăng nhập bằng Facebook
  // };

  // // Hàm xử lý đăng nhập bằng Google
  // const handleGoogleLogin = () => {
  //   console.log('Đăng nhập bằng Google');
  //   // Ở đây bạn có thể tích hợp API đăng nhập bằng Google
  // };
  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <p className="forgot-password-link">
          <Link to="/forgot-password">Quên mật khẩu</Link>
        </p>
        <button type="submit">Đăng nhập</button>
        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>

        <div className="social-login">
          <div>OR</div>
          <button className="google-login">
            <Google />
            Continue with Google
          </button>
          <button className="microsoft-login">
            <Microsoft />
            Continue with Microsoft Account
          </button>
          <button className="apple-login">
            <Apple />
            Continue with Apple
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
