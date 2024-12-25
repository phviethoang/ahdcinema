import Content from './Cell/Content';
import style from '../FileCSS/MoviePage.module.css'
import image from '../../img/MovieContentPageImage/Avengers Infinity War.jpg'
import { useState , useEffect} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
function MoviePage({}){
    let movieInfo = sessionStorage.getItem('movieInfo')
    movieInfo = movieInfo? JSON.parse(movieInfo): ''
    console.log(movieInfo)
    const navigate = useNavigate()
    const [video, setVideo] = useState()
     //BEGIN FETCH DATA
    //Khai báo các mảng sẽ chứa dữ liệu fetch về
    const [movieDetail, setMovieDetail]= useState([])
    // Test với param giá trị bất kì, sau này chỉ cần thay nó bằng params của mình khi người dùng thực hiên hành động
    // Fetch movie detail
    // let movie_id = 1
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/ahd/movie-content?movie_id=${movie_id}`)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.json(); 
    // })
    // .then(data => {
    //     setMovieDetail(data);
    // })
    // .catch(error => console.error('Error:', error));
    // },[])
    // In ra các mảng kiểm tra
    // console.log("Done fetching data!")
    // console.log(movieDetail)
    //END FETCH DATA
    function getEmbedCode(youtubeUrl) {
        // Regex để trích xuất video ID từ URL
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        let match = null
        if(youtubeUrl != null)
            match = youtubeUrl.match(regex);
        
        if (match && match[1]) {
            // Lấy video ID
            const videoId = match[1];
            // Tạo mã nhúng
            return <iframe className = {style.video} width="560" height="315" src={"https://www.youtube.com/embed/" + videoId} frameborder="0" allowfullscreen></iframe>
        } else {
            return 
        }
    }
    function HandleTrailer(){

        // navigate(movieInfo.trailer_link)
        setVideo(
            <div className = {style.videoTrailer}>
                <div className={style.videoDisplay} onClick={()=>{setVideo()}}></div>
                {/* <iframe className={style.video}
                // width="615" height="256"
                src={toEmbedLink(movieInfo.trailer_link)} 
                title="Marvel Studios&#39; Avengers: Infinity War - Cuộc Chiến Vô Cực | Trailer 2" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen></iframe> */}
                {getEmbedCode(movieInfo.trailer_link)}
            </div>
        )
    }
    const convertToLocalTime = (dateString) => {
        const date = new Date(dateString);
        // Chuyển sang định dạng chỉ lấy ngày YYYY-MM-DD
        return date.toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: 'numeric', month: '2-digit', day: '2-digit' });

    };
    return(
        <div className = {style.container}>
            <Header></Header>
            <div className = {style.body}>
            {/* <div className = {style.body}> */}
                <div className = {style.label}>
                    <div className = {style.labelContent}>NỘI DUNG PHIM</div>
                </div>
                <div className ={style.info}>
                    <div className = {style.title}>{movieInfo.movie_name}</div>
                    <div className = {style.content}>
                        <div className = {style.movie}>
                            <img src={movieInfo.movie_image} alt=''></img>
                        </div>
                        <div className = {style.detail}>
                            <div className = {style.item}>
                                <Content label="Đạo diễn">{movieInfo.director}</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Thể loại">{movieInfo.category}</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Diễn viên">{movieInfo.actors}</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Khởi chiếu">{convertToLocalTime(movieInfo.start_date)}</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Thời lượng">{movieInfo.duration} phút</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Ngôn ngữ">{movieInfo.languages}</Content>
                            </div>
                            <div className = {style.item}>
                                <Content label="Nhãn">{movieInfo.movie_label}</Content>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={style.buttons}>
                    <button className={style.Ticket} onClick={()=>{
                        navigate('/BuyTicket')
                        sessionStorage.setItem('cardImgData', movieInfo.movie_image)
                        sessionStorage.setItem('movie_name', movieInfo.movie_name)
                        sessionStorage.setItem('movie_id',movieInfo.movie_id )
                        }}>Mua vé</button>
                    <button className={style.Trailer} onClick={HandleTrailer}>Trailer</button>
                </div>
            {/* </div> */}
            
                {video}
            </div>
            <Footer></Footer>
        </div>
        
    )
}

export default MoviePage;