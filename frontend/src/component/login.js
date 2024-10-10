import React, { useState } from 'react';
import '../login.css'; // Optional nếu bạn muốn thêm CSS riêng
// import { FaFacebookF, FaGoogle } from 'react-icons/fa';

function Login() {
  // Khai báo state cho email và password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm xử lý khi form đăng nhập được submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra đơn giản: Email và Password phải được nhập
    if (email === '' || password === '') {
      setErrorMessage('Email và mật khẩu không được để trống');
    } else {
      setErrorMessage('');
      // Ở đây bạn có thể gọi API để xác thực thông tin đăng nhập
      console.log('Email:', email, 'Password:', password);
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
        <p className="register-link">
           <a href="/register">Quên mật khẩu?</a>
        </p>
        <button type="submit">Đăng nhập</button>
        <p className="register-link">
          Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
        
          <div className="social-login">
        <div>OR</div>
       < button className="google-login">
     <img src="google-icon-url" alt="Google" />
    Continue with Google
  </button>
  <button className="microsoft-login">
    <img src="microsoft-icon-url" alt="Microsoft" />
    Continue with Microsoft Account
  </button>
  <button className="apple-login">
    <img src="apple-icon-url" alt="Apple" />
    Continue with Apple
  </button>
</div>

      </form>
    </div>
  );
}

export default Login;
