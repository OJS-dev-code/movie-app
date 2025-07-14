import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

const ComedyDetail = () => {
    const {id} = useParams(); 
    const [comedy, setComedy]=useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const URL =`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&with_genres=35&language=ko-KR`;

    useEffect(() => {
        axios.get(URL)
        .then(res => {
            console.log(res);
            setComedy(res.data);
            setIsLoading(false);
        }).catch(err => {console.error(err); setIsLoading(false);})
    }, [id])
    return (
        <div className='comedysDetail'>
            {
                isLoading ? (<div>Loading...</div>) : (
                <div className='comedys'>
                    <div className="imgBox">
                        <img src={`https://image.tmdb.org/t/p/w500/${comedy.backdrop_path}`} alt="" />
                    </div>
                    <div className="textBox">
                        <div className="textBoxtTitle">{comedy.title}</div>
                            <div className="textBoxtOriginal_title">{comedy.original_title}</div>
                            <div className="textBoxtOriginal_overview">{comedy.overview}</div>
                            <div className="textBoxtRelease_date">개봉일 : {comedy.release_date}</div>
                            <div className="textBoxtVote_average">평점 : ⭐️{comedy.vote_average}</div>
                            <div className="textBoxtVote_count">좋아요 : ❤️{comedy.vote_count}</div>
                            <div className="textBoxtPopularity">인기도 : {comedy.popularity}</div>
                            <div className="textBoxtStatus">상태 : {comedy.status}</div>
                            <div className="textBoxtTagline">#{comedy.tagline}</div>   
                            <div className="textBoxtGenres">
                                {comedy.genres && comedy.genres.map((genre) => (
                                    <span key={genre.id} className="textBoxtGenre">{genre.name}</span>
                                ))}
                            </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ComedyDetail;