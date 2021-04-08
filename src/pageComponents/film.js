import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React from "react";
import { ManageDynamicUrlForCarousel, useDataToState, useConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const respPopularMovie = useDataToState({ movie: popularUrl, genre: genreUrl });
  const urlConstructor = useConstructArrayForDynamicUrls({ genre: genreUrl, searchFilm: searchFilmUrl });
  return (
    <main>
      <h1>Get Popular</h1>
      <hr></hr>
      <ActionsButtons data={respPopularMovie} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
