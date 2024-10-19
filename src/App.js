import logo from './logo.svg';
import './App.css';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/footer';
import Header from './Components/Header/header';
import MoviePage from './Components/MoviePage/MoviePage';

function App() {
  return (
    <div className="App">
        <Header></Header>
        {/* <Body></Body> */}
        <div className='AppBody'>
          <MoviePage></MoviePage>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default App;
