import React, { useRef, useState, useEffect } from 'react';
import styles from './AddCinemas.module.css';
import Notification from '../Notification/Notification'
import {validateForm} from '../../utils/validateForm'

const AddCinemas = ({ initialData, onSave, onCancel }) => {
  // const fileInputRef = useRef(null); 
  // const [previewSrcList, setPreviewSrcList] = useState([]); 
  // const [selectedIndex, setSelectedIndex] = useState(null);

  const [cityData, setCityData]=useState([
    {city_id:1, city_name:"Hồ Chí Minh"},
    {city_id:2, city_name:"Hà Nội"},
    {city_id:3, city_name:"Hải Phòng"},
    {city_id:4, city_name:"Đà Nẵng"},
    {city_id:5, city_name:"Cần Thơ"},
  ])
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    cinema_name:"",
    address:"",
    cinema_image:"",
    city_id : 0,
    // cinemaName: '',
    // address: '',
    // city: '',
  });
    // Load dữ liệu nếu chỉnh sửa
    useEffect(() => {
      if (initialData) {
        setFormData(initialData);
        // setPreviewSrcList(Array.isArray(initialData.images) ? initialData.images : []);
      }
    }, [initialData]);
    

  // const handleImageClick = (index) => {
  //   setSelectedIndex(index); 
  //   fileInputRef.current.click(); 
  // };

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newPreviewSrcList = [...previewSrcList];

  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (selectedIndex !== null) {
  //         newPreviewSrcList[selectedIndex] = e.target.result;
  //       } else if (newPreviewSrcList.length < 4) {
  //         newPreviewSrcList.push(e.target.result);
  //       }
  //       setPreviewSrcList([...newPreviewSrcList]);
  //       setSelectedIndex(null);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     images: newPreviewSrcList,  // Cập nhật ảnh vào formData
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: name === 'city_id' ? parseInt(value, 10) : value, }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['cinema_name', 'address', "cinema_image", 'city_id'];
    const fieldLabels = {
      cinema_name: 'Tên rạp',
      address: 'Địa chỉ',
      cinema_image:"Ảnh rạp phim",
      city_id: 'Thành phố',
    };
  
    const { valid, errors: info_validationErrors, firstError } = validateForm(formData, requiredFields, fieldLabels);
  
    if (!valid) {
        setNotification({ message: firstError, type: 'error' });
    } 
    else {
      if(!initialData){
        setNotification({ message: 'Thêm thông tin rạp thành công!', type: 'success' });
        console.log("formData: ", formData)
      } 
      else{
        setNotification({ message: 'Cập nhật thông tin rạp thành công!', type: 'success' });
        onSave(formData);
      }
    }
  };
  

  return (
    <>
    {initialData &&
        < div className={styles.closePoint} onClick={onCancel}>
        &times;
        </div>
      }
      <div className={styles.adminTitle}>{initialData ? "Chỉnh sửa rạp" : "Thêm rạp mới"}</div>
    {/* <div className={styles.adminTitle}>Thêm rạp mới</div> */}
    <Notification 
      message={notification?.message}  // Tránh lỗi khi notification là null
      type={notification?.type}        // Tránh lỗi khi notification là null
      onClose={() => setNotification(null)} 
    />

    <div className={styles.AddCinemasContainer}>
      {/* <div className={styles.AddCinemasImageUploader}>
        <span style={{fontSize:"20px"}}>Ảnh rạp phim</span>
        <div className={styles.AddCinemasImageGrid}>
          {previewSrcList?.length > 0 ? (
            previewSrcList.map((src, index) => (
              <div
                key={index}
                className={styles.imagePreview}
                onClick={() => handleImageClick(index)} // Nhấn vào để thay đổi ảnh
              >
                <img src={src} alt={`Preview ${index + 1}`} className={styles.previewImage} />
              </div>
            ))
          ) : previewSrcList.length < 4 && (
            <div
              className={styles.imagePreview}
              onClick={() => handleImageClick(null)} 
            >
              <span>No Image</span>
            </div>
            
          )}
        </div>
          <button
              type="button"
              className={styles.profilePictureBtn}
              onClick={() => handleImageClick(null)} 
            >
              Tải ảnh lên
            </button>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            ref={fileInputRef} 
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
      </div> */}
      <form className={styles.AddCinemasForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.itemFormGroup}>
            <label htmlFor="cinemaName">Tên rạp:</label>
            <input
              type="text"
              id="cinema_name"
              name="cinema_name"
              value={formData.cinema_name}
              onChange={handleInputChange}
              placeholder="Nhập tên rạp"
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="cinema_image">Ảnh rạp:</label>
            <input
              type="url"
              id="cinema_image"
              name="cinema_image"
              value={formData.cinema_image}
              onChange={handleInputChange}
              placeholder="Nhập URL ảnh rạp"
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.itemFormGroup}>
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </div>
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="city_id">Thành phố:</label>
            <input
              type="text"
              id="city_id"
              name="city_id"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Nhập thành phố"
            />
          </div> */}
           <div className={styles.itemFormGroup}>
            <label>Chọn thành phố</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn thành phố --</option>
              {cityData.map((city) => (
                <option  key={city.city_id} value={city.city_id} >
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.AddCinemasSubmitBtn}>
          {initialData ? "Cập nhật" : "Thêm rạp"}
          </button>
          {initialData &&
            <button
              type="button"
              className={styles.unconfirm}
              onClick={onCancel}
            >
              Hủy
            </button>
          }
        </div>
      </form>
    </div>
    </>
  );
};

export default AddCinemas;
