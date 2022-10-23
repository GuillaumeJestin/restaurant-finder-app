import setKeywordsAction from "../stores/placeReducer/actions/setKeywordsAction";
import setMap from "../stores/placeReducer/actions/setMap";
import setRadiusAction from "../stores/placeReducer/actions/setRadiusAction";
import setRestaurantLocation from "../stores/placeReducer/actions/setRestaurantLocation";
import setTempLocation from "../stores/placeReducer/actions/setTempLocation";
import setUserLocation from "../stores/placeReducer/actions/setUserLocation";

type PlaceReducerAction = ReturnType<typeof setRadiusAction>
                        | ReturnType<typeof setKeywordsAction>
                        | ReturnType<typeof setRestaurantLocation>
                        | ReturnType<typeof setTempLocation>
                        | ReturnType<typeof setUserLocation>
                        | ReturnType<typeof setMap>
                        ;

export default PlaceReducerAction;