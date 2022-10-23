import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import PressableText from "../../components/PressableText/PressableText";
import useTypedDispatch from "../../hooks/useTypedDispatch";
import useTheme from "../../hooks/useTheme";
import setTempLocation from "../../stores/placeReducer/actions/setTempLocation";
import setUserLocation from "../../stores/placeReducer/actions/setUserLocation";
import Box from "../../styling/styledComponents/Box";
import { FormattedMessage } from 'react-intl';
import store from "../../stores/store";
import pageAnimationProps from "../../styling/animationProps/pageAnimationProps";

const ChangeLocation = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const onCancel = () => {
    navigate("/");
  }

  const onConfirm = () => {
    // Once the user has placed the location where they want
    // We will set the temporary coords of the Map and set it as the new user location

    const { tempUserLocation } = store.getState().place;

    if (tempUserLocation) {
      dispatch(setUserLocation(tempUserLocation));
    }
    navigate("/");
  }

  const onUseCurrentLocation = () => {
    // If the user wants to use the current geographical position of their device
    // We will request it to the browser and then notify the Map Background with those coords
     
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { map } = store.getState().place;

      if (map) {
        dispatch(setTempLocation({ latitude: coords.latitude, longitude: coords.longitude }));
        map.easeTo({
          center: { lat: coords.latitude, lon: coords.longitude },
          zoom: 14,
          duration: 1000,
        })
      }
    });
  }

  return (
    <ChangeLocationContainer {...pageAnimationProps}>
      <div>
        <FormattedMessage id="changeLocation.moveMap" defaultMessage="Move the map to set the new location" />
      </div>
      <div>
        <PressableText style={{ color: theme.primary }} onPress={onUseCurrentLocation}>
          <FormattedMessage id="changeLocation.useCurrentLocation" defaultMessage="(Use current Location)" />
        </PressableText>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <Button id="cancel" secondary onPress={onCancel}>
          <FormattedMessage id="changeLocation.cancel" defaultMessage="Cancel" />
        </Button>
        <Button id="confirm" primary style={{ marginLeft: "1rem" }} onPress={onConfirm}>
          <FormattedMessage id="changeLocation.confirm" defaultMessage="Confirm" />
        </Button>
      </div>
    </ChangeLocationContainer>
  )
}

export default ChangeLocation;

const ChangeLocationContainer = styled(Box)`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 2rem;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
