import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React from "react";
import { ManageDynamicUrlForCarousel, useDataToState, useConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

/**
 * Film page
 * @returns
 */
export default function Film() {
  const respPopularMovie = useDataToState({ movie: popularUrl, genre: genreUrl });
  const urlConstructor = useConstructArrayForDynamicUrls({ genre: genreUrl, searchFilm: searchFilmUrl });
  return (
    <main>
      <h1>Film</h1>
      <hr className="hrTitle" />
      <div className="titleCategory">
        <h3>Most Popular</h3>
      </div>
      <hr></hr>
      <ActionsButtons data={respPopularMovie} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
