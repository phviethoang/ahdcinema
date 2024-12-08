import Header from "../header";
import Footer from "../footer";
import Event from "./Event";
import React from "react";
const EventPage = () => {
  return (
    <div >
      <Header></Header>
      {/* Bạn có thể hiển thị EventList trực tiếp hoặc sử dụng Outlet */}
      <div>
        <Event />
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default EventPage;
