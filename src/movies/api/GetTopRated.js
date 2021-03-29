import {topRatedUrl} from '../constants/Constants';



export default async function TopRated() {
    try {
        let response = await fetch(topRatedUrl);
        response = await response.json()
        return response;
    } catch (error) {
        console.log(error);
    }
}
