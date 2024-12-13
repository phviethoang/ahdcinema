import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Điều hướng sau khi chỉnh sửa

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  // Lấy thông tin user từ API
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý lưu thông tin user
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        alert("Cập nhật thông tin thành công!");
        navigate("/admin/UserList"); // Điều hướng về danh sách user
      })
      .catch((err) => {
        console.error(err);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      });
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;

  return (
    <div>
      <h2>Chỉnh sửa thông tin tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/admin/UserList")}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export default EditUser;
