import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import Header from "./component/Header/Header"; // Giả sử bạn có Header
import Footer from "./component/Footer/Footer"; // Giả sử bạn có Footer
import AdminApp from "./admin/adminapp";
function App() {
  return (
    <div>
      <Header /> {/* Header chung */}
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </main>
      <Footer /> {/* Footer chung */}
    </div>
  );
}

export default App;
