import React, { useEffect, useRef, useState } from 'react';
const axios = require('axios');

//Carousel layout component
export function Carousel(props) {
    var slider = document.querySelector('.container');
    const bottonLeftRef = useRef();
    const bottonRightRef = useRef();

    //next button management
    const next = () => {
        slider.scrollLeft += 400;
    }

    //previous button management
    const prev = () => {
        slider.scrollLeft -= 400;
    }


    return (
        <div className='container'>
        
            <ul className='xsmall-slider slider'>

                {props.triple.map((item) =>
                    <li className='item' key={item.id}>
                        <p className='centerTxt'><h3>{item.title}</h3></p>
                        <p><img className='posterImg' src={'https://image.tmdb.org/t/p/w500/'+item.poster_path} alt={'locandina del film ' + item.title} title={'locandina del film ' + item.title} aria-labelledby={'locandina del film ' + item.title} /></p>
                    </li>
                )};
            </ul>
            <div className='controls'>
                <button className="prev" ref={bottonRightRef} onClick={prev}><font>◀</font></button>
                <button className="next" ref={bottonLeftRef} onClick={next}><font>▶</font></button>
            </div>
        </div>
    )
}

//carousel cards component
export default function GetCarouselItems(props) {
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get(props.url)
            .then(response => {
                setState(response.data.results);

            })
            .catch(error => console.log(error));
    }, []);


    return (
        <Carousel triple={state} />
    );
}
