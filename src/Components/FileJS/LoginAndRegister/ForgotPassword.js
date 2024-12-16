import React, { useState, useEffect } from "react";
import style from "../../FileCSS/LoginAndRegister/forgot-password.module.css"; // Optional nếu bạn muốn thêm CSS riêng
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ForgotPassword() {
  const navigate = useNavigate()
  const [Email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ở đây bạn có thể gọi API để gửi email reset mật khẩu
    console.log("Yêu cầu đặt lại mật khẩu cho email:", Email);
    // Kiểm tra đơn giản: Email phải được nhập
        if (Email === "") {
          alert("Email không được để trống");
        } else {
          try {
            // Gửi request đăng nhập đến BE
            const response = await fetch("http://localhost:5000/auth/forgot-password", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ Email }),
            });
            console.log(response.status)
            if (!response.ok) {
              // Xử lý lỗi từ BE
              const errorData = await response.json();
              throw new Error(errorData.message || "Lấy lại mật khẩu thất bại");
            }
      
            // Lấy dữ liệu phản hồi từ BE
            const notice = await response.json();
            console.log(notice.message);
      
            // Điều hướng sang trang khác sau khi quên mật khẩu thành công
            navigate("/Login");
          } catch (error) {
            console.error("Login error:", error);
          }
        }

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
            value={Email}
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