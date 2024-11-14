import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./component/Register/Register";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword";
import PhimSapChieu from "./component/PhimSapChieu/PhimSapChieu";
import PhimDangChieu from "./component/PhimDangChieu/PhimDangChieu";
import Combo from "./component/Combo/combo";
import EventSlider from "./component/EventSlider/EventSlider";

import EventPage from "./pages/EventPage/EventPage";
import EventDetail from "./pages/EventPage/EventDetail";

export const routes = [
  { path: "/Event", element: <EventPage /> },

  { path: "/event1", element: <EventSlider /> },
  { path: "/Combo", element: <Combo /> },
  { path: "/PhimDangChieu", element: <PhimDangChieu /> },
  { path: "/PhimSapChieu", element: <PhimSapChieu /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/Event/:id", element: <EventDetail /> },
  {
    /* Route động */
  },
];
