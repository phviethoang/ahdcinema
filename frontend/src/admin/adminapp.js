import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./component/Login/login"; // Đường dẫn tới Login (cần đúng cấu trúc thư mục)
import UploadMovie from "./component/UploadMovie/UploadMovie";
import Sidebar from "./component/SideBar/SideBar";
import Header from "./component/Header/Header";
import EditMovie from "./component/MovieList/EditMovie";
import MovieList from "./component/MovieList/MovieList";
import EditUser from "./component/ManageUser/EditUser";
import UserList from "./component/ManageUser/UserList";
import RevenueReport from "./component/RevenueReport/RevenueReport";
import Dashboard from "./component/Dashboard/Dashboard";
import MovieStatistics from "./component/statistic/statisticMovie";
import MemberStatistics from "./component/statistic/MemberStatistics";
import GenreStatistics from "./component/statistic/GenreStatistics";
import ShowtimeStatistics from "./component/statistic/ShowtimeStatistics";

const AdminApp = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="EditMovie/:id" element={<EditMovie />} />
            <Route path="EditUser/:id" element={<EditUser />} />
            <Route path="MovieList" element={<MovieList />} />
            <Route path="UserList" element={<UserList />} />
            <Route path="UploadMovie" element={<UploadMovie />} />
            <Route path="login" element={<Login />} />
            <Route path="RevenueReport" element={<RevenueReport />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="MovieStatistics" element={<MovieStatistics />} />
            <Route path="MemberStatistics" element={<MemberStatistics />} />
            <Route path="GenreStatistics" element={<GenreStatistics />} />
            <Route path="ShowtimeStatistics" element={<ShowtimeStatistics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminApp;
