import React, { useEffect, useState } from 'react';
import ComboPage from './Step3/ComboPage';
import SeatBooking from './Step2/SeatBooking';
import PromoPage from './Step4/PromoPage';
// import PromoPage from './Step4/temp2';
import Step1 from './Step1/Step1';
import TicketInfo from './TicketInfoAn';
import styles from '../../FileCSS/BuyTicketPage/BuyTicket.module.css';
import Header from '../header';
import Footer from '../footer';
import clsx from 'clsx';
function BuyTicket() {
    
    const [clearControl, setClearControl] = useState(true)
    if(clearControl){
        sessionStorage.removeItem('dateChoice');
        sessionStorage.removeItem('theaterChoice');
        sessionStorage.removeItem('cityChoice');
        sessionStorage.removeItem('comboPage');
        localStorage.clear();
        setClearControl(false);
    }
    const [currentPageIndex, setCurrentPageIndex] = useState(()=>{
        const tem = sessionStorage.getItem('step2')
        return tem?1:0
    });
    const [transitionClass, setTransitionClass] = useState(styles.enterRight); // Khởi tạo với hiệu ứng vào từ phải
    const [seatTotalPrice, setSeatTotalPrice] = useState(0);
    const [comboTotalPrice, setComboTotalPrice] = useState(0);
    const [combo, setCombo] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [comboQuantities, setComboQuantities] = useState(() => {
        const storedQuantities = sessionStorage.getItem("comboPage");
        return storedQuantities ? JSON.parse(storedQuantities) : Array(6).fill(0);
    });
    
    const [theater, setTheater] = useState(()=>{
        const tem = sessionStorage.getItem('theaterFromTheaterPage')
        return tem? tem: "Bạn chưa chọn rạp"
}   )
    const [time, setTime] = useState(()=>{
        const tem = sessionStorage.getItem('timeFromTheaterPage')
        return tem? tem: "... : ... "
}   )
    const [date, setDate] = useState(()=>{
        const tem = sessionStorage.getItem('dateFromTheaterPage')
        return tem? tem: "..."
}   )
    const [room, setRoom] = useState(()=>{
        const tem = sessionStorage.getItem('roomFromTheaterPage')
        return tem? tem:  "Chưa có phòng chiếu"
}  )

    const [roomId, setRoomId] = useState(()=>{
        const tem = sessionStorage.getItem('roomIdFromTheaterPage')
        return tem? tem:  ''
} )
    const [image, setImage] = useState(
        ()=>
        {
            let getImg = sessionStorage.getItem('cardImgData')
            console.log(getImg)
            if(!getImg){
                getImg = sessionStorage.getItem('imageFromTheaterPage')
            }
            
            return getImg? getImg: ''
        }
    )
    const [name, setName] = useState(
        ()=>{
            let getName = sessionStorage.getItem('movie_name')
            if(!getName){
                getName = sessionStorage.getItem('nameFromTheaterPage')
            }
            return getName? getName: ''
            
        }
    )
    const [promotion, setPromotion] = useState(() => {
        const storedPromotion = localStorage.getItem('promotion');
        return storedPromotion ? JSON.parse(storedPromotion) : 0; // Nếu có giá trị trong localStorage, dùng nó, nếu không mặc định là 0
      });

    useEffect(()=>{
        console.log(date)
    }, [date])
    
    const goToNextPage = () => {
        if (currentPageIndex < pages.length - 1) {
            setTransitionClass(styles.exitLeft); // Set exit transition cho trang hiện tại
                setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setTransitionClass(styles.exitRight); // Set exit transition cho trang hiện tại
                setCurrentPageIndex(currentPageIndex - 1);
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
    const handlePromotionUpdate = (newPromotion) => {
        setPromotion(newPromotion);
    };



    const totalPrice = seatTotalPrice + comboTotalPrice;
    const pages = [
                <Step1 setTheater={
                    (event)=>
                    {
                        setTheater(event.currentTarget.getAttribute('data-support2'))
                    }}
                    setDate={
                        (event) =>{
                                setDate(
                                    event.currentTarget.getAttribute('data-date')
                                )
                        }
                    }
                    setTime={
                        (event)=>
                        {
                            setTime(event.currentTarget.getAttribute('data-content'))
                        }
                    }
                    setRoom={
                        (event)=>{
                            setRoom(event.currentTarget.getAttribute('data-support3'))
                        }
                    }
                    setRoomId={
                        (event)=>{
                            setRoomId(event.currentTarget.getAttribute('data-support4'))
                        }
                    }
                    ></Step1>,
                <SeatBooking
                    showDate={date != "..." ? date: ''}
                    showTime={time != "... : ... "? time: ''}
                    screeningroomId = {roomId}
                    onSeatSelectionChange={handleSeatSelectionChange}
                    onTotalPriceChange={handleSeatTotalPriceChange}
                    allCheckedSeats={selectedSeats}
                />,
                <ComboPage
                    comboQuantities={comboQuantities}
                    onQuantitiesChange={handleComboQuantitiesChange}
                />,
                <PromoPage
                    originalPrice={totalPrice}
                    seatTotalPrice={seatTotalPrice}
                    comboTotalPrice={comboTotalPrice}
                    transactionInfo ={{selectedSeats, combo, type:"buyTicket"}}
                    />
            ]
    return (
        <div className = {styles.container}>
            <Header></Header>
            <div className = {styles.progressBarBox}>
            </div>
            <div className={styles.buyTicket}>
                {pages[currentPageIndex]}
            </div>
            <TicketInfo 
                    cardImg = {image}
                    movieName = {name}
                    theater={theater}
                    date = {date}
                    time = {time}
                    room = {room}
                    totalPrice={totalPrice}
                    combo={combo} 
                    selectedSeats={selectedSeats}
                    onNext={goToNextPage} 
                    onPrevious={goToPreviousPage} 
                    promotion={promotion}
                />
                <Footer></Footer>
        </div>
        
    );
}

export default BuyTicket;
