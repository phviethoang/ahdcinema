import React from "react";
import styles from "../../FileCSS/EventPage/Event.module.css";
import { Link } from "react-router-dom"; // Import Link
import { useNavigate } from "react-router-dom";

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
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 6,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 7,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 8,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 9,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 10,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 11,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 12,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  {
    id: 13,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201-teachers-day-promo.jpg",
    dateRange: "7/11 - 21/11/2024",
    title: "Sự kiện 4",
  },
  // Thêm các sự kiện khác tương tự
];

const EventsPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.header}>Tin mới và ưu đãi</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Xem tất cả</button>
          <button className={styles.button} onClick={()=> navigate('/TheatersPage')}>Chọn Rạp</button>
        </div>
        <div className={styles.events}>
          {eventsData.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <Link to={`/EventPage/${event.id}`}>
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
