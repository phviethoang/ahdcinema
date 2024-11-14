import React from 'react';
import styles from '../../../FileCSS/BuyTicketPage/Step2/seat.module.css';

const Legend = () => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.checked}`}></span> Checked
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.selected}`}></span> Đã chọn
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.unavailable}`}>X</span> Không thể chọn
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.regular}`}></span> Thường
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.vip}`}></span> VIP
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendSeat} ${styles.sweetbox}`}></span> Sweetbox
      </div>
    </div>
  );
};

export default Legend;
