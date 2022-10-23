import { render, screen, fireEvent } from '@testing-library/react';
import Button from "../Button";

describe("<Button />", () => {
  test('Test button children render', () => {
    const onPress = jest.fn();

    render(<Button onPress={onPress}>Click Me</Button>);
    const childrenElement = screen.getByText(/click me/i);

    expect(childrenElement).toBeInTheDocument();
  });

  test('Test button press', () => {
    const onPress = jest.fn();

    const result = render(<Button onPress={onPress}>Click Me</Button>);
    const button = result.queryAllByText("Click Me");
    fireEvent.click(button[0]);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Test button press if disabled', () => {
    const onPress = jest.fn();

    const result = render(<Button disabled onPress={onPress}>Click Me</Button>);
    const button = result.queryAllByText("Click Me");
    fireEvent.click(button[0]);

    expect(onPress).toHaveBeenCalledTimes(0);
  });
})