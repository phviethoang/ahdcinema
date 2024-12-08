import clsx from 'clsx';
import style from '../../FileCSS/Cell/Poster.module.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Poster({src}){
    const navigate = useNavigate()
    return(
        <div className={style.container} onClick={()=>{navigate('/MoviePage')}}>
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