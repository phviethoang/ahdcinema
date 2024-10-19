import style from './Card.module.css'
import clsx from 'clsx';
function Card({src}){
    return(
            <div className={clsx(style.cover, style.layer)} >
                <div className={style.card} style={{backgroundImage: `url(${src})`}}></div>
                <div className={clsx(style.info, style.layer)}>
                    <div className={style.describe}>
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
                <button className={clsx(style.buyTicket, style.button)}>BUY TICKET</button>

            </div>
            </div>
    )
}
export default Card;