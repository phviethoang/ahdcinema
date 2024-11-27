import React, { useState, useEffect } from 'react';
import styles from './PaymentPage.module.css';
import CountdownTimer from '../ComboComponent/CountdownTimer';
import PaymentTabs from'./PaymentTabs'

import Icon1 from './PaymentIcon/atmIcon.png';
import Icon2 from './PaymentIcon/momoIcon.png';
import Icon3 from './PaymentIcon/visaIcon.png';
import Icon4 from './PaymentIcon/zalopayIcon.png';
import paymentButton from './PaymentIcon/paymentButton.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const allVouchers = [
  { code: 'VOUCHER123', discount: 10, type: 'movie',used: false },
  { code: 'DISCOUNT2024', discount: 15, type: 'movie', used: false },
  { code: 'SALE50', discount: 50, type: 'movie', used: false },
  { code: 'POPCORN10', discount: 10, type: 'popcorn', used: false },
  { code: 'SNACK20', discount: 20, type: 'popcorn', used: false },
  { code: 'DRINK30', discount: 30, type: 'popcorn', used: false }
];
const allDiscountCodes = [
  { code: 'SUMMER10', discount: 10, type: 'general', used: false },
  { code: 'MOVIE20', discount: 20, type: 'movie', used: false },
  { code: 'FOOD15', discount: 15, type: 'food', used: false },
  { code: 'COMBO25', discount: 25, type: 'combo', used: false },
  { code: 'FESTIVE30', discount: 30, type: 'festival', used: false },
  { code: 'WELCOME5', discount: 5, type: 'general', used: false },
  { code: 'VIP40', discount: 40, type: 'vip', used: false },
  { code: 'BIRTHDAY50', discount: 50, type: 'birthday', used: false },
  { code: 'NEWYEAR35', discount: 35, type: 'newyear', used: false },
  { code: 'FLASHSALE', discount: 60, type: 'flashsale', used: false },
  { code: 'FLASHSALEVIP', discount: 70, type: 'flashsale', used: false }
];

//   // Danh sách các phương thức thanh toán
  const paymentMethods = [
    { value: 'ATM', label: 'ATM card (Thẻ nội địa)', icon: Icon1 },
    { value: 'Visa', label: 'Thẻ quốc tế (Visa, Master, Amex, JCB)', icon: Icon3 },
    { value: 'MOMO', label: 'Ví điện tử MOMO', icon: Icon2 },
    { value: 'ZaloPay', label: 'Ví điện tử Zalopay', icon: Icon4 },
  ];

