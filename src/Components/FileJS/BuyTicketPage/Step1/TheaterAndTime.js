import { useState } from "react";
import style from '../../../FileCSS/BuyTicketPage/Step1/TheaterAndTime.module.css'
import ButtonType1 from "../../Cell/ButtonType1";
import React from 'react'
import { useEffect } from "react";
function TheaterAndTime({theaterChoosen, cityChoice, dateChoice, onclick}){
    let theater= Array.isArray(theaterChoosen) ? theaterChoosen : []
    const [theaterChoice, setTheaterChoice] = useState(
        ()=>
        {
            const theaterData = sessionStorage.getItem('theaterChoice')
            return theaterData? theaterData: ''
        }
    )
    useEffect(()=>
    {
        sessionStorage.setItem('theaterChoice', theaterChoice)
    }, [theaterChoice])
    return(
        theater.map((each, id) => 
            <div className = {style.theaterAndTimeItem} key={id}>

                <div className ={style.theaterName}>{each.name}</div>
                <div className ={style.theaterAndTimeBox}>
                            <ButtonType1
                                onclick={
                                    event =>
                                    {
                                        setTheaterChoice(event.currentTarget.getAttribute('data-id'))
                                        onclick(event)
                                    }
                                }
                                sizeStyle='flexSquare' 
                                id={each.time + each.name + cityChoice + dateChoice}
                                choosen={theaterChoice}
                                support={each}
                                support2={each.name}
                                support3={each.room}
                                support4={each.roomId}
                                >{each.time}</ButtonType1>
                </div>
            </div>)
    )
}

export default TheaterAndTime