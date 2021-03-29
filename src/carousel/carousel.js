import React, { useEffect, useCallback, useState } from 'react';


export function Item(props) {
    return (
        <div className="item">
            <h3 className="centerTxt">{props.item.title}</h3>
            <img className='posterImg' src={'https://image.tmdb.org/t/p/w500/' + props.item.poster_path} alt={'locandina del film ' + props.item.title} title={'locandina del film ' + props.item.title} aria-labelledby={'locandina del film ' + props.item.title} />
        </div>
    );
};

export function Carousel(props) {
    return (
        <div className="carousel">
            {props.items.map((item, index) => (
                <Item item={item} key={index} />
            ))}
        </div>

    );
};

export default function ActionsButtons(props) {
    const SKIP = 3;
    const LIMIT_PAGE = 5;
    const [items, setItems] = useState(props.data);
    
    useEffect(() => {
        setItems(props.data)
    }, [props.data])

    const prev = useCallback(() => {
        const currentIndex = items[0].index - SKIP;
        if (currentIndex >= 0) {
            const cloneData = [...props.data];
            const prevItems = cloneData.splice(currentIndex, SKIP);
            setItems([...prevItems, ...items]);
        }
    }, [props.data, items]);

    const next = useCallback(() => {
        if (items.length > LIMIT_PAGE) {
            setItems((prevSlides) => {
                const nextSlides = [...prevSlides];
                return nextSlides.slice(SKIP);
            });
        }
    }, [setItems, items]);

    return (
        <div className="carouselContainer">
            <Carousel items={items} />

            <div className="buttons-container">
                <button className="button" data-message="Questo pulsante permette di scorrere ai film precedenti" onClick={prev}><font>◀</font></button>
                <button className="button" data-message="Questo pulsante permette di scorrere ai film successivi" onClick={next}><font>▶</font></button>
            </div>
        </div>
    );
};

