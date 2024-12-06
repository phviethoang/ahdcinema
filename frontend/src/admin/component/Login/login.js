import React, { useState } from "react";
import styles from "../Login/login.module.css";
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
    <div className={styles.pageContainer}>
      <div className={styles.loginContainer}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Tài khoản:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <lbutton type="submit">Đăng nhập</lbutton>
        </form>
      </div>
    </div>
  );
}

export default Login;
