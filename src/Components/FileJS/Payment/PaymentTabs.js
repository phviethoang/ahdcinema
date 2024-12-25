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
const convertToLocalTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });
};
// const convertToLocalTime = (dateString) => {
//   if (!dateString) return null; // Xử lý trường hợp không có giá trị ngày

//   // Cắt chuỗi từ đầu đến trước phần giây
//   const trimmedDateString = dateString.substring(0, dateString.indexOf("."));
//   console.log("trimmedDateString: ", trimmedDateString)
//   // Chuyển đổi về múi giờ "Asia/Ho_Chi_Minh"
//   const date = new Date(trimmedDateString);
//   return date.toLocaleString("en-CA", { 
//     timeZone: "Asia/Ho_Chi_Minh", 
//     year: 'numeric', 
//     month: '2-digit', 
//     day: '2-digit', 
//   });
// };

// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng từ 0-11 nên cần +1
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${year}-${month}-${day} ${hours}:${minutes}`;
// };

// const convertToLocalTime = (dateString) => {
//   if (!dateString) return null; // Xử lý trường hợp không có giá trị ngày
//   const options = { 
//     timeZone: "Asia/Ho_Chi_Minh", 
//     year: "numeric", 
//     month: "2-digit", 
//     day: "2-digit", 
//     hour: "2-digit", 
//     minute: "2-digit", 
//     second: "2-digit" 
//   };

//   try {
//     const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi
//     return new Intl.DateTimeFormat("en-CA", options).format(date); // Định dạng theo múi giờ Asia/Ho_Chi_Minh
//   } catch (error) {
//     console.error("Invalid date format:", dateString, error);
//     return null; // Trả về null nếu có lỗi
//   }
// };

  const location = useLocation();
  const { finalAmount, walletBance } = location.state || { finalAmount: 0, walletBance: 0 };
  console.log("finalAmount: ", finalAmount)
  const [activeTab, setActiveTab] = useState('AHD');
  const [paymentSuccessful, setPaymentSuccessful]= useState(false);

 
  const params = new URLSearchParams(window.location.search);
  const ticket_id = params.get("ticket_id");
  const purchase_id = params.get("purchase_id");


const [finalAmountActive,setFinalAmountActive]=useState(0)

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
      // setTransactionInfo(result.data.map((item)=>({
      //   ...item, 
      //   show_date : convertToLocalTime(item.show_date)
      // })));
    } else if (result.type === "card") {
      console.log("Card Info:", result.data);
      // setTransactionInfo(result.data.map((item)=>({
      //   ...item, 
      //   purchase_date : convertToLocalTime(item.purchase_date)
      // })));
      setTransactionInfo(result.data)
    }


  } catch (error) {
    console.error("Error fetching payment info:", error);
  }
};

// Theo dõi sự thay đổi của transactionInfo
useEffect(() => {
  console.log("Updated transactionInfo: ", transactionInfo);
    if (transactionInfo && (transactionInfo.price||transactionInfo.total_price)){
      setFinalAmountActive(transactionInfo.price||transactionInfo.total_price ); // Gán giá trị price cho finalAmountActive
    }
}, [transactionInfo]);  

useEffect(() => {
  getPaymentInfo();
}, [ticket_id, purchase_id]); // Gọi lại getPaymentInfo mỗi khi ticket_id hoặc purchase_id thay đổi


useState(()=>{
  console.log("finalAmountActive: ",finalAmountActive)
},[finalAmountActive])

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