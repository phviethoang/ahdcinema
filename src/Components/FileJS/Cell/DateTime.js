import React from "react";
import style from '../../FileCSS/Cell/DateTime.module.css'
import clsx from "clsx";
import { useState } from "react";

function DateTime({selectedDay,day, onclick}){
    return (
        <div 
            className={`${style.dayBlock} ${selectedDay !== '' && selectedDay == day.date ? style.selected : ''}`}
            onClick={onclick}
            data-date = {day.date}>
                        <div className={style.monthAndDweek}>
                            {day.day}/ {day.month}
                        </div>
                    </div>
    )
}

export default DateTime