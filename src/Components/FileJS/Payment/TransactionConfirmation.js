import React, { useState } from 'react';
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';

const TransactionConfirmation = ({onVisibleChange, payBy, useFor, transactionInfo, valueInput, handleTopUp, onTransactionConfirmation, paymentData, onPaymentSuccessful, finalAmount}) => {
  let selectedSeats = [];
  let combo = [];
  let cardType = "";
  let price = 0;
  let duration = "";
  let benefits = [];
  let type = "";
  // let activeFunction = ()=>{}
  if (transactionInfo?.type === "buyTicket") {
    ({ selectedSeats = [], combo = [] } = transactionInfo);
  } else if (transactionInfo?.type === "upgradeMembership") {
    ({ cardType = "", price = 0, duration = "", benefits = [] } = transactionInfo);
  }
  

  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   if (e.target.value.trim() === '') {
  //     setError('Mật khẩu không được để trống');
  //   } else {
  //     setError('');
  //   }
  // };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.transactionConfirmationContainer}>
        <div className={styles.closePoint} onClick={onVisibleChange}>
          &times;
        </div>
        <div className={styles.transactionConfirmationTitle}>Thông tin giao dịch</div>
        {useFor==="purchasePayment" &&(transactionInfo?.type === "buyTicket")&&
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
            <div className={styles.transactionConfirmationSection}>
              <strong>Tổng tiền:</strong> {finalAmount}đ
            </div>
          </div> 
        }
        {/* {
          useFor ==="purchasePayment"&&(transactionInfo?.type === "upgradeMembership")&&
          <div className={styles.transactionConfirmationDetail}>
            <div className={styles.transactionConfirmationSection}>
                <strong>loại thẻ:</strong> <span>{transactionInfo.cardType}</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
                <strong>gía tiền:</strong>{transactionInfo.price.toLocaleString()}<span></span>
            </div>
            <div className={styles.transactionConfirmationSection}>
                <strong>loại thẻ:</strong> <span>{transactionInfo.duration} ngày</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
                <strong>loại thẻ:</strong>
                <span>
                  <ul>
                    {transactionInfo.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </span>
            </div>
            
          </div>
        } */}
        {
          useFor === "purchasePayment" && transactionInfo?.type === "upgradeMembership" &&
          <div className={styles.transactionConfirmationDetail}>
            <div className={styles.transactionConfirmationSection}>
              <strong>Loại thẻ:</strong> <span>{transactionInfo.cardType}</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Giá tiền:</strong> <span>{transactionInfo.price.toLocaleString()}đ</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Thời hạn:</strong> <span>{transactionInfo.duration} ngày</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Ưu đãi:</strong>
              <ul style = {{listStyleType: "none"}}>
                {transactionInfo.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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

        <div className={styles.twoButton}>

          {
            useFor==='topUp'?
              <button
                className={styles.confirm}
                onClick={(e)=>{handleTopUp(); onVisibleChange(); onTransactionConfirmation() }}
              >
                Thanh toán
              </button>
            : <button
              className={styles.confirm}
              onClick={(e)=>{onVisibleChange(); onTransactionConfirmation(); onPaymentSuccessful(payBy)}}
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
