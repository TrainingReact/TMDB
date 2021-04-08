import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React, { useState } from "react";
import { ManageDynamicUrlForCarousel, useDataToState, ConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const [urlConstructor, setUrlConstractor] = useState([]);
  const respPopularMovie = useDataToState({ movie: popularUrl, genre: genreUrl });

  return (
    <main>
      <h1>Get Popular</h1>
      <hr></hr>
      <ActionsButtons data={respPopularMovie} />
      <ConstructArrayForDynamicUrls f={setUrlConstractor} searchFilmUrl={searchFilmUrl} genreUrl={genreUrl} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
