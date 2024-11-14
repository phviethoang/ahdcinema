import React from "react";
import styles from "../../FileCSS/BuyTicketPage/BuyTicket.module.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight,faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
const TicketInfo = ({ theater, time, date, totalPrice, combo, selectedSeats, onNext, onPrevious }) => {
    // Phân loại ghế đã chọn theo loại
    const categorizedSeats = selectedSeats.reduce((acc, seat) => {
        if (!acc[seat.type]) {
            acc[seat.type] = [];
        }
        acc[seat.type].push(seat.seatNumber);
        return acc;
    }, {});
    
    return (
        <div className={styles.ticketInfo}>
            <button 
                className={`${styles.navButton} ${styles.prev}`} 
                onClick={onPrevious}
            >
                <FontAwesomeIcon icon={faHandPointLeft} /> 
                PREV
            </button>
            
            <div className={styles.ticketDetails}>
                {/* Mục Thông tin phim */}
                <div className={`${styles.section} ${styles.movieInfo}`}>
                    {/* <img src="movie-poster-url.jpg" alt="Movie Poster" className={styles.poster} />
                    <div>
                        <h3>VENOM: KÉO CUỐI</h3>
                        <p>2D - T13</p>
                    </div> */}
                </div>

                {/* Mục Thông tin rạp */}
                <div className={`${styles.section} ${styles.theaterInfo}`}>
                    <p><strong>{theater}</strong> </p>
                    <p><strong>{time}, {date}/10/2024</strong></p>
                    <p><strong>Phòng chiếu:</strong></p>
                </div>

                {/* Mục Thông tin giá */}
                <div className={`${styles.section} ${styles.priceInfo}`}>
                    <h3>Combo:</h3>
                    <ul>
                        {combo.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3>Ghế đã chọn:</h3>
                    <ul style={{}}>
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

                    <p><strong style={{ color: "red" }}>Tổng tiền:</strong> {totalPrice.toLocaleString()}đ</p>
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
    );
    
};


export default TicketInfo;
