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
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            {/* Định nghĩa các đường link dẫn tới các trang khác */}
            <Routes>
              <Route path = "/" element={<Body></Body>}></Route>
              <Route path = "/BuyTicket" element={<BuyTicket></BuyTicket>}></Route>
              <Route path = "/MoviePage" element={<MoviePage></MoviePage>}></Route>
              <Route path = "/Login" element={<Login></Login>}></Route>
              <Route path = "/Register" element={<Register></Register>}></Route>
              <Route path = "/ForgotPassWord" element={<ForgotPassword></ForgotPassword>}></Route>
              <Route path = "/MemberPage" element = {<AhdMember></AhdMember>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
