import React, { useState } from "react";
import styles from "./ManageSeats.module.css";
import Notification from '../Notification/Notification'; 
import Legend from './Legend'

import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';

const ManageSeats = () => {
  const cinemaId = new URLSearchParams(window.location.search).get("cinemaId");
  // const roomId = new URLSearchParams(window.location.search).get("roomId");
  // screeningroomId
  const screeningroomId = new URLSearchParams(window.location.search).get("screeningroomId");
  const cinemas = [
    { id: 1, name: "Cinemax 1" },
    { id: 2, name: "Galaxy Cinema" },
    { id: 3, name: "Lotte Cinema" },
    { id: 4, name: "Cinemax 2" },
  ];

  const rooms = [
    { id: 1, name: "Screen 1" },
    { id: 2, name: "Screen 2" },
    { id: 3, name: "Screen 3" },
  ];


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
  


    // seat_type_id SERIAL PRIMARY KEY,
    // seat_type varchar(50),
    // seat_cost INT


    // seat_id SERIAL PRIMARY KEY,
    // seat_number VARCHAR(20), 
    // is_available BOOLEAN DEFAULT TRUE,
    // seat_type_id INT REFERENCES SeatType(seat_type_id),
    // screeningroom_id INT REFERENCES ScreeningRooms(screeningroom_id)

  const [seatData, setSeatData] = useState([
    // Phòng 1 (screeningroom_id = 1) - 20 ghế
  
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
      seat_number: "A4",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
    {
      seat_id: 5,
      seat_number: "A5",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
    {
      seat_id: 6,
      seat_number: "A6",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 1,
    },
  
    // Ghế hàng B (VIP)
    {
      seat_id: 7,
      seat_number: "B1",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
    {
      seat_id: 8,
      seat_number: "B2",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
    {
      seat_id: 9,
      seat_number: "B3",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
    {
      seat_id: 10,
      seat_number: "B4",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
    {
      seat_id: 11,
      seat_number: "B5",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
    {
      seat_id: 12,
      seat_number: "B6",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 1,
    },
  
    // Ghế hàng C (Sweetbox, chỉ ghế số chẵn)
    {
      seat_id: 13,
      seat_number: "C2",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 1,
    },
    {
      seat_id: 14,
      seat_number: "C4",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 1,
    },
    {
      seat_id: 15,
      seat_number: "C6",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 1,
    },
    {
      seat_id: 16,
      seat_number: "C8",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 1,
    },
    {
      seat_id: 17,
      seat_number: "C10",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 1,
    },
  
    // Phòng 2 (screeningroom_id = 2) - 50 ghế
  
    // Ghế hàng A (Standard)
    {
      seat_id: 18,
      seat_number: "A1",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 19,
      seat_number: "A2",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 20,
      seat_number: "A3",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 21,
      seat_number: "A4",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 22,
      seat_number: "A5",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 23,
      seat_number: "A6",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 24,
      seat_number: "A7",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 25,
      seat_number: "A8",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 26,
      seat_number: "A9",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
    {
      seat_id: 27,
      seat_number: "A10",
      is_available: true,
      seat_type_id: 1, // Standard
      screeningroom_id: 2,
    },
  
    // Ghế hàng B (VIP)
    {
      seat_id: 28,
      seat_number: "B1",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 29,
      seat_number: "B2",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 30,
      seat_number: "B3",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 31,
      seat_number: "B4",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 32,
      seat_number: "B5",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 33,
      seat_number: "B6",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 34,
      seat_number: "B7",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 35,
      seat_number: "B8",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
    {
      seat_id: 36,
      seat_number: "B9",
      is_available: true,
      seat_type_id: 2, // VIP
      screeningroom_id: 2,
    },
  
    // Ghế hàng C (Sweetbox)
    {
      seat_id: 37,
      seat_number: "C1",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 38,
      seat_number: "C2",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 39,
      seat_number: "C3",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 40,
      seat_number: "C4",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 41,
      seat_number: "C5",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 42,
      seat_number: "C6",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 43,
      seat_number: "C7",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 44,
      seat_number: "C8",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 45,
      seat_number: "C9",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
    {
      seat_id: 46,
      seat_number: "C10",
      is_available: true,
      seat_type_id: 3, // Sweetbox
      screeningroom_id: 2,
    },
  ]);
    

  const[seatTypeData, setSeatTypeData]= useState([
    {seat_type_id:1, seat_type: 'Standard', seat_cost: 50000},
    {seat_type_id:2, seat_type: 'VIP', seat_cost: 70000},
    {seat_type_id:3, seat_type: 'Sweetbox', seat_cost: 65000},
  ])
  // const[seatData, setSeatData] = useState([
  //   {
  //     seat_id:1,
  //     seat_number:"A1",
  //     is_available: true,
  //     seat_type_id: 1,
  //     screeningroom_id: 1,
  //   }
  // ]) 


  // const cinemaName = cinemas.find((cinema) => cinema.id === parseInt(cinemaId))?.name || "Unknown Cinema";
  // const roomName = rooms.find((room) => room.id === parseInt(roomId))?.name || "Unknown Room";

  const cinemaName = cinemaData.find((cinema) => cinema.cinema_id === parseInt(cinemaId))?.cinema_name || "Unknown Cinema";
  const room = screeningRoomData.find((room) => room.screeningroom_id === parseInt(screeningroomId));
  const roomName = room ? `Screen ${room.room_number}` : "Unknown Room";


  const [seats, setSeats] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({ open: false, type: "" });


  // const[seatData, setSeatData] = useState([
  //   {
  //     seat_id:1,
  //     seat_number:"A1",
  //     is_available: true,
  //     seat_type_id: 1,
  //     screeningroom_id: 1,
  //   }
  // ]) 
  const [formData, setFormData] = useState({
    row: "",
    seatCount: 1,
    seatType: "Regular",
  });
  // const [formData, setFormData] = useState({
  //   row: "",
  //   seatCount: 1,
  //   seatType: "Regular",
  // });

  const [bulkAdd, setBulkAdd] = useState({
    startRow: "",
    endRow: "",
    seatCount: 1,
    seatType: "Regular",
  });

  const openModal = (type) => {
    setIsModalOpen({ open: true, type });
    if (type === "regular") {
      setFormData({ row: "", seatCount: 1, seatType: "Regular" });
    } else if (type === "quick") {
      setBulkAdd({ startRow: "", endRow: "", seatCount: 1, seatType: "Regular" });
    }
  };

  const closeModal = () => {
    setIsModalOpen({ open: false, type: "" });
  };

  const handleAddSeats = () => {
    const { row, seatCount, seatType } = formData;

    if (!row || row.length !== 1 || !/[a-zA-Z]/.test(row)) {
      setNotification({ message: "Hàng ghế phải là một ký tự từ A-Z.", type: "error" });
      return;
    }

    if (seatCount <= 0) {
      setNotification({ message: "Số ghế phải lớn hơn 0.", type: "error" });
      return;
    }

    const uppercaseRow = row.toUpperCase();
    const currentRowSeats = seats.filter((seat) => seat.row === uppercaseRow);
    const startingNumber = currentRowSeats.length
      ? Math.max(...currentRowSeats.map((seat) => parseInt(seat.seatNumber.replace(uppercaseRow, "")))) + 1
      : 1;

    const actualSeatCount = seatType === "Sweetbox" ? seatCount * 2 : seatCount;

    const newSeats = Array.from({ length: actualSeatCount }, (_, index) => ({
      id: seats.length + index + 1,
      seatNumber: `${uppercaseRow}${startingNumber + index}`,
      row: uppercaseRow,
      type: seatType,
      isAvailable: true,
    }));

    setSeats((prevSeats) => [...prevSeats, ...newSeats].sort((a, b) => (a.row > b.row ? 1 : a.row < b.row ? -1 : 0)));
    setNotification({ message: "Thêm ghế thành công!", type: "success" });
    closeModal();
  };

  const handleBulkAddSeats = () => {
    const { startRow, endRow, seatCount, seatType } = bulkAdd;
  
    if (!startRow || !endRow || startRow.length !== 1 || endRow.length !== 1 || !/[a-zA-Z]/.test(startRow) || !/[a-zA-Z]/.test(endRow)) {
      setNotification({ message: "Hàng ghế phải là một ký tự từ A-Z.", type: "error" });
      return;
    }
  
    if (seatCount <= 0) {
      setNotification({ message: "Số ghế phải lớn hơn 0.", type: "error" });
      return;
    }
  
    const startCharCode = startRow.toUpperCase().charCodeAt(0);
    const endCharCode = endRow.toUpperCase().charCodeAt(0);
  
    if (startCharCode > endCharCode) {
      setNotification({ message: "Hàng ghế bắt đầu phải nhỏ hơn hàng ghế kết thúc.", type: "error" });
      return;
    }
  
    let newSeats = [];
    for (let i = startCharCode; i <= endCharCode; i++) {
      const row = String.fromCharCode(i);
      const actualSeatCount = seatType === "Sweetbox" ? seatCount * 2 : seatCount;
  
      const currentRowSeats = seats.filter((seat) => seat.row === row);
      const startingNumber = currentRowSeats.length
        ? Math.max(...currentRowSeats.map((seat) => parseInt(seat.seatNumber.replace(row, "")))) + 1
        : 1;
  
      for (let j = 0; j < actualSeatCount; j++) {
        newSeats.push({
          id: seats.length + newSeats.length + 1,
          seatNumber: `${row}${startingNumber + j}`,
          row: row,
          type: seatType,
          isAvailable: true,
        });
      }
    }
  
    setSeats((prevSeats) => [...prevSeats, ...newSeats].sort((a, b) => (a.row > b.row ? 1 : a.row < b.row ? -1 : 0)));
    setNotification({ message: "Thêm nhanh ghế thành công!", type: "success" });
    closeModal();
  };
  const [standardQuickAdd, setStandardQuickAdd] = useState(false)
  const handleStandardQuickAdd = () => {
    if(standardQuickAdd===false){
    const predefinedSeats = [
      { row: "A", seatCount: 13, type: "Regular" },
      { row: "B", seatCount: 14, type: "Regular" },
      { row: "C", seatCount: 14, type: "Regular" },
      { row: "D", seatCount: 14, type: "VIP" },
      { row: "E", seatCount: 14, type: "VIP" },
      { row: "F", seatCount: 14, type: "VIP" },
      { row: "G", seatCount: 14, type: "VIP" },
      { row: "H", seatCount: 16, type: "VIP" },
      { row: "J", seatCount: 9, type: "Sweetbox" },
    ];
  
    let newSeats = [];
    predefinedSeats.forEach(({ row, seatCount, type }) => {
      const actualSeatCount = type === "Sweetbox" ? seatCount * 2 : seatCount;
  
      const currentRowSeats = seats.filter((seat) => seat.row === row);
      const startingNumber = currentRowSeats.length
        ? Math.max(...currentRowSeats.map((seat) => parseInt(seat.seatNumber.replace(row, "")))) + 1
        : 1;
  
      for (let i = 0; i < actualSeatCount; i++) {
        newSeats.push({
          id: seats.length + newSeats.length + 1,
          seatNumber: `${row}${startingNumber + i}`,
          row: row,
          type: type,
          isAvailable: true,
        });
      }
    });
  
    setSeats((prevSeats) => [...prevSeats, ...newSeats].sort((a, b) => (a.row > b.row ? 1 : a.row < b.row ? -1 : 0)));
    setNotification({ message: "Thêm nhanh tiêu chuẩn thành công!", type: "success" });
    setStandardQuickAdd(true);}
    else{
        setNotification({ message: "Bạn đã thêm tiêu chuẩn rồi!", type: "error" });
    }
  };  

  const handleResetSeats = () => {
    if (window.confirm("Bạn có chắc muốn đặt lại toàn bộ danh sách ghế không?")) {
      setSeats([]);
      setNotification({ message: "Danh sách ghế đã được đặt lại!", type: "success" });
      setStandardQuickAdd(false);
    }
  };
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const handleDeleteSeat = (seatId) => {
    if (window.confirm("Bạn có chắc muốn xóa ghế này không?")) {
    const seatToDelete = seats.find((seat) => seat.id === seatId);
  
    if (!seatToDelete) return;
  
    if (seatToDelete.type === "Sweetbox") {
      // Xác định vị trí ghế hiện tại
      const currentIndex = seats.findIndex((seat) => seat.id === seatId);
  
      // Xóa ghế Sweetbox: ghế chẵn và ghế trước đó, hoặc lẻ và ghế sau đó
      let seatsToRemove = [seatId];
      if (currentIndex % 2 === 0 && currentIndex > 0) {
        // Ghế chẵn: xóa ghế trước đó
        seatsToRemove.push(seats[currentIndex - 1].id);
      } else if (currentIndex % 2 !== 0 && currentIndex < seats.length - 1) {
        // Ghế lẻ: xóa ghế sau đó
        seatsToRemove.push(seats[currentIndex + 1].id);
      }
  
      // Lọc danh sách ghế và cập nhật số ghế trong hàng
      const updatedSeats = seats
        .filter((seat) => !seatsToRemove.includes(seat.id))
        .map((seat) => {
          if (seat.row === seatToDelete.row) {
            // Lấy tất cả ghế trong hàng, sắp xếp lại theo thứ tự số ghế
            const rowSeats = seats
              .filter((s) => s.row === seat.row && !seatsToRemove.includes(s.id))
              .sort((a, b) => parseInt(a.seatNumber.replace(seat.row, "")) - parseInt(b.seatNumber.replace(seat.row, "")))
              .map((s, index) => ({
                ...s,
                seatNumber: `${s.row}${index + 1}`,
              }));
            return rowSeats.find((s) => s.id === seat.id) || seat;
          }
          return seat;
        });
  
      setSeats(updatedSeats);
      setNotification({ message: "Xóa ghế Sweetbox thành công!", type: "success" });
    } else {
      // Xóa ghế thông thường và cập nhật số ghế trong hàng
      const updatedSeats = seats
        .filter((seat) => seat.id !== seatId)
        .map((seat) => {
          if (seat.row === seatToDelete.row) {
            // Lấy tất cả ghế trong hàng, sắp xếp lại theo thứ tự số ghế
            const rowSeats = seats
              .filter((s) => s.row === seat.row && s.id !== seatId)
              .sort((a, b) => parseInt(a.seatNumber.replace(seat.row, "")) - parseInt(b.seatNumber.replace(seat.row, "")))
              .map((s, index) => ({
                ...s,
                seatNumber: `${s.row}${index + 1}`,
              }));
            return rowSeats.find((s) => s.id === seat.id) || seat;
          }
          return seat;
        });
  
      setSeats(updatedSeats);
      setNotification({ message: "Xóa ghế thành công!", type: "success" });
    }
}
  };
  
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
      <button onClick={() => openModal("quick")} className={styles.bulkAddButton}>
        Thêm nhanh ghế
      </button>
      <button onClick={handleStandardQuickAdd} className={styles.addButton}>
        Thêm nhanh tiêu chuẩn
      </button>
      <button onClick={handleResetSeats} className={styles.resetButton}>
        Đặt lại từ đầu
      </button>
      </div>
      <div className={styles.seatMap}>
        <div className={styles.screen}>SCREEN</div>
        {Object.entries(groupedSeats).map(([row, rowSeats]) => (
          <div key={row} className={styles.seatRow}>
            {rowSeats.map((seat) => (
              <div
                key={seat.id}
                className={`${styles.seat} ${
                  seat.type === "VIP" ? styles.vipSeat : seat.type === "Sweetbox" ? styles.sweetboxSeat : styles.regularSeat
                }`}
                title={`Ghế: ${seat.seatNumber}, Loại: ${seat.type}`}
                onClick={() => handleDeleteSeat(seat.id)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>

      {isModalOpen.open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {isModalOpen.type === "regular" ? (
              <>
                <h2>Thêm ghế</h2>
                <form>
                <div className={styles.formRow}>
                  <div className={styles.itemFormGroup}>
                    <label>Hàng ghế</label>
                    <input
                      type="text"
                      value={formData.row}
                      onChange={(e) => setFormData({ ...formData, row: e.target.value })}
                      placeholder="Nhập hàng ghế (A-Z)"
                    />
                  </div>
                  <div className={styles.itemFormGroup}>
                    <label>Số ghế</label>
                    <input
                      type="number"
                      value={formData.seatCount}
                      onChange={(e) => setFormData({ ...formData, seatCount: parseInt(e.target.value) || 0 })}
                      placeholder="Nhập số ghế"
                    />
                  </div>
                  <div className={styles.itemFormGroup}>
                    <label>Loại ghế</label>
                    <select
                      value={formData.seatType}
                      onChange={(e) => setFormData({ ...formData, seatType: e.target.value })}
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="Sweetbox">Sweetbox</option>
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
              </>
            ) : (
              <>
                <h2>Thêm nhanh ghế</h2>
                <form>
                <div className={styles.formRow}>
                  <div className={styles.itemFormGroup}>
                    <label>Bắt đầu hàng</label>
                    <input
                      type="text"
                      maxLength="1"
                      value={bulkAdd.startRow}
                      onChange={(e) =>
                        setBulkAdd((prev) => ({ ...prev, startRow: e.target.value }))
                      }
                    />
                  </div>
                  <div className={styles.itemFormGroup}>
                    <label>Kết thúc hàng</label>
                    <input
                      type="text"
                      maxLength="1"
                      value={bulkAdd.endRow}
                      onChange={(e) =>
                        setBulkAdd((prev) => ({ ...prev, endRow: e.target.value }))
                      }
                    />
                  </div>
                  <div className={styles.itemFormGroup}>
                    <label>Số ghế</label>
                    <input
                      type="number"
                      value={bulkAdd.seatCount}
                      onChange={(e) =>
                        setBulkAdd((prev) => ({
                          ...prev,
                          seatCount: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div className={styles.itemFormGroup}>
                    <label>Loại ghế</label>
                    <select
                      value={bulkAdd.seatType}
                      onChange={(e) =>
                        setBulkAdd((prev) => ({ ...prev, seatType: e.target.value }))
                      }
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="Sweetbox">Sweetbox</option>
                    </select>
                  </div>
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" onClick={handleBulkAddSeats} className={styles.saveButton}>
                      Lưu
                    </button>
                    <button type="button" onClick={closeModal} className={styles.cancelButton}>
                      Hủy
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <Legend/>
    </div>
  );
};

export default ManageSeats;
