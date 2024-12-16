import React, { useState, useEffect } from "react";
import styles from "./ShowtimesList.module.css";
import Notification from '../Notification/Notification'; 

import cinema1 from '../ManageCinema/cinemaImage/cinema1.png';
import cinema2 from '../ManageCinema/cinemaImage/cinema2.png';
import cinema3 from '../ManageCinema/cinemaImage/cinema3.png';
import cinema4 from '../ManageCinema/cinemaImage/cinema1.png';

import movie1 from '../ManageMovie/movieImage/image1.jpg';
import movie2 from '../ManageMovie/movieImage/image2.jpg';
import movie3 from '../ManageMovie/movieImage/image3.jpg';
import movie4 from '../ManageMovie/movieImage/image4.jpg';

const ShowtimesList = () => {
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

const [showtimeData, setShowtimeData] = useState([
  { showtime_id: 1, show_date: "2024-12-25", show_time: "10:00", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 2, show_date: "2024-12-25", show_time: "13:30", movie_id: 1, cinema_id: 1, screeningroom_id: 2 },
  { showtime_id: 3, show_date: "2024-12-25", show_time: "15:00", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 4, show_date: "2024-12-25", show_time: "18:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 5, show_date: "2024-12-26", show_time: "12:00", movie_id: 4, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 6, show_date: "2024-12-26", show_time: "14:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 7, show_date: "2024-12-26", show_time: "20:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 8, show_date: "2024-12-27", show_time: "09:00", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 9, show_date: "2024-12-27", show_time: "11:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 10, show_date: "2024-12-27", show_time: "13:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 11, show_date: "2024-12-27", show_time: "15:30", movie_id: 4, cinema_id: 1, screeningroom_id: 2 },
  { showtime_id: 12, show_date: "2024-12-28", show_time: "10:30", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 13, show_date: "2024-12-28", show_time: "13:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 14, show_date: "2024-12-28", show_time: "16:00", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 15, show_date: "2024-12-29", show_time: "11:30", movie_id: 4, cinema_id: 1, screeningroom_id: 2 },
  { showtime_id: 16, show_date: "2024-12-29", show_time: "14:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 17, show_date: "2024-12-29", show_time: "17:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 18, show_date: "2024-12-30", show_time: "09:30", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 19, show_date: "2024-12-30", show_time: "12:00", movie_id: 4, cinema_id: 1, screeningroom_id: 2 },
  { showtime_id: 20, show_date: "2024-12-30", show_time: "14:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 21, show_date: "2024-12-30", show_time: "17:30", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 22, show_date: "2024-12-31", show_time: "10:30", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 23, show_date: "2024-12-31", show_time: "13:00", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 24, show_date: "2024-12-31", show_time: "15:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 25, show_date: "2025-01-01", show_time: "09:30", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 26, show_date: "2025-01-01", show_time: "12:30", movie_id: 4, cinema_id: 1, screeningroom_id: 2 },
  { showtime_id: 27, show_date: "2025-01-01", show_time: "15:30", movie_id: 2, cinema_id: 2, screeningroom_id: 3 },
  { showtime_id: 28, show_date: "2025-01-01", show_time: "18:30", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
  { showtime_id: 29, show_date: "2025-01-02", show_time: "09:00", movie_id: 1, cinema_id: 1, screeningroom_id: 1 },
  { showtime_id: 30, show_date: "2025-01-02", show_time: "11:30", movie_id: 3, cinema_id: 3, screeningroom_id: 4 },
]);


  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    cinema: '',
    room: '',
    date: "",
    startTime: "",
    endTime: "",
    movie: "",
  });

useEffect(()=>{
  console.log("filters: ",filters)
  console.log("room: ", typeof filters.room)
},[filters])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredShowtimes = showtimeData.filter((showtime) => {
    // const movie = movieData.find(movie=>movie.movie_id===showtime.movie_id);
    // const cinema = cinemaData.find(cinema=>cinema.cinema_id===showtime.cinema_id);
    const {
      cinema: selectedCinema,
      room: selectedRoom,
      date: selectedDate,
      startTime,
      endTime,
      movie: selectedMovie,
    } = filters;

    const matchesCinema = selectedCinema ? showtime.cinema_id === parseInt(selectedCinema) : true;
    const matchesRoom = selectedRoom ? showtime.screeningroom_id === parseInt(selectedRoom) : true;
    const matchesDate = selectedDate ? showtime.show_date === selectedDate : true;
    // const matchesTime =
    //   startTime && endTime
    //     ? showtime.time >= startTime && showtime.time <= endTime
    //     : true;
    const matchesStartTime =
    startTime 
      ? showtime.show_time >= startTime
      : true;
    const matchesEndTime =
    endTime 
      ? showtime.show_time <= endTime
      : true;
    const matchesMovie = selectedMovie ? showtime.movie_id === parseInt(selectedMovie) : true;

    return matchesCinema && matchesRoom && matchesDate && matchesStartTime && matchesEndTime && matchesMovie;
  });

  // const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);
  // const paginatedShowtimes = filteredShowtimes.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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

  const calculateDateTime =(date, time)=>{
    return new Date(`${date}T${time}`);
  }

  // Hàm lấy các suất chiếu đã phân trang cho từng rạp
  const getCinemaShowtimes = () => {
    const sortedShowtimes = filteredShowtimes
      .slice()
      .sort((a, b) => {
        // So sánh rạp chiếu trước
        if (a.cinema_id !== b.cinema_id) {
          return a.cinema_id - b.cinema_id;
        }
  
        // Nếu cùng rạp, so sánh phòng chiếu
        if (a.screeningroom_id !== b.screeningroom_id) {
          return a.screeningroom_id - b.screeningroom_id;
        }
  
        // Nếu cùng phòng, so sánh thời gian chiếu
        return calculateDateTime(a.show_date, a.show_time) - calculateDateTime(b.show_date, b.show_time);
      });
    return sortedShowtimes
  };
  const sortedShowtimes = getCinemaShowtimes();
  console.log("sortedShowtimes: ", sortedShowtimes)
  const totalPages = Math.ceil(sortedShowtimes.length / itemsPerPage);
  const paginatedShowtimes = sortedShowtimes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            {cinemaData.map((cinema) => (
              <option key={cinema.cinema_id} value={cinema.cinema_id}>
                {cinema.cinema_name}
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
            {console.log("ahihi: ",screeningRooms.filter(room=>room.cinema_id===parseInt(filters.cinema)))}
            {screeningRooms.filter(room=>room.cinema_id===parseInt(filters.cinema))
            // cinemaRooms[filters.cinema]?
            .map((room) => (
              <option key={room.screeningroom_id} value={room.screeningroom_id}>
                Screen {room.room_number}
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
            {movieData.map((movie) => (
              <option key={movie.movie_id} value={movie.movie_id}>
                {movie.movie_name}
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
            <th>Phòng chiếu</th>
            <th>Ngày chiếu</th>
            <th>Giờ chiếu</th>
            <th>Thời lượng(phút)</th>
          </tr>
        </thead>
        <tbody>
          {console.log("paginatedShowtimes: ",paginatedShowtimes)}
          {paginatedShowtimes.map((showtime, index) => (
            <tr key={showtime.showtime_id}>
              <td>{index+1}</td>
              <td>{movieData.find(movie=>movie.movie_id===showtime.movie_id).movie_name}</td>
              <td>{cinemaData.find((cinema) => cinema.cinema_id === showtime.cinema_id)?.cinema_name}</td>
              <td>
                Screen {screeningRooms.find(
                  (room) =>
                    room.cinema_id === showtime.cinema_id &&
                    room.screeningroom_id === showtime.screeningroom_id
                )?.room_number || "Not Found"}
              </td>
              <td>{showtime.show_date}</td>
              <td>{showtime.show_time}</td>
              <td>{movieData.find((movie) => movie.movie_id === showtime.movie_id).duration|| "N/A"}</td>
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
