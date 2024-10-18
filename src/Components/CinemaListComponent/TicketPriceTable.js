import React from 'react';
import styles from "./cinemaList.module.css"; // Nhập file CSS để tạo kiểu

export default function TicketPriceTable(){
    return (
        <div className={styles.ticketPriceTable}>
            <h2>BẢNG GIÁ VÉ</h2>
            <table>
                <thead>
                    <tr>
                        <th>Từ Thứ Hai Đến Chủ Nhật</th>
                        <th>Thứ Hai, Thứ Ba, Thứ Năm</th>
                        <th>Thứ Tư Vui Vẻ</th>
                        <th>Thứ Sáu, Thứ Bảy, Chủ Nhật Và Ngày Lễ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Khách Hàng Dưới 23 Tuổi/Thành Viên U22</td>
                        <td>65.000</td>
                        <td>50.000</td>
                        <td>65.000</td>
                    </tr>
                    <tr>
                        <td>Người Cao Tuổi</td>
                        <td>50.000</td>
                        <td>70.000</td>
                        <td>70.000</td>
                    </tr>
                    <tr>
                        <td>Trẻ Em</td>
                        <td>50.000</td>
                        <td>60.000</td>
                        <td>60.000</td>
                    </tr>
                    <tr>
                        <td>Người Lớn</td>
                        <td>70.000</td>
                        <td>65.000</td>
                        <td>95.000</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.additionalFees}>
                <p>PHỤ THU:</p>
                <ul>
                    <li>Ghế VIP: +5.000 (Miễn phụ thu cho U22 và Trẻ em)</li>
                    <li>3D: +30.000</li>
                    <li>Ngày Lễ/Tết: +10.000</li>
                </ul>
            </div>
            <div className={styles.note}>
                <h3>Lưu ý:</h3>
                <ul>
                    <li>- Vui lòng xuất trình thẻ thành viên CGV trước khi mua vé để được tích điểm.</li>
                    <li>- Giá vé khi đặt vé trực tuyến trên website và ứng dụng CGV là giá vé người lớn. Các loại vé như học sinh-sinh viên, vé trẻ em, vé người cao tuổi, vé U22 vui lòng mua trực tiếp tại quầy.</li>
                    <li>- Vé trẻ em chỉ xuất khi có sự hiện diện của trẻ dưới 1m3 và trên 2 tuổi.</li>
                    <li>- Vé người cao tuổi chỉ dành cho khách hàng trên 55 tuổi. Vui lòng xuất trình CMND khi mua vé.</li>
                    <li>- Giảm thêm 20% vào thứ 4 vui vẻ, thứ 2 cuối tháng (Culture day) cho khách hàng là trẻ em, người cao tuổi.</li>
                    <li>- Vui lòng xuất trình CCCD, CMND, giấy khai sinh, thẻ học sinh-sinh viên ... để mua vé ưu đãi (học sinh-sinh viên, vé trẻ em, vé người cao tuổi, vé U22).</li>
                </ul>
            </div>
        </div>
    );
}
