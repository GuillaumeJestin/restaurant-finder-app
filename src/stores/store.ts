
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import PlaceReducerState from '../types/PlaceReducerState';
import StylingReducerState from '../types/StylingReducerState';
import { placeReducer, initialPlaceState } from './placeReducer/placeReducer';
import { stylingReducer, initialStylingState } from './stylingReducer/stylingReducer';

const store = configureStore<{ place: PlaceReducerState, styling: StylingReducerState }>({
  reducer: combineReducers({ place: placeReducer, styling: stylingReducer }) as any,
  preloadedState: { place: initialPlaceState, styling: initialStylingState },
  // Required config for redux to not do any immutable and serializable checks on the Mapbox object as it will fail
  // 👇
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['setMap'],
      ignoredPaths: ['place.map']
    },
    immutableCheck: {
      ignoredActions: ['setMap'],
      ignoredPaths: ['place.map']
    }
  }) as any,
});

export default store;