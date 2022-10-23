import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ReviewDisplay from "../ReviewDisplay";

const mockedTip = {
  "id": "5a1fe50283e380719831e363",
  "created_at": "2017-11-30T11:01:22.000Z",
  "text": "This place opens till very late and have a good spread of choice, I personally recommend the pork loin tonkatsu, highly recommended. Just use the vending machine to order your meal."
}

describe("<ReviewDisplay />", () => {

  test("Reviews are correctly displayed", () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <ReviewDisplay review={mockedTip} />
      </IntlProvider>
    );

    const dateElement = screen.getByText("11/30/2017");
    expect(dateElement).toBeInTheDocument();

    const textElement = screen.getByText(mockedTip.text);
    expect(textElement).toBeInTheDocument();
  });
});