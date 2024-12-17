import React, { useState, useEffect } from 'react';
import styles from "../../FileCSS/MemberPage/member.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";
import { faUser,faPhone, faEnvelope, faCalendar, faIdCard } from '@fortawesome/free-solid-svg-icons'; // Import các biểu tượng cần thiết
import { useNavigate} from 'react-router-dom';
import { validateForm } from './validateForm'; // Import hàm validateForm
export default function MemberInfo({onUpdate}) {
  const [formData,setFormData]=useState({
    address:"",
    date_of_birth:"",
    district:"",
    email:"",
    fullname:"",
    id_card:"",
    phonenumber:"",
    province:"",
    sex:"",
    user_id:"",
    user_image:"",
  })
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
    "Hồ Chí Minh": [
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
    if (formData.province) {
    //   setDistricts(districtsByCity[formData.province] || []);
    if (formData.province) {
        setDistricts(districtsByCity[formData.province] || []);
      } else {
        setDistricts([]);
      }
      setFormData(prevData => ({ ...prevData, district: '' })); // Reset district khi city thay đổi
    }
  }, [formData.province]);



//BEGIN FETCH DATA
  //Khai báo các mảng sẽ chứa dữ liệu fetch về
  const [memberInfo, setMemberInfo] = useState([]);
  const userId = JSON.parse(Cookies.get('user_id')?.substring(2) || '{}').user_id;
  const navigate = useNavigate();
  // Hàm fetch data GET thông tin cá nhân
  useEffect(() => {
    fetch(`http://localhost:5000/ahd/member-info?user_id=${userId}`, {
      credentials: 'include', // Đảm bảo gửi cookie
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            // Xử lý khi chưa đăng nhập
            console.error('Unauthorized. Redirecting to login...');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMemberInfo(data))
      .catch(error => console.error('Error:', error));
  }, [userId]);
  // In ra các mảng kiểm tra
  console.log("Done fetching data!")
  console.log(memberInfo)


  const postMemberInfo = async (formData, userId) => {
    console.log("userId: ",typeof userId, userId)
    if (!userId) {
        console.error("Missing user_id.");
        alert("User ID is required to update member information.");
        return;
    }

    if (!formData || Object.keys(formData).length === 0) {
        console.error("No information provided to update.");
        alert("Please fill in the required fields before submitting.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/ahd/member-info?user_id=${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error updating member information:", error);
            alert(`Error: ${error.message || "Failed to update information."}`);
            return;
        }

        const data = await response.json();
        alert(data.message || "Profile updated successfully!");
    } catch (error) {
        console.error("Error during fetch:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
  };

  // END FETCH DATA

useEffect(() => {
    if (memberInfo) {
      setFormData({
        ...memberInfo,
        date_of_birth: memberInfo.date_of_birth?adjustTime(memberInfo.date_of_birth):''
      });
    }
    console.log("memberInfo: ", memberInfo);
  }, [memberInfo]);
  

  useEffect(()=>{
    console.log("formData: ",formData);
  },[formData])

  function adjustTime(dateString) {
    const date = new Date(dateString);
  
    // Điều chỉnh múi giờ: cộng thêm 7 giờ
    date.setHours(date.getHours() + 7);
  
    // Chuyển lại định dạng "YYYY-MM-DD" sau khi điều chỉnh
    const adjustedDate = date.toISOString().split('T')[0]; // Lấy phần ngày YYYY-MM-DD
  
    return adjustedDate;
  }
  
  // Ví dụ sử dụng
  const date_of_birth = "2024-12-01T17:00:00.000Z"; // Dữ liệu lấy từ cơ sở dữ liệu
  const correctedDate = adjustTime(date_of_birth);
  console.log(correctedDate); // Kết quả: 2024-12-02 (sau khi điều chỉnh giờ)
  

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      let updatedValue = value;
      if (name === 'date_of_birth') {
        updatedValue = adjustTime(updatedValue)
      } else if (name === 'sex') {
        updatedValue = value === 'true';
      }
      return {
        ...prevData,
        [name]: updatedValue,
      };
    });
  };
  

  //  Hàm xử lý khi thay đổi dữ liệu trong form mật khẩu
   const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi người dùng nhập
  };

  const uploadToImgBB = async (file) => {
    const apiKey = "62aeed495597bb725a6b2ce4f6592c06"; // đây là api key của An
    const formData = new FormData();
  
    formData.append("key", apiKey);
    formData.append("image", file);
  
    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.data.url; // Trả về URL ảnh từ ImgBB
      } else {
        const error = await response.json();
        console.error("ImgBB upload failed:", error);
        throw new Error(error.error.message);
      }
    } catch (err) {
      console.error("Error during ImgBB upload:", err);
      throw err;
    }
  };
  
  // Hàm xem trước và upload ảnh
  const previewAndUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async function (e) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      imagePreview.style.backgroundSize = "cover";
      imagePreview.style.backgroundPosition = "center";
      imagePreview.innerHTML = ""; // Xóa chữ "No Image"
  
      // Upload ảnh lên ImgBB
      try {
        const imageUrl = await uploadToImgBB(file);
        console.log("Uploaded ImgBB URL:", imageUrl);
        setFormData({ ...formData, user_image: imageUrl }); // Lưu URL trả về vào state
        // alert("Upload thành công!");
      } catch (err) {
        console.log(err);
        // alert("Upload thất bại, vui lòng thử lại.");
      }
    };
  
    reader.readAsDataURL(file); // Đọc file để xem trước
  };


