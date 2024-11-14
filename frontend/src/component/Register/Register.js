import React, { useState } from "react";
import styles from "../Register/Register.module.css"; // Import file CSS để tạo giao diện giống mẫu
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
    <div className={styles.pageContainer}>
      <div className={styles.registerForm}>
        <form onSubmit={handleSubmit}>
          <h2>Đăng Ký</h2>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Tên đăng nhập</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              id="confirmPassword"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel} style={{ margin: 0 }}>
              Email
            </label>
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
          {/* <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div> */}

          {/* <div className="form-group">
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
        </div> */}

          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div> */}

          {/* <div className="form-group">
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
        </div> */}
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

          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel}>
              <div class={styles.checkboxContainer}>
                <input type="checkbox" required />
              </div>
              <div>
                Tôi cam kết tuân theo chính sách bảo mật và điều khoản sử dụng
              </div>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Đăng Ký
          </button>
        </form>
        <p className={styles.loginLink}>
          <Link to="/login">Đã có tài khoản</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
