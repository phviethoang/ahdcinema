import React, { useState } from "react";
import "../Register.css"; // Import file CSS để tạo giao diện giống mẫu
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    captcha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lấy các trường nhập liệu từ form
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Nếu mật khẩu không khớp
    if (formData.password !== formData.confirmPassword) {
      confirmPasswordInput.setCustomValidity("Mật khẩu không trùng khớp"); // Thiết lập thông báo lỗi
    } else {
      confirmPasswordInput.setCustomValidity(""); // Xóa thông báo lỗi nếu khớp
      console.log("Form Data Submitted:", formData);
    }

    // Đảm bảo rằng form vẫn có thể submit nếu các giá trị đúng
    confirmPasswordInput.reportValidity();
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h2>Đăng Ký</h2>

        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/*} <div className="form-group">
          <label>Mã xác thực</label>
          <input
            type="text"
            name="captcha"
            value={formData.captcha}
            onChange={handleChange}
            required
          />
          {/* Bạn có thể thay bằng một hình ảnh captcha thực tế 
        </div> */}

        <div className="form-group">
          <input type="checkbox" required />
          <label>
            Tôi cam kết tuân theo chính sách bảo mật và điều khoản sử dụng
          </label>
        </div>

        <button type="submit" className="submit-button">
          Đăng Ký
        </button>
      </form>
      <p className="login-link">
        <Link to="/login">Đã có tài khoản</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
