import style from '../../FileCSS/Cell/ButtonType1.module.css'
import clsx from 'clsx'
import React from 'react'
function ButtonType1({sizeStyle, id, onclick, choosen, children, support}){
    return(
        <button 
            onClick = {onclick} 
            data-id={id}
            data-content={children}
            data-support={support}
            key = {id} 
            className = {clsx(style.itemCover, 
            {[style.miniSquare]: sizeStyle == 'miniSquare', 
            [style.flexSquare]: sizeStyle == 'flexSquare'})} >
            <div className = {
                clsx({[style.choosen]: choosen == id, 
                    [style.notChoosen]: choosen !== id},
                style.itemDisplay)}></div>
            <div className = {
                clsx({[style.choosen]: choosen == id, 
                [style.notChoosen]: choosen !== id},
                style.itemContent
    )}>{children}</div>
        </button>
    )
}

export default ButtonType1