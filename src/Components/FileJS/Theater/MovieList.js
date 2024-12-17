import React from 'react';
import styles from '../../FileCSS/Theater/cinemaList.module.css'; // CSS để tạo kiểu
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieList({ selectedDay, moviesInDay }) {

    const navigate = useNavigate()
    const movies = moviesInDay != null? moviesInDay.map((movie, index) => (
        <div key={index} className={styles.movieItem}>
            <img src={movie.poster} alt={movie.title} className={styles.poster} />
            <div className={styles.posterContainer}>
                <div className={styles.decor}></div>
                <div className={styles.showtimeContainer}>
                    <h4 className={styles.movieTitle}>{movie.title}</h4>
                    <h6 className={styles.subtitles}>2D Phụ Đề Anh & Việt</h6>
                    {movie.showtimes.map((timeAndRoom, timeIndex) => (
                        <div key={timeIndex} 
                        className={styles.showtimeBox}
                        onClick={()=>
                        {
                            navigate('/BuyTicket')
                            sessionStorage.setItem('nameFromTheaterPage', movie.title)
                            sessionStorage.setItem('imageFromTheaterPage', movie.poster)
                            sessionStorage.setItem('dateFromTheaterPage', JSON.parse(movie.show_date))
                            sessionStorage.setItem('timeFromTheaterPage', timeAndRoom.show_time)
                            sessionStorage.setItem('roomFromTheaterPage', timeAndRoom.room)
                            sessionStorage.setItem('roomIdFromTheaterPage', timeAndRoom.roomId)
                            sessionStorage.setItem('step2', 'thôi đi ngủ thôi')
                            sessionStorage.setItem('theaterFromTheaterPage', movie.theater)
                        }
                        }>
                            {timeAndRoom.show_time}
                        </div>
                    ))}
                </div>
                
                
            </div>
        </div>
    )): 'Không có phim nào để hiển thị'
    return (
        <div className={styles.movieList}>
            <h3>Danh sách phim ngày {selectedDay.Month} {selectedDay.Day}:</h3>
                <div className={styles.movieGrid}>
                    {movies}
                </div>
        </div>
    );
}
