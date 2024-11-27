import React, { useState, useEffect } from 'react';
import styles from './WalletPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import PaymentButton from '../BuyTicketComponent/PaymentComponent/PaymentButton';
import TopUpButton from './TopUpButton';
import TopUpModal from './TopUpModal'
import TransactionHistoryButton from './TransactionHistoryButton'
import TransactionHistoryModal from './TransactionHistoryModal'

const WalletPage = ({ finalAmount, ticketInfo, onPaymentSuccessful, useFor }) => {
  const [balance, setBalance] = useState(500000);
  const [viewBalance, setViewBalance] = useState(false);
  const [satisfied, setSatisfied] = useState(true);

  const [isTopUp, setIsTopUp] = useState(false); //button nap tien nhan vao  de mo thao tac nap tien
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

  const handleTopUp = (amount) => {
    setBalance(balance + amount); // Cập nhật số dư khi nạp tiền
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
                ticketInfo={ticketInfo}
                onPaymentSuccessful={onPaymentSuccessful}
                finalAmount={finalAmount}
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

export default WalletPage;
