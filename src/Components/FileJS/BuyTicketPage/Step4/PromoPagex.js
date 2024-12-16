import React, { useState, useEffect } from 'react';
import styles from '../../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import CountdownTimer from '../Step3/CountdownTimer';
import PaymentTabs from'../../Payment/PaymentTabs'
import paymentButton from '../../../../img/PaymentIcon/paymentButton.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const allVouchers = [
    { name: 'Giảm Giá Hè Tưng Bừng 2024', code: 'SUMMER10', discount: 10, expiryDate: '2024-08-31' },
    { name: 'Giảm Giá Siêu Phim', code: 'MOVIE20', discount: 20, expiryDate: '2025-07-15' },
    { name: 'Giảm Giá Thực Phẩm', code: 'FOOD15', discount: 15, expiryDate: '2025-06-30' },
    { name: 'Combo Siêu Tiết Kiệm', code: 'COMBO25', discount: 25, expiryDate: '2025-09-10' },
    { name: 'Giảm Giá Lễ Hội', code: 'FESTIVE30', discount: 30, expiryDate: '2025-12-25' },
    { name: 'Chào Mừng Thành Viên Mới', code: 'WELCOME5', discount: 5, expiryDate: '2025-06-01' },
    { name: 'Giảm Giá VIP Đỉnh Cao', code: 'VIP40', discount: 40, expiryDate: '2025-05-31' },
    { name: 'Giảm Giá Sinh Nhật Khủng', code: 'BIRTHDAY10', discount: 10, expiryDate: '2025-04-15' },
    { name: 'Giảm Giá Năm Mới Phát Tài', code: 'NEWYEAR35', discount: 35, expiryDate: '2025-01-15' },
    { name: 'Giảm Giá Flash Sale Siêu Hấp Dẫn', code: 'FLASHSALE', discount: 30, expiryDate: '2025-06-10' },
    { name: 'Giảm Giá Flash Sale VIP Siêu Cấp', code: 'FLASHSALEVIP', discount: 40, expiryDate: '2025-06-05' }
];

  
  // const membership={
  //   membershipLevel : "STANDARD",
  //   benefits:[

  //   ]
  // }

  // const membershipLevel = "SILVER";
  // const membership={
  //   membershipLevel : "SILVER",
  //   benefits: [
  //             "Tặng toàn bộ bỏng nước trong 2 lần đầu mua vé",
  //             "Giảm 70% giá bỏng, nước trong các lần tiếp theo",
  //             "Tích điểm 10% khi mua sản phẩm bất kì",
  //           ],
  //   };

  const membership={
    membershipLevel : "GOLD",
    benefits: [
              "Vé giảm 50%",
              "Tặng toàn bộ bỏng nước trong 2 lần đầu mua vé",
              "Giảm 80% giá bỏng, nước trong các lần tiếp theo",
              "Tích điểm 15% khi mua sản phẩm bất kì",
              "Cơ hội nhận quà Limited"
            ],
    };

const PaymentPage = ({originalPrice, seatTotalPrice, comboTotalPrice, onPaymentClick, transactionInfo }) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePaymentClick = () => {
    if (onPaymentClick) onPaymentClick();
    setIsPaymentComplete(true);
  };

  const [openItem, setOpenItem] = useState(null);
  const [isPreviousStepsDisabled, setIsPreviousStepsDisabled] = useState(false);

const [showVoucher, setShowVoucher] = useState(false);

const [voucherInput, setVoucherInput] = useState("");

const [voucherMessage, setVoucherMessage] = useState("");

const[vouchers, setVouchers] =useState(allVouchers);

const [totalVouchers, setTotalVouchers] = useState(()=>
    {
      const tem = localStorage.getItem('totalVouchers')
      return tem? JSON.parse(tem): 0
    }); // State lưu tổng discount của tất cả các voucher

  const [deleteTrigger, setDeleteTrigger] = useState(0);


const [appliedVouchers, setAppliedVouchers] = useState(() => {
    const storedData = localStorage.getItem('promotionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.appliedVouchers || [];  // Lấy appliedVouchers từ dữ liệu tổng hợp
    }
    return [];
  });
  

  const [membershipPromo, setMembershipPromo] = useState(() => {
    const storedData = localStorage.getItem('promotionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.membershipPromo || {movie : 0, popcorn : 0};  // Lấy membershipPromo từ dữ liệu tổng hợp
    }
    return {movie : 0, popcorn : 0};
  });
  const [membershipDiscount, setMembershipDiscount] = useState(()=>
    {
      const tem = localStorage.getItem('membershipDiscount')
      return tem? JSON.parse(tem): {movie:0, popcorn: 0}
    }); // State lưu giảm giá của membershipmembership
  


  const toggleSubItems = (itemName) => {
    if (!isPreviousStepsDisabled) {
      setOpenItem(openItem === itemName ? null : itemName);
    }
  };

  const closeModal = () => {

    setShowVoucher(false);

    setVoucherInput('');

    setVoucherMessage('');

    setShowConfirmDelete({isOpen: false, index: null});
  };

  const isTimeInPast = (date, time) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);
    return selectedDateTime < currentDate;
  };

const handleVoucherSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn submit form mặc định và tải lại trang
  
    const voucher = vouchers.find(c => c.code === voucherInput);
    let isValid = false;
  
    if (!voucher) {
      setVoucherMessage("Voucher không hợp lệ!");
      return;
    } else if (voucher.used) {
      setVoucherMessage("Voucher đã được sử dụng!");
    } else if (appliedVouchers.length > 0) {
      setVoucherMessage(`Chỉ được áp dụng tối đa 1 voucher! 🤫`);
      return;
    } else if(isTimeInPast(voucher.expiryDate,"23:59")){
      setVoucherMessage(`Voucher đã hết hạn! 😭`);
      return;
    }
    else {
        setVoucherMessage(`🎉 Áp dụng thành công Voucher ${voucher.name} với mức giảm ${voucher.discount}%!`);
        isValid = true;
      
      // Đánh dấu voucher đã sử dụng và thêm vào danh sách đã áp dụng
        voucher.used = true;
        setVouchers([...vouchers]); // Cập nhật lại danh sách voucher
        setAppliedVouchers([...appliedVouchers, voucher]); // Thêm voucher vào danh sách đã áp dụng
    }

    if(isValid) {
    //   const newTotalDiscount = appliedDiscountCodes.reduce((total, voucher) => total + ds_code.discount, discountCode.discount);
      setTotalVouchers(voucher.discount);
    }
  };
  const handleApplyMembership = (membership)=>{
    setMembershipPromo(membership);
    setMembershipDiscount(membership.membershipLevel === "SILVER"?{movie:0, popcorn: 100}:(membership.membershipLevel === "GOLD")?{movie:50, popcorn: 100}:null)
  }


const handleDeleteVoucher = (index) => {
  const item = vouchers.find(c=>c.code===appliedVouchers[index].code);
  item.used = false;
  setVouchers([...vouchers]);

  setTotalVouchers(prev=>prev-item.discount);

  const updatedVouchers = appliedVouchers.filter((_, i) => i !== index);
  setAppliedVouchers(updatedVouchers);
  
  setDeleteTrigger(prev => prev+1);
};

const handleDeleteMembershipPromo = () => {
  setMembershipDiscount({movie : 0, popcorn : 0})
  setDeleteTrigger(prev => prev+1);
};



const[showConfirmDelete, setShowConfirmDelete]=useState({isOpen: false, index: null});
const handleDeleteClick=(index)=>{
    setShowConfirmDelete({isOpen:true, index: index});
}

const handleConfirmDelete=(type,index)=>{
  if (index === undefined || index < 0) return; // Ngăn chặn truy cập vào một index không hợp lệ

  if(type==='voucher'){
    handleDeleteVoucher(index);
    setShowConfirmDelete({isOpen: false, index: null});
  }
  else{
    handleDeleteMembershipPromo();
  }
}
const handleCancelDelete=()=>{
  setShowConfirmDelete({isOpen:false, index: null});
}



