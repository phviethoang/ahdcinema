import React, { useState } from 'react';
import styles from '../../FileCSS/MemberPage/WalletPage.module.css';
import topUpIcon from '../../../img/MemberInfoImage/topUpIcon.png';

const TopUpButton = ({ onHandleSetTopUp }) => {

  return (
      <button onClick={onHandleSetTopUp} className={styles.topUpButton}>
        <div style={{ fontSize: '14px' }}>Nạp thêm tiền</div>
        <img src={topUpIcon} className={styles.topUpIcon} />
      </button>
  );
};

export default TopUpButton;
