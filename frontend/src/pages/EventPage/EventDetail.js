import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "./EventList";
import styles from "../EventPage/EventDetail.module.css"; // Import CSS module
import { Link } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) return <p>Không tìm thấy sự kiện!</p>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.titleh1}> {event.title}</h1>
        <div>
          <img className={styles.img} src={event.img} />
        </div>
        <div className={styles.imagect}>
          <img className={styles.image} src={event.image} />
        </div>

        <div className={styles.evContent}>
          <div
            className={styles.eventDetails}
            dangerouslySetInnerHTML={{ __html: event.eventContent }}
          />
          <div className={styles.evContentLink}>
            <Link to="/login">ĐẶT VÉ THEO PHIM</Link>
          </div>
          <div className={styles.evContentLink}>
            <Link to="/login">ĐẶT VÉ THEO RẠP</Link>
          </div>

          <p1>Tải app CGV để đặt vé chọn chỗ sớm hơn, nhanh hơn:</p1>
          <p2>
            <a
              style={{ textDecoration: "none" }}
              href="https://apps.apple.com/us/app/cgv-cinemas/id1067166194"
              target="_blank"
              rel="noopener noreferrer"
            >
              - Tải CGV Cinemas cho iOS
            </a>
          </p2>
          <p2>
            <a
              style={{ textDecoration: "none" }}
              href="https://apps.apple.com/us/app/cgv-cinemas/id1067166194"
              target="_blank"
              rel="noopener noreferrer"
            >
              - Tải CGV Cinemas cho Android
            </a>
          </p2>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
