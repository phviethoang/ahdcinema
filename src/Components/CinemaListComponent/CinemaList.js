import React, { useState } from 'react';
import cinemaListStyle from "./cinemaList.module.css";
import TheaterDetail from "./TheaterDetail";
import ProductCollateral from "./ProductCollateral";

export default function CinemaList() {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);

    const handleProvinceClick = (province) => {
        setSelectedProvince(selectedProvince === province ? null : province);
        setSelectedTheater(null);
    };

    const handleTheaterClick = (theater) => {
        setSelectedTheater(selectedTheater === theater ? null : theater);
    };

    // Dữ liệu cho các tỉnh thành và rạp phim
    const provinces = [
        { name: "Hồ Chí Minh", code: "TPHoChiMinh", theaters: [
            "AHD Hùng Vương Plaza", "AHD Crescent Mall", "AHD Thảo Điền Pearl",
            "AHD Vincom Thủ Đức", "AHD Vivo City", "AHD Pearl Plaza",
            "AHD Liberty Citypoint", "AHD Vincom Đồng Khởi", "AHD Menas Mall",
            "AHD Pandora City", "AHD Aeon Tân Phú", "AHD Vincom Gò Vấp",
            "AHD Hoàng Văn Thụ", "AHD Aeon Bình Tân", "AHD Saigonres Nguyễn Xí"
        ]},
        { name: "Hà Nội", code: "HaNoi", theaters: [
            "AHD Vincom Bà Triệu", "AHD Hồ Gươm Plaza", "AHD Aeon Long Biên",
            "AHD Vincom Nguyễn Chí Thanh", "AHD Indochine Plaza Hà Nội", "AHD Rice City",
            "AHD Hà Nội Centerpoint", "AHD Vincom Royal City", "AHD Vincom Times City",
            "AHD Vincom Long Biên", "AHD Mac Plaza", "AHD Trương Định Plaza",
            "AHD Tràng Tiền Plaza", "AHD Sun Grand Thụy Khuê", "AHD Sun Grand Lương Yên"
        ]},
        { name: "Đà Nẵng", code: "DaNang", theaters: [
            "AHD Vĩnh Trung Plaza", "AHD Vincom Đà Nẵng"
        ]},
        { name: "Hải Phòng", code: "HaiPhong", theaters: [
            "AHD Vincom Hải Phòng", "AHD Aeon Mall Hải Phòng"
        ]},
        { name: "Cần Thơ", code: "CanTho", theaters: [
            "AHD Sense City", "AHD Vincom Xuân Khánh", "AHD Vincom Hùng Vương"
        ]}
    ];

    return (
        <div className={cinemaListStyle.theaterWrap}>
            <div className={cinemaListStyle.theaterListPreview}>
                <div className={cinemaListStyle.theaterShowtimeTop}></div>
                <div className={cinemaListStyle.theaterShowtimeCenter}>
                    <div className={cinemaListStyle.titleAhdCinema}>
                        <h2>AHD Cinema</h2>
                    </div>
                    <div className={cinemaListStyle.cinemasArea1}>
                        <ul className={cinemaListStyle.cinemasByProvince}>
                            {provinces.map((province) => (
                                <li key={province.code} onClick={() => handleProvinceClick(province.code)}>
                                    {province.name}
                                    {selectedProvince === province.code && (
                                        <span className={cinemaListStyle.underline}></span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cinemaListStyle.cinemasArea2}>
                        <ul className={cinemaListStyle.cinemasList}>
                            {selectedProvince && provinces.find(p => p.code === selectedProvince).theaters.map((theater, index) => (
                                <li key={theater} className={cinemaListStyle.ahdCity1} onClick={() => handleTheaterClick(theater)}>
                                    {theater}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={cinemaListStyle.theaterShowtimeBottom}></div>
            </div>
            <div className={cinemaListStyle.theaterContainerProductPreview}>
                {selectedProvince && selectedTheater && (
                    <>
                        <div className={cinemaListStyle.theaterLine}>
                            <div className={cinemaListStyle.line}></div>
                            <h2 className={cinemaListStyle.theaterTitle}>THEATER</h2>
                            <div className={cinemaListStyle.line}></div>
                        </div>
                        <h3 className={cinemaListStyle.selectedTheater}>{selectedTheater}</h3>
                        <TheaterDetail />
                        <ProductCollateral />
                    </>
                )}
            </div>
        </div>
    );
}
