const fs = require("fs");
const path = require("path");

// Đường dẫn tới các file
const dbPath = path.resolve(__dirname, "db.json");
const backupPath = path.resolve(__dirname, "db_backup.json");

// Sao chép nội dung từ db-backup.json sang db.json
fs.copyFile(backupPath, dbPath, (err) => {
  if (err) {
    console.error("Khôi phục dữ liệu thất bại:", err);
  } else {
    console.log("Dữ liệu đã được khôi phục về trạng thái ban đầu.");
  }
});
