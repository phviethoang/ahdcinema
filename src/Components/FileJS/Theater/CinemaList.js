import React, { useEffect, useState } from 'react';
import cinemaListStyle from "../../FileCSS/Theater/cinemaList.module.css";
import TheaterDetail from "./TheaterDetail";
import ProductCollateral from "./ProductCollateral";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import DateScroller from "./DateScroller";
import TicketPriceTable from "./TicketPriceTable";
import Header from '../header';
import Footer from '../footer';
import clsx from 'clsx'
export default function CinemaList() {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [activeTab, setActiveTab] = useState('lichChieu'); 
    
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    

    const handleProvinceClick = (province) => {
        setSelectedProvince(selectedProvince === province ? null : province);
        setSelectedTheater(null);
    };

    const handleTheaterClick = (theater) => {
        setSelectedTheater(selectedTheater === theater ? null : theater);
    };

    const [city, setCity] = useState([])
    let cityId = 0
    // Dữ liệu cho các tỉnh thành và rạp phim
   
        
    // useEffect(()=>{
    //     fetch('http://localhost:5000/api/cities')
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.text(); // Lấy dữ liệu raw
    // })
    // .then(text => {
    //     const data = text ? JSON.parse(text) : [];
    //     setCity(data);
    // })
    // .catch(error => console.error('Error:', error)) 
    // }, [])

    // const provinces=city.map( (each) => {return { 
    //     name: each.city_name,
    //     code: each.city_id,
    //     theaters: ()=>{
    //         let theater
    //         fetch(`http://localhost:5000/api/cinemas?city_id=${each.city_id}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.text(); // Lấy dữ liệu raw
    //         })
    //         .then(text => {
    //             theater = text ? JSON.parse(text) : [];
    //         })
    //         .catch(error => console.error('Error:', error))
    //         theater = theater.map(each => each.cinema_name)
    //         console.log(theater)
    //     return theater 
    //     }
        
    // }
       
    // })
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
            <Header></Header>
            <div className = {cinemaListStyle.bodyContainer}>
                 {/* <div className={cinemaListStyle.titleAhdCinema}>
                            <h2>AHD Cinema</h2>
                    </div> */}
                <div className={cinemaListStyle.theaterListPreview}>
                    <div className={cinemaListStyle.theaterShowtimeTop}></div>
                   
                    <div className={cinemaListStyle.theaterShowtimeCenter}>
                        
                    <div className={cinemaListStyle.cinemasArea1}>
                    <div className={cinemaListStyle.mainArea}>
                        <div className={cinemaListStyle.label}>Tỉnh/ Thành phố</div>
                        <ul className={cinemaListStyle.cinemasByProvince}>
                            {provinces.map((province) => (
                                <li 
                                className = {clsx({[cinemaListStyle.choosen]: selectedProvince == province.code, 
                                [cinemaListStyle.notChoosen]: selectedProvince !== province.code},
                                 cinemaListStyle.button)}key={province.code} 
                                 onClick={() => handleProvinceClick(province.code)}>
                                    {province.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                        

                    </div>
                    <div className={cinemaListStyle.cinemasArea2}>
                        <div className={cinemaListStyle.mainArea}>
                            <ul className={cinemaListStyle.cinemasList}>
                            {selectedProvince && provinces.find(p => p.code === selectedProvince).theaters.map((theater, index) => (
                                <li key={theater} 
                                className={
                                    // cinemaListStyle.ahdCity1
                                    clsx({[cinemaListStyle.choosen]: theater == selectedTheater, 
                                        [cinemaListStyle.notChoosen]: selectedTheater !== theater},
                                         cinemaListStyle.button)
                                    } onClick={() => handleTheaterClick(theater)}>
                                    {theater}
                                </li>
                            ))}
                            </ul>
                            <div className={cinemaListStyle.label}>Chọn rạp</div>
                        </div>
                        
                    </div>
                </div>
                <div className={cinemaListStyle.theaterShowtimeBottom}></div>
            </div>
            <div className={cinemaListStyle.theaterContainerProductPreview}>
                      <div className={cinemaListStyle.theaterLine}>
                            <div className={cinemaListStyle.label}>{selectedTheater? selectedTheater: "Chưa chọn rạp"}</div>
                        </div>  
                        {selectedProvince && selectedTheater && (
                    <div className={cinemaListStyle.mainContainer}>
                       <div className={cinemaListStyle.cinemaImage}>
                            <div className={cinemaListStyle.posterhungdzprvjp}>
                                <TheaterDetail />
                            </div> 
                            <div className={cinemaListStyle.schedule}>
                            {/* <ProductCollateral />   */}
                            <div className={cinemaListStyle.productCollateral}>
                                <ul className={cinemaListStyle.toggleTabs} style={{listStyleType: 'none'}}>
                                    <li >
                                        <div className={`${cinemaListStyle.tabItem} ${activeTab === 'lichChieu'? cinemaListStyle.pointing: ''}`} 
                                        onClick={
                                            () => handleTabClick('lichChieu')
                                        }
                                    >
                                        <span >
                                            {activeTab === 'lichChieu' && <FontAwesomeIcon icon={faHandPointRight} />} 
                                            Lịch chiếu
                                        </span>
                                        </div>
                                        <div className={cinemaListStyle.describe}>Xem thông tin các phim đang chiếu tại rạp</div>

                                    </li>
                                    <li>
                                        <div className={cinemaListStyle.describe}>Thông tin chi tiết giá vé</div>
                                        <div className={`${cinemaListStyle.tabItem} ${activeTab === 'giaVe'? cinemaListStyle.pointing: ''}
                                        `} 
                                        onClick={() => handleTabClick('giaVe')}>
                                            <span >
                                                {activeTab === 'giaVe' && <FontAwesomeIcon icon={faHandPointRight} />} {/* Hiển thị icon nếu tab hiện tại */}
                                                 Giá vé
                                            </span>
                                        </div>
                                       
                                    </li>
                                </ul>
                            </div>
                            </div> 
                       </div>
                       

                         <div className={cinemaListStyle.tabContent}>
                        {activeTab === 'lichChieu' && (
                            <div>
                                <DateScroller/>
                            </div>
                        )}
                        {activeTab === 'giaVe' && (
                            <div>
                                <TicketPriceTable/>
                            </div>
                        )}
                        </div>
                    </div>
                   

                )}
            </div>
            </div>
            
            <Footer></Footer>
        </div>
    );
}
