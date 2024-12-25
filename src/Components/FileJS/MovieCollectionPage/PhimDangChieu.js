import styles from "../../FileCSS/MovieCollectionPage/PhimDangChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from '../Notification/Notitication'
function PhimDangChieu() {

  const navigate = useNavigate();
  const [nowShowingMovie, setNowShowingMovie]= useState([])

  // Fetch movie
  useEffect(()=>{
      fetch('http://localhost:5000/ahd/now-showing')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); 
  })
  .then(data => {
      setNowShowingMovie(data);
  })
  .catch(error => console.error('Error:', error));
  },[])

  const convertToLocalTime = (dateString) => {
          const date = new Date(dateString);
          // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
          return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });

  };

  

//lọc phim
const [filterMovies,setFilterMovies]=useState(null)
const handleFilterMovieChange=(movieList)=>{
  setFilterMovies(movieList)
}
const [notification, setNotification] = useState(null);
const [confirmReset,setConfirmReset]=useState(false)


const handleResetFilter = (movieList) => {
  // if (!confirmReset && window.confirm("Bạn có chắc chắn muốn đặt lại tất cả bộ lọc không?")) {
    setConfirmReset(!confirmReset); 
    setFilterMovies(movieList);
    // setNotification({ message: "Đặt lại bộ lọc thành công!", type: "success" });
  // }
  // else {
  //   setConfirmReset(false)
  // }
};



  return (
    <div className={styles.pageContainer}>
      <Header></Header>
      <div className={styles.container}>
        <Notification 
          message={notification?.message}  // Tránh lỗi khi notification là null
          type={notification?.type}        // Tránh lỗi khi notification là null
          onClose={() => setNotification(null)} 
        />
        <div className={styles.sidebar}>
          <Navbar movieData={nowShowingMovie} onFilterChange={handleFilterMovieChange} onResetFilter={handleResetFilter} confirmReset={confirmReset}></Navbar>
        </div>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
              <Link to="/PhimDangChieu">
              <div className={styles.buttonCover}>
                  <div className={styles.buttonDecor}></div>
                  <button className={clsx(styles.buttons, styles.phimDangChieu)}>ĐANG CHIẾU</button>

              </div>
              </Link>
              <Link to="/PhimSapChieu">
              <div className={styles.buttonCover}>
                  <div className={styles.buttonDecor}></div>
                  <button className={clsx(styles.buttons, styles.phimSapChieu)}>SẮP CHIẾU</button>
                  </div>

              </Link>
            
          </div>

          <div className={styles.moviesSection}>
            {
              (filterMovies && filterMovies.length > 0 )&&filterMovies.map((movie, index) => (
                <div key={index} className={styles.movie}>
                  <img 
                    onClick={()=>{
                      sessionStorage.setItem('movieInfo', JSON.stringify(movie))
                      navigate('/MoviePage')
                    }}
                    src={movie.movie_image} 
                    alt={movie.movie_name} />
                  <div className={styles.movieContent}>
                    <h3>{movie.movie_name}</h3>
                    <p>
                      <strong>Thể loại:</strong> {movie.category}
                    </p>
                    <p>
                      <strong>Thời lượng:</strong> {movie.duration}
                    </p>
                    <p>
                      <strong>Khởi chiếu:</strong> {convertToLocalTime(movie.start_date)}
                    </p>
                  </div>
                  <button 
                    className={styles.button1}
                    onClick={() => {
                      sessionStorage.setItem('movie_id', JSON.stringify(movie.movie_id));
                      sessionStorage.setItem('cardImgData', movie.movie_image);
                      sessionStorage.setItem('movie_name', movie.movie_name);
                      navigate('/BuyTicket');
                    }}
                  >
                    MUA VÉ
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PhimDangChieu;
