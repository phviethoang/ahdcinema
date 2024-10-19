import style from './HotEvent.module.css'
import Label from '../CellComponent/Label/Label.js'
function HotEvent(){
    return(
        <div className={style.container}>
            <div className={style.label}>
                <Label classNameContent={style.content}
                        classNameDisplay={style.display}>Hot Event!!!</Label>
            </div>
            <div className={style.events}>
                <div className={style.eachEvent}>
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
                </div>
            </div>
        </div>
    )
}
export default HotEvent; 