import React, { useState } from "react";

const RevenueReport = () => {
  const [filter, setFilter] = useState({ type: "", value: "" });

  // Static revenue data
  const revenueData = [
    { movie: "Phim A", room: "Phòng 1", date: "2024-12-01", revenue: 5000 },
    { movie: "Phim B", room: "Phòng 2", date: "2024-12-02", revenue: 3000 },
    { movie: "Phim C", room: "Phòng 1", date: "2024-12-03", revenue: 4500 },
  ];

  // Static performance data
  const performanceData = [
    { movie: "Phim A", showtimes: 10, ticketsSold: 800, occupancy: 80 },
    { movie: "Phim B", showtimes: 5, ticketsSold: 400, occupancy: 60 },
    { movie: "Phim C", showtimes: 7, ticketsSold: 500, occupancy: 70 },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = (data) => {
    if (!filter.type || !filter.value) return data;
    return data.filter((item) =>
      item[filter.type]?.toString().includes(filter.value)
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Báo Cáo Doanh Thu và Hiệu Suất</h2>

      {/* Filter Section */}
      <div className="mb-4">
        <h4>Lọc Dữ Liệu</h4>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <select
              name="type"
              className="form-select"
              value={filter.type}
              onChange={handleFilterChange}
            >
              <option value="">Chọn Loại Lọc</option>
              <option value="movie">Phim</option>
              <option value="room">Phòng</option>
              <option value="date">Ngày</option>
            </select>
          </div>
          <div className="col-auto">
            <input
              type="text"
              name="value"
              className="form-control"
              placeholder="Nhập giá trị lọc"
              value={filter.value}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="mb-5">
        <h4>Báo Cáo Doanh Thu</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Phim</th>
              <th>Phòng</th>
              <th>Ngày</th>
              <th>Doanh Thu</th>
            </tr>
          </thead>
          <tbody>
            {applyFilter(revenueData).map((item, index) => (
              <tr key={index}>
                <td>{item.movie}</td>
                <td>{item.room}</td>
                <td>{item.date}</td>
                <td>${item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Section */}
      <div>
        <h4>Báo Cáo Hiệu Suất</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Phim</th>
              <th>Số Suất Chiếu</th>
              <th>Vé Bán Ra</th>
              <th>Tỉ Lệ Lấp Đầy Phòng Chiếu Trung Bình</th>
            </tr>
          </thead>
          <tbody>
            {applyFilter(performanceData).map((item, index) => (
              <tr key={index}>
                <td>{item.movie}</td>
                <td>{item.showtimes}</td>
                <td>{item.ticketsSold}</td>
                <td>{item.occupancy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueReport;
