import React from "react";
import style from '../../FileCSS/Cell/DateTime.module.css'
import clsx from "clsx";
import { useState } from "react";

function DateTime({selectedDay,day, onclick}){
    return (
        <div className={`${style.dayBlock} ${selectedDay && selectedDay.Day === day.Day ? style.selected : ''}`}
                    onClick={onclick}>
                        <div className={style.monthAndDweek}>
                            {day.Month}<br/>
                            {day.Dweek}
                        </div>
                        <div className={style.Day} >
                            {day.Day}
                        </div>
                    </div>
    )
}

export default DateTime