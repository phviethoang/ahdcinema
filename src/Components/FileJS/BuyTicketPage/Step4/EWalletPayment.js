import React, { useState, useEffect } from 'react';
// import styles from './EwalletPayment.module.css';
import styles from '../../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import clsx from 'clsx'

import iconZaloPay from '../../../../img/PaymentIcon/zalopayIcon.png';  
import iconMomo from '../../../../img/PaymentIcon/momoIcon.png';

import CountdownTimer2 from './CountdownTimer2'
import PaymentButton from './PaymentButton'
import TopUpComplete from'../../MemberPage/TopUpComplete'
const EwalletPayment = ({ewalletSelected, finalAmount, useFor, handleTopUp, transactionInfo, onPaymentSuccessful, onPaymentSuccessOutside}) => {

    const[satisfied, setSatisfied]=useState(false);
    const form = "Your Phone Number";
    const [text, setText] = useState(form);
    const [temp, setTemp] = useState('');

    const handleTextChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Loại bỏ các ký tự không phải số
        value = value.slice(0, 10); // Giới hạn độ dài tối đa là 10 ký tự

        // Nếu độ dài < 9, thêm dấu cách sau mỗi 3 chữ số
        if (value.length < 9) {
            value = value.replace(/(\d{3})(?=\d)/g, "$1-"); 
        } else if (value.length === 9) {
            setTemp(value.replace(/(\d{3})(?=\d)/g, "$1-"));
            value = value.replace(/(\d{3})(?=\d)/g, "$1-");
        } else if (value.length === 10) {
            value = temp + value.slice(9, 10);
        }

        value = value || form;
        setText(value);
    };

    useEffect(()=>{
        if(text.length===12){
            setSatisfied(true);
        }
        else{
            setSatisfied(false);
        }
    },[text]);
    return (
        <div className ={styles.ewalletContainer}>
        <div className={styles.ewalletSubContainer}>
            <div className={styles.orderDetail}>
                <div className={styles.ewalletHeader}>
                    {ewalletSelected==='ZaloPay'&&<img src={iconZaloPay} alt="ZaloPay Icon" className={styles.ewalletIcon} />}
                    {ewalletSelected==='MOMO'&&<img src={iconMomo} alt="Momo Icon" className={styles.ewalletIcon} />}
                    <h2 style={{marginTop:'10px', fontSize:'30px'}}>Thông tin đơn hàng</h2>
                </div>
                <div className={styles.orderInfo}>
                    <div className={styles.amount}>Số tiền thanh toán: <span>₫{finalAmount.toLocaleString()}</span></div>
                    <div className={styles.transactionId}>Mã giao dịch: <span>2004214101800486053</span></div>
                    <div className={styles.transactionContent}>Nội dung: <span>Thanh toán mã đơn hàng #JOK106168</span></div>
                    <div className={styles.countdown}>Giao dịch kết thúc trong: <CountdownTimer2 initialMinutes={5} initialSeconds={0}/></div>
                </div>
            </div>
            <div className={styles.ewalletInputContainer}>
                <div className={styles.ewalletPhoneLabel}>
                    Số điện thoại tài khoản {ewalletSelected}
                </div>
                <div className={clsx( styles.phoneDisplay,ewalletSelected==='ZaloPay'?styles.ewalletZalo:styles.ewalletMOMO)}>{text}</div>
                 <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    maxlength="10"
                    onChange={e=>handleTextChange(e)}
                    className={styles.ewalletInput}
                />
                
            </div>
           
        </div>
        {useFor==='ahd'&&<p>Bằng cách chọn Nạp tiền, Quý khách đồng ý với <span style={{color:"blue"}}>Điều khoản giao dịch</span> của AHD.</p>}
        {!(useFor==='ahd')&&<PaymentButton satisfied={satisfied} useFor='online' transactionInfo={transactionInfo} paymentData={{paymentType: "ewallet",info: text}} onPaymentSuccessful={onPaymentSuccessful} finalAmount={finalAmount} onPaymentSuccessOutside = {onPaymentSuccessOutside}/>}
        {useFor==='ahd'&& <TopUpComplete valueInput={finalAmount} handleTopUp={handleTopUp} satisfied={satisfied} paymentData={{paymentType: "ewallet",info: text}}/>}
        {/* <div className={styles.agreementSection}>
        <label>
          <input type="checkbox" />
            <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
        </label>
      </div> */}
        </div>
    );
};

export default EwalletPayment;