const promotionData = {
  appliedVouchers: appliedVouchers,
  membershipPromo : membershipPromo
};
localStorage.setItem('promotionData', JSON.stringify(promotionData));
useEffect(() => {
  const storedData = localStorage.getItem('promotionData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    setAppliedVouchers(parsedData.appliedVouchers || []);
    setMembershipPromo(parsedData.membershipPromo||{movie : 0, popcorn : 0})
  }
  localStorage.setItem('totalVouchers', JSON.stringify(totalVouchers))
  localStorage.setItem('membershipDiscount', JSON.stringify(membershipDiscount))
}, [totalVouchers, membershipDiscount, deleteTrigger]);


  const promotion = (totalVouchers*originalPrice + membershipDiscount.movie*seatTotalPrice+membershipDiscount.popcorn*comboTotalPrice)*0.01;


  const [isVouchersListOpen, setIsVouchersListOpen] = useState(false);
  const [isMembershipPromoListOpen, setIsMembershipPromoListOpen] = useState(false);

  const toggleList = (type) => {
    let isListOpen;
    let setIsListOpen;
    if (type === 'voucher') {
      isListOpen = isVouchersListOpen;
      setIsListOpen = setIsVouchersListOpen;
    } else{
      isListOpen = isMembershipPromoListOpen; 
      setIsListOpen = setIsMembershipPromoListOpen;
    }
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      {isPaymentComplete ? (
        <PaymentTabs 
        finalAmount={(originalPrice-promotion>0?originalPrice-promotion:0).toLocaleString()}
        transactionInfo={transactionInfo}
        />
      ):
    <div className={styles.paymentPage}>
      <h1 className={styles.heading}>Đừng Bỏ Lỡ Những Ưu Đãi Tốt Nhất!</h1>
      <div className={styles.container}>
        <div className={styles.paymentSteps}>
          {/* Phần giảm giá */}
          <section className={`${styles.discountSection} ${isPreviousStepsDisabled ? styles.disabled : ''}`}>
            <div className={styles.step}>
              <span className={styles.b}> GIẢM GIÁ</span>
            </div>
            <div style={{ fontSize: "14px", fontStyle: "italic" }}>Chỉ được nhập tối đa 1 Voucher</div>
            <div className={styles.mainItem} onClick={() => toggleSubItems('Voucher')}>
              <span>Voucher</span>
            </div>
            {openItem === 'Voucher' && (
              <div className={styles.subItems}>
                <div className={styles.subItemSection}>
                  <span>   Áp dụng Voucher để nhận nhiều ưu đãi!       </span>
                  <button className={styles.registerButton} onClick={() => setShowVoucher(true)}>Áp dụng</button>
                </div>
              </div>
            )}
            {appliedVouchers.length > 0 && (
              <div className={`${styles.appliedCodes} ${isVouchersListOpen ? styles.open : ''}`}>
                <h3
                  onClick={() => toggleList('voucher')}  
                  className={`${styles.codeToggle} ${isVouchersListOpen ? styles.open : ''}`}
                >
                  Voucher đã áp dụng
                </h3>
                {isVouchersListOpen && (
                  <ul>
                    {appliedVouchers.map((voucher, index) => (
                      <li key={index} className={styles.appliedCode}>
                        {voucher.name} - Giảm {voucher.discount}%
                        <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleDeleteClick(index)}></FontAwesomeIcon>
                        {showConfirmDelete.isOpen && index === showConfirmDelete.index &&
                          <div className={styles.modalOverlay} onClick={closeModal}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
                              <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                              <h2 >Thông báo</h2>
                              <div className={styles.confirmBox}>
                                <span style={{ fontWeight: "bold" }}>
                                  Bạn có muốn hủy Voucher <span style={{ color: "red" }}>"{voucher.code}"</span> với mức giảm <span style={{ color: "red" }}>{voucher.discount}%</span> không?
                                </span>
                                <div className={styles.buttonContainer}>
                                  <button className={styles.confirmButton} style={{ marginTop: '1vw' }} onClick={()=> handleConfirmDelete('voucher',index)} >Đồng ý</button>
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
            { membership.membershipLevel === "STANDARD"?
              <div className={styles.negativeMainItem}>
                <span>Ưu đãi thành viên AHD</span>
                <span style ={{fontSize:"12px"}}>( STANDARD-không có ưu đãi)</span>
              </div>
            :
              <div className={styles.mainItem} onClick={() => toggleSubItems('Ưu đãi thành viên AHD')}>
                <span>Ưu đãi thành viên AHD</span>
                <span style={{fontSize:"12px"}}>{" "}({membership.membershipLevel} MEMBER)</span>
              </div>
            }
            {openItem === 'Ưu đãi thành viên AHD' && membershipDiscount.movie === 0 && membershipDiscount.popcorn === 0&&(
              <div className={styles.subItems}>
                <div className={styles.subItemSection}>
                  <span>Áp dụng ưu đãi thành viên AHD!</span>
                  <button className={styles.registerButton} onClick = {()=>handleApplyMembership(membership)} >Áp dụng</button>
                </div>
              </div>
            )}
            {membershipDiscount.movie !== 0 && membershipDiscount.popcorn !== 0 && (
              <div className={`${styles.appliedCodes} ${isMembershipPromoListOpen ? styles.open : ''}`}>
                <h3
                  onClick={() => toggleList('membership')}
                  className={`${styles.codeToggle} ${isMembershipPromoListOpen ? styles.open : ''}`}
                >
                  Ưu đãi đã áp dụng
                </h3>
                {isMembershipPromoListOpen && (
                    <ul>
                      <li className={styles.appliedCode}>
                        Thành viên {membership.membershipLevel} - Giảm {membershipDiscount.movie}% giá vé, {membershipDiscount.popcorn}% bỏng nước
                        <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleConfirmDelete('membership', 1)}></FontAwesomeIcon>
                      </li>
                  </ul>
                )}
              </div>
            )}
          </section>
          {showVoucher && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2>Áp dụng Voucher</h2>
                <form onSubmit={(e) =>handleVoucherSubmit(e)} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="voucher">Voucher *</label>
                    <input
                      type="text"
                      id="voucher"
                      name="voucher"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      required
                    />
                  </div>
                  <button style={{ marginTop: '1vw' }}>Áp dụng</button>
                </form>
                {voucherMessage && <p className={styles.codeMessage}>{voucherMessage}</p>}
              </div>
            </div>
          )}
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
    </div>}
    </>
  );
};

export default PaymentPage;

