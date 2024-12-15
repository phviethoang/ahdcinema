import React, { useState } from "react";
import AddMovie from "./AddMovies"; // Import form chỉnh sửa
import movie1 from "./movieImage/image1.jpg";
import movie2 from "./movieImage/image2.jpg";
import movie3 from "./movieImage/image3.jpg";
import movie4 from "./movieImage/image4.jpg";
import styles from "./MovieList.module.css"; // Import CSS module
import Notification from '../Notification/Notification'; 
import {isEqual} from '../../utils/isEqual';

// movie_id:"",
//     movie_name: "",
//     movie_image: "",
//     movie_poster:"",
//     director: "",
//     category: "",
//     actors: "",
//     start_date: "",
//     duration: "",
//     languages: "",
//     movie_label:"",
//     description: "",
//     trailer_link: "",

const MovieList = () => {
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
    
    // Thêm các phim khác ở đây...
  ]);


  const [notification, setNotification] = useState(null);


  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleSave = (updatedMovie) => {
    // Tìm phim cũ trong movieData
    const movieBeforeUpdate = movieData.find((movie) => movie.movie_id === updatedMovie.movie_id);
    // Kiểm tra xem phim có thay đổi không bằng cách sử dụng isEqual
    if (isEqual(movieBeforeUpdate, updatedMovie)) {
      // Nếu không có sự thay đổi, thông báo lỗi
      setNotification({ message: "Không có sự thay đổi nào trong phim.", type: "error" });
      return;
    }
    else{
      // Nếu có sự thay đổi, thực hiện cập nhật dữ liệu mới
      setMovieData((prevData) => {
        // Cập nhật lại movieData bằng cách tạo một mảng mới với phim đã cập nhật
        return prevData.map((movie) =>
          movie.movie_id === updatedMovie.movie_id ? { ...movie, ...updatedMovie } : movie
        );
      });

      setEditingMovie(null);
      setNotification({ message: "Cập nhật phim thành công", type: "success" });
    }
  };
  
  const handleDelete = (movieId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa phim này không?");
    if (confirmed) {
      setMovieData((prevData) => prevData.filter((movie) => movie.id !== movieId));
      setNotification({message:"Xóa phim thành công", type:"success"})
    }
  };


const categories = movieData.flatMap(item => item.category.split(", "));
const languages = movieData.flatMap(item => item.languages.split(", "));

const uniqueCategories = [...new Set(categories)];
const uniqueLanguages = [...new Set(languages)];


