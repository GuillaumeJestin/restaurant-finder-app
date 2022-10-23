import styled from "styled-components";
import absoluteCentered from "../../styling/css/absoluteCentered";

const BIG_RADIUS_SIZE = "4rem";
const MEDIUM_RADIUS_SIZE = "1.5rem";
const SMALL_RADIUS_SIZE = "0.6rem";

const UserMarker = () => {

  return (
    <UserMarkerContainer>
      <BigCircle />
      <MediumCircle />
      <SmallCircle />
    </UserMarkerContainer>
  )
}

export default UserMarker;

const UserMarkerContainer = styled.div`
  width: ${BIG_RADIUS_SIZE};
  height: ${BIG_RADIUS_SIZE};
  border-radius: ${BIG_RADIUS_SIZE};

  position: relative;
`;

const BigCircle = styled.div`
  ${absoluteCentered}
  
  width: ${BIG_RADIUS_SIZE};
  height: ${BIG_RADIUS_SIZE};
  border-radius: ${BIG_RADIUS_SIZE};

  background-color: ${props => props.theme.primary};
  opacity: 0.3;
`;

const MediumCircle = styled.div`
  ${absoluteCentered}

  width: ${MEDIUM_RADIUS_SIZE};
  height: ${MEDIUM_RADIUS_SIZE};
  border-radius: ${MEDIUM_RADIUS_SIZE};

  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.boxShadow};
`;

const SmallCircle = styled.div`
  ${absoluteCentered}

  width: ${SMALL_RADIUS_SIZE};
  height: ${SMALL_RADIUS_SIZE};
  border-radius: ${SMALL_RADIUS_SIZE};

  background-color: ${props => props.theme.secondary};
`;