import clsx from 'clsx';
import style from './Poster.module.css'
function Poster({src}){
    return(
        <div className={style.container}>
            <div style={{backgroundImage: `url(${src})`}} className={style.display}></div>
            <div style={{backgroundImage: `url(${src})`}} className={style.image}></div>
        </div>
    )
}
export default Poster;