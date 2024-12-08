import React from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';
import albaz from '../../../img/MemberInfoImage/albaztheShrouded.png';

function MemberInfoTable({ membershipLevel, expiryDate, daysRemaining }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.profileContainer}>
        <img src={albaz} alt="Profile" className={styles.profileImage} />
      </div>
      <div className={styles.tableContent}>
        <h2>Bảng Thông Tin Thành Viên</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.memberTable}>
            <thead>
              <tr>
                <th>SỐ THẺ</th>
                <th>HẠNG THẺ</th>
                <th>NGÀY KÍCH HOẠT</th>
                <th>TỔNG CHI TIÊU</th>
                <th>THÔNG TIN THẺ</th>
                <th>NGÀY HẾT HẠN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9002000001851263<br />(Đang dùng)</td>
                <td>Khách hàng<br />{membershipLevel}</td>
                <td>11/10/2022</td>
                <td>1.506.000 đ</td>
                <td>Quyền lợi: </td>
                <td>{expiryDate || '-'}</td> {/* Hiển thị ngày hết hạn hoặc dấu '-' nếu chưa có */}
              </tr>
            </tbody>
          </table>
        </div>
            {/* Thông báo hạng thẻ và số ngày còn lại, chỉ hiển thị nếu không phải STANDARD */}
        {membershipLevel == "STANDARD"? 
            (<p className={styles.membershipInfo}>
            Bạn đang sử dụng thẻ STANDARD
            </p>)
        : 
            (<p className={styles.membershipInfo}>
                Bạn đang sử dụng thẻ {membershipLevel} và còn {daysRemaining} ngày trước khi hết hạn.
            </p>)
        }
      </div>
    </div>
  );
}

export default MemberInfoTable;
