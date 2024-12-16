import React, { useState } from "react";
import style from "../../FileCSS/LoginAndRegister/Register.module.css"; // Import file CSS để tạo giao diện giống mẫu
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    email: "",
    phonenumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nếu mật khẩu không khớp
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không trùng khớp!");
      return;
    } 
    console.log("Form Data Submitted:", formData);
    try {
      const { username: Username, password: Password, email: Email, fullname: Fullname, phonenumber: Phonenumber } = formData;
      // Gửi request đăng nhập đến BE
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username, Password, Email, Fullname, Phonenumber}),
      });
      console.log(response.status)
      if (response.ok) {
        const notice = await response.json();
        console.log("Register successful!", notice);
        navigate("/Login"); // Điều hướng đến trang login sau khi đăng ký thành công
      } else {
        const errorNotice = await response.json();
        alert(errorNotice.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
    }

  };

  return (
    <div className = {style.container}>
      <Header></Header>
      <div className={style.registerForm}>
        <form onSubmit={handleSubmit}>
          <h2>Đăng Ký</h2>
          <div className={style.formGroup}>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              id="confirmPassword"
            />
          </div>
          <div className={style.formGroup}>
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label style={{ margin: 0 }}>Email</label>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "12px",
                color: "#666",
                margin: 0,
              }}
            >
              *Vui lòng nhập đúng email cá nhân để khôi phục mật khẩu.
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>
              <input type="checkbox" required />
              Tôi cam kết tuân theo chính sách bảo mật và điều khoản sử dụng
            </label>
          </div>

          <button type="submit" className={style.submitButton}>
            Đăng Ký
          </button>
        </form>
        <p className={style.loginLink}>
          <Link to="/Login">Đã có tài khoản</Link>
        </p>
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default Register;