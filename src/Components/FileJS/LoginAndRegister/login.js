import React, { useState } from "react";
import { Apple, Facebook, Google, Microsoft } from "./icon";
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import style from '../../FileCSS/LoginAndRegister/login.module.css'
import { useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGoogle } from 'react-icons/fa';

function Login() {
  // Khai báo state cho email và password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

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
    <div className = {style.container}>
      <Header></Header>
      <div className={style.loginContainer}>
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Tài khoản:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập username"
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
          <p className={style.forgotPasswordLink}>
            <Link to="/ForgotPassword">Quên mật khẩu</Link>
          </p>
          <lbutton type="submit">Đăng nhập</lbutton>
          <p className={style.registerLink}>
            Bạn chưa có tài khoản? <Link to="/Register">Đăng ký</Link>
          </p>

          <div className={style.socialLogin}>
            <div>OR</div>
            <button className={style.googleLogin}>
              <Google />
              Continue with Google
            </button>
            <button className={style.facebookLogin}>
              <Facebook />
              Continue with Facebook
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
    
  );
}

export default Login;