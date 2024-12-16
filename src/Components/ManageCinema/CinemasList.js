import React, { useState, useEffect } from "react";
import styles from "./CinemasList.module.css"; 
import Notification from '../Notification/Notification'; 
import AddCinemas from "./AddCinemas"; 
import {isEqual} from '../../utils/isEqual'


import cinema1 from "./cinemaImage/cinema1.png"; 
import cinema2 from "./cinemaImage/cinema2.png"; 
import cinema3 from "./cinemaImage/cinema3.png"; 
import cinema4 from "./cinemaImage/cinema3.png"; 

// cinema_id serial primary key,
// 	cinema_name varchar(100),
// 	address text,
// 	cinema_image varchar(255),
// 	city_id int references City(city_id)

const CinemasList = () => {

    const [cityData, setCityData]=useState([
      {city_id:1, city_name:"Hồ Chí Minh"},
      {city_id:2, city_name:"Hà Nội"},
      {city_id:3, city_name:"Hải Phòng"},
      {city_id:4, city_name:"Đà Nẵng"},
      {city_id:5, city_name:"Cần Thơ"},
    ])

  const [cinemaData, setCinemaData] = useState([
    {
      cinema_id: 1,
      cinema_name: "Cinemax 1",
      address: "123 Đường ABC, Quận 1",
      city_id: 1,
      // images: [cinema1, cinema2, cinema3, cinema4],
      cinema_image: cinema1,
    },
    {
      cinema_id: 2,
      cinema_name: "Galaxy Cinema",
      address: "456 Đường XYZ, Quận 3",
      city_id: 2,
      // images: cinema2,
      cinema_image: cinema2,
    },
    {
      cinema_id: 3,
      cinema_name: "Lotte Cinema",
      address: "789 Đường LMN, Quận 5",
      city_id: 4,
      // images: cinema3,
      cinema_image: cinema3,
    },
    {
      cinema_id: 4,
      cinema_name: "Cinemax 2",
      address: "123 Đường ABCZ, Quận 5",
      city_id: 5,
      // images: [cinema1, cinema2, cinema3],
      cinema_image: cinema4,
      },
    // Thêm các rạp khác ở đây...
  ]);

  const [notification, setNotification] = useState(null);

  const [editingCinema, setEditingCinema] = useState(null);

  const handleEdit = (cinema) => {
    setEditingCinema(cinema);
  };


  const handleSave = (updatedCinema) => {
    const cinemaBeforeUpdate = cinemaData.find((cinema) => cinema.cinema_id === updatedCinema.cinema_id);
    if (isEqual(cinemaBeforeUpdate, updatedCinema)) {
        // Nếu không có sự thay đổi, thông báo lỗi
        setNotification({ message: "Không có sự thay đổi nào trong rạp.", type: "error" });
        return;
    }
    else{
    setCinemaData((prevData) =>
        prevData.map((cinema) =>
        cinema.cinema_id === updatedCinema.cinema_id ? updatedCinema : cinema
      )
    );
    setEditingCinema(null);
    setNotification({ message: "Cập nhật rạp thành công", type: "success" });
    // đưa cinemaData lên csdl
    }
  };

  const handleDelete = (cinemaId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa rạp này không?");
    if (confirmed) {
      setCinemaData((prevData) => prevData.filter((cinema) => cinema.cinema_id !== cinemaId));
      setNotification({ message: "Xóa rạp thành công", type: "success" });
    }
  };
  const navigateToManageScreeningRooms = (cinemaId) => {
    window.location.href = `/manage-screening-rooms?cinemaId=${cinemaId}`;
  };


  const [filters, setFilters] = useState({
    cinema_name: "",
    city_id: ""
  });

  const filteredCinemas = cinemaData.filter((item) => {
    const {
      cinema_name: inputCinemaName,
      city_id: selectedCity
    } = filters;

    const matchesCinemaName = inputCinemaName ? item.cinema_name.toLowerCase().includes(inputCinemaName.toLowerCase()) : true;
    // const matchesCity = selectedCity ? item.city_id.toLowerCase().includes(selectedCity.toLowerCase()) : true;
    const matchesCity = selectedCity ? item.city_id=== parseInt(selectedCity) : true;
    return matchesCinemaName && matchesCity;
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
        cinema_name: "",
        city_id: ""
      });
      setNotification({ message: "Đặt lại tìm kiếm thành công!", type: "success" });
    }
  };
  // const citys = cityData.flatMap(item => item.city_id);
  const citys = cityData.flatMap(item => item.city_name);
  // const uniqueCitys = [...new Set(citys)];


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng rạp mỗi trang

  const totalPages = Math.ceil( filteredCinemas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCinemas = filteredCinemas.slice(startIndex, startIndex + itemsPerPage);

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
  return (
    <div className={styles.tableContainer}>
      <Notification
        message={notification?.message} // Tránh lỗi khi notification là null
        type={notification?.type} // Tránh lỗi khi notification là null
        onClose={() => setNotification(null)}
      />
      {editingCinema && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AddCinemas
              initialData={editingCinema}
              onSave={handleSave}
              onCancel={() => setEditingCinema(null)}
            />
          </div>
        </div>
      )}
      <div className={styles.adminTitle}>Danh sách rạp chiếu phim</div>
      <div className={styles.formRow}>
        <div className={styles.itemFormGroup}>
        <label htmlFor="cinema_name">Nhập tên rạp:</label>
            <input
              type="text"
              id="cinema_name"
              name="cinema_name"
              value={filters.cinema_name}
              onChange={handleFilterChange}
              placeholder="Nhập tên rạp"
            />
        </div>

        <div className={styles.itemFormGroup}>
          <label>Chọn thành phố</label>
          <select
            name="city_id"
            value={filters.city_id}
            onChange={handleFilterChange}
          >
            <option value="">-- Chọn thành phố --</option>
            {cityData?.map((city) => (
              <option key={city.city_id} value={city.city_id} >
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className ={styles.marginResetButton}>
        <button className={styles.resetButton} onClick={handleResetFilters}>
            Đặt lại tìm kiếm
          </button>
      </div>
      <table className={styles.cinemaTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên rạp</th>
            <th>Ảnh</th>
            <th>Địa chỉ</th>
            <th>Thành phố</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
            {currentCinemas.map((cinema,index) => (
                <tr key={cinema.id}>
                {/* <td>{cinema.id}</td> */}
                <td>{index+1}</td>
                <td>{cinema.cinema_name}</td>
                <td>
                  <img
                    src={cinema.cinema_image}
                    alt={`cinema-${cinema.cinema_name}`}
                    className={styles.cinemaImage}
                  />
                    {/* {cinema.cinema_image.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`cinema-${cinema.id}-image-${index}`}
                        className={styles.cinemaImage}
                    />
                    ))} */}
                </td>
                <td>{cinema.address}</td>
                <td>{cityData.find(city => city.city_id === cinema.city_id)?.city_name }</td>
                  <td>
                    <div className={styles.editnDeleteButton}>
                      <button
                      onClick={() => handleEdit(cinema)}
                      className={styles.editButton}
                      >
                      Sửa
                      </button>
                      <button
                      onClick={() => navigateToManageScreeningRooms(cinema.cinema_id)}
                      className={styles.manageButton}
                      >
                      Quản lý <br></br>
                      phòng chiếu
                      </button>
                      <button
                      onClick={() => handleDelete(cinema.cinema_id)}
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

export default CinemasList;
