import './App.css';
import React from 'react';
import Body from './Components/FileJS/Home/Body';
import Footer from './Components/FileJS/footer.js';
import Header from './Components/FileJS/header';
import MoviePage from './Components/FileJS/MoviePage';
import BuyTicketPage from './Components/FileJS/BuyTicketPage/BuyTicketPage';
import BuyTicket from './Components/FileJS/BuyTicketPage/BuyTicket.js';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Components/FileJS/LoginAndRegister/login.js';
import Register from './Components/FileJS/LoginAndRegister/Register.js';
import ForgotPassword from './Components/FileJS/LoginAndRegister/ForgotPassword.js';
import AhdMember from './Components/FileJS/MemberPage/AhdMember.js';
import EventPage from './Components/FileJS/EventPage/EventPage.js';
import EventDetail from './Components/FileJS/EventPage/EventDetail.js';
import PhimDangChieu from './Components/FileJS/MovieCollectionPage/PhimDangChieu.js';
import PhimSapChieu from './Components/FileJS/MovieCollectionPage/PhimSapChieu.js';
import CinemaList from './Components/FileJS/Theater/CinemaList.js';
import PaymentTabs from './Components/FileJS/Payment/PaymentTabs.js';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path = "/" element={<Body></Body>}></Route>
              <Route path = "/BuyTicket" element={<BuyTicket></BuyTicket>}></Route>
              <Route path = "/MoviePage" element={<MoviePage></MoviePage>}></Route>
              <Route path = "/Login" element={<Login></Login>}></Route>
              <Route path = "/Register" element={<Register></Register>}></Route>
              <Route path = "/ForgotPassWord" element={<ForgotPassword></ForgotPassword>}></Route>
              <Route path = "/MemberPage" element = {<AhdMember></AhdMember>}></Route>
              <Route path = "/EventPage" element = {<EventPage></EventPage>}></Route>
              <Route path = "/EventPage/:id" element = {<EventDetail></EventDetail>}></Route>
              <Route path = "/PhimDangChieu" element = {<PhimDangChieu></PhimDangChieu>}></Route>
              <Route path = "/PhimSapChieu" element = {<PhimSapChieu></PhimSapChieu>}></Route>
              <Route path = "/TheatersPage" element = {<CinemaList></CinemaList>}></Route>
              <Route path = "/payment" element = {<PaymentTabs></PaymentTabs>}></Route>
            </Routes>
        </BrowserRouter>
        {/* <CinemaList></CinemaList> */}
    </div>
  );
}

export default App;
