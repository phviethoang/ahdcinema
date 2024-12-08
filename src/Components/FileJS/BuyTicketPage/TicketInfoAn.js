import React from "react";
import styles from "../../FileCSS/BuyTicketPage/BuyTicket.module.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight,faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
const TicketInfo = ({ totalPrice, combo, selectedSeats, onNext, onPrevious, promotion, useFor }) => {

    
    const [categorizedSeats, setCategorizedSeats] = useState({});

    useEffect(()=>{
        const updatedSeats = selectedSeats.reduce((acc, seat) => {
            if (!acc[seat.type]) {
                acc[seat.type] = [];
            }
            acc[seat.type].push(seat.seatNumber);
            return acc;
            }, {});
    
        setCategorizedSeats(updatedSeats);
    },[selectedSeats])     

return (
    <div className={styles.ticketInfo}>
        {/* Nội dung hiển thị TicketInfo */}
        <button 
            className={`${styles.navButton} ${styles.prev}`} 
            onClick={onPrevious}
        >
            <FontAwesomeIcon icon={faHandPointLeft} /> 
            PREV
        </button>
        
        <div className={styles.ticketDetails}>
            <div className={`${styles.section} ${styles.movieInfo}`}>
                {/* Thông tin phim */}
            </div>

            {/* Thông tin rạp */}
            <div className={`${styles.section} ${styles.theaterInfo}`}>
                <p><strong>Rạp:</strong> </p>
                <p><strong>Suất chiếu:</strong></p>
                <p><strong>Phòng chiếu:</strong></p>
            </div>

            {/* Thông tin giá */}
            <div className={`${styles.section} ${styles.priceInfo}`}>
                <h3>Combo:</h3>
                <ul>
                    {combo.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h3>Ghế đã chọn:</h3>
                <ul>
                    {categorizedSeats.regular && (
                        <li>Regular: {categorizedSeats.regular.join(', ')}</li>
                    )}
                    {categorizedSeats.vip && (
                        <li><strong>VIP:</strong> {categorizedSeats.vip.join(', ')}</li>
                    )}
                    {categorizedSeats.sweetbox && (
                        <li><strong>Sweetbox:</strong> {categorizedSeats.sweetbox.join(', ')}</li>
                    )}
                </ul>

                <p><strong style={{ color: "red" }}>Giá gốc:</strong> {totalPrice.toLocaleString()}đ</p>
            </div>
        </div>
        
        <button 
            className={`${styles.navButton} ${styles.next}`} 
            onClick={onNext}
        >
            <FontAwesomeIcon icon={faHandPointRight} /> 
            NEXT
        </button>
    </div>
    )
};

export default TicketInfo;
