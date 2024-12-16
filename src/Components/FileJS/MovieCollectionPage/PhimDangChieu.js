import styles from "../../FileCSS/MovieCollectionPage/PhimDangChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Navbar from "./Navbar";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PhimDangChieu() {
  // const [showButton, setShowButton] = useState(null);

  // Mô phỏng danh sách phim đang chiếu

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
  // In ra các mảng kiểm tra
  const convertToLocalTime = (dateString) => {
          const date = new Date(dateString);
          // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
          return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });

      };
  const movies = nowShowingMovie.map( (each, id) =>
    {
      return {
      id: each.movie_id,
      title: each.movie_name,
      genre: each.category,
      duration: each.duration,
      releaseDate: convertToLocalTime(each.start_date),
      image: each.movie_image
    }})

  return (
    <div className={styles.pageContainer}>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Navbar></Navbar>
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
            {movies.map((movie, index) => (
              <div key={index} className={styles.movie}>
                <img src={movie.image} alt={movie.title} />
                <div className={styles.movieContent}>
                  <h3>{movie.title}</h3>
                  <p>
                    <strong>Thể loại:</strong> {movie.genre}
                  </p>
                  <p>
                    <strong>Thời lượng:</strong> {movie.duration}
                  </p>
                  <p>
                    <strong>Khởi chiếu:</strong> {movie.releaseDate}
                  </p>
                </div>
                <button 
                  className={styles.button1}
                  onClick={()=>{
                    sessionStorage.setItem('movie_id', JSON.stringify(movie.id))
                    sessionStorage.setItem('cardImgData',movie.image)
                    sessionStorage.setItem('movie_name', movie.title)
                    navigate('/BuyTicket')
                  }}
                >MUA VÉ</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default PhimDangChieu;
