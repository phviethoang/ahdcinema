import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "Avengers: Endgame", // Dữ liệu giả
    releaseDate: "2019",
  });

  const handleInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cập nhật phim:", movie);
    // Gọi API cập nhật phim
    navigate("/admin/MovieList");
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
        <button type="submit" className="btn btn-success">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
