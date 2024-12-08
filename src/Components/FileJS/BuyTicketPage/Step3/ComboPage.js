import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import styles from "../../../FileCSS/BuyTicketPage/Step3/ComboPage.module.css";

const products = [
  {
                id: 1,
                name: "MY COMBO",
                description:
                [ "- 1 bắp ngọt lớn + 1 nước siêu lớn",
                    "- Có phụ thu thêm tiền khi đổi vị bắp phô mai và bắp mix.",
                    "- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                ],
                 
                price: 89000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/6644731d5a8f5_1715761949.png",
              },
              {
                id: 2,
                name: "CONAN CARD COLLECTION COMBO",
                description:
                    [
                    "- 20 bộ thẻ Conan Character In Action hoặc 20 bộ thẻ Conan Character In Photo (full box)",
                    "- Số lượng sản phẩm có hạn",
                    "- Tặng 02 nước ngọt siêu lớn + 01 bắp hai vị",
                    "- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                    ],
                price: 1099000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a33e4e9f754_1721974351.png",
              },
              {
                id: 3,
                name: "CONAN CARD COLLECTION COMBO",
                description:
                [
                  "- 10 bộ thẻ Conan Character In Action + 10 bộ thẻ Conan Character In Photo",
                  "- Tặng 02 nước ngọt siêu lớn + 01 bắp hai vị",
                  "- Số lượng sản phẩm có hạn",
                  "- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                ],
                price: 1199000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a33f02d71e6_1721974531.png",
              },
              {
                id: 4,
                name: "CONAN CARD COLLECTION COMBO",
                description:
                ["01 bộ thẻ Conan Character In Action + 01 bộ thẻ Conan Characrer In Photo",
                    "+ 01 nước ngọt siêu lớn + 01 bắp ngọt lớn",
                    "- Số lượng sản phẩm có hạn- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                ],
                price: 189000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a34186eed9e_1721975175.png",
              },
              {
                id: 5,
                name: "BT21 MININI SINGLE COMBO",
                description:
                ["BT21 MININI SINGLE COMBO01 ly hình nhân vật BT21 phiên bản Minini (kèm nước ngọt) + 01 bắp ngọt lớn",
                  "- Mẫu ly nhân vật phụ thuộc vào số lượng hàng hóa tại rạp",
                  "- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                ],
                price: 259000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66f0d475c9b68_1727059062.png",
              },
              {
                id: 6,
                name: "BT21 MININI SINGLE COMBO",
                description:
                ["02 ly nhân vật BT21 phiên bản Minini (kèm nước ngọt) + 01 bắp ngọt lớn",
                "- Mẫu ly nhân vật phụ thuộc vào số lượng hàng hóa tại rạp",
                "- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại AHD Store)"
                ],
                price: 499000,
                image:
                  "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66f0d49155719_1727059089.png",
              },
];



const ComboPage = ({ comboQuantities = [], onQuantitiesChange, sum}) => {
  const [quantities, setQuantities] = useState(
    comboQuantities.length > 0 ? comboQuantities : Array(products.length).fill(0) // Khởi tạo đúng mảng quantities
  );

  // Tính tổng tiền
  const calculateTotalPrice = (quantities) => {
    return quantities.reduce((total, quantity, index) => {
      const price = products[index]?.price || 0; // Đảm bảo rằng price hợp lệ
      return total + (quantity * price);
    }, 0);
  };

  useEffect(() => {
    const newCombo = products
      .map((product, i) => (quantities[i] > 0 ? `${product.name} x ${quantities[i]}` : null))
      .filter((item) => item !== null);

    const newTotalPrice = calculateTotalPrice(quantities);

    // Truyền dữ liệu ra ngoài
    onQuantitiesChange(quantities, newCombo, newTotalPrice);
  }, [quantities]); // Recalculate khi quantities thay đổi



  const handleQuantityChange = (index, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      const newQuantity = Math.max(0, (newQuantities[index] || 0) + delta); // Đảm bảo quantity không âm
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  };

  return (
    <div className={styles.comboPage}>
      <div>BOOKING ONLINE</div>
      <div className={styles.bookingHeader}>
        <div className={styles.countdown}>
          <div className={styles.timer}>
            <CountdownTimer initialMinutes={5} initialSeconds={0} />
          </div>
        </div>
      </div>

      <h2>Bắp Nước</h2>
      <div className={styles.products}>
        {products.map((product, index) => (
          <div key={product.id} className={styles.product}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <div>
                {product.description.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>

              <p>Giá: {product.price.toLocaleString()} đ</p>
              <div className={styles.quantityControls}>
                <button onClick={() => handleQuantityChange(index, -1)}>
                  -
                </button>
                <span>{quantities[index] || 0}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboPage;
