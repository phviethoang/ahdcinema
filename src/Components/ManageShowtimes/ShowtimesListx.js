import React, { useState } from "react";
import styles from "./ShowtimesList.module.css";
import Notification from '../Notification/Notification'; 
const ShowtimesList = () => {
  const cinemas = [
    { id: 1, name: "Cinemax 1", city: "TP. Hồ Chí Minh" },
    { id: 2, name: "Galaxy Cinema", city: "Hà Nội" },
    { id: 3, name: "Lotte Cinema", city: "Đà Nẵng" },
    { id: 4, name: "Cinemax 2", city: "TP. Hồ Chí Minh" },
  ];

  const cinemaRooms = {
    1: [
      { id: 1, name: "Screen 1" },
      { id: 2, name: "Screen 2" },
      { id: 3, name: "Screen 3" },
    ],
    2: [
      { id: 4, name: "Screen 1" },
      { id: 5, name: "Screen 2" },
    ],
    3: [
      { id: 6, name: "Screen 1" },
      { id: 7, name: "Screen 2" },
    ],
    4: [
      { id: 8, name: "Screen 1" },
      { id: 9, name: "Screen 2" },
    ],
  };

  const movies = [
    { id: 1, name: "Spider-Man: No Way Home" },
    { id: 2, name: "Black Panther" },
    { id: 3, name: "Doctor Strange in the Multiverse of Madness" },
    { id: 4, name: "Avengers: Infinity War" },
  ];

const [showtimes, setShowtimes] = useState([
  { id: 1, movieName: "Black Panther", roomId: 3, cinemaId: 2, date: "2025-01-01", time: "18:30" },
  { id: 2, movieName: "Spider-Man: No Way Home", roomId: 2, cinemaId: 1, date: "2025-01-02", time: "13:15" },
  { id: 3, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 4, cinemaId: 2, date: "2025-01-02", time: "09:45" },
  { id: 4, movieName: "Avengers: Infinity War", roomId: 5, cinemaId: 3, date: "2025-01-03", time: "20:00" },
  { id: 5, movieName: "Spider-Man: No Way Home", roomId: 1, cinemaId: 1, date: "2025-01-03", time: "11:20" },
  { id: 6, movieName: "Black Panther", roomId: 2, cinemaId: 1, date: "2025-01-04", time: "17:45" },
  { id: 7, movieName: "Avengers: Infinity War", roomId: 4, cinemaId: 2, date: "2025-01-04", time: "22:00" },
  { id: 8, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 6, cinemaId: 3, date: "2025-01-05", time: "14:00" },
  { id: 9, movieName: "Black Panther", roomId: 1, cinemaId: 1, date: "2025-01-05", time: "10:50" },
  { id: 10, movieName: "Spider-Man: No Way Home", roomId: 3, cinemaId: 2, date: "2025-01-06", time: "19:30" },
  { id: 11, movieName: "Avengers: Infinity War", roomId: 2, cinemaId: 1, date: "2025-01-07", time: "21:15" },
  { id: 12, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 4, cinemaId: 2, date: "2025-01-07", time: "08:30" },
  { id: 13, movieName: "Black Panther", roomId: 6, cinemaId: 3, date: "2025-01-08", time: "13:45" },
  { id: 14, movieName: "Spider-Man: No Way Home", roomId: 1, cinemaId: 1, date: "2025-01-08", time: "15:10" },
  { id: 15, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 3, cinemaId: 2, date: "2025-01-09", time: "10:50" },
  { id: 16, movieName: "Avengers: Infinity War", roomId: 5, cinemaId: 3, date: "2025-01-09", time: "18:20" },
  { id: 17, movieName: "Spider-Man: No Way Home", roomId: 2, cinemaId: 1, date: "2025-01-10", time: "09:30" },
  { id: 18, movieName: "Black Panther", roomId: 4, cinemaId: 2, date: "2025-01-10", time: "20:45" },
  { id: 19, movieName: "Avengers: Infinity War", roomId: 1, cinemaId: 1, date: "2025-01-11", time: "11:15" },
  { id: 20, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 3, cinemaId: 2, date: "2025-01-11", time: "16:30" },
  { id: 21, movieName: "Black Panther", roomId: 5, cinemaId: 3, date: "2025-01-12", time: "22:10" },
  { id: 22, movieName: "Spider-Man: No Way Home", roomId: 2, cinemaId: 1, date: "2025-01-12", time: "08:50" },
  { id: 23, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 4, cinemaId: 2, date: "2025-01-13", time: "18:00" },
  { id: 24, movieName: "Avengers: Infinity War", roomId: 6, cinemaId: 3, date: "2025-01-13", time: "20:30" },
  { id: 25, movieName: "Black Panther", roomId: 1, cinemaId: 1, date: "2025-01-14", time: "14:45" },
  { id: 26, movieName: "Spider-Man: No Way Home", roomId: 3, cinemaId: 2, date: "2025-01-14", time: "09:10" },
  { id: 27, movieName: "Avengers: Infinity War", roomId: 2, cinemaId: 1, date: "2025-01-15", time: "19:50" },
  { id: 28, movieName: "Doctor Strange in the Multiverse of Madness", roomId: 4, cinemaId: 2, date: "2025-01-15", time: "12:20" },
  { id: 29, movieName: "Black Panther", roomId: 6, cinemaId: 3, date: "2025-01-16", time: "17:30" },
  { id: 30, movieName: "Spider-Man: No Way Home", roomId: 1, cinemaId: 1, date: "2025-01-16", time: "21:00" },
]);

  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    cinema: "",
    room: "",
    date: "",
    startTime: "",
    endTime: "",
    movie: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredShowtimes = showtimes.filter((showtime) => {
    const {
      cinema: selectedCinema,
      room: selectedRoom,
      date: selectedDate,
      startTime,
      endTime,
      movie: selectedMovie,
    } = filters;

    const matchesCinema = selectedCinema ? showtime.cinemaId === parseInt(selectedCinema) : true;
    const matchesRoom = selectedRoom ? showtime.roomId === parseInt(selectedRoom) : true;
    const matchesDate = selectedDate ? showtime.date === selectedDate : true;
    // const matchesTime =
    //   startTime && endTime
    //     ? showtime.time >= startTime && showtime.time <= endTime
    //     : true;
    const matchesStartTime =
    startTime 
      ? showtime.time >= startTime
      : true;
    const matchesEndTime =
    endTime 
      ? showtime.time <= endTime
      : true;
    const matchesMovie = selectedMovie ? showtime.movieName === selectedMovie : true;

    return matchesCinema && matchesRoom && matchesDate && matchesStartTime && matchesEndTime && matchesMovie;
  });

  const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);
  const paginatedShowtimes = filteredShowtimes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại tất cả bộ lọc không?")) {
      setFilters({ cinema: "", room: "", date: "", startTime: "", endTime: "", movie: "" });
      setNotification({ message: "Đặt lại tìm kiếm thành công!", type: "success" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.adminTitle}>Danh sách suất chiếu</div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className={styles.formRow}>
        <div className={styles.itemFormGroup}>
          <label>Chọn rạp</label>
          <select name="cinema" value={filters.cinema} onChange={handleFilterChange}>
            <option value="">-- Chọn rạp --</option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.itemFormGroup}>
          <label>Chọn phòng chiếu</label>
          <select
            name="room"
            value={filters.room}
            onChange={handleFilterChange}
            disabled={!filters.cinema}
          >
            <option value="">-- Chọn phòng chiếu --</option>
            {cinemaRooms[filters.cinema]?.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.itemFormGroup}>
          <label>Ngày chiếu</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className={styles.formRow} style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
        <div className={styles.itemFormGroup} >
          <label className={styles.timeInputs}>Giờ chiếu</label>
          <div className={styles.timeInputs}>
            <input
              type="time"
              name="startTime"
              value={filters.startTime}
              onChange={handleFilterChange}
            />
            <span>đến</span>
            <input
              type="time"
              name="endTime"
              value={filters.endTime}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className={styles.itemFormGroup}>
          <label>Chọn phim</label>
          <select name="movie" value={filters.movie} onChange={handleFilterChange}>
            <option value="">-- Chọn phim --</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.name}>
                {movie.name}
              </option>
            ))}
          </select>
        {/* </div> */}
      </div>
      </div>
      <div className={styles.marginResetButton}>
        <button className={styles.resetButton} onClick={handleResetFilters}>
            Đặt lại tìm kiếm
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên phim</th>
            <th>Rạp</th>
            <th>Phòng</th>
            <th>Ngày</th>
            <th>Giờ</th>
          </tr>
        </thead>
        <tbody>
          {paginatedShowtimes.map((showtime, index) => (
            <tr key={showtime.id}>
              {/* <td>{showtime.id}</td> */}
              <td>{index+1}</td>
              <td>{showtime.movieName}</td>
              <td>{cinemas.find((cinema) => cinema.id === showtime.cinemaId)?.name}</td>
              <td>{cinemaRooms[showtime.cinemaId]?.find((room) => room.id === showtime.roomId)?.name}</td>
              <td>{showtime.date}</td>
              <td>{showtime.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.pageButton}
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ShowtimesList;
