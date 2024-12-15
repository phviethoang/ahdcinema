import React, { useEffect } from 'react';
import styles from './Notification.module.css'; 

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 5000); // Tự động đóng sau 5 giây
      return () => clearTimeout(timer); // Clear timeout khi component bị unmount
    }
  }, [message, onClose]);

  if (!message) return null; // Không hiển thị nếu không có thông báo

  // Chọn lớp CSS tùy thuộc vào loại thông báo (success hoặc error)
  const notificationClass = type === 'error' ? styles.error : styles.success;

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      {message}
    </div>
  );
};

export default Notification;
