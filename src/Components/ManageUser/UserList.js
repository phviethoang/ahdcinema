import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dữ liệu giả với 10 user
    const fetchUsers = () => {
      const data = [
        { id: 1, name: "Nguyen Van A", email: "a@example.com" },
        { id: 2, name: "Tran Thi B", email: "b@example.com" },
        { id: 3, name: "Le Van C", email: "c@example.com" },
        { id: 4, name: "Pham Minh D", email: "d@example.com" },
        { id: 5, name: "Hoang Thi E", email: "e@example.com" },
        { id: 6, name: "Nguyen Thi F", email: "f@example.com" },
        { id: 7, name: "Le Minh G", email: "g@example.com" },
        { id: 8, name: "Tran Thi H", email: "h@example.com" },
        { id: 9, name: "Pham Minh I", email: "i@example.com" },
        { id: 10, name: "Hoang Thi J", email: "j@example.com" },
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
