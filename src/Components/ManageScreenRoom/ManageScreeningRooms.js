
// import React, { useState, useEffect } from "react";
// import styles from "./ManageScreeningRooms.module.css";
// import Notification from '../Notification/Notification'; 


// import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
// import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
// import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
// import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';


// const ManageScreeningRooms = () => {
//   const cinemaId = new URLSearchParams(window.location.search).get("cinemaId");
//   // const cinemaId = new URLSearchParams(window.location.search).get("cinemaId");

//   console.log("cinemaId:", cinemaId); // Để kiểm tra giá trị của cinemaId
  
//   // // Dữ liệu giả lập cho rạp chiếu phim
//   // const cinemas = [
//   //   { id: 1, name: "Cinemax 1" },
//   //   { id: 2, name: "Galaxy Cinema" },
//   //   { id: 3, name: "Lotte Cinema" },
//   //   { id: 4, name: "Cinemax 2" },
//   // ];

//   const [cinemaData, setCinemaData] = useState([
//     {
//       cinema_id: 1,
//       cinema_name: "Cinemax 1",
//       address: "123 Đường ABC, Quận 1",
//       city_id: 1,
//       // images: [cinema1, cinema2, cinema3, cinema4],
//       cinema_image: cinema1,
//     },
//     {
//       cinema_id: 2,
//       cinema_name: "Galaxy Cinema",
//       address: "456 Đường XYZ, Quận 3",
//       city_id: 2,
//       // images: cinema2,
//       cinema_image: cinema2,
//     },
//     {
//       cinema_id: 3,
//       cinema_name: "Lotte Cinema",
//       address: "789 Đường LMN, Quận 5",
//       city_id: 4,
//       // images: cinema3,
//       cinema_image: cinema3,
//     },
//     {
//       cinema_id: 4,
//       cinema_name: "Cinemax 2",
//       address: "123 Đường ABCZ, Quận 5",
//       city_id: 5,
//       // images: [cinema1, cinema2, cinema3],
//       cinema_image: cinema4,
//       },
//     // Thêm các rạp khác ở đây...
//   ]);

//   // Lấy thông tin tên rạp dựa trên cinemaId
//   const cinemaName = cinemas.find((cinema) => cinema.id === parseInt(cinemaId))
//     ?.name || "Unknown Cinema";

//   // Dữ liệu giả lập phòng chiếu cho từng rạp
//   // const [cinemaRooms, setCinemaRooms] = useState({
//   //   1: [
//   //     { id: 1, roomName: "Screen 1", roomType: "VIP"},
//   //     { id: 2, roomName: "Screen 2", roomType: "Standard"},
//   //   ],
//   //   2: [
//   //     { id: 3, roomName: "Screen 1", roomType: "VIP"},
//   //     { id: 4, roomName: "Screen 2", roomType: "Standard"},
//   //   ],
//   //   3:[

//   //   ],
//   //   4:[

//   //   ]
//   //   // Thêm các rạp khác nếu cần
//   // });
  
//   const [screeningRooms, setScreeningRooms]= useState([
//     {
//       screeningroom_id: 1,
//       room_number: 1,
//       room_type: "Standard",
//       seat_capacity: 100,
//       cinema_id: 1,
//     },
//     {
//       screeningroom_id: 2,
//       room_number: 2,
//       room_type: "VIP",
//       seat_capacity: 50,
//       cinema_id: 1,
//     },
//     {
//       screeningroom_id: 3,
//       room_number: 1,
//       room_type: "STANDARD",
//       seat_capacity: 100,
//       cinema_id: 1,
//     },
//     {
//       screeningroom_id: 4,
//       room_number: 1,
//       room_type: "IMAX",
//       seat_capacity: 200,
//       cinema_id: 3,
//     },
//   ])

//   const [notification, setNotification] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingRoom, setEditingRoom] = useState(null);
//   const [formData, setFormData] = useState({
//     // roomName: "",
//     room_type:"Standard",
//     seat_capacity:0,
//     // roomType: "Standard",
//     // seatCapacity: "",
//   });

//   const openModal = (room = null) => {
//     if (room) {
//       setEditingRoom(room);
//       setFormData({ ...room });
//     } else {
//       setEditingRoom(null);
//       // setFormData({ roomName: "", roomType: "Standard", seatCapacity: "" });
//       // setFormData({ roomName: "", roomType: "Standard"});
//       setFormData({ seat_capacity: "", room_type: "Standard"});
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingRoom(null);
//   };

//   const handleSaveRoom = () => {
//     if (!formData.seat_capacity || formData.seat_capacity <= 0) {
//     // if (!formData.roomName) {
//       setNotification({
//         // message: "Vui lòng nhập tên phòng chiếu!",
//         message: "Sức chứa không hợp lệ!",
//         type: "error",
//       });
//       return;
//     }
//     // const isRoomExist = cinemaRooms[cinemaId]?.some(
//     //   (room) => room.roomName === formData.roomName && room.roomType === formData.roomType
//     // );
  
//     // if (isRoomExist) {
//     //   setNotification({
//     //     message: "Phòng chiếu với tên và loại này đã tồn tại!",
//     //     type: "error",
//     //   });
//     //   return;
//     // }

