import { useState } from "react";
import style from '../../../FileCSS/BuyTicketPage/Step1/TheaterAndTime.module.css'
import ButtonType1 from "../../Cell/ButtonType1";
import React from 'react'
import { useEffect } from "react";
function TheaterAndTime({theaterChoosen, onclick,}){
    const timeData={
        'AHD Aeon Mall | 3D': ['8:00 am', '10:00 am', '3:00 pm', '5:00 pm', '7:00 pm'],
        'AHD Lạc Hồng | 2D': ['9:00 am', '3:00 pm', '7:30 pm'],
        'AHD Lạch Tray | 3D': ['8:30 am', '10:00 am', '3:30 pm', '4:30 pm'],
        'AHD Tam Bạc | 2D': ['9:00 am', '3:40 pm', '7:30 pm']
    }
    // console.log(theaterChoosen)
    let theater= Array.isArray(theaterChoosen) ? theaterChoosen : []
    const [theaterChoice, setTheaterChoice] = useState(
        ()=>
        {
            const theaterData = sessionStorage.getItem('theaterChoice')
            return theaterData? JSON.parse(theaterData): ''
        }
    )
    useEffect(()=>
    {
        sessionStorage.setItem('theaterChoice', JSON.stringify(theaterChoice))
    }, [theaterChoice])
    return(
        theater.map((each, id) => 
            <div className = {style.theaterAndTimeItem} key={id}>
                <div className ={style.theaterName}>{each}</div>
                <div className ={style.theaterAndTimeBox}>
                    {
                        timeData[each].map((eachTime, id)=>
                            <ButtonType1
                                onclick={
                                    event =>
                                    {
                                        setTheaterChoice(event.currentTarget.getAttribute('data-id'))
                                        onclick(event)
                                    }
                                }
                                sizeStyle='flexSquare' 
                                id={id + each}
                                choosen={theaterChoice}
                                support={each}
                                >{eachTime}</ButtonType1>)
                    }
                </div>
            </div>)
    )
}

export default TheaterAndTime