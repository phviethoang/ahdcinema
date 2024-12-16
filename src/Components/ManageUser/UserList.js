import React, { useState, useEffect } from "react";
import styles from "./UserList.module.css";
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dữ liệu giả với 10 user
    const fetchUsers = () => {
      const data = [
        {
          id: 1,
          name: "Nguyen Van A",
          username: "a123",
          email: "a@example.com",
        },
        { id: 2, name: "Tran Thi B", username: "b456", email: "b@example.com" },
        { id: 3, name: "Le Van C", username: "c789", email: "c@example.com" },
        {
          id: 4,
          name: "Pham Minh D",
          username: "d101",
          email: "d@example.com",
        },
        {
          id: 5,
          name: "Hoang Thi E",
          username: "e112",
          email: "e@example.com",
        },
        {
          id: 6,
          name: "Nguyen Thi F",
          username: "f131",
          email: "f@example.com",
        },
        { id: 7, name: "Le Minh G", username: "g415", email: "g@example.com" },
        { id: 8, name: "Tran Thi H", username: "h161", email: "h@example.com" },
        {
          id: 9,
          name: "Pham Minh I",
          username: "i718",
          email: "i@example.com",
        },
        {
          id: 10,
          name: "Hoang Thi J",
          username: "j192",
          email: "j@example.com",
        },
      ];
      setUsers(data); // Gán dữ liệu vào trạng thái
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Danh sách tài khoản</h2>

      <table className="table table-striped table-bordered table-hover">
        <thead style={{ backgroundColor: "#343a40", color: "white" }}>
          <tr>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              STT
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Tên
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Tên đăng nhập
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Email
            </th>
            <th
              scope="col"
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px",
                textAlign: "center",
              }}
            >
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="text-center p-3">{index + 1}</td>
              <td className="text-center p-3">{user.name}</td>
              <td className="text-center p-3">{user.username}</td>
              <td className="text-center p-3">{user.email}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