//     const updatedRooms = [...cinemaRooms[cinemaId]];

//     if (editingRoom) {
//       const roomIndex = updatedRooms.findIndex((room) => room.id === editingRoom.id);
//       updatedRooms[roomIndex] = { ...formData };
//       setCinemaRooms((prevState) => ({
//         ...prevState,
//         [cinemaId]: updatedRooms,
//       }));
//       setNotification({
//         message: "Cập nhật phòng chiếu thành công!",
//         type: "success",
//       });
//     } else {
//       const newRoom = {
//         id: updatedRooms.length + 1,
//         ...formData,
//       };
//       setCinemaRooms((prevState) => ({
//         ...prevState,
//         [cinemaId]: [...updatedRooms, newRoom],
//       }));
//       setNotification({
//         message: "Thêm phòng chiếu thành công!",
//         type: "success",
//       });
//     }
//     closeModal();
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault(); 
//     handleSaveRoom();   
//   };

//   const handleDeleteRoom = (roomId) => {
//     if (window.confirm("Bạn có chắc muốn xóa phòng chiếu này không?")) {
//       const updatedRooms = cinemaRooms[cinemaId].filter((room) => room.id !== roomId);
//       setCinemaRooms((prevState) => ({
//         ...prevState,
//         [cinemaId]: updatedRooms,
//       }));
//       setNotification({ message: "Xóa phòng chiếu thành công!", type: "success" });
//     }
//   };

//   const handleManageSeats = (roomId) => {
//     window.location.href = `/manage-seats?cinemaId=${cinemaId}&roomId=${roomId}`;
//   };

//   return (
//     <div className={styles.container}>
//       <Notification
//         message={notification?.message}
//         type={notification?.type}
//         onClose={() => setNotification(null)}
//       />
//       <div className={styles.adminTitle}>
//         Quản lý phòng chiếu | {cinemaName}
//       </div>
      
