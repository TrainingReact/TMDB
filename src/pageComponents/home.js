import { topRatedMovieUrl, topRatedTVShowsUrl } from '../movies/constants/Constants';
import React, { useEffect, useState } from 'react';
import TopRatedMovie from '../movies/api/GetTopRated';
import ActionsButtons from '../genericComponents/Carousel';


export default function Home() {
    const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
    const [respTopRatedTVShows, setResprespTopRatedTVShows] = useState([]);
    //top rated movie
    useEffect(() => {
        const resultTopRatedMovie = TopRatedMovie(topRatedMovieUrl);
        resultTopRatedMovie.then(response => {
            const res = DataSettingForCarousel(response.results);
            setRespTopRatedMovie(res);
        })
            .catch(error => {
                console.log(error);
            });
    }, []); 
   //top rated tv series
    useEffect(() => {
        const resultTopRatedMovie = TopRatedMovie(topRatedTVShowsUrl);
        resultTopRatedMovie.then(response => {
            const res = DataSettingForCarousel(response.results);
            setResprespTopRatedTVShows(res);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
            <main>
                <h1>Top Rated Movie</h1>
                <hr></hr>
                <ActionsButtons data={respTopRatedMovie}/>

                <h1>Top Rated TV Series</h1>
                <hr></hr>
                <ActionsButtons data={respTopRatedTVShows}/>

            </main>
    );
}


//add index for carousel (see ActionsButtons in GenericComponent for more details)
export function DataSettingForCarousel(props){
    let arrayModifiedForCarousel=props.map(elem => {
                return {
                    ...elem,
                    index: props.indexOf(elem)
                }
            })
       return arrayModifiedForCarousel;
}