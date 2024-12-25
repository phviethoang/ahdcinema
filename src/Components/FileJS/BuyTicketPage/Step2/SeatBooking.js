

import React, { useState, useEffect } from 'react';

import Legend from './Legend';
import styles from '../../../FileCSS/BuyTicketPage/Step2/seat.module.css';
import clsx from 'clsx'
import Notification from '../../Notification/Notitication'
import { useNavigate } from 'react-router-dom';

const SeatBooking = ({ onSeatSelectionChange, onTotalPriceChange, screeningroomId, showDate, showTime}) => {

  const sessionStorageData = ['dateData', 'dateFromTheaterPage', 'imageFromTheaterPage',
     'nameFromTheaterPage', 'roomFromTheaterPage', 'roomIdFromTheaterPage', 
     'step2', 'theaterFromTheaterPage', 'timeFromTheaterPage']
  for(let i = 0; i< sessionStorageData.length; i++)
  {
    const tem = sessionStorage.getItem(sessionStorageData[i])
    if(tem) sessionStorage.removeItem(sessionStorageData[i])
  }
  console.log(showDate)
  console.log(screeningroomId)
  console.log(showTime)
  const navigate = useNavigate()
// Lấy từ param ra 3 giá trị screeningroom_id, show_date, show_time
  ////////////////
  //Giả sử lấy được 3 giá trị này 
//   let screeningroomId=1
//   let showDate='2024-12-10'
//   let showTime='14:00:00'

// //BEGIN FETCH DATA
//   //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [seatData, setSeatData] = useState([]);
  const movieId = sessionStorage.getItem('movie_id')
//   // Hàm fetch data GET thông tin phòng chiếu
  useEffect(() => {
    fetch(`http://localhost:5000/ahd//buyticket/choose-seats?screeningroom_id=${screeningroomId}&show_date=${showDate}&show_time=${showTime}&movie_id=${movieId}`, {
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
      .then(data => setSeatData(data))
      .catch(error => console.error('Error:', error));
  }, [screeningroomId, showDate, showTime]);
//tạo 1 object chứa các ghế theo tọa độ hàng cột để tìm cho dễ
const [seatDictionary, setSeatDictionary] = useState({})
useEffect( ()=>{
  if(seatData!= null )
  for( let i = 0; i< seatData.length; i++)
  { 
    // if( ! seatData[i].seat_number in seatDictionary){
      setSeatDictionary((pre)=>{
        const newDictionary = pre
        newDictionary[seatData[i].seat_number] = seatData[i]
        return newDictionary
    })
  }
}, [seatData])
  // In ra các mảng kiểm tra
// END FETCHING DATA
// Lưu ghế người dùng chọn vào local storage để chuyển sang step3
//////////////////////////////////////////
  const rows = [...new Set(seatData?.map(seat => seat.seat_number[0]))];
  
  const [checkedSeats, setCheckedSeats] = useState(
    ()=>
    {
      const tem = sessionStorage.getItem('checkedSeats');
      return tem? JSON.parse(tem): '';
    });

  useEffect(() => {
    // Lưu trạng thái ghế đã chọn vào sessionStorage mỗi khi checkedSeats thay đổi
    sessionStorage.setItem('checkedSeats', JSON.stringify(checkedSeats));
  }, [checkedSeats]);

console.log("checkedSeats: ", checkedSeats);

const toggleSeatSelection = (seat) => {
  setCheckedSeats((prevSeats) => {
    let newSeats = [...prevSeats]; // Tạo một bản sao của mảng ghế đã chọn

    // Nếu là ghế loại Sweetbox (seat_type_id === 3)
    if (seat.seat_type_id === 3) {
      const row = seat.seat_number.charAt(0).toUpperCase(); // Lấy hàng ghế (ví dụ: 'A')
      const seatsInRow = groupedSeats[seat.screeningroom_id]?.[row] || []; // Lấy danh sách ghế trong hàng
      const seatIndex = seatsInRow.findIndex((s) => s.seat_id === seat.seat_id); // Tìm vị trí ghế hiện tại
      const neighborIndex = seatIndex % 2 === 0 ? seatIndex + 1 : seatIndex - 1;

      // Kiểm tra nếu neighborIndex nằm trong giới hạn của mảng
      if (neighborIndex >= 0 && neighborIndex < seatsInRow.length) {
        const neighborSeatId = seatsInRow[neighborIndex]?.seat_id; // Lấy seat_id của ghế neighbor
        console.log("neigbor: ", neighborSeatId)
        const neighbor = seatData.find(s=>s.seat_id===neighborSeatId)
        const isChecked = newSeats?.find(s=>s.seat_id===neighborSeatId) // Kiểm tra ghế hiện tại đã được chọn chưa
        if (isChecked) {
          // Nếu đang bỏ chọn, bỏ luôn neighbor nếu nó đã được chọn
          newSeats = newSeats.filter((s) => s.seat_id !== seat.seat_id && s.seat_id !== neighborSeatId);
        } else {
          // Nếu đang chọn, thêm cả ghế hiện tại và neighbor nếu neighbor chưa được chọn
          newSeats = [...newSeats, seat];
          if (neighborSeatId && !newSeats?.find(s=>s.seat_id===neighborSeatId)) {
            newSeats.push(neighbor);
          }
        }
      }
    } else {
      // Xử lý cho các loại ghế khác (không phải Sweetbox)
      const isChecked = newSeats?.find(s=>s.seat_id===seat.seat_id);
      newSeats = isChecked
        ? newSeats?.filter((s) => s.seat_id !== seat.seat_id) // Nếu đã chọn, bỏ chọn
        : [...prevSeats, seat]; // Nếu chưa chọn, thêm vào
    }

    setNotification({ message: "Bạn vừa chọn ghế" });
    return newSeats;
  });
};


const calculateTotalPrice = (seatsArray) => {
    return seatsArray?.reduce((total, seatId) => {
      // Tìm ghế theo seat_id
      const seat = seatId;
      if (seat) {
        const seatType = seat.seat_type
        if (seatType) {
          total += seat.seat_cost; 
        }
      }
      return total;
    }, 0); // Khởi tạo tổng ban đầu là 0
  };

useEffect(() => {
    const totalPrice = calculateTotalPrice(checkedSeats?checkedSeats:[0]);
    onSeatSelectionChange(checkedSeats);
    onTotalPriceChange(totalPrice); 
}, [checkedSeats, onSeatSelectionChange, onTotalPriceChange]);


const [groupedSeats, setGroupedSeats] = useState({});
useEffect(() => {


  const filteredSeats = seatData?.filter(seat => seat.screeningroom_id === Number(screeningroomId));

  const groupedByScreeningRoom = filteredSeats.reduce((acc, seat) => {
    const row = seat.seat_number.charAt(0).toUpperCase();
    if (!acc[seat.screeningroom_id]) {
      acc[seat.screeningroom_id] = {};
    }
    if (!acc[seat.screeningroom_id][row]) {
      acc[seat.screeningroom_id][row] = [];
    }
    acc[seat.screeningroom_id][row].push(seat);
    return acc;
  }, {});
  console.log("groupedByScreeningRoom: ",groupedByScreeningRoom)
  setGroupedSeats(groupedByScreeningRoom);
}, [seatData]);

const [notification, setNotification] = useState(null);

  return (
    <div className={styles.container}>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className= {styles.subContainer}>
        <div className={styles.headingCover}>
          <h2 className={styles.heading}>ĐẶT GHẾ ONLINE</h2>
        </div>
        <div className={styles.seatLayout}>
            <div className={styles.screen}>SCREEN</div>
            <div className={styles.seating}>
              <div className={styles.seating}>
                {Object.entries(groupedSeats).map(([screeningroomId, rows]) => (
                  <div key={screeningroomId} className={styles.screeningRoom}>
                    {Object.entries(rows).map(([row, rowSeats]) => {
                      if (Array.isArray(rowSeats)) {
                        return (
                          <div key={row} className={styles.seatRow}>
                            <div className={styles.rowLabel}>{row}</div> 
                            {rowSeats.map((seat) => (
                              <div
                                key={seat.seat_id}
                                className={clsx(styles.seat, {
                                  [styles.regular]: seat.seat_type_id === 1,
                                  [styles.vip]: seat.seat_type_id === 2,
                                  [styles.sweetbox]: seat.seat_type_id === 3,
                                  [styles.unavailableSeat]: !seat.is_available,
                                  [styles.checked]: Array.isArray(checkedSeats) 
                                  ? checkedSeats.find(s=> s.seat_id === seat.seat_id) 
                                  : null,
                                })}
                                title={`Ghế: ${seat.seat_number}, Loại: ${seat.seat_type_id === 1 ? 'Standard' : seat.seat_type_id === 2 ? 'VIP' : 'Sweetbox'}`}
                                onClick={() => {
                                  if(seat.is_available) toggleSeatSelection(seat)
                                }
                                } // Sửa logic ghế chọn
                                
                              >
                                {seat.seat_number}
                              </div>
                            ))}
                            <div className={styles.rowLabel}>{row}</div> {/* Hiển thị tên hàng ghế */}
                          </div>
                        );
                      } else {
                        return null; // Tránh lỗi nếu rowSeats không phải là mảng
                      }
                    })}
                  </div>
                ))}
              </div>
          </div>
          <Legend />
        </div>
      </div>
    </div>
  );
};



export default SeatBooking;
