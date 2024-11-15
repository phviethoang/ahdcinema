import React, { useState } from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';
import MemberInfo from './MemberInfo'
import MemberCard from './MemberCard'
import Header from '../header'
import Footer from '../footer'
function AhdMember() {
  const [visibleInfo, setVisibleInfo] = useState('info1'); 

  // Xử lý khi bấm nút
  const handleButtonClick = (info) => {
    setVisibleInfo(info);
  };

  return (
    
    < div className = {styles.mainContainer}>
      <Header></Header>
      <div className = {styles.mainBody}>
         <div>
          <button className = {styles.memberButton} onClick={() => handleButtonClick('info1')}>Thông tin tài khoản</button>
          <button className = {styles.memberButton} onClick={() => handleButtonClick('info2')}>Thẻ Thành viên</button>
        </div>

        {visibleInfo === 'info1' &&(
        <MemberInfo/>
        )}
        {visibleInfo === 'info2' &&(
          <MemberCard/>
        )}
      </div>
       
      <Footer></Footer>
    </div>
    
  );
}

export default AhdMember;
