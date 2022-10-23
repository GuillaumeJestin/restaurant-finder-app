import Map, { Layer, Marker, Source, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useMapHandleProps from '../../hooks/useMapHandleProps';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useMatch } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { FaMapMarker } from "react-icons/fa";
import useTheme from '../../hooks/useTheme';
import UserMarker from '../UserMarker/UserMarker';
import mapboxgl from 'mapbox-gl';
import getBezierCurveBetweenTwoPoints from '../../services/getBezierCurveBetweenTwoPoints';
import styled from 'styled-components';
import absoluteCentered from '../../styling/css/absoluteCentered';
import useTypedDispatch from '../../hooks/useTypedDispatch';
import setTempLocation from '../../stores/placeReducer/actions/setTempLocation';
import setMap from '../../stores/placeReducer/actions/setMap';
import { AnimatePresence, motion } from 'framer-motion';
import pageAnimationProps from '../../styling/animationProps/pageAnimationProps';

// Probably the most complicated component of the App
// This component displays the background map that is used for multiple pages
// It will handle every case based on the path location and the state of the global store

const BackgroundMap = () => {

  const mapRef = useRef<mapboxgl.Map>();
  const dispatch = useTypedDispatch();

  // Cleaning map reference on the store with this component is unmounted
  useEffect(() => () => { dispatch(setMap(undefined)); }, [dispatch]);

  const userLocation = useTypedSelector(({ place: { userLocation } }) => userLocation);
  const restaurantLocation = useTypedSelector(({ place: { restaurantLocation } }) => restaurantLocation);

  const isRestaurantPathMatch = useMatch("/restaurant/:id");
  const isLandingPathMatch = useMatch("/");
  const isChangeLocationPathMatch = useMatch("/change-location");

  const isRestaurantDisplay = !!(isRestaurantPathMatch && restaurantLocation);
  const isLandingDisplay = !!isLandingPathMatch;
  const isChangeLocationDisplay = !!isChangeLocationPathMatch;

  const mapHandleProps = useMapHandleProps(true);

  const theme = useTheme();

  useEffect(() => {
    // When the app is displaying the restaurant details
    // We will zoom the map to the location of the restaurant and the user
    // We add a padding to shift the view on the right
    if (mapRef.current && isRestaurantDisplay) {
      const bounds = new mapboxgl.LngLatBounds(
        { lat: restaurantLocation.latitude, lon: restaurantLocation.longitude },
        { lat: userLocation.latitude, lon: userLocation.longitude }
      );
      mapRef.current.fitBounds(bounds, {
        padding: {
          bottom: 30,
          left: window.innerWidth * 0.72,
          top: 30,
          right: 30
        },
        duration: 1000,
      });
    }

  }, [isRestaurantDisplay, restaurantLocation?.latitude, restaurantLocation?.longitude, userLocation.latitude, userLocation.longitude]);

  // When displaying the restaurant location, we also draw a nice bezier curves going from the user location to the restaurant
  const restaurantPath = useMemo(() => (isRestaurantDisplay ?
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: getBezierCurveBetweenTwoPoints(
          [userLocation.longitude, userLocation.latitude],
          [restaurantLocation?.longitude, restaurantLocation?.latitude]
        )
      }
    } as any : undefined), [isRestaurantDisplay, userLocation.longitude, userLocation.latitude, restaurantLocation?.longitude, restaurantLocation?.latitude]);


  useEffect(() => {
    // If the user is on the landing page, we center the map to the user location
    if (isLandingDisplay && mapRef.current) {
      mapRef.current.easeTo({
        center: { lat: userLocation.latitude, lon: userLocation.longitude },
        zoom: 14,
        duration: 1000,
      })
    }
  }, [isLandingDisplay, userLocation.latitude, userLocation.longitude]);

  const onMove = (e: ViewStateChangeEvent) => {
    // When the user chooses a new location, we update at every moves the location 
    // that will be later used as the new location if the user confirms its choice 
    if (isChangeLocationDisplay) {
      dispatch(setTempLocation(e.viewState));
    }
  }

  return (
    <>
      <Map
        onLoad={(event) => {
          mapRef.current = event.target;

          // Adding the map reference to the place store, 
          // it's used if the user decides to use its current device location
          dispatch(setMap(event.target));
        }}
        initialViewState={{
          ...userLocation,
          zoom: 14
        }}
        style={{ width: "100vw", height: "100vh", zIndex: 0 }}
        mapStyle={theme.mapboxThemeUrl}
        {...mapHandleProps}
        {...{ onMove }}
      >
        {
          isRestaurantDisplay &&
          <>
            <Marker longitude={restaurantLocation.longitude} latitude={restaurantLocation.latitude} anchor="bottom" >
              <FaMapMarker size="2rem" style={{ transform: "translate(0, 0.28rem)" }} color={theme.primary} />
            </Marker>
            <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="center" >
              <UserMarker />
            </Marker>
            <Source id="polylineLayer" type="geojson" data={restaurantPath}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round"
                }}
                paint={{
                  "line-color": theme.secondary,
                  "line-width": 3,
                  'line-dasharray': [2, 2]
                }}
              />
            </Source>
          </>
        }
      </Map>
      <AnimatePresence>
        {
          isChangeLocationDisplay && <AbsoluteCenteredContainer {...pageAnimationProps}>
            <UserMarker />
          </AbsoluteCenteredContainer>
        }
      </AnimatePresence>
    </>
  )
}

export default memo(BackgroundMap);

const AbsoluteCenteredContainer = styled(motion.div)`
  ${absoluteCentered}
  z-index: 1;
`