import React, { useState, useEffect } from 'react';
import ComboPage from './ComboComponent/ComboPage';
import SeatBooking from './SeatComponent/SeatBooking';
import PromoPage from './PaymentComponent/PromoPage';
import TicketInfo from './TicketInfo';
import styles from './BuyTicket.module.css';

function BuyTicket() {
    const pages = [
        { name: "Seat", page: 1 },
        { name: "Combo", page: 2 },
        { name: "Payment", page: 3 },
    ];

    const [resetControl, setReset] = useState(true)
    if(resetControl)
    {
        setReset(false);
        localStorage.clear();

    }

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isPaymentClicked, setIsPaymentClicked] = useState(false);
    const [transitionClass, setTransitionClass] = useState(styles.enterRight); // Khởi tạo với hiệu ứng vào từ phải
    const [seatTotalPrice, setSeatTotalPrice] = useState(0);
    const [comboTotalPrice, setComboTotalPrice] = useState(0);
    const [combo, setCombo] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [comboQuantities, setComboQuantities] = useState([]);

    // useEffect(()=>{
    //     console.log(selectedSeats);
    // },[selectedSeats])

  const [promotion, setPromotion] = useState(() => {
    const storedPromotion = localStorage.getItem('promotion');
    return storedPromotion ? JSON.parse(storedPromotion) : 0; // Nếu có giá trị trong localStorage, dùng nó, nếu không mặc định là 0
  });

    const goToNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            setTransitionClass(styles.exitLeft); // Set exit transition cho trang hiện tại
            setTimeout(() => {
                setCurrentPageIndex(currentPageIndex + 1);
                setTransitionClass(styles.enterRight); // Set enter transition cho trang tiếp theo
            }, 500);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setTransitionClass(styles.exitRight); // Set exit transition cho trang hiện tại
            setTimeout(() => {
                setCurrentPageIndex(currentPageIndex - 1);
                setTransitionClass(styles.enterLeft); // Set enter transition cho trang trước đó
            }, 500);
        }
    };

    const handleSeatSelectionChange = (seats) => {
        setSelectedSeats(seats);
    };


    const handleSeatTotalPriceChange = (seatPrice) => {
        setSeatTotalPrice(seatPrice);
    };

    const handleComboQuantitiesChange = (quantities, newCombo, newTotalPrice) => {
        setComboQuantities(quantities);
        setCombo(newCombo);
        setComboTotalPrice(newTotalPrice);
    };

     // Hàm để cập nhật promotion từ PaymentPage
     const handlePromotionUpdate = (newPromotion) => {
        setPromotion(newPromotion);
    };

    const handlePaymentClick = () => {
        setIsPaymentClicked(true);
    };

    const totalPrice = seatTotalPrice + comboTotalPrice;
  
    return (
        <div className={styles.buyTicket}>
            
            <div className={`${styles.page} ${currentPageIndex === 0 ? `${styles.active} ${transitionClass}` : ''}`}>
                {currentPageIndex === 0 && (
                    <SeatBooking
                        // sum={sum}
                        onSeatSelectionChange={handleSeatSelectionChange}
                        onTotalPriceChange={handleSeatTotalPriceChange}
                        allCheckedSeats={selectedSeats}
                    />
                )}
            </div>
            <div className={`${styles.page} ${currentPageIndex === 1 ? `${styles.active} ${transitionClass}` : ''}`}>
                {currentPageIndex === 1 && (
                    <ComboPage
                        // sum={sum}
                        comboQuantities={comboQuantities}
                        onQuantitiesChange={handleComboQuantitiesChange}
                    />
                )}
            </div>
            <div className={`${styles.page} ${currentPageIndex === 2 ? `${styles.active} ${transitionClass}` : ''}`}>
                {currentPageIndex === 2 && (
                    <PromoPage
                    originalPrice={totalPrice}
                    seatTotalPrice={seatTotalPrice}
                    comboTotalPrice={comboTotalPrice}
                    onPromotionUpdate={handlePromotionUpdate}
                    onPaymentClick={handlePaymentClick}
                    ticketInfo ={{selectedSeats, combo}}
                    />
                )}
            </div>
            {!isPaymentClicked &&<TicketInfo 
                // totalPrice={totalPrice-(promotion>0 ? promotion:0)>0?totalPrice-promotion:0}
                totalPrice={totalPrice}
                combo={combo} 
                selectedSeats={selectedSeats}
                onNext={goToNextPage} 
                onPrevious={goToPreviousPage}
                promotion={promotion}

            />}
            
        </div>
    );
}

export default BuyTicket;
