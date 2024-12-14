import style from '../../../FileCSS/BuyTicketPage/Step1/Step1.module.css'
import { useState} from 'react'
import clsx from 'clsx'
import ButtonType1 from '../../Cell/ButtonType1'
import DateTime from '../../Cell/DateTime'
import Cities from './Cities'
import TheaterAndTime from './TheaterAndTime'
import React from 'react'
import { useEffect } from 'react'
    function Step1({setTheater, setTime, setDate}){
    const getNext30Days = () => {
        const days = [];
        const today = new Date();
        const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
                        "Aug", "Sep", "Oct", "Nov", "Dec"];

        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const Day = date.getDate(); // Ngày trong tháng (1-31)
            const Dweek = weekdays[date.getDay()]; // Lấy tên thứ
            const monthIndex= date.getMonth();  // Dùng để tính khoảng cách ngày
            const Month = months[date.getMonth()];
            days.push({ Day, Dweek, Month,monthIndex});
        }

        return days;
    };

    const tem = getNext30Days()

    const dateData ={}
    for (let i = 0; i<tem.length; i++){
        if(i%3==0) dateData[JSON.stringify(tem[i])]  = ['Hải Phòng', 'Hà Nội', 'Hồ Chí Minh']
        else if(i%3==1) dateData[JSON.stringify(tem[i])]  = ['Hà Nội', 'Đà Nẵng', 'Nam Định', 'Thanh Hóa']
        else dateData[JSON.stringify(tem[i])]=['Hà Nội', 'Hải Phòng', 'Hồ Chí Minh', 'Đà Nẵng']
    }
    

    const cityData={
        'Hải Phòng': ['AHD Aeon Mall | 3D', 'AHD Lạc Hồng | 2D', 'AHD Tam Bạc | 2D', 'AHD Lạch Tray | 3D'],
        'Hà Nội': ['AHD Times City', 'AHD Long Biên', 'AHD Hoàn Kiếm', 'AHD Trương Định'],
        'Hồ Chí Minh': ['AHD Quận Nhất', 'AHD Plaza']
    }
        
    const [theaterChoosen, setTheaters] = useState(()=> 
        {
            const theaterData = sessionStorage.getItem('theatersData');
            return theaterData?<TheaterAndTime 
                                theaterChoosen={JSON.parse(theaterData)}
                                onclick = {(event) => {
                                    setTheater(event)
                                    setTime(event)
                                }}></TheaterAndTime>:'';
        }       
    )
    const [citiesChoosen, setCities] = useState(()=>
        {
            const citiesData = sessionStorage.getItem('citiesData');
            return citiesData? <Cities 
            onclick={(event)=>{
                const tem = event.currentTarget.getAttribute('data-content')
                sessionStorage.setItem('theatersData', JSON.stringify(cityData[tem]))
                setTheaters(<TheaterAndTime 
                    theaterChoosen={cityData[event.currentTarget.getAttribute('data-content')]}
                    onclick = {(event) => {
                        setTheater(event)
                        setTime(event)
                    }}></TheaterAndTime>)
            }}
            citiesChoosen={JSON.parse(citiesData)}></Cities>:'';
        })

    function ShowCities(date){
        let temCities = dateData[date]
        sessionStorage.setItem('citiesData', JSON.stringify(temCities))
        setCities(<Cities 
            onclick={(event)=>{
                const tem = event.currentTarget.getAttribute('data-content')
                sessionStorage.setItem('theatersData', JSON.stringify(cityData[tem]))
                setTheaters(<TheaterAndTime 
                    theaterChoosen={cityData[event.currentTarget.getAttribute('data-content')]}
                    onclick = {(event) => {
                        setTheater(event)
                        setTime(event)
                        setDate(event)
                    }}></TheaterAndTime>)
            }}
            citiesChoosen={temCities}></Cities>)
        
        setTheaters()
    }


    const[dateChoice, setDateChoice] = useState(
        ()=>
        {
            const dateData = sessionStorage.getItem('dateData');
            return dateData? JSON.parse(dateData): '';
        }
    )
    
    
    let month = getNext30Days()
    month = month.map(each =>
        <DateTime
        day = {each}
        onclick = {()=>{
            ShowCities(JSON.stringify(each))
            setDateChoice(each.Day + " " + each.Month)
            sessionStorage.setItem('dateData',each.Day + " " + each.Month)
        }} 
        selectedDay={dateChoice}
        ></DateTime>
    )  
    
    
    useEffect( ()=>{
            sessionStorage.setItem('dateData', dateChoice);
        }, [dateChoice])

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