export const validateForm = (Form, requiredFields, fieldLabels) => {
  const errors = {};
  let firstError = "";

  requiredFields.forEach((field) => {
    const value = Form[field];
    if (!value || (typeof value === "string" && value.trim() === "")) {
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
    firstError: firstError,
  };
};
