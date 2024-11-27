import React, { useState } from 'react';
import styles from './member.module.css';
import MemberInfo from './MemberInfo'
import MemberCard from './MemberCard'
import WalletPage from './WalletPage'

function AhdMember() {
  const [visibleInfo, setVisibleInfo] = useState('info1'); 

  // Xử lý khi bấm nút
  const handleButtonClick = (info) => {
    setVisibleInfo(info);
  };

  return (
    <div>
      <div>
        <button className = {styles.memberButton} onClick={() => handleButtonClick('info1')}>Thông tin tài khoản</button>
        <button className = {styles.memberButton} onClick={() => handleButtonClick('info2')}>Thẻ Thành viên</button>
        <button className = {styles.memberButton} onClick={() => handleButtonClick('info3')}>Thông tin ví</button>
      </div>

      {visibleInfo === 'info1' &&(
      <MemberInfo/>
      )}
      {visibleInfo === 'info2' &&(
        <MemberCard/>
      )}
      {visibleInfo === 'info3' &&(
      <WalletPage useFor = "AHDMember"/>
      )}
    </div>
  );
}

export default AhdMember;