// các trường lọc
   const [filters, setFilters] = useState({
      movie_name: "",
      category: "",
      actors: "",
      director: "",
      start_date: "",
      languages: "",
      movie_label:"",
      // movieName: "",
      // category: "",
      // actors: "",
      // director: "",
      // start_date: "",
      // language:"",
    });
  
    const filteredMovies = movieData.filter((item) => {
      const {
        movie_name: inputMovieName,
        category: selectedCategory,
        actors: inputActors,
        director: inputDirector,
        start_date: inputStart_date,
        languages: selectedLanguage,
        movie_label: selectedMovieLabel,
      } = filters;
  
      const matchesMovieName = inputMovieName ? item.movie_name.toLowerCase().includes(inputMovieName.toLowerCase()) : true;
      const matchesActors = inputActors?item.actors.toLowerCase().includes(inputActors.toLowerCase()) : true;
      const matchesCategory = selectedCategory ? item.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
      const matchesDirector = inputDirector ? item.director.toLowerCase().includes(inputDirector.toLowerCase()) : true;
      const matchesDate = inputStart_date ? new Date(item.start_date).getFullYear() === parseInt(inputStart_date) : true;
      const matchesLanguage = selectedLanguage ? item.languages.toLowerCase().includes(selectedLanguage.toLowerCase()) : true;
      const matchesMovieLabel = selectedMovieLabel? item.movie_label=== selectedMovieLabel : true;
      return matchesMovieName && matchesActors && matchesDate && matchesCategory && matchesDirector&&matchesLanguage&&matchesMovieLabel;
    });

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
    const handleResetFilters = () => {
      if (window.confirm("Bạn có chắc chắn muốn đặt lại tất cả bộ lọc không?")) {
        setFilters({ 
          // movieName: "",
          // category: "",
          // actors: "",
          // director: "",
          // start_date: "",
          movie_name: "",
          category: "",
          actors: "",
          director: "",
          start_date: "",
          languages: "",
          movie_label:"",
        });
        setNotification({ message: "Đặt lại tìm kiếm thành công!", type: "success" });
      }
    };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng phim mỗi trang

  // Tính toán phim cần hiển thị trên trang hiện tại
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // const sortedMovies = [...filteredMovies].sort((a, b) => b.id - a.id);
  const currentMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [editingMovie, setEditingMovie] = useState(null);

  return (
    <div className={styles.tableContainer}>
      <Notification 
        message={notification?.message}  // Tránh lỗi khi notification là null
        type={notification?.type}        // Tránh lỗi khi notification là null
        onClose={() => setNotification(null)} 
      />
      {editingMovie && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AddMovie
              initialData={editingMovie}
              onSave={handleSave}
              onCancel={() => setEditingMovie(null)}
            />
          </div>
        </div>
      )}
      <div className={styles.adminTitle}>Danh sách phim</div>
      <div className={styles.formRow}>
        <div className={styles.itemFormGroup}>
        <label htmlFor="movie_name">Nhập tên phim:</label>
            <input
              type="text"
              id="movie_name"
              name="movie_name"
              value={filters.movie_name}
              onChange={handleFilterChange}
              placeholder='Nhập tên phim'
            />
        </div>

        <div className={styles.itemFormGroup}>
          <label>Chọn thể loại</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">-- Chọn thể loại --</option>
            {uniqueCategories?.map((category) => (
              <option >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.itemFormGroup}>
          <label>Chọn ngôn ngữ</label>
          <select
            name="languages"
            value={filters.languages}
            onChange={handleFilterChange}
          >
            <option value="">-- Chọn ngôn ngữ --</option>
            {uniqueLanguages?.map((language) => (
              <option >
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.itemFormGroup}>
        <label htmlFor="actors">Nhập tên diễn viên:</label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={filters.actors}
              onChange={handleFilterChange}
              placeholder='Nhập tên diễn viên'
            />
        </div>
        <div className={styles.itemFormGroup}>
        <label htmlFor="director">Nhập tên đạo diễn:</label>
            <input
              type="text"
              id="director"
              name="director"
              value={filters.director}
              onChange={handleFilterChange}
              placeholder='Nhập tên đạo diễn'
            />
        </div>
        <div className={styles.itemFormGroup}>
        <label htmlFor="start_date">Năm phát hành:</label>
            <input
              type="number"
              id="start_date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
              placeholder='Nhập năm phát hành'
            />
        </div>
      </div>
      <div className={styles.ok}>
        <button className={styles.resetButton} onClick={handleResetFilters}>
            Đặt lại tìm kiếm
        </button>
      </div>
      <table className={styles.movieTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên phim</th>
            <th>Ảnh</th>
            <th>Thời lượng</th>
            <th>Thể loại</th>
            <th>Diễn viên</th>
            <th>Đạo diễn</th>
            <th>Ngày phát hành</th>
            <th>Ngôn ngữ</th>
            <th>Trailer</th>
            <th>Nhãn phim</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentMovies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index+1}</td>
              <td>{movie.movie_name}</td>
              <td>
                <img
                  src={movie.movie_image}
                  alt={movie.movie_name}
                  className={styles.movieImage}
                />
              </td>
              <td>{movie.duration} phút</td>
              <td>{movie.category}</td>
              <td>{movie.actors}</td>
              <td>{movie.director}</td>
              <td>{movie.start_date}</td>
              <td>{movie.languages}</td>
              <td>
                <a
                  href={movie.trailer_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trailer
                </a>
              </td>
              <td>{movie.movie_label}</td>
              <td>
                <div className={styles.editnDeleteButton}>
                  <button
                    onClick={() => handleEdit(movie)}
                    className={styles.editButton}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className={styles.deleteButton}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>
    </div>
    
  );
};

export default MovieList;
