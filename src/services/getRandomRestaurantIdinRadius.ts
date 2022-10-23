import getPlacesInRadius from "./getPlacesInRadius";

/**
 * 
 * @param latitude Latitude of the origin coords
 * @param longitude Longitutde of the origin coords
 * @param radius Radius in meters of the search area
 * @param keywords Optional keywords for the search
 * @returns Either the id of the found restaurant or undefined if none were found
 */
const getRandomRestaurantIdinRadius = async (latitude: number, longitude: number, radius: number, keywords?: string) => {
  // Getting restaurants around the position with a radius input by the user
  const response = await getPlacesInRadius(latitude, longitude, radius, keywords);

  // If there is more than one restaurant, then we pick one randomly
  if (response.results.length > 0) {
    const restaurant = response.results[Math.floor(Math.random() * response.results.length)];

    return restaurant.fsq_id;
  }

  return undefined;
}
export default getRandomRestaurantIdinRadius;