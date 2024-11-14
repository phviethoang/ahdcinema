import React, { useState } from "react";
import style from "../../FileCSS/LoginAndRegister/forgot-password.module.css"; // Optional nếu bạn muốn thêm CSS riêng
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây bạn có thể gọi API để gửi email reset mật khẩu
    console.log("Yêu cầu đặt lại mật khẩu cho email:", email);
  };

  return (
    <div className = {style.container}>
      <Header></Header>
      <div className={style.forgotPasswordContainer}>
      <p className={style.back}>
        <Link to="/Login">back</Link>
      </p>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Email của bạn:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email để lấy lại mật khẩu"
            required
          />
        </div>
        <button className = {style.button} type="submit">Gửi yêu cầu</button>
      </form>
    </div>
    <Footer></Footer>
    </div>
    
  );
}

export default ForgotPassword;