import axios from "axios";
import FSQ_Tip from "../types/FSQ_Tip";

/**
 * Retrieve reviews of the place
 * @param id Id of the place
 * @returns List of reviews, maximum 50 reviews
 */
const getPlaceTips = async (id: string) => {
  const response = await axios.get<FSQ_Tip[]>(`https://api.foursquare.com/v3/places/${id}/tips`, {
    headers: {
      Authorization: process.env.REACT_APP_FOURSQUARE_API_KEY
    },
    params: {
      limit: 50
    }
  });

  if (response.status !== 200) {
    throw response;
  }

  return response.data;
}

export default getPlaceTips;