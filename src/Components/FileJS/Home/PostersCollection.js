import image1 from '../../../img/PostersCollection/image1.jpg'
import image2 from '../../../img/PostersCollection/image2.jpg'
import image3 from '../../../img/PostersCollection/image3.jpg'
import image4 from '../../../img/PostersCollection/image4.jpg'
import image5 from '../../../img/PostersCollection/image5.jpg'
import Poster from '../Cell/Poster'
import style from '../../FileCSS/Home/PostersCollection.module.css'
import { useState, useEffect } from 'react'
import React from 'react'
function PosterCollection(){
    const [translate, setTranslate] = useState(0);
    function HandleNext(){
        setTranslate(pre=>(pre+1)%5);
    }
    function HandlePrev(){
        setTranslate(pre=>(pre+4)%5);
    }
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
    return(
        <div className={style.container}>
            <div className={style.posterVisible}>
                < div className={style.allPosters} 
                style={{'--quantity':5, '--translate': translate}}
                >
                    <div className={style.item} 
                    // style={{'--position': translate -1 }}
                    >
                        <Poster src={image1}></Poster>
                    </div>
                    <div className={style.item} 
                    // style={{'--position': translate }}
                    >
                        <Poster src={image2}></Poster>
                    </div>
                    <div className={style.item} 
                    // style={{'--position': translate+1}}
                    >
                        <Poster src={image3}></Poster>
                    </div>
                    <div className={style.item} 
                    // style={{'--position': translate+2}}
                    > 
                        <Poster src={image4}></Poster>
                    </div>
                    <div className={style.item} 
                    // style={{'--position': translate+3}}
                    >
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