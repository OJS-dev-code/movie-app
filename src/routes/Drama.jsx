import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Detail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [drama, setDrama] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`)
        .then(res => {
            console.log(res.data.results);
            setDrama(res.data.results);
            setIsLoading(false);
        })
    }, [])
    return (
        <div className='detail'>
            <h2>TV PROGRAM</h2>
            {
                isLoading ? (<div className='loading'>Loading...</div>) : (
                    <div className='drama'>
                        {drama.map((item,i) => (
                            <Link to={`/drama/${item.id}`}>
                                <div className='dramaWrap' key={i}>
                                    <div className='imgbox'>
                                        <img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
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

export default Detail;