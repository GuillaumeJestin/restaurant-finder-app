import FSQ_Geocode from "../../../types/FSQ_Geocode";

const PLACE_STORE_ACTION_SET_USER_LOCATION = "setUserLocation" as const;

const setUserLocation = (location: FSQ_Geocode) => {
  return {
    type: PLACE_STORE_ACTION_SET_USER_LOCATION,
    location
  }
};

export default setUserLocation;
export { PLACE_STORE_ACTION_SET_USER_LOCATION };