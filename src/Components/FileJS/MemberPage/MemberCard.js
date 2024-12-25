import React, { useState, useEffect } from "react";
import styles from "../../FileCSS/MemberPage/member.module.css";
import icon1 from "../../../img/MemberInfoImage/silverLeafIcon.png";
import icon2 from "../../../img/MemberInfoImage/goldLeafIcon.png";
import icon3 from "../../../img/MemberInfoImage/platinumLeafIcon.png";
import MemberInfoTable from "./MemberInfoTable";
import PaymentTabs from "../Payment/PaymentTabs";
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom';

const MemberCards = ({memberInfo})=>{

//BEGIN FETCH DATA
  //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [cardType, setCardType] = useState([]);
  const [userMemberCard, setUserMemberCard]= useState([])
  const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;
  const navigate = useNavigate();
  // Hàm fetch data GET card-types
  useEffect(() => {
    fetch(`http://localhost:5000/ahd/card-types?user_id=${userId}`, {
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
      .then(data => setCardType(data))
      .catch(error => console.error('Error:', error));
  }, [userId]);

 // Hàm fetch data GET user-membercard
  useEffect(() => {
    fetch(`http://localhost:5000/ahd/user-membercard?user_id=${userId}`, {
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
    .then(data => setUserMemberCard(data))
    .catch(error => console.error('Error:', error));
  }, [userId]);
  // In ra các mảng kiểm tra
  console.log("Done fetching data!")
  console.log(cardType)
  console.log("userMemberCard: ",userMemberCard)

  //POST thông tin thẻ mà người dùng chọn muốn mua
  const postCardInfo = async (selectCard, userId) => {
    if (!userId) {
        console.error("Missing user_id.");
        alert("User ID is required to buy card");
        return;
    }
    let cardId=selectCard.card_id
    try {
        const response = await fetch(`http://localhost:5000/ahd/buycard?user_id=${userId}&card_id=${cardId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error choosing card-type:", error);
            alert(`Error: ${error.message || "Failed to buy card."}`);
            return;
        }

        let result = await response.json();
        return result.purchase_id;
    } catch (error) {
        console.error("Error during fetch:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
  };

  // END FETCH DATA


  const [showConfirm, setShowConfirm] = useState(false);
  const [selectCard, setSelectCard]= useState()
  // Hàm xử lý khi nhấn nút "Upgrade"
  const handleUpgradeClick = (card) => {
    setSelectCard(card)
    setShowConfirm(true);
  };
  useEffect(()=>{
    console.log("selectCard: ",selectCard, typeof selectCard)
  },[selectCard])

// Gọi API và chuyển hướng
  const handlePurchase = async () => {
    // const selectCard = cardType[1]; // Giả định người dùng chọn thẻ có ID=2
    console.log("hahha:  ",selectCard)
    const purchaseId = await postCardInfo(selectCard, userId);
    console.log("okok: ",purchaseId)
    if (purchaseId) {
        // Sử dụng useNavigate để điều hướng đến trang thanh toán với purchaseId
        navigate(`/payment?purchase_id=${purchaseId}`);
    }
    setShowConfirm(false);
  };

  const handleCancelUpgrade = () => {
    setShowConfirm(false);
  };
  const handleConfirmUpgrade = ()=>{
    setShowConfirm(false);
    handlePurchase()
  }

  const containerClassName = `${styles.container} ${
    userMemberCard.card_id === 1 ? styles.silverBackground : ''
  } ${userMemberCard.card_id === 2 ? styles.goldBackground : ''}
  ${userMemberCard.card_id ===3? styles.platinumBackground : ''}
  `;

  const silverCard = cardType.find((card) => card.card_id === 1);
  const goldCard = cardType.find((card) => card.card_id === 2);
  const platinumCard = cardType.find((card) => card.card_id === 3);
  const cardIcons = {
    Silver: icon1,
    Gold: icon2,
    Platinum: icon3
  };
  const convertToLocalTime = (dateString) => {
    const date = new Date(dateString);
    // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
    return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });
};

  console.log(silverCard?.benefits)
  console.log(goldCard?.benefits)
    const userCardType = cardType.find(card=>card.card_id===userMemberCard?.card_id)
    const purchaseDate = convertToLocalTime(userMemberCard?.purchase_date)
    const expiryDate = convertToLocalTime(userMemberCard?.expiry_date)
    const userBenefits = (userCardType?.benefits && typeof userCardType.benefits === 'string')? userCardType.benefits.split(',') : [];
  return (
<div className={containerClassName}>
      <div className={styles.currentCard}>
        <MemberInfoTable 
            membershipLevel={userCardType ?userCardType.card_type:'Standard'}  
            purchaseDate = {purchaseDate?purchaseDate:"Chưa mua thẻ thành viên"} 
            expiryDate={expiryDate?expiryDate:"Chưa mua thẻ thành viên"} 
            memberInfo={memberInfo}
            userBenefits={userBenefits}
        />
      </div>

      <div className={styles.enhanceCard}>
        {cardType.map((card) => (
            <div key={card.card_id} className={styles[`${card.card_type.toLowerCase()}Card`]}>
            <h2 className={styles.sparkleText}>{`${card.card_type} Membership`}</h2>
            <img
                src={cardIcons[card.card_type]} 
                alt={`${card.card_type} Leaf`}
                className={styles.rankingIcon}
            />
            <p>{card.description}</p>
            <div>{card.benefits}</div>
            <button
                className={styles.upgradeButton}
                onClick={() => handleUpgradeClick(card)}
            >
                Nâng cấp
            </button>
            </div>
        ))}
        </div>
      {/* Form xác nhận nâng cấp */}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Bạn có muốn nâng cấp lên hạng thẻ {selectCard.card_type} Membership?</p>
            <p>Giá tiền :{selectCard.price.toLocaleString()}đ </p>
            <button className={styles.confirmButton} onClick={handleConfirmUpgrade}>Yes</button>
            <button className={styles.cancelButton} onClick={handleCancelUpgrade}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MemberCards;
