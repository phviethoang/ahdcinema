import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch thông tin tài khoản theo id
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu cập nhật tài khoản
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => alert("Tài khoản đã được cập nhật!"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Chỉnh sửa tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default EditUser;
