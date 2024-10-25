import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo Bootstrap đã được import
import styles from './member.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


function MemberCard() {

  return (
<>
    <div> Bạn chưa có thẻ thành viên?</div>
    <div className = {styles.memTier}>
        <div className = {styles.memStandard}></div>
        <div className = {styles.memSilver}></div>
        <div className = {styles.memGold}></div>
    </div>
</>
  );
}

export default MemberCard;
