import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu từ server JSON giả lập
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
        if (response.ok) {
          const data = await response.json();
          setMovies(data); // Gán dữ liệu vào trạng thái
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/movies/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Xóa thành công, cập nhật lại danh sách phim
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== id)
          );
          alert("Xóa phim thành công!");
        } else {
          alert("Xóa phim thất bại. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa phim:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div>
      <h1>Danh sách phim</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Thời gian</th>
            <th>Ngày phát hành</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.duration}</td>
              <td>{movie.releaseDate}</td>
              <td>
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{ width: 100, height: 150 }}
                />
              </td>
              <td>
                <Link
                  to={`/admin/EditMovie/${movie.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Sửa
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(movie.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MovieList;
