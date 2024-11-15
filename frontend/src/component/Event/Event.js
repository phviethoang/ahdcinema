import React from "react";
import styles from "../Event/Event.module.css";
import { Link } from "react-router-dom"; // Import Link

const eventsData = [
  {
    id: 1,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201.png", // Thay thế bằng đường dẫn hình ảnh
    dateRange: "22/11/2024 - 24/11/2024",
    title: "Sự kiện 1",
  },
  {
    id: 2,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/N_O_240x201.png",
    dateRange: "1/11 - 31/12/2024",
    title: "Sự kiện 2",
  },
  {
    id: 3,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240-x-201-px.jpg",
    dateRange: " 1/11 - 31/12/2024",
    title: "Sự kiện 3",
  },
  {
    id: 4,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 5,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/Onl_N_O_240x201.jpg",
    dateRange: "8/11 - 12/12/2024",
    title: "Sự kiện 5",
  },
  {
    id: 6,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/News_Offers_240_x_201.jpg",
    dateRange: "1/11/2024 - 16/02/2025",
    title: "Sự kiện 6",
  },
  {
    id: 7,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/Happy_Day_Oct_28_N_O_240x201.jpg",
    dateRange: "HAPPY DAY",
    title: "Sự kiện 7",
  },
  {
    id: 8,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/CGV-240x201-.png",
    dateRange: "01/11/2024 - 30/11/2024",
    title: "Sự kiện 8",
  },
  {
    id: 9,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/102024/Culture_Day_Oct_28_N_O_240x201.jpg",
    dateRange: "Thứ 2 Cuối Cùng mỗi Tháng",
    title: "Sự kiện 9",
  },
  {
    id: 10,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/102024/240x201_8_.jpg",
    dateRange: "Quà Sinh Nhật MIỄN PHÍ",
    title: "Sự kiện 10",
  },
  {
    id: 11,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/102024/N_O_240x201.png",
    dateRange: "01.01.2024 - 31.12.2024",
    title: "Sự kiện 11",
  },
  {
    id: 12,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201_9_.jpg",
    dateRange: "02.11.2024",
    title: "Sự kiện 12",
  },
  {
    id: 13,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/102024/NXCMCT_N_O_240x201.jpg",
    dateRange: "28/10/2024",
    title: "Sự kiện 13",
  },
  // Thêm các sự kiện khác tương tự
];

const EventsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.header}>Tin mới và ưu đãi</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Xem tất cả</button>
          <button className={styles.button}>Chọn Rạp</button>
        </div>
        <div className={styles.events}>
          {eventsData.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <Link to={`/Event/${event.id}`}>
                {" "}
                {/* Đường dẫn đến trang chi tiết */}
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.image}
                />
              </Link>
              <div className={styles.date}>{event.dateRange}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
