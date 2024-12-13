import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch danh sách tài khoản từ API
    fetch("http://localhost:5000/users") // Sử dụng đúng cổng 5000
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" }) // Gọi API DELETE
        .then(() => {
          setUsers(users.filter((user) => user.id !== id)); // Cập nhật danh sách sau khi xóa
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>Danh sách tài khoản</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/admin/EditUser/${user.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Sửa
                </Link>
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
