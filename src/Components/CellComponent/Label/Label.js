import style from './Label.module.css'
import clsx from 'clsx'
function Label({classNameDisplay, classNameContent, children}){
    return(
        <div className={style.container}>
            <div className={clsx(style.decor, classNameDisplay)}></div>
            <div className={clsx(style.content,classNameContent)} 
                style={{fontFamily: 'Peace Sans'}}>{children}</div>
        </div>
    )
}

export default Label;