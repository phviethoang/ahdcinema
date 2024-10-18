import React, { useState, useEffect } from 'react';
import styles from "./member.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser,faPhone, faEnvelope, faCalendar, faIdCard } from '@fortawesome/free-solid-svg-icons'; // Import các biểu tượng cần thiết

import { validateForm } from './validateForm'; // Import hàm validateForm
export default function MemberInfo() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    cmnd: '',
    dob: '',
    city: '',
    district: '',
    gender: '', 
    address: '', 
    profilePicture: null
  });
  const [formPassword, setFormPassword] = useState({
    currentPassword : '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({}); // Định nghĩa setErrors ở đây
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

  const districtsByCity = {
    // Dữ liệu quận/huyện
    "Ho Chi Minh": [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Bình Tân",
      "Bình Thạnh",
      "Gò Vấp",
      "Phú Nhuận",
      "Tân Bình",
      "Tân Phú",
      "Thủ Đức"
    ],
    "Ha Noi": [
      "Ba Đình",
      "Hoàn Kiếm",
      "Tây Hồ",
      "Long Biên",
      "Cầu Giấy",
      "Đống Đa",
      "Hai Bà Trưng",
      "Hoàng Mai",
      "Thanh Xuân",
      "Sóc Sơn",
      "Đông Anh",
      "Gia Lâm",
      "Nam Từ Liêm",
      "Bắc Từ Liêm",
      "Hà Đông"
    ],
    "Da Nang": [
      "Hải Châu",
      "Sơn Trà",
      "Ngũ Hành Sơn",
      "Liên Chiểu",
      "Cẩm Lệ",
      "Hoàng Sa",
      "Hòa Vang",
      "Thanh Khê",
      "Cẩm Sơn"
    ],
    "Hai Phong": [
      "Hồng Bàng",
      "Lê Chân",
      "Ngô Quyền",
      "Kiến An",
      "Hải An",
      "Dương Kinh",
      "Đồ Sơn",
      "An Dương",
      "An Lão",
      "Kiến Thụy",
      "Tiên Lãng",
      "Vĩnh Bảo",
      "Cát Hải",
      "Bạch Long Vĩ",
      "Thủy Nguyên"
    ],
    "Can Tho": [
      "Ninh Kiều",
      "Bình Thủy",
      "Cái Răng",
      "Ô Môn",
      "Thốt Nốt",
      "Phong Điền",
      "Cờ Đỏ",
      "Thới Lai",
      "Vĩnh Thạnh"
    ]
  };
// Cập nhật quận/huyện khi thay đổi thành phố
  useEffect(() => {
    if (formData.city) {
      setDistricts(districtsByCity[formData.city] || []);
      setFormData(prevData => ({ ...prevData, district: '' })); // Reset district khi city thay đổi
    }
  }, [formData.city]);

  // Hàm xử lý khi thay đổi dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi người dùng nhập
  };

  //  Hàm xử lý khi thay đổi dữ liệu trong form mật khẩu
   const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi người dùng nhập
  };

//Hàm xem trước hình ảnh
  const previewImage = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      imagePreview.style.backgroundSize = 'cover';
      imagePreview.style.backgroundPosition = 'center';
      imagePreview.innerHTML = ''; // Xóa chữ "No Image"
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
// Hàm submit có chức năng cập nhật thông tin qua nút Cập nhật
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['fullname', 'email', 'phone', 'dob', 'cmnd'];
    const fieldLabels = {
      fullname: 'Họ tên',
      email: 'Email',
      phone: 'Số điện thoại',
      dob: 'Ngày sinh',
      cmnd: 'CMND',
    }
    const { valid, errors: info_validationErrors, firstError } = validateForm(formData, requiredFields, fieldLabels);

      if (!valid) {
        alert(firstError);
      } else {
        alert('Cập nhật thông tin thành công!');
        // Thực hiện các hành động tiếp theo như gửi dữ liệu lên server
      }
    };

