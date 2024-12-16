import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser({ setUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin nhập vào
    if (!name || !email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Tạo người dùng mới
    const newUser = {
      id: Math.floor(Math.random() * 1000), // Tạo id ngẫu nhiên
      name,
      email,
    };

    // Thêm vào danh sách người dùng (giả sử bạn truyền setUsers từ component cha)
    setUsers((prevUsers) => [...prevUsers, newUser]);

    // Điều hướng về trang danh sách người dùng
    navigate("/admin/UserList");
  };

  return (
    <div>
      <h2>Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Thêm người dùng
        </button>
      </form>
    </div>
  );
}

export default AddUser;
