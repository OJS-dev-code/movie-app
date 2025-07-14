import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";


const DramaDetail = () => {
    const {id} = useParams(); 
    const [appDrama, setAppDrama]=useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=ko-KR`;

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR&page=1`)
        .then(res => {
            console.log(res.data)
            setAppDrama(res.data)
            setIsLoading(false)
        }).catch(err => {console.error(err)})
    }, [id])
    return (
        <div className='dramaDetail'>
            {
                isLoading ? (<div>Loading...</div>) : (<div>

                    <div className="imgbox">
                        <img src={`https://image.tmdb.org/t/p/original${appDrama.backdrop_path}`} alt="" />
                    </div>
                    <div className="textbox">
                        <div className="name">{appDrama.original_name}</div>
                        <div className="homepage"><a href={appDrama.homepage} target='_blank'>드라마 홈페이지로 이동</a></div>
                        <div className="created_by">제작자 : {
                            appDrama.created_by && appDrama.created_by.map((activer)=> (
                                <span key={activer.id} className='textBoxtActiver'>
                                    {activer.name}
                                </span>
                            ))
                        }</div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default DramaDetail;