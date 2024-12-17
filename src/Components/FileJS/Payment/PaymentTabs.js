import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import WalletPage from '../MemberPage/WalletPage';
import OnlinePaymentPage from './OlinePaymentPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
 
const PaymentTabs = () => {
 
// nếu thanh toán bằng ví => wallet_balance = wallet_balance - total_price
// nếu thanh toán online => wallet_balance =wallet_balance
// trả về wallet_balance
 
  const location = useLocation();
  const { finalAmount, walletBance } = location.state || { finalAmount: 0, walletBance: 0 };
  console.log("finalAmount: ", finalAmount)
  const [activeTab, setActiveTab] = useState('AHD');
  const [paymentSuccessful, setPaymentSuccessful]= useState(false);

 
  const params = new URLSearchParams(window.location.search);
  const ticket_id = params.get("ticket_id");
  const purchase_id = params.get("purchase_id");


//   const [transactionInfo, setTransactionInfo] = useState({})
//   // const [bookingInfo,setBookingInfo]=useState('')
//   const getPaymentInfo = async () => {
//     // console.log(ticket_id)
//     // console.log(purchase_id)
//     try {
//         const response = await fetch(
//             `http://localhost:5000/ahd/payment/info?${ticket_id ? `ticket_id=${ticket_id}` : `purchase_id=${purchase_id}`}`, {
//               credentials: 'include', // Đảm bảo gửi cookie
//             }
//         );
 
//         if (!response.ok) {
//             throw new Error("Failed to fetch payment info");
//         }
 
//         const result = await response.json();
 
//         if (result.type === "ticket") {
//             console.log("Ticket Info:", result.data);
//             setTransactionInfo(result.data)
//         } else if (result.type === "card") {
//             console.log("Card Info:", result.data);
//             setTransactionInfo(result.data)
//         }

//     } catch (error) {
//         console.error("Error fetching payment info:", error);
//     }
// };
// //Thực hiện lấy thông tin thanh toán
// useEffect(() => {   getPaymentInfo(); }, [ticket_id, purchase_id]);
// // const CardInfo =result.data;
// // const finalAmount = 
// // transactionInfo.price

const [finalAmountActive,setFinalAmountActive]=useState(0)
// // const temp = transactionInfo.price
// useState(()=>{
//   // setFinalAmountActive(transactionInfo?transactionInfo.price:0)
//   console.log("transactionInfo: ",transactionInfo)
// },[transactionInfo])

const [transactionInfo, setTransactionInfo] = useState({});

// Thực hiện lấy thông tin thanh toán
const getPaymentInfo = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/ahd/payment/info?${ticket_id ? `ticket_id=${ticket_id}` : `purchase_id=${purchase_id}`}`,
      { credentials: 'include' }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payment info");
    }

    const result = await response.json();

    if (result.type === "ticket") {
      console.log("Ticket Info:", result.data);
      setTransactionInfo(result.data);
    } else if (result.type === "card") {
      console.log("Card Info:", result.data);
      setTransactionInfo(result.data);
    }

  } catch (error) {
    console.error("Error fetching payment info:", error);
  }
};

// Theo dõi sự thay đổi của transactionInfo
useEffect(() => {
  console.log("Updated transactionInfo: ", transactionInfo);
  // useEffect(() => {
    if (transactionInfo && transactionInfo.price) {
      setFinalAmountActive(transactionInfo.price); // Gán giá trị price cho finalAmountActive
    }
  // }, [transactionInfo]); // Theo dõi sự thay đổi của transactionInfo
  
  // setFinalAmountActive(transactionInfo?transactionInfo.price:0)
}, [transactionInfo]);  // Dõi theo transactionInfo khi nó thay đổi

useEffect(() => {
  getPaymentInfo();
}, [ticket_id, purchase_id]); // Gọi lại getPaymentInfo mỗi khi ticket_id hoặc purchase_id thay đổi


useState(()=>{
  console.log("finalAmountActive: ",finalAmountActive)
},[finalAmountActive])
// console.log("temp: ",temp, typeof temp)
// console.log(finalAmount) 
const handlePaymentSuccessful = async (type) => {
  try {
    console.log("type: ",type)
    let payload ={
        wallet_balance: transactionInfo.wallet_balance,
        is_paid: true,
    }
      if(type&&type==="ahd"){
        payload.wallet_balance=transactionInfo.wallet_balance-finalAmountActive
    // Xác định loại thanh toán dựa trên ticket_id hoặc purchase_id
    }
    let url = "";
    if (ticket_id) {
      url = `http://localhost:5000/ahd/payment?wallet_balance=${payload.wallet_balance}&is_paid=${payload.is_paid}&ticket_id=${ticket_id}`;
    } else if (purchase_id) {
      url = `http://localhost:5000/ahd/payment?wallet_balance=${payload.wallet_balance}&is_paid=${payload.is_paid}&purchase_id=${purchase_id}`;
    } else {
      console.error("Error: Missing ticket_id or purchase_id.");
      return;
    }
 
    // Gọi API cập nhật dữ liệu thanh toán
    const response = await fetch(url, {
      method: "POST",
      credentials: "include", // Gửi cookie để xác thực
    });
 
    if (!response.ok) {
      throw new Error("Failed to update payment data");
    }
 
    const result = await response.json();
    console.log("Payment update successful:", result);
 
    // Cập nhật trạng thái thành công trong UI
    setPaymentSuccessful(true);
    setFinalAmountActive(0);
  } catch (error) {
    console.error("Error handling payment:", error);
  }
};
 
  return (
    <div className={styles.containerHung}>
      <Header></Header>
      <div className={styles.subContainerHung}>
    {/* <div> */}
      <div className={styles.paymentMethodContainer}>
        <div
          className={`${styles.paymentTab} ${activeTab === 'AHD' ? styles.active : ''}`}
          onClick={() => setActiveTab('AHD')}
        >
          Thanh toán qua Ví AHD
        </div>
        <div
          className={`${styles.paymentTab} ${activeTab === 'OnlinePayment' ? styles.active : ''}`}
          onClick={() => setActiveTab('OnlinePayment')}
        >
        Thanh toán trực tuyến
        </div>
      </div>
  <div className={styles.finalAmount}>
  <FontAwesomeIcon icon={faDollarSign} className={styles.icon3D} />
  <div>{paymentSuccessful?0:finalAmountActive.toLocaleString()}đ</div>
  </div>
    </div>
    <div className={`${activeTab ? styles.active : ''}`}>
        {activeTab==='AHD'?
          <WalletPage
            finalAmount={finalAmountActive}
            transactionInfo={transactionInfo}
            onPaymentSuccessful = {handlePaymentSuccessful}
            useFor="PaymentPage"
          />
          :<OnlinePaymentPage
            finalAmount={finalAmountActive}
            transactionInfo={transactionInfo}
            onPaymentSuccessful = {handlePaymentSuccessful}
          />
        }
      </div>
      <Footer></Footer>
    </div>
  );
};
 
export default PaymentTabs;