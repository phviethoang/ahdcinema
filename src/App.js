import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Components/Login/login"; // Đường dẫn tới Login (cần đúng cấu trúc thư mục)

import Sidebar from "./Components/SideBar/SideBar";


import AddCinemas from "./Components/ManageCinema/AddCinemas";
import CinemasList from "./Components/ManageCinema/CinemasList";

import EditUser from "./Components/ManageUser/EditUser";
import UserList from "./Components/ManageUser/UserList";
import AddMovies from "./Components/ManageMovie/AddMovies"
import MoviesList from './Components/ManageMovie/MoviesList'
import ManageScreeningRooms from './Components/ManageScreenRoom/ManageScreeningRooms'
import ManageSeats from './Components/ManageScreenRoom/ManageSeats'

import AddShowtimes from './Components/ManageShowtimes/AddShowtimes'
import ShowtimesList from './Components/ManageShowtimes/ShowtimesList'

import AddVouchers from './Components/MangeVouchers/AddVouchers'
import VouchersList from './Components/MangeVouchers/VouchersList'

// import AddAccounts from './Components/ManageAccounts/AddAccounts'
// import AccountInfo from './Components/ManageAccounts/AccountInfo'

const App = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        {/* <Header /> */}
        <main className="container mt-4">
          <Routes>
            <Route path="EditUser/:id" element={<EditUser />} />
            
            <Route path="UserList" element={<UserList />} />
            <Route path="AddMovies" element={<AddMovies />} />
            <Route path="MoviesList" element={<MoviesList />} />

            <Route path="AddCinemas" element={<AddCinemas/>} />
            <Route path="CinemasList" element={<CinemasList />} />

            <Route path="/manage-screening-rooms" element={<ManageScreeningRooms />} />
            <Route path="/manage-seats" element={<ManageSeats />} />
            
            <Route path="/AddShowtimes" element={<AddShowtimes />} />
            <Route path="/ShowtimesList" element={<ShowtimesList />} />

            <Route path="/AddVouchers" element={<AddVouchers />} />
            <Route path="/VouchersList" element={<VouchersList />} />


            <Route path="login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
