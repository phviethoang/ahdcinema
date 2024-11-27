import React, { useState } from 'react';
import styles from './PaymentPage.module.css';
import WalletPage from '../../MemberInfoComponent/WalletPage';
import OnlinePaymentPage from './OlinePaymentPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const PaymentTabs = ({finalAmount, ticketInfo}) => {
  const [activeTab, setActiveTab] = useState('AHD');
  const [paymentSuccessful, setPaymentSuccessful]= useState(false);
  const [finalAmountActive,setFinalAmountActive]=useState(finalAmount)
  const handlePaymentSuccessful=()=>{
    setPaymentSuccessful(true)
    setFinalAmountActive(0)
  }

  return (
    <div>
       {console.log("paymentTabs: ",ticketInfo.selectedSeats)}
    <div>
      <div className={styles.paymentMethodContainer}>
        
        {/* <div className={styles.finalAmount}>{finalAmount}đ</div> */}
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
  <div>{paymentSuccessful?0:finalAmountActive}đ</div>
  </div>
    </div>
    <div className={`${activeTab ? styles.active : ''}`}>
        {activeTab==='AHD'?
          <WalletPage
            finalAmount={finalAmountActive}
            ticketInfo={ticketInfo}
            onPaymentSuccessful = {handlePaymentSuccessful}
            useFor="PaymentPage"
          />
          :<OnlinePaymentPage
            finalAmount={finalAmountActive}
            ticketInfo={ticketInfo}
            onPaymentSuccessful = {handlePaymentSuccessful}
          />
        }
      </div>
    </div>
  );
};

export default PaymentTabs;
