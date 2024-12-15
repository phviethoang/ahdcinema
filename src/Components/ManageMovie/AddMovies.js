import React, { useRef, useState, useEffect } from "react";
import styles from './AddMovies.module.css';
import Notification from '../Notification/Notification'
import {validateForm} from '../../utils/validateForm'
const AddMovie = ({ initialData, onSave, onCancel }) => {
  // const imageRef = useRef(null); // Ref cho image
  // const posterRef = useRef(null); // Ref cho poster
  // const [previewSrc, setPreviewSrc] = useState({m_image : null, m_poster:null});
  const [notification, setNotification] = useState(null);

  
  const [formData, setFormData] = useState({
    movie_name: "",
    movie_image: "",
    movie_poster:"",
    director: "",
    category: "",
    actors: "",
    start_date: "",
    duration: "",
    languages: "",
    movie_label:"",
    description: "",
    trailer_link: "",
  });

  // Load dữ liệu nếu chỉnh sửa
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // setPreviewSrc({
      //   m_image: initialData.movie_image || null,
      //   m_poster: initialData.movie_poster || null,
      // });
    }
  }, [initialData]);
  
  // const handleImageClick = (type) => {
  //   if(type==="image") imageRef.current.click();
  //   else if(type==="poster")posterRef.current.click();
  // };
  // const handleImageClick = (type) => {
  //   if (type === "image" && imageRef.current) {
  //     imageRef.current.click();
  //   } else if (type === "poster" && posterRef.current) {
  //     posterRef.current.click();
  //   }
  // };
  // const handleFileChange = (event, type) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (type === "image") {
  //         setPreviewSrc((prevSrc) => ({ ...prevSrc, m_image: e.target.result })); // Cập nhật m_image
  //         setFormData((prevData) => ({ ...prevData, movie_image: e.target.result }));
  //       } else if (type === "poster") {
  //         setPreviewSrc((prevSrc) => ({ ...prevSrc, m_poster: e.target.result })); // Cập nhật m_poster
  //         setFormData((prevData) => ({ ...prevData, movie_poster: e.target.result }));
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "movie_name",
      "director",
      "category",
      "actors",
      "start_date",
      "duration",
      "languages",
      "movie_label",
      "trailer_link",
      "movie_image",
    ];
    const fieldLabels = {
      movie_name: 'Tên phim',
      director: 'Đạo diễn',
      category: 'Thể loại',
      actors: 'Diễn viên',
      start_date: 'Ngày khởi chiếu',
      duration: 'Thời lượng',
      languages: 'Ngôn ngữ',
      movie_label: "Nhãn phim",
      trailer_link: 'Trailer',
      movie_image: 'Ảnh phim',
    };
    const { valid, errors: info_validationErrors, firstError } = validateForm(formData, requiredFields, fieldLabels);


    if (!valid) {
      if (formData.duration <= 0) {
        setNotification({ message: 'Thời lượng phim phải lớn hơn 0 phút!', type: 'error' });
        return;
      }
      setNotification({ message: firstError, type: 'error' });
    } 
    else {
      if (!initialData) {
        setNotification({ message: 'Thêm phim mới thành công!', type: 'success' });
      } 
      else {
        setNotification({ message: 'Cập nhật thông tin phim thành công!', type: 'success' });
        onSave(formData);
      }
    }
    console.log(formData);
  };

  return (
    <div>
      {initialData &&
        < div className={styles.closePoint} onClick={onCancel}>
        &times;
        </div>
      }
      <div className={styles.adminTitle}>{initialData ? "Chỉnh sửa phim" : "Thêm phim mới"}</div>
      <Notification 
        message={notification?.message}  // Tránh lỗi khi notification là null
        type={notification?.type}        // Tránh lỗi khi notification là null
        onClose={() => setNotification(null)} 
      />
      <div className ={styles.AddMoviesContainer}>
      <form className={styles.AddMovieForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.itemFormGroup}>
            <label htmlFor="movie_name">Tên phim:</label>
            <input
              type="text"
              id="movie_name"
              name="movie_name"
              value={formData.movie_name}
              onChange={handleInputChange}
              placeholder="Nhập tên phim"
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="director">Đạo diễn:</label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              placeholder="Nhập tên đạo diễn"
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="category">Thể loại:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Nhập thể loại"
            />
          </div>
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="actors">Diễn viên:</label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleInputChange}
              placeholder="Nhập tên diễn viên"
            />
          </div> */}
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="languages">Ngôn ngữ:</label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleInputChange}
              placeholder="Nhập ngôn ngữ"
            />
          </div> */}
        </div>

        <div className={styles.formRow}>

          <div className={styles.itemFormGroup}>
            <label htmlFor="actors">Diễn viên:</label>
            <input
              type="text"
              id="actors"
              name="actors"
              value={formData.actors}
              onChange={handleInputChange}
              placeholder="Nhập tên diễn viên"
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="start_date">Ngày khởi chiếu:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="duration">Thời lượng (phút):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Nhập thời lượng"
            />
          </div>
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="trailer_link">Trailer:</label>
            <input
              type="url"
              id="trailer_link"
              name="trailer_link"
              value={formData.trailer_link}
              onChange={handleInputChange}
              placeholder="Nhập URL trailer"
            />
          </div> */}
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="director">Đạo diễn:</label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleInputChange}
              placeholder="Nhập tên đạo diễn"
            />
          </div> */}
        </div>

        <div className={styles.formRow}>
          <div className={styles.itemFormGroup}>
              <label htmlFor="languages">Ngôn ngữ:</label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                placeholder="Nhập ngôn ngữ"
              />
            </div>
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="category">Thể loại:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Nhập thể loại"
            />
          </div> */}
          {/* <div className={styles.itemFormGroup}>
            <label htmlFor="start_date">Ngày khởi chiếu:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.releaseDate}
              onChange={handleInputChange}
            />
          </div> */}
          <div className={styles.itemFormGroup}>
            <label htmlFor="movie_label">Nhãn phim:</label>
            <select
              id="movie_label"
              name="movie_label"
              value={formData.movie_label}
              onChange={handleInputChange}
            >
              <option value="">
               -- Chọn nhãn phim -- 
              </option>
              <option value="hot">Hot</option>
              <option value="null">Null</option>
            </select>
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="trailer_link">Trailer:</label>
            <input
              type="url"
              id="trailer_link"
              name="trailer_link"
              value={formData.trailer_link}
              onChange={handleInputChange}
              placeholder="Nhập URL trailer"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.itemFormGroup}>
            <label htmlFor="movie_image">Ảnh phim:</label>
            <input
              type="url"
              id="movie_image"
              name="movie_image"
              value={formData.movie_image}
              onChange={handleInputChange}
              placeholder="Nhập URL ảnh phim"
            />
          </div>
          <div className={styles.itemFormGroup}>
            <label htmlFor="movie_poster">Poster phim:</label>
            <input
              type="url"
              id="movie_poster"
              name="movie_poster"
              value={formData.movie_poster}
              onChange={handleInputChange}
              placeholder="Nhập URL poster phim"
            />
          </div>
          {/* <div className={styles.AddMovieImageUploader}>
            <span style={{ fontSize: "20px" }}>Ảnh phim</span>
            <div
              className={styles.addMovieImagePreview}
              onClick={()=>handleImageClick("image")}
              style={{
                backgroundImage: previewSrc?.m_image? `url(${previewSrc.m_image})` : "none",
                backgroundSize: "cover",
              }}
            >
              {!previewSrc.m_image && <span>No Image</span>}
            </div>
            <button type="button" className={styles.profilePictureBtn} onClick={()=>handleImageClick("image")}>Tải ảnh lên </button>
            <input
              type="file"
              id="movie_image"
              name="movie_image"
              accept="image/*"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={(e)=>{handleFileChange(e,"image")}}
            />
          
          </div>
          <div className={styles.AddMovieImageUploader}>
            <span style={{ fontSize: "20px" }}>Poster phim</span>
            <div
              className={styles.addMoviePosterPreview}
              onClick={()=>handleImageClick("poster")}
              style={{
                backgroundImage: previewSrc ?.m_poster? `url(${previewSrc.m_poster})` : "none",
                backgroundSize: "cover",
              }}
            >
              {!previewSrc.m_poster && <span>No Image</span>}
            </div>
            <button type="button" className={styles.profilePictureBtn} onClick={()=>handleImageClick("poster")}>Tải ảnh lên </button>
            <input
              type="file"
              id="movie_poster"
              name="movie_poster"
              accept="image/*"
              ref={posterRef}
              style={{ display: "none" }}
              onChange={(e)=>{handleFileChange(e,"poster")}}
            /> 
          </div> */}
          <div className={styles.itemFormGroup}>
            <label htmlFor="description">Mô tả:</label>
            <textarea
              className={styles.AddMovieDescription}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả phim"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.AddMovieSubmitBtn}>
            {initialData ? "Cập nhật" : "Thêm phim"}
          </button>
          {initialData &&
          <button
            type="button"
            className={styles.unconfirm}
            onClick={onCancel}
          >
            Hủy
          </button>}
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddMovie;
