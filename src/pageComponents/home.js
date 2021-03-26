import CarouselContainer from '../carousel/Carousel';
import React, { useEffect, useRef, useState, useContext } from 'react';
import TopRated from '../movies/api/GetTopRated';
import TopRatedContext from "../genericComponents/context";


export default function Home(props) {
    const [resp, setResp] = useState([]);
    useEffect(() => {
        const result = TopRated();
        result.then(response => {
            setResp(response.results);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <TopRatedContext.Provider value={resp}>
        <main>
            <h1>Top Rated</h1>
            <hr></hr>

            <CarouselContainer />
        </main>
        </TopRatedContext.Provider>
    );
}





