import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    releaseDate: "",
    genre: "",
    duration: "",
    image: "",
  });

  // Lấy thông tin phim từ server khi trang được tải
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error("Không tìm thấy phim!");
        }
      } catch (error) {
        console.error("Lỗi khi tải phim:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        alert("Cập nhật phim thành công!");
        navigate("/admin/MovieList"); // Quay lại danh sách phim sau khi cập nhật thành công
      } else {
        alert("Cập nhật phim thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  return (
    <div>
      <h1>Sửa phim ID: {id}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tên phim
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Ngày phát hành
          </label>
          <input
            type="text"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Thể loại
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Thời gian
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={movie.duration}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Hình ảnh
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={movie.image}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
