import style from '../../FileCSS/BuyTicketPage/TicketInfo.module.css'
import clsx from 'clsx'
import React from 'react'
function TicketInfo({theater, time, date, nextPage, prePage}){
    return(
        <div className={style.ticketInfo}>
        <button 
          onClick={prePage}
          className= {clsx(style.navButton, style.prev)}>{"<"} PREVIOUS</button>
        <div className={style.ticketDetails}>
          <img
            src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/dc33889b0f8b5da88052ef70de32f1cb/r/s/rsz_vnm3_intl_online_1080x1350_tsr_01.jpg"
            alt="Movie Poster"
            className={style.moviePoster}
          />
          <div className={style.movieInfo}>
            <p>
              <strong>VENOM: KÈO CUỐI</strong>
            </p>
            <p>2D</p>
            <p>T13</p>
          </div>
          <div className={style.theaterInfo}>
            <p>
              <strong>{theater}</strong>
            </p>
            <p>{time}, {date}/10/2024</p>
            <p>Cinema 8</p>
            <p>Ghế: Thường C5</p>
          </div>
          <div className={style.priceInfo}>
            <p>Tên phim: 130.000,00 đ</p>
            <p>Combo: 0,00 đ</p>
            <p>
              <strong>Tổng: 130.000,00 đ</strong>
            </p>
          </div>
        </div>
        <button 
          onClick={nextPage}
          className={clsx(style.navButton, style.next)}>{">"} NEXT</button>
      </div>
    )
}

export default TicketInfo