import { genreUrl, getPopularTVSUrl, searchTVSUrl } from "../movies/constants/constants";
import React from "react";
import { ManageDynamicUrlForCarousel } from "../movies/api/utils";
import { useDataToState, useConstructArrayForDynamicUrls } from "../genericComponents/PersonalizedHooks";

import Carousel from "../genericComponents/Carousel";

/**
 * TV Shows page
 * @returns
 */
export default function TVShows() {
  const resPopularTVS = useDataToState({ movie: getPopularTVSUrl, genre: genreUrl });
  const urlConstructor = useConstructArrayForDynamicUrls({ genre: genreUrl, searchFilm: searchTVSUrl });
  return (
    <main>
      <h1>TV Shows</h1>
      <hr className="hrTitle" />
      <div className="titleCategory">
        <h3>Get Popular</h3>
      </div>
      <hr></hr>
      <Carousel data={resPopularTVS} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
