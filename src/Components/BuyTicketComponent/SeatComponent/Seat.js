import React from 'react';
import styles from './seat.module.css';

const Seat = ({ seatNumber, seatType, isChecked, toggleSeatSelection }) => {
  // Xác định lớp CSS cho loại ghế và trạng thái đã chọn
  const seatClass = `${styles.seat} ${styles[seatType]} ${isChecked ? styles.checked : ''}`;

  return (
    <button className={seatClass} onClick={() => toggleSeatSelection(seatNumber)}>
      {seatNumber}
    </button>
  );
};

export default Seat;
