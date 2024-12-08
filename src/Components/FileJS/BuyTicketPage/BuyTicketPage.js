// import { useState } from "react"
// import style from '../../FileCSS/BuyTicketPage/BuyTicketPage.module.css'
// import Step1 from "./Step1/Step1"
// import PaymentPage from "./Step4/PaymentPage"
// import SeatBooking from "./Step2/SeatBooking"
// import ComboPage from "./Step3/ComboPage"
// import TicketInfo from "./TicketInfo"
// import { flushSync } from "react-dom"
// import React from 'react'
// import Header from "../header"
// import Footer from "../footer"
// function BuyTicketPage(){
//     const [theater, setTheater] = useState('Rạp phim')
//     const [time, setTime] = useState('.. : .. ')
//     const [date, setDate] = useState('...')
//     const [seat, setSeat] = useState('Bạn chưa chọn ghế')
//     const [step, setStep] = useState(0)
//     function nextPage(){
//         if(step != 3)
//         {
//             setStep(
//                 pre => pre+1
//             )
//             console.log(step)
//         }
            
//     }
//     function prevPage(){
//         if(step )
//             setStep(
//                 pre => pre-=1
//             )
//     }
//     const stepChain = [
//         <Step1 setTheater={
//             (event)=>
//             {
//                 setTheater(event.currentTarget.getAttribute('data-support'))
//             }}
//             setDate={
//                 (event) =>{
//                     flushSync(()=>{
//                         setDate(event.currentTarget.getAttribute('data-content'))
//                         console.log(date)
//                     })
//                 }
//             }
//             setTime={
//                 (event)=>
//                 {
//                     setTime(event.currentTarget.getAttribute('data-content'))
//                 }
//             }
//             ></Step1>,
//         <SeatBooking></SeatBooking>,
//         <ComboPage></ComboPage>,
//         <PaymentPage></PaymentPage>
//     ]

    
//   return(
//     <div className = {style.container}>
//         <Header></Header>
//         <div className = {style.mainBox}>
//             <div className = {style.progressBarBox}>
//                 <div className = {style.step}>
//                     <div className = {style.stepLabel}>Bước 1</div>
//                     <div className = {style.stepShape}></div>
//                 </div>
//                 <div className = {style.step}>
//                     <div className = {style.stepLabel}>Bước 2</div>
//                     <div className = {style.stepShape}></div>
//                 </div>
//                 <div className = {style.step}>
//                     <div className = {style.stepLabel}>Bước 3</div>
//                     <div className = {style.stepShape}></div>
//                 </div>
//                 <div className = {style.step}>
//                     <div className = {style.stepLabel}>Bước 4</div>
//                     <div className = {style.stepShape}></div>
//                 </div>
//             </div>
//             <div className = {style.contentBox}>
//                 {stepChain[step]}
//             </div>
//             <div className = {style.nextPreviousBox}>
//                 <TicketInfo 
//                     nextPage={nextPage}
//                     prePage={prevPage}
//                     theater={theater} time={time} date={date}></TicketInfo>
//             </div>
//         </div>
//         <Footer></Footer>
//     </div>

//   )
// }

// export default BuyTicketPage