import FSQ_Geocode from "../../../types/FSQ_Geocode";

const PLACE_STORE_ACTION_SET_RESTAURANT_LOCATION = "setRestaurantLocation" as const;

const setRestaurantLocation = (location?: FSQ_Geocode) => {
  return {
    type: PLACE_STORE_ACTION_SET_RESTAURANT_LOCATION,
    location
  }
};

export default setRestaurantLocation;
export { PLACE_STORE_ACTION_SET_RESTAURANT_LOCATION };