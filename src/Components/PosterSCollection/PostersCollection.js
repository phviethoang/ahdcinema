import image1 from './PostersCollection/image1.jpg'
import image2 from './PostersCollection/image2.jpg'
import image3 from './PostersCollection/image3.jpg'
import image4 from './PostersCollection/image4.jpg'
import image5 from './PostersCollection/image5.jpg'
import Poster from '../CellComponent/Poster/Poster'
import style from './PostersCollection.module.css'
import { useState } from 'react'
import clsx from 'clsx'
function PosterCollection(){
    const [translate, setTranslate] = useState(0);
    function HandleNext(){
        setTranslate(pre=>pre-1);
    }
    function HandlePrev(){
        setTranslate(pre=>pre+1);
    }
    return(
        <div className={style.container}>
            <div className={style.posterVisible}>
                < div className={style.allPosters} 
                style={{'--quantity':5}}
                >
                    <div className={style.item} style={{'--position': translate+2}}>
                        <Poster src={image1}></Poster>
                    </div>
                    <div className={style.item} style={{'--position': translate +1}}>
                        <Poster src={image2}></Poster>
                    </div>
                    <div className={style.item} style={{'--position': translate}}>
                        <Poster src={image3}></Poster>
                    </div>
                    <div className={style.item} style={{'--position': translate+3}}> 
                        <Poster src={image4}></Poster>
                    </div>
                    <div className={style.item} style={{'--position': translate+4}}>
                        <Poster src={image5}></Poster>
                    </div>
                </div>
            </div>
            <button className={style.nextButton} onClick={HandleNext}>&gt;</button>
            <button className= {style.prevButton} onClick={HandlePrev}>&lt;</button>
        </div>
    )
}

export default PosterCollection;