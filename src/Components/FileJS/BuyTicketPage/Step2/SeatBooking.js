

import React, { useState, useEffect } from 'react';
import Seat from './Seat';
import Legend from './Legend';
import styles from '../../../FileCSS/BuyTicketPage/Step2/seat.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from "js-cookie";

const SeatBooking = ({ onSeatSelectionChange, onTotalPriceChange, screeningroomId, showDate, showTime}) => {
  const navigate = useNavigate();
  console.log(screeningroomId)
  console.log(showDate)
  console.log(showTime)
  // Lấy từ localstorage ra 3 giá trị screeningroom_id, show_date, show_time
  ////////////////
  //Giả sử lấy được 3 giá trị này 
  // let screeningroomId=1
  // let showDate='2024-12-10'
  // let showTime='14:00:00'

//BEGIN FETCH DATA
  //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [seats, setSeats] = useState([]);
  
  // Hàm fetch data GET thông tin phòng chiếu
  useEffect(() => {
    fetch(`http://localhost:5000/ahd//buyticket/choose-seats?screeningroom_id=${screeningroomId}&show_date=${showDate}&show_time=${showTime}`, {
      credentials: 'include', // Đảm bảo gửi cookie
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            // Xử lý khi chưa đăng nhập
            console.error('Unauthorized. Redirecting to login...');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSeats(data))
      .catch(error => console.error('Error:', error));
  }, [screeningroomId, showDate, showTime]);
  // In ra các mảng kiểm tra
  // console.log(seats)
// END FETCHING DATA
// Lưu ghế người dùng chọn vào local storage để chuyển sang step3
//////////////////////////////////////////


  const rows = [
    { row: 'A', seats: 13, type: 'regular', seatPrice: 50000 },
    { row: 'B', seats: 14, type: 'regular', seatPrice: 50000 },
    { row: 'C', seats: 14, type: 'regular', seatPrice: 50000 },
    { row: 'D', seats: 14, type: 'vip', seatPrice: 70000 },
    { row: 'E', seats: 14, type: 'vip', seatPrice: 70000 },
    { row: 'F', seats: 14, type: 'vip', seatPrice: 70000 },
    { row: 'G', seats: 14, type: 'vip', seatPrice: 70000 },
    { row: 'H', seats: 16, type: 'vip', seatPrice: 70000 },
    { row: 'J', seats: 18, type: 'sweetbox', seatPrice: 65000 }
  ];

  const [checkedSeats, setCheckedSeats] = useState(()=>
    {
      const tem = localStorage.getItem('checkedSeats');
      return tem? JSON.parse(tem): '';
    });

  useEffect(() => {
    // Lưu trạng thái ghế đã chọn vào localStorage mỗi khi checkedSeats thay đổi
    localStorage.setItem('checkedSeats', JSON.stringify(checkedSeats));
  }, [checkedSeats]);

  const toggleSeatSelection = (seat) => {
    setCheckedSeats((prevSeats) => {
      const isChecked = prevSeats.includes(seat);
      const newSeats = isChecked
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat];

      if (seat.startsWith('J')) {
        const seatNumber = parseInt(seat.slice(1), 10);
        const pairedSeatNumber = seatNumber % 2 === 1 ? seatNumber + 1 : seatNumber - 1;
        const pairedSeat = `J${pairedSeatNumber}`;

        if (isChecked) {
          return newSeats.filter((s) => s !== pairedSeat);
        } else {
          return [...newSeats, pairedSeat];
        }
        
      }

      return newSeats;
    });
  };

  const getCheckedSeats = () => {
    return rows.flatMap(row =>
      Array.from({ length: row.seats }, (_, index) => {
        const seatNumber = `${row.row}${index + 1}`;
        return checkedSeats.includes(seatNumber) ? { seatNumber, type: row.type, price: row.seatPrice } : null;
      })
    ).filter(seat => seat !== null);
  };

  const calculateTotalPrice = (seats) => {
    return seats.reduce((sum, seat) => sum + seat.price, 0);
  };



  useEffect(() => {
    const allCheckedSeats = getCheckedSeats();
    const totalPrice = calculateTotalPrice(allCheckedSeats);
    onSeatSelectionChange(allCheckedSeats);
    onTotalPriceChange(totalPrice); 
}, [checkedSeats, onSeatSelectionChange, onTotalPriceChange]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.headingCover}>
          <h2 className={styles.heading}>ĐẶT GHẾ ONLINE</h2>
        </div>
        <div className={styles.seatLayout}>
          <div className={styles.screen}>SCREEN</div>
          <div className={styles.seating}>
          {rows.map((row) => (
            <div key={row.row} className={styles.seatRow}>
              {Array.from({ length: row.seats }).map((_, index) => {
                const seatNumber = `${row.row}${index + 1}`;
                return (
                  <Seat
                    // key={seatNumber}
                    seatNumber={seatNumber}
                    seatType={row.type}
                    isChecked={checkedSeats.includes(seatNumber)}
                    toggleSeatSelection={toggleSeatSelection}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <Legend />
        </div>
      </div>
    </div>
  );
};



export default SeatBooking;
