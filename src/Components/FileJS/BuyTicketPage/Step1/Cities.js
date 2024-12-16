import { useState } from "react";
import ButtonType1 from "../../Cell/ButtonType1";
import React from 'react'
import { useEffect } from "react";
function Cities({citiesChoosen, onclick, date}){
    // let cities = Array.isArray(citiesChoosen) ? citiesChoosen : []
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
    console.log(citiesChoosen)
    return(
        citiesChoosen.map((each,id) => 
        <ButtonType1
            support = {each.city_id} //support chưa city_id của thành phố, truyền ra trang chính để fetch dữ liệu rạp, giờ chiếu
            id={each.city_name + date}//id để phân biệt các nút chọn thành phố,
                                    // phục vụ cho việc highlight 1 thành phố khi được chọn
            onclick={(event) => {
            onclick(event)
            setCityChoice(event.currentTarget.getAttribute('data-id'))            
        }
        }
        sizeStyle='flexSquare' 
        choosen={cityChoice}
        >{each.city_name}</ButtonType1>
    )
)
}
export default Cities
