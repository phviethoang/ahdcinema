import { useState } from "react";
import ButtonType1 from "../../Cell/ButtonType1";
import React from 'react'
import { useEffect } from "react";
function Cities({citiesChoosen, onclick}){
    let cities = Array.isArray(citiesChoosen) ? citiesChoosen : []
    const [cityChoice, setCityChoice] = useState(
        ()=>
        {
            const cityChoice = sessionStorage.getItem('cityChoice');
            return cityChoice? JSON.parse(cityChoice): '';
        }
    )
    useEffect(()=>{
        sessionStorage.setItem('cityChoice', JSON.stringify(cityChoice))
    }, [cityChoice])
    return(
        cities.map((each,id) => 
        <ButtonType1
            id={id + citiesChoosen}
            onclick={(event) => {
            onclick(event)
            setCityChoice(event.currentTarget.getAttribute('data-id'))            
        }
        }
        sizeStyle='flexSquare' 
        choosen={cityChoice}
        >{each}</ButtonType1>
    )
)
}
export default Cities
