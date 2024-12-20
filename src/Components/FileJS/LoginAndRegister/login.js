import React, { useState } from "react";
import { Apple, Facebook, Google, Microsoft } from "./icon";
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import style from '../../FileCSS/LoginAndRegister/login.module.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import { FaFacebookF, FaGoogle } from 'react-icons/fa';

function Login() {
  // Khai báo state cho Username và Password
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  // Hàm xử lý khi form đăng nhập được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log([Username, Password])
    // Kiểm tra đơn giản: Email và Password phải được nhập
    if (Username === "" || Password === "") {
      setErrorMessage("Email và mật khẩu không được để trống");
    } else {
      setErrorMessage("");
      // Ở đây bạn có thể gọi API để xác thực thông tin đăng nhập
      console.log("Email:", Username, "Password:", Password);
      try {
        // Gửi request đăng nhập đến BE
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Username, Password }),
          credentials: 'include', // Gửi kèm cookie
        });
        console.log(response.status)
        if (!response.ok) {
          // Xử lý lỗi từ BE
          const errorData = await response.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }
  
        // Lấy dữ liệu phản hồi từ BE
        const data = await response.json();
        console.log("Login successful!", data);
  
        // Lưu user_id vào cookie nếu cần
        const userId = data.user_id;
        if (userId) {
          Cookies.set('user_id', userId, { path: '/', sameSite: 'Lax' });
        }
  
        // Điều hướng sang trang khác sau khi đăng nhập thành công
        const tem = sessionStorage.getItem('redirectedLink')
        if(tem) navigate(tem)
        else navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(error.message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    }
  };
  const handleGoogleLogin = () => {
    // Chuyển hướng tới route xác thực Google
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleFacebookLogin = () => {
    // Chuyển hướng tới route xác thực Facebook
    window.location.href = "http://localhost:5000/auth/facebook";
  };


  return (
    <div className = {style.container}>
      <Header></Header>
      <div className={style.loginContainer}>
        <div className = {style.h2}>
        <h2>Đăng Nhập</h2>

        <div className={style.socialLogin}>
            
             <button className={style.googleLogin} onClick={handleGoogleLogin}>
              <Google />
              Google
            </button>
            <button className={style.facebookLogin} onClick={handleFacebookLogin}>
              <Facebook />
              Facebook
            </button>
            </div>
          <button className={style.registerLink} onClick={()=>{navigate("/Register")}}>Đăng ký</button>
       
        </div>
        
        <form className = {style.form}
        onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Tài khoản:</label>
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username"
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}
          <p className={style.forgotPasswordLink}>
            <Link to="/ForgotPassword">Quên mật khẩu</Link>
          </p>
          <button className = {style.submit} type="submit">Gửi</button>
          

          
        </form>
      </div>
      <Footer></Footer>
    </div>
    
  );
}

export default Login;