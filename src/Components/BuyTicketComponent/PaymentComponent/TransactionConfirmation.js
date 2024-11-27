import React, { useState } from 'react';
import styles from './PaymentPage.module.css';

const TransactionConfirmation = ({onVisibleChange, payBy, useFor, ticketInfo, valueInput, handleTopUp, onTransactionConfirmation, paymentData, onPaymentSuccessful, finalAmount}) => {
  const { selectedSeats, combo } = (ticketInfo?ticketInfo:{})
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.trim() === '') {
      setError('Mật khẩu không được để trống');
    } else {
      setError('');
    }
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.transactionConfirmationContainer}>
        <div className={styles.closePoint} onClick={onVisibleChange}>
          &times;
        </div>
        <div className={styles.transactionConfirmationTitle}>Thông tin giao dịch</div>
        {useFor==="ticketPurchase" && 
          <div className={styles.transactionConfirmationDetail}>
            <div className={styles.transactionConfirmationSection}>
              <strong>Tên phim:</strong> [Tên phim]
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Rạp:</strong> [Tên rạp]
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Ghế:</strong>
              <span className={styles.transactionConfirmationSeats}>
                {selectedSeats
                  .map(
                    (seat) => `${seat.seatNumber} (${seat.type}) - ${seat.price.toLocaleString()}đ`
                  )
                  .join(' | ')}
              </span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Combo:</strong>
              <span className={styles.transactionConfirmationCombo}>
                {combo.length > 0 ? combo.join(', ') : 'Không có combo'}
              </span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Hình thức thanh toán:</strong> {payBy==='online'?"Thanh toán trực tuyến":"Thanh toán qua ví AHD"}
              {paymentData&&paymentData.paymentType==="bankCard"?" qua thẻ ATM/VISA":''}
              {paymentData&&paymentData.paymentType==="ewallet"?" qua ví điện tử":''}
            </div>
            {/* finalAmount */}
            <div className={styles.transactionConfirmationSection}>
              <strong>Tổng tiền:</strong> {finalAmount}đ
            </div>
          </div> 
        }
        {
          useFor==='topUp' &&
          <div>
            Số tiền nạp: <span style={{color:"red"}}>{valueInput.toLocaleString()}đ</span>
          </div>
        }
        {
          paymentData&&(paymentData.paymentType==="bankCard"?
          <span className={styles.transactionConfirmationSeats}>
            {/* <p>Thanh toán qua thẻ ATM/VISA</p> */}

            {paymentData.info.map(Item => (
              <div key={Item.key}>
                {Item.key === "1" && <span>Số thẻ: </span>}{Item.key === "1" && Item.item}
                {Item.key === "3" && <span>Hiệu lực: </span>}{Item.key === "3" && Item.item}
                {Item.key === "5" && <span>Ngày hết hạn: </span>}{Item.key === "5" && Item.item}
                {Item.key === "6" && <span>Tên chủ thẻ: </span>}{Item.key === "6" && Item.item}
              </div>
            ))}

          </span>
        :
          <span className={styles.transactionConfirmationSeats}>
            {/* <p>Thanh toán qua ví điện tử</p> */}
            {<span>Số điện thoại: </span>}{paymentData.info}
          </span>)
        }

        <div className={styles.transactionPassword}>
          <div
            style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}
          >
            Bạn có chắc chắn muốn thanh toán?
          </div>
          <div>
            <label htmlFor="password">Nhập mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              className={styles.transactionConfirmPassword}
            />
          </div>
        </div>
        <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
        <div className={styles.twoButton}>

          {
            useFor==='topUp'?
              <button
                disabled={!password.trim()}
                className={styles.confirm}
                onClick={(e)=>{handleTopUp(); onVisibleChange(); onTransactionConfirmation() }}
              >
                Thanh toán
              </button>
            : <button
              disabled={!password.trim()}
              className={styles.confirm}
              onClick={(e)=>{onVisibleChange(); onTransactionConfirmation(); onPaymentSuccessful()}}
              >
              Thanh toán
              </button>
          }
          <button onClick={onVisibleChange} className={styles.unconfirm}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionConfirmation;
