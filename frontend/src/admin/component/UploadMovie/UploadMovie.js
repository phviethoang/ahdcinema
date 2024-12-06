import React, { useState } from "react";

const UploadMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    duration: "",
    releaseDate: "",
    genre: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleFileChange = (e) => {
    setMovieData({ ...movieData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Bạn có thể xử lý gửi dữ liệu ở đây
    console.log("Uploaded movie data:", movieData);

    // Xử lý gửi API hoặc lưu vào database
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Upload Movie</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên phim */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mô tả phim */}
        <div className="mb-3">
          <label htmlFor="Duration" className="form-label">
            Duration
          </label>
          <input
            type="text"
            id="Duration"
            name="Duration"
            className="form-control"
            value={movieData.duration}
            onChange={handleChange}
            required
          ></input>
        </div>

        {/* Ngày phát hành */}
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="form-control"
            value={movieData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Thể loại */}
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="form-control"
            value={movieData.genre}
            onChange={handleChange}
            required
          />
        </div>

        {/* File tải lên */}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Upload File (Image/Video)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Nút gửi */}
        <button type="submit" className="btn btn-primary">
          Upload Movie
        </button>
      </form>
    </div>
  );
};

export default UploadMovie;
