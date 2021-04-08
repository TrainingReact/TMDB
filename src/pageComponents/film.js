import { popularUrl, genreUrl, searchFilmUrl } from "../movies/constants/constants";
import React, { useState } from "react";
import { ManageDynamicUrlForCarousel, SetDataToState, ConstructArrayForDynamicUrls } from "../movies/api/utils";
import ActionsButtons from "../genericComponents/Carousel";

export default function Film() {
  const [respPopularMovie, setRespPopularMovie] = useState([]);
  const [urlConstructor, setUrlConstractor] = useState([]);
  return (
    <main>
      <h1>Get Popular</h1>
      <hr></hr>
      <SetDataToState f={setRespPopularMovie} movie={popularUrl} genre={genreUrl} />
      <ActionsButtons data={respPopularMovie} />
      <ConstructArrayForDynamicUrls f={setUrlConstractor} searchFilmUrl={searchFilmUrl} genreUrl={genreUrl} />
      <ManageDynamicUrlForCarousel arrayUrl={urlConstructor} genreUrl={genreUrl} />
    </main>
  );
}
