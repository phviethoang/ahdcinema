import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import CountdownTimer2 from './CountdownTimer2'

const Success = ({ onResetSuccess, useFor, transactionInfo, onPaymentSuccessOutside }) => {
  // const navigate = useNavigate();

  const [visible, setVisible] = useState(true);

  const timeout = useFor==="purchasePayment"&&transactionInfo.type==="buyTicket"?10000:2000;
  console.log(transactionInfo)
  console.log(useFor)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onResetSuccess) {
        onResetSuccess();
      }
      // if (transactionInfo.activeFunction) {
      //   activeFunction();
      // }
      // navigate('/');
      if (onPaymentSuccessOutside) {
        onPaymentSuccessOutside();
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    visible && (
      <div className={styles.modalOverlay}>
      <div className={styles.successContainer}>
        <div className={styles.successBox}>
          <div className={styles.svgWrapper}>
            <svg width="375" height="375">
              <circle
                fill="none"
                stroke="#68E534"
                strokeWidth="25"
                cx="187.5"
                cy="187.5"
                r="175"
                strokeLinecap="round"
                transform="rotate(-90 187.5 187.5)"
                className={styles.circle}
              />
              <polyline
                fill="none"
                stroke="#68E534"
                points="87.5,212.5 162.5,275 287.5,125"
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.tick}
              />
            </svg>
          </div>
          <div className={styles.successText}>Giao dịch thành công</div>
          {useFor==="purchasePayment"&&transactionInfo.type==="buyTicket"&&<p>Quay lại màn hình chính sau <CountdownTimer2 initialMinutes={0} initialSeconds={10}/></p>}
        </div>
      </div>
    </div>
    )
  );
};

export default Success;
