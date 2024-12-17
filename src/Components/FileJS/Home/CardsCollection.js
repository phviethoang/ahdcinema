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
    const length = hotMovies.length
    
    const showingCards = []
    for(let i = 0; i< length; i++)
    {
        showingCards.push(
            <div className={style.itemCover} 
                style={{'--position':(index+i)%length, '--initPosition': i}} >
            <Card src={hotMovies[i].movie_image} movieInfo={hotMovies[i]}></Card>   
        </div>
        )
    }
    
    return (
        <div className = {style.container}>
            <div className={style.label}>
                <Label classNameDisplay={style.labelDisplay}
                       classNameContent={style.labelContent}
                       >Movie</Label>
            </div>
            <button className={clsx(style.prev, style.button)} onClick={()=>
                {
                    setIndex((prev)=>(prev+1)%length);
                }}></button>
            <button className={clsx(style.next, style.button)} onClick={()=>
                {
                    setIndex(prev=>((prev+length-1)%length));
                }
            }></button>
            <div className={style.cardsVisible}>
                <div className={style.allCards} 
                style={{transform: `translate(${translate}vw)`, '--quantity': length}}>
                    {
                        showingCards
                    }
                </div>
                
            </div>
            
        </div>
    )
}
export default CardsCollection;