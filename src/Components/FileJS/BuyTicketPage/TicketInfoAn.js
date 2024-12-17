import React from "react";
import styles from "../../FileCSS/BuyTicketPage/BuyTicket.module.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight,faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
const TicketInfo = ({ totalPrice, combo, selectedSeats, onNext, onPrevious, promotion, useFor, theater, time, date, room, cardImg, movieName  }) => {
    const [categorizedSeats, setCategorizedSeats] = useState({});

    useEffect(() => {
        if (!Array.isArray(selectedSeats)) {
            setCategorizedSeats({});
            return;
        }
        console.log("hello: ",selectedSeats);
        const updatedSeats = selectedSeats.reduce((acc, seatId) => {
            console.log(acc)
            console.log(seatId)
            // const seat = seatData.find(seat => seat.seat_id === seatId);
            const seat = seatId
            const type = seat.seat_type;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(seat.seat_number);
            return acc;
        }, {});
    
        setCategorizedSeats(updatedSeats);
    }, [selectedSeats]);
      
useEffect(()=>{
    console.log("categorizedSeats: ",categorizedSeats);
    console.log(categorizedSeats.Sweetbox)
},[categorizedSeats])

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
                <div className={`${styles.cardImg}`}>
                    <img src={cardImg} alt=''></img>
                </div>
                <div className={styles.movieName}>{movieName}</div>
            </div>

            {/* Thông tin rạp */}
            <div className={`${styles.section} ${styles.theaterInfo}`}>
                <p><strong>Rạp: </strong>{theater} </p>
                <p><strong>Suất chiếu: </strong>{time}, {date}</p>
                <p><strong>Phòng chiếu: </strong>{room}</p>
            </div>

            {/* Thông tin giá */}
            <div className={`${styles.section} ${styles.priceInfo}`}>
                <h3><strong>Combo:</strong></h3>
                <ul>
                    {combo.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h3><strong>Ghế đã chọn:</strong></h3>
                <ul>
                    {categorizedSeats.Standard && (
                        <li>Regular: {categorizedSeats.Standard.join(', ')}</li>
                    )}
                    {categorizedSeats.VIP && (
                        <li><strong>VIP:</strong> {categorizedSeats.VIP.join(', ')}</li>
                    )}
                    {categorizedSeats.Sweetbox && (
                        <li><strong>Sweetbox:</strong> {categorizedSeats.Sweetbox.join(', ')}</li>
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
