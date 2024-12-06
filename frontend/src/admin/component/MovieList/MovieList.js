import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu giả từ API hoặc mock data
    const fetchMovies = async () => {
      const data = [
        { id: 1, title: "Avengers: Endgame", releaseDate: "2019" },
        { id: 2, title: "The Batman", releaseDate: "2022" },
      ];
      setMovies(data); // Gán dữ liệu vào trạng thái
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (confirmed) {
      try {
        // Gọi API để xóa (API giả)

        const response = await fetch(`/api/movies/${id}`, {
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
            <th>Ngày phát hành</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.releaseDate}</td>
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
