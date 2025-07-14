import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Recommendations from '../components/Recommendations'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [upComingMovies, setUpComingMovies] = useState([]);
    const [appMovies, setAppMovies] = useState(true);
    const [visibleMovies, setVisibleMovies] = useState(5);
    const [searchWord, setSearchWord] = useState('');
    const [randomMovie, setRandomMovie] = useState(null);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const search = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko&query=${searchWord}`)
        .then((res)=>{
            console.log(res.data.results);
            setAppMovies(res.data.results);
        })
        .catch((error)=>{
            console.error("검색 중 오류 발생:", error);
        })
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            search();
        }
    }

    const getMovies = async () => {
        try{ //데이터를 비동기방식으로 가져옴
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=699f422b4977b72b0c1c4deeb38fe99f&language=ko`)
            const appResponse = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=699f422b4977b72b0c1c4deeb38fe99f&language=ko-KR&region=KR&page=1`);
            setUpComingMovies(response.data.results);
            setAppMovies(appResponse.data.results);
            setIsLoading(false);

            const movies = response.data.results;
            if(movies.length>0){
                const randomIndex = Math.floor(Math.random() * movies.length);
                setRandomMovie(movies[randomIndex]);
            }
            //console.log(response.data.results);
            console.log(appResponse.data.results);
        }catch(error){
            console.error(error);
            setIsLoading(false);
        }
    }


    useEffect(()=>{
        getMovies();
    }, []); //getMovies라는 함수가 처음 1번만 열려있게 하기.

    const getRandomMovie = () => {
        if (upComingMovies.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * upComingMovies.length);
        return upComingMovies[randomIndex];
    }
    // const randomMovie = getRandomMovie();

    return (
        <div className='home'>
            <div className="upComin">
                {
                    isLoading ? (
                        <p className='loading'>Loading...</p>
                    ) : (
                        <div className='upMovie'>
                            <div className="upComingImg">
                                {randomMovie && <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`} alt={randomMovie.title} />}
                                {console.log(randomMovie.title)}
                            </div>
                            <div className="upComingInfo">
                                <div className="upInfoText">
                                    <p className='title'>제목: {randomMovie.title}</p>
                                    <p className='original_title'>원제: {randomMovie.original_title}</p>
                                    <p className='overview'>개요: {randomMovie.overview}</p>
                                    <p className='release_date'>개봉일: {randomMovie.release_date}</p>
                                    <p className='vote_average'>평점: {randomMovie.vote_average}</p>
                                    <p className='vote_count'>좋아요: {randomMovie.vote_count}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="search">
                <div className='searchBox'>
                    <input type='search' value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} onKeyDown={handleKeyPress} placeholder='찾고 싶은 영화 제목을 입력해주세요'/>
                    <button className='searchBtn' onClick={search}><CiSearch className='searchIcon'/></button>
                    <div className="searchResults">
                        <ul className="searchMovieList">

                        </ul>
                    </div>
                </div>
            </div>
            <div className="mainUpComing">
                <h2>상영작</h2>
                <div className="movieList">
                    {
                        isLoading ? (<p className='loading'>Loading...</p>) : (
                            appMovies.slice(0, visibleMovies).map((movie) => (
                                <div className="movieItem" key={movie.id}>
                                    <Link to={`/movies/${movie.id}`}>
                                        <div className='imgWrap'>
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        </div>
                                        <div className='textWrap'>
                                            <h3>{movie.title}</h3>
                                            <p>개봉일: {movie.release_date}</p>
                                            <p className='vote_average'>{movie.vote_average}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )
                    }
                </div>
                {
                    appMovies.length > visibleMovies && (
                        <div className='more'>
                            <button className='loadMore' onClick={() => setVisibleMovies(visibleMovies + 5)}>
                                더보기
                            </button>
                        </div>
                    )
                }
            </div>
            <Recommendations/>
        </div>
    );
}
export default Home;