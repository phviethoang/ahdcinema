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
import DateTime from '../Cell/DateTime'
export default function CinemaList() {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(null)
    const [activeTab, setActiveTab] = useState('lichChieu'); 
    const [theaterChoosen, setTheaterChoosen] = useState()
   

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    

    const handleProvinceClick = (province) => {
        setSelectedProvince(selectedProvince === province ? null : province);
        setSelectedTheater(null);
    };

    const handleTheaterClick = (theater) => {
        setSelectedTheater(selectedTheater === theater.cinema_name ? null : theater.cinema_name);
        setTheaterChoosen(theater)
    };

    const [city, setCity] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/ahd/cities')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        setCity(data);
    })
    .catch(error => console.error('Error:', error));
    },[])

    const [cinema, setCinema] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/ahd/cinemas?city_id=${selectedProvince}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        setCinema(data);
    })
    .catch(error => console.error('Error:', error));
    },[selectedProvince])

    const [showtime, setShowtime]=useState([])
    useEffect(()=>{
        if(theaterChoosen != null && selectedDateTime != null)
        {
            const cinema_id = theaterChoosen.cinema_id
            const show_date = JSON.stringify(selectedDateTime)
            fetch(`http://localhost:5000/ahd/showtimes?cinema_id=${cinema_id}&show_date=${show_date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                setShowtime(data);
            })
            .catch(error => console.error('Error:', error));
        }
        
    },[selectedDateTime, theaterChoosen])


    // thống kê showtime theo movie_id
    function groupByMovie(showtime){
        const result = {}
        for( let i = 0; i< showtime.length; i++)
        {
            if(! ((showtime[i].movie_id) in result)){
                result[showtime[i].movie_id] = {
                    movie_id: showtime[i].movie_id,
                    poster: showtime[i].movie_image,
                    title: showtime[i].movie_name,
                    show_date: JSON.stringify(selectedDateTime),
                    showtimes: [{
                        full_show_time: showtime[i],
                        show_time: showtime[i].show_time,
                        room: showtime[i].room_number,
                        roomId: showtime[i].screeningroom_id
                    }],
                    theater: showtime[i].cinema_name

                }
            }
            else {
                result[showtime[i].movie_id].showtimes.push(
                    {
                        show_time: showtime[i].show_time,
                        room: showtime[i].room_number,
                        roomId: showtime[i].screeningroom_id
                    }
                )
            }
        }    
        const returnResult = []
        for(let key in result)
        {
            returnResult.push(result[key])
        }
        return returnResult

    }
    const [moviesInDay, setMoviesInDay] = useState([]) 
    useEffect(
        ()=>
        {
            if(showtime != null){
                console.log(groupByMovie(showtime))
                setMoviesInDay(groupByMovie(showtime))
                setDataShowing(
                )
            }
            else{
                setMoviesInDay(null)
            }
        }, [showtime]
    )

    const [dataShowing, setDataShowing] = useState( <DateScroller 
        moviesInDay = {moviesInDay}
        onclick={(event)=>{
        console.log(event.currentTarget.getAttribute('data-support'))
        setSelectedDateTime(event.currentTarget.getAttribute('data-support'))
    }
}/> )
    useEffect(
        ()=>{
            if(activeTab === 'lichChieu' && (moviesInDay != null))
            {
                console.log(activeTab)
                setDataShowing(
                    <DateScroller 
                        moviesInDay = {moviesInDay}
                        onclick={(event)=>{
                            console.log(event.currentTarget.getAttribute('data-support'))
                            setSelectedDateTime(event.currentTarget.getAttribute('data-support'))
                        }
                    }/> )    
            }
            else if( activeTab === 'giaVe' && (moviesInDay != null))
            {
                setDataShowing(<TicketPriceTable/>)
            }
        }, [activeTab, moviesInDay]
    )
    return (
        <div className={cinemaListStyle.theaterWrap}>
            <Header></Header>
            <div className = {cinemaListStyle.bodyContainer}>
                <div className={cinemaListStyle.theaterListPreview}>
                    <div className={cinemaListStyle.theaterShowtimeTop}></div>
                   
                    <div className={cinemaListStyle.theaterShowtimeCenter}>
                        
                    <div className={cinemaListStyle.cinemasArea1}>
                    <div className={cinemaListStyle.mainArea}>
                        <div className={cinemaListStyle.label}>Tỉnh/ Thành phố</div>
                        <ul className={cinemaListStyle.cinemasByProvince}>
                            {city.map((province) => (
                                <li 
                                className = {clsx({[cinemaListStyle.choosen]: selectedProvince === province.city_id, 
                                [cinemaListStyle.notChoosen]: selectedProvince !== province.city_id},
                                 cinemaListStyle.button)} 
                                 key={province.city_name} 
                                 onClick={() => handleProvinceClick(province.city_id)}>
                                    {province.city_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                        

                    </div>
                    <div className={cinemaListStyle.cinemasArea2}>
                        <div className={cinemaListStyle.mainArea}>
                            <ul className={cinemaListStyle.cinemasList}>
                            {selectedProvince && cinema.map((theater, index) => (
                                <li key={theater.cinema_id} 
                                className={
                                    clsx({[cinemaListStyle.choosen]: theater.cinema_name == selectedTheater, 
                                        [cinemaListStyle.notChoosen]: selectedTheater !== theater.cinema_name},
                                         cinemaListStyle.button)
                                    } onClick={() => handleTheaterClick(theater)}>
                                    {theater.cinema_name}
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
                                <TheaterDetail/>
                            </div> 
                            <div className={cinemaListStyle.schedule}>
                            {/* <ProductCollateral />   */}
                            <div className={cinemaListStyle.productCollateral}>
                                <ul className={cinemaListStyle.toggleTabs} style={{listStyleType: 'none'}}>
                                    <li >
                                        <div className={`${cinemaListStyle.tabItem} ${activeTab === 'lichChieu'? cinemaListStyle.pointing: ''}`} 
                                        onClick={
                                            () => setActiveTab('lichChieu')
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
                                        onClick={() =>{
                                            setActiveTab('giaVe')
                                            
                                            }}>
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
                                {/* <div>
                                    {
                                        dataShowing
                                    }
                                </div> */}
                        {activeTab === 'lichChieu' && (
                            <div>
                                <DateScroller 
                                    moviesInDay = {moviesInDay}
                                    onclick={(event)=>{
                                        console.log(event.currentTarget.getAttribute('data-support'))
                                        setSelectedDateTime(event.currentTarget.getAttribute('data-support'))
                                    }
                                    }/>     
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