const PaymentPage = ({originalPrice, seatTotalPrice, comboTotalPrice,  onPromotionUpdate, onPaymentClick, ticketInfo }) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePaymentClick = () => {
    if (onPaymentClick) onPaymentClick();
    setIsPaymentComplete(true);
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const [openItem, setOpenItem] = useState(null);
  const [isPreviousStepsDisabled, setIsPreviousStepsDisabled] = useState(false);


  const [Voucher, setShowVoucher] = useState(false); // khi ấn vào đăng ký voucher sẽ hiện ra một form đè lên
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [vouchers, setVouchers] = useState(allVouchers);
  const [totalVoucherDiscountByType, setTotalVoucherDiscountByType] = useState(()=>
  {
    const tem = localStorage.getItem('totalVoucherDiscountByType')
    return tem? JSON.parse(tem): {}
  }); //State lưu tổng discount cho từng loại của voucher
  const[deleteVoucher, setDeleteVoucher]=useState(false)

  const [DiscountCode, setShowDiscountCode] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const[discountCodes, setDiscountCodes] =useState(allDiscountCodes);
  const [totalDiscountCodes, setTotalDiscountCodes] = useState(()=>
    {
      const tem = localStorage.getItem('totalDiscountCodes')
      return tem? JSON.parse(tem): 0
    }); // State lưu tổng discount của tất cả các mã giảm giá
  const[deleteDiscountCode, setDeleteDiscountCode]=useState(false)

  const [deleteTrigger, setDeleteTrigger] = useState(0);


  const [appliedVouchers, setAppliedVouchers] = useState(() => {
    const storedData = localStorage.getItem('promotionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.appliedVouchers || [];  // Lấy appliedVouchers từ dữ liệu tổng hợp
    }
    return [];
  });
  
  const [appliedDiscountCodes, setAppliedDiscountCodes] = useState(() => {
    const storedData = localStorage.getItem('promotionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.appliedDiscountCodes || [];  // Lấy appliedDiscountCodes từ dữ liệu tổng hợp
    }
    return [];
  });
  


  const toggleSubItems = (itemName) => {
    if (!isPreviousStepsDisabled) {
      setOpenItem(openItem === itemName ? null : itemName);
    }
  };

  const closeModal = () => {
    setShowVoucher(false);
    setShowDiscountCode(false);
    setVoucherMessage('');
    setVoucherInput('');
    setDiscountInput('');
    setDiscountMessage('');

    setShowConfirmDelete1(false);
    setShowConfirmDelete2({isOpen: false, index: null});
    // setDeleteVoucher(false);
    // setDeleteDiscountCode(false);
  };

  // const handlePaymentMethodChange = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  //   setIsPreviousStepsDisabled(true);
  // };

  // const handleStepClick = (isLastStep) => {
  //   if (isLastStep) {
  //     setSelectedPaymentMethod('');
  //     setIsPreviousStepsDisabled(false);
  //   }
  // };


  const handleCodeSubmit = (event, type) => {
    event.preventDefault(); // Ngăn chặn submit form mặc định và tải lại trang
  
    // Lấy trạng thái và dữ liệu theo loại (voucher hoặc discountCode)
    const isVoucher = type === 'voucher';
    const codeInput = isVoucher ? voucherInput : discountInput;
    const codes = isVoucher ? vouchers : discountCodes;
    const appliedCodes = isVoucher ? appliedVouchers : appliedDiscountCodes;
    const setMessage = isVoucher ? setVoucherMessage : setDiscountMessage;
    const setCodes = isVoucher ? setVouchers : setDiscountCodes;
    const setAppliedCodes = isVoucher ? setAppliedVouchers : setAppliedDiscountCodes;
  
    const code = codes.find(c => c.code === codeInput);
    let isValid = false;
  
    if (!code) {
      setMessage(isVoucher ? "Voucher không hợp lệ." : "Mã giảm giá không hợp lệ.");
      return;
    } else if (code.used) {
      setMessage(isVoucher ? "Voucher đã được sử dụng." : "Mã giảm giá đã được sử dụng.");
    } else if (appliedCodes.map(c => c.type).includes(code.type)) {
      setMessage(`Bạn đã áp dụng một ${isVoucher ? 'voucher' : 'mã giảm giá'} loại ${code.type} trước đó.`);
    } else {
      setMessage(`Áp dụng thành công ${isVoucher ? 'voucher' : 'mã giảm giá'} ${code.type} với mức giảm ${code.discount}%!`);
      isValid = true;
      
      // Đánh dấu mã đã sử dụng và thêm vào danh sách đã áp dụng
      code.used = true;
      setCodes([...codes]); // Cập nhật lại danh sách mã
      setAppliedCodes([...appliedCodes, code]); // Thêm mã vào danh sách đã áp dụng
    }
    // Cập nhật tổng discount theo từng loại
    if (isVoucher && isValid) {
      setTotalVoucherDiscountByType(prevTotals => ({
        ...prevTotals,
        [code.type]: (prevTotals[code.type] || 0) + code.discount
      }));
    }else if(!isVoucher && isValid) {
      // Cập nhật tổng discount cho tất cả các mã giảm giá
      const newTotalDiscount = appliedDiscountCodes.reduce((total, ds_code) => total + ds_code.discount, code.discount);
      setTotalDiscountCodes(newTotalDiscount);
    }
  };

  const handleDeleteVoucher = (index) => {
    const item = vouchers.find(c=>c.code===appliedVouchers[index].code);
    item.used = false;
    setVouchers([...vouchers]);
    setTotalVoucherDiscountByType(prevTotals => ({
      ...prevTotals,
      [item.type]: (prevTotals[item.type] || 0) - item.discount
    }));
    const updatedVouchers = appliedVouchers.filter((_, i) => i !== index);
    setAppliedVouchers(updatedVouchers);

    setDeleteTrigger(prev => prev+1);
};

const handleDeleteDiscountCode = (index) => {
    const item = discountCodes.find(c=>c.code===appliedDiscountCodes[index].code);
    item.used = false;
    setDiscountCodes([...discountCodes]);
    setTotalDiscountCodes(prev=>prev-item.discount);
    const updatedDiscountCodes = appliedDiscountCodes.filter((_, i) => i !== index);
    setAppliedDiscountCodes(updatedDiscountCodes);
    
    setDeleteTrigger(prev => prev+1);
};



const[showConfirmDelete1, setShowConfirmDelete1]=useState({isOpen: false, index: null});
const[showConfirmDelete2, setShowConfirmDelete2]=useState({isOpen: false, index: null});
const handleDeleteClick=(type, index)=>{
  if(type=='voucher'){setShowConfirmDelete1({isOpen:true, index: index})}
  else {setShowConfirmDelete2({isOpen:true, index: index})};
}

const handleConfirmDelete=(type,index)=>{
  if (index === undefined || index < 0) return; // Ngăn chặn truy cập vào một index không hợp lệ

  if(type==='voucher'){
    handleDeleteVoucher(index);
    setShowConfirmDelete1({isOpen: false, index: null});
  }
  else{
    handleDeleteDiscountCode(index);
    setShowConfirmDelete2({isOpen: false, index: null});
  }
}
const handleCancelDelete=()=>{
  setShowConfirmDelete1({isOpen:false, index: null});
  setShowConfirmDelete2({isOpen:false, index: null});
}



const promotionData = {
  appliedVouchers: appliedVouchers,
  appliedDiscountCodes: appliedDiscountCodes,
};
localStorage.setItem('promotionData', JSON.stringify(promotionData));
useEffect(() => {
  const storedData = localStorage.getItem('promotionData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    setAppliedVouchers(parsedData.appliedVouchers || []);
    setAppliedDiscountCodes(parsedData.appliedDiscountCodes || []);
  }
  localStorage.setItem('totalDiscountCodes', JSON.stringify(totalDiscountCodes))
  localStorage.setItem('totalVoucherDiscountByType', JSON.stringify(totalVoucherDiscountByType))
}, [totalDiscountCodes, totalVoucherDiscountByType, deleteTrigger]);


  const movieDiscountTotal = totalVoucherDiscountByType['movie'] || 0;
  const popcornDiscountTotal = totalVoucherDiscountByType['popcorn'] || 0;
  const promotion = (totalDiscountCodes*originalPrice + movieDiscountTotal*seatTotalPrice + popcornDiscountTotal*comboTotalPrice)*0.01;



  const [isVoucherListOpen, setIsVoucherListOpen] = useState(false);
  const [isDiscountListOpen, setIsDiscountListOpen] = useState(false);

  const toggleList = (type) => {
    const isVoucher = type === 'voucher';
    const isListOpen = isVoucher ? isVoucherListOpen : isDiscountListOpen;
    const setIsListOpen = isVoucher ? setIsVoucherListOpen : setIsDiscountListOpen;
    setIsListOpen(!isListOpen);
  };


  



  return (
    <>
      {isPaymentComplete ? (
        <PaymentTabs 
        finalAmount={(originalPrice-promotion>0?originalPrice-promotion:0).toLocaleString()}
        ticketInfo={ticketInfo}
        />
      ):
    <div className={styles.paymentPage}>
      <h1 className={styles.heading}>Đừng Bỏ Lỡ Những Ưu Đãi Tốt Nhất!</h1>
      <div className={styles.container}>
        {/* Phần các bước thanh toán */}
        <div className={styles.paymentSteps}>
          {/* Phần giảm giá */}
          <section className={`${styles.discountSection} ${isPreviousStepsDisabled ? styles.disabled : ''}`}>
          {/* <section className={styles.discountSection}> */}
            <div className={styles.step}>
              {/* <span style={{ fontStyle: 'italic' }} className={styles.a}>Bước 1:</span> */}
              <span className={styles.b}> GIẢM GIÁ</span>
            </div>
            <div style={{ fontSize: "14px", fontStyle: "italic" }}>Chỉ được nhập tối đa 1 Voucher và 1 Mã giảm giá cho từng loại</div>
            <div className={styles.mainItem} onClick={() => toggleSubItems('AHD Voucher')}>
              <span>AHD Voucher</span>
            </div>
            {openItem === 'AHD Voucher' && (
              <div className={styles.subItems}>
                <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Tên phim</span>
                  <button className={styles.registerButton} onClick={() => setShowVoucher(true)}>Đăng ký</button>
                </div>
                <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Bắp Nước</span>
                  <button className={styles.registerButton} onClick={() => setShowVoucher(true)}>Đăng ký</button>
                </div>
              </div>
            )}

            {/* hiện ra những voucher đã đăng ký */}
            
            {appliedVouchers.length > 0 && (
              <div className={`${styles.appliedCodes} ${isVoucherListOpen ? styles.open : ''}`}>
                <h3
                  onClick={() => toggleList('voucher')}
                  className={`${styles.codeToggle} ${isVoucherListOpen ? styles.open : ''}`}
                >
                  Các voucher đã áp dụng
                </h3>
                {isVoucherListOpen && (
                  // <div className={styles.voucherIndex}>
                    <ul>
                    {appliedVouchers.map((voucher, index) => (
                      <li key={index} className={styles.appliedCode}>
                        {voucher.type} - Giảm {voucher.discount}%
                        <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleDeleteClick('voucher', index)}></FontAwesomeIcon>
                        {showConfirmDelete1.isOpen && index === showConfirmDelete1.index &&
            <div className={styles.modalOverlay} onClick={closeModal}>
              {/* `${styles.modalContent}${styles.confirmOverlay}` */}
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2>Thông báo</h2>
                <div className={styles.confirmBox}>
                  <span style={{ fontWeight: "bold" }}>
                      Bạn có muốn hủy mã giảm giá <span style={{ color: "red" }}>"{voucher.code}"</span> loại <span style={{ color: "red" }}>"{voucher.type}"</span> với mức giảm <span style={{ color: "red" }}>{voucher.discount}%</span> không?
                    </span>
                    <div className={styles.buttonContainer}>
                      <button className={styles.confirmButton} style={{ marginTop: '1vw' }} onClick={()=> handleConfirmDelete('voucher',index)} >Đồng ý</button>
                      <button className={styles.cancelButton}style={{ marginTop: '1vw' }} onClick={()=> handleCancelDelete(index)}>Hủy</button>
                    </div>
                  </div>          
              </div>
            </div>
            }
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className={styles.mainItem} onClick={() => toggleSubItems('Mã giảm giá')}>
              <span>Mã giảm giá</span>
            </div>
            {openItem === 'Mã giảm giá' && (
              <div className={styles.subItems}>
                {/* <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Tên phim</span>
                  <button className={styles.registerButton} onClick={() => setShowDiscountCode(true)}>Đăng ký</button>
        
                </div>
                <div className={styles.subItem}>
                  <span>Bắp Nước</span>
                  <button className={styles.registerButton} onClick={() => setShowDiscountCode(true)}>Đăng ký</button>
                </div> */}
                <div className={styles.section}>
                  <span>   Áp dụng mã giảm giá để nhận nhiều ưu đãi!       </span>
                  <button className={styles.registerButton} onClick={() => setShowDiscountCode(true)}>Áp dụng</button>
        
                </div>
              </div>
            )}


            {/* hiện ra những Mã giảm giá đã đăng ký */}
            {appliedDiscountCodes.length > 0 && (
              <div className={`${styles.appliedCodes} ${isDiscountListOpen ? styles.open : ''}`}>
                <h3
                  onClick={() => toggleList('discount')}  
                  className={`${styles.codeToggle} ${isDiscountListOpen ? styles.open : ''}`}
                >
                  Các Mã giảm giá đã áp dụng
                </h3>
                {isDiscountListOpen && (
                  <ul>
                    {appliedDiscountCodes.map((ds_code, index) => (
                      <li key={index} className={styles.appliedCode}>
                        {ds_code.type} - Giảm {ds_code.discount}%
                        <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleDeleteClick('discountCode', index)}></FontAwesomeIcon>
                        {/* <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleDeleteDiscountCode(index)}></FontAwesomeIcon> */}
                        
                        {showConfirmDelete2.isOpen && index === showConfirmDelete2.index &&
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2 >Thông báo</h2>
                <div className={styles.confirmBox}>
                  <span style={{ fontWeight: "bold" }}>
                    Bạn có muốn hủy mã giảm giá <span style={{ color: "red" }}>"{ds_code.code}"</span> loại <span style={{ color: "red" }}>"{ds_code.type}"</span> với mức giảm <span style={{ color: "red" }}>{ds_code.discount}%</span> không?
                  </span>
                  <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} style={{ marginTop: '1vw' }} onClick={()=> handleConfirmDelete('discountCode',index)} >Đồng ý</button>
                    <button className={styles.cancelButton} style={{ marginTop: '1vw' }} onClick={()=> handleCancelDelete()}>Hủy</button>
                  </div>
                </div>
              </div>
            </div>
            }
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}


          </section>

          {Voucher && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2>Đăng ký Voucher</h2>
                <form onSubmit={(e) =>handleCodeSubmit(e,'voucher')} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="number_voucher">Số voucher *</label>
                    <input
                      type="text"
                      id="number_voucher"
                      name="number_voucher"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button style={{ marginTop: '1vw' }}>Đăng ký</button>
                 
                </form>
                {voucherMessage && <p className={styles.codeMessage}>{voucherMessage}</p>}
              </div>
            </div>
          )}
          
          {DiscountCode && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2>Đăng ký Mã giảm giá</h2>
                <form onSubmit={(e) =>handleCodeSubmit(e,'discount')} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="discount_code">Discount Code *</label>
                    <input
                      type="text"
                      id="discount_code"
                      name="discount_code"
                      value={discountInput}
                      onChange={(e) => setDiscountInput(e.target.value)}
                      required
                    />
                  </div>
                  {/* type="submit" */}
                  <button style={{ marginTop: '1vw' }}>Đăng ký</button>
                  {/* <button type="submit"  style={{ marginTop: '1vw' }}>Hoàn tất</button> */}
                </form>
                {discountMessage && <p className={styles.codeMessage}>{discountMessage}</p>}
              </div>
            </div>
          )}

          {/* Phần hình thức thanh toán
           <section
            className={styles.paymentMethodSection}
            onClick={() => handleStepClick(true)} // Nhấn vào bước cuối cùng để xóa dấu chọn
          >
            <div className={styles.step}>
            <span style={{ fontStyle: 'italic' }} className={styles.a}>Bước 2:</span>
              <span className={styles.b}> HÌNH THỨC THANH TOÁN</span>
              </div>
            <div className={styles.paymentMethod}>
              {paymentMethods.map((method) => (
                <div className={styles.paymentLabel} key={method.value}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={selectedPaymentMethod === method.value}
                    onChange={handlePaymentMethodChange}
                  />
                  <img src={method.icon} alt={`${method.value} Icon`} className={styles.icon} />
                  <span>{method.label}</span>
                </div>
              ))}
            </div>
          </section> */}
        </div>
        {/* Phần tóm tắt */}
         <aside className={styles.summarySection}>
           <h3>Tổng cộng</h3>
           <p>Giá gốc: {originalPrice.toLocaleString()} đ</p>
           <p>Khuyến mãi: {promotion.toLocaleString()} đ</p>
           <p className={styles.totalAmount}>Tổng số tiền thanh toán: {(originalPrice-promotion>0?originalPrice-promotion:0).toLocaleString()} đ</p>
           <CountdownTimer initialMinutes={5} initialSeconds={0} />
           <img  
            src={paymentButton} 
            alt={`paymentButton`} 
            className={styles.paymentIcon}   
            onClick={handlePaymentClick}
           />
         </aside>
      </div>
      <div className={styles.agreementSection}>
        {/* <label>
          <input type="checkbox" />
            <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
        </label> */}
        <div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default PaymentPage;