// Hàm submit có chức năng cập nhật mật khẩu qua nút Hoàn tất
   const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['currentPassword', 'newPassword', 'confirmPassword'];
    const fieldLabels = {
      currentPassword: 'Mật khẩu hiện tại',
      newPassword: 'Mật khẩu mới',
      confirmPassword: 'Xác nhận mật khẩu',
    }
    const { valid, errors: validationErrors, firstError } = validateForm(formPassword, requiredFields, fieldLabels);
      setFormPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      if(formPassword.currentPassword ==''&& formPassword.newPassword ==''&& formPassword.confirmPassword == '')
        alert('Bạn chưa nhập thông tin');
      else if (!valid) {
        alert(firstError);
      } 
      else if (formPassword.newPassword !== formPassword.confirmPassword)
          alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      else{
        alert('Đổi mật khẩu thành công!');
        setShowModal(false);
      }
  };

   
  //Hàm đóng modal khi nhấn vào overlay hoặc nút đóng
  const closeModal = () => {
    setShowModal(false);
  }


  return (
    <div>
      <h2>Thông tin tài khoản</h2>
      
      
        <form id="memberForm" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
          <div className={styles.imageUploadContainer}>
            <div id="imagePreview" className={styles.imagePreview} onClick={() => document.getElementById('profilePicture').click()}>
              <span>No Image</span>
             </div>
             <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={previewImage}
              />
              <button type="button" className={styles.profilePictureBtn}onClick={() => document.getElementById('profilePicture').click()}>Tải ảnh lên</button>
          </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="fullname">
                <span className={styles.highlight}>☆ </span>
                Họ tên:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Họ tên"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email"><span className={styles.highlight}>☆ </span>Email:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon} icon={faEnvelope} >::before</FontAwesomeIcon>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
        </div>

        {/* Các trường khác tương tự */}
      <div className={styles.formRow}>
          <div className={styles.formGroup}>
  
            <label htmlFor="phone"><span className={styles.highlight}>☆ </span>Số điện thoại:</label>
              <div className={styles.inputIcon}>
                <FontAwesomeIcon className={styles.icon} icon={faPhone}>::before</FontAwesomeIcon>
                <input 
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  required/>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cmnd"><span className={styles.highlight}>☆ </span>CMND/Hộ chiếu:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon} icon={faIdCard} >::before</FontAwesomeIcon>
              <input
                type="text"
                id="cmnd"
                name="cmnd"
                value={formData.cmnd}
                onChange={handleChange}
                placeholder="CMND/Hộ chiếu"
                required
              />
            </div>
          </div>
        </div>

       {/* Hàng ngày sinh và Giới tính */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dob"><span className={styles.highlight}>☆ </span>Ngày sinh:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon}  icon={faCalendar}>::before</FontAwesomeIcon>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gender" style={{marginTop:'0.2vw'}}>Giới tính:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon}  icon={faUser}>::before</FontAwesomeIcon>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{marginTop:'3px'}}
              >
                <option selected>Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>
          </div>


          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">Tỉnh/Thành phố:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Tỉnh/Thành phố"
            >
              <option selected>Chọn tỉnh/thành phố</option>
              <option value="Ho Chi Minh">Hồ Chí Minh</option>
              <option value="Ha Noi">Hà Nội</option>
              <option value="Da Nang">Đà Nẵng</option>
              <option value="Hai Phong">Hải Phòng</option>
              <option value="Can Tho">Cần Thơ</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="district">Quận/Huyện:</label>
            <input
              list="districts"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              autoComplete="off"
            />
            <datalist id="districts">
              {districts.map((district, index) => (
                <option key={index} value={district} />
              ))}
            </datalist>
          </div>
        </div>



        <div className={styles.formGroup}>
          <label htmlFor="floatingTextarea2">Địa chỉ:</label>
          <textarea className={styles.address}
          
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            rows='4'
          />
        </div>
        <button type="button" class="btn btn-link" style={{textAlign: 'left'}} onClick={() => setShowModal(true)}>
          Đổi mật khẩu?
        </button>
        <button className={styles.updateButton} type="submit">Cập nhật</button>
      </form>
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.closeButton} onClick={closeModal}>&times;</span>
            <h2>Đổi Mật Khẩu</h2>
            <form id="passwordForm" onSubmit={handlePasswordSubmit} noValidate encType="multipart/form-data">
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                <input
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword" 
                  placeholder="Nhập mật khẩu hiện tại"
                  onChange={handlePasswordChange}
                  
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword" >Mật khẩu mới:</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword" 
                  placeholder="Nhập mật khẩu mới" 
                  onChange={handlePasswordChange}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Xác nhận mật khẩu mới" 
                  onChange={handlePasswordChange}
                  required />
              </div>
              <button type="submit" style={{marginTop: '1vw'}}>Hoàn tất</button>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
}
