import styles from "../../FileCSS/MovieCollectionPage/PhimDangChieu.module.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Navbar from "./Navbar";
import clsx from "clsx";

function PhimDangChieu() {
  // const [showButton, setShowButton] = useState(null);

  // Mô phỏng danh sách phim đang chiếu
  const movies = [
    {
      title: "Tee Yod: Quỷ Ẩn Tạng Phần 2",
      genre: "Kinh Dị",
      duration: "111 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_ty2-main-poster-printing.jpg",
    },
    {
      title: "Cô Dâu Hào Môn",
      genre: "Tâm Lý",
      duration: "114 phút",
      releaseDate: "18-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/c/g/cgv_457x590.jpg",
    },
    {
      title: "Robot Hoang Dã",
      genre: "Gia đình, Hoạt Hình, Khoa Học Viễn Tưởng, Phiêu Lưu",
      duration: "102 phút",
      releaseDate: "11-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/w/r/wrb_intl1sht_headtouch4_rgb_700x1000.jpg",
    },
    {
      title: "Joker: Folie à Deux",
      genre: "Hồi hộp, Nhạc kịch, Tâm Lý, Tội phạm",
      duration: "138 phút",
      releaseDate: "04-10-2024",
      image:
        "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/r/s/rsz_poster_payoff_joker_folie_a_deux_5_1_.jpg",
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
                <button className={styles.button1}>MUA VÉ</button>
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
