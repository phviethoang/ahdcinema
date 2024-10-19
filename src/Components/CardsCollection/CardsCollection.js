import Label from '../CellComponent/Label/Label'
import style from './cards.module.css'
import image1 from './Movie-cards/image1.jpg'
import image2 from './Movie-cards/image2.jpg'
import image3 from './Movie-cards/image3.jpg'
import image4 from './Movie-cards/image4.jpg'
import image5 from './Movie-cards/image5.jpg'
import image6 from './Movie-cards/image6.jpg'
import { useState } from 'react'
import Card from '../CellComponent/Card/Card'
import clsx from 'clsx'
function CardsCollection({}){
    const [index, setIndex] = useState(-100);
    const [translate, setTranslate] = useState(0);
    return (
        <div className = {style.container}>
            <div className={style.label}>
                <Label classNameDisplay={style.labelDisplay}
                       classNameContent={style.labelContent}
                       >Movie</Label>
            </div>
            <button className={clsx(style.prev, style.button)} onClick={()=>
                {
                    setTranslate((prev)=>(prev+60));
                }}>Prev</button>
            <button className={clsx(style.next, style.button)} onClick={()=>
                {
                    setTranslate(prev=>(prev-60));
                }
            }>Next</button>
            <div className={style.cardsVisible}>
                <div className={style.allCards} style={{transform: `translate(${translate}vw)`}}>
                    <div className={style.itemCover} style={{'--position': 1, '--index': index}} 
                        onMouseEnter={()=>{ setIndex(1)}}
                        onMouseLeave={()=>{ setIndex(-100)}}
                        >                                
                        <Card src={image1}></Card>
                    </div>
                    <div className={style.itemCover} style={{'--position': 2, '--index': index}}
                        onMouseEnter={()=>{ setIndex(2)}}
                        onMouseLeave={()=>{ setIndex(-100)}}>
                                <Card src={image2} ></Card>
                    </div>
                    <div className={style.itemCover} style={{'--position': 3, '--index': index}}
                        onMouseEnter={()=>{ setIndex(3)}}
                        onMouseLeave={()=>{ setIndex(-100)}}>
                                <Card src={image3} ></Card>
                    </div>
                    <div className={style.itemCover} style={{'--position': 4, '--index': index}}
                        onMouseEnter={()=>{ setIndex(4)}}
                        onMouseLeave={()=>{ setIndex(-100)}}>
                                <Card src={image4} ></Card>
                    </div>
                    <div className={style.itemCover} style={{'--position': 5, '--index': index}}
                        onMouseEnter={()=>{ setIndex(5)}}
                        onMouseLeave={()=>{ setIndex(-100)}}>
                                <Card src={image5} ></Card>
                    </div>
                    <div className={style.itemCover} style={{'--position': 6, '--index': index}}
                        onMouseEnter={()=>{ setIndex(6)}}
                        onMouseLeave={()=>{ setIndex(-100)}}>
                                <Card src={image6} ></Card>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}
export default CardsCollection;