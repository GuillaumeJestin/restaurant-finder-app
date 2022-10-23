import PlaceReducerAction from "../../types/PlaceReducerAction";
import PlaceReducerState from "../../types/PlaceReducerState";
import { PLACE_STORE_ACTION_SET_KEYWORDS } from "./actions/setKeywordsAction";
import { PLACE_STORE_ACTION_SET_MAP } from "./actions/setMap";
import { PLACE_STORE_ACTION_SET_RADIUS } from "./actions/setRadiusAction";
import { PLACE_STORE_ACTION_SET_RESTAURANT_LOCATION } from "./actions/setRestaurantLocation";
import { PLACE_STORE_ACTION_SET_TEMP_LOCATION } from "./actions/setTempLocation";
import { PLACE_STORE_ACTION_SET_USER_LOCATION } from "./actions/setUserLocation";

const PERSIST_USER_LOCATION_KEY = "redux-user-location";
const PERSIST_RADIUS_KEY = "redux-radius";
const PERSIST_RADIUS_KEYWORDS = "redux-keywords";

// Initial state will check in the local storage to see if there isn't any persisted data
const initialPlaceState: PlaceReducerState = {
  userLocation: window.localStorage.getItem(PERSIST_USER_LOCATION_KEY) ?
    JSON.parse(window.localStorage.getItem(PERSIST_USER_LOCATION_KEY)!)
    :
    {
      latitude: process.env.REACT_APP_DEFAULT_LATITUDE ? parseFloat(process.env.REACT_APP_DEFAULT_LATITUDE) : 0,
      longitude: process.env.REACT_APP_DEFAULT_LONGITUDE ? parseFloat(process.env.REACT_APP_DEFAULT_LONGITUDE) : 0,
    },
  radius:
    window.localStorage.getItem(PERSIST_RADIUS_KEY) ?
      JSON.parse(window.localStorage.getItem(PERSIST_RADIUS_KEY)!)
      :
      (process.env.REACT_APP_DEFAULT_RADIUS ? parseFloat(process.env.REACT_APP_DEFAULT_RADIUS) : 0),
  keywords: window.localStorage.getItem(PERSIST_RADIUS_KEYWORDS) || "",
  restaurantLocation: undefined,
  tempUserLocation: undefined,
  map: undefined,
}

const placeReducer = (state = initialPlaceState, action: PlaceReducerAction) => {

  switch (action.type) {
    case PLACE_STORE_ACTION_SET_RADIUS: {
      window.localStorage.setItem(PERSIST_RADIUS_KEY, JSON.stringify(action.radius));

      return {
        ...state,
        radius: action.radius
      }
    }
    case PLACE_STORE_ACTION_SET_KEYWORDS: {
      window.localStorage.setItem(PERSIST_RADIUS_KEYWORDS, action.keywords);

      return {
        ...state,
        keywords: action.keywords
      }
    }
    case PLACE_STORE_ACTION_SET_RESTAURANT_LOCATION: {
      return {
        ...state,
        restaurantLocation: action.location
      }
    }
    case PLACE_STORE_ACTION_SET_TEMP_LOCATION: {
      return {
        ...state,
        tempUserLocation: action.location
      }
    }
    case PLACE_STORE_ACTION_SET_USER_LOCATION: {
      window.localStorage.setItem(PERSIST_USER_LOCATION_KEY, JSON.stringify(action.location));

      return {
        ...state,
        userLocation: action.location
      }
    }
    case PLACE_STORE_ACTION_SET_MAP: {
      return {
        ...state,
        map: action.map
      }
    }
  }

  return state;
}

export { placeReducer, initialPlaceState };