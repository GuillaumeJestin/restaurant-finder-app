import axios from "axios";
import FSQ_Photo from "../types/FSQ_Photo";

/**
 * Retrieve photos of the place
 * @param id Id of the place
 * @returns List of photos, maximum 50 photos
 */
const getPlacePhotos = async (id: string) => {
  const response = await axios.get<FSQ_Photo[]>(`https://api.foursquare.com/v3/places/${id}/photos`, {
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

export default getPlacePhotos;