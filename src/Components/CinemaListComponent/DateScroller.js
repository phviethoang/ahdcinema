import React, { useState, useEffect } from 'react';
import styles from "./cinemaList.module.css"; // Nhập file CSS để tạo kiểu
// MovieList
import MovieList from "./MovieList"
export default function DateScroller() {
    // Danh sách các ngày
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null); // Trạng thái cho ngày được chọn
    // Hàm để lấy 30 ngày tiếp theo
    const getNext30Days = () => {
        const days = [];
        const today = new Date();
        const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
                        "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const Day = date.getDate(); // Ngày trong tháng (1-31)
            const Dweek = weekdays[date.getDay()]; // Lấy tên thứ
            const monthIndex= date.getMonth();  // Dùng để tính khoảng cách ngày
            const Month = months[date.getMonth()];
            days.push({ Day, Dweek, Month,monthIndex });
        }

        return days;
    };
    const next30Days = getNext30Days();
    // Sử dụng useEffect để đặt mặc định ngày đầu tiên

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, next30Days.length - 1));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day); // Cập nhật ngày được chọn
    };

    // Chỉ chọn ngày đầu tiên khi chưa có ngày nào được chọn
    useEffect(() => {
        if (!selectedDay) {
            setSelectedDay(next30Days[0]);
        }
    }, [next30Days, selectedDay]);

    return (
        <div>
        <div className={styles.dateScroller}>
            <button  className={styles.buttonLeft} onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
            <div className={styles.days} >
                {next30Days.slice(currentIndex, currentIndex + 5).map((day, index) => (
                    <div key={index} className={`${styles.dayBlock} ${selectedDay && selectedDay.Day === day.Day ? styles.selected : ''}`}
                    onClick={() => handleDayClick(day)}>
                        <div className={styles.monthAndDweek}>
                            {day.Month}<br/>
                            {day.Dweek}
                        </div>
                        <div className={styles.Day} >
                            {day.Day}
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.buttonRight} onClick={handleNext} disabled={currentIndex === next30Days.length - 5}>&gt;</button>
        </div>

        {/* Hiển thị thêm thông tin nếu có ngày được chọn */}
        {selectedDay && <MovieList selectedDay={selectedDay} />}
        
    </div>
    );
};
