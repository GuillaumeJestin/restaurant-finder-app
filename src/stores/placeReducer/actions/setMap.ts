import mapboxgl from 'mapbox-gl';

const PLACE_STORE_ACTION_SET_MAP = "setMap" as const;

const setMap = (map: mapboxgl.Map | undefined) => {
  return {
    type: PLACE_STORE_ACTION_SET_MAP,
    map
  }
};

export default setMap;
export { PLACE_STORE_ACTION_SET_MAP };