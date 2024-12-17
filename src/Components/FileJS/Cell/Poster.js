import clsx from 'clsx';
import style from '../../FileCSS/Cell/Poster.module.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Poster({src, movieInfo}){
    const navigate = useNavigate()
    console.log(movieInfo)
    return(
        <div className={style.container} onClick={()=>
        {
            // sessionStorage.setItem('cardImgData', movieInfo.movie_image)
            // sessionStorage.setItem('movie_name', movieInfo.movie_name)
            // sessionStorage.setItem('movieId',movieInfo.movie_id )
            sessionStorage.setItem('movieInfo', JSON.stringify(movieInfo))
            navigate('/MoviePage')
        }}>
            <div 
            // style={{backgroundImage: `url(${src})`}} 
            className={style.display}></div>
            <div 
            // style={{backgroundImage: `url(${src})`}} 
            className={style.image}>
                <img src = {src}></img>
            </div>
        </div>
    )
}
export default Poster;