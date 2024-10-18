// import React from 'react';
// import styles from './cinemaList.module.css'; // CSS để tạo kiểu
// import AHDmovie1 from './movieImage/captain.png';
// import AHDmovie2 from './movieImage/infinityWar.png';
// import AHDmovie3 from './movieImage/ironMan.png';
// import AHDmovie4 from './movieImage/spiderman.png';
// import AHDmovie5 from './movieImage/blackPanther.png';

// export default function MovieList({ selectedDay }) {
//     const moviesByDays = {
//         0: [
//             { title: "Captain America: The Winter Soldier", poster: AHDmovie1, showtimes: ["10:00", "1:00", "7:00"] },
//             { title: "Avengers: Infinity War", poster: AHDmovie2, showtimes: ["11:00", "4:00", "9:00"] }
//         ],
//         1: [
//             { title: "Iron Man", poster: AHDmovie3, showtimes: ["12:00", "3:00", "8:00"] },
//             { title: "Spider-Man: No Way Home", poster: AHDmovie4, showtimes: ["2:00", "6:00"] }
//         ],
//         2: [
//             { title: "Black Panther", poster: AHDmovie5, showtimes: ["9:00", "11:00", "5:00"] }
//         ],
//         default: []
//     };

//     const calculateDayDiff = (selectedDate) => {
//         const today = new Date();
//         const selected = new Date(today.getFullYear(), selectedDate.monthIndex, selectedDate.Day);
//         const diffTime = selected - today;
//         return Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 5;
//     };

//     const dayDiff = calculateDayDiff(selectedDay);
//     const movies = moviesByDays[dayDiff] || moviesByDays.default;

//     return (
//         <div className={styles.movieList}>
//             <h3>Danh sách phim ngày {selectedDay.Month} {selectedDay.Day}:</h3>
//             {movies.length > 0 ? (
//                 <div className={styles.movieGrid}>
//                     {movies.map((movie, index) => (
//                         <div key={index} className={styles.movieItem}>
//                             <div className={styles.posterContainer}>
//                                 <h4>{movie.title}</h4>
//                                 <img src={movie.poster} alt={movie.title} className={styles.poster} />
//                             </div>
//                             <div className={styles.showtimeContainer}>
//                                 {movie.showtimes.map((time, timeIndex) => (
//                                     <div key={timeIndex} className={styles.showtimeBox}>
//                                         {time}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Không có phim nào.</p>
//             )}
//         </div>
//     );
// }









import React from 'react';
import styles from './cinemaList.module.css'; // CSS để tạo kiểu
import AHDmovie1 from './movieImage/captain.png';
import AHDmovie2 from './movieImage/infinityWar.png';
import AHDmovie3 from './movieImage/ironMan.png';
import AHDmovie4 from './movieImage/spiderman.png';
import AHDmovie5 from './movieImage/blackPanther.png';

export default function MovieList({ selectedDay }) {

    const moviesByDays = {
        0: [
            { title: "Captain America: The Winter Soldier", poster: AHDmovie1, showtimes: ["10:00 AM", "13:00 PM", "19:00 PM"] },
            { title: "Avengers: Infinity War", poster: AHDmovie2, showtimes: ["11:00 AM", "16:00 PM", "21:00 PM"] }
        ],
        1: [
            { title: "Iron Man", poster: AHDmovie3, showtimes: ["12:00 PM", "15:00 PM", "20:00 PM"] },
            { title: "Spider-Man: No Way Home", poster: AHDmovie4, showtimes: ["14:00 PM", "18:00 PM"] }
        ],
        2: [
            { title: "Black Panther", poster: AHDmovie5, showtimes: ["09:00 AM", "11:00 AM", "17:00 PM"] }
        ],
        default: []
    };

    const calculateDayDiff = (selectedDate) => {
        const today = new Date();
        const selected = new Date(today.getFullYear(), selectedDate.monthIndex, selectedDate.Day);
        const diffTime = selected - today;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 5;
    };

    const dayDiff = calculateDayDiff(selectedDay);
    const movies = moviesByDays[dayDiff] || moviesByDays.default;

    return (
        <div className={styles.movieList}>
            <h3>Danh sách phim ngày {selectedDay.Month} {selectedDay.Day}:</h3>
            {movies.length > 0 ? (
                <div className={styles.movieGrid}>
                    {movies.map((movie, index) => (
                        <div key={index} className={styles.movieItem}>
                            <h4 className={styles.movieTitle}>{movie.title}</h4>
                            <div className={styles.posterContainer}>
                                <img src={movie.poster} alt={movie.title} className={styles.poster} />
                                <div className={styles.showtimeContainer}>
                                    <h4 className={styles.subtitles}>2D Phụ Đề Anh & Việt</h4>
                                    {movie.showtimes.map((time, timeIndex) => (
                                        <div key={timeIndex} className={styles.showtimeBox}>
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không có phim nào.</p>
            )}
        </div>
    );
}
