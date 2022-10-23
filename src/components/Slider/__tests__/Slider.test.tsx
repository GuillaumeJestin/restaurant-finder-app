import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import lightTheme from '../../../styling/theme/lightTheme';
import Slider from "../Slider";

describe("<Slider />", () => {

  test("Test simple display", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Slider
          minValue={0}
          maxValue={10}
          label='Test label'
        />
      </ThemeProvider>
    );

    const thumbElement = screen.getByTestId('thumb')

    expect(thumbElement).toBeInTheDocument();
  });
});