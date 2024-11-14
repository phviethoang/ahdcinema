import React, { useState } from "react";
import styles from "../ForgotPassword/ForgotPassword.module.css"; // Optional nếu bạn muốn thêm CSS riêng
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây bạn có thể gọi API để gửi email reset mật khẩu
    console.log("Yêu cầu đặt lại mật khẩu cho email:", email);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.ForgotPasswordContainer}>
        <p className="back">
          <Link to="/login">back</Link>
        </p>
        <h2>Quên mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email của bạn:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email để lấy lại mật khẩu"
              required
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
