import styles from '../FileCSS/header.module.css'
import image from '../../img/logo.png'
import React, {forwardRef} from 'react';
import { useNavigate } from 'react-router-dom';
const Header = forwardRef(({}, ref)=>{
    const navigate = useNavigate()
    return(
        <div ref = {ref} className={styles.navBar}>
            <div className={styles.display}></div>
            <div className={styles.hello}>AHD xin chào </div>
            <div className={styles.logo}>
                <img src={image}></img>
            </div>
            <div className={styles.buttonsList}>
                <div className= {styles.item}>
                    <button onClick={()=>{navigate('/')}}>Home</button>
                </div>
                <div className={styles.item}>
                    <button onClick={()=>{navigate('/PhimDangChieu')}}>Movies</button>
                </div>
                <div className={styles.item}>
                    <button onClick={()=>{navigate('/TheatersPage')}}>Theaters</button>
                </div>
                <div className={styles.item}>
                    <button onClick={()=>{navigate('/MemberPage')}}>Members</button>   
                </div>
                <div className={styles.item}>
                    <button onClick ={()=>{navigate('/EventPage')}}>Events</button>   
                </div>
            </div> 
            <div className={styles.log}>
                <button className={styles.logIn} onClick={()=>{navigate('/Login')}}>Log in</button> 
                <button className={styles.signIn} onClick={()=>{navigate('/Register')}}>Sign in</button>
            </div>    
        </div>
    )
})

export default Header;