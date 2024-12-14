import React, {useState, useEffect} from 'react'
// import styles from './TopUpComplete.module.css'
import styles from '../../FileCSS/MemberPage/WalletPage.module.css';

import TransactionConfirmation from '../Payment/TransactionConfirmation'
import Success from '../Payment/Success'
const TopUpComplete=({valueInput, handleTopUp, satisfied, paymentData})=>{
    const [visible,setVisible]=useState(false);
    const handleTransactionConfirmationVisibleChange=()=>{
        if(visible) {setVisible(false)}
        else setVisible(true);
    }

    const [isSuccess,setIsSuccess]=useState(false);
    const handleTransactionConfirmation=()=>{
        isSuccess?setIsSuccess(false): setIsSuccess(true);
    }

    return(
        <div className ={styles.topUpComplete}>
             {/* {console.log("tsuccess:", isSuccess)} */}
            <div className={styles.topUpTotal}>Tổng nạp: <span style={{color:"red"}}>{valueInput.toLocaleString()} đ</span> </div>
            {(satisfied&&valueInput>0)?<button onClick={handleTransactionConfirmationVisibleChange} className={styles.topUpAction}> Nạp tiền</button>:
            <button className ={styles.topUpNegation}> Nạp tiền</button>
            }
            {
                visible&&
                <TransactionConfirmation 
                    onVisibleChange = {handleTransactionConfirmationVisibleChange}
                    useFor = "topUp"
                    valueInput = {valueInput}
                    handleTopUp = {handleTopUp}
                    onTransactionConfirmation = {handleTransactionConfirmation}
                    paymentData = {paymentData}
                />
            }
            {
            isSuccess&&
            <Success  onResetSuccess={handleTransactionConfirmation} useFor="topUp"/>
            }
        </div> 
    )
}
export default TopUpComplete;
