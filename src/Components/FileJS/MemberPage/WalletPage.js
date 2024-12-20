import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/MemberPage/WalletPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import PaymentButton from '../Payment/PaymentButton';
import TopUpButton from './TopUpButton';
import TopUpModal from './TopUpModal'
import TransactionHistoryButton from './TransactionHistoryButton'
import TransactionHistoryModal from './TransactionHistoryModal'
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom';

const WalletPage1 = ({ finalAmount, transactionInfo, onPaymentSuccessful, useFor, onPaymentSuccessOutside }) => {
  const navigate = useNavigate();
  const [viewBalance, setViewBalance] = useState(false);
  const [satisfied, setSatisfied] = useState(true);

  const [isTopUp, setIsTopUp] = useState(false); //button nap tien nhan vao  de mo thao tac nap tien
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);


//BEGIN FETCH DATA
  //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [balance, setBalance] = useState();
  const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;
  // Hàm fetch data GET wallet_balance
  useEffect(() => {
    fetch(`http://localhost:5000/ahd/mywallet?user_id=${userId}`, {
      credentials: 'include', // Đảm bảo gửi cookie
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            // Xử lý khi chưa đăng nhập
            console.error('Unauthorized. Redirecting to login...');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBalance(data))
      .catch(error => console.error('Error:', error));
  }, [userId]);

// const [userMemberCard, setUserMemberCard]= useState([])
// // Hàm fetch data GET user-membercard
//   useEffect(() => {
//     fetch(`http://localhost:5000/ahd/user-membercard?user_id=${userId}`, {
//       credentials: 'include', // Đảm bảo gửi cookie
//     })
//     .then(response => {
//       if (!response.ok) {
//         if (response.status === 401) {
//           // Xử lý khi chưa đăng nhập
//           console.error('Unauthorized. Redirecting to login...');
//           navigate('/login'); // Chuyển hướng đến trang đăng nhập
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => setUserMemberCard(data))
//     .catch(error => console.error('Error:', error));
//   }, [userId]);


  // In ra các mảng kiểm tra
  console.log(balance)
  //POST thông tin số tiền mà người dùng muốn nạp vào ví
  const handleTopUp = async (amount) => {
    setBalance(balance+amount)
    try {
const response = await fetch(`http://localhost:5000/ahd/top-up-wallet?user_id=${userId}&topup_value=${amount}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const error = await response.json();
          console.error("Error topup wallet:", error);
          alert(`Error: ${error.message || "Failed topup wallet."}`);
          return;
      }
      // quay về trang  chủ sau khi thanh toán thành công
      // navigate("/")
  } catch (error) {
      console.error("Error during fetch:", error);
      alert("An unexpected error occurred. Please try again later.");
  }
  };
  // END FETCH DATA

  const handleSetTopUp = () => {
    if(isHistoryOpen) setIsHistoryOpen(false);
    isTopUp?setIsTopUp(false):setIsTopUp(true);
  };
  const handleSetHistoryOpen = () => {
    if(isTopUp) setIsTopUp(false);
    isHistoryOpen?setIsHistoryOpen(false):setIsHistoryOpen(true);
  };

  const numberValue = useFor==="PaymentPage"?parseInt(finalAmount.toString().replace(/,/g, ''), 10):null;

  const handleViewBalance = () => {
    setViewBalance(!viewBalance);
  };


  useEffect(() => {
    if(useFor==="PaymentPage"){
      setSatisfied(balance >= numberValue);
    }
  }, [balance]);



  return (
    <div className={styles.walletContainer}>
      <div className={styles.walletSubContainer}>
        <h2 className={styles.title}>Ví AHD</h2>
        <div className={styles.balanceSection}>
          <div className={styles.checkBalance}>
            {viewBalance ? (
              <>
                <p>
                  Số dư hiện tại: <span className={styles.balance}>{balance.toLocaleString()} VND</span>
                </p>
                <FontAwesomeIcon className={styles.checkBalanceIcon} icon={faEye} onClick={handleViewBalance} />
              </>
            ) : (
              <>
                <p>
                  Số dư hiện tại: <span className={styles.balance}>********* VND</span>
                </p>
                <FontAwesomeIcon className={styles.checkBalanceIcon} icon={faEyeSlash} onClick={handleViewBalance} />
              </>
            )}
          </div>
          {useFor==="PaymentPage"&&!(finalAmount===0) && !satisfied && (
            <p style={{ color: 'red', fontSize: '25px', textAlign: 'center' }}>
              Không đủ số dư để thực hiện giao dịch. Hãy nạp thêm!
            </p>
          )}
          <div className={styles.walletActions}>
            <TopUpButton onHandleSetTopUp={handleSetTopUp} />
            {!(useFor==="PaymentPage")&&<TransactionHistoryButton onSetHistoryOpen = {handleSetHistoryOpen}/>}
            {useFor==="PaymentPage"&&
              <PaymentButton
                satisfied={satisfied}
                useFor="ahd"
                transactionInfo={transactionInfo}
                onPaymentSuccessful={onPaymentSuccessful}
finalAmount={finalAmount}
                onPaymentSuccessOutside = {onPaymentSuccessOutside}
              />
            }
          </div>
        </div>
      </div>
      {isTopUp && <TopUpModal  onTopUp = {handleTopUp} />}
      {isHistoryOpen && <TransactionHistoryModal />}
    </div>
  );
};

export default WalletPage1;