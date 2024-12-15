import React, { useState } from "react";
import styles from './MangeVouchers.module.css'
import Notification from '../Notification';

const AddVouchers = () => {
  const [vouchers, setVouchers] = useState([
    { code: 'VOUCHER123', discount: 10, type: 'movie', used: false },
    { code: 'DISCOUNT2024', discount: 15, type: 'movie', used: false },
    { code: 'SALE50', discount: 50, type: 'movie', used: false },
    { code: 'POPCORN10', discount: 10, type: 'popcorn', used: false },
    { code: 'SNACK20', discount: 20, type: 'popcorn', used: false },
    { code: 'DRINK30', discount: 30, type: 'popcorn', used: false }
  ]);
  
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState('');
  const [voucherType, setVoucherType] = useState('movie');
  const [notification, setNotification] = useState(null);

  // Kiểm tra voucher trùng code và type
  const isVoucherCodeDuplicate = (code, type) => {
    return vouchers.some(voucher => voucher.code === code && voucher.type === type);
  };

  const handleAddVoucher = () => {
    if (!voucherCode || !voucherDiscount || isNaN(voucherDiscount)) {
      setNotification({ message: "Vui lòng nhập đầy đủ thông tin hợp lệ!", type: "error" });
      return;
    }

    if (isVoucherCodeDuplicate(voucherCode, voucherType)) {
      setNotification({ message: "Mã voucher này đã tồn tại cho loại này!", type: "error" });
      return;
    }

    const newVoucher = {
      code: voucherCode,
      discount: parseInt(voucherDiscount),
      type: voucherType,
      used: false
    };

    setVouchers((prevVouchers) => [...prevVouchers, newVoucher]);
    setNotification({ message: "Thêm voucher thành công!", type: "success" });
    setVoucherCode('');
    setVoucherDiscount('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.adminTitle}>Thêm Voucher Mới</div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className={styles.form}>
        {/* Mã Voucher */}
        <div className={styles.formGroup}>
          <label>Mã Voucher</label>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
        </div>

        {/* Giảm giá */}
        <div className={styles.formGroup}>
          <label>Giảm giá (%)</label>
          <input
            type="number"
            value={voucherDiscount}
            onChange={(e) => setVoucherDiscount(e.target.value)}
          />
        </div>

        {/* Loại Voucher */}
        <div className={styles.formGroup}>
          <label>Loại Voucher</label>
          <select
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
          >
            <option value="movie">Phim</option>
            <option value="popcorn">Bắp</option>
          </select>
        </div>

        <button className={styles.addButton} onClick={handleAddVoucher}>
          Thêm Voucher
        </button>
      </div>

      {/* Danh sách Voucher */}
      <h2>Danh sách Voucher</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã Voucher</th>
            <th>Giảm giá (%)</th>
            <th>Loại</th>
            <th>Sử dụng</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher, index) => (
            <tr key={index}>
              <td>{voucher.code}</td>
              <td>{voucher.discount}</td>
              <td>{voucher.type}</td>
              <td>{voucher.used ? "Đã sử dụng" : "Chưa sử dụng"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddVouchers;
