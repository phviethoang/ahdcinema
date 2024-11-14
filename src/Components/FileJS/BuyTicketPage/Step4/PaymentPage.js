import React, { useState, useEffect } from 'react';
import styles from '../../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';
import CountdownTimer from '../Step3/CountdownTimer';
import Icon1 from '../../../../img/PaymentIcon/atmIcon.png';
import Icon2 from '../../../../img/PaymentIcon/momoIcon.png';
import Icon3 from '../../../../img/PaymentIcon/visaIcon.png';
import Icon4 from '../../../../img/PaymentIcon/zalopayIcon.png';

const PaymentPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút đếm ngược
  const [total, setTotal] = useState(124909); // Tổng tiền mẫu
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [openItem, setOpenItem] = useState(null);
  const [isPreviousStepsDisabled, setIsPreviousStepsDisabled] = useState(false); // Trạng thái khóa các bước trước

  const toggleSubItems = (itemName) => {
    if (!isPreviousStepsDisabled) {
      setOpenItem(openItem === itemName ? null : itemName);
    }
  };

  // Đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value); // Đặt giá trị radio button
    setIsPreviousStepsDisabled(true); // Khóa các bước trước khi chọn phương thức thanh toán
  };

  const handleStepClick = (isLastStep) => {
    if (isLastStep) {
      setSelectedPaymentMethod(''); // Xóa dấu chọn radio button
      setIsPreviousStepsDisabled(false); // Mở lại các bước trước
    }
  };

  // Danh sách các phương thức thanh toán
  const paymentMethods = [
    { value: 'ATM', label: 'ATM card (Thẻ nội địa)', icon: Icon1 },
    { value: 'Visa', label: 'Thẻ quốc tế (Visa, Master, Amex, JCB)', icon: Icon3 },
    { value: 'MOMO', label: 'Mã MMAHD - 5K, -5K Quỹ nhóm', icon: Icon2 },
    { value: 'ZaloPay', label: 'Zalopay - 84k/vé + gói quà ưu đãi 530k', icon: Icon4 },
  ];

  return (
    <div className={styles.paymentPage}>
      <h1 className={styles.heading}>THANH TOÁN</h1>
      <div className={styles.container}>
        {/* Phần các bước thanh toán */}
        <div className={styles.paymentSteps}>
          {/* Phần giảm giá */}
          <section
            className={`${styles.discountSection} ${isPreviousStepsDisabled ? styles.disabled : ''}`}
          >
            <div className={styles.step}>
              <span style={{ fontStyle: 'italic' }} className={styles.a}>Bước 1:</span>
              <span className={styles.b}> GIẢM GIÁ</span>
            </div>

            {/* CGV Voucher */}
            <div className={styles.mainItem} onClick={() => toggleSubItems('CGV Voucher')}>
              <span>CGV Voucher</span>
            </div>
            {openItem === 'CGV Voucher' && (
              <div className={styles.subItems}>
                <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Tên phim</span>
                  <button className={styles.registerButton}>Đăng ký</button>
                </div>
                <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Bắp Nước</span>
                  <button className={styles.registerButton}>Đăng ký</button>
                </div>
              </div>
            )}

            {/* Mã giảm giá */}
            <div className={styles.mainItem} onClick={() => toggleSubItems('Mã giảm giá')}>
              <span>Mã giảm giá</span>
            </div>
            {openItem === 'Mã giảm giá' && (
              <div className={styles.subItems}>
                <div className={`${styles.section} ${styles.subItem}`}>
                  <span>Tên phim</span>
                  <button className={styles.applyButton}>Đăng ký</button>
                </div>
                <div className={styles.subItem}>
                  <span>Bắp Nước</span>
                  <button className={styles.applyButton}>Đăng ký</button>
                </div>
              </div>
            )}
          </section>

          {/* Phần hình thức thanh toán */}
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
          </section>
        </div>

        {/* Phần tóm tắt */}
        <aside className={styles.summarySection}>
          <h3>Tổng cộng</h3>
          <p>VIP: {total.toLocaleString()} đ</p>
          <p>Khuyến mãi: 0,00 đ</p>
          <p className={styles.totalAmount}>Tổng số tiền thanh toán: {total.toLocaleString()} đ</p>

          <CountdownTimer initialMinutes={5} initialSeconds={0} />
        </aside>
        
      </div>
      <div className={styles.agreementSection}>
            <label>
              <input type="checkbox" />
              <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
            </label>
          </div>
    </div>
  );
};

export default PaymentPage;
