import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserList() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // Fetch danh sách tài khoản từ API
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((err) => console.error(err));
  // }, []);
  const [users, setUsers] = useState([]); // Thêm useState để tạo users và setUsers

  useEffect(() => {
    // Fetch dữ liệu giả từ API hoặc mock data
    const fetchUsers = async () => {
      const data = [
        { id: 1, name: "Nguyen Van A", email: "a@example.com" },
        { id: 2, name: "Tran Thi B", email: "b@example.com" },
        { id: 3, name: "Le Van C", email: "c@example.com" },
      ];
      setUsers(data); // Gán dữ liệu vào trạng thái
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      fetch(`/api/users/${id}`, { method: "DELETE" })
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
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
