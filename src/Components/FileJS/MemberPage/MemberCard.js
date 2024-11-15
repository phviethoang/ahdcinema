import React, { useState, useEffect } from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';
import silverLeafIcon from '../../../img/rankingImage/silverLeafIcon.png';
import goldLeafIcon from '../../../img/rankingImage/goldLeafIcon.png';
import MemberInfoTable from "./MemberInfoTable";

var MemberCards=[{
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
  cardTyoe: "GOLD",
  
}]
function T1() {
  const [showConfirm, setShowConfirm] = useState(false);
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
  const handleConfirmUpgrade = () => {
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

  const handleCancelUpgrade = () => {
    setShowConfirm(false);
  };

  const containerClassName = `${styles.container} ${
    upgradeType === 'silver' && hiddenCards.silverCard ? styles.silverBackground : ''
  } ${upgradeType === 'gold' && hiddenCards.goldCard ? styles.goldBackground : ''}`;

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
            <ul>
              <li>Tặng bỏng nước lần 1,2</li>
              <li>{  } Các lần sau giảm 70%</li>
              <li>Tích điểm 10%</li>
             </ul>
            <button className={styles.upgradeButton} onClick={() => handleUpgradeClick('silver')}>Upgrade</button>
          </div>
        )}

        {!hiddenCards.goldCard && (
          <div className={styles.goldCard}>
            <h2 className={styles.sparkleText}>Gold Membership</h2>
            <img src={goldLeafIcon} alt="Gold Leaf" className={styles.rankingIcon} />
            <p>Upgrade to Gold for premium benefits!</p>
            <ul>
               <li>Vé giảm 50%</li>
               <li>Tặng bỏng nước lần 1,2</li>
               <li>{  } Các lần sau giảm 80%</li>
               <li>Cơ hội nhận quà Limited</li>
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
            <button className={styles.confirmButton} onClick={handleConfirmUpgrade}>Yes</button>
            <button className={styles.cancelButton} onClick={handleCancelUpgrade}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default T1;

