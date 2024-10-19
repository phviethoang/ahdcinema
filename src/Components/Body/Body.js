import { useState, useEffect } from 'react'
import clsx from 'clsx';
import styles from './Body.module.css'
import Poster from '../CellComponent/Poster/Poster'
import CardsCollection from '../CardsCollection/CardsCollection'
import HotEvent from '../HotEvents/HotEvent'
import PosterCollection from '../PosterSCollection/PostersCollection'
function Body(){
    return(
        <div className={styles.container}>
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
    )
}

export default Body;
    