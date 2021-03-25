import GetCarouselItems from '../carousel/Carousel';



export default function Home() {
    const topRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f1789e999f6985421e42f9a8de9c434c&language=en-US&page=1';
    return (
        <main>
            <h1>Top Rated</h1>
            <hr></hr>
             <GetCarouselItems url={topRated}/>
        </main>
    );
}





