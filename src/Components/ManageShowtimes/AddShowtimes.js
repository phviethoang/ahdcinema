import React, { useState } from "react";
import styles from "./AddShowtimes.module.css";
import Notification from '../Notification/Notification'; 
import {isEqual} from '../../utils/isEqual'

import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';

import movie1 from '../ManageMovie/movieImage/image1.jpg';
import movie2 from '../ManageMovie/movieImage/image2.jpg';
import movie3 from '../ManageMovie/movieImage/image3.jpg';
import movie4 from '../ManageMovie/movieImage/image4.jpg';

const AddShowtimes = () => {

  const [cityData, setCityData]=useState([
        {city_id:1, city_name:"Hồ Chí Minh"},
        {city_id:2, city_name:"Hà Nội"},
        {city_id:3, city_name:"Hải Phòng"},
        {city_id:4, city_name:"Đà Nẵng"},
        {city_id:5, city_name:"Cần Thơ"},
      ])
  const [movieData, setMovieData] = useState([
    {
      movie_id: 1,
      movie_name: "Spider-Man: No Way Home",
      movie_image: movie1,
      movie_poster:"",
      duration: 180,
      category: "Action, Sci-Fi",
      actors: "Peter Parker",
      director: "Kevin Feige",
      start_date: "2025-01-10",
      languages: "Phụ đề, Tiếng Anh, Lồng tiếng",
      movie_label: "hot",
      trailer_link: "https://youtu.be/JfVOs4VSpmA",
      status: "Sắp chiếu",
      description: "Một bộ phim rất hay.",
    },
    {
      movie_id: 2,
      movie_name: "Black Panther",
      movie_image: movie2,
      movie_poster:"",
      duration: 121,
      category: "Action, Sci-Fi",
      actors: "Chadwick Boseman, Michael B. Jordan",
      director: "Ryan Coogler",
      start_date: "2024-02-20",
      languages: "Phụ đề, Tiếng Anh, Tiếng Việt",
      movie_label:"hot",
      trailer_link: "https://youtu.be/xjDjIWPwcPU",
      status: "Sắp chiếu",
      description: "Phim hành động viễn tưởng.",
    },
    {
      movie_id: 3,
      movie_name: "Doctor Strange in the Multiverse of Madness",
      movie_image: movie3,
      movie_poster:"",
      duration: 125,
      category: "Action, Sci-Fi, Horror",
      actors: "Benedict Cumberbatch",
      director: "Sam Raimi",
      start_date: "2025-01-15",
      languages: "Tiếng Anh",
      movie_label:null,
      trailer_link: "https://youtu.be/aWzlQ2N6qqg?si=e82cyp3DYccnPSxn",
      status: "Sắp chiếu",
      description: "Một bộ phim rất hay.",
    },
    {
      movie_id: 4,
      movie_name: "Avengers: Infinity War",
      movie_image: movie4,
      movie_poster:"",
      duration: 180,
      category: "Action, Sci-Fi, Adventure",
      actors: "	Robert Downey Jr, Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson",
      director: "Anthony Russo, Joe Russo",
      start_date: "2025-01-10",
      languages: "Phụ đề, Tiếng Anh",
      movie_label:null,
      trailer_link: "https://youtu.be/6ZfuNTqbHE8?si=o5y963txOFM2KVSK",
      status: "Sắp chiếu",
      description: "Một bộ phim rất hay.",
    },

  ]);

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
  const [selectedCinema, setSelectedCinema] = useState(cinemaData[0]?.cinema_id || "");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [notification, setNotification] = useState(null);

  const calculateDateTime =(date, time)=>{
    return new Date(`${date}T${time}`);
  }

const [paginationState, setPaginationState] = useState(
  () =>
    cinemaData.reduce((state, cinema) => {
      state[cinema.cinema_id] = { currentPage: 1 }; // Lưu trữ currentPage cho mỗi rạp chiếu
      return state;
    }, {})
);

const itemsPerPage = 5; 

const groupedShowtimes = cinemaData.reduce((grouped, cinema) => {
  grouped[cinema.cinema_id] = showtimes.filter(showtime => showtime.cinema_id  === cinema.cinema_id);
  return grouped;
}, {});
console.log('cinemaData:', cinemaData);
console.log('showtimes:', showtimes);

console.log("haha: ",groupedShowtimes)

// Hàm lấy các suất chiếu đã phân trang cho từng rạp
const getCinemaShowtimes = (cinemaId) => {
  const cinemaShowtimes = groupedShowtimes[cinemaId] || [];
  console.log("ok: ",groupedShowtimes[cinemaId]);
  const sortedShowtimes = cinemaShowtimes
    .slice()
    .sort((a, b) => {
      if (a.screeningroom_id  !== b.screeningroom_id ) {
        return a.screeningroom_id  - b.screeningroom_id ;
      }
      return calculateDateTime(a.show_date , a.show_date ) - calculateDateTime(b.show_date , b.show_time );
    });

  const currentPage = paginationState[cinemaId]?.currentPage || 1; // Lấy currentPage từ state
  const startIndex = (currentPage - 1) * itemsPerPage;
  return sortedShowtimes.slice(startIndex, startIndex + itemsPerPage);
};

// Hàm thay đổi trang
const handlePageChange = (cinemaId, page) => {
  setPaginationState((prevState) => ({
    ...prevState,
    [cinemaId]: { currentPage: page },
  }));
};

// Hàm chuyển sang trang tiếp theo
const handleNextPage = (cinemaId) => {
  const totalPages = Math.ceil((groupedShowtimes[cinemaId]?.length || 0) / itemsPerPage);
  if (paginationState[cinemaId]?.currentPage < totalPages) {
    setPaginationState((prevState) => ({
      ...prevState,
      [cinemaId]: { currentPage: prevState[cinemaId]?.currentPage + 1 },
    }));
  }
};

// Hàm chuyển về trang trước
const handlePrevPage = (cinemaId) => {
  if (paginationState[cinemaId]?.currentPage > 1) {
    setPaginationState((prevState) => ({
      ...prevState,
      [cinemaId]: { currentPage: prevState[cinemaId]?.currentPage - 1 },
    }));
  }
};



  const [editingShowtime, setEditingShowtime] = useState(null); // Để chỉnh sửa suất chiếu
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const selectedCinemaDetails = cinemaData.find(cinema => cinema.cinema_id === parseInt(selectedCinema));

  // Kiểm tra nếu thời gian chiếu đã qua
  const isTimeInPast = (date, time) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);
    return selectedDateTime < currentDate;
  };

  const isTimeConflict = (roomId, date, startTime, duration, editingId = null) => {
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + duration);
  
    for (let showtime of showtimes) {
      // Bỏ qua suất chiếu đang chỉnh sửa
      if (editingId && showtime.showtime_id  === editingId) continue;
  
      if (showtime.screeningroom_id  === roomId && showtime.show_date === date) {
        const existingStartTime = new Date(`${showtime.show_date }T${showtime.show_time}`);
        const existingEndTime = new Date(existingStartTime);
        const durationInMinutes = movieData.find(movie=>movie.movie_id===showtime.movie_id ).duration;
        existingEndTime.setMinutes(existingEndTime.getMinutes() + durationInMinutes);
  
        if (
          (startDateTime < existingEndTime && startDateTime >= existingStartTime) ||
          (endDateTime > existingStartTime && endDateTime <= existingEndTime)
        ) {
          const formattedStartTime = `${existingStartTime.getHours()
            .toString()
            .padStart(2, "0")}:${existingStartTime.getMinutes().toString().padStart(2, "0")}`;
          const formattedEndTime = `${existingEndTime.getHours()
            .toString()
            .padStart(2, "0")}:${existingEndTime.getMinutes().toString().padStart(2, "0")}`;
          return {
            // movieName: showtime.movieName,
            movieId: showtime.movie_id,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          };
        }
      }
    }
  
    return null; // Không có sự trùng lặp
  };
  

  // Thêm suất chiếu
  const handleAddShowtime = () => {
    if (!selectedCinema || !selectedRoom || !selectedDate || !selectedTime || !selectedMovie) {
      setNotification({ message: "Vui lòng nhập đầy đủ thông tin!", type: "error" });
      return;
    }

    if (isTimeInPast(selectedDate, selectedTime)) {
      setNotification({ message: "Thời gian chiếu không thể là thời gian trong quá khứ!", type: "error" });
      return;
    }

    const movie = movieData.find((movie) => movie.movie_id === parseInt(selectedMovie));
    const cinema = cinemaData.find(cinema => cinema.cinema_id === selectedCinema);
    // console.log(cinema);
    // const room = 
    const room = screeningRooms.find(room => room.screeningroom_id === parseInt(selectedRoom) && room.cinema_id === parseInt(selectedCinema));
    // console.log(room);
    const conflict = isTimeConflict(parseInt(selectedRoom), selectedDate, selectedTime, movie.duration);
    console.log("conflict: ", conflict);
    if (conflict) {
      const movieConflict = movieData.find(movie=>movie.id===parseInt(conflict.movieId));
      console.log("movieData: ",movieData)
      console.log("movieConflict: ",movieConflict)
      setNotification({
        message: `Có suất chiếu trùng giờ trong phòng Screen ${room?.room_number}! Phim "${movieConflict?.movie_name}" bắt đầu lúc ${conflict.startTime} và kết thúc vào ${conflict.endTime}.`,
        type: "error",
      });
      return;
    }

    const newShowtime = {
      showtime_id : showtimes.length + 1,
      show_date : selectedDate,
      show_time : selectedTime,
      movie_id: movie?.movie_id,
      cinema_id :cinema?.cinema_id,
      screeningroom_id : room?.screeningroom_id,
    };

    setShowtimes((prevShowtimes) => [...prevShowtimes, newShowtime]);
    setNotification({ message: "Thêm suất chiếu thành công!", type: "success" });
  };
  const handleEditShowtime = (showtime) => {
    setEditingShowtime({ ...showtime });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingShowtime) return;
  
    const originalShowtime = showtimes.find((showtime) => showtime.showtime_id  === editingShowtime.showtime_id);
    if (isEqual(originalShowtime, editingShowtime)) {
      setNotification({ message: "Không có sự thay đổi nào trong suất chiếu.", type: "error" });
      setIsModalOpen(false);
      return;
    }
  
    const movie = movieData?.find((movie) => movie.movie_id === editingShowtime.movie_id);
    if (!movie) {
      setNotification({ message: "Phim không hợp lệ!", type: "error" });
      return;
    }
  
    const room = screeningRooms?.find(
      (room) => room.screeningroom_id === parseInt(editingShowtime.screeningroom_id)&&
      room.cinema_id === parseInt(editingShowtime.cinema_id)
    );
    if (!room) {
      setNotification({ message: "Phòng chiếu không hợp lệ!", type: "error" });
      return;
    }
  
    // Truyền editingShowtime.id để bỏ qua chính nó khi kiểm tra
    const conflict = isTimeConflict(
      parseInt(editingShowtime.screeningroom_id ),
      editingShowtime.show_date ,
      editingShowtime.show_time ,
      movie.duration,
      editingShowtime.showtime_id
    );
  
    if (conflict) {
      setNotification({
        message: `Có suất chiếu trùng giờ trong phòng ${room.name}! Phim "${conflict.movieName}" bắt đầu lúc ${conflict.startTime} và kết thúc lúc ${conflict.endTime}.`,
        type: "error",
      });
      return;
    }

  
    setShowtimes(
      showtimes.map((showtime) =>
        showtime.showtime_id  === editingShowtime.showtime_id 
          ? {
              ...editingShowtime,
              movie_id: movie.movie_id,
            }
          : showtime
      )
    );
  
    setIsModalOpen(false);
    setNotification({ message: "Cập nhật suất chiếu thành công!", type: "success" });
  };
  
  // Xóa suất chiếu
  const handleDeleteShowtime = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa suất chiếu này?")) {
      setShowtimes(showtimes.filter((showtime) => showtime.showtime_id  !== id));
      setNotification({ message: "Xóa suất chiếu thành công!", type: "success" });
    }
  };
  // Reset tất cả dữ liệu và trạng thái về mặc định
  const handleResetShowtimes = () => {
    const room = screeningRooms.find((room) => room.screeningroom_id === parseInt(selectedRoom)&&room.cinema_id=== parseInt(selectedCinema));
    const cinema = cinemaData.find((cinema) => cinema.cinema_id === parseInt(selectedCinema));
    if (window.confirm(`Bạn có chắc chắn muốn đặt lại danh sách suất chiếu tại rạp '${cinema.cinema_name}', phòng Screen '${room.room_number}' không?`)) {
      setSelectedCinema("");
      setSelectedRoom("");
      setSelectedMovie("");
      setSelectedDate("");
      setSelectedTime("");
      const filteredShowtimes = showtimes.filter(showtime => 
        showtime.screeningroom_id !== parseInt(selectedRoom) && showtime.cinema_id  !== parseInt(selectedCinema)
      );
      setShowtimes([...filteredShowtimes]);
      // setShowtimes([]);
      setNotification({ message: "Đặt lại danh sách suất chiếu thành công!", type: "success" });
    }
  };
  const totalPages = selectedCinema
  ? Math.ceil((groupedShowtimes[selectedCinema]?.length || 0) / itemsPerPage)
  : 0; 

  return (
    <div className={styles.container}>
      <div className={styles.adminTitle}>Thêm suất chiếu mới</div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className={styles.formRow}>
        {/* Chọn rạp */}
        <div className={styles.itemFormGroup}>
          <label>Chọn rạp</label>
          <select
            value={selectedCinema}
            onChange={(e) => {
              setSelectedCinema(e.target.value);
              setSelectedRoom(""); // Reset room when cinema changes
            }}
          >
            <option value="">-- Chọn rạp --</option>
            {cinemaData.map((cinema) => (
              <option key={cinema.cinema_id} value={cinema.cinema_id}>
                {cinema.cinema_name} - {cityData.find(city=>city.city_id===cinema.cinema_id).city_name}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn phòng chiếu */}
        <div className={styles.itemFormGroup}>
          <label>Chọn phòng chiếu</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            disabled={!selectedCinema}
          >
            <option value="">-- Chọn phòng --</option>
            {selectedCinema &&
           screeningRooms.filter((room) =>room.cinema_id=== parseInt(selectedCinema))
              // cinemaRooms[selectedCinema]?
              .map((room) => (
                <option key={room.screeningroom_id} value={room.screeningroom_id}>
                  Screen {room.room_number}
                </option>
              ))}
          </select>
        </div>

        {/* Chọn ngày chiếu */}
        <div className={styles.itemFormGroup}>
          <label>Ngày chiếu</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      <div/>
      <div className={styles.formRow}>
        {/* Chọn giờ chiếu */}
          <div className={styles.itemFormGroup}>
            <label>Giờ chiếu</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>

        {/* Chọn phim */}
          <div className={styles.itemFormGroup}>
            <label>Chọn phim</label>
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">-- Chọn phim --</option>
              {movieData.map((movie) => (
                <option key={movie.movie_id} value={movie.movie_id}>
                  {movie.movie_name}
                </option>
              ))}
            </select>
          </div>
      </div>
    </div>
    <div className={styles.actionButtons}>
        <button className={styles.addButton} onClick={handleAddShowtime}>
          Thêm suất chiếu
        </button>
        {(selectedCinema&&selectedRoom)?
          <button className={styles.resetButton} onClick={handleResetShowtimes}>
            Đặt lại danh sách suất chiếu
          </button>
        :
          <button className={styles.resetButton}>
            Đặt lại danh sách suất chiếu
          </button>
        }
      </div>
      {/* Danh sách suất chiếu */}
      <h2>Danh sách suất chiếu{selectedCinemaDetails ? ": " + selectedCinemaDetails.cinema_name : ""}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>STT</th>
            <th>Tên phim</th>
            <th>Phòng chiếu</th>
            <th>Rạp</th>
            <th>Ngày chiếu</th>
            <th>Giờ chiếu</th>
            <th>Thời lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentShowtimes */}
          {console.log(selectedCinemaDetails.cinema_id)}
          {console.log(getCinemaShowtimes(selectedCinemaDetails.cinema_id))}
          {selectedCinema &&getCinemaShowtimes(selectedCinemaDetails.cinema_id)
          // .filter(showtime => showtime.cinemaId === selectedCinemaDetails.id)
          .map((showtime,index) => (
            <tr key={showtime.showtime_id}>
              {/* <td>{showtime.id}</td> */}
              <td>{index+1}</td>
              <td>{movieData.find(movie=>movie.id===showtime.movie_id)?.movie_name}</td>
              {/* <td>{cinemaRooms[showtime.cinemaId].find(room=>room.id===showtime.roomId)?.name}</td> */}
              <td>
                {screeningRooms
                  .filter(room => room.cinema_id === showtime.cinema_id)  // Lọc các phòng chiếu thuộc rạp hiện tại
                  .find(room => room.screeningroom_id === showtime.screeningroom_id) // Tìm phòng chiếu theo screeningroom_id
                  ?.room_number} {/* Hoặc dùng tên phòng chiếu: room_name hoặc tên khác */}
              </td>

              <td>{cinemaData.find(cinema=>cinema.cinema_id===showtime.cinema_id)?.cinema_name}</td>
              <td>{showtime.show_date}</td>
              <td>{showtime.show_time}</td>
              {/* <td>{showtime.duration}</td> */}
              <td>{movieData.find(movie=>movie.movie_id===showtime.movie_id).movie_name}</td>
              <td>
                <div className={styles.editnDeleteButton}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditShowtime(showtime)}
                  >
                    Sửa
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteShowtime(showtime.id)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* Modal chỉnh sửa suất chiếu */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Chỉnh sửa suất chiếu</h3>
              <div className={styles.formRow}>
                <div className={`${styles.itemFormGroup} ${styles.itemFormGroup2} `}>
                <label>Tên phim</label>
                    <select
                        name="movieName"
                        value={editingShowtime.movie_id}  // Sử dụng movie_id cho value, không phải movie_name
                        onChange={(e) => setEditingShowtime({ 
                        ...editingShowtime, 
                        movie_id: parseInt(e.target.value) // Cập nhật movie_id, cần parseInt vì giá trị là chuỗi
                        })}
                    >
                        {movieData.map((movie) => (
                        <option key={movie.movie_id} value={movie.movie_id}>  {/* Dùng movie_id làm value */}
                            {movie.movie_name} {/* Hiển thị tên phim */}
                        </option>
                        ))}
                    </select>

                </div>
                <div className={`${styles.itemFormGroup} ${styles.itemFormGroup2} `}>
                  <label>Ngày chiếu</label>
                  <input
                    type="date"
                    name="date"
                    value={editingShowtime.date}
                    onChange={(e) => setEditingShowtime({ ...editingShowtime, show_date: e.target.value })}
                  />
                </div>
                <div className={`${styles.itemFormGroup} ${styles.itemFormGroup2} `}>
                  <label>Giờ chiếu</label>
                  <input
                    type="time"
                    name="time"
                    value={editingShowtime.time}
                    onChange={(e) => setEditingShowtime({ ...editingShowtime, show_time: e.target.value })}
                  />
                </div>
                <div className={`${styles.itemFormGroup} ${styles.itemFormGroup2} `}>
                  <label>Phòng chiếu</label>
                  <select
                    name="screeningroom_id "
                    value={editingShowtime.screeningroom_id }
                    onChange={(e) => setEditingShowtime({ ...editingShowtime, screeningroom_id : e.target.value })}
                  >
                    {screeningRooms.filter(room=>room.cinema_id===selectedCinema)
                    .map((room) => (
                      <option key={room.screeningroom_id} value={room.screeningroom_id}>
                        Screen {room.room_number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            <div className={styles.formActions}>
              <button className={styles.saveButton} onClick={handleSaveEdit}>Cập nhật</button>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      {/* <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div> */}
      <div className={styles.pagination}>
        <button
          onClick={() => handlePrevPage(selectedCinema)} // Chuyển về trang trước
          disabled={paginationState[selectedCinema]?.currentPage === 1}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(selectedCinema, index + 1)} // Chuyển đến trang cụ thể
            className={`${styles.pageButton} ${
              paginationState[selectedCinema]?.currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleNextPage(selectedCinema)} // Chuyển sang trang sau
          disabled={paginationState[selectedCinema]?.currentPage === totalPages}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AddShowtimes;