// Hàm submit có chức năng cập nhật thông tin qua nút Cập nhật
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['fullname'];
    const fieldLabels = {
      fullname: 'Họ tên',
    }
    const { valid, errors: info_validationErrors, firstError } = validateForm(formData, requiredFields, fieldLabels);

      if (!valid) {
        alert(firstError);
        return;
      } 
      alert('Cập nhật thông tin thành công!');
    //   console.log(formData);
      //POST data len database
      
      const { email, wallet_balance, ...rest } = formData; // Đảm bảo khai báo các biến
      const uploadData = {...rest }; // Sau đó, sử dụng chúng
      console.log(" uploadData: ", uploadData)
      postMemberInfo(uploadData, userId)
      onUpdate()
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
            <div>
            {/* Div để hiển thị ảnh khi người dùng chọn */}
            <div
                id="imagePreview"
                className={styles.imagePreview}
                onClick={() => document.getElementById('user_image_input').click()} // Mở file input khi nhấn vào div
            >
                {formData.user_image ? (
                <img
                    src={formData.user_image} // Hiển thị ảnh đã chọn từ formData
                    alt="User Image Preview"
                    style={{ width: '100%', height: 'auto' }} // Bạn có thể thay đổi kích thước ảnh tùy ý
                />
                ) : (
                <span>No Image</span> // Nếu chưa chọn ảnh, hiển thị chữ "No Image"
                )}
            </div>

            {/* Input file để người dùng chọn ảnh */}
            <input
                type="file"
                id="user_image_input" // ID cho input file
                name="user_image"
                accept="image/*"
                style={{ display: 'none' }} // Ẩn input file đi
                onChange={previewAndUploadImage} // Gọi hàm xem trước và upload ảnh khi người dùng chọn ảnh
            />

            {/* Nút tải ảnh lên */}
            <button
                type="button"
                className={styles.profilePictureBtn}
                onClick={() => document.getElementById('user_image_input').click()} // Mở file input khi nhấn vào nút
            >
                Tải ảnh lên
            </button>
            </div>
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
                        disabled
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
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder="Số điện thoại"
                        required/>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="id_card">CMND/Hộ chiếu:</label>
                    <div className={styles.inputIcon}>
                    <FontAwesomeIcon className={styles.icon} icon={faIdCard} >::before</FontAwesomeIcon>
                    <input
                        type="text"
                        id="id_card"
                        name="id_card"
                        value={formData.id_card}
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
            <label htmlFor="date_of_birth">Ngày sinh:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon}  icon={faCalendar}>::before</FontAwesomeIcon>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              </div>
          </div>
          {/* date_of_birth:"",
          district:"", */}

          <div className={styles.formGroup}>
            <label htmlFor="sex" style={{marginTop:'0.2vw'}}>Giới tính:</label>
            <div className={styles.inputIcon}>
              <FontAwesomeIcon className={styles.icon}  icon={faUser}>::before</FontAwesomeIcon>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                style={{marginTop:'3px'}}
              >
                <option selected>Chọn giới tính</option>
                <option value = {true}>Nam</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
          </div>
          </div>


          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="province">Tỉnh/Thành phố:</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Tỉnh/Thành phố"
            >
              <option selected value="">Chọn tỉnh/thành phố</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="district">Quận/Huyện:</label>
            {/* <select
              list="districts"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              autoComplete="off"
            /> */}
            <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                // disabled={!formData.province}
            >
                <option value="">-- Chọn Quận huyện --</option>
                {districts.map((district, index) => (
                <option key={index} value={district}>
                    {district}
                </option>
                ))}
            </select>
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
