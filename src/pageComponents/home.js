import React, { useEffect, useState } from 'react';
import TopRated from '../movies/api/GetTopRated';
import ActionsButtons from '../carousel/Carousel';


export default function Home() {
    const [resp, setResp] = useState([]);
    useEffect(() => {
        const result = TopRated();
        result.then(response => {
            const res = response.results.map(elem => {
                //added index for carousel (see ActionsButtons in GenericComponent for more details)
                return {
                    ...elem,
                    index: response.results.indexOf(elem)
                }
            })
            setResp(res);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
            <main>
                <h1>Top Rated</h1>
                <hr></hr>
                <ActionsButtons data={resp}/>
            </main>
    );
}





