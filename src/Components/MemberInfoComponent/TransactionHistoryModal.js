import React, { useState } from "react";
import styles from "./WalletPage.module.css";

const transactionHistory = [
  {
    id: 1,
    time: "2024-11-25 14:30",
    amount: 50000,
    type: "Nạp tiền vào ví",
    details: {
      method: "Nạp qua ngân hàng",
      amount: 50000,
      date: "2024-11-25",
      time: "14:30",
    },
  },
  {
    id: 2,
    time: "2024-11-24 19:15",
    amount: 100000,
    type: "Mua vé",
    details: {
      movie: "Avatar 2",
      seat: "A3, A4",
      cinema: "Rạp Galaxy Nguyễn Du",
      amount: 100000,
      date: "2024-11-25",
      time: "20:00",
    },
  },
  {
    id: 3,
    time: "2024-11-23 12:45",
    amount: 300000,
    type: "Mua thẻ thành viên",
    details: {
      cardType: "Thẻ Vàng",
      validity: "12 tháng",
      benefits: ["Giảm giá 10%", "Ưu tiên đặt vé"],
      amount: 300000,
      date: "2024-11-23",
      time: "12:45",
    },
  },
  {
    id: 4,
    time: "2024-11-22 09:00",
    amount: 150000,
    type: "Mua vé",
    details: {
      movie: "John Wick 4",
      seat: "B1, B2",
      cinema: "Rạp AHD Landmark 81",
      amount: 150000,
      date: "2024-11-22",
      time: "10:00",
    },
  },
  {
    id: 5,
    time: "2024-11-21 16:20",
    amount: 200000,
    type: "Nạp tiền vào ví",
    details: {
      method: "Nạp qua ví điện tử",
      amount: 200000,
      date: "2024-11-21",
      time: "16:20",
    },
  },
];

const TransactionHistoryModal = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const renderDetails = () => {
    if (!selectedTransaction) return null;

    const { type, details } = selectedTransaction;

    if (type === "Mua vé") {
      return (
        <div>
          <p><b>Phim:</b> {details.movie}</p>
          <p><b>Ghế:</b> {details.seat}</p>
          <p><b>Rạp:</b> {details.cinema}</p>
          <p><b>Thời gian chiếu:</b> {details.time}</p>
          <p><b>Giá vé:</b> {details.amount.toLocaleString()}đ</p>
        </div>
      );
    }

    if (type === "Mua thẻ thành viên") {
      return (
        <div>
          <p><b>Loại thẻ:</b> {details.cardType}</p>
          <p><b>Thời hạn:</b> {details.validity}</p>
          <p><b>Quyền lợi:</b></p>
          <ul>
            {details.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <p><b>Giá:</b> {details.amount.toLocaleString()}đ</p>
        </div>
      );
    }

    if (type === "Nạp tiền vào ví") {
      return (
        <div>
          <p><b>Phương thức:</b> {details.method}</p>
          <p><b>Số tiền:</b> {details.amount.toLocaleString()}đ</p>
          <p><b>Thời gian:</b> {details.date} {details.time}</p>
        </div>
      );
    }

    return <p>Không có thông tin chi tiết.</p>;
  };

  return (
    <div className={styles.tableTransactionHistoryContainer}>
      <div className={styles.tableTransactionHistoryContent}>
        <h2>Bảng Lịch Sử Giao Dịch</h2>
        <div className={styles.tableTransactionHistoryWrapper}>
          <table className={styles.transactionHistoryTable}>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Thời gian</th>
                <th>Số tiền giao dịch</th>
                <th>Nội dung</th>
                <th>Thông tin chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.time}</td>
                  <td>{item.amount.toLocaleString()}đ</td>
                  <td>{item.type}</td>
                  <td
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer", textAlign:"center" }}
                    onClick={() => setSelectedTransaction(item)}
                  >
                    Chi tiết
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactionHistory.length === 0 && (
            <div className={styles.invalidHistory}>
              <span>Lịch sử giao dịch trống</span>
            </div>
          )}
        </div>
      </div>
      {selectedTransaction && (
        <div className={styles.modalOverlay}>
          <div className={styles.showHistoryDetail}>
            <div className={styles.transactionHistoryTitle}>
              <div className={styles.transactionConfirmationTextTitle}>
                Thông tin giao dịch
              </div>
              <div
                className={styles.closePoint}
                onClick={() => setSelectedTransaction(null)}
              >
                &times;
              </div>
            </div>
            <div className={styles.transactionDetails}>{renderDetails()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryModal;
