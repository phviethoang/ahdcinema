import style from '../../FileCSS/Cell/Card.module.css'
import clsx from 'clsx';
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Card({src}){
    const navigate = useNavigate()
    return(
            <div className={clsx(style.cover, style.layer)}>
                <div className={style.card} style={{backgroundImage: `url(${src})`}}></div>
                <div className={clsx(style.info, style.layer)}>
                    <div className={style.describe}  onClick={()=>{navigate('\MoviePage')}}>
                        <div className={style.title}>TÊN PHIM</div>
                        <div className={style.type}>
                            <span className={style.typeLabel}>Thể loại: </span>
                            <div className={style.typeContent}>Hành động, Tâm lý, Tình cảm, Hài hước</div>
                        </div>
                        <div className={style.describtion}>
                            <span className={style.describtionLabel}>Mô tả: </span>
                            <div  className={style.describtionContent}>
                                Bộ phim là sản phẩm của nhà làm phim nổi tiếng AHD và được phát độc quyền tại các rạp của nhà AHD. Quy tụ dàn diễn viên nổi tiếng như: PVH, PTA, CTD, NDD, DMH
                            </div>
                        </div>
                    </div>
                    <button 
                        className={clsx(style.buyTicket, style.button)}
                        onClick={()=>{navigate('/BuyTicket')}}>BUY TICKET</button>

                </div>
            </div>
    )
}
export default Card;