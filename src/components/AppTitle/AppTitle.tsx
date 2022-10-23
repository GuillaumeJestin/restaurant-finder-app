import styled from "styled-components";
import { FormattedMessage } from 'react-intl';

const AppTitle = () => {
  return (
    <AppTitleContainer>
      <FormattedMessage id="appTitle" defaultMessage="Restaurant Finder" />
    </AppTitleContainer>
  );
}

export default AppTitle;

const AppTitleContainer = styled.div`
  font-size: 4rem;
  font-weight: bold;
`