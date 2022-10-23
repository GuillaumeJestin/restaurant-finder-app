import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import getPlaceDetails from "../../services/getPlaceDetails";
import getPlacePhotos from "../../services/getPlacePhotos";
import getPlaceTips from "../../services/getPlaceTips";
import PageContainer from "../../styling/styledComponents/PageContainer";
import FSQ_Photo from "../../types/FSQ_Photo";
import FSQ_Place from "../../types/FSQ_Place";
import FSQ_Tip from "../../types/FSQ_Tip";
import Box from "../../styling/styledComponents/Box";
import { HiOutlineArrowLeft } from "react-icons/hi";
import RatingDisplay from "../../components/RatingDisplay/RatingDisplay";
import { FaMapMarker, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import PhotoCarousel from "../../components/PhotoCarousel/PhotoCarousel";
import Button from "../../components/Button/Button";
import styled from "styled-components";
import PressableText from "../../components/PressableText/PressableText";
import getRandomRestaurantIdinRadius from "../../services/getRandomRestaurantIdinRadius";
import setRestaurantLocation from "../../stores/placeReducer/actions/setRestaurantLocation";
import useTypedDispatch from "../../hooks/useTypedDispatch";
import { FormattedMessage } from 'react-intl';
import MoonLoader from "react-spinners/MoonLoader";
import useTheme from "../../hooks/useTheme";
import store from "../../stores/store";
import pageAnimationProps from "../../styling/animationProps/pageAnimationProps";
import boxAnimationProps from "../../styling/animationProps/boxAnimationProps";

const Restaurant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const theme = useTheme();

  const id = params.id;

  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState<FSQ_Place | undefined>(undefined);
  const [photos, setPhotos] = useState<FSQ_Photo[] | undefined>(undefined);
  const [tips, setTips] = useState<FSQ_Tip[] | undefined>(undefined);

  useEffect(() => {
    if (id) {
      // Every time a new Restaurant needs to be displayed
      // We will retrieve its information

      setDetails(undefined);
      setPhotos(undefined);
      setTips(undefined);
      setLoading(true);

      const retrieveRestaurantInfos = async () => {
        try {

          const [details, photos, tips] = await Promise.all([
            await getPlaceDetails(id),
            await getPlacePhotos(id),
            await getPlaceTips(id)
          ]);

          setDetails(details);
          setPhotos(photos);
          setTips(tips);

          dispatch(setRestaurantLocation(details.geocodes.main));
        } catch {
          // By side effect, if the loading is finished and not all info has been retrieved
          // The app will navigate the user to an error screen
        }
        setLoading(false);
      }

      retrieveRestaurantInfos();

      return () => {
        dispatch(setRestaurantLocation());
      }
    }
  }, [id, dispatch]);

  // If no id is found in the url, then we redirect the user back to the landing page
  if (!id) {
    return <Navigate to="/" />;
  }

  if (loading) {
    // Showing a loading animation while waiting for all the info
    return (
      <PageContainer {...pageAnimationProps}>
        <MoonLoader color={theme.secondary} />
      </PageContainer>
    )
  }

  if (!details || !photos || !tips) {
    // If we enter into this condition
    // It means not all data has been successfully loaded
    // We will redirect the user to an error message
    return <Navigate to="/no-result" />;;
  }

  const onGoBack = () => {
    navigate("/");
  }

  const onRetry = async () => {
    setLoading(true);

    const { userLocation, radius, keywords } = store.getState().place;

    try {
      // Getting a random restaurant around the position with a radius input by the user
      const restaurantId = await getRandomRestaurantIdinRadius(userLocation.latitude, userLocation.longitude, radius, keywords);

      // If there is one, then we display it
      if (restaurantId) {
        navigate(`/restaurant/${restaurantId}`);
      } else {
        navigate("/no-result");
      }
    } catch {
      navigate("/no-result");
    }
  }

  const onGoToRestaurant = () => {
    // If the user wants to go to the restaurant, we will redirect them to Google Maps so they can have an itinerary
    const url = `http://maps.google.com/?q=${details.location.formatted_address}`;

    window.open(url, '_blank')?.focus();
  }

  return (
    <PageContainer {...pageAnimationProps} style={{ alignItems: "start", display: "flex", overflow: "auto" }}>
      <Box {...boxAnimationProps} style={{ width: "60vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
        <Section>
          <PressableText id="goBack" onPress={onGoBack}><HiOutlineArrowLeft /> <span style={{ fontSize: "1rem" }}><FormattedMessage id="restaurant.goBack" defaultMessage="Go Back" /></span></PressableText>
        </Section>
        <Section>
          <PhotoCarousel {...{ photos }} />
        </Section>
        <Section style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          <h2 style={{ marginBottom: "1rem" }}>
            {details.name}
          </h2>
          <div style={{ display: "flex", overflow: "auto" }}>
            <div style={{ flex: 1, overflow: "auto" }}>
              <DetailContainer>
                <RatingDisplay rating={details.rating} />
              </DetailContainer>
              {details.menu && <DetailContainer>
                <MdOutlineRestaurantMenu />
                <a href={details.menu} target="_blank" rel="noopener noreferrer"><FormattedMessage id="restaurant.menu" defaultMessage="Menu" /></a>
              </DetailContainer>}
              {details.location?.formatted_address && <DetailContainer>
                <FaMapMarker />
                <address>
                  {details.location.formatted_address}
                </address>
              </DetailContainer>}
              {details.tel && <DetailContainer>
                <FaPhoneAlt />
                <a href={`tel:${details.tel}`} >{details.tel}</a>
              </DetailContainer>}
            </div>
            <div style={{ flex: 1, overflow: "auto", display: 'flex', flexDirection: "column" }}>
              <div style={{ marginBottom: "1rem" }}>
                {tips.length} <FormattedMessage id="restaurant.reviews" defaultMessage="Reviews (sorted by relevance)" />
              </div>
              <div style={{ flex: 1, overflow: "auto" }}>
                {
                  tips.map(review => {

                    return <ReviewDisplay key={review.id} {...{ review }} />
                  })
                }
              </div>
            </div>
          </div>
        </Section>
        <Section style={{ display: "flex", justifyContent: "space-between" }}>
          <Button id="retry" secondary onPress={onRetry}><FormattedMessage id="restaurant.retry" defaultMessage="Retry" /></Button>
          <Button id="goToRestaurant" primary onPress={onGoToRestaurant}><FormattedMessage id="restaurant.goToRestaurant" defaultMessage="Go to Restaurant" /></Button>
        </Section>
      </Box>
    </PageContainer>
  )
}

export default Restaurant;

const Section = styled.section`
  margin-top: 1rem;

  :first-child {
    margin-top: 0;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  > svg:first-child {
    margin-right: 0.75rem;
  }
`;