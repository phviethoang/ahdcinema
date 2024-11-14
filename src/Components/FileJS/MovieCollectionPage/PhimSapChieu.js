import React from "react";
import "../../FileCSS/MovieCollectionPage/PhimSapChieu.css"; // Tạo file CSS cho style của bạn
import { Link } from "react-router-dom";
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

  return (
    <div className="container">
      {/* <div class="dropdown">
        <button class="dropdown-button">Phim</button>
        <div class="dropdown-content">
          <Link to="/PhimDangChieu">Phim Đang Chiếu</Link>
          <Link to="/PhimSapChieu">Phim Sắp Chiếu</Link>
        </div>
      </div> */}

      <div class="sidebar">
        <button class="back-button">←</button>
        <input type="text" className="search-box" placeholder="Tìm kiếm..." />

        <button class="sidebar-item">Thể loại</button>
        <button class="sidebar-item">Ngày khởi chiếu</button>
        <button class="sidebar-item">Trailer</button>
        <button class="sidebar-item">Phim có ưu đãi</button>

        <button class="more-options">...</button>
      </div>

      {/* <div class="dropdown">
        <button class="dropdown-button">Phim</button>
        <div class="dropdown-content">
          <Link to="/PhimDangChieu">Phim Đang Chiếu</Link>
          <Link to="/PhimSapChieu">Phim Sắp Chiếu</Link>
        </div>
      </div> */}
      <div class="content">
        <div class="buttons-container">
          <Link to="/PhimDangChieu">
            <button className="buttons">PHIM ĐANG CHIẾU</button>
          </Link>
          <Link to="/PhimSapChieu">
            <button className="buttons">PHIM SẮP CHIẾU</button>
          </Link>
        </div>

        <div className="movies-section">
          {movies.map((movie, index) => (
            <div key={index} className="movie">
              <img src={movie.image} alt={movie.title} />
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
              {/* // <button>MUA VÉ</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhimSapChieu;