import style from '../../../FileCSS/BuyTicketPage/Step1/Step1.module.css'
import { useState} from 'react'
import clsx from 'clsx'
import ButtonType1 from '../../Cell/ButtonType1'
import DateTime from '../../Cell/DateTime'
import Cities from './Cities'
import TheaterAndTime from './TheaterAndTime'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
    function Step1({setTheater, setTime, setDate, setRoom, setRoomId}){
        const navigate = useNavigate();
    //Các biến đại diện cho ngày được chọn, thành phố được chọn, khung giờ chiếu và rạp được chọn
    //Ngày được chọn lấy từ sessionStorage, nếu không có thì trả về rỗng
    const[dateChoice, setDateChoice] = useState(
        ()=>
        {
            const dateData = sessionStorage.getItem('dateChoice');
            return dateData? dateData: '';
        }
    )
   
    //Thành phố được chọn lấy từ sessionStorage, nếu không có thì trả về rỗng
    const[cityChoice, setCityChoice] = useState(
        ()=>
        {
            const cityData = sessionStorage.getItem('cityChoice')
            return cityData? JSON.parse(cityData): ''
        }
    )
    //Giờ chiếu được chọn lấy từ sessionStorage, nếu không có thì trả về rỗng
    const[theaterChoice, setTheaterChoice] = useState(
        ()=>
            {
                const theaterData = sessionStorage.getItem('theaterChoice')
                return theaterData? theaterData: ''
            }
    )
    //BEGIN FETCH DATA
    //Khai báo các mảng sẽ chứa dữ liệu fetch về
    const [showDates, setShowDates] = useState([]);
    const [cities, setCity] = useState([])
    const [showTimes, setShowTimes] = useState([]);
    const tem = sessionStorage.getItem('movie_id')
    const [movieId, setMovieId] = useState(tem? JSON.parse(tem):'')
    // const movieId = tem? JSON.parse(tem):''
    // Hàm fetch data GET các ngày chiếu của phim đó
    useEffect(() => {
    fetch(`http://localhost:5000/ahd//buyticket/movie-showdates?movie_id=${movieId}`, {
        credentials: 'include', // Đảm bảo gửi cookie
    })
        .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
            // Xử lý khi chưa đăng nhập
            console.error('Unauthorized. Redirecting to login...');
            sessionStorage.setItem('redirectedLink', '/BuyTicket')
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
            sessionStorage.removeItem('redirectedLink')
            // Thời gian lấy ra từ db là thời gian thực như khi lấy ra thành thời gian quốc tế, nên bị thay đổi, cần convert lại
            const convertToLocalTime = (dateString) => {
                let date = new Date(dateString);
                // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
                date = date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });
                const day = date.substring(8,10)
                const month = date.substring(5,7)
                const year = date.substring(0,4)
                return {day, month, year, date}
            };

            // Lặp qua mảng và chuyển đổi các show_date
            if(data !== null){
                const convertedData = data.map(item => (
                    convertToLocalTime(item.show_date)
                ));
                setShowDates(convertedData)
            }
           
        })
        .catch(error => console.error('Error:', error));
    }, [movieId]);

    // if(tem) sessionStorage.removeItem('movie_id')
    const fetchData = async (url, setData) => {
        try {
        const response = await fetch(url, {
            credentials: "include", // Đảm bảo gửi cookie
        });

        if (!response.ok) {
            if (response.status === 401) {
            console.error("Unauthorized. Redirecting to login...");
            navigate("/login");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    // Hàm fetch các thành phố 
    const fetchCities = (movieId, dateChoice) => {
        const url = `http://localhost:5000/ahd/buyticket/movie-cities?movie_id=${movieId}&show_date=${dateChoice}`;
        fetchData(url, setCity);
    };
    // Hàm fetch các suất chiếu
    const fetchShowTimes = (movieId, dateChoice, cityId) => {
        const url = `http://localhost:5000/ahd/buyticket/movie-showtimes?movie_id=${movieId}&show_date=${dateChoice}&city_id=${cityId}`;
        fetchData(url, setShowTimes);
    };
    const [citiesChoosen, setCities] = useState(
        // ()=>{
        //     return cityChoice? <Cities 
        //     onclick={(event)=>{
        //         sessionStorage.setItem('cityChoice',event.currentTarget.getAttribute('data-support'))
        //         setCityChoice(event.currentTarget.getAttribute('data-support'))
        //     }}
        //     citiesChoosen={cities} 
        //     date = {dateChoice}></Cities> : ''
        // }
    )

    const [theaterChoosen, setTheaters] = useState(
        ()=> theaterChoice?<TheaterAndTime 
        theaterChoosen={showTimes.map(
            (each, id)=>{
                console.log(each)
                return{
                    name: each.cinema_name,
                    img: each.cinema_image,
                    time: each.show_time
                }
            }
        )}
        cityChoice={cityChoice}
        dateChoice={dateChoice}
        onclick = {(event) => {
            setTheater(event)
            setTime(event)
            setRoom(event)
        }}></TheaterAndTime>:''
    )
    //useEffect theo dõi sự thay đổi của việc chọn ngày, nếu ngày thay đổi thì thực hiện lấy data và setCity, 
    // tuy nhiên việc setCity chưa diễn ra ngay
    useEffect(()=>
    {
    if(dateChoice !== ''){
        fetchCities(movieId, dateChoice)
        sessionStorage.setItem('dateChoice',dateChoice)
        setCityChoice('')
    }
        }, [dateChoice])
    //vì setCity chưa diễn ra ngay nên chưa load được lên màn hình, 
    // dùng useEffect để theo dõi sự thay đổi của cities, 
    // khi nào setCity diễn ra làm cities thay đổi thì mới load lên màn hình
    useEffect(()=>{
        setCities(<Cities 
                    onclick={(event)=>{
                        sessionStorage.setItem('cityChoice',event.currentTarget.getAttribute('data-support'))
                        setCityChoice(event.currentTarget.getAttribute('data-support'))
                    }}
                    citiesChoosen={cities} 
                    date = {dateChoice}></Cities>)
    }, [cities])

    //useEffect theo dõi sự thay đổi của việc chọn thành phố, nếu thành phố thay đổi thì thực hiện lấy data và setShowTime,
    // tuy nhiên việc setShowTimes chưa diễn ra ngay
    useEffect(()=>{
        if(dateChoice !== '' && cityChoice !== '')
        {
            fetchShowTimes(movieId, dateChoice, cityChoice)
        }}
            , [cityChoice])
    //vì setShowTimes chưa diễn ra ngay nên chưa load được lên màn hình, 
    // dùng useEffect để theo dõi sự thay đổi của showTimes, 
    // khi nào setShowTimes diễn ra làm showtimes thay đổi thì mới load lên màn hình
    useEffect(()=>{
        console.log(showTimes)
        setTheaters(<TheaterAndTime 
            theaterChoosen={showTimes.map(
                (each, id)=>{
                    console.log(each)
                    return{
                        name: each.cinema_name,
                        img: each.cinema_image,
                        time: each.show_time,
                        room: each.room_number,
                        roomId: each.screeningroom_id
                    }
                }
            )}
            cityChoice={cityChoice}
            dateChoice={dateChoice}
            onclick = {(event) => {
                setTheater(event)
                setTime(event)
                setRoom(event)
                setRoomId(event)
            }}></TheaterAndTime> ) 
    }, [showTimes])
    const month = showDates.map(each =>
        <DateTime
        day = {each}
        onclick = {(event)=>{
            setDateChoice(each.date)
            setDate(event)
            setTheaters()
        }} 
        selectedDay={dateChoice}
        ></DateTime>
    )  
    
    return (
        <div className = {style.container}>
            <div className = {clsx(style.dateContainer, style.box)}>
                <div className={style.boxDisplay}></div>
                <div className = {clsx(style.content, style.dataContent)}>
                    <h4 className={style.label}>Ngày xem</h4>
                    <div className={style.dateBox}>
                        {month}
                    </div>
                </div>
            </div>
            <div className = {clsx(style.cityContainer, style.box)}>
                <div className={style.boxDisplay}></div>
                <div className={clsx(style.content, style.cityContent)}>
                    <div className={style.cityBox}>
                        {citiesChoosen}
                    </div>
                    <h4 className={style.label}>Tỉnh/Thành phố</h4>
                    
                </div>
            </div>
            <div className = {clsx(style.theaterAndTimeContainer, style.box)}>
                <div className={style.boxDisplay}></div>
                <h4 className={style.label}>Rạp và giờ chiếu</h4>
                <div className={style.content}>
                    {theaterChoosen}
                </div>
            </div>
        </div>
    )
}

export default Step1