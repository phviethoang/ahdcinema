import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "./EventList";
import styles from "../../FileCSS/EventPage/EventDetail.module.css"; // Import CSS module
import { Link } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const EventDetail = () => {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) return <p>Không tìm thấy sự kiện!</p>;

  return (
    <div className={styles.pageContainer}>
      <Header></Header>
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
            <Link to="/PhimDangChieu">ĐẶT VÉ THEO PHIM</Link>
          </div>
          <div className={styles.evContentLink}>
            <Link to="/TheaterPage">ĐẶT VÉ THEO RẠP</Link>
          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default EventDetail;
