import React, { useState } from "react";
import styles from "./VouchersList.module.css"; 
import Notification from '../Notification/Notification'; 
import AddVouchers from "./AddVouchers"; 
import {isEqual} from '../../utils/isEqual'

const VouchersList = () => {

  const [voucherData, setVoucherData] = useState([
    {
      voucher_id: 1,
      voucher_name: "Voucher 1",
      voucher_code: "Voucherso1",
      voucher_value: 10,
      expiration_date: "2024-12-31",
      status: "Active",
    },
    {
      voucher_id: 2,
      voucher_name: "Voucher 2",
      voucher_code: "Voucherso2",
      voucher_value: 20,
      expiration_date: "2025-01-15",
      status: "inActive",
    },
    {
      voucher_id: 3,
      voucher_name: "Voucher 3",
      voucher_code: "Voucherso3",
      voucher_value: 15,
      expiration_date: "2024-11-20",
      status: "Active",
    },
    {
      voucher_id: 4,
      voucher_name: "Voucher 4",
      voucher_code: "Voucherso4",
      voucher_value: 30,
      expiration_date: "2024-10-15",
      status: "inActive",
    },
    // Thêm các voucher khác ở đây...
  ]);

  const [notification, setNotification] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  
  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
  };

  const handleSave = (updatedVoucher) => {
    const voucherBeforeUpdate = voucherData.find((voucher) => voucher.voucher_id === updatedVoucher.voucher_id);
    if (isEqual(voucherBeforeUpdate, updatedVoucher)) {
      setNotification({ message: "Không có sự thay đổi nào trong voucher.", type: "error" });
      return;
    }
    setVoucherData((prevData) =>
      prevData.map((voucher) =>
        voucher.voucher_id === updatedVoucher.voucher_id ? updatedVoucher : voucher
      )
    );
    setEditingVoucher(null);
    setNotification({ message: "Cập nhật voucher thành công", type: "success" });
  };

  const handleDelete = (voucherId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa voucher này không?");
    if (confirmed) {
      setVoucherData((prevData) => prevData.filter((voucher) => voucher.voucher_id !== voucherId));
      setNotification({ message: "Xóa voucher thành công", type: "success" });
    }
  };

  const [filters, setFilters] = useState({
    voucher_name: "",
    expiration_date: "",
    status: "",
    minDiscount: "",
    maxDiscount: "",
  });

  const filteredVouchers = voucherData.filter((item) => {
    const {
      voucher_name: inputVoucherName,
      expiration_date: inputExpirationDate,
      status: selectedStatus,
      minDiscount,
      maxDiscount,
    } = filters;

    const matchesVoucherName = inputVoucherName ? item.voucher_name.toLowerCase().includes(inputVoucherName.toLowerCase()) : true;
    const matchesExpirationDate = inputExpirationDate ? item.expiration_date < inputExpirationDate : true;
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    const matchesMinDiscount = minDiscount ? item.voucher_value >= minDiscount : true
    const matchesMaxDiscount = maxDiscount ? item.voucher_value <= maxDiscount : true;
    return matchesVoucherName && matchesExpirationDate && matchesStatus && matchesMinDiscount && matchesMaxDiscount;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại tất cả bộ lọc không?")) {
      setFilters({
        voucher_name: "",
        expiration_date: "",
        status: "",
        minDiscount: "",
        maxDiscount: "",
      });
      setNotification({ message: "Đặt lại tìm kiếm thành công!", type: "success" });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(voucherData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVouchers = filteredVouchers.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.tableContainer}>
      <Notification
        message={notification?.message}
        type={notification?.type}
        onClose={() => setNotification(null)}
      />
      {editingVoucher && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AddVouchers
              initialData={editingVoucher}
              onSave={handleSave}
              onCancel={() => setEditingVoucher(null)}
            />
          </div>
        </div>
      )}
      <div className={styles.adminTitle}>Danh sách Voucher</div>
      <div className={styles.formRow}>
        <div className={styles.itemFormGroup}>
          <label htmlFor="voucher_name">Tên voucher:</label>
          <input
            type="text"
            id="voucher_name"
            name="voucher_name"
            value={filters.voucher_name}
            onChange={handleFilterChange}
            placeholder="Nhập tên Voucher"
          />
        </div>
        <div className={styles.itemFormGroup}>
          <label htmlFor="expiration_date">Còn hạn trước:</label>
          <input
            type="date"
            id="expiration_date"
            name="expiration_date"
            value={filters.expiration_date}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.itemFormGroup}>
          <label>Trạng thái:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">-- Chọn trạng thái --</option>
            <option value="Active">Active</option>
            <option value="inActive">inActive</option>
          </select>
        </div>
        <div className={styles.itemFormGroup}>
          <label className={styles.discountInputs}>Giảm giá từ:</label>
          <div className={styles.discountInputs}>
            <input
              type="number"
              name="minDiscount"
              value={filters.minDiscount}
              onChange={handleFilterChange}
              placeholder="0"
            />
            <input
              type="number"
              name="maxDiscount"
              value={filters.maxDiscount}
              onChange={handleFilterChange}
              placeholder="100"
            />
          </div>
        </div>
      </div>
      <div className={styles.marginResetButton}>
        <button className={styles.resetButton} onClick={handleResetFilters}>
          Đặt lại tìm kiếm
        </button>
      </div>
      <table className={styles.voucherTable}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên voucher</th>
            <th>Giảm giá (%)</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentVouchers.map((voucher, index) => (
            <tr key={voucher.id}>
              <td>{index+1}</td>
              <td>{voucher.voucher_name}</td>
              <td>{voucher.voucher_value}</td>
              <td>{voucher.expiration_date}</td>
              <td>{voucher.status}</td>
              <td>
                <div className={styles.editnDeleteButton}>
                  <button onClick={() => handleEdit(voucher)} className={styles.editButton}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(voucher.voucher_id)} className={styles.deleteButton}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default VouchersList;
