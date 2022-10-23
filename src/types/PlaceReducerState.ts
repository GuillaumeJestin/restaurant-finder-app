import FSQ_Geocode from "./FSQ_Geocode";
import mapboxgl from 'mapbox-gl';

type PlaceReducerState = {
  userLocation: FSQ_Geocode;
  radius: number;
  keywords: string;
  restaurantLocation: FSQ_Geocode | undefined;
  tempUserLocation: FSQ_Geocode | undefined;
  map: mapboxgl.Map | undefined;
}

export default PlaceReducerState;