import FSQ_Geocode from "./FSQ_Geocode";
import FSQ_Place from "./FSQ_Place";

// Geographical context should be extended to rectangle bounds, but in this project we only use circle bounds

type FSQ_PlaceSearchResponse<T = FSQ_Place> = {
  results: T[];
  context: {
    geo_bounds: {
      circle: {
        center: FSQ_Geocode;
        radius: number;
      };
    };
  };
}

export default FSQ_PlaceSearchResponse;