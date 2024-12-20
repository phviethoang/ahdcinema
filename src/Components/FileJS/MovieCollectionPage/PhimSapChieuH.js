import React, { useEffect } from "react";
import styles from "../../FileCSS/MovieCollectionPage/PhimSapChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import Header from '../header'
import Footer from '../footer'
import clsx from "clsx";
import { useState, useRef} from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PhimSapChieu = () => {
  // Mô phỏng danh sách phim đang chiếu
    //Khai báo các mảng sẽ chứa dữ liệu fetch về
    const navigate = useNavigate();
    const [comingSoonMovie, setComingSoonMovie]= useState([])
    // Fetch movie
    useEffect(() => {
      fetch('http://localhost:5000/ahd/coming-soon')
          .then(response => {
              console.log("Response status:", response.status);
              return response.text(); // Kiểm tra nội dung raw response
          })
          .then(text => {
              console.log("Raw response:", text); // In ra để kiểm tra
              return JSON.parse(text); // Chuyển thành JSON
          })
          .then(data => setComingSoonMovie(data))
          .catch(error => console.error('Error:', error));
  }, []);
    //END FETCH DATA
    const convertToLocalTime = (dateString) => {
      const date = new Date(dateString);
      // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
      return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });

  };
  const movies = comingSoonMovie.map( (each, id) =>
  {
    return {
    id: each.movie_id,
    title: each.movie_name,
    genre: each.category,
    duration: each.duration,
    releaseDate: convertToLocalTime(each.start_date),
    image: each.movie_image
  }})

  const [headerShow, setHeaderShow] = useState(true)
  const header = useRef(null)
  useEffect(()=>{
    const observer = new IntersectionObserver(
    (entry) =>
    {
      if(!entry.isIntesecting)
      {
        setHeaderShow(false)
      }
      else setHeaderShow(true)
    })
   observer.observe(header.current)
  })
  return (
    <div className={styles.pageContainer}>
      <Header ref = {header}></Header>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Navbar></Navbar>
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
                <button className={styles.button1}
                  onClick={()=>{
                    sessionStorage.setItem('movie_id', JSON.stringify(movie.id))
                    navigate('/BuyTicket')
                  }}>MUA VÉ</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PhimSapChieu;
