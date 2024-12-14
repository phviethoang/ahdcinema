import React, { useState, useEffect } from "react";
import styles from "../../FileCSS/MemberPage/member.module.css";
import silverLeafIcon from "../../../img/MemberInfoImage/silverLeafIcon.png";
import goldLeafIcon from "../../../img/MemberInfoImage/goldLeafIcon.png";
import MemberInfoTable from "./MemberInfoTable";
import PaymentTabs from "../Payment/PaymentTabs";

// Danh sách thông tin các loại thẻ
const AllMemberCards = [
  {
    cardID: 1,
    cardType: "SILVER",
    price: 300000,
    duration: 30,
    benefits: [
      "Tặng toàn bộ bỏng nước trong 2 lần đầu mua vé",
      "Giảm 70% giá bỏng, nước trong các lần tiếp theo",
      "Tích điểm 10% khi mua sản phẩm bất kì",
    ],
    icon: silverLeafIcon,
    description: "Nâng cấp lên Silver để nhận nhiều ưu đãi hơn!",
  },
  {
    cardID: 2,
    cardType: "GOLD",
    price: 700000,
    duration: 30,
    benefits: [
      "Vé giảm 50%",
      "Tặng toàn bộ bỏng nước trong 2 lần đầu mua vé",
      "Giảm 80% giá bỏng, nước trong các lần tiếp theo",
      "Tích điểm 15% khi mua sản phẩm bất kì",
      "Cơ hội nhận quà Limited"
    ],
    icon: goldLeafIcon,
    description: "Nâng cấp lên Gold để nhận ưu đãi cao cấp!",
  },
];

const MemberCards = () => {
  const [showConfirm, setShowConfirm] = useState(false); // Hiển thị khung xác nhận
  const [payment, setPayment] = useState(false); // Hiển thị giao diện thanh toán
  const [upgradeType, setUpgradeType] = useState(null); // Loại thẻ đang nâng cấp
  const [membershipLevel, setMembershipLevel] = useState("STANDARD"); // Cấp độ thành viên hiện tại
  const [expiryDate, setExpiryDate] = useState(null); // Ngày hết hạn thẻ
  const [hiddenCards, setHiddenCards] = useState({
    silverCard: false,
    goldCard: false,
  }); // Trạng thái ẩn hiện của thẻ

  // Tính số ngày còn lại trước khi hết hạn
  
  const calculateDaysRemaining = () => {
    if (!expiryDate) return 0;
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const timeDifference = expiry - currentDate;
    return Math.max(Math.ceil(timeDifference / (1000 * 60 * 60 * 24)), 0);
  };

  // Kiểm tra ngày hết hạn, nếu hết hạn thì reset về mặc định
  useEffect(() => {
    if (expiryDate && calculateDaysRemaining() === 0) {
      setMembershipLevel("STANDARD");
      setHiddenCards({ silverCard: false, goldCard: false });
      setExpiryDate(null);
    }
  }, [expiryDate]);

  // Tính ngày hết hạn sau khi nâng cấp
  const calculateExpiryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30); // Thêm 30 ngày
    return currentDate.toLocaleDateString();
  };

  // Khi nhấn "Nâng cấp"
  const handleUpgradeClick = (type) => {
    setUpgradeType(type);
    setShowConfirm(true);
  };

  // Xác nhận nâng cấp
  const handleConfirmUpgrade = () => {
    setPayment(true);
    setShowConfirm(false);
  };

  // Hủy xác nhận
  const handleCancelUpgrade = () => {
    setShowConfirm(false);
  };

  // Hoàn tất thanh toán
  const handleSuccessfulPayment = () => {
    const hiddenState = { silverCard: true, goldCard: true };
    setHiddenCards(upgradeType === "silver" ? { ...hiddenState, goldCard: false } : hiddenState);
    setMembershipLevel(upgradeType.toUpperCase());
    setExpiryDate(calculateExpiryDate());
    setPayment(false);
  };

  // Tìm thông tin thẻ được chọn
  const selectedCard = AllMemberCards.find((card) => card.cardType.toLowerCase() === upgradeType);
  const containerClassName = `${styles.container} ${
    upgradeType === 'silver' && hiddenCards.silverCard ? styles.silverBackground : ''
  } ${upgradeType === 'gold' && hiddenCards.goldCard ? styles.goldBackground : ''}`;
  return (
    <div>
      {!payment && (
          <div className={containerClassName}>
            <div className={styles.currentCard}>
              <MemberInfoTable
                membershipLevel={membershipLevel}
                expiryDate={expiryDate}
                daysRemaining={calculateDaysRemaining()}
              />
            </div>

            {/* Hiển thị các thẻ có thể nâng cấp */}
            <div className={styles.enhanceCard}>
              {AllMemberCards.map((card) => {
                const isHidden = hiddenCards[`${card.cardType.toLowerCase()}Card`];
                if (isHidden) return null;

                return (
                  <div key={card.cardID} className={styles[`${card.cardType.toLowerCase()}Card`]}>
                    <h2 className={styles.sparkleText}>{card.cardType} Membership</h2>
                    <img src={card.icon} alt={`${card.cardType} Icon`} className={styles.rankingIcon} />
                    <p>{card.description}</p>
                    <ul style={{ listStyleType: "none" }}>
                      {card.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.upgradeButton}
                      onClick={() => handleUpgradeClick(card.cardType.toLowerCase())}
                    >
                      Nâng cấp
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
      )}

      {/* Hiển thị khung xác nhận nâng cấp */}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Bạn có muốn nâng cấp lên thẻ {selectedCard?.cardType} không?</p>
            <p>Giá: {selectedCard?.price.toLocaleString()}đ</p>
            <button className={styles.confirmButton} onClick={handleConfirmUpgrade}>
              Xác nhận
            </button>
            <button className={styles.cancelButton} onClick={handleCancelUpgrade}>
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Hiển thị giao diện thanh toán */}
      {payment && selectedCard && (
        <PaymentTabs
          finalAmount={selectedCard.price.toLocaleString()}
          transactionInfo={{
            cardType: selectedCard.cardType,
            price: selectedCard.price,
            duration: selectedCard.duration,
            benefits: selectedCard.benefits,
            type: "upgradeMembership",
          }}
          onPaymentSuccessOutside={handleSuccessfulPayment}
        />
      )}
    </div>
  );
};

export default MemberCards;
