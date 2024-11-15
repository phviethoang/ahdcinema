

/**
 * Hàm kiểm tra các trường bắt buộc trong form.
 * @param {Object} Form - Dữ liệu của form.
 * @param {Array} requiredFields - Danh sách các trường bắt buộc.
 * @param {Object} fieldLabels - Đối tượng ánh xạ giữa tên trường và nhãn hiển thị.
 * @returns {Object} - Kết quả kiểm tra với các thông báo lỗi và trạng thái hợp lệ.
 */

  // validateForm.js
export const validateForm = (Form, requiredFields, fieldLabels) => {
  const errors = {};
  let firstError = '';

  requiredFields.forEach(field => {
    if (!Form[field] || Form[field].trim() === '') {
      errors[field] = `${fieldLabels[field]} là bắt buộc.`;
      if (!firstError) {
        firstError = `Vui lòng nhập ${fieldLabels[field]}`;
      }
    }
  });

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    firstError: firstError
  };
};

  