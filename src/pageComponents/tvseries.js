import { genreUrl, getPopularTVSUrl, searchTVSUrl } from "../movies/constants/constants";
import React from "react";
import { ManageDynamicUrlForCarousel, useDataToState, useConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Serietv() {
  const resPopularTVS = useDataToState({ movie: getPopularTVSUrl, genre: genreUrl });
  const urlConstructor = useConstructArrayForDynamicUrls({ genre: genreUrl, searchFilm: searchTVSUrl });

  return (
    <main>
      <h3>Get Popular</h3>
      <hr></hr>
      <ActionsButtons data={resPopularTVS} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
