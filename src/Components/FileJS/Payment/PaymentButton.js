import React, {useState,useEffect} from 'react'
// import styles from './PaymentButton.module.css'
import styles from '../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css'
import walletIcon from '../../../img/PaymentIcon/walletIcon.png'

import TransactionConfirmation from './TransactionConfirmation'
import Success from './Success'
const PaymentButton=({satisfied, useFor, transactionInfo, paymentData, onPaymentSuccessful, finalAmount})=>{
    const [isChecked, setIsChecked] = useState(false);
    const[validation,setValidation]=useState(false);
    const [visible,setVisible]=useState(false);

    const [isSuccess,setIsSuccess]=useState(false);
    const handleTransactionConfirmation=()=>{
        isSuccess?setIsSuccess(false): setIsSuccess(true);
    }

    const handleCheckboxChange = (event) => {
        const isCheckedNow = event.target.checked;
        setIsChecked(isCheckedNow);
         setValidation(!isCheckedNow); // Nếu checkbox được chọn, tắt thông báo
      };

    const handleValidation=()=>{
        if(!isChecked){setValidation(true);}
    }

    const handleTransactionConfirmationVisibleChange=()=>{
        if(visible) {setVisible(false)}
        else setVisible(true);
    }
    return(
        <div className={styles.paymentButtonContainer}>
        {/* {console.log("psuccess:", isSuccess)} */}
        {/* {console.log("xpaymentData", paymentData)} */}
            {useFor==='ahd'&&(!(finalAmount===0)&&satisfied?
                <button className={styles.walletPaymentButton} onClick={()=>handleTransactionConfirmationVisibleChange()}>
                
                    <div style={{fontSize:"14px"}}>Thanh toán bằng số dư</div>
                    <img src={walletIcon} className={styles.walletIcon} />
                </button>
              :
                <button className={styles.walletPaymentButtonNegation}>
                    <div style={{fontSize:"14px"}}>Thanh toán bằng số dư</div>
                    <img src={walletIcon} className={styles.walletIcon} />
                </button>
            )}
            {useFor==='online'&& (!(finalAmount===0)&&satisfied&&isChecked?
                <div className={styles.payByOnline}>

                    <div className={styles.agreementSection}>

                        <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                            <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
                        </label>
                        
                    </div>
                    <button className={styles.onlinePaymentButton} onClick={()=>handleTransactionConfirmationVisibleChange()}>
                        Thanh toán
                    </button>
                </div>
                :
                <div className={styles.payByOnline}>
                    {/* <button className={styles.onlinePaymentButton}>
                        Thanh toán
                    </button> */}
                    <div className={styles.agreementSection}>
                        <label>
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                            <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
                        </label>
                        {validation&&<p style={{color:"red"}}>Vui lòng đồng ý điều khoản trước khi xác nhận thanh toán!</p>}
                    </div>
                    <button className={styles.onlinePaymentButtonNegation} onClick={()=>handleValidation()}>
                        Thanh toán
                    </button>
                </div>)
            }
        {
            visible&&
            <TransactionConfirmation 
                transactionInfo={transactionInfo} 
                onVisibleChange={handleTransactionConfirmationVisibleChange}
                useFor="purchasePayment"
                onTransactionConfirmation = {handleTransactionConfirmation}
                payBy = {useFor}
                paymentData= {paymentData}
                onPaymentSuccessful={onPaymentSuccessful}
                finalAmount={finalAmount}
            />
        }

        {
            isSuccess&&
            <Success 
                onResetSuccess={handleTransactionConfirmation} 
                useFor="purchasePayment"
                transactionInfo = {transactionInfo}
            />
        }
        </div>
    )
}
export default PaymentButton;