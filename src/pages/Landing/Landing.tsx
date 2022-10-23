import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppTitle from "../../components/AppTitle/AppTitle";
import Button from "../../components/Button/Button";
import PressableText from "../../components/PressableText/PressableText";
import Slider from "../../components/Slider/Slider";
import TextInput from "../../components/TextInput/TextInput";
import useTypedDispatch from "../../hooks/useTypedDispatch";
import useTypedSelector from "../../hooks/useTypedSelector";
import useTheme from "../../hooks/useTheme";
import getRandomRestaurantIdinRadius from "../../services/getRandomRestaurantIdinRadius";
import setKeywordsAction from "../../stores/placeReducer/actions/setKeywordsAction";
import setRadiusAction from "../../stores/placeReducer/actions/setRadiusAction";
import flexVerticalAndCentered from "../../styling/css/flexVerticalAndCentered";
import Box from "../../styling/styledComponents/Box";
import PageContainer from "../../styling/styledComponents/PageContainer";
import { FormattedMessage, useIntl } from 'react-intl';
import store from "../../stores/store";
import pageAnimationProps from "../../styling/animationProps/pageAnimationProps";
import boxAnimationProps from "../../styling/animationProps/boxAnimationProps";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const theme = useTheme();
  const intl = useIntl();

  const { radius, keywords } = useTypedSelector(({ place: { radius, keywords } }) => ({ radius, keywords }));
  const [loading, setLoading] = useState(false);

  const onRadiusChange = (radius: number) => {
    dispatch(setRadiusAction(radius));
  }

  const onKeywordsChange = (keywords: string) => {
    dispatch(setKeywordsAction(keywords));
  }

  const onFindRestaurantPress = async () => {
    setLoading(true);

    const { userLocation, radius, keywords } = store.getState().place

    try {
      // Getting a random restaurant around the position with a radius input by the user
      const restaurantId = await getRandomRestaurantIdinRadius(userLocation.latitude, userLocation.longitude, radius, keywords);

      // If there is one, then we go to the page to display it
      if (restaurantId) {
        navigate(`/restaurant/${restaurantId}`);
      } else {
        navigate("/no-result");
      }
    } catch {
      // If any errors happen, we will redirect the user to an error message
      navigate("/no-result");
    }

    setLoading(false);
  }

  const onChangeLocationPress = () => {
    navigate("/change-location");
  }

  const keywordsPlaceholder = intl.formatMessage({ id: "landing.keywordsPlaceholder" });

  return (
    <PageContainer {...pageAnimationProps}>
      <AppTitle />
      <ContentContainer>
        <Box {...boxAnimationProps} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>
            <div>
              <Slider
                value={radius}
                onChange={onRadiusChange}
                label={<FormattedMessage id="landing.radiusLabel" defaultMessage="Distance Radius" />}
                minValue={100}
                maxValue={3000}
                readOnly={loading}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <TextInput
                value={keywords}
                onChange={onKeywordsChange}
                label={<FormattedMessage id="landing.keywordsLabel" defaultMessage="Keywords (optional)" />}
                placeholder={keywordsPlaceholder}
                readOnly={loading}
              />
            </div>
          </div>
          <div style={{ margin: "2rem 0 1rem 0" }}>
            <Button id="findRestaurant" disabled={loading} onPress={onFindRestaurantPress}>
              {
                loading ?
                  <FormattedMessage id="landing.loading" defaultMessage="Loading ..." />
                  :
                  <FormattedMessage id="landing.findRestaurant" defaultMessage="Find Restaurant" />
              }
            </Button>
          </div>
          <PressableText id="changeLocation" disabled={loading} onPress={onChangeLocationPress} style={{ color: theme.primary }}>
            <FormattedMessage id="landing.changeLocation" defaultMessage="(Change Location)" />
          </PressableText>
        </Box>
      </ContentContainer>
    </PageContainer>
  );
}

export default Landing;

const ContentContainer = styled.section`
  flex: 1;

  ${flexVerticalAndCentered}
`;