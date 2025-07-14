import React, {useState, useEffect} from 'react';
import { FaArrowUp } from "react-icons/fa";
const QuickBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=> {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollTop = () => {
        window.scrollTo({top:0, behavior:"smooth"});
    }

    return isVisible && (
        <div className='quickBtn'>
            <button className="top" onClick={scrollTop}>
                <FaArrowUp className='upbtn'/>
            </button>
        </div>
    );
};

export default QuickBtn;