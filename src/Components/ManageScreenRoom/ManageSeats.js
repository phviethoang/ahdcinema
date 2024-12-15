import React, { useState, useEffect } from "react";
import styles from "./ManageSeats.module.css";
import clsx from 'clsx';
import Notification from '../Notification/Notification'; 
import Legend from './Legend'

import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';

const ManageSeats = () => {
  const cinemaId = new URLSearchParams(window.location.search).get("cinemaId");
  const screeningroomId = new URLSearchParams(window.location.search).get("screeningroomId");
  const [cinemaData, setCinemaData] = useState([
    {
      cinema_id: 1,
      cinema_name: "Cinemax 1",
      address: "123 Đường ABC, Quận 1",
      city_id: 1,
      cinema_image: cinema1,
    },
    {
      cinema_id: 2,
      cinema_name: "Galaxy Cinema",
      address: "456 Đường XYZ, Quận 3",
      city_id: 2,
      cinema_image: cinema2,
    },
    {
      cinema_id: 3,
      cinema_name: "Lotte Cinema",
      address: "789 Đường LMN, Quận 5",
      city_id: 4,
      cinema_image: cinema3,
    },
    {
      cinema_id: 4,
      cinema_name: "Cinemax 2",
      address: "123 Đường ABCZ, Quận 5",
      city_id: 5,
      cinema_image: cinema4,
    },
  ]);


   const [screeningRoomData, setScreeningRoomData] = useState([
      {
        screeningroom_id: 1,
        room_number: 1,
        room_type: "Standard",
        seat_capacity: 100,
        cinema_id: 1,
      },
      {
        screeningroom_id: 2,
        room_number: 2,
        room_type: "VIP",
        seat_capacity: 50,
        cinema_id: 1,
      },
      {
        screeningroom_id: 3,
        room_number: 1,
        room_type: "STANDARD",
        seat_capacity: 100,
        cinema_id: 2,
      },
      {
        screeningroom_id: 4,
        room_number: 1,
        room_type: "IMAX",
        seat_capacity: 200,
        cinema_id: 3,
      },
    ]);
  

  const[seatTypeData, setSeatTypeData]= useState([
    {seat_type_id:1, seat_type: 'Standard', seat_cost: 50000},
    {seat_type_id:2, seat_type: 'VIP', seat_cost: 70000},
    {seat_type_id:3, seat_type: 'Sweetbox', seat_cost: 65000},
  ])

  const cinemaName = cinemaData.find((cinema) => cinema.cinema_id === parseInt(cinemaId))?.cinema_name || "Unknown Cinema";
  const room = screeningRoomData.find((room) => room.screeningroom_id === parseInt(screeningroomId));
  const roomName = room ? `Screen ${room.room_number}` : "Unknown Room";

  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({ open: false, type: "" });


  const openModal = (type) => {
    setIsModalOpen({ open: true, type });
    if (type === "regular") {
      setFormInput({ row: "", seatCount: 1, seatType: "Regular" });
    } 
    // else if (type === "quick") {
    //   setBulkAdd({ startRow: "", endRow: "", seatCount: 1, seatType: "Regular" });
    // }
  };

  const closeModal = () => {
    setIsModalOpen({ open: false, type: "" });
  };


const [formInput, setFormInput] = useState(
    {
        row:"",
        seat_count:0,
        seat_type_id: 0,
    }
);
// const [formData, setFormData] = useState([]);
const  [formData, setFormData] = useState([
    // Ghế hàng A (Standard)
    {
      seat_id: 1,
      seat_number: "A1",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
    {
      seat_id: 2,
      seat_number: "A2",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
    {
      seat_id: 3,
      seat_number: "A3",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
    {
        seat_id: 4,
        seat_number: "B1",
        is_available: false,
        seat_type_id: 2, // VIP
        screeningroom_id: 1,
    },
    {
        seat_id: 5,
        seat_number: "B2",
        is_available: true,
        seat_type_id: 2, // VIP
        screeningroom_id: 1,
    },
])

  
const rows = [...new Set(formData?.map(seat => seat.seat_number[0]))];
console.log(rows);

const handleAddSeats = () => {
    const { row, seatCount, seat_type_id } = formInput;
    if (!row || !/[a-zA-Z]/.test(row)) {
        setNotification({ message: "Hàng ghế phải là một ký tự từ A-Z.", type: "error" });
        return;
    }

    if (seatCount <= 0) {
        setNotification({ message: "Số ghế phải lớn hơn 0.", type: "error" });
        return;
    }
    if(!seat_type_id){
        setNotification({ message: "Chưa chọn loại ghế.", type: "error" });
        return;
    }

      // Lọc ra các ghế đã có trong hàng để tìm số ghế lớn nhất hiện tại
    const seatsInRow = formData.filter(seat => seat.seat_number.startsWith(row.toUpperCase()));
    
    // Lấy số ghế lớn nhất trong hàng
    const maxSeatNumber = seatsInRow.reduce((max, seat) => {
        const seatNumber = parseInt(seat.seat_number.slice(1), 10); // Lấy số ghế (A1 -> 1, A2 -> 2...)
        return seatNumber > max ? seatNumber : max;
    }, 0);


    // Tính số ghế hiện có trong phòng chiếu
    const currentSeatCount = formData.filter(seat => seat.screeningroom_id === parseInt(screeningroomId)).length;

    // Lấy sức chứa tối đa của phòng chiếu
    const screeningRoom = screeningRoomData.find(room => room.screeningroom_id === parseInt(screeningroomId));
    if (!screeningRoom) {
        setNotification({ message: "Phòng chiếu không tồn tại.", type: "error" });
        return;
    }
    const seatCapacity = screeningRoom.seat_capacity;

    // Kiểm tra nếu số ghế thêm vào vượt quá sức chứa của phòng chiếu
    if (currentSeatCount + seatCount > seatCapacity) {
        // setNotification({ message: "Không thể thêm ghế. Sức chứa của phòng chiếu đã đầy.", type: "error" });
        setNotification({
            message: `Phòng Screen ${screeningRoom.room_number} chứa tối đa ${seatCapacity} ghế.`,
            type: "error",
          });
          
        return;
    }

     // Lấy id lớn nhất hiện tại trong formData
    let maxId = formData.reduce((max, seat) => seat.seat_id > max ? seat.seat_id : max, 0);
    const newSeats = [];
    for (let i = maxSeatNumber + 1; i <= maxSeatNumber + seatCount; i++) {
      const seat_number = `${row}${i}`.toUpperCase();

      // Thêm ghế mới vào mảng
      newSeats.push({
        seat_id:maxId+1,
        seat_number,
        is_available: true,
        seat_type_id, // Dùng trực tiếp seat_type_id
        screeningroom_id: parseInt(screeningroomId),
      });
      maxId++;
    }
  
    // Cập nhật formData với các ghế mới đã được thêm vào
    const updatedSeats = [...formData, ...newSeats];

    // Sắp xếp lại các ghế theo hàng và số ghế
    const sortedSeats = updatedSeats.sort((a, b) => {
        // So sánh hàng ghế (A-Z)
        if (a.seat_number[0] > b.seat_number[0]) return 1;
        if (a.seat_number[0] < b.seat_number[0]) return -1;

        // Nếu hàng ghế giống nhau, so sánh số ghế (1, 2, 3,...)
        const seatNumberA = parseInt(a.seat_number.slice(1), 10);
        const seatNumberB = parseInt(b.seat_number.slice(1), 10);
        return seatNumberA - seatNumberB;
    });

    // Cập nhật lại state với dữ liệu ghế đã sắp xếp
    setFormData(sortedSeats);
  
    setNotification({ message: "Thêm ghế thành công!", type: "success" });
    closeModal();
  };
  const handleDeleteSeat=(seatId)=>{
    const updatedSeats = formData.filter(seat => seat.seat_id !== seatId);
    const selectedSeat = formData.find(seat => seat.seat_id === seatId);
    if (window.confirm(`Xóa ghế ${selectedSeat.seat_number} ?`)){
        setFormData(updatedSeats);
        setNotification({ message: "Xóa ghế thành công!", type: "success" });
    }
  }
  
  const handleResetSeats = () => {
    if (window.confirm("Bạn có chắc muốn đặt lại toàn bộ danh sách ghế không?")) {
        const hasUnavailableSeats = formData.some(seat => seat.is_available === false);
        if (hasUnavailableSeats) {
            setNotification({ message: "Không thể đặt lại do có ghế đã được chọn!", type: "error" });
        } else {
            setFormData([]);
            setNotification({ message: "Danh sách ghế đã được đặt lại!", type: "success" });
        }
    }
  };
  const handleSaveCurrentState =()=>{
    // gửi lên csdl
    if (window.confirm("Lưu trạng thái ghế?")) {
        setNotification({ message: "Danh sách ghế đã được lưu!", type: "success" });
    }
  }
  
useEffect(()=>{
    console.log("formData: ",formData)
},[formData])

useEffect(()=>{
    console.log("formInput: ",formInput)
},[formInput])

const groupedSeats = formData.reduce((acc, seat) => {
    //accumulator
    // Lấy tên hàng từ seat_number (phần đầu tiên của seat_number)
    const row = seat.seat_number.charAt(0).toUpperCase();  // Lấy chữ cái đầu tiên (A, B, C,...)
    if (!acc[row]) {
      acc[row] = []; // Nếu chưa có nhóm cho hàng này, tạo mới
    }
    acc[row].push(seat); // Thêm ghế vào hàng tương ứng
    return acc;
  }, {});
  

  return (
    <div className={styles.container}>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className={styles.adminTitle}>
        Quản lý ghế | {cinemaName} | {roomName}
      </div>
      <div className ={styles.buttonGroup}>
      <button onClick={() => openModal("regular")} className={styles.addButton}>
        Thêm ghế
      </button>
      <button onClick={handleResetSeats} className={styles.resetButton}>
        Đặt lại toàn bộ ghế
      </button>
      <button onClick={handleSaveCurrentState} className={styles.saveStateButton}>
        Lưu trạng thái
      </button>
      {/* <button onClick={handleResetSeats} className={styles.resetButton}>
        Đặt lại từ đầu
      </button> */}
      </div>
      <div className={styles.seatMap}>
        <div className={styles.screen}>SCREEN</div>
        {Object.entries(groupedSeats).map(([row, rowSeats]) => (
            <div key={row} className={styles.seatRow}>
                <div className={styles.rowLabel}>{row}</div> {/* Hiển thị tên hàng ghế */}

                {rowSeats.map((seat) => (
                <div
                    key={seat.seat_id}
                    className={clsx(styles.seat, {
                        [styles.regularSeat]: seat.seat_type_id === 1,
                        [styles.vipSeat]: seat.seat_type_id === 2,
                        [styles.sweetboxSeat]: seat.seat_type_id === 3,
                        [styles.unavailableSeat]: !seat.is_available,
                      })}
                    title={`Ghế: ${seat.seat_number}, Loại: ${seat.seat_type}`}
                    onClick={() => handleDeleteSeat(seat.seat_id)}
                >
                    {seat.seat_number}
                </div>
                ))}
            <div className={styles.rowLabel}>{row}</div> {/* Hiển thị tên hàng ghế */}
        </div>
        ))}

    {isModalOpen.open&&isModalOpen.type==="regular"&&
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <form>
                    <div className={styles.formRow}>
                    <div className={styles.itemFormGroup}>
                        <label>Hàng ghế</label>
                        <input
                        type="text"
                        value={formData.row}
                        onChange={(e) => setFormInput({ ...formInput, row: e.target.value })}
                        placeholder="Nhập hàng ghế (A-Z)"
                        />
                    </div>
                    <div className={styles.itemFormGroup}>
                        <label>Số ghế</label>
                        <input
                        type="number"
                        value={formData.seatCount}
                        onChange={(e) => setFormInput({ ...formInput, seatCount: parseInt(e.target.value) || 0 })}
                        placeholder="Nhập số ghế"
                        />
                    </div>
                    <div className={styles.itemFormGroup}>
                        <label>Loại ghế</label>
                        <select
                            value={formInput.seat_type_id}
                            onChange={(e) => setFormInput({ ...formInput, seat_type_id: parseInt(e.target.value) })}
                        >
                            <option value="">-- Chọn loại ghế --</option>
                            {seatTypeData?.map((seatType) => (
                            <option key={seatType.seat_type_id} value={seatType.seat_type_id}>
                                {seatType.seat_type}
                            </option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className={styles.formActions}>
                    <button type="button" onClick={handleAddSeats} className={styles.saveButton}>
                        Lưu
                    </button>
                    <button type="button" onClick={closeModal} className={styles.cancelButton}>
                        Hủy
                    </button>
                    </div>
                </form>
            </div>
        </div>
    }
      </div>
      <Legend/>
    </div>
  );
};

export default ManageSeats;
