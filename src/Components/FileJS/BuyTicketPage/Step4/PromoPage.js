import React, { useState, useEffect } from 'react';
import styles from '../../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import CountdownTimer from '../Step3/CountdownTimer';
import PaymentTabs from'../../Payment/PaymentTabs'
import paymentButton from '../../../../img/PaymentIcon/paymentButton.png';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Notification from '../../Notification/Notitication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const PromoPage = ({originalPrice, seatTotalPrice, comboTotalPrice, transactionInfo }) => {
    console.log("transactionInfo: ", transactionInfo)
const [notification, setNotification] = useState(null);
  const navigate = useNavigate()
  const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;
  //BEGIN FETCH DATA
    //Khai báo các mảng sẽ chứa dữ liệu fetch về
    const [vouchersFetch, setVouchersFetch] = useState([]);
    
    // Hàm fetch data GET toàn bộ vouchers
    useEffect(() => {
      fetch(`http://localhost:5000/ahd/buyticket/vouchers`, {
        credentials: 'include', // Đảm bảo gửi cookie
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              // Xử lý khi chưa đăng nhập
              console.error('Unauthorized. Redirecting to login...');
              navigate('/login'); // Chuyển hướng đến trang đăng nhập
            } 
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setVouchersFetch(data))
        .catch(error => console.error('Error:', error));
    }, []);

    // In ra các mảng kiểm tra
    console.log(vouchersFetch)
 //Khai báo các mảng sẽ chứa dữ liệu fetch về
 const [membership, setMembership] = useState([]);
    
 // Hàm fetch data GET membercard
 useEffect(() => {
   fetch(`http://localhost:5000/ahd/buyticket/get-membercard?user_id=${userId}`, {
     credentials: 'include', // Đảm bảo gửi cookie
   })
     .then(response => {
       if (!response.ok) {
         if (response.status === 401) {
           // Xử lý khi chưa đăng nhập
           console.error('Unauthorized. Redirecting to login...');
           navigate('/login'); // Chuyển hướng đến trang đăng nhập
         }
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
     })
     .then(data => setMembership(data))
     .catch(error => console.error('Error:', error));
 }, []);
 
 // In ra các mảng kiểm tra
  console.log(membership)

  //END FETCH DATA
    const[vouchers, setVouchers] =useState();


    useEffect(() => {
        const convertToLocalTime = (dateString) => {
          const date = new Date(dateString);
          // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
          return date.toLocaleString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
        };
        const updatedVouchers = vouchersFetch.map((voucher) => ({
          ...voucher,
          expiry_date: convertToLocalTime(voucher.expiry_date),
        }));
        setVouchers(updatedVouchers);
      }, [vouchersFetch]);



    const postTicketInfo = async (totalPrice, userId, seatId, showtimeId, voucherId) => {
        if (!userId) {
          console.error("Missing user_id.");
          alert("User ID is required to buy ticket");
          return;
      }
      try {
          const response = await fetch(`http://localhost:5000/ahd/buyticket/payment?total_price=${totalPrice}&user_id=${userId}&seat_ids=${seatId}&showtime_id=${showtimeId}&voucher_id=${voucherId}`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
    
          if (!response.ok) {
              const error = await response.json()
              console.error("Error post ticket information:", error);
              alert(`Error: ${error.message || "Failed to post ticket information."}`);
              return;
          }

          let result = await response.json();
          return result.ticket_id;
      } catch (error) {
          console.error("Error during fetch:", error);
          alert("An unexpected error occurred. Please try again later.");
      }
    }



const [openItem, setOpenItem] = useState(null);
const [isPreviousStepsDisabled, setIsPreviousStepsDisabled] = useState(false);

const [showVoucher, setShowVoucher] = useState(false);

const [voucherInput, setVoucherInput] = useState("");

const [voucherMessage, setVoucherMessage] = useState("");



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
  

  const [membershipDiscount, setMembershipDiscount] = useState(() => {
    const storedData = localStorage.getItem('promotionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.membershipDiscount || 0;  // Lấy membershipDiscount từ dữ liệu tổng hợp
    }
    return 0;
  });

  

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
  
    const voucher = vouchers.find(c => c.voucher_code === voucherInput);
    // let isValid = false;
  
    if (!voucher) {
      setVoucherMessage("Voucher không hợp lệ!");
      return;
    } else if (voucher.status.toLowerCase() === 'inactive') {
      setVoucherMessage("Voucher đã được sử dụng!");
    } else if (appliedVouchers.length > 0) {
      setVoucherMessage(`Chỉ được áp dụng tối đa 1 voucher! 🤫`);
      return;
    } else if(isTimeInPast(voucher.expiry_date,"23:59")){
      setVoucherMessage(`Voucher đã hết hạn! 😭`);
      return;
    }
    else {
        setVoucherMessage(`🎉 Áp dụng thành công Voucher ${voucher.voucher_name} với mức giảm ${voucher.voucher_value}%!`);
        voucher.status = 'inActive';
        setVouchers([...vouchers]); // Cập nhật lại danh sách voucher
        setAppliedVouchers([...appliedVouchers, voucher]); // Thêm voucher vào danh sách đã áp dụng
        setTotalVouchers(voucher.voucher_value);
    }

  };
  const handleApplyMembership = (membership)=>{
    setMembershipDiscount(membership.card_type == "Silver"?20:((membership.card_type == "Gold")?35:50))
  }


  const handleDeleteVoucher = (id) => {
    const item = vouchers.find(c=>c.voucher_id===id);
    item.status = 'Active';
    setVouchers([...vouchers]);
  
    setTotalVouchers(prev=>prev-item.voucher_value);
  
    const updatedVouchers = appliedVouchers.filter((voucher) => voucher.voucher_id !== id);
    setAppliedVouchers(updatedVouchers);
    
    setDeleteTrigger(prev => prev+1);
  };

const handleDeleteMembershipDiscount = () => {
  setMembershipDiscount(0)
  setDeleteTrigger(prev => prev+1);
};



const[showConfirmDelete, setShowConfirmDelete]=useState({isOpen: false, index: null});
const handleDeleteClick=(id)=>{
    setShowConfirmDelete({isOpen:true, id: id});
}


const handleConfirmDelete=(type,id)=>{
    if (id === undefined || id < 0) return; // Ngăn chặn truy cập vào một index không hợp lệ
  
    if(type==='voucher'){
      handleDeleteVoucher(id);
      setShowConfirmDelete({isOpen: false, id: null});
    }
    else{
        handleDeleteMembershipDiscount();
      }
  }
  const handleCancelDelete=()=>{
    setShowConfirmDelete({isOpen:false, id: null});
  }
  



const promotionData = {
  appliedVouchers: appliedVouchers,
  membershipDiscount : membershipDiscount
};
localStorage.setItem('promotionData', JSON.stringify(promotionData));
useEffect(() => {
  const storedData = localStorage.getItem('promotionData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    setAppliedVouchers(parsedData.appliedVouchers || []);
    setMembershipDiscount(parsedData.membershipDiscount||0)
  }
  localStorage.setItem('totalVouchers', JSON.stringify(totalVouchers))
}, [totalVouchers, membershipDiscount, deleteTrigger]);

const maximumMembershipDiscount = membership.card_type == "Silver"?{movie:100000, popcorn: 150000}:((membership.card_type == "Gold")?{movie:200000, popcorn: 300000}:{movie:300000, popcorn: 350000});
const promotion = (totalVouchers*originalPrice + Math.min(membershipDiscount*seatTotalPrice,maximumMembershipDiscount.movie*100)+ Math.min(membershipDiscount*comboTotalPrice,maximumMembershipDiscount.popcorn*100))*0.01;
const totalPrice = originalPrice-promotion>0?originalPrice-promotion:0

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

const Seat_ids = transactionInfo?.selectedSeats?.map(s=>{return s.seat_id})
const Seat_numbers = transactionInfo?.selectedSeats?.map(s=>{return s.seat_number})
const Seat_types = transactionInfo?.selectedSeats?.map(s=>{return s.seat_type})
const Showtime_id = transactionInfo?.selectedSeats[0].showtime_id
console.log("Seat_id: ", Seat_ids)
console.log("Seat_numbers: ", Seat_numbers)
console.log("Seat_types: ", Seat_types)
console.log("Showtime_id: ", Showtime_id)
console.log("appliedVouchers[0].voucher_id: ", appliedVouchers[0]?.voucher_id)

  const handlePaymentClick = async () => {

    if(transactionInfo.selectedSeats.length===0||transactionInfo.selectedSeats.length>9){
      setNotification({message:"Số ghế mua tối thiểu là 1 và tối đa là 9!", type: "error"})
    }
    else{
    const ticket_id = await postTicketInfo(totalPrice, userId, Seat_ids, Showtime_id, appliedVouchers.length>0?appliedVouchers[0]?.voucher_id:null);
    if(ticket_id) navigate(`/payment?ticket_id=${ticket_id}`);
    } 
  };

  return (
    <>
    <div className={styles.paymentPage}>
      <Notification 
        message={notification?.message}  // Tránh lỗi khi notification là null
        type={notification?.type}        // Tránh lỗi khi notification là null
        onClose={() => setNotification(null)} 
      />
    {/* <div className={styles.paymentPage}> */}
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
                    {appliedVouchers.map((voucher) => (
                        <li key={voucher.voucher_id} className={styles.appliedCode}>
                        {voucher.voucher_name} - Giảm {voucher.voucher_value}%
                        <FontAwesomeIcon style={{ color: "orange" }}  icon={faTrash}  onClick={() => handleDeleteClick(voucher.voucher_id)}></FontAwesomeIcon>
                        {showConfirmDelete.isOpen && voucher.voucher_id === showConfirmDelete.id &&
                            <div className={styles.modalOverlay} onClick={closeModal}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} >
                                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                                <h2 >Thông báo</h2>
                                <div className={styles.confirmBox}>
                                <span style={{ fontWeight: "bold" }}>
                                    Bạn có muốn hủy Voucher <span style={{ color: "red" }}>"{voucher.voucher_name}"</span> với mức giảm <span style={{ color: "red" }}>{voucher.voucher_value}%</span> không?
                                </span>
                                <div className={styles.buttonContainer}>
                                    <button className={styles.confirmButton} style={{ marginTop: '1vw' }} onClick={()=> handleConfirmDelete('voucher',voucher.voucher_id)} >Đồng ý</button>
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
            { membership.card_type === "Standard"?
              <div className={styles.negativeMainItem}>
                <span>Ưu đãi thành viên AHD</span>
                <span style ={{fontSize:"12px"}}>( STANDARD-không có ưu đãi)</span>
              </div>
            :
              <div className={styles.mainItem} onClick={() => toggleSubItems('Ưu đãi thành viên AHD')}>
                <span>Ưu đãi thành viên AHD</span>
                <span style={{fontSize:"12px"}}>{" "}({membership.card_type} MEMBER)</span>
              </div>
            }
            {openItem === 'Ưu đãi thành viên AHD' && membershipDiscount ===  0&&(
              <div className={styles.subItems}>
                <div className={styles.subItemSection}>
                  <span>Áp dụng ưu đãi thành viên AHD!</span>
                  <button className={styles.registerButton} onClick = {()=>handleApplyMembership(membership)} >Áp dụng</button>
                </div>
              </div>
            )}
            {membershipDiscount !== 0 && (
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
                        Thành viên {membership.card_type} - Giảm {membershipDiscount}% giá vé, {membershipDiscount}% bỏng nước
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
           <p className={styles.totalAmount}>Tổng số tiền thanh toán: {totalPrice.toLocaleString()} đ</p>
           <CountdownTimer initialMinutes={5} initialSeconds={0} />
           <img  
            src={paymentButton} 
            alt={`paymentButton`} 
            className={styles.paymentIcon}   
            onClick={handlePaymentClick}
           />
         </aside>
      </div>
    </div>
    </>
  );
};

export default PromoPage;

