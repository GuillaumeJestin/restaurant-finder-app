import FSQ_Geocode from "../../../types/FSQ_Geocode";

const PLACE_STORE_ACTION_SET_TEMP_LOCATION = "setTempLocation" as const;

const setTempLocation = (location?: FSQ_Geocode) => {
  return {
    type: PLACE_STORE_ACTION_SET_TEMP_LOCATION,
    location
  }
};

export default setTempLocation;
export { PLACE_STORE_ACTION_SET_TEMP_LOCATION };