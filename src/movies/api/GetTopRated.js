//Top Rated
export default async function TopRatedMovie(topRatedMovie) {
  try {
    let response = await fetch(topRatedMovie);
    response = await response.json();
    return response;
  } catch (error) {
    console.log("Something went wrong:   ", error);
  }
}
