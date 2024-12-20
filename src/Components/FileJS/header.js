import styles from '../FileCSS/header.module.css';
import image from '../../img/logo.png';
import React, { forwardRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = forwardRef(({}, ref) => {
    const navigate = useNavigate();

    // Lấy userId từ cookie
    const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;

    // State chứa thông tin tài khoản
    const [userAccount, setUserAccount] = useState(null);

    // Fetch user account nếu userId tồn tại
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5000/auth/header?user_id=${userId}`, {
                credentials: 'include', // Gửi cookie
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => setUserAccount(data.user_account))
                .catch((error) => console.error('Error:', error));
        }
    }, [userId]);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        fetch(`http://localhost:5000/auth/logout?user_id=${userId}`, {
            method: 'DELETE',
            credentials: 'include', // Gửi cookie
        })
            .then((response) => {
                if (response.ok) {
                    // Xóa cookie
                    Cookies.remove('user_id');
                    setUserAccount(null);
                    alert("Đăng xuất thành công")
                    navigate('/'); // Điều hướng về trang chủ
                } else {
                    throw new Error('Đăng xuất thất bại');
                }
            })
            .catch((error) => console.error('Đăng xuất thất bại:', error));
    };

    return (
        <div ref={ref} className={styles.navBar}>
            {/* <div className={styles.display}></div> */}
            {/* <div className={styles.hello}>AHD xin chào</div> */}
            <div className={styles.logo}>
                <button className= {styles.logo} onClick={() => navigate('/')}src={image} alt="logo">AHD</button>
            </div>
            <div className={styles.buttonsList}>
                {/* <div className={styles.item}>
                    <button onClick={() => navigate('/')}>Home</button>
                </div> */}
                <div className={styles.item}>
                    <button onClick={() => navigate('/PhimDangChieu')}>Phim</button>
                </div>
                <div className={styles.item}>
                    <button onClick={() => navigate('/TheatersPage')}>Rạp phim</button>
                </div>
                <div className={styles.item}>
                    <button onClick={() => navigate('/MemberPage')}>Thành viên</button>
                </div>
                <div className={styles.item}>
                    <button onClick={() => navigate('/EventPage')}>Sự kiện</button>
                </div>
            </div>

            {/* Phần xử lý đăng nhập/đăng xuất */}
            <div className={styles.log}>
                {userAccount !== null? (
                    <>
                        <span className={styles.userAccount}>Chào, {userAccount}</span>
                        <button className={styles.logOut} onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <button className={styles.logIn} onClick={() => navigate('/Login')}>
                            Đăng nhập
                        </button>
                        <button className={styles.signIn} onClick={() => navigate('/Register')}>
                            Đăng ký
                        </button>
                    </>
                )}
            </div>
        </div>
    );
});

export default Header;