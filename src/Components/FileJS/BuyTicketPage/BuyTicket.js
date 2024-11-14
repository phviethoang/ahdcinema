import React, { useState } from 'react';
import ComboPage from './Step3/ComboPage';
import SeatBooking from './Step2/SeatBooking';
import PaymentPage from './Step4/PaymentPage';
import Step1 from './Step1/Step1';
import TicketInfo from './TicketInfoAn';
import styles from '../../FileCSS/BuyTicketPage/BuyTicket.module.css';
import Header from '../header';
import Footer from '../footer';
import clsx from 'clsx';
function BuyTicket() {
    const [clearControl, setClearControl] = useState(true)
    if(clearControl){
        sessionStorage.clear();
        localStorage.clear();
        setClearControl(false);
    }
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [transitionClass, setTransitionClass] = useState(styles.enterRight); // Khởi tạo với hiệu ứng vào từ phải
    const [seatTotalPrice, setSeatTotalPrice] = useState(0);
    const [comboTotalPrice, setComboTotalPrice] = useState(0);
    const [combo, setCombo] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [comboQuantities, setComboQuantities] = useState([]);
    const [theater, setTheater] = useState("Bạn chưa chọn rạp")
    const [time, setTime] = useState("... : ... ")
    const [date, setDate] = useState("...")
    
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

    const handleSeatTotalPriceChange = (price) => {
        setSeatTotalPrice(price);
    };

    const handleComboQuantitiesChange = (quantities, newCombo, newTotalPrice) => {
        setComboQuantities(quantities);
        setCombo(newCombo);
        setComboTotalPrice(newTotalPrice);
    };

    const totalPrice = seatTotalPrice + comboTotalPrice;
    const pages = [
                <Step1 setTheater={
                    (event)=>
                    {
                        setTheater(event.currentTarget.getAttribute('data-support'))
                    }}
                    setDate={
                        (event) =>{
                                setDate(event.currentTarget.getAttribute('data-content'))
                        }
                    }
                    setTime={
                        (event)=>
                        {
                            setTime(event.currentTarget.getAttribute('data-content'))
                        }
                    }
                    ></Step1>,
                <SeatBooking
                    onSeatSelectionChange={handleSeatSelectionChange}
                    onTotalPriceChange={handleSeatTotalPriceChange}
                    allCheckedSeats={selectedSeats}
                />,
                <ComboPage
                    comboQuantities={comboQuantities}
                    onQuantitiesChange={handleComboQuantitiesChange}
                />,
                <PaymentPage />
            ]
    return (
        <div className = {styles.container}>
            <Header></Header>
            <div className = {styles.progressBarBox}>
                <div className = {styles.step}>
                    <div className = {clsx(styles.stepLabel, styles.activeText)}>Bước 1</div>
                    <div className = {clsx(styles.stepShape, styles.active)}></div>
                </div>
                <div className = {styles.step}>
                    <div className = {clsx(styles.stepLabel, 
                        {[styles.activeText]: currentPageIndex > 0, 
                        [styles.notActiveText]: currentPageIndex == 0})}>Bước 2</div>
                    <div className = {clsx(styles.stepShape, 
                        {[styles.active]: currentPageIndex > 0})}></div>
                </div>
                <div className = {styles.step}>
                    <div className = {clsx(styles.stepLabel, 
                        {[styles.activeText]: currentPageIndex > 1, 
                        [styles.notActiveText]: currentPageIndex <= 1})}>Bước 3</div>
                    <div className = {clsx(styles.stepShape, {[styles.active]: currentPageIndex > 1})}></div>
                </div>
                <div className = {styles.step}>
                    <div className = {clsx(styles.stepLabel, 
                        {[styles.activeText]: currentPageIndex > 2, 
                        [styles.notActiveText]: currentPageIndex <= 2})}>Bước 4</div>
                    <div className = {clsx(styles.stepShape, {[styles.active]: currentPageIndex >2})}></div>
                </div>
            </div>
            <div className={styles.buyTicket}>
            
                {/* <div className={`${styles.page} ${currentPageIndex === 0 ? `${styles.active} ${transitionClass}` : ''}`}>
                    {currentPageIndex === 0 && (
                        <Step1 setTheater={
                            (event)=>
                            {
                                setTheater(event.currentTarget.getAttribute('data-support'))
                            }}
                            setDate={
                                (event) =>{
                                        setDate(event.currentTarget.getAttribute('data-content'))
                                }
                            }
                            setTime={
                                (event)=>
                                {
                                    setTime(event.currentTarget.getAttribute('data-content'))
                                }
                            }
                            ></Step1>
                    )}
                </div> */}
                {/* <div className={`${styles.page} ${currentPageIndex === 0 ? `${styles.active} ${transitionClass}` : ''}`}>
                    {currentPageIndex === 1 && (
                        <SeatBooking
                            onSeatSelectionChange={handleSeatSelectionChange}
                            onTotalPriceChange={handleSeatTotalPriceChange}
                            allCheckedSeats={selectedSeats}
                        />
                    )}
                </div> */}
                {/* <div className={`${styles.page} ${currentPageIndex === 1 ? `${styles.active} ${transitionClass}` : ''}`}>
                    {currentPageIndex === 2 && (
                        <ComboPage
                            comboQuantities={comboQuantities}
                            onQuantitiesChange={handleComboQuantitiesChange}
                        />
                    )}
                </div> */}
                {/* <div className={`${styles.page} ${currentPageIndex === 2 ? `${styles.active} ${transitionClass}` : ''}`}>
                    {currentPageIndex === 3 && <PaymentPage />}
                </div> */}
                {pages[currentPageIndex]}
                
            </div>
            <TicketInfo 
                    theater={theater}
                    date = {date}
                    time = {time}
                    totalPrice={totalPrice}
                    combo={combo} 
                    selectedSeats={selectedSeats}
                    onNext={goToNextPage} 
                    onPrevious={goToPreviousPage} 
                />
                <Footer></Footer>
        </div>
        
    );
}

export default BuyTicket;