//       <button onClick={() => openModal()} className={styles.addButton}>
//         Thêm phòng chiếu
//       </button>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>STT</th>
//             <th>Tên phòng</th>
//             <th>Loại phòng</th>
//             {/* <th>Số ghế</th> */}
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cinemaRooms[cinemaId]?.map((room, index) => (
//             <tr key={room.id}>
//               <td>{index}</td>
//               <td>{room.roomName}</td>
//               <td>{room.roomType}</td>
//               {/* <td>{room.seatCapacity}</td> */}
//               <td>
//                 <div className={styles.editnDeleteButton}>
//                   <button
//                     onClick={() => openModal(room)}
//                     className={styles.editButton}
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     onClick={() => handleManageSeats(room.id)}
//                     className={styles.manageButton}
//                   >
//                     Quản lý <br></br>ghế
//                   </button>
//                   <button
//                     onClick={() => handleDeleteRoom(room.id)}
//                     className={styles.deleteButton}
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h2>{editingRoom ? "Chỉnh sửa phòng chiếu" : "Thêm phòng chiếu"}</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className={styles.formRow}>
//                 <div className={styles.itemFormGroup}>
//                   <label>Tên phòng</label>
//                   <input
//                     type="text"
//                     value={formData.roomName}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, roomName: e.target.value }))
//                     }
//                     placeholder="Nhập tên phòng"
//                   />
//                 </div>
//                 <div className={styles.itemFormGroup}>
//                   <label>Loại phòng</label>
//                   <select
//                     value={formData.roomType}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, roomType: e.target.value }))
//                     }
//                   >
//                     <option value="Standard">Standard</option>
//                     <option value="VIP">VIP</option>
//                     <option value="Deluxe">Deluxe</option>
//                   </select>
//                 </div>
//               </div>
//               {/* <div className={styles.itemFormGroup}>
//                 <label>Số ghế</label>
//                 <input
//                   type="number"
//                   value={formData.seatCapacity}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, seatCapacity: e.target.value }))
//                   }
//                   placeholder="Nhập số ghế"
//                 />
//               </div> */}
//               <div className={styles.formActions}>
//                 <button
//                   type="button"
//                   onClick={handleSaveRoom}
//                   className={styles.saveButton}
//                 >
//                   Lưu
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className={styles.cancelButton}
//                 >
//                   Hủy
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageScreeningRooms;







import React, { useState, useEffect } from "react";
import styles from "./ManageScreeningRooms.module.css";
import Notification from '../Notification/Notification'; 
import {isEqual} from '../../utils/isEqual'

import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';

const ManageScreeningRooms = () => {
  const cinemaId = new URLSearchParams(window.location.search).get("cinemaId");
  console.log("cinemaId:", cinemaId);

  // Dữ liệu các rạp chiếu
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

  const currentCinema = cinemaData.find((cinema) => cinema.cinema_id === parseInt(cinemaId)) || {};

  // Dữ liệu phòng chiếu
  const [screeningRooms, setScreeningRooms] = useState([
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
      room_type: "Standard",
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

  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    room_type: "Standard",
    seat_capacity: 0,
  });

  const openModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({ ...room });
    } else {
      setEditingRoom(null);
      setFormData({ seat_capacity: "", room_type: "Standard" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };
  const handleSaveRoom = () => {
    if (!formData.seat_capacity || formData.seat_capacity <= 0) {
      setNotification({
        message: "Sức chứa không hợp lệ!",
        type: "error",
      });
      return;
    }
    if (editingRoom && isEqual(editingRoom, formData)) {
      // Nếu không có sự thay đổi, thông báo cho người dùng
      setNotification({ message: "Không có sự thay đổi nào trong phòng chiếu.", type: "error" });
      return;
    }
  
    // Lọc ra các phòng chiếu của rạp hiện tại
    const roomsInCurrentCinema = screeningRooms.filter((room) => room.cinema_id === parseInt(cinemaId));
  
    // Tính room_number mới cho phòng chiếu
    const maxRoomNumberInCinema = Math.max(...roomsInCurrentCinema.map(room => room.room_number), 0); // Lấy max room_number của các phòng chiếu trong cinemaId
    const newRoomNumber = maxRoomNumberInCinema + 1;  // Tính số phòng chiếu tiếp theo
  
    const updatedRooms = [...screeningRooms];
  
    if (editingRoom) {
      // Cập nhật phòng chiếu đang chỉnh sửa
      const roomIndex = updatedRooms.findIndex((room) => room.screeningroom_id === editingRoom.screeningroom_id);
      updatedRooms[roomIndex] = { ...formData, room_number: editingRoom.room_number };  // Giữ lại room_number cũ khi chỉnh sửa
      setScreeningRooms(updatedRooms);
      setNotification({
        message: "Cập nhật phòng chiếu thành công!",
        type: "success",
      });
    } else {
      const maxScreeningRoomId = Math.max(...screeningRooms.map(room => room.screeningroom_id), 0);
      
      // Tạo phòng chiếu mới với room_number mới tính được
      const newRoom = {
        screeningroom_id: maxScreeningRoomId + 1,
        room_number: newRoomNumber,  // Sử dụng room_number mới tính được
        cinema_id: parseInt(cinemaId),
        ...formData,  // Thêm dữ liệu từ form
      };
  
      setScreeningRooms([...updatedRooms, newRoom]);
      setNotification({
        message: "Thêm phòng chiếu thành công!",
        type: "success",
      });
    }
  
    closeModal();
  };
  
  
  useEffect(()=>{
    console.log(screeningRooms);
  },[screeningRooms])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveRoom();
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng chiếu này không?")) {
      const updatedRooms = screeningRooms.filter((room) => room.screeningroom_id !== roomId);
      setScreeningRooms(updatedRooms);
      setNotification({ message: "Xóa phòng chiếu thành công!", type: "success" });
    }
  };

  const handleManageSeats = (roomId) => {
    // window.location.href = `/manage-seats?cinemaId=${cinemaId}&roomId=${roomId}`;
    window.location.href = `/manage-seats?cinemaId=${cinemaId}&screeningroomId=${roomId}`;
  };

  const filteredRooms = screeningRooms.filter(room => room.cinema_id === parseInt(cinemaId));

  return (
    <div className={styles.container}>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      <div className={styles.adminTitle}>
        Quản lý phòng chiếu | {currentCinema.cinema_name || "Rạp không tồn tại"}
      </div>

      <button onClick={() => openModal()} className={styles.addButton}>
        Thêm phòng chiếu
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Phòng chiếu</th>
            <th>Loại phòng</th>
            <th>Sức chứa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room, index) => (
            <tr key={room.screeningroom_id}>
              <td>{index + 1}</td>
              <td>Screen {room.room_number}</td>
              <td>{room.room_type}</td>
              <td>{room.seat_capacity}</td>
              <td>
                <div className={styles.editnDeleteButton}>
                  <button onClick={() => openModal(room)} className={styles.editButton}>
                    Sửa
                  </button>
                  <button onClick={() => handleManageSeats(room.screeningroom_id)} className={styles.manageButton}>
                    Quản lý ghế
                  </button>
                  <button onClick={() => handleDeleteRoom(room.screeningroom_id)} className={styles.deleteButton}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{editingRoom ? "Chỉnh sửa phòng chiếu" : "Thêm phòng chiếu"}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formRow}>
                <div className={styles.itemFormGroup}>
                  <label>Loại phòng</label>
                  <select
                    value={formData.room_type}
                    onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                  >
                    <option value="Standard">Standard</option>
                    <option value="VIP">VIP</option>
                    <option value="IMAX">IMAX</option>
                  </select>
                </div>
                <div className={styles.itemFormGroup}>
                <label htmlFor="seat_capacity">Nhập sức chứa:</label>
                    <input
                      type="number"
                      id="seat_capacity"
                      name="seat_capacity"
                      value={formData.seat_capacity}
                      onChange={(e) => setFormData({ ...formData, seat_capacity: e.target.value })}
                      placeholder="Nhập sức chứa"
                    />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={handleSaveRoom} className={styles.saveButton}>
                  Lưu
                </button>
                <button type="button" onClick={closeModal} className={styles.cancelButton}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScreeningRooms;
