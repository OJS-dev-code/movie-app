import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Comedy = () => {

    const API_KEY = process.env.REACT_APP_API_KEY;
    const [isLoading, setIsLoading] = useState(true);
    const [comedy, setComedy] = useState([]);
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&language=ko-KR`;
    useEffect(() => {
        axios.get(URL)
            .then((res) => {
                setComedy(res.data.results);
                console.log(res.data.results);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('에러 발생:', err);
                setIsLoading(false);
            });
    }, []);
    return (
        <div className='comedy'>
            <h2>Comedy</h2>
            {
                isLoading ? (<div className='loading'>Loading...</div>) : (
                    <div className='comedyWrap'>
                        {comedy.map((item,i) => (
                            <Link to={`/comedy/${item.id}`}>
                                <div className='comedyWrap' key={i}>
                                    <div className='imgbox'>
                                        {
                                            item.poster_path && (
                                                <img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
                                            )
                                        }
                                    </div>
                                    <div className="textbox">
                                        <div className="original_name">{item.original_name}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Comedy;