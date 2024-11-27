import React,{useState,useEffect} from 'react'
import styles from './WalletPage.module.css'
import clockIcon from './MemberInfoImage/clock.png'
const TransactionHistory = ({onSetHistoryOpen}) => {

    return (
        <button  className={styles.transactionHistoyButton} onClick ={onSetHistoryOpen}>
          <div style={{ fontSize: '14px' }}>Lịch sử giao dịch</div>
          <img src={clockIcon} className={styles.clockIcon} />
        </button>
    );
  };
  
  export default TransactionHistory;