import React from 'react';
import styles from '../../FileCSS/MemberPage/member.module.css';


const calculateRemainingDays = (expiryDate) => {
  const temp = new Date(expiryDate); // Ngày hết hạn
  const today = new Date(); // Ngày hôm nay
  const timeDifference = temp - today; // Hiệu số thời gian (milliseconds)
  const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Chuyển đổi sang ngày
  return days >= 0 ? days : 0; // Đảm bảo không trả về số âm
};


function MemberInfoTable({ membershipLevel, expiryDate, purchaseDate, memberInfo, userBenefits}) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.profileContainer}>
        <img src={memberInfo.user_image} alt="Profile" className={styles.profileImage} />
        <div style={{ fontSize: "25px", fontWeight: "bold" }}>
          {memberInfo.fullname}
        </div>
      </div>
      <div className={styles.tableContent}>
        <h2>Bảng Thông Tin Thành Viên</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.memberTable}>
            <thead>
              <tr>
                <th>HẠNG THẺ</th>
                <th>NGÀY KÍCH HOẠT</th>
                <th>NGÀY HẾT HẠN</th>
                <th>QUYỀN LỢI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Khách hàng<br />{membershipLevel}</td>
                <td>{purchaseDate}</td>
                <td>{expiryDate}</td>
                <td>
                  <ul style={{ listStyle: "none"}}>
                  {userBenefits.map(benefit => {
                    return <li key={benefit}>{benefit}</li>;
                  })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
            {/* Thông báo hạng thẻ và số ngày còn lại, chỉ hiển thị nếu không phải STANDARD */}
        {membershipLevel == "Standard"? 
            (<p className={styles.membershipInfo}>
            Bạn đang sử dụng thẻ STANDARD
            </p>)
        : 
          (<p className={styles.membershipInfo}>
              Bạn đang sử dụng thẻ {membershipLevel} và còn {calculateRemainingDays(expiryDate)} ngày trước khi hết hạn.
          </p>)
        }
      </div>
    </div>
  );
}

export default MemberInfoTable;
