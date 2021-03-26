import React, { useEffect, useCallback, useState, useContext } from 'react';
import TopRatedContext from '../genericComponents/context'



export default function CarouselContainer(props) {

    return (
        <div className="App">
            <Carousel />
        </div>
    );
}
export function Item(props) {
    return (
        <div className="item">
            <h3 className="centerTxt">{props.item.title}</h3>
            <img className='posterImg' src={'https://image.tmdb.org/t/p/w500/' + props.item.poster_path} />
        </div>
    );   
};

export function Carousel() {
    const resp = useContext(TopRatedContext);
    return (
            <div className="carousel">
            {resp.map((item, index) => (
                <Item item={item} key={index} />
            ))}
        </div>
 
    );
};

