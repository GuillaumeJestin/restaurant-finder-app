import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import AppTitle from "../AppTitle";

test('Test app title component', () => {
  render(<IntlProvider locale="en" messages={{}}><AppTitle /></IntlProvider>);
  const titleElement = screen.getByText(/restaurant finder/i);
  expect(titleElement).toBeInTheDocument();
});