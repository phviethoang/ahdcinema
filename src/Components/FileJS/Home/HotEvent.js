import style from '../../FileCSS/Home/HotEvent.module.css'
import Label from '../Cell/Label'
import React from 'react';
import { useNavigate } from 'react-router-dom';
function HotEvent(){
    const navigate = useNavigate()
    const events = [{
        id: 1,
        image:
          "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240x201.png", // Thay thế bằng đường dẫn hình ảnh
        dateRange: "22/12 - 24/12/2024",
        title: "Sự kiện 1",
      },
      {
        id: 2,
        image:
          "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/N_O_240x201.png",
        dateRange: "1/1 - 31/1/2025",
        title: "Sự kiện 2",
      },
      {
        id: 3,
        image:
          "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/112024/240-x-201-px.jpg",
        dateRange: " 1/11 - 31/12/2024",
        title: "Sự kiện 3",
      }]
    return(
        <div className={style.container}>
            <div className={style.label}>
                <Label classNameContent={style.content}
                        classNameDisplay={style.display}>Hot Event!!!</Label>
            </div>
            <div className={style.events}>
                {/* <div className={style.eachEvent}>
                    <div className={style.eventName}>SALE !!!</div>
                    <div className={style.eventContent}> Ngày 30/9, rạp phim AHD giảm giá 100% cho khách hàng đi 1 mình</div>
                    <div className={style.eventDescribe}>30/9 NÀY</div>
                </div>
                <div className={style.eachEvent}>
                    <div className={style.eventName}>SALE !!!</div>
                    <div className={style.eventContent}> Ngày 16/9, cơ sở AHD Hà Nội, AHD Nam Định khuyến mãi mua vé tặng bỏng đối với vé xem phim Yugioh</div>
                    <div className={style.eventDescribe}>16/9 NÀY</div>
                </div>
                <div className={style.eachEvent}>
                    <div className={style.eventName}>SALE !!!</div>
                    <div className={style.eventContent}> Ngày 11/9, rạp phim AHD giảm giá 50% cho khách hàng sinh nhật </div>
                    <div className={style.eventDescribe}>11/9 NÀY</div>
                </div> */}
                {events.map((each, id)=>
                <div className = {style.eachEvent} 
                onClick={()=>{navigate(`/EventPage/${each.id}`)}}
                style={{backgroundImage :`url(${each.image})`}}>
                    <div className={style.eventName}>{each.dateRange}</div>
                    {/* <img src = {each.image} className={style.eventContent}></img> */}
                </div>)}
            </div>
        </div>
    )
}
export default HotEvent; 