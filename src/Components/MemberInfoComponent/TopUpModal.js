import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './WalletPage.module.css';
import OnlinePaymentPage from '../BuyTicketComponent/PaymentComponent/OlinePaymentPage';

const topUpValue = [10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];

const TopUpModal = ({ onTopUp }) => {
  const [topUpAmount, setTopUpAmount] = useState('');
  const [valueInput, setValueInput] = useState(0);

  const handleTextChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setTopUpAmount(value);
    const temp = parseInt(value, 10);
    const x = topUpValue.find((c) => c === temp);
    setValueInput(x || temp || 0);
  };

  const handleTopUp = () => {
    if (valueInput > 0) {
      onTopUp(valueInput); 
      setTopUpAmount('');
      setValueInput(0);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <input
          type="text"
          value={topUpAmount}
          onChange={handleTextChange}
          placeholder="Nhập số tiền nạp"
          className={styles.topUpInput}
        />
        <div className={styles.topUpValueContainer}>
          {topUpValue.map((item) => (
            <button
              key={item}
              className={clsx(styles.topUpItem, item === valueInput && styles.topUpItemSelected)}
              onClick={() => {
                setValueInput(item);
                setTopUpAmount(item.toString());
              }}
            >
              {item.toLocaleString()} đ
            </button>
          ))}
        </div>
        <OnlinePaymentPage useFor="ahd" finalAmount={valueInput} handleTopUp={handleTopUp} />
      </div>
    </div>
  );
};

export default TopUpModal;
