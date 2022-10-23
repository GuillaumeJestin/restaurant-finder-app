import axios from "axios";
import FSQ_Place from "../types/FSQ_Place";

// The Foursquare Place API doesn't return by default some important fields like rating must be specified in the query
const fields = [
  "fsq_id",
  "categories",
  "description",
  "distance",
  "email",
  "features",
  "geocodes",
  "hours",
  "link",
  "location",
  "menu",
  "name",
  "popularity",
  "price",
  "rating",
  "social_media",
  "tel",
  "website",
].join(",")

/**
 * Returns the details of the place
 * @param id Id of the place
 * @returns Place details
 */
const getPlaceDetails = async (id: string) => {
  const response = await axios.get<FSQ_Place>(`https://api.foursquare.com/v3/places/${id}`, {
    headers: {
      Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY
    },
    params: {
      fields
    }
  });

  if (response.status !== 200) {
    throw response;
  }

  return response.data;
}

export default getPlaceDetails;