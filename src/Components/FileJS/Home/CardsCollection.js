import Label from '../Cell/Label'
import style from '../../FileCSS/Home/cards.module.css'
import image1 from '../../../img/Movie-cards/image1.jpg'
import image2 from '../../../img/Movie-cards/image2.jpg'
import image3 from '../../../img/Movie-cards/image3.jpg'
import image4 from '../../../img/Movie-cards/image4.jpg'
import image5 from '../../../img/Movie-cards/image5.jpg'
import image6 from '../../../img/Movie-cards/image6.jpg'
import { useState,useEffect } from 'react'
import Card from '../Cell/Card'
import clsx from 'clsx'
import React from 'react'
function CardsCollection({}){

    const [index, setIndex] = useState(2);
    const [translate, setTranslate] = useState(0);
    //BEGIN FETCH DATA
    //Khai báo các mảng sẽ chứa dữ liệu fetch về
    const [hotMovies, setHotMovies]= useState([])
    // Fetch movie
    useEffect(()=>{
        fetch('http://localhost:5000/ahd/')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        setHotMovies(data);
    })
    .catch(error => console.error('Error:', error));
    },[])
    // In ra các mảng kiểm tra
    console.log(hotMovies)
    //END FETCH DATA
    return (
        <div className = {style.container}>
            <div className={style.label}>
                <Label classNameDisplay={style.labelDisplay}
                       classNameContent={style.labelContent}
                       >Movie</Label>
            </div>
            <button className={clsx(style.prev, style.button)} onClick={()=>
                {
                    setIndex((prev)=>(prev+1)%6);
                }}></button>
            <button className={clsx(style.next, style.button)} onClick={()=>
                {
                    setIndex(prev=>((prev+5)%6));
                }
            }></button>
            <div className={style.cardsVisible}>
                <div className={style.allCards} 
                style={{transform: `translate(${translate}vw)`, '--quantity': 6}}>
                    <div className={style.itemCover} 
                    style={{'--position':index%6, '--initPosition': 0}} >
                        <Card src={image1}></Card>   
                        
                    </div>
                    <div className={style.itemCover} 
                    style={{'--position': (index+1)%6, '--initPosition': 1}}>
                               <Card src={image2} ></Card> 
                                
                    </div>
                    <div className={style.itemCover}
                     style={{'--position': (index+2)%6, '--initPosition': 2}}>
                                 <Card src={image3} ></Card>
                    </div>
                    <div className={style.itemCover} 
                    style={{'--position': (index+3)%6,  '--initPosition': 3}}>
                                <Card src={image4} ></Card>
                                
                    </div>
                    <div className={style.itemCover} 
                    style={{'--position':(index + 4)%6, '--initPosition': 4}}>
                                <Card src={image5} ></Card>
                                
                    </div>
                    <div className={style.itemCover} 
                    style={{'--position': (index+ 5)%6, '--initPosition': 5}}>
                                <Card src={image6} ></Card>
                                
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}
export default CardsCollection;