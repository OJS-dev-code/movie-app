import React, {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';
import { GrNext, GrPrevious } from "react-icons/gr";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Recommendations = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recommend, setRecommend] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const getRecommendations = async () => {
        try {
            const response = await axios(`https://api.themoviedb.org/3/movie/550/recommendations?api_key=${API_KEY}&language=ko`);
            setRecommend(response.data.results);
            console.log(response.data.results);
            setIsLoading(false);
        } catch (error) {
            console.error("추천 영화 가져오기 실패:", error);
            setIsLoading(false);
        }
    };

    useEffect(()=> {
        getRecommendations();
    }, [])
    return (
        <div className='recommendations'>
            <h2>추천 영화</h2>
            <div className="recommendationList">
                {isLoading? (<div className='loading'>Loading...</div>) : (
                    <div className="swiper-navigation">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={10}
                            autoplay={{
                                delay:0,
                                disableOnInteraction:false,
                            }}
                            speed={10000}
                            loop={true}
                            navigation={{
                                nextEl: '.swiperNext',
                                prevEl: '.swiperPrev',
                            }}
                            breakpoints={{
                                // when window width is >= 480px
                                480: {
                                slidesPerView: 3,
                                spaceBetween: 20
                                },
                                780: {
                                slidesPerView: 4,
                                spaceBetween: 10
                                },
                                1240: {
                                slidesPerView: 5,
                                spaceBetween: 5
                                }
                            }}
                            modules={[Navigation, Autoplay]}
                            className="mySwiper"
                        >
                            {recommend.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <h3>{movie.title}</h3>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="navigationWrap">
                            <div className="swiperNext"><GrNext /></div>
                            <div className="swiperPrev"><GrPrevious /></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;