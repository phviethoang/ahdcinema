import React, { useState } from "react";
import styles from "../EventSlider/EventSlider.module.css"; // Optional nếu bạn muốn thêm CSS riêng
const EventSlider = () => {
  const events = [
    {
      id: 1,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/z/5/z5701320082303_bd9cb127e9cd0652329054662900294e.jpg",
    },
    {
      id: 2,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/z/5/z5701320082202_20fbb5c8a2f2747f89d1c95f6b541f57.jpg",
    },
    {
      id: 3,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/i/birthday_popcorn_box_240x201.png",
    },
    {
      id: 4,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_3_2.png",
    },
    {
      id: 5,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2024_sep_u22_240x201_1.jpg",
    },
    {
      id: 6,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_3_2.png",
    },
    // Add more events as needed
  ];
  const events2 = [
    {
      id: 1,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-240x201-_1.png",
    },
    {
      id: 2,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201px_10.png",
    },
    {
      id: 3,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/m/s/msb_cgv_240x201-01_1.png",
    },
    {
      id: 4,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-cinema-promotion_240x201px_new_1.jpg",
    },
    {
      id: 5,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_2__3.png",
    },
    {
      id: 6,
      imageUrl:
        "https://iguov8nhvyobj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_2__3.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEventPageOne, setIsEventPageOne] = useState(true);

  const handleNext = () => {
    if (currentIndex < events.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const currentEvents = isEventPageOne ? events : events2;
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sliderContainer}>
        <div className={styles.eventHeader}>
          <img
            className={styles.evHead}
            src={`${process.env.PUBLIC_URL}/1000_F_137966486_rcnHbWzmSIIjtlifH5xJ8qyBcIlrquCX.jpg`}
            alt="ảnh event"
          />
        </div>
        <div className={styles.button1}>
          <button
            className={styles.buttons}
            onClick={() => setIsEventPageOne(true)}
          >
            Thành viên
          </button>
          <button
            className={styles.buttons}
            onClick={() => setIsEventPageOne(false)}
          >
            Tin mới và ưu đãi
          </button>
        </div>
        <div className={styles.eventBody}>
          <button onClick={handlePrev} className={styles.navButton}>
            ‹
          </button>
          <div className={styles.slider}>
            {currentEvents
              .slice(currentIndex, currentIndex + 4)
              .map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <img src={event.imageUrl} alt={`Event ${event.id}`} />
                </div>
              ))}
          </div>
          <button onClick={handleNext} className={styles.navButton}>
            ›
          </button>
        </div>
        <div className={styles.p1}>
          <div className={styles.blackLine}></div>
        </div>
        <div className={styles.p2}>
          <div className={styles.p3}>
            <img
              className={styles.p3img}
              src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2023/214x245.jpg"
              alt=""
            />
          </div>
          <div className={styles.p4}>
            <img
              className={styles.p4img}
              src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg"
              alt=""
            />
          </div>
          <div className={styles.p3}>
            <img
              className={styles.p3img}
              src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2023/214x245.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.p1}>
          <div className={styles.blackLine}></div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
