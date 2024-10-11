import React, { useState } from "react";
import "../forgot-password.css"; // Optional nếu bạn muốn thêm CSS riêng

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây bạn có thể gọi API để gửi email reset mật khẩu
    console.log("Yêu cầu đặt lại mật khẩu cho email:", email);
  };

  return (
    <div className="forgot-password-container">
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
        <button type="submit">Gửi yêu cầu</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
