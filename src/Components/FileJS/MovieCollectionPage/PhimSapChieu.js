import React, { useEffect } from "react";
import styles from "../../FileCSS/MovieCollectionPage/PhimSapChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import Header from '../header'
import Footer from '../footer'
import clsx from "clsx";
import { useState, useRef } from "react";
import Navbar from "./Navbar";
const PhimSapChieu = () => {
  // Mô phỏng danh sách phim đang chiếu
  const movies = [
    {
      title: "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH",
      genre: "Tình cảm",
      duration: "135 phút",
      releaseDate: "01-11-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/m/a/main_social.jpg",
    },
    {
      title: "VENOM: KÈO CUỐI",
      genre: "Hành Động, Khoa Học Viễn Tưởng, Phiêu Lưu, Thần thoại",
      duration: "",
      releaseDate: "25-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/3/5/350x495_6_.jpg",
    },
    {
      title: "TRÒ CHƠI NHÂN TÍNH",
      genre: "Hồi hộp, Kinh Dị",
      duration: "",
      releaseDate: "25-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/0/406x600-exit.jpg",
    },
    {
      title: "ÁC QUỶ TRUY HỒN",
      genre: "Hồi hộp, Kinh Dị",
      duration: "107 phút",
      releaseDate: "25-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_ac_quy_truy_hon_4_1_.jpg",
    },
    {
      title: "TÍN HIỆU CẦU CỨU",
      genre: "Bí ẩn, Hồi hộp",
      duration: "103 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_tin_hieu_cau_cuu_1.jpg",
    },
    {
      title: "BÓNG ĐÁ NỮ VIỆT NAM, CHUYỆN LẦN ĐẦU KỂ",
      genre: "Phim tài liệu",
      duration: "75 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/0/406x600px-vn.jpg",
    },
    {
      title: "BOCCHI THE ROCK! Recap Part 2",
      genre: "Hoạt Hình",
      duration: "75 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/3/5/350x495-bocchi-p2.jpg",
    },
    {
      title: "AN LẠC",
      genre: "Tâm Lý",
      duration: "121 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/3/5/350x495-kankuang.jpg",
    },
    {
      title: "ĐỐ ANH CÒNG ĐƯỢC TÔI",
      genre: "Hài, Hành Động",
      duration: "118 phút",
      releaseDate: "27-09-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_exe_main-poster-v2.jpg",
    },
  ];

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
                <button className={styles.button1}>MUA VÉ</button>
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
