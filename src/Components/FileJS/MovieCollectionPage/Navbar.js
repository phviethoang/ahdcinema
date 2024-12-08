import style from '../../FileCSS/MovieCollectionPage/Navbar.module.css'
import React, {Component} from 'react'
import { useState } from 'react'
import ButtonType1 from '../Cell/ButtonType1'
import clsx from 'clsx'
function Navbar(){

    const categories = ['Kinh dị', 'Trinh thám', 'Khoa học viễn tưởng'
        , 'Tâm lý', 'Hành động', 'Tình cảm']
    const [clickedSet, setClick] = useState(new Set())
    let dates = []
    let months = []
    let years = []
    for(let i = 1; i<=31; i++)
    {
        dates.push(i)
    }
    dates = dates.map((each) => <option>{each}</option>)
    
    for(let i = 1; i<=12; i++)
    {
        months.push(i)
    }
    months = months.map(each => <option>{each}</option>)

    for(let i = 2024; i<=2025; i++){
        years.push(i)
    }
    years = years.map(each => <option>{each}</option>)

    const categoriesTags = categories.map(
        (each)=>
            <button 
                className={clsx(style.button, {[style.choosen]: clickedSet.has(each)})}
                onClick={()=>{setClick((pre)=>{
                    const newSet = new Set(pre)
                if(newSet.has(each))
                {
                    newSet.delete(each)
                }
                else {
                    newSet.add(each)
                }
                return newSet
            })}}>{each}</button>
    )
    return(
        <div className={style.container}>
            <div className={style.icon}></div>
            <div className={style.findMovie}>
                <input type = "text" className = {style.input} placeholder='Nhập tên phim'></input>
                {/* <label className={style.placeHolder}>Tên phim</label> */}
                <button className= {style.confirm}>Tìm</button>
            </div>

            <div className={style.categoryContainer}>
                <div className={style.filter}>Bộ lọc</div>
                <div className={style.content}>
                    <div className={style.labelContainer}>
                        <div className={style.label}>Thể loại</div>
                    </div>
                    <div className={style.categoriesCollection}>
                        {categoriesTags}
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.labelContainer}>
                        <div className={style.label}>Ngày chiếu</div>
                    </div>    
                    <div className={style.dateTime}>
                            <div className = {style.itemContainer}>
                                <label className={style.itemLabel}>Ngày: </label>
                                <select className={style.itemSelection}>
                                    {dates}
                                </select>
                            </div>
                            <div className = {style.itemContainer}>
                                <label className={style.itemLabel}>Tháng: </label>
                                <select className={style.itemSelection}>
                                    {months}
                                </select>
                            </div>
                            <div className = {style.itemContainer}>
                                <label className={style.itemLabel}>Năm: </label>
                                <select className={style.itemSelection}>
                                    {years}
                                </select>
                            </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default Navbar