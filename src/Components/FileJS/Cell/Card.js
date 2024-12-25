import style from '../../FileCSS/Cell/Card.module.css'
import clsx from 'clsx';
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Card({src, movieInfo}){
    const navigate = useNavigate()
    return(
            <div className={clsx(style.cover, style.layer)}>
                <div className={style.card} 
                >
                    <img src={src}></img>
                </div>
                <div className={clsx(style.info, style.layer)}>
                    <div className={style.describe}  onClick={()=>{
                        navigate('\MoviePage')
                        sessionStorage.setItem('movieInfo', JSON.stringify(movieInfo))
                    }}>
                        <div className={style.title}>{movieInfo.movie_name}</div>
                    </div>
                    <button 
                        className={clsx(style.buyTicket, style.button)}
                        onClick={()=>{
                            navigate('/BuyTicket')
                            sessionStorage.setItem('cardImgData', movieInfo.movie_image)
                            sessionStorage.setItem('movie_name', movieInfo.movie_name)
                            sessionStorage.setItem('movie_id',movieInfo.movie_id )
                            console.log(sessionStorage.getItem('cardImgData'))}}>MUA VÉ</button>

                </div>
            </div>
    )
}
export default Card;