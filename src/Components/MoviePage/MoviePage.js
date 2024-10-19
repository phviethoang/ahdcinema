import Content from '../CellComponent/Content/Content';
import style from './MoviePage.module.css'
import image from './SupportedImages/Avengers Infinity War.jpg'
import { useState } from 'react';
function MoviePage(){
    const [video, setVideo] = useState()
    function HandleTrailer(){
        setVideo(
            <div className = {style.videoTrailer}>
                <div className={style.videoDisplay} onClick={()=>{setVideo()}}></div>
                <iframe className={style.video}
                // width="615" height="256"
                src="https://www.youtube.com/embed/DKqu9qc-5f4" 
                title="Marvel Studios&#39; Avengers: Infinity War - Cuộc Chiến Vô Cực | Trailer 2" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen></iframe>
            </div>
        )
    }
    return(
        <div className = {style.container}>
            <div className = {style.label}>
                <div className = {style.labelContent}>NỘI DUNG PHIM</div>
            </div>
            <div className ={style.info}>
                <div className = {style.title}>AVENGERS: INFINITY WAR</div>
                <div className = {style.content}>
                    <div className = {style.movie}>
                        <img src={image} alt=''></img>
                    </div>
                    <div className = {style.detail}>
                        <div className = {style.item}>
                            <Content label="Đạo diễn">Đoàn Mạnh Hùng</Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Thể loại">Tâm lý, Tình cảm, Kịch tính, Hài hước, Trinh thám</Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Diễn viên"></Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Khởi chiếu">19/12/2024</Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Thời lượng">111 phút</Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Ngôn ngữ">Tiếng Việt</Content>
                        </div>
                        <div className = {style.item}>
                            <Content label="Nhãn">18+</Content>
                        </div>

                    </div>
                </div>
            </div>
            <div className={style.buttons}>
                <button className={style.Ticket}>Mua vé</button>
                <button className={style.Trailer} onClick={HandleTrailer}>Trailer</button>
            </div>
                {video}
        </div>
    )
}

export default MoviePage;