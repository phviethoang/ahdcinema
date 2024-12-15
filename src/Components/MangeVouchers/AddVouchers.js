import React, { useState, useEffect } from 'react';
import styles from './AddVouchers.module.css';
import Notification from '../Notification/Notification';
import { validateForm } from '../../utils/validateForm';

const AddVouchers = ({ initialData, onSave, onCancel }) => {
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    voucher_id: '',
    voucher_name: '',
    voucher_code: '',
    status: 'Active',  // Mặc định là 'Active'
    expiration_date: '',
    voucher_value: '',
  });

  // Load dữ liệu nếu chỉnh sửa
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['voucher_id', 'voucher_name', 'voucher_code', 'voucher_value'];
    const fieldLabels = {
      voucher_id: 'Mã voucher',
      voucher_name: 'Tên voucher',
      voucher_code: 'Mã code',
      expiration_date : 'Ngày hết hạn',
      voucher_value: 'Giá trị voucher',
    };

    const { valid, errors: info_validationErrors, firstError } = validateForm(formData, requiredFields, fieldLabels);

    if (!valid) {
      setNotification({ message: firstError, type: 'error' });
    } else {
      if (!initialData) setNotification({ message: 'Thêm voucher thành công!', type: 'success' });
      if (initialData) setNotification({ message: 'Cập nhật voucher thành công!', type: 'success' });
      onSave(formData);
    }
  };

  return (
    <>
      {initialData && (
        <div className={styles.closePoint} onClick={onCancel}>
          &times;
        </div>
      )}
      <div className={styles.adminTitle}>
        {initialData ? 'Chỉnh sửa voucher' : 'Thêm voucher mới'}
      </div>

      <Notification
        message={notification?.message} // Tránh lỗi khi notification là null
        type={notification?.type} // Tránh lỗi khi notification là null
        onClose={() => setNotification(null)}
      />

      <div className={styles.AddVouchersContainer}>
        <form className={styles.AddVouchersForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="voucher_id">Mã voucher:</label>
            <input
              type="text"
              id="voucher_id"
              name="voucher_id"
              value={formData.voucher_id}
              onChange={handleInputChange}
              placeholder="Nhập mã voucher"
            />
          </div>

          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="voucher_name">Tên voucher:</label>
            <input
              type="text"
              id="voucher_name"
              name="voucher_name"
              value={formData.voucher_name}
              onChange={handleInputChange}
              placeholder="Nhập tên voucher"
            />
          </div>

          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="voucher_code">Mã code:</label>
            <input
              type="text"
              id="voucher_code"
              name="voucher_code"
              value={formData.voucher_code}
              onChange={handleInputChange}
              placeholder="Nhập mã code"
            />
          </div>

          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="status">Trạng thái:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="inActive">inActive</option>
            </select>
          </div>
          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="expiration_date">Ngày hết hạn:</label>
            <input
              type="date"
              id="expiration_date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.AddVouchersFormGroup}>
            <label htmlFor="voucher_value">Giảm giá(%):</label>
            <input
              type="number"
              id="voucher_value"
              name="voucher_value"
              value={formData.voucher_value}
              onChange={handleInputChange}
              placeholder="Nhập giá trị voucher"
            />
          </div>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.AddVouchersSubmitBtn}>
              {initialData ? 'Cập nhật' : 'Thêm voucher'}
            </button>
            {initialData && (
              <button
                type="button"
                className={styles.unconfirm}
                onClick={onCancel}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVouchers;
