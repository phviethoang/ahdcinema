

import styles from "../../FileCSS/MovieCollectionPage/PhimSapChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import Header from "../header";
import Footer from "../footer";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from '../Notification/Notitication'

const PhimSapChieu = () => {
  const navigate = useNavigate();
  
  // State để lưu danh sách phim sắp chiếu
  const [comingSoonMovie, setComingSoonMovie] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [headerShow, setHeaderShow] = useState(true);
  
  // Fetch danh sách phim sắp chiếu
  useEffect(() => {
    fetch('http://localhost:5000/ahd/coming-soon')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setComingSoonMovie(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  // Cập nhật movieData khi comingSoonMovie thay đổi
  // useEffect(() => {
  //   if (comingSoonMovie.length > 0) {
  //     setMovieData(comingSoonMovie);
  //   }
  // }, [comingSoonMovie]);


const convertToLocalTime = (dateString) => {
  const date = new Date(dateString);
  // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
  return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });
};
    useEffect(() => {
      if (comingSoonMovie?.length > 0) {
        const formattedMovies = comingSoonMovie.map((each) => ({
          movie_id: each.movie_id,
          movie_name: each.movie_name,
          category: each.category,
          duration: each.duration,
          start_date: convertToLocalTime(each.start_date),
          movie_image: each.movie_image,
        }));
        setMovieData(formattedMovies);
      }
    }, [comingSoonMovie]);

  // Quản lý sự kiện cuộn và hiển thị header
  const header = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHeaderShow(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (header.current) {
      observer.observe(header.current);
    }
    return () => {
      if (header.current) {
        observer.disconnect();
      }
    };
  }, []);
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
      <Header ref={header} />
      
      <div className={styles.container}>
        {/* <Notification 
            message={notification?.message}  // Tránh lỗi khi notification là null
            type={notification?.type}        // Tránh lỗi khi notification là null
            onClose={() => setNotification(null)} 
        /> */}
        <div className={styles.sidebar}>
        <Navbar movieData={movieData} onFilterChange={handleFilterMovieChange} onResetFilter={handleResetFilter} confirmReset={confirmReset}></Navbar>
        </div>

        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            <Link to="/PhimDangChieu">
              <button className={clsx(styles.buttons, styles.phimDangChieu)}>ĐANG CHIẾU</button>
            </Link>
            <Link to="/PhimSapChieu">
              <button className={clsx(styles.buttons, styles.phimSapChieu)}>SẮP CHIẾU</button>
            </Link>
          </div>

          <div className={styles.moviesSection}>
            {
              (filterMovies && filterMovies.length > 0 )&&filterMovies.map((movie, index) => (
                <div key={index} className={styles.movie}>
                  <img src={movie.movie_image} alt={movie.movie_name} />
                  <div className={styles.movieContent}>
                    <h3>{movie.movie_name}</h3>
                    <p>
                      <strong>Thể loại:</strong> {movie.category}
                    </p>
                    <p>
                      <strong>Thời lượng:</strong> {movie.duration}
                    </p>
                    <p>
                      <strong>Khởi chiếu:</strong> {movie.start_date}
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
      <Footer />
    </div>
  );
};

export default PhimSapChieu;

