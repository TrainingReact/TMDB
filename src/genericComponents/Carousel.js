import React, { useEffect, useCallback, useState, useRef } from 'react';
import './popup.css'

export function Item(props) {
    const [visibility, setVisibility] = useState(false);
    const refItem = useRef(null);
    const takeIDForDetails = () => {
        setVisibility(!visibility);
    };


    return (

        <div className="item" ref={refItem} onClick={takeIDForDetails}>
            {visibility && <Popup data={props.item} />}
            <h3 className="centerTxt" >{props.item.title}</h3>
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

export function Popup(props) {
    const refPopup = useRef(null);
    return (

        <div ref={refPopup} id="myModal" className="modal">

            <div className="modal-content">
                <div className="modal-header">
                    <span className="close">&times;</span>
                    <h2>{props.data.title}</h2>
                </div>
                <div className="modal-body">
                    <div className="popupBodyTop">
                        <img className='posterImg' src={'https://image.tmdb.org/t/p/w500/' + props.data.poster_path} alt={'locandina del film ' + props.data.title} title={'locandina del film ' + props.data.title} aria-labelledby={'locandina del film ' + props.data.title} />
                        <div className='moreDetails'>
                            <p>Titolo: {props.data.title}</p>
                            <p>Genere: </p>
                            <p>Anno di produzione: </p>
                        </div>
                    </div>
                    <div className="popupBodyBottom">
                        <p>Descrizione:</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <h3>Modal Footer</h3>
                </div>

            </div>

        </div>
    )
}