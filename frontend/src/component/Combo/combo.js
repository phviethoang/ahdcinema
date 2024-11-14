import React, { useState } from "react";
import styles from "../Combo/combo.module.css"; // Optional nếu bạn muốn thêm CSS riêng

const products = [
  {
    id: 1,
    name: "MY COMBO",
    description:
      "1 bắp ngọt lớn + 1 nước siêu lớn \n - Có phụ thu thêm tiền khi đổi vị bắp phô mai và bắp mix.\n- Nhận hàng trong ngày xem phim (khi mua cùng vé) hoặc trong ngày đã chọn (khi mua tại CGV Store)",
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

const TicketInfo = () => (
  <div className={styles.ticketInfo}>
    <button className={styles.navButtonPrev}>{"<"} PREVIOUS</button>
    <div className={styles.ticketDetails}>
      <img
        src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/dc33889b0f8b5da88052ef70de32f1cb/r/s/rsz_vnm3_intl_online_1080x1350_tsr_01.jpg"
        alt="Movie Poster"
        className={styles.moviePoster}
      />
      <div className={styles.movieInfo}>
        <p>
          <strong>VENOM: KÈO CUỐI</strong>
        </p>
        <p>2D</p>
        <p>T13</p>
      </div>
      <div className={styles.theaterInfo}>
        <p>
          <strong>CGV Vincom Center Bà Triệu</strong>
        </p>
        <p>16:00, 27/10/2024</p>
        <p>Cinema 8</p>
        <p>Ghế: Thường C5</p>
      </div>
      <div className={styles.priceInfo}>
        <p>Tên phim: 130.000,00 đ</p>
        <p>Combo: 0,00 đ</p>
        <p>
          <strong>Tổng: 130.000,00 đ</strong>
        </p>
      </div>
    </div>
    <button className={styles.navButtonNext}>{">"} NEXT</button>
  </div>
);

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
    <div className={styles.pageContainer}>
      <div className={styles.comboPage}>
        <div
          style={{
            fontSize: "24px",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          BOOKING ONLINE
        </div>
        <div className={styles.bookingHeader}>
          <p>CGV Vincom Center Bà Triệu | Cinema 8 | Số ghế (66/92)</p>
          <p>27/10/2024 16:00 ~ 27/10/2024 18:15</p>
          <div className={styles.countdown}>
            <span>Countdown Clock</span>
            <div className={styles.timer}>
              <span className={styles.minutes}>4</span> Minutes
              <span className={styles.seconds}> 39 </span> Seconds
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
                <div className={styles.productInfoText}>
                  <h3>{product.name}</h3>
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {product.description}
                  </p>
                  <p className={styles.productPrice}>
                    Giá: {product.price.toLocaleString()} đ
                  </p>
                </div>
                <div className={styles.quantityControls}>
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
    </div>
  );
};

export default ComboPage;
