import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';
import silverLeafIcon from '../../../img/MemberInfoImage/silverLeafIcon.png';
import goldLeafIcon from '../../../img/MemberInfoImage/goldLeafIcon.png';
import MemberInfoTable from "./MemberInfoTable";
// import PaymentTabs from "../BuyTicketComponent/PaymentComponent/PaymentTabs"
import { useNavigate} from 'react-router-dom';

const AllMemberCards=[{
  cardID:1,
  cardType: "SILVER",
  price: 300000,
  duration: 30,
  benefits: [
    "Tặng toàn bộ bỏng nước trong 2 lần đầu mua vé",
    "Giảm 70% giá bỏng, nước trong các lần tiếp theo",
    "Tích điểm 10% khi mua sản phẩm bất kì"
  ]
},{
  cardID:2,
  cardType: "GOLD",
  price: 700000,
  duration: 30,
  benefits: [
    "Vé giảm 50%",
    "Tặng bỏng nước lần 1,2",
    "Các lần sau giảm 80%",
    "Cơ hội nhận quà Limited"
  ]
}]
const MemberCards = ()=>{
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  // const [payment, setPayment] = useState(false); 
  const [upgradeType, setUpgradeType] = useState(null);
  const [membershipLevel, setMembershipLevel] = useState("STANDARD");
  const [expiryDate, setExpiryDate] = useState(null);
  const [hiddenCards, setHiddenCards] = useState({
    silverCard: false,
    goldCard: false,
  });

  // Hàm tính toán số ngày còn lại
  const calculateDaysRemaining = () => {
    if (!expiryDate) return 0;
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const timeDifference = expiry - currentDate;
    return Math.max(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)), 0); // Số ngày còn lại hoặc 0 nếu đã hết hạn
  };

  // useEffect kiểm tra ngày hết hạn và reset nếu đã hết hạn
  useEffect(() => {
    if (expiryDate && calculateDaysRemaining() === 0) {
      setMembershipLevel("STANDARD");
      setHiddenCards({ silverCard: false, goldCard: false });
      setExpiryDate(null);
    }
  }, [expiryDate]);


  // Hàm tính ngày hết hạn sau khi nâng cấp
  const calculateExpiryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    return currentDate.toLocaleDateString();
  };

  // Hàm xử lý khi nhấn nút "Upgrade"
  const handleUpgradeClick = (type) => {
    setUpgradeType(type);
    setShowConfirm(true);
  };

  // Hàm xử lý xác nhận nâng cấp
  const handleSuccessfulPayment = () => {
    if (upgradeType === 'silver') {
      setHiddenCards({ ...hiddenCards, silverCard: true });
      setMembershipLevel("SILVER");
    } else if (upgradeType === 'gold') {
      setHiddenCards({ silverCard: true, goldCard: true });
      setMembershipLevel("GOLD");
    }
    setExpiryDate(calculateExpiryDate());
    setShowConfirm(false);
  };

  const handleConfirmUpgrade = () => {
    const selectedCard = upgradeType === 'silver' ? silverCard : goldCard;
    // setPayment(true);
    // Chuyển hướng sang PaymentTabs với dữ liệu liên quan
    navigate('/payment', {
      state: {
        finalAmount: selectedCard.price.toLocaleString(), // Giá trị cuối cùng
        transactionInfo: {
            cardType: selectedCard.cardType,
            price: selectedCard.price,
            duration: selectedCard.duration,
            benefits: selectedCard.benefits,
            type : "upgradeMembership"
        }
    }
    });
  };

  const handleCancelUpgrade = () => {
    setShowConfirm(false);
  };

  const containerClassName = `${styles.container} ${
    upgradeType === 'silver' && hiddenCards.silverCard ? styles.silverBackground : ''
  } ${upgradeType === 'gold' && hiddenCards.goldCard ? styles.goldBackground : ''}`;

  const silverCard = AllMemberCards.find((card) => card.cardID === 1);
  const goldCard = AllMemberCards.find((card) => card.cardID === 2);
  // if (!silverCard || !goldCard) {
  //   console.error("Error: Card data is missing.");
  //   return null;
  // }
  // else{
  //   console.log("win")
  // }
  return (
    
    <div className={containerClassName}>
      {/* Thông tin thẻ thành viên cơ bản */}
      <div className={styles.currentCard}>
        <MemberInfoTable 
          membershipLevel={membershipLevel} 
          expiryDate={expiryDate} 
          daysRemaining={calculateDaysRemaining()} 
        />
      </div>

      {/* Thẻ Silver và Gold */}
      <div className={styles.enhanceCard}>
        {!hiddenCards.silverCard && (
          <div className={styles.silverCard}>
            <h2 className={styles.sparkleText}>Silver Membership</h2>
            <img src={silverLeafIcon} alt="Silver Leaf" className={styles.rankingIcon} />
            <p>Upgrade to Silver for extra benefits!</p>
            <ul style = {{listStyleType: "none"}}>
            {silverCard.benefits.map((benefit, index) => (
              <li>{benefit}</li>
            ))}
            </ul>
            <button className={styles.upgradeButton} onClick={() => handleUpgradeClick('silver')}>Upgrade</button>
          </div>
        )}

        {!hiddenCards.goldCard && (
          <div className={styles.goldCard}>
            <h2 className={styles.sparkleText}>Gold Membership</h2>
            <img src={goldLeafIcon} alt="Gold Leaf" className={styles.rankingIcon} />
            <p>Upgrade to Gold for premium benefits!</p>
            <ul style = {{listStyleType: "none"}}>
            {goldCard.benefits.map((benefit, index) => (
              <li>{benefit}</li>
            ))}
            </ul>
            <button className={styles.upgradeButton} onClick={() => handleUpgradeClick('gold')}>Upgrade</button>
          </div>
        )}
      </div>

      {/* Form xác nhận nâng cấp */}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Do you want to confirm the upgrade to {upgradeType === 'silver' ? 'Silver' : 'Gold'} Membership?</p>
            <p>Giá tiền :{upgradeType === 'silver' ? silverCard.price.toLocaleString() : goldCard.price.toLocaleString()}đ </p>
            <button className={styles.confirmButton} onClick={handleConfirmUpgrade}>Yes</button>
            <button className={styles.cancelButton} onClick={handleCancelUpgrade}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MemberCards;
