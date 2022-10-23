import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import flexVerticalAndCentered from "../../styling/css/flexVerticalAndCentered";
import Box from "../../styling/styledComponents/Box";
import PageContainer from "../../styling/styledComponents/PageContainer";
import { FormattedMessage } from 'react-intl';
import pageAnimationProps from "../../styling/animationProps/pageAnimationProps";
import boxAnimationProps from "../../styling/animationProps/boxAnimationProps";

const REACTION_EMOJIS = ["😣", "😱", "😔", "🤯"];

const NoResult = () => {

  const navigate = useNavigate();

  const [emoji] = useState(() => REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)]);

  const onGoBackPress = () => {
    navigate("/");
  }

  return (
    <PageContainer {...pageAnimationProps}>
      <ContentBox {...boxAnimationProps}>
        <div>
          <span style={{ fontSize: "10rem" }} role="img" aria-label="reaction" aria-hidden="false">
            {emoji}
          </span>
        </div>
        <h2>
          <FormattedMessage id="noResult.noRestaurantFound" defaultMessage="No Restaurant Found" />
        </h2>
        <div style={{ margin: "1rem 0 2rem 0" }}>
          <FormattedMessage
            id="noResult.tip"
            defaultMessage="Retry your luck by either changing location, radius or by changing keywords"
          />
        </div>
        <div>
          <Button id="goBack" onPress={onGoBackPress} secondary>
            <FormattedMessage id="noResult.goBack" defaultMessage="Go Back" />
          </Button>
        </div>
      </ContentBox>
    </PageContainer>
  )
}

export default NoResult;

const ContentBox = styled(Box)`
  ${flexVerticalAndCentered}
`;