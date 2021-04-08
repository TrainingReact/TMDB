import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React from "react";
import { ManageDynamicUrlForCarousel, useDataToState, useConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const respPopularMovie = useDataToState({ movie: popularUrl, genre: genreUrl });
  const urlConstructor = useConstructArrayForDynamicUrls({ genre: genreUrl, searchFilm: searchFilmUrl });
  return (
    <main>
      <h3>Get Popular</h3>
      <hr></hr>
      <ActionsButtons data={respPopularMovie} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
