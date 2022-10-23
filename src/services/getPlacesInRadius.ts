import axios from "axios";
import FSQ_Place from "../types/FSQ_Place";
import FSQ_PlaceSearchResponse from "../types/FSQ_PlaceSearchResponse";

const FOURSQUARE_CATEGORY_DINING_AND_DRINKING = 13000;

/**
 * Function used to retrieve a list of restaurants around a point with a specified radius
 * @param latitude Latitude of the origin coords
 * @param longitude Longitutde of the origin coords
 * @param radius Radius in meters of the search area
 * @param keywords Optional keywords for the search
 * @returns Response containing a list of ids of restaurants around the origin point
 */
const getPlacesInRadius = async (latitude: number, longitude: number, radius: number, keywords?: string) => {
  const response = await axios.get<FSQ_PlaceSearchResponse<Pick<FSQ_Place, "fsq_id">>>("https://api.foursquare.com/v3/places/search", {
    headers: {
      Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY
    },
    params: {
      ll: `${latitude},${longitude}`,
      query: keywords,
      radius,
      categories: FOURSQUARE_CATEGORY_DINING_AND_DRINKING,
      open_now: true,
      limit: 50,
      fields: "fsq_id"
      //      👆
      // Might be interesting to add other fields like rating to make a smarter pick
    }
  });

  if (response.status !== 200) {
    throw response;
  }

  return response.data;
}

export default getPlacesInRadius;