import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo Bootstrap đã được import
import styles from './cinemaList.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import AHDtheaterImg1 from './theaterImage/AHDtheater-1.png';
import AHDtheaterImg2 from './theaterImage/AHDtheater-2.png';
import AHDtheaterImg3 from './theaterImage/AHDtheater-3.png';
import AHDtheaterImg4 from './theaterImage/AHDtheater-4.png';

function TheaterDetail() {
  useEffect(() => {
    // Khởi tạo lại Bootstrap nếu cần thiết
    const carousel = document.querySelector('#carouselExampleCaptions');
    if (carousel) {
      new window.bootstrap.Carousel(carousel);
    }
  }, []);

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <button className={styles.carouselControlPrev} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={styles.fullSlide}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={AHDtheaterImg1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={AHDtheaterImg2} className="d-block w-100" alt="Slide 2" />
 
          </div>
          <div className="carousel-item">
            <img src={AHDtheaterImg3} className="d-block w-100" alt="Slide 3" />

          </div>
          <div className="carousel-item">
            <img src={AHDtheaterImg4} className="d-block w-100" alt="Slide 4" />
          </div>
        </div>
      </div>
      <button className={styles.carouselControlNext} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export default TheaterDetail;
