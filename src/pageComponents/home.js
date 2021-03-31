import { topRatedMovieUrl, topRatedTVShowsUrl, genre } from '../movies/constants/Constants';
import React, { useEffect, useState } from 'react';
import TopRatedMovie from '../movies/api/GetTopRated';
import ActionsButtons from '../genericComponents/Carousel';


export default function Home() {
    const [respTopRatedMovie, setRespTopRatedMovie] = useState([]);
    const [respTopRatedTVShows, setResprespTopRatedTVShows] = useState([]);
    let dataReadyTVSForGenres;

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
            dataReadyTVSForGenres = DataSettingForCarousel(response.results);
        })
            .catch(error => {
                console.log(error);
            });
    }, [dataReadyTVSForGenres]);

    useEffect(() => {
        const resultMovieGenre = TopRatedMovie(genre);
        //trasformation from object (genre) to array
        resultMovieGenre.then(response => {
            var genreResponse = Object.values(response);
            var genreArrayTrasform = [];
            genreResponse.forEach(function (el) {
                genreArrayTrasform = Object.values(el);
            })
            //copy props data to manipulate it with array functions
            var respTopRatedTVShowsCopy = dataReadyTVSForGenres;
            //for each film we want to associate the movie's genre_ids with the genre's id
            respTopRatedTVShowsCopy.forEach(function (itemtvs) {
                var result = genreArrayTrasform.filter(function (genElem) {

                    //this function is necessary to know the objects in movie's genres_id array dimension 
                    var size = function (obj) {
                        var size = 0,
                            key;
                        for (key in obj) {
                            if (obj.hasOwnProperty(key)) size++;
                        }
                        return size;
                    };
                    let w = 0;
                    for (w = 0; w < size(itemtvs.genre_ids); w++) {
                        return genElem.id === itemtvs.genre_ids[w];
                    }

                });
                //now genres is added
                itemtvs.genres = (result[0] !== undefined || result[0].name !== null) ? result[0].name : "---";
                setResprespTopRatedTVShows(respTopRatedTVShowsCopy);
            });


        })
            .catch(error => {
                console.log(error);
            });
    }, [dataReadyTVSForGenres]);

    return (
        <main>
            <h1>Top Rated Movie</h1>
            <hr></hr>
            <ActionsButtons data={respTopRatedMovie} />

            <h1>Top Rated TV Series</h1>
            <hr></hr>
            <ActionsButtons data={respTopRatedTVShows} />

        </main>
    );
}


//add index for carousel (see ActionsButtons in GenericComponent for more details)
export function DataSettingForCarousel(props) {
    let arrayModifiedForCarousel = props.map(elem => {
        return {
            ...elem,
            index: props.indexOf(elem)
        }
    })
    return arrayModifiedForCarousel;
}

