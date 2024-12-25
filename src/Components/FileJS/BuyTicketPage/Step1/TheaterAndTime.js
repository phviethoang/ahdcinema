import { useState } from "react";
import style from '../../../FileCSS/BuyTicketPage/Step1/TheaterAndTime.module.css'
import ButtonType1 from "../../Cell/ButtonType1";
import React from 'react'
import { useEffect } from "react";
function TheaterAndTime({theaterChoosen, cityChoice, dateChoice, onclick}){
    let tem = Array.isArray(theaterChoosen) ? theaterChoosen : []
    // console.log(theaterChoosen)
    
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

    let l = 0
    let format = {}
    let theater = []
    for(let i = 0; i< theaterChoosen.length; i++){
        if(!(theaterChoosen[i].name in format)){
            format[theaterChoosen[i].name] = [theaterChoosen[i]]
            theater.push({
                name: theaterChoosen[i].name,
                object: []
            }) 
        }
        else{
            format[theaterChoosen[i].name].push(theaterChoosen[i])
        }
    }

    for(let i = 0; i<theater.length; i++)
    {
        theater[i].object = format[theater[i].name]
    }
    return(
        theater.map((each, id) => 
            <div className = {style.theaterAndTimeItem} key={id}>

                <div className ={style.theaterName}>{each.name}</div>
                <div className ={style.theaterAndTimeBox}>
                    {
                        each.object.map( (showtime) =>
                        <ButtonType1
                                onclick={
                                    event =>
                                    {
                                        setTheaterChoice(event.currentTarget.getAttribute('data-id'))
                                        onclick(event)
                                    }
                                }
                                sizeStyle='flexSquare' 
                                id={showtime.time + showtime.name + cityChoice + dateChoice}
                                choosen={theaterChoice}
                                support={showtime}
                                support2={showtime.name}
                                support3={showtime.room}
                                support4={showtime.roomId}
                                >{showtime.time}</ButtonType1>
                        )
                    }
                            
                </div>
            </div>)
    )
}

export default TheaterAndTime