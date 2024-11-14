import style from '../../FileCSS/Cell/Content.module.css'
import React from 'react'
function Content({label, children}){
    return(
        <div className = {style.container}>
                <div className = {style.label}>{label}: </div>
                <span className = {style.content}>{children}</span>
        </div>
    )
}
export default Content;