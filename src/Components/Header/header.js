import styles from './header.module.css'
function Header(){
    return(
        <div className={styles.navBar}>
            <div className={styles.logo}>
                <img src='logo192.png'></img>
            </div>
            <div className={styles.buttons}>
                <div className={styles.item}>
                    <button >Movies</button>
                </div>
                <div className={styles.item}>
                    <button >Theaters</button>
                </div>
                <div className={styles.item}>
                    <button >Members</button>   
                </div>
                <div className={styles.item}>
                    <button >Events</button>   
                </div>
            </div> 
            <div className={styles.log}>
                <a href="http://localhost:3000/">Log in</a> / <a href="http://localhost:3000/">Sign in</a>
            </div>    
        </div>
    )
}

export default Header;