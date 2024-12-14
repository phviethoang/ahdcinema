import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import Icon1 from '../../../img/PaymentIcon/atmIcon.png';
import Icon2 from '../../../img/PaymentIcon/momoIcon.png';
import Icon3 from '../../../img/PaymentIcon/visaIcon.png';
import Icon4 from '../../../img/PaymentIcon/zalopayIcon.png';

import ProcessPaymentMethod from './ProcessPaymentMethod'
const paymentMethods = [
    { value: 'ATM', label: 'ATM card (Thẻ nội địa)', icon: Icon1 },
    { value: 'Visa', label: 'Thẻ quốc tế (Visa, Master, Amex, JCB)', icon: Icon3 },
    { value: 'MOMO', label: 'Ví điện tử MOMO', icon: Icon2 },
    { value: 'ZaloPay', label: 'Ví điện tử Zalopay', icon: Icon4 },
  ];


const OnlinePaymentPage=({finalAmount, useFor, onHandleTopUpSatisfied, handleTopUp, transactionInfo, onPaymentSuccessful, onPaymentSuccessOutside})=>{
    // const finalAmount= finalAmount;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    
    const [isPresent, setIsPresent]=useState([
      {on: false, key :'ATM'},
      {on: false, key:'Visa'},
      {on: false, key:'MOMO'},
      {on: false, key: 'ZaloPay'}
    ]);

    const [selectedMethod, setSelectedMethod] = useState(isPresent.find((item) => item.on));

    const handleSelectedMethod = (value) => {
      setSelectedPaymentMethod(value);
      setIsPresent((prev) =>
        prev.map((item) =>
          item.key === value
            ? { ...item, on: true }
            : { ...item, on: false }
        )
      );
    };
    useEffect(() => {setSelectedMethod(isPresent.find((item) => item.on))},[isPresent]);

    return(
      <div>
        <div
            className={styles.paymentMethodSection}
          >
            <div className={styles.step}>Phương thức thanh toán</div>
            <div className={styles.paymentMethod}>
              {paymentMethods.map((method) => (
                <div className={`${styles.paymentLabel} ${selectedPaymentMethod === method.value?styles.isSelectedPaymentMethod:''}`} onClick={()=>handleSelectedMethod(method.value)} key={method.value}>
                  <img src={method.icon} alt={`${method.value} Icon`} className={styles.icon} />
                  <span>{method.label}</span>
                </div>
              ))}
            </div>
          </div>
       
          <ProcessPaymentMethod
              useFor = {useFor}
              selectedMethod = {selectedMethod}
              finalAmount = {finalAmount}
              handleTopUp={handleTopUp}
              transactionInfo={transactionInfo}
              onPaymentSuccessful={onPaymentSuccessful}
              onPaymentSuccessOutside = {onPaymentSuccessOutside}
          />
          
        </div>
    )
}

export default OnlinePaymentPage