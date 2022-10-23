# Restaurant Finder

![](images/app_screenshot1.png?raw=true)

This app will recommend a restaurant near a location specified by the user. Because it was designed for Cogent Labs, the default position will be at their office, but users can change it if necessary. It will suggest a random restaurant near the user's location, and if the user is not satisfied, the app will suggest another.

This app was built in a few hours, it is purely frontend, and some parts that would have made it production ready were left out due to time constraints, which we will discuss in this document.

### Built With

This app was created with React JS and employs Redux for global state management. To reduce development time, multiple libraries were used. The app uses JEST for unit testing and Cypress for end-to-end testing.

This project was made on the version 16.15.1 of Node.js.

## Installation

1. Clone this repo or download the archive
2. Install NPM packages
   ```sh
   yarn
   ```
3. Install NPM packages
   ```sh
   yarn start
   ```

Personal API Keys were provided for this project and can be found in the "'.env" file. Please be considerate and do not abuse them.

## The Project

### Architecture

The code base is divided into several folders under `src`:

- `components` contains basic components that are used on various pages.
- `hooks` stores both custom and typed hooks.
- `intl` provides all strings used in the app.
- `pages` contains all of the app's pages.
- `services` holds all functions that make API calls externally, as well as a few helper functions.
- `stores` is where Redux's reducers are stored.
- `styling` contains some styled components, as well as some CSS and animation data. It also contains the theme colors.
- `type` contains all of the project's typing.

### Styling

This project's styling is done with [`styled-components`](https://styled-components.com/). This library was selected because it allowed for quick development. The definition of those styled-components can be found at the end of each react component file. The app fully utilizes the `styled-component` global theme system, including a light and dark mode.

There was not much effort put into selecting a perfect color palette, and the dark mode, in particular, lacks good contrast, but this is easily adjustable.

[`framer-motion`](https://github.com/framer/motion) has been used to handle animation because it is as simple as adding a few props to have good looking animations..

### Accessibility

[`react-aria`](https://react-spectrum.adobe.com/react-aria/) has been heavily used due to a strong emphasis on accessibility. `react-aria` provides all of the data required to create accessible components that can be used by any user.

### Internationalization

For internationalization, the app employs [`react-intl`](https://formatjs.io/docs/getting-started/installation/). The app is only internationalized for English and French, and the language is determined by the browser's locale. It might be interesting to add a picker in the future to select any available language.

### Data Handling

Because the data handled is fairly simple, only minor optimization has been performed.
The app could benefit from some caching here and there, but it is not required at this scale.
If the app were to scale more, we would need to cache and optimize some data, but we would have to be careful not to violate any API usage guidelines (https://developer.foursquare.com/docs/usage-guidelines).

### Security Issues

There is two security issues that are know on this project.

The first is that API keys are directly exposed to the user, meaning that anyone can use them. There are a few solutions to this, one of which is to limit those API keys to our domain. A better option would be to have a dedicated backend server that holds the API keys, another alternative would be lambda functions like what Netlify propose (https://www.netlify.com/products/functions/).

The second is that some Redux store data is saved locally for persistence. There are no checks to ensure that the data has not been compromised, any malicious user could take advantage of this.

### Error Handling

The app should be fairly stable. If an API call fails, the user is directed to an error message.
Due to time constraints, no [`error boundaries`](https://reactjs.org/docs/error-boundaries.html) have been implemented.
For real-world production, error monitoring services such as [Sentry](https://sentry.io/welcome/) should be included.

### Testing

Some components underwent unit testing. Because of time constraints, not much of it has been completed. The project also makes use of Cypress for end-to-end user testing, though only one very basic test has been defined.
The foundation for a testing process has been laid, all that remains is to populate it.

### Credits

If we look at this page (https://developer.foursquare.com/docs/visual-crediting-policy), we can see that visual crediting is required for the **Enterprise Places API product**, but since we are using a sandbox product, it is unclear whether we need to add this visual credit. It is not displayed in this project, but it should be considered for a real production product.

## Contacts

You can find me on LinkedIn at this address (https://www.linkedin.com/in/guillaume-jestin-a94333160/) and my resume [here](https://www.docdroid.net/UGLy8Qt/guillaume-jestin-resume-pdf).
