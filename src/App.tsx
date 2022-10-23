import styled from 'styled-components';
import BackgroundMap from './components/BackgroundMap/BackgroundMap';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import NoResult from './pages/NoResult/NoResult';
import Restaurant from './pages/Restaurant/Restaurant';
import ChangeLocation from './pages/ChangeLocation/ChangeLocation';
import english from './intl/english';
import french from './intl/french';
import { IntlProvider } from "react-intl";
import { ThemeProvider } from 'styled-components';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useTypedDispatch from './hooks/useTypedDispatch';
import setThemeMode from './stores/stylingReducer/actions/setThemeMode';
import useTypedSelector from './hooks/useTypedSelector';
import lightTheme from './styling/theme/lightTheme';
import darkTheme from './styling/theme/darkTheme';
import PressableText from './components/PressableText/PressableText';
import { AnimatePresence } from 'framer-motion';

const messages: { [key: string]: { [key: string]: string } } = {
  'fr': french,
  'en': english,
};

const language = navigator.language.split(/[-_]/)[0];

function App() {

  const dispatch = useTypedDispatch();
  const lightMode = useTypedSelector(({ styling: { lightMode } }) => lightMode);
  const theme = lightMode ? lightTheme : darkTheme;

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <IntlProvider locale={navigator.language} messages={messages[language]}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/no-result" element={<NoResult />} />
              <Route path="/change-location" element={<ChangeLocation />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
          <BackgroundMap />
          <ThemeSwitchContainer>
            <PressableText onPress={() => dispatch(setThemeMode(!lightMode))}>
              <DarkModeSwitch
                checked={!lightMode}
                onChange={() => { }}
                color={theme.textColorDark}
              />
            </PressableText>
          </ThemeSwitchContainer>
        </IntlProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  color: ${props => props.theme.textColorDark};
`;

const ThemeSwitchContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;

  z-index: 1;
`;