import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../../FileCSS/MovieCollectionPage/Navbar.module.css';
// import Notification from '../Notification/Notification'; 
let dates = Array.from({ length: 31 }, (_, i) => i + 1);
let months = Array.from({ length: 12 }, (_, i) => i + 1);
let years = [2024, 2025];

function Navbar({ movieData, onFilterChange, onResetFilter, onSetNotification, confirmReset}) {
  const [filters, setFilters] = useState({
    movie_name: "",
    category: "",
    start_day: '',
    start_month: '',
    start_year: '',
  });

  // Hàm lọc phim dựa trên các filter
  const filteredMovies = movieData.filter((item) => {
    const {
      movie_name: inputMovieName,
      category: selectedCategory,
      // start_date: inputStart_date,
      start_day: inputStart_day,
      start_month: inputStart_month,
      start_year: inputStart_year,
    } = filters;

    const matchesMovieName = inputMovieName ? item.movie_name.toLowerCase().includes(inputMovieName.toLowerCase()) : true;
    const matchesCategory = selectedCategory ? item.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
    const matchesYear = inputStart_year ? new Date(item.start_date).getFullYear() === parseInt(inputStart_year) : true;
    // const matchesMonth = inputStart_month ? new Date(item.start_date).getMonth() === parseInt(inputStart_month) : true;
    const matchesMonth = inputStart_month ? new Date(item.start_date).getMonth() + 1 === parseInt(inputStart_month): true;
    const matchesDay = inputStart_day ? new Date(item.start_date).getDate() === parseInt(inputStart_day) : true;

    return matchesMovieName && matchesCategory&& matchesYear && matchesMonth&& matchesDay;
  });

  // Xử lý thay đổi filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Tạo danh sách các thể loại duy nhất
  const categories = movieData.flatMap(item => item.category.split(", "));
  const uniqueCategories = [...new Set(categories)];

  useEffect(() => {
    onFilterChange(filteredMovies);
  }, [filteredMovies]);
  
  useEffect(()=>{
    if(confirmReset){
      setFilters({ 
        movie_name: "",
        category: "",
        start_day: '',
        start_month: '',
        start_year: '',
      });
    }
  },[confirmReset])

  return (
    <div className={styles.container}>
      <div className={styles.icon}></div>

      {/* Phần tìm kiếm tên phim */}
      <div className={styles.findMovie}>
        <input
          type="text"
          className={styles.input}
          placeholder="Nhập tên phim"
          value={filters.movie_name}
          onChange={handleFilterChange}
          name="movie_name"
        />
        <button className={styles.confirm} onClick={() =>onResetFilter(movieData)}>Reset</button>
      </div>

      {/* Phần Bộ lọc */}
      <div className={styles.categoryContainer}>
        <div className={styles.filter}>Bộ lọc</div>

        {/* Lọc theo thể loại */}
        <div className={styles.content}>
          <div className={styles.labelContainer}>
            <div className={styles.label}>Thể loại</div>
          </div>
          <div className={styles.categoriesCollection}>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className={styles.itemSelection}
            >
              <option value="">-- --</option>
              {uniqueCategories?.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Lọc theo năm phát hành */}
        <div className={styles.content}>
            <div className={styles.labelContainer}>
                <div className={styles.label}>Ngày chiếu</div>
            </div>
            <div className={styles.dateTime}>
                <div className={styles.itemContainer}>
                    <label className={styles.itemLabel}>Ngày: </label>
                    <select className={styles.itemSelection} name="start_day" value={filters.start_day} onChange={handleFilterChange}>
                      <option value="">-- --</option>
                      {dates.map((day) => <option key={day}>{day}</option>)}
                    </select>
                </div>
                <div className={styles.itemContainer}>
                    <label className={styles.itemLabel}>Tháng: </label>
                    <select className={styles.itemSelection} 
                    name="start_month" value={filters.start_month} onChange={handleFilterChange}>
                      <option value="">-- --</option>
                      {months.map((month) => <option key={month}>{month}</option>)}
                    </select>
                </div>
                <div className={styles.itemContainer}>
                    <label className={styles.itemLabel}>Năm: </label>
                    <select className={styles.itemSelection} name="start_year" value={filters.start_year} onChange={handleFilterChange}>
                      <option value="">-- --</option>
                      {years.map((year) => <option key={year}>{year}</option>)}
                    </select>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
