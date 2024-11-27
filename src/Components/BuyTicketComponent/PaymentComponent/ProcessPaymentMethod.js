import React, { useState, useEffect } from 'react';
// import styles from './ProcessPaymentMethod.module.css';
import styles from './PaymentPage.module.css';


import BankSearching from './BankSearching';
import BankCardPayment from './BankCardPayment';
import EWalletPayment from './EWalletPayment';

const ProcessPaymentMethod = ({ selectedMethod, finalAmount, useFor, handleTopUp, ticketInfo, onPaymentSuccessful }) => {
  const [selectedBank, setSelectedBank] = useState(null); // Lưu trữ ngân hàng đã chọn
  // const finalAmount = finalAmount;
  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  return (
    
    <div>
       
      {selectedMethod && (selectedMethod.key === 'ATM' || selectedMethod.key === 'Visa') && (
        <div className={styles.bankCardContainer}>
          
          <BankSearching onBankSelect={handleBankSelect} /> {/* Truyền hàm vào BankSearching */}
          
          {/* Kiểm tra selectedBank trước khi truy cập thuộc tính name */}
          {selectedMethod.key === 'ATM' && selectedBank && selectedBank.name === 'MBbank' && (
            <BankCardPayment
              useFor={useFor}
              Logo="mb"
              Icon1_2="active"
              finalAmount={finalAmount}
              handleTopUp={handleTopUp}
              ticketInfo={ticketInfo}
              onPaymentSuccessful={onPaymentSuccessful}
            />
          )}
          {selectedMethod.key === 'ATM' && selectedBank && selectedBank.name === 'Techcombank' && (
            <BankCardPayment
              useFor={useFor}
              Logo="tech"
              Icon1_2="active"
              finalAmount={finalAmount}
              handleTopUp={handleTopUp}
              ticketInfo={ticketInfo}
              onPaymentSuccessful={onPaymentSuccessful}
            />
          )}
          {selectedMethod.key === 'Visa' && selectedBank && selectedBank.name === 'MBbank' && (
            <BankCardPayment
             useFor={useFor}
              Logo="mb"
              Icon1_2="visa"
              finalAmount={finalAmount}
              handleTopUp={handleTopUp}
              ticketInfo={ticketInfo}
              onPaymentSuccessful={onPaymentSuccessful}
            />
          )}
          {selectedMethod.key === 'Visa' && selectedBank && selectedBank.name === 'Techcombank' && (
            <BankCardPayment
             useFor={useFor}
              Logo="tech"
              Icon1_2="visa"
              finalAmount={finalAmount}
              handleTopUp={handleTopUp}
              ticketInfo={ticketInfo}
              onPaymentSuccessful={onPaymentSuccessful}
            />
          )}
        </div>
      )}
    {selectedMethod && selectedMethod.key === 'ZaloPay'
      &&<EWalletPayment
          useFor={useFor}
          ewalletSelected={selectedMethod.key}
          finalAmount = {finalAmount}
          handleTopUp={handleTopUp}
          ticketInfo={ticketInfo}
          onPaymentSuccessful={onPaymentSuccessful}
        />}
    {selectedMethod && selectedMethod.key === 'MOMO'
      &&<EWalletPayment 
          useFor={useFor}
          ewalletSelected={selectedMethod.key}
          finalAmount = {finalAmount}
          handleTopUp={handleTopUp}
          ticketInfo={ticketInfo}
          onPaymentSuccessful={onPaymentSuccessful}
        />}

    {/* {useFor='ahd'&&<p>Bằng cách chọn Nạp tiền, Quý khách đồng ý với <span style={{color:"blue"}}>Điều khoản giao dịch</span> của AHD.</p>} */}
    </div>
  );
};

export default ProcessPaymentMethod;
