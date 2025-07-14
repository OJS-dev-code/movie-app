import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const MoviesDetail = () => {
    //699f422b4977b72b0c1c4deeb38fe99f
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [m, setM] = useState();

    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(()=> {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko`).then(res => {
            console.log(res.data);
            setM(res.data);
            setIsLoading(false);
        }) 
    }, [id]);
    return (
        <div className='moviesDetail'>
            {
                isLoading ? (<div>Loading...</div>) : (
                    <div className='movie'>
                        <div className="movieBox">
                            <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                        </div>
                        <div className="textBox">
                            <div className="textBoxtTitle">{m.title}</div>
                            <div className="textBoxtOriginal_title">{m.original_title}</div>
                            <div className="textBoxtOriginal_overview">{m.overview}</div>
                            <div className="textBoxtRelease_date">개봉일 : {m.release_date}</div>
                            <div className="textBoxtVote_average">평점 : ⭐️{m.vote_average}</div>
                            <div className="textBoxtVote_count">좋아요 : ❤️{m.vote_count}</div>
                            <div className="textBoxtPopularity">인기도 : {m.popularity}</div>
                            <div className="textBoxtStatus">상태 : {m.status}</div>
                            <div className="textBoxtTagline">#{m.tagline}</div>   
                            <div className="textBoxtGenres">
                                {m.genres && m.genres.map((genre) => (
                                    <span key={genre.id} className="textBoxtGenre">{genre.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MoviesDetail;