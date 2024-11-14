import React, { useState } from "react";
import "../../../FileCSS/BuyTicketPage/Step3/combo.module.css";
const products = [
  {
    id: 1,
    name: "MY COMBO",
    description:
      "1 bắp ngọt lớn + 1 nước siêu lớn\n- Có phụ thu thêm tiền khi đổi vị bắp phô mai và bắp mix.\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 89000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/6644731d5a8f5_1715761949.png",
  },
  {
    id: 2,
    name: "CONAN CARD COLLECTION COMBO",
    description:
      "20 bộ thẻ Conan Character In Action hoặc 20 bộ thẻ Conan Character In Photo (full box)\n- Số lượng sản phẩm có hạn\n- Tặng 02 nước ngọt siêu lớn + 01 bắp hai vị\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 1099000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a33e4e9f754_1721974351.png",
  },
  {
    id: 3,
    name: "CONAN CARD COLLECTION COMBO",
    description:
      "10 bộ thẻ Conan Character In Action + 10 bộ thẻ Conan Character In Photo\n- Tặng 02 nước ngọt siêu lớn + 01 bắp hai vị\n- Số lượng sản phẩm có hạn\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 1199000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a33f02d71e6_1721974531.png",
  },
  {
    id: 4,
    name: "CONAN CARD COLLECTION COMBO",
    description:
      "01 bộ thẻ Conan Character In Action + 01 bộ thẻ Conan Characrer In Photo\n + 01 nước ngọt siêu lớn + 01 bắp ngọt lớn\n- Số lượng sản phẩm có hạn- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 189000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66a34186eed9e_1721975175.png",
  },
  {
    id: 5,
    name: "BT21 MININI SINGLE COMBO",
    description:
      "BT21 MININI SINGLE COMBO01 ly hình nhân vật BT21 phiên bản Minini (kèm nước ngọt) + 01 bắp ngọt lớn\n- Mẫu ly nhân vật phụ thuộc vào số lượng hàng hóa tại rạp\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 259000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66f0d475c9b68_1727059062.png",
  },
  {
    id: 6,
    name: "BT21 MININI SINGLE COMBO",
    description:
      "02 ly nhân vật BT21 phiên bản Minini (kèm nước ngọt) + 01 bắp ngọt lớn\n- Mẫu ly nhân vật phụ thuộc vào số lượng hàng hóa tại rạp\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
    price: 499000,
    image:
      "https://iguov8nhvyobj.vcdn.cloud/media/concession/web/66f0d49155719_1727059089.png",
  },
];
const ComboPage = () => {
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));

  const handleQuantityChange = (index, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(0, newQuantities[index] + delta);
      return newQuantities;
    });
  };

  return (
    <div className={style.comboPage}>
      <div
        style={{
          fontSize: "24px",
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        BOOKING ONLINE
      </div>
      <div className={style.bookingHeader}>
        <p>CGV Vincom Center Bà Triệu | Cinema 8 | Số ghế (66/92)</p>
        <p>27/10/2024 16:00 ~ 27/10/2024 18:15</p>
        <div className={style.countdown}>
          <span>Countdown Clock</span>
          <div className={style.timer}>
            <span className={style.minutes}>4</span> Minutes
            <span className={style.seconds}>39</span> Seconds
          </div>
        </div>
      </div>

      <h2>Bắp Nước</h2>
      <div className={style.products}>
        {products.map((product, index) => (
          <div key={product.id} className={style.product}>
            <img
              src={product.image}
              alt={product.name}
              className={productImage}
            />
            <div className={style.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Giá: {product.price.toLocaleString()} đ</p>
              <div className={style.quantityControls}>
                <button onClick={() => handleQuantityChange(index, -1)}>
                  -
                </button>
                <span>{quantities[index]}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <TicketInfo />
    </div>
  );
};

export default ComboPage;