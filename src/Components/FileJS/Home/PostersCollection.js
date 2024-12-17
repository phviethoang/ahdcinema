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
        setTranslate(pre=>(pre+1)%3);
    }
    function HandlePrev(){
        setTranslate(pre=>(pre+2)%3);
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
    const showingPosters = []
    for(let i = 0; i< hotMovies.length; i++)
    {
        if(hotMovies[i].movie_name === "CÔNG TỬ BẠC LIÊU"
            || hotMovies[i].movie_name === "KRAVEN - THỢ SĂN THỦ LĨNH"
            || hotMovies[i].movie_name === "CHÚA TỂ CỦA NHỮNG CHIẾC NHẪN: CUỘC CHIẾN CỦA ROHIRRIM"
        )
        showingPosters.push(
            <div className={style.item} key = {i}>
                <Poster src={hotMovies[i].movie_poster} movieInfo={hotMovies[i]}></Poster>
            </div>
        )

    }
    //END FETCH DATA
    return(
        <div className={style.container}>
            <div className={style.posterVisible}>
                < div className={style.allPosters} 
                style={{'--quantity': showingPosters.length, '--translate': translate}}
                >
                    {
                        showingPosters
                    }
                </div>
            </div>
            <button className={style.nextButton} onClick={HandleNext}>&gt;</button>
            <button className= {style.prevButton} onClick={HandlePrev}>&lt;</button>
        </div>
    )
}

export default PosterCollection;