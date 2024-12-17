import { useState, useEffect } from 'react'
import clsx from 'clsx';
import styles from '../../FileCSS/Home/Body.module.css'
import CardsCollection from './CardsCollection'
import HotEvent from './HotEvent'
import PosterCollection from './PostersCollection'
import Header from '../header';
import Footer from '../footer';
import React from 'react';
function Body(){
    const [reset, setReset] = useState(true)
    if(reset)
    {
        sessionStorage.clear()
        setReset(false)
    }
    return(
        <div className={styles.container}>
            <Header></Header>
            <div className = {styles.body}>
                <div className={styles.posters}>
                    <PosterCollection></PosterCollection>
                </div>
                <div className={styles.cardsCollection}>
                    <CardsCollection></CardsCollection>
                </div>
                <div className={styles.hotEvent}>
                    <HotEvent></HotEvent>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Body;
    