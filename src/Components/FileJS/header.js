import styles from '../FileCSS/header.module.css'
import image from '../../img/logo192.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Header(){
    const navigate = useNavigate()
    return(
        <div className={styles.navBar}>
            <div className={styles.logo}>
                <img src={image} onClick={()=>{navigate('/')}}></img>
            </div>
            <div className={styles.buttons}>
                <div className={styles.item}>
                    <button>Movies</button>
                </div>
                <div className={styles.item}>
                    <button >Theaters</button>
                </div>
                <div className={styles.item}>
                    <button onClick={()=>{navigate('/MemberPage')}}>Members</button>   
                </div>
                <div className={styles.item}>
                    <button >Events</button>   
                </div>
            </div> 
            <div className={styles.log}>
                <a href="/Login">Log in</a> / <a href="/Register">Sign in</a>
            </div>    
        </div>
    )
}

export default Header;