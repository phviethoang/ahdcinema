import React, { useState,useEffect } from 'react';
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';

const TransactionConfirmation = ({onVisibleChange, payBy, useFor, transactionInfo, valueInput, handleTopUp, onTransactionConfirmation, paymentData, onPaymentSuccessful, finalAmount}) => {
  const convertToLocalTime = (dateString) => {
    if (!dateString) return null; // Xử lý trường hợp không có giá trị ngày
  
    // Cắt chuỗi từ đầu đến trước phần giây
    const trimmedDateString = dateString.substring(0, dateString.indexOf("."));
    console.log("trimmedDateString: ", trimmedDateString)
    // Chuyển đổi về múi giờ "Asia/Ho_Chi_Minh"
    const date = new Date(trimmedDateString);
    return date.toLocaleString("en-CA", { 
      timeZone: "Asia/Ho_Chi_Minh", 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
    });
  };
  
  const [mergedSeats, setMergedSeats]=useState([])

  useEffect(() => {
    if (transactionInfo && transactionInfo.seat_number && transactionInfo.seat_cost) {
      const merged = transactionInfo.seat_number.map((seat_number, index) => ({
        seat_number: seat_number,
        seat_type : transactionInfo.seat_type[index],
        seat_cost: transactionInfo.seat_cost[index],
      }));
      setMergedSeats(merged);
    }
  }, [transactionInfo]);

  

const comboData=[
  {id: 1, name:"MY COMBO" },
  {id:2, name: "CONAN CARD COLLECTION COMBO NORMAL", },
  {id:3, name: "CONAN CARD COLLECTION COMBO EPIC",},
  {id: 4, name: "CONAN CARD COLLECTION COMBO SPECIAL",},
  {id: 5, name: "BT21 MININI SINGLE COMBO",},
  {id: 6, name: "BT21 MININI SINGLE COMBO",}
]
const [comboQuantities,setComboQuantities] = useState(()=>{
  const storedQuantities = sessionStorage.getItem("comboPage");
  return storedQuantities ? JSON.parse(storedQuantities) : Array(6).fill(0);
}) 


const [mergedCombo,setMergedCombo]=useState([])
// useEffect(() => {
//   if (transactionInfo && transactionInfo.ticket_id) {
//     const merged = comboQuantities.map((each, index) => ({
//       quantity: each,
//       name:comboData[index].name,
//     }));
//     setMergedCombo(merged);
//   }
//   console.log("comboQuantities: ...", comboQuantities)
// }, [comboQuantities]);
useEffect(() => {
  if (transactionInfo && transactionInfo.ticket_id) {
    const merged = comboQuantities.map((each, index) => ({
      quantity: each,
      name: comboData[index].name,
    }));
    setMergedCombo(merged);
  }
  console.log("comboQuantities: ...", comboQuantities);
}, [comboQuantities, transactionInfo]);

useEffect(()=>{
  console.log("mergedCombo:... ", mergedCombo)
},[mergedCombo])
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.transactionConfirmationContainer}>
        <div className={styles.closePoint} onClick={onVisibleChange}>
          &times;
        </div>
        <div className={styles.transactionConfirmationTitle}>Thông tin giao dịch</div>
        {useFor==="purchasePayment" &&(transactionInfo?.ticket_id)&&
          <div className={styles.transactionConfirmationDetail}>
            <div className={styles.transactionConfirmationSection}>
              <strong>Tên phim:</strong> {transactionInfo.movie_name}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Rạp:</strong> {transactionInfo.cinema_name}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Ghế:</strong>
              <span className={styles.transactionConfirmationSeats}>
                {mergedSeats.length>0&&mergedSeats
                  .map(
                    (seat) => `${seat.seat_number} - ${seat.seat_type} - ${seat.seat_cost.toLocaleString()}đ`
                  )
                  .join(' | ')}
              </span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Rạp:</strong> {transactionInfo.cinema_name}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Phòng chiếu:</strong> Screen {transactionInfo.room_number}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Ngày chiếu:</strong> {convertToLocalTime(transactionInfo.show_date)}---<strong>Giờ chiếu:</strong>{transactionInfo.show_time}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Mã giảm giá:</strong> {transactionInfo.voucher_name}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Combo:</strong>
              <span className={styles.transactionConfirmationCombo}>
                {mergedCombo.length > 0 ? mergedCombo.map(combo => `${combo.quantity} - ${combo.name}`).join(' | ') : 'Không có combo'}
              </span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Hình thức thanh toán:</strong> {payBy==='online'?"Thanh toán trực tuyến":"Thanh toán qua ví AHD"}
              {paymentData&&paymentData.paymentType==="bankCard"?" qua thẻ ATM/VISA":''}
              {paymentData&&paymentData.paymentType==="ewallet"?" qua ví điện tử":''}
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Tổng tiền:</strong> {finalAmount.toLocaleString()}đ
            </div>
          </div> 
        }

        {
          useFor === "purchasePayment" && (transactionInfo?.purchase_id) &&
          <div className={styles.transactionConfirmationDetail}>
            <div className={styles.transactionConfirmationSection}>
              <strong>Loại thẻ:</strong> <span>{transactionInfo.card_type}</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Giá tiền:</strong> <span>{transactionInfo.price.toLocaleString()}đ</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Thời hạn:</strong> <span>{transactionInfo.duration} ngày</span>
            </div>
            <div className={styles.transactionConfirmationSection}>
              <strong>Ưu đãi:</strong><span>{transactionInfo.benefits}đ</span>
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
