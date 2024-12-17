import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';
import MemberInfo from './MemberInfo'
import MemberCard from './MemberCard'
import WalletPage from './WalletPage'
import Header from '../header'
import Footer from '../footer'
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom';

function AhdMember() {
  const [visibleInfo, setVisibleInfo] = useState('info1'); 
  const [updateTrigger,setUpdateTrigger]=useState(0);

//BEGIN FETCH DATA
  //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [memberInfo, setMemberInfo] = useState([]);
  const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;
  const navigate = useNavigate();
  // Hàm fetch data GET thông tin cá nhân
  useEffect(() => {
    fetch(`http://localhost:5000/ahd/member-info?user_id=${userId}`, {
      credentials: 'include', // Đảm bảo gửi cookie
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            // Xử lý khi chưa đăng nhập
            console.error('Unauthorized. Redirecting to login...');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMemberInfo(data))
      .catch(error => console.error('Error:', error));
  }, [userId, updateTrigger]);
  // In ra các mảng kiểm tra
  console.log("Done fetching data ahd!")
  console.log("ahd: ",memberInfo)

  // Xử lý khi bấm nút
  const handleButtonClick = (info) => {
    setVisibleInfo(info);
  };
  const handleUpdate=()=>{
    setUpdateTrigger(pre=>pre+1)
  }

  return (
    <div className={styles.hungMainContainer}>
      <Header></Header>
      <div className={styles.hungContainer}>
        <div>
          <button className = {styles.memberButton} onClick={() => handleButtonClick('info1')}>Thông tin tài khoản</button>
          <button className = {styles.memberButton} onClick={() => handleButtonClick('info2')}>Thẻ Thành viên</button>
          <button className = {styles.memberButton} onClick={() => handleButtonClick('info3')}>Thông tin ví</button>
        </div>

        {visibleInfo === 'info1' &&(
        <MemberInfo
        onUpdate={handleUpdate}
        />
        )}
        {visibleInfo === 'info2' &&(
          <MemberCard
          memberInfo ={memberInfo}
          />
        )}
        {visibleInfo === 'info3' &&(
        <WalletPage useFor = "AHDMember"/>
        )}
        </div>
      
      <Footer></Footer>
    </div>
  );
}

export default AhdMember;
